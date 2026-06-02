import { pgTable, uuid, text, timestamp, integer, uniqueIndex } from "drizzle-orm/pg-core";

export const paypalAccounts = pgTable("paypal_accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  clientId: text("client_id").notNull(),
  clientSecret: text("client_secret").notNull(),
  mode: text("mode"),
  merchantEmail: text("merchant_email"),
  merchantName: text("merchant_name"),
  accessToken: text("access_token"),
  tokenExpiresAt: timestamp("token_expires_at"),
  lastSyncedAt: timestamp("last_synced_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const paypalTransactions = pgTable(
  "paypal_transactions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    accountId: uuid("account_id").notNull(),
    transactionId: text("transaction_id").notNull(),
    transactionType: text("transaction_type"),
    status: text("status"),
    amount: integer("amount"),
    currency: text("currency"),
    feeAmount: integer("fee_amount"),
    netAmount: integer("net_amount"),
    payerEmail: text("payer_email"),
    payerName: text("payer_name"),
    itemName: text("item_name"),
    transactionDate: timestamp("transaction_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    transactionIdIdx: uniqueIndex("paypal_transaction_id_idx").on(table.transactionId),
  })
);

export const paypalInvoices = pgTable(
  "paypal_invoices",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    accountId: uuid("account_id").notNull(),
    invoiceId: text("invoice_id").notNull(),
    invoiceNumber: text("invoice_number"),
    status: text("status"),
    recipientEmail: text("recipient_email"),
    recipientName: text("recipient_name"),
    amount: integer("amount"),
    currency: text("currency"),
    dueAmount: integer("due_amount"),
    invoiceDate: timestamp("invoice_date"),
    dueDate: timestamp("due_date"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    invoiceIdIdx: uniqueIndex("paypal_invoice_id_idx").on(table.invoiceId),
  })
);

export const paypalSubscriptions = pgTable(
  "paypal_subscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    accountId: uuid("account_id").notNull(),
    subscriptionId: text("subscription_id").notNull(),
    planId: text("plan_id"),
    status: text("status"),
    subscriberEmail: text("subscriber_email"),
    subscriberName: text("subscriber_name"),
    lastPaymentAmount: integer("last_payment_amount"),
    lastPaymentDate: timestamp("last_payment_date"),
    nextBillingDate: timestamp("next_billing_date"),
    failedPaymentsCount: integer("failed_payments_count").default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    subscriptionIdIdx: uniqueIndex("paypal_subscription_id_idx").on(table.subscriptionId),
  })
);
