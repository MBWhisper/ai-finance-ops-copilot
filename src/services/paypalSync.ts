import { db } from "@/db";
import { paypalAccounts, paypalTransactions, paypalInvoices, paypalSubscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { decrypt } from "@/lib/crypto";
import { fetchTransactions, fetchInvoices, getAccessToken } from "@/services/paypal";
import { logger } from "@/lib/logger";

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

export async function syncPayPalTransactions(accountId: string) {
  logger.info({ accountId }, "Starting PayPal transaction sync");

  const now = new Date();
  let inserted = 0;
  let updated = 0;

  for (let i = 11; i >= 0; i--) {
    const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const startStr = start.toISOString();
    const endStr = end.toISOString();

    let page = 1;
    let totalPages = 1;

    do {
      try {
        const res = await fetchTransactions(accountId, startStr, endStr, page);
        for (const txn of res.transaction_details ?? []) {
          const info = txn.transaction_info;
          const amount = Math.round(parseFloat(info.transaction_amount.value) * 100);
          const fee = info.fee_amount ? Math.round(parseFloat(info.fee_amount.value) * 100) : 0;

          await db
            .insert(paypalTransactions)
            .values({
              accountId,
              transactionId: info.transaction_id,
              transactionType: info.transaction_type,
              status: info.transaction_status,
              amount,
              currency: info.transaction_amount.currency_code,
              feeAmount: fee,
              netAmount: amount - Math.abs(fee),
              payerEmail: txn.payer_info?.email_address,
              payerName: txn.payer_info?.payer_name
                ? `${txn.payer_info.payer_name.given_name ?? ""} ${txn.payer_info.payer_name.surname ?? ""}`.trim()
                : null,
              itemName: txn.cart_info?.item_details?.[0]?.item_name,
              transactionDate: new Date(info.transaction_initiation_date),
            })
            .onConflictDoUpdate({
              target: [paypalTransactions.transactionId],
              set: {
                status: info.transaction_status,
                amount,
                feeAmount: fee,
                netAmount: amount - Math.abs(fee),
                updatedAt: new Date(),
              },
            });

          if (info.transaction_status === "S") inserted++;
          else updated++;
        }

        totalPages = res.total_pages ?? 1;
        page++;
      } catch (err) {
        logger.error({ err, accountId, month: i }, "Transaction sync failed for month");
        await sleep(2000);
        break;
      }
    } while (page <= totalPages);
  }

  logger.info({ accountId, inserted, updated }, "PayPal transaction sync completed");
  return { transactions: inserted + updated };
}

export async function syncPayPalInvoices(accountId: string) {
  logger.info({ accountId }, "Starting PayPal invoice sync");

  let page = 1;
  let totalPages = 1;
  let count = 0;

  do {
    try {
      const res = await fetchInvoices(accountId, page, 20);
      for (const inv of res.items ?? []) {
        const amount = Math.round(parseFloat(inv.amount.value) * 100);
        const dueAmount = inv.due_amount ? Math.round(parseFloat(inv.due_amount.value) * 100) : amount;

        await db
          .insert(paypalInvoices)
          .values({
            accountId,
            invoiceId: inv.id,
            invoiceNumber: inv.detail.invoice_number,
            status: inv.status,
            recipientEmail: inv.primary_recipients?.[0]?.billing_info.email_address,
            recipientName: inv.primary_recipients?.[0]?.billing_info.name?.full_name,
            amount,
            currency: inv.detail.currency_code,
            dueAmount,
            invoiceDate: inv.detail.invoice_date ? new Date(inv.detail.invoice_date) : null,
            dueDate: inv.detail.payment_term?.due_date ? new Date(inv.detail.payment_term.due_date) : null,
          })
          .onConflictDoUpdate({
            target: [paypalInvoices.invoiceId],
            set: {
              status: inv.status,
              amount,
              dueAmount,
              updatedAt: new Date(),
            },
          });

        count++;
      }

      totalPages = res.total_pages ?? 1;
      page++;
    } catch (err) {
      logger.error({ err, accountId, page }, "Invoice sync failed for page");
      await sleep(2000);
      break;
    }
  } while (page <= totalPages);

  logger.info({ accountId, count }, "PayPal invoice sync completed");
  return { invoices: count };
}

export async function syncAllPayPalAccounts() {
  const accounts = await db.query.paypalAccounts.findMany();

  const results = [];
  for (const account of accounts) {
    try {
      const txnResult = await syncPayPalTransactions(account.id);
      const invResult = await syncPayPalInvoices(account.id);
      await db
        .update(paypalAccounts)
        .set({ lastSyncedAt: new Date() })
        .where(eq(paypalAccounts.id, account.id));

      results.push({ accountId: account.id, ...txnResult, ...invResult });
    } catch (err) {
      logger.error({ err, accountId: account.id }, "PayPal sync failed for account");
      results.push({ accountId: account.id, error: String(err) });
    }
  }

  return results;
}
