import type { MetricResult } from "./types";

interface SubscriptionInput {
  status: string;
  mrrCents: number;
}

/**
 * Calculates MRR, ARR, Churn Rate, and LTV from a snapshot of subscriptions.
 *
 * Churn Rate = canceled / (active + trialing + canceled)
 * This approximates the proportion of churned customers from the addressable base.
 * For precise monthly churn, compare metrics_daily rows over time.
 *
 * LTV = avgMrr / churnRate  (standard SaaS LTV formula)
 * Falls back to ARR when churnRate is 0 to avoid division by zero.
 */
export function calculateMrr(subscriptions: SubscriptionInput[]): MetricResult {
  const activeSubs = subscriptions.filter(
    (s) => s.status === "active" || s.status === "trialing"
  );
  const canceledSubs = subscriptions.filter((s) => s.status === "canceled");

  const mrrCents = activeSubs.reduce((sum, s) => sum + s.mrrCents, 0);
  const arrCents = mrrCents * 12;

  // Fix #4: churn denominator = active + canceled (addressable base), not all subscriptions.
  // Trialing are excluded from the churn base as they haven't converted yet.
  const churnBase = activeSubs.length + canceledSubs.length;
  const churnRate = churnBase > 0 ? canceledSubs.length / churnBase : 0;

  // Standard SaaS LTV = ARPU / Churn Rate (expressed in cents)
  const avgMrrPerSub = activeSubs.length > 0 ? mrrCents / activeSubs.length : 0;
  const ltvCents =
    churnRate > 0
      ? Math.round(avgMrrPerSub / churnRate)
      : arrCents; // fallback: 1-year value when no churn data

  return { mrrCents, arrCents, churnRate, ltvCents };
}
