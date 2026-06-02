import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import { db } from "@/db";
import { lemonSqueezyAccounts, lemonSqueezyOrders, lemonSqueezySubscriptions, lemonSqueezyCustomers } from "@/db/schema";
import { notifications } from "@/db/schema/notifications";
import { eq } from "drizzle-orm";
import { logger } from "@/lib/logger";

// ─── Types ──────────────────────────────────────────────

interface LsWebhookData<T> {
  id: string;
  type: string;
  attributes: T;
}

interface LsWebhookPayload<T> {
  meta: { event_name: string; custom_data: Record<string, unknown>; test_mode: boolean };
  data: LsWebhookData<T>;
}

interface OrderAttrs {
  store_id: number;
  order_number: number;
  total: number;
  currency: string;
  status: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  first_order_item: { product_name: string; variant_name: string } | null;
}

interface SubscriptionAttrs {
  store_id: number;
  status: string;
  customer_id: string;
  product_name: string;
  variant_name: string;
  billing_anchor: number;
  created_at: string;
  renews_at: string;
  ends_at: string | null;
  cancelled: boolean;
  mrr: number;
  currency: string;
  urls?: { update_payment_method: string };
}

interface CustomerAttrs {
  store_id: number;
  name: string;
  email: string;
  status: string;
  created_at: string;
}

interface DisputeAttrs {
  store_id: number;
  amount: number;
  currency: string;
  status: string;
  order_id: string;
  created_at: string;
  reason: string;
}

interface AffiliateAttrs {
  store_id: number;
  name: string;
  email: string;
  activated_at: string;
}

interface LicenseAttrs {
  store_id: number;
  license_key: string;
  status: string;
  product_name: string;
  customer_email: string;
  created_at: string;
}

type WebhookPayload =
  | LsWebhookPayload<OrderAttrs>
  | LsWebhookPayload<SubscriptionAttrs>
  | LsWebhookPayload<CustomerAttrs>
  | LsWebhookPayload<DisputeAttrs>
  | LsWebhookPayload<AffiliateAttrs>
  | LsWebhookPayload<LicenseAttrs>;

// ─── Helpers ────────────────────────────────────────────

