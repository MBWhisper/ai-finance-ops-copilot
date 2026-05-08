import { db } from "@/db";
import { metricsDaily, invoices } from "@/db/schema";
import { buildMrrFromSubscription, aggregateMrr } from "./mrr-builder";
import type Stripe from "stripe";
import { eq, and, desc } from "drizzle-orm";
import { logger } from "@/lib/logger";

export async function handleSubscriptionEvent(
  userId: string,
  event: Stripe.Event
): Promise<void> {
  const sub = event.data.object as Stripe.Subscription;
  const snapshot = buildMrrFromSubscription(sub, event.data.previous_attributes);

  const today = new Date().toISOString().split("T")[0]!;

  const existingMetrics = await db.query.metricsDaily.findFirst({
    where: and(eq(metricsDaily.userId, userId), eq(metricsDaily.date, today)),
  });

  if (existingMetrics) {
    const currentSnapshots = await db.query.metricsDaily.findMany({
      where: eq(metricsDaily.userId, userId),
      orderBy: (m) => [desc(m.date)],
      limit: 30,
    });

    const aggregated = aggregateMrr(
      currentSnapshots.map((s) => ({
        totalMrrCents: s.mrrCents,
        newMrrCents: 0,
        expansionMrrCents: 0,
        contractionMrrCents: 0,
        churnedMrrCents: 0,
        reactivatedMrrCents: 0,
      }))
    );

    await db
      .update(metricsDaily)
      .set({
        mrrCents: aggregated.totalMrrCents + snapshot.totalMrrCents,
        arrCents: (aggregated.totalMrrCents + snapshot.totalMrrCents) * 12,
      })
      .where(eq(metricsDaily.id, existingMetrics.id));
  } else {
    await db.insert(metricsDaily).values({
      userId,
      date: today,
      mrrCents: snapshot.totalMrrCents,
      arrCents: snapshot.totalMrrCents * 12,
    });
  }

  logger.info(
    { userId, mrrCents: snapshot.totalMrrCents, eventType: event.type },
    "Subscription event processed"
  );
}

export async function handleInvoiceEvent(
  userId: string,
  event: Stripe.Event
): Promise<void> {
  const invoice = event.data.object as Stripe.Invoice;

  if (!invoice.customer_email) return;

  const dueDate = invoice.due_date
    ? new Date(invoice.due_date * 1000)
    : new Date();

  const statusMap: Record<string, "draft" | "sent" | "paid" | "overdue"> = {
    draft: "draft",
    open: "sent",
    paid: "paid",
    uncollectible: "overdue",
    void: "draft",
  };

  const status = statusMap[invoice.status ?? "draft"] ?? "draft";

  await db
    .insert(invoices)
    .values({
      userId,
      customerEmail: invoice.customer_email,
      amountCents: invoice.amount_due ?? 0,
      dueDate: dueDate.toISOString().split("T")[0]!,
      status,
      stripeInvoiceId: invoice.id,
    })
    .onConflictDoNothing();

  logger.info({ userId, invoiceId: invoice.id }, "Invoice event processed");
}
