import type { MetricResult } from "./types";

interface SubscriptionInput {
  status: string;
  mrrCents: number;
}

export function calculateMrr(subscriptions: SubscriptionInput[]): MetricResult {
  const activeSubs = subscriptions.filter(
    (s) => s.status === "active" || s.status === "trialing"
  );

  const mrrCents = activeSubs.reduce((sum, s) => sum + s.mrrCents, 0);
  const arrCents = mrrCents * 12;

  const total = subscriptions.length;
  const canceled = subscriptions.filter((s) => s.status === "canceled").length;
  const churnRate = total > 0 ? canceled / total : 0;

  const ltvCents = churnRate > 0 ? Math.round(mrrCents / churnRate) : mrrCents * 12;

  return { mrrCents, arrCents, churnRate, ltvCents };
}
