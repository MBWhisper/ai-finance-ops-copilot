import { pgTable, uuid, text, timestamp, integer, uniqueIndex } from "drizzle-orm/pg-core";
import { users } from "./users";

export const lemonSqueezyAccounts = pgTable("lemon_squeezy_accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  apiKey: text("api_key").notNull(),
  storeName: text("store_name"),
  storeId: text("store_id"),
  lastSyncAt: timestamp("last_sync_at"),
  webhookSecret: text("webhook_secret"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const lemonSqueezyOrders = pgTable(
  "lemon_squeezy_orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lsOrderId: text("ls_order_id").notNull(),
    orderNumber: integer("order_number").notNull(),
    total: integer("total").notNull(),
    currency: text("currency").notNull(),
    status: text("status").notNull(),
    customerName: text("customer_name"),
    customerEmail: text("customer_email"),
    productName: text("product_name"),
    variantName: text("variant_name"),
    createdAt: timestamp("created_at").notNull(),
    syncedAt: timestamp("synced_at").defaultNow().notNull(),
  },
  (table) => ({
    lsOrderIdIdx: uniqueIndex("ls_order_id_idx").on(table.lsOrderId),
  })
);

export const lemonSqueezySubscriptions = pgTable(
  "lemon_squeezy_subscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lsSubId: text("ls_sub_id").notNull(),
    status: text("status").notNull(),
    customerId: text("customer_id"),
    productName: text("product_name"),
    variantName: text("variant_name"),
    mrr: integer("mrr").notNull().default(0),
    currency: text("currency"),
    cancelled: integer("cancelled").notNull().default(0),
    renewsAt: timestamp("renews_at"),
    endsAt: timestamp("ends_at"),
    createdAt: timestamp("created_at").notNull(),
    syncedAt: timestamp("synced_at").defaultNow().notNull(),
  },
  (table) => ({
    lsSubIdIdx: uniqueIndex("ls_sub_id_idx").on(table.lsSubId),
  })
);

export const lemonSqueezyCustomers = pgTable(
  "lemon_squeezy_customers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    lsCustomerId: text("ls_customer_id").notNull(),
    name: text("name"),
    email: text("email"),
    status: text("status").notNull(),
    createdAt: timestamp("created_at").notNull(),
    syncedAt: timestamp("synced_at").defaultNow().notNull(),
  },
  (table) => ({
    lsCustomerIdIdx: uniqueIndex("ls_customer_id_idx").on(table.lsCustomerId),
  })
);
