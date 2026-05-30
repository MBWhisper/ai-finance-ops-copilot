import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const cancellationFeedback = pgTable("cancellation_feedback", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  reason: text("reason").notNull(),
  comment: text("comment"),
  cancelledAt: timestamp("cancelled_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
