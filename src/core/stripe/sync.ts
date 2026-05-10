import { db } from "@/db";
import { stripeAccounts, subscriptions, invoices, metricsDaily } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getStripeClient, resetStripeClient } from "@/core/stripe/client";
import { decrypt } from "@/lib/crypto";
import { buildMrrFromSubscription, aggregateMrr } from "@/core/stripe/mrr-builder";
import { calculateMrr } from "@/core/metrics/calculator";
import { logger } from "@/lib/logger";

export async function syncStripeData(userId: string) {
  const account = await db.query.stripeAccounts.findFirst({
    where: eq(stripeAccounts.userId, userId),
  });

  if (!account) throw new Error("No Stripe account found");

  const apiKey = decrypt(account.accessToken);

  // Reset singleton so the new key is always used
  resetStripeClient();
  const stripe = getStripeClient(apiKey);

  try {
    // Fix #1: use autoPagingToArray to handle accounts with >100 records
    const [allStripeSubscriptions, allStripeInvoices] = await Promise.all([
      stripe.subscriptions
        .list({ limit: 100, status: "all", expand: ["data.items.data.price"] })
        .autoPagingToArray({ limit: 10_000 }),
      stripe.invoices
        .list({ limit: 100 })
        .autoPagingToArray({ limit: 10_000 }),
    ]);

    const snapshots = allStripeSubscriptions.map((sub) =>
      buildMrrFromSubscription(sub)
    );
    const mrrAggregate = aggregateMrr(snapshots);

    // Upsert subscriptions
    for (const sub of allStripeSubscriptions) {
      const snap = snapshots.find((s) => s.stripeSubId === sub.id);
      await db
        .insert(subscriptions)
        .values({
          userId,
          stripeSubId: sub.id,
          plan: "starter",
          status: sub.status,
          mrrCents: snap?.mrrCents ?? 0,
        })
        .onConflictDoUpdate({
          target: [subscriptions.stripeSubId],
          set: {
            status: sub.status,
            mrrCents: snap?.mrrCents ?? 0,
          },
        });
    }

    // Upsert invoices
    for (const inv of allStripeInvoices) {
      const statusMap: Record<string, string> = {
        paid: "paid",
        draft: "draft",
        open: "sent",
        uncollectible: "overdue",
        void: "overdue",
      };
      const invoiceStatus = inv.status ? (statusMap[inv.status] ?? "sent") : "draft";

      await db
        .insert(invoices)
        .values({
          userId,
          customerEmail: inv.customer_email ?? "unknown@stripe.com",
          amountCents: inv.amount_due,
          dueDate: inv.due_date
            ? new Date(inv.due_date * 1000).toISOString().split("T")[0]!
            : new Date().toISOString().split("T")[0]!,
          status: invoiceStatus,
          stripeInvoiceId: inv.id,
        })
        .onConflictDoUpdate({
          target: [invoices.stripeInvoiceId],
          set: { status: invoiceStatus },
        });
    }

    // Fix #3: compute real churnRate + ltvCents via calculateMrr()
    const metricsInput = snapshots.map((s) => ({
      status: s.status,
      mrrCents: s.mrrCents,
    }));
    const metrics = calculateMrr(metricsInput);

    const today = new Date().toISOString().split("T")[0]!;
    await db
      .insert(metricsDaily)
      .values({
        userId,
        date: today,
        mrrCents: metrics.mrrCents,
        arrCents: metrics.arrCents,
        churnRate: metrics.churnRate.toFixed(4),
        ltvCents: metrics.ltvCents,
      })
      .onConflictDoUpdate({
        target: [metricsDaily.userId, metricsDaily.date],
        set: {
          mrrCents: metrics.mrrCents,
          arrCents: metrics.arrCents,
          churnRate: metrics.churnRate.toFixed(4),
          ltvCents: metrics.ltvCents,
        },
      });

    // Fix #2: update lastSyncAt only — do NOT overwrite stripeAccountId with account_country
    await db
      .update(stripeAccounts)
      .set({ lastSyncAt: new Date() })
      .where(eq(stripeAccounts.userId, userId));

    logger.info(
      { userId, subscriptions: allStripeSubscriptions.length, invoices: allStripeInvoices.length },
      "Stripe sync completed"
    );

    return {
      subscriptions: allStripeSubscriptions.length,
      invoices: allStripeInvoices.length,
      mrrCents: metrics.mrrCents,
    };
  } catch (err) {
    logger.error({ err, userId }, "Stripe sync failed");
    throw err;
  }
}
