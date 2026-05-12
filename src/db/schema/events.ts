import { pgTable, uuid, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  userId: text("user_id"),
  anonymousId: text("anonymous_id"),
  metadata: jsonb("metadata"),
  page: text("page"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
