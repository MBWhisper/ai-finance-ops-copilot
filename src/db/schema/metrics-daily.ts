import {
  pgTable,
  uuid,
  timestamp,
  integer,
  date,
  decimal,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const metricsDaily = pgTable(
  "metrics_daily",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    mrrCents: integer("mrr_cents").notNull(),
    arrCents: integer("arr_cents").notNull(),
    churnRate: decimal("churn_rate"),
    ltvCents: integer("ltv_cents"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    userDateUnique: uniqueIndex("user_date_unique").on(
      table.userId,
      table.date
    ),
  })
);