function verifySignature(payload: string, signature: string, secret: string): boolean {
  try {
    const hmac = createHmac("sha256", secret);
    hmac.update(payload);
    const digest = hmac.digest("hex");
    const expected = Buffer.from(digest);
    const actual = Buffer.from(signature);
    if (expected.length !== actual.length) return false;
    return timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

async function findAccountByStoreId(storeId: string) {
  return db.query.lemonSqueezyAccounts.findFirst({
    where: eq(lemonSqueezyAccounts.storeId, storeId),
  });
}

async function createAlert(userId: string, severity: "info" | "warning" | "critical", title: string, message: string) {
  try {
    await db.insert(notifications).values({ userId, severity, title, message });
  } catch (err) {
    logger.error({ err, userId }, "Failed to create webhook alert");
  }
}

function parseEvent<T>(body: string): { name: string; data: LsWebhookData<T> } | null {
  try {
    const parsed = JSON.parse(body) as LsWebhookPayload<T>;
    const name = parsed.meta?.event_name;
    if (!name || !parsed.data) return null;
    return { name, data: parsed.data };
  } catch {
    return null;
  }
}

// ─── Handler ────────────────────────────────────────────

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("x-signature") ?? "";

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 401 });
  }

  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    logger.error("LEMONSQUEEZY_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "Server config error" }, { status: 500 });
  }

  if (!verifySignature(body, signature, secret)) {
    logger.warn("Invalid Lemon Squeezy webhook signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const parsed = parseEvent(body);
  if (!parsed) {
    logger.warn("Unparseable webhook payload");
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { name: eventName, data } = parsed;
  logger.info({ event: eventName, dataId: data.id }, "LS webhook received");

  // Find account via store_id embedded in the data attributes
  const attrs = data.attributes as Record<string, unknown>;
  const storeId = String(attrs.store_id ?? "");
  const account = storeId ? await findAccountByStoreId(storeId) : null;

  if (!account) {
    logger.info({ event: eventName, storeId }, "No matching LS account — acking anyway");
    return NextResponse.json({ received: true });
  }

  const userId = account.userId;

  // Return 200 immediately, process asynchronously
  processEvent(eventName, data as LsWebhookData<unknown>, userId).catch((err) =>
    logger.error({ err, event: eventName, userId }, "Async webhook processing failed")
  );

  return NextResponse.json({ received: true });
}

async function processEvent(eventName: string, data: LsWebhookData<unknown>, userId: string) {
  logger.info({ event: eventName, userId }, "Processing webhook event");

  try {
    switch (eventName) {
      // ─── ORDERS ──────────────────────────────────
      case "order_created": {
        const a = data.attributes as OrderAttrs;
        const item = a.first_order_item;
        await db
          .insert(lemonSqueezyOrders)
          .values({
            userId,
            lsOrderId: data.id,
            orderNumber: a.order_number,
            total: a.total,
            currency: a.currency,
            status: "paid",
            customerName: a.customer_name,
            customerEmail: a.customer_email,
            productName: item?.product_name,
            variantName: item?.variant_name,
            createdAt: new Date(a.created_at),
          })
          .onConflictDoNothing({ target: [lemonSqueezyOrders.lsOrderId] });
        break;
      }

      case "order_refunded": {
        const a = data.attributes as OrderAttrs;
        await db
          .update(lemonSqueezyOrders)
          .set({ status: "refunded" })
          .where(eq(lemonSqueezyOrders.lsOrderId, data.id));
        break;
      }

      // ─── SUBSCRIPTIONS ──────────────────────────
      case "subscription_created": {
        const a = data.attributes as SubscriptionAttrs;
        await db
          .insert(lemonSqueezySubscriptions)
          .values({
            userId,
            lsSubId: data.id,
            status: a.status,
            customerId: a.customer_id,
            productName: a.product_name,
            variantName: a.variant_name,
            mrr: a.mrr,
            currency: a.currency,
            cancelled: a.cancelled ? 1 : 0,
            renewsAt: a.renews_at ? new Date(a.renews_at) : null,
            endsAt: a.ends_at ? new Date(a.ends_at) : null,
            createdAt: new Date(a.created_at),
          })
          .onConflictDoNothing({ target: [lemonSqueezySubscriptions.lsSubId] });
        break;
      }

      case "subscription_updated": {
        const a = data.attributes as SubscriptionAttrs;
        await db
          .update(lemonSqueezySubscriptions)
          .set({
            status: a.status,
            mrr: a.mrr,
            cancelled: a.cancelled ? 1 : 0,
            renewsAt: a.renews_at ? new Date(a.renews_at) : null,
            endsAt: a.ends_at ? new Date(a.ends_at) : null,
          })
          .where(eq(lemonSqueezySubscriptions.lsSubId, data.id));
        break;
      }

      case "subscription_cancelled": {
        const a = data.attributes as SubscriptionAttrs;
        await db
          .update(lemonSqueezySubscriptions)
          .set({ status: "cancelled", cancelled: 1, endsAt: a.ends_at ? new Date(a.ends_at) : null })
          .where(eq(lemonSqueezySubscriptions.lsSubId, data.id));
        await createAlert(userId, "warning", "Subscription cancelled", `Subscription cancelled: ${a.product_name} (${a.customer_id})`);
        break;
      }

      case "subscription_resumed": {
        const a = data.attributes as SubscriptionAttrs;
        await db
          .update(lemonSqueezySubscriptions)
          .set({ status: "active", cancelled: 0, endsAt: null, mrr: a.mrr })
          .where(eq(lemonSqueezySubscriptions.lsSubId, data.id));
        break;
      }

      case "subscription_expired": {
        await db
          .update(lemonSqueezySubscriptions)
          .set({ status: "expired" })
          .where(eq(lemonSqueezySubscriptions.lsSubId, data.id));
        break;
      }

      case "subscription_paused": {
        await db
          .update(lemonSqueezySubscriptions)
          .set({ status: "paused", mrr: 0 })
          .where(eq(lemonSqueezySubscriptions.lsSubId, data.id));
        break;
      }

      case "subscription_unpaused": {
        const a = data.attributes as SubscriptionAttrs;
        await db
          .update(lemonSqueezySubscriptions)
          .set({ status: "active", mrr: a.mrr })
          .where(eq(lemonSqueezySubscriptions.lsSubId, data.id));
        break;
      }

      case "subscription_payment_success": {
        const a = data.attributes as SubscriptionAttrs;
        await db
          .update(lemonSqueezySubscriptions)
          .set({ status: "active", renewsAt: a.renews_at ? new Date(a.renews_at) : null })
          .where(eq(lemonSqueezySubscriptions.lsSubId, data.id));
        break;
      }

      case "subscription_payment_failed": {
        const a = data.attributes as SubscriptionAttrs;
        await db
          .update(lemonSqueezySubscriptions)
          .set({ status: "past_due" })
          .where(eq(lemonSqueezySubscriptions.lsSubId, data.id));
        await createAlert(
          userId,
          "critical",
          "Payment failed",
          `Payment failed for subscription ${a.product_name} (${a.customer_id})`
        );
        break;
      }

      case "subscription_payment_recovered": {
        const a = data.attributes as SubscriptionAttrs;
        await db
          .update(lemonSqueezySubscriptions)
          .set({ status: "active", renewsAt: a.renews_at ? new Date(a.renews_at) : null })
          .where(eq(lemonSqueezySubscriptions.lsSubId, data.id));
        break;
      }

      case "subscription_payment_refunded": {
        await db
          .update(lemonSqueezySubscriptions)
          .set({ mrr: 0, status: "cancelled" })
          .where(eq(lemonSqueezySubscriptions.lsSubId, data.id));
        break;
      }

      case "subscription_plan_changed": {
        const a = data.attributes as SubscriptionAttrs;
        await db
          .update(lemonSqueezySubscriptions)
          .set({ productName: a.product_name, variantName: a.variant_name, mrr: a.mrr })
          .where(eq(lemonSqueezySubscriptions.lsSubId, data.id));
        break;
      }

      // ─── CUSTOMERS ──────────────────────────────
      case "customer_updated": {
        const a = data.attributes as CustomerAttrs;
        await db
          .update(lemonSqueezyCustomers)
          .set({ name: a.name, email: a.email })
          .where(eq(lemonSqueezyCustomers.lsCustomerId, data.id));
        break;
      }

      // ─── DISPUTES ───────────────────────────────
      case "dispute_created": {
        const a = data.attributes as DisputeAttrs;
        await createAlert(
          userId,
          "critical",
          "Chargeback opened",
          `Chargeback opened: $${(a.amount / 100).toFixed(2)} — ${a.reason}`
        );
        break;
      }

      case "dispute_resolved": {
        const a = data.attributes as DisputeAttrs;
        await createAlert(
          userId,
          "info",
          "Dispute resolved",
          `Dispute resolved: $${(a.amount / 100).toFixed(2)} — ${a.status}`
        );
        break;
      }

      // ─── AFFILIATES ─────────────────────────────
      case "affiliate_activated": {
        const a = data.attributes as AffiliateAttrs;
        logger.info({ userId, affiliate: a.email }, "Affiliate activated");
        break;
      }

      // ─── LICENSE KEYS ───────────────────────────
      case "license_key_created": {
        const a = data.attributes as LicenseAttrs;
        logger.info({ userId, licenseKey: a.license_key, product: a.product_name }, "License key created");
        break;
      }

      case "license_key_updated": {
        const a = data.attributes as LicenseAttrs;
        logger.info({ userId, licenseKey: a.license_key, status: a.status }, "License key updated");
        break;
      }

      default: {
        logger.info({ event: eventName }, "Unrecognized LS webhook event — acking");
      }
    }

    logger.info({ event: eventName, userId }, "Webhook event processed");
  } catch (err) {
    logger.error({ err, event: eventName, userId }, "Webhook event processing error");
  }
}
