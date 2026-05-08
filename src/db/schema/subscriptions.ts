import { pgTable, uuid, text, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";

export const planEnum = pgEnum("plan", ["starter", "pro", "scale"]);
export const subStatusEnum = pgEnum("subscription_status", [
  "active",
  "trialing",
  "canceled",
  "past_due",
]);

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  plan: planEnum("plan").notNull().default("starter"),
  stripeSubId: text("stripe_sub_id"),
  status: subStatusEnum("status").notNull(),
  mrrCents: integer("mrr_cents").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
