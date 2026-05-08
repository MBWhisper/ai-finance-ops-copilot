import { db } from "@/db";
import { metricsDaily, stripeAccounts, invoices } from "@/db/schema";
import { getStripeClient } from "./client";
import { decrypt } from "@/lib/crypto";
import { eq, and, gte, lte } from "drizzle-orm";
import { logger } from "@/lib/logger";

export async function syncStripeData(userId: string): Promise<{ mrrCents: number; invoiceCount: number }> {
  const account = await db.query.stripeAccounts.findFirst({
    where: eq(stripeAccounts.userId, userId),
  });

  if (!account) {
    throw new Error("No Stripe account linked for this user");
  }

  const stripeKey = decrypt(account.accessToken);
  const stripe = getStripeClient(stripeKey);

  logger.info({ userId }, "Starting Stripe sync");

  const subscriptions = await stripe.subscriptions.list({
    limit: 100,
    status: "all",
  });

  const today = new Date().toISOString().split("T")[0]!;
  let totalMrr = 0;

  for (const sub of subscriptions.data) {
    if (sub.status === "active" || sub.status === "trialing") {
      for (const item of sub.items.data) {
        const price = item.price;
        if (price.unit_amount && price.recurring?.interval === "month") {
          totalMrr += price.unit_amount;
        } else if (price.unit_amount && price.recurring?.interval === "year") {
          totalMrr += Math.round(price.unit_amount / 12);
        }
      }
    }
  }

  await db
    .insert(metricsDaily)
    .values({
      userId,
      date: today,
      mrrCents: totalMrr,
      arrCents: totalMrr * 12,
    })
    .onConflictDoUpdate({
      target: [metricsDaily.userId, metricsDaily.date],
      set: {
        mrrCents: totalMrr,
        arrCents: totalMrr * 12,
      },
    });

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const stripeInvoices = await stripe.invoices.list({
    limit: 100,
    created: { gte: Math.floor(thirtyDaysAgo.getTime() / 1000) },
  });

  let invoiceCount = 0;
  for (const inv of stripeInvoices.data) {
    if (!inv.customer_email || !inv.due_date) continue;

    const statusMap: Record<string, "draft" | "sent" | "paid" | "overdue"> = {
      draft: "draft",
      open: "sent",
      paid: "paid",
      uncollectible: "overdue",
      void: "draft",
    };

    const mappedStatus = statusMap[inv.status ?? "draft"] ?? "draft";
    const dueDate = new Date(inv.due_date * 1000);
    const isOverdue = mappedStatus === "sent" && dueDate < new Date();

    await db
      .insert(invoices)
      .values({
        userId,
        customerEmail: inv.customer_email,
        amountCents: inv.amount_due ?? 0,
        dueDate: dueDate.toISOString().split("T")[0]!,
        status: isOverdue ? "overdue" : mappedStatus,
        stripeInvoiceId: inv.id,
      })
      .onConflictDoNothing();

    invoiceCount++;
  }

  await db
    .update(stripeAccounts)
    .set({ lastSyncAt: new Date() })
    .where(eq(stripeAccounts.userId, userId));

  logger.info({ userId, mrrCents: totalMrr, invoiceCount }, "Stripe sync completed");

  return { mrrCents: totalMrr, invoiceCount };
}
