import { describe, it, expect } from "vitest";
import { buildMrrFromSubscription, aggregateMrr } from "@/core/stripe/mrr-builder";

function makeSub(overrides: Partial<ReturnType<typeof buildMrrFromSubscription>> & { items?: any[] } = {}) {
  return {
    id: overrides.stripeSubId ?? "sub_test",
    status: overrides.status ?? "active",
    currency: overrides.currency ?? "usd",
    items: {
      data: overrides.items ?? [
        {
          price: {
            unit_amount: 1000,
            recurring: { interval: "month" },
          },
        },
      ],
    },
  } as any;
}

describe("buildMrrFromSubscription", () => {
  it("calculates MRR for monthly subscription", () => {
    const result = buildMrrFromSubscription(makeSub());
    expect(result.mrrCents).toBe(1000);
  });

  it("converts yearly to monthly", () => {
    const result = buildMrrFromSubscription(
      makeSub({
        items: [
          {
            price: { unit_amount: 12000, recurring: { interval: "year" } },
          },
        ],
      })
    );
    expect(result.mrrCents).toBe(1000);
  });

  it("handles weekly interval", () => {
    const result = buildMrrFromSubscription(
      makeSub({
        items: [
          {
            price: { unit_amount: 100, recurring: { interval: "week" } },
          },
        ],
      })
    );
    expect(result.mrrCents).toBe(400);
  });

  it("handles daily interval", () => {
    const result = buildMrrFromSubscription(
      makeSub({
        items: [
          {
            price: { unit_amount: 10, recurring: { interval: "day" } },
          },
        ],
      })
    );
    expect(result.mrrCents).toBe(300);
  });

  it("sums multiple items", () => {
    const result = buildMrrFromSubscription(
      makeSub({
        items: [
          { price: { unit_amount: 500, recurring: { interval: "month" } } },
          { price: { unit_amount: 1500, recurring: { interval: "month" } } },
        ],
      })
    );
    expect(result.mrrCents).toBe(2000);
  });

  it("returns 0 for items without unit_amount", () => {
    const result = buildMrrFromSubscription(
      makeSub({
        items: [
          { price: { recurring: { interval: "month" } } },
        ],
      })
    );
    expect(result.mrrCents).toBe(0);
  });

  it("returns 0 for items without recurring", () => {
    const result = buildMrrFromSubscription(
      makeSub({
        items: [
          { price: { unit_amount: 1000 } },
        ],
      })
    );
    expect(result.mrrCents).toBe(0);
  });

  it("returns correct currency", () => {
    const result = buildMrrFromSubscription(makeSub({ currency: "eur" }));
    expect(result.currency).toBe("eur");
  });

  it("returns correct stripeSubId", () => {
    const result = buildMrrFromSubscription(makeSub({ stripeSubId: "sub_custom" }));
    expect(result.stripeSubId).toBe("sub_custom");
  });
});

describe("aggregateMrr", () => {
  it("aggregates multiple active subscriptions", () => {
    const snapshots = [
      { stripeSubId: "a", status: "active", mrrCents: 1000, currency: "usd" },
      { stripeSubId: "b", status: "active", mrrCents: 2000, currency: "usd" },
    ];
    const result = aggregateMrr(snapshots);
    expect(result.totalMrrCents).toBe(3000);
    expect(result.activeCount).toBe(2);
    expect(result.totalCount).toBe(2);
  });

  it("excludes non-active statuses", () => {
    const snapshots = [
      { stripeSubId: "a", status: "active", mrrCents: 1000, currency: "usd" },
      { stripeSubId: "b", status: "canceled", mrrCents: 9999, currency: "usd" },
      { stripeSubId: "c", status: "past_due", mrrCents: 9999, currency: "usd" },
    ];
    const result = aggregateMrr(snapshots);
    expect(result.totalMrrCents).toBe(1000);
    expect(result.activeCount).toBe(1);
  });

  it("includes trialing as active", () => {
    const snapshots = [
      { stripeSubId: "a", status: "trialing", mrrCents: 500, currency: "usd" },
    ];
    const result = aggregateMrr(snapshots);
    expect(result.totalMrrCents).toBe(500);
    expect(result.activeCount).toBe(1);
  });

  it("returns zeros for empty input", () => {
    const result = aggregateMrr([]);
    expect(result.totalMrrCents).toBe(0);
    expect(result.activeCount).toBe(0);
    expect(result.totalCount).toBe(0);
  });
});
