import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  plan: text("plan").default("starter").notNull(),
  stripeSubId: text("stripe_sub_id"),
  status: text("status").notNull(),
  mrrCents: integer("mrr_cents").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
