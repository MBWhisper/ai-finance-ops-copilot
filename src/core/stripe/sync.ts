import { db } from "@/db";
import { stripeAccounts, subscriptions, invoices, metricsDaily } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getStripeClient } from "@/core/stripe/client";
import { decrypt } from "@/lib/crypto";
import { buildMrrFromSubscription, aggregateMrr } from "@/core/stripe/mrr-builder";
import { logger } from "@/lib/logger";

export async function syncStripeData(userId: string) {
  const account = await db.query.stripeAccounts.findFirst({
    where: eq(stripeAccounts.userId, userId),
  });

  if (!account) throw new Error("No Stripe account found");

  const apiKey = decrypt(account.accessToken);
  const stripe = getStripeClient(apiKey);

  try {
    const [stripeSubscriptions, stripeInvoices] = await Promise.all([
      stripe.subscriptions.list({
        limit: 100,
        status: "all",
        expand: ["data.items.data.price"],
      }),
      stripe.invoices.list({
        limit: 100,
      }),
    ]);

    const snapshots = stripeSubscriptions.data.map((sub) =>
      buildMrrFromSubscription(sub)
    );
    const mrrResult = aggregateMrr(snapshots);

    for (const sub of stripeSubscriptions.data) {
      await db
        .insert(subscriptions)
        .values({
          userId,
          stripeSubId: sub.id,
          plan: "starter",
          status: sub.status,
          mrrCents: snapshots.find((s) => s.stripeSubId === sub.id)?.mrrCents ?? 0,
        })
        .onConflictDoUpdate({
          target: [subscriptions.stripeSubId],
          set: {
            status: sub.status,
            mrrCents: snapshots.find((s) => s.stripeSubId === sub.id)?.mrrCents ?? 0,
          },
        });
    }

    for (const inv of stripeInvoices.data) {
      await db
        .insert(invoices)
        .values({
          userId,
          customerEmail: inv.customer_email ?? "unknown@stripe.com",
          amountCents: inv.amount_due,
          dueDate: inv.due_date
            ? new Date(inv.due_date * 1000).toISOString().split("T")[0]!
            : new Date().toISOString().split("T")[0]!,
          status: inv.status === "paid" ? "paid" : inv.status === "draft" ? "draft" : "sent",
          stripeInvoiceId: inv.id,
        })
        .onConflictDoUpdate({
          target: [invoices.stripeInvoiceId],
          set: {
            status: inv.status === "paid" ? "paid" : inv.status === "draft" ? "draft" : "sent",
          },
        });
    }

    const today = new Date().toISOString().split("T")[0]!;
    await db
      .insert(metricsDaily)
      .values({
        userId,
        date: today,
        mrrCents: mrrResult.totalMrrCents,
        arrCents: mrrResult.totalMrrCents * 12,
        churnRate: "0",
        ltvCents: 0,
      })
      .onConflictDoUpdate({
        target: [metricsDaily.userId, metricsDaily.date],
        set: {
          mrrCents: mrrResult.totalMrrCents,
          arrCents: mrrResult.totalMrrCents * 12,
        },
      });

    await db
      .update(stripeAccounts)
      .set({ lastSyncAt: new Date(), stripeAccountId: stripeInvoices.data[0]?.account_country ?? null })
      .where(eq(stripeAccounts.userId, userId));

    return { subscriptions: stripeSubscriptions.data.length, invoices: stripeInvoices.data.length };
  } catch (err) {
    logger.error({ err, userId }, "Stripe sync failed");
    throw err;
  }
}
