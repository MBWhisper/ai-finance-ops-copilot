import type Stripe from "stripe";
import { db } from "@/db";
import { subscriptions, invoices, metricsDaily } from "@/db/schema";
import { eq } from "drizzle-orm";
import { buildMrrFromSubscription, aggregateMrr } from "@/core/stripe/mrr-builder";
import { logger } from "@/lib/logger";

export async function handleSubscriptionEvent(userId: string, event: Stripe.Event) {
  const sub = event.data.object as Stripe.Subscription;

  const snapshot = buildMrrFromSubscription(sub);

  await db
    .insert(subscriptions)
    .values({
      userId,
      stripeSubId: sub.id,
      plan: "starter",
      status: sub.status,
      mrrCents: snapshot.mrrCents,
    })
    .onConflictDoUpdate({
      target: [subscriptions.stripeSubId],
      set: {
        status: sub.status,
        mrrCents: snapshot.mrrCents,
      },
    });

  const allSubs = await db.query.subscriptions.findMany({
    where: eq(subscriptions.userId, userId),
  });

  const mrrSnapshots = allSubs.map((s) => ({
    stripeSubId: s.stripeSubId ?? "",
    status: s.status,
    mrrCents: s.mrrCents,
    currency: "usd",
  }));

  const mrrResult = aggregateMrr(mrrSnapshots);

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

  logger.info({ userId, subId: sub.id, status: sub.status }, "Subscription event processed");
}

export async function handleInvoiceEvent(userId: string, event: Stripe.Event) {
  const inv = event.data.object as Stripe.Invoice;

  let invoiceStatus: string;
  if (event.type === 'invoice.payment_failed') {
    invoiceStatus = 'overdue';
  } else {
    const statusMap: Record<string, string> = {
      paid: "paid",
      draft: "draft",
      open: "sent",
      uncollectible: "overdue",
      void: "overdue",
    };
    invoiceStatus = inv.status ? (statusMap[inv.status] ?? "sent") : "draft";
  }

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
      set: {
        status: invoiceStatus,
      },
    });

  logger.info({ userId, invoiceId: inv.id, status: inv.status }, "Invoice event processed");
}
