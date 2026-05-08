import { describe, it, expect } from "vitest";
import { buildMrrFromSubscription, aggregateMrr } from "@/core/stripe/mrr-builder";

describe("mrr-builder.buildMrrFromSubscription", () => {
  function makeSubscription(overrides = {}) {
    return {
      id: "sub_1",
      status: "active",
      items: {
        data: [
          {
            price: {
              unit_amount: 9900,
              recurring: { interval: "month" },
            },
          },
        ],
      },
      ...overrides,
    } as any;
  }

  it("calculates MRR for active monthly subscription", () => {
    const snapshot = buildMrrFromSubscription(makeSubscription());
    expect(snapshot.totalMrrCents).toBe(9900);
  });

  it("converts annual to monthly", () => {
    const snapshot = buildMrrFromSubscription(
      makeSubscription({
        items: {
          data: [{ price: { unit_amount: 118800, recurring: { interval: "year" } } }],
        },
      })
    );
    expect(snapshot.totalMrrCents).toBe(9900);
  });

  it("tracks churned MRR for canceled subscriptions", () => {
    const snapshot = buildMrrFromSubscription(makeSubscription({ status: "canceled" }));
    expect(snapshot.totalMrrCents).toBe(0);
  });

  it("excludes past_due subscriptions from MRR", () => {
    const snapshot = buildMrrFromSubscription(makeSubscription({ status: "past_due" }));
    expect(snapshot.totalMrrCents).toBe(0);
  });

  it("includes trialing subscriptions", () => {
    const snapshot = buildMrrFromSubscription(makeSubscription({ status: "trialing" }));
    expect(snapshot.totalMrrCents).toBe(9900);
  });

  it("sums multiple line items", () => {
    const snapshot = buildMrrFromSubscription(
      makeSubscription({
        items: {
          data: [
            { price: { unit_amount: 4900, recurring: { interval: "month" } } },
            { price: { unit_amount: 2900, recurring: { interval: "month" } } },
          ],
        },
      })
    );
    expect(snapshot.totalMrrCents).toBe(7800);
  });

  it("handles subscription with no price", () => {
    const snapshot = buildMrrFromSubscription(
      makeSubscription({
        items: { data: [{ price: { unit_amount: null, recurring: null } }] },
      })
    );
    expect(snapshot.totalMrrCents).toBe(0);
  });
});

describe("mrr-builder.aggregateMrr", () => {
  it("sums multiple snapshots correctly", () => {
    const result = aggregateMrr([
      { totalMrrCents: 5000, newMrrCents: 5000, expansionMrrCents: 0, contractionMrrCents: 0, churnedMrrCents: 0, reactivatedMrrCents: 0 },
      { totalMrrCents: 3000, newMrrCents: 0, expansionMrrCents: 3000, contractionMrrCents: 0, churnedMrrCents: 0, reactivatedMrrCents: 0 },
    ]);
    expect(result.totalMrrCents).toBe(8000);
    expect(result.newMrrCents).toBe(5000);
    expect(result.expansionMrrCents).toBe(3000);
  });

  it("returns zeros for empty array", () => {
    const result = aggregateMrr([]);
    expect(result.totalMrrCents).toBe(0);
  });
});
