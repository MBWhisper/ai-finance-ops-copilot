import { db } from "@/db";
import {
  paypalAccounts,
  paypalTransactions,
  paypalInvoices,
  paypalSubscriptions,
} from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";

export async function getPayPalAccount(userId: string) {
  const row = await db.query.paypalAccounts.findFirst({
    where: eq(paypalAccounts.userId, userId),
  });
  return row ?? null;
}

export async function upsertPayPalAccount(
  userId: string,
  clientId: string,
  clientSecret: string,
  mode: string,
  merchantEmail?: string,
  merchantName?: string
) {
  const existing = await db.query.paypalAccounts.findFirst({
    where: eq(paypalAccounts.userId, userId),
  });

  if (existing) {
    await db
      .update(paypalAccounts)
      .set({ clientId, clientSecret, mode, merchantEmail, merchantName, lastSyncedAt: null })
      .where(eq(paypalAccounts.userId, userId));
  } else {
    await db
      .insert(paypalAccounts)
      .values({ userId, clientId, clientSecret, mode, merchantEmail, merchantName });
  }
}

export async function deletePayPalAccount(userId: string) {
  await db
    .delete(paypalTransactions)
    .where(eq(paypalTransactions.accountId, (
      await db.query.paypalAccounts.findFirst({ where: eq(paypalAccounts.userId, userId), columns: { id: true } })
    )?.id ?? ""));
  await db
    .delete(paypalInvoices)
    .where(eq(paypalInvoices.accountId, (
      await db.query.paypalAccounts.findFirst({ where: eq(paypalAccounts.userId, userId), columns: { id: true } })
    )?.id ?? ""));
  await db
    .delete(paypalSubscriptions)
    .where(eq(paypalSubscriptions.accountId, (
      await db.query.paypalAccounts.findFirst({ where: eq(paypalAccounts.userId, userId), columns: { id: true } })
    )?.id ?? ""));
  await db
    .delete(paypalAccounts)
    .where(eq(paypalAccounts.userId, userId));
}

export async function getPayPalDashboardData(userId: string) {
  const account = await getPayPalAccount(userId);
  if (!account) return null;

  const transactions = await db.query.paypalTransactions.findMany({
    where: eq(paypalTransactions.accountId, account.id),
  });

  const paidAmount = transactions
    .filter((t) => t.status === "S")
    .reduce((sum, t) => sum + (t.amount ?? 0), 0);

  const refundedAmount = transactions
    .filter((t) => t.status === "F" || t.status === "D")
    .reduce((sum, t) => sum + Math.abs(t.amount ?? 0), 0);

  const balance = Math.round((paidAmount - refundedAmount) / 100);

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const monthlyTxns = transactions.filter((t) => {
    const d = t.transactionDate ? new Date(t.transactionDate) : null;
    return d && d >= monthStart && d < monthEnd;
  });

  const monthlyRevenue = monthlyTxns
    .filter((t) => t.status === "S")
    .reduce((sum, t) => sum + (t.netAmount ?? t.amount ?? 0), 0);

  const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonthlyTxns = transactions.filter((t) => {
    const d = t.transactionDate ? new Date(t.transactionDate) : null;
    return d && d >= prevMonthStart && d < monthStart;
  });
  const prevMonthlyRevenue = prevMonthlyTxns
    .filter((t) => t.status === "S")
    .reduce((sum, t) => sum + (t.netAmount ?? t.amount ?? 0), 0);

  const pendingTxns = transactions.filter((t) => t.status === "P");

  const invoices = await db.query.paypalInvoices.findMany({
    where: eq(paypalInvoices.accountId, account.id),
  });

  const outstanding = invoices.filter(
    (i) => i.status === "SENT" || i.status === "UNPAID" || i.status === "PARTIAL_PAYMENT"
  );
  const outstandingTotal = outstanding.reduce((sum, i) => sum + (i.dueAmount ?? i.amount ?? 0), 0);

  const refundsThisMonth = monthlyTxns
    .filter((t) => t.status === "F" || t.status === "D")
    .reduce((sum, t) => sum + Math.abs(t.amount ?? 0), 0);

  const subs = await db.query.paypalSubscriptions.findMany({
    where: eq(paypalSubscriptions.accountId, account.id),
  });
  const activeSubs = subs.filter((s) => s.status === "ACTIVE");

  return {
    balance,
    monthlyRevenue: Math.round(monthlyRevenue / 100),
    prevMonthlyRevenue: Math.round(prevMonthlyRevenue / 100),
    pendingTransactions: pendingTxns.length,
    pendingAmount: Math.round(pendingTxns.reduce((s, t) => s + (t.amount ?? 0), 0) / 100),
    outstandingInvoices: outstanding.length,
    outstandingTotal: Math.round(outstandingTotal / 100),
    refundsThisMonth: Math.round(refundsThisMonth / 100),
    activeSubscriptions: activeSubs.length,
    lastSyncedAt: account.lastSyncedAt?.toISOString() ?? null,
    isConnected: true,
  };
}

