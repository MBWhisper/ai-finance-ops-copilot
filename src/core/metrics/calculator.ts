export interface SubscriptionEvent {
  id: string;
  customerId: string;
  status: "active" | "canceled" | "trialing" | "past_due";
  amountCents: number;
  interval: "month" | "year";
  startDate: Date;
  endDate: Date | null;
}

export function calculateMRR(events: SubscriptionEvent[]): number {
  let mrr = 0;

  for (const event of events) {
    if (event.status === "canceled") continue;
    if (event.status === "past_due") continue;

    const monthlyAmount =
      event.interval === "year"
        ? Math.round(event.amountCents / 12)
        : event.amountCents;

    mrr += monthlyAmount;
  }

  return mrr;
}

export function calculateARR(mrrCents: number): number {
  return mrrCents * 12;
}

export function calculateChurnRate(
  lostMrr: number,
  startMrr: number
): number {
  if (startMrr === 0) return 0;
  return (lostMrr / startMrr) * 100;
}

export function calculateLTV(
  mrrCents: number,
  churnRate: number,
  grossMargin: number = 0.8
): number {
  if (churnRate === 0) return mrrCents * 36;
  const monthlyChurn = churnRate / 100;
  const customerLifetime = 1 / monthlyChurn;
  return mrrCents * customerLifetime * grossMargin;
}
