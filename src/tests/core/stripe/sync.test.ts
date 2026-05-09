import { describe, it, expect, vi } from "vitest";
import { buildMrrFromSubscription, aggregateMrr } from "@/core/stripe/mrr-builder";

vi.mock("@/db", () => ({
  db: {
    query: {
      stripeAccounts: { findFirst: vi.fn() },
    },
  },
}));

vi.mock("@/lib/crypto", () => ({
  decrypt: vi.fn(() => "sk_test_mock"),
}));

describe("syncStripeData helpers", () => {
  describe("buildMrrFromSubscription", () => {
    it("calculates monthly MRR from monthly subscription", () => {
      const sub = {
        id: "sub_123",
        status: "active",
        currency: "usd",
        items: {
          data: [
            {
              price: {
                unit_amount: 2999,
                recurring: { interval: "month" },
              },
            },
          ],
        },
      } as any;

      const result = buildMrrFromSubscription(sub);
      expect(result.mrrCents).toBe(2999);
      expect(result.stripeSubId).toBe("sub_123");
      expect(result.status).toBe("active");
    });

    it("converts yearly price to monthly MRR", () => {
      const sub = {
        id: "sub_456",
        status: "active",
        currency: "usd",
        items: {
          data: [
            {
              price: {
                unit_amount: 120000,
                recurring: { interval: "year" },
              },
            },
          ],
        },
      } as any;

      const result = buildMrrFromSubscription(sub);
      expect(result.mrrCents).toBe(10000);
    });

    it("sums multiple line items", () => {
      const sub = {
        id: "sub_789",
        status: "active",
        currency: "usd",
        items: {
          data: [
            {
              price: {
                unit_amount: 1000,
                recurring: { interval: "month" },
              },
            },
            {
              price: {
                unit_amount: 500,
                recurring: { interval: "month" },
              },
            },
          ],
        },
      } as any;

      const result = buildMrrFromSubscription(sub);
      expect(result.mrrCents).toBe(1500);
    });
  });

  describe("aggregateMrr", () => {
    it("sums MRR from all active subscriptions", () => {
      const snapshots = [
        { stripeSubId: "a", status: "active", mrrCents: 1000, currency: "usd" },
        { stripeSubId: "b", status: "active", mrrCents: 2000, currency: "usd" },
        { stripeSubId: "c", status: "trialing", mrrCents: 500, currency: "usd" },
      ];

      const result = aggregateMrr(snapshots);
      expect(result.totalMrrCents).toBe(3500);
      expect(result.activeCount).toBe(3);
      expect(result.totalCount).toBe(3);
    });

    it("excludes canceled and past_due", () => {
      const snapshots = [
        { stripeSubId: "a", status: "active", mrrCents: 1000, currency: "usd" },
        { stripeSubId: "b", status: "canceled", mrrCents: 5000, currency: "usd" },
        { stripeSubId: "c", status: "past_due", mrrCents: 3000, currency: "usd" },
      ];

      const result = aggregateMrr(snapshots);
      expect(result.totalMrrCents).toBe(1000);
      expect(result.activeCount).toBe(1);
      expect(result.totalCount).toBe(3);
    });

    it("handles empty array", () => {
      const result = aggregateMrr([]);
      expect(result.totalMrrCents).toBe(0);
      expect(result.activeCount).toBe(0);
      expect(result.totalCount).toBe(0);
    });
  });
});
