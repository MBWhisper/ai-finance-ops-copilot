import { pgTable, uuid, text, timestamp, integer, uniqueIndex } from "drizzle-orm/pg-core";

export const plaidAccounts = pgTable("plaid_accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  accessToken: text("access_token").notNull(),
  itemId: text("item_id").notNull(),
  institutionName: text("institution_name"),
  institutionId: text("institution_id"),
  bacs: text("bacs"),
  lastSyncedAt: timestamp("last_synced_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const plaidTransactions = pgTable(
  "plaid_transactions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    accountId: uuid("account_id").notNull(),
    plaidTransactionId: text("plaid_transaction_id").notNull(),
    plaidAccountId: text("plaid_account_id"),
    category: text("category"),
    subcategory: text("subcategory"),
    type: text("type"),
    name: text("name"),
    merchantName: text("merchant_name"),
    amount: integer("amount"),
    currency: text("currency"),
    isoCurrencyCode: text("iso_currency_code"),
    date: text("date"),
    pending: text("pending"),
    paymentChannel: text("payment_channel"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    plaidTransactionIdIdx: uniqueIndex("plaid_transaction_id_idx").on(table.plaidTransactionId),
  })
);
