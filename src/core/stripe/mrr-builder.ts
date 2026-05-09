import type Stripe from "stripe";

export interface SubscriptionSnapshot {
  stripeSubId: string;
  status: string;
  mrrCents: number;
  currency: string;
}

export function buildMrrFromSubscription(
  sub: Stripe.Subscription
): SubscriptionSnapshot {
  let mrrCents = 0;

  for (const item of sub.items.data) {
    const price = item.price;
    if (!price.unit_amount || !price.recurring) continue;

    const monthly =
      price.recurring.interval === "year"
        ? Math.round(price.unit_amount / 12)
        : price.recurring.interval === "week"
          ? price.unit_amount * 4
          : price.recurring.interval === "day"
            ? price.unit_amount * 30
            : price.unit_amount;

    mrrCents += monthly;
  }

  return {
    stripeSubId: sub.id,
    status: sub.status,
    mrrCents,
    currency: sub.currency,
  };
}

export function aggregateMrr(snapshots: SubscriptionSnapshot[]) {
  const active = snapshots.filter(
    (s) => s.status === "active" || s.status === "trialing"
  );

  const totalMrrCents = active.reduce((sum, s) => sum + s.mrrCents, 0);
  const activeCount = active.length;
  const totalCount = snapshots.length;

  return { totalMrrCents, activeCount, totalCount };
}
