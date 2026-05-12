import { pgTable, uuid, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { users } from "./users";

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  plan: text("plan").default("starter").notNull(),
  status: text("status").notNull(),
  mrrCents: integer("mrr_cents").default(0).notNull(),
  // Lemon Squeezy fields
  lemonSqueezySubscriptionId: text("lemonsqueezy_subscription_id"),
  lemonSqueezyCustomerId: text("lemonsqueezy_customer_id"),
  lemonSqueezyOrderId: text("lemonsqueezy_order_id"),
  lemonSqueezyProductId: text("lemonsqueezy_product_id"),
  lemonSqueezyVariantId: text("lemonsqueezy_variant_id"),
  lemonSqueezyCustomerPortalUrl: text("lemonsqueezy_customer_portal_url"),
  trialEndsAt: timestamp("trial_ends_at"),
  renewsAt: timestamp("renews_at"),
  endsAt: timestamp("ends_at"),
  isCancelled: boolean("is_cancelled").default(false),
  // Legacy Stripe field
  stripeSubId: text("stripe_sub_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
