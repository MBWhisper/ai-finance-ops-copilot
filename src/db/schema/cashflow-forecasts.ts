import {
  pgTable,
  uuid,
  timestamp,
  integer,
  date,
  decimal,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const forecastTypeEnum = pgEnum("forecast_type", [
  "revenue",
  "expense",
  "net",
]);

export const cashflowForecasts = pgTable("cashflow_forecasts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  forecastDate: date("forecast_date").notNull(),
  amountCents: integer("amount_cents").notNull(),
  type: forecastTypeEnum("type").notNull(),
  p50Cents: integer("p50_cents"),
  p80Cents: integer("p80_cents"),
  p95Cents: integer("p95_cents"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
