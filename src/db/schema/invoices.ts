import { pgTable, uuid, text, integer, date, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  customerEmail: text("customer_email").notNull(),
  amountCents: integer("amount_cents").notNull(),
  dueDate: date("due_date").notNull(),
  status: text("status").default("draft").notNull(),
  stripeInvoiceId: text("stripe_invoice_id"),
  remindersSent: integer("reminders_sent").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
