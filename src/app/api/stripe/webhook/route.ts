import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getStripeClient } from "@/core/stripe/client";
import { handleSubscriptionEvent, handleInvoiceEvent } from "@/core/stripe/webhook-handler";
import { db } from "@/db";
import { stripeAccounts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const sig = headersList.get("stripe-signature")!;

  let event;

  try {
    event = getStripeClient(process.env.STRIPE_SECRET_KEY!).webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    logger.error({ err }, "Webhook signature verification failed");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const subscriptionEvents = [
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
  ];

  const invoiceEvents = [
    "invoice.payment_succeeded",
    "invoice.payment_failed",
    "invoice.created",
    "invoice.updated",
  ];

  if (subscriptionEvents.includes(event.type)) {
    const accounts = await db.query.stripeAccounts.findMany();
    for (const account of accounts) {
      try {
        await handleSubscriptionEvent(account.userId, event);
      } catch (err) {
        logger.error({ err, userId: account.userId }, "Failed to process subscription event");
      }
    }
  }

  if (invoiceEvents.includes(event.type)) {
    const accounts = await db.query.stripeAccounts.findMany();
    for (const account of accounts) {
      try {
        await handleInvoiceEvent(account.userId, event);
      } catch (err) {
        logger.error({ err, userId: account.userId }, "Failed to process invoice event");
      }
    }
  }

  return NextResponse.json({ received: true });
}
