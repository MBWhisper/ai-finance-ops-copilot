import type Stripe from "stripe";
import { logger } from "@/lib/logger";

export interface MrrSnapshot {
  totalMrrCents: number;
  newMrrCents: number;
  expansionMrrCents: number;
  contractionMrrCents: number;
  churnedMrrCents: number;
  reactivatedMrrCents: number;
}

export function buildMrrFromSubscription(
  subscription: Stripe.Subscription,
  previousAttributes?: Stripe.Event.Data.PreviousAttributes
): MrrSnapshot {
  const status = subscription.status;
  let totalMrr = 0;

  for (const item of subscription.items.data) {
    const price = item.price;
    if (!price.unit_amount || !price.recurring) continue;

    const monthly =
      price.recurring.interval === "year"
        ? Math.round(price.unit_amount / 12)
        : price.unit_amount;

    if (status === "active" || status === "trialing") {
      totalMrr += monthly;
    }
  }

  return {
    totalMrrCents: totalMrr,
    newMrrCents: status === "active" && !previousAttributes ? totalMrr : 0,
    expansionMrrCents: 0,
    contractionMrrCents: 0,
    churnedMrrCents: status === "canceled" ? totalMrr : 0,
    reactivatedMrrCents: 0,
  };
}

export function aggregateMrr(snapshots: MrrSnapshot[]): MrrSnapshot {
  return snapshots.reduce(
    (acc, s) => ({
      totalMrrCents: acc.totalMrrCents + s.totalMrrCents,
      newMrrCents: acc.newMrrCents + s.newMrrCents,
      expansionMrrCents: acc.expansionMrrCents + s.expansionMrrCents,
      contractionMrrCents: acc.contractionMrrCents + s.contractionMrrCents,
      churnedMrrCents: acc.churnedMrrCents + s.churnedMrrCents,
      reactivatedMrrCents: acc.reactivatedMrrCents + s.reactivatedMrrCents,
    }),
    {
      totalMrrCents: 0,
      newMrrCents: 0,
      expansionMrrCents: 0,
      contractionMrrCents: 0,
      churnedMrrCents: 0,
      reactivatedMrrCents: 0,
    }
  );
}
