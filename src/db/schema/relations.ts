import { relations } from "drizzle-orm";
import { users } from "./users";
import { stripeAccounts } from "./stripe-accounts";
import { subscriptions } from "./subscriptions";
import { metricsDaily } from "./metrics-daily";
import { cashflowForecasts } from "./cashflow-forecasts";
import { invoices } from "./invoices";

export const usersRelations = relations(users, ({ many }) => ({
  stripeAccounts: many(stripeAccounts),
  subscriptions: many(subscriptions),
  metricsDaily: many(metricsDaily),
  cashflowForecasts: many(cashflowForecasts),
  invoices: many(invoices),
}));

export const stripeAccountsRelations = relations(stripeAccounts, ({ one }) => ({
  user: one(users, { fields: [stripeAccounts.userId], references: [users.id] }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, { fields: [subscriptions.userId], references: [users.id] }),
}));

export const metricsDailyRelations = relations(metricsDaily, ({ one }) => ({
  user: one(users, { fields: [metricsDaily.userId], references: [users.id] }),
}));

export const cashflowForecastsRelations = relations(cashflowForecasts, ({ one }) => ({
  user: one(users, { fields: [cashflowForecasts.userId], references: [users.id] }),
}));

export const invoicesRelations = relations(invoices, ({ one }) => ({
  user: one(users, { fields: [invoices.userId], references: [users.id] }),
}));
