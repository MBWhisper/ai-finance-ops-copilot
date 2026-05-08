import { users } from "./schema/users";
import { stripeAccounts } from "./schema/stripe-accounts";
import { subscriptions } from "./schema/subscriptions";
import { metricsDaily } from "./schema/metrics-daily";
import { cashflowForecasts } from "./schema/cashflow-forecasts";
import { invoices } from "./schema/invoices";

export const schema = {
  users,
  stripeAccounts,
  subscriptions,
  metricsDaily,
  cashflowForecasts,
  invoices,
};
