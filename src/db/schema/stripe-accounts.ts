import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const stripeAccounts = pgTable("stripe_accounts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  stripeAccountId: text("stripe_account_id"),
  accessToken: text("access_token").notNull(),
  lastSyncAt: timestamp("last_sync_at"),
  webhookSecret: text("webhook_secret"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