export async function getPayPalMonthlyRevenue(accountId: string, months: number = 12) {
  const transactions = await db.query.paypalTransactions.findMany({
    where: eq(paypalTransactions.accountId, accountId),
  });

  const result: { month: string; gross: number; net: number; fees: number }[] = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const monthStr = monthStart.toISOString().slice(0, 7);

    const monthTxns = transactions.filter((t) => {
      const d = t.transactionDate ? new Date(t.transactionDate) : null;
      return d && d >= monthStart && d < monthEnd && t.status === "S";
    });

    const gross = monthTxns.reduce((sum, t) => sum + (t.amount ?? 0), 0);
    const fees = monthTxns.reduce((sum, t) => sum + Math.abs(t.feeAmount ?? 0), 0);
    const net = gross - fees;

    result.push({
      month: monthStr,
      gross: Math.round(gross / 100),
      net: Math.round(net / 100),
      fees: Math.round(fees / 100),
    });
  }

  return result;
}

export async function getPayPalTransactionStatusBreakdown(accountId: string) {
  const transactions = await db.query.paypalTransactions.findMany({
    where: eq(paypalTransactions.accountId, accountId),
  });

  const counts: Record<string, number> = {};
  for (const t of transactions) {
    const status = t.status ?? "UNKNOWN";
    counts[status] = (counts[status] ?? 0) + 1;
  }

  const total = transactions.length;
  return Object.entries(counts).map(([status, count]) => ({
    status,
    count,
    percentage: total > 0 ? Math.round((count / total) * 100) : 0,
  }));
}

export async function getPayPalTopPayers(accountId: string, limit: number = 10) {
  const transactions = await db.query.paypalTransactions.findMany({
    where: eq(paypalTransactions.accountId, accountId),
  });

  const grouped: Record<string, { name: string; total: number; count: number }> = {};
  for (const t of transactions) {
    if (t.status !== "S" || !t.payerEmail) continue;
    const email = t.payerEmail;
    if (!grouped[email]) {
      grouped[email] = { name: t.payerName ?? email, total: 0, count: 0 };
    }
    grouped[email].total += t.netAmount ?? t.amount ?? 0;
    grouped[email].count++;
  }

  return Object.entries(grouped)
    .map(([email, data]) => ({ email, ...data, total: Math.round(data.total / 100) }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}

export async function getPayPalTransactionsPaginated(
  accountId: string,
  page: number = 1,
  perPage: number = 25
) {
  const offset = (page - 1) * perPage;
  const items = await db.query.paypalTransactions.findMany({
    where: eq(paypalTransactions.accountId, accountId),
    orderBy: (t, { desc }) => [desc(t.transactionDate)],
    limit: perPage,
    offset,
  });
  const [totalRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(paypalTransactions)
    .where(eq(paypalTransactions.accountId, accountId));
  const total = totalRow?.count ?? 0;
  return { items, total, page, perPage, totalPages: Math.ceil(total / perPage) };
}

export async function getPayPalInvoicesList(accountId: string) {
  const items = await db.query.paypalInvoices.findMany({
    where: eq(paypalInvoices.accountId, accountId),
    orderBy: (i, { desc }) => [desc(i.invoiceDate)],
  });
  const [totalRow] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(paypalInvoices)
    .where(eq(paypalInvoices.accountId, accountId));
  return { items, total: totalRow?.count ?? 0 };
}
