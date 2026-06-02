import { db } from "@/db";
import {
  lemonSqueezyAccounts,
  lemonSqueezyOrders,
  lemonSqueezySubscriptions,
  lemonSqueezyCustomers,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  getLemonSqueezyOrders,
  getLemonSqueezySubscriptions,
  getLemonSqueezyCustomers,
} from "@/services/lemonSqueezy";
import { updateLemonSqueezySyncTime } from "@/db/queries/lemon-squeezy";
import { decrypt } from "@/lib/crypto";
import { logger } from "@/lib/logger";

export async function syncLemonSqueezyData(userId: string, apiKey: string) {
  logger.info({ userId }, "Starting Lemon Squeezy sync");

  const [orders, subscriptions, customers] = await Promise.all([
    getLemonSqueezyOrders(apiKey),
    getLemonSqueezySubscriptions(apiKey),
    getLemonSqueezyCustomers(apiKey),
  ]);

  // Sync orders
  for (const order of orders) {
    const attrs = order.attributes;
    await db
      .insert(lemonSqueezyOrders)
      .values({
        userId,
        lsOrderId: order.id,
        orderNumber: attrs.order_number,
        total: attrs.total,
        currency: attrs.currency,
        status: attrs.status,
        customerName: attrs.customer_name,
        customerEmail: attrs.customer_email,
        productName: attrs.first_order_item?.product_name,
        variantName: attrs.first_order_item?.variant_name,
        createdAt: new Date(attrs.created_at),
      })
      .onConflictDoUpdate({
        target: [lemonSqueezyOrders.lsOrderId],
        set: {
          status: attrs.status,
          total: attrs.total,
          customerName: attrs.customer_name,
          customerEmail: attrs.customer_email,
          productName: attrs.first_order_item?.product_name,
          variantName: attrs.first_order_item?.variant_name,
          syncedAt: new Date(),
        },
      });
  }

  // Sync subscriptions
  for (const sub of subscriptions) {
    const attrs = sub.attributes;
    await db
      .insert(lemonSqueezySubscriptions)
      .values({
        userId,
        lsSubId: sub.id,
        status: attrs.status,
        customerId: attrs.customer_id,
        productName: attrs.product_name,
        variantName: attrs.variant_name,
        mrr: attrs.mrr,
        currency: attrs.currency,
        cancelled: attrs.cancelled ? 1 : 0,
        renewsAt: attrs.renews_at ? new Date(attrs.renews_at) : null,
        endsAt: attrs.ends_at ? new Date(attrs.ends_at) : null,
        createdAt: new Date(attrs.created_at),
      })
      .onConflictDoUpdate({
        target: [lemonSqueezySubscriptions.lsSubId],
        set: {
          status: attrs.status,
          mrr: attrs.mrr,
          cancelled: attrs.cancelled ? 1 : 0,
          renewsAt: attrs.renews_at ? new Date(attrs.renews_at) : null,
          endsAt: attrs.ends_at ? new Date(attrs.ends_at) : null,
          syncedAt: new Date(),
        },
      });
  }

  // Sync customers
  for (const customer of customers) {
    const attrs = customer.attributes;
    await db
      .insert(lemonSqueezyCustomers)
      .values({
        userId,
        lsCustomerId: customer.id,
        name: attrs.name,
        email: attrs.email,
        status: attrs.status,
        createdAt: new Date(attrs.created_at),
      })
      .onConflictDoUpdate({
        target: [lemonSqueezyCustomers.lsCustomerId],
        set: {
          name: attrs.name,
          email: attrs.email,
          status: attrs.status,
          syncedAt: new Date(),
        },
      });
  }

  await updateLemonSqueezySyncTime(userId);

  const result = {
    orders: orders.length,
    subscriptions: subscriptions.length,
    customers: customers.length,
  };

  logger.info({ userId, ...result }, "Lemon Squeezy sync completed");
  return result;
}

export async function syncAllLemonSqueezyAccounts() {
  const accounts = await db.query.lemonSqueezyAccounts.findMany();

  const results = [];
  for (const account of accounts) {
    try {
      const apiKey = decrypt(account.apiKey);
      const result = await syncLemonSqueezyData(account.userId, apiKey);
      results.push({ userId: account.userId, ...result });
    } catch (err) {
      logger.error({ err, userId: account.userId }, "Lemon Squeezy sync failed for account");
      results.push({ userId: account.userId, error: String(err) });
    }
  }

  return results;
}
