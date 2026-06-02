import { NextResponse } from "next/server";
import { db } from "@/db";
import { paypalTransactions, paypalInvoices, paypalSubscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  const body = await request.json();
  const webhookEvent = body as Record<string, unknown>;

  try {
    const eventType = webhookEvent.event_type as string | undefined;
    const resource = webhookEvent.resource as Record<string, unknown> | undefined;

    if (!eventType || !resource) {
      return NextResponse.json({ error: "Invalid webhook payload" }, { status: 400 });
    }

    processEvent(eventType, resource).catch((err) => {
      logger.error({ err, eventType }, "PayPal webhook processing failed");
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    logger.error({ err }, "PayPal webhook handler error");
    return NextResponse.json({ received: true });
  }
}

async function processEvent(eventType: string, resource: Record<string, unknown>) {
  switch (eventType) {
    case "PAYMENT.CAPTURE.COMPLETED": {
      const id = resource.id as string;
      const amount = parseFloat((resource.amount as Record<string, unknown>)?.value as string ?? "0");
      const currency = (resource.amount as Record<string, unknown>)?.currency_code as string ?? "USD";
      const breakdown = resource.seller_receivable_breakdown as Record<string, unknown> | undefined;
      const paypalFee = breakdown?.paypal_fee as Record<string, unknown> | undefined;
      const fee = parseFloat(paypalFee?.value as string ?? "0");
      const payerEmail = (resource.payer as Record<string, unknown>)?.email_address as string;
      const payerName = ((resource.payer as Record<string, unknown>)?.name as Record<string, unknown>)?.given_name as string;
      const createTime = resource.create_time as string;

      await db.insert(paypalTransactions).values({
        accountId: "",
        transactionId: id,
        status: "S",
        amount: Math.round(amount * 100),
        currency,
        feeAmount: Math.round(fee * 100),
        netAmount: Math.round((amount - fee) * 100),
        payerEmail,
        payerName,
        transactionDate: createTime ? new Date(createTime) : new Date(),
      }).onConflictDoUpdate({
        target: [paypalTransactions.transactionId],
        set: { status: "S", updatedAt: new Date() },
      });
      break;
    }

    case "PAYMENT.CAPTURE.REFUNDED": {
      const id = resource.id as string;
      await db.update(paypalTransactions)
        .set({ status: "F", updatedAt: new Date() })
        .where(eq(paypalTransactions.transactionId, id));
      break;
    }

    case "PAYMENT.CAPTURE.DENIED": {
      const deniedId = resource.id as string;
      await db.update(paypalTransactions)
        .set({ status: "D", updatedAt: new Date() })
        .where(eq(paypalTransactions.transactionId, deniedId));
      break;
    }

    case "INVOICING.INVOICE.PAID": {
      const invId = resource.id as string;
      await db.update(paypalInvoices)
        .set({ status: "PAID", updatedAt: new Date() })
        .where(eq(paypalInvoices.invoiceId, invId));
      break;
    }

    case "INVOICING.INVOICE.CANCELLED": {
      const cancelledInvId = resource.id as string;
      await db.update(paypalInvoices)
        .set({ status: "CANCELLED", updatedAt: new Date() })
        .where(eq(paypalInvoices.invoiceId, cancelledInvId));
      break;
    }

    case "BILLING.SUBSCRIPTION.CREATED":
    case "BILLING.SUBSCRIPTION.ACTIVATED": {
      const subId = resource.id as string;
      const planId = resource.plan_id as string;
      const subscriber = resource.subscriber as Record<string, unknown> ?? {};
      const subscriberEmail = subscriber.email_address as string;
      const subscriberNameObj = subscriber.name as Record<string, unknown> ?? {};
      const subscriberName = `${subscriberNameObj.given_name ?? ""} ${subscriberNameObj.surname ?? ""}`.trim();
      const billingInfo = resource.billing_info as Record<string, unknown> ?? {};
      const lastPayment = billingInfo.last_payment as Record<string, unknown> ?? {};
      const lastPaymentAmount = parseFloat((lastPayment.amount as Record<string, unknown>)?.value as string ?? "0");
      const lastPaymentTime = lastPayment.time as string;
      const nextBillingTime = billingInfo.next_billing_time as string;
      const failedCount = (billingInfo.failed_payments_count as number) ?? 0;

      await db.insert(paypalSubscriptions).values({
        accountId: "",
        subscriptionId: subId,
        planId,
        status: "ACTIVE",
        subscriberEmail,
        subscriberName,
        lastPaymentAmount: Math.round(lastPaymentAmount * 100),
        lastPaymentDate: lastPaymentTime ? new Date(lastPaymentTime) : null,
        nextBillingDate: nextBillingTime ? new Date(nextBillingTime) : null,
        failedPaymentsCount: failedCount,
      }).onConflictDoUpdate({
        target: [paypalSubscriptions.subscriptionId],
        set: { status: "ACTIVE", updatedAt: new Date() },
      });
      break;
    }

    case "BILLING.SUBSCRIPTION.CANCELLED": {
      const cancelledSubId = resource.id as string;
      await db.update(paypalSubscriptions)
        .set({ status: "CANCELLED", updatedAt: new Date() })
        .where(eq(paypalSubscriptions.subscriptionId, cancelledSubId));
      break;
    }

    case "BILLING.SUBSCRIPTION.EXPIRED": {
      const expiredSubId = resource.id as string;
      await db.update(paypalSubscriptions)
        .set({ status: "EXPIRED", updatedAt: new Date() })
        .where(eq(paypalSubscriptions.subscriptionId, expiredSubId));
      break;
    }

    case "BILLING.SUBSCRIPTION.PAYMENT.FAILED": {
      const failedSubId = resource.id as string;
      const sub = await db.query.paypalSubscriptions.findFirst({
        where: eq(paypalSubscriptions.subscriptionId, failedSubId),
      });
      await db.update(paypalSubscriptions)
        .set({
          failedPaymentsCount: (sub?.failedPaymentsCount ?? 0) + 1,
          updatedAt: new Date(),
        })
        .where(eq(paypalSubscriptions.subscriptionId, failedSubId));
      break;
    }
  }
}
