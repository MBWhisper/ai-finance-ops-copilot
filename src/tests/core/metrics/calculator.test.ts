import { describe, it, expect } from "vitest";
import { calculateMrr } from "@/core/metrics/calculator";

describe("calculateMrr", () => {
  it("returns zero when no active subscriptions", () => {
    const result = calculateMrr([
      { status: "canceled", mrrCents: 10000 },
      { status: "past_due", mrrCents: 5000 },
    ]);
    expect(result.mrrCents).toBe(0);
    expect(result.arrCents).toBe(0);
  });

  it("sums all active subscription prices correctly", () => {
    const result = calculateMrr([
      { status: "active", mrrCents: 10000 },
      { status: "active", mrrCents: 20000 },
      { status: "trialing", mrrCents: 5000 },
    ]);
    expect(result.mrrCents).toBe(35000);
    expect(result.arrCents).toBe(420000);
  });

  it("excludes canceled subscriptions from calculation", () => {
    const result = calculateMrr([
      { status: "active", mrrCents: 10000 },
      { status: "canceled", mrrCents: 50000 },
    ]);
    expect(result.mrrCents).toBe(10000);
  });

  it("excludes past_due subscriptions from calculation", () => {
    const result = calculateMrr([
      { status: "active", mrrCents: 15000 },
      { status: "past_due", mrrCents: 30000 },
    ]);
    expect(result.mrrCents).toBe(15000);
  });

  it("handles empty subscriptions array", () => {
    const result = calculateMrr([]);
    expect(result.mrrCents).toBe(0);
    expect(result.arrCents).toBe(0);
    expect(result.churnRate).toBe(0);
    expect(result.ltvCents).toBe(0);
  });

  it("calculates churn rate correctly", () => {
    const result = calculateMrr([
      { status: "active", mrrCents: 10000 },
      { status: "active", mrrCents: 20000 },
      { status: "canceled", mrrCents: 5000 },
      { status: "active", mrrCents: 15000 },
    ]);
    expect(result.churnRate).toBeCloseTo(0.25, 2);
  });

  it("calculates LTV as MRR / churn rate", () => {
    const result = calculateMrr([
      { status: "active", mrrCents: 10000 },
      { status: "canceled", mrrCents: 5000 },
    ]);
    expect(result.ltvCents).toBeGreaterThan(0);
  });

  it("returns zero churn when no canceled subscriptions", () => {
    const result = calculateMrr([
      { status: "active", mrrCents: 10000 },
      { status: "trialing", mrrCents: 5000 },
    ]);
    expect(result.churnRate).toBe(0);
  });

  it("handles trialing subscriptions as active", () => {
    const result = calculateMrr([
      { status: "trialing", mrrCents: 0 },
      { status: "active", mrrCents: 10000 },
    ]);
    expect(result.mrrCents).toBe(10000);
  });

  it("handles single subscription", () => {
    const result = calculateMrr([{ status: "active", mrrCents: 50000 }]);
    expect(result.mrrCents).toBe(50000);
    expect(result.arrCents).toBe(600000);
  });

  it("calculates LTV correctly when churnRate = 0", () => {
    const result = calculateMrr([
      { status: "active", mrrCents: 10000 },
    ]);
    expect(result.ltvCents).toBe(120000);
  });

  it("large numbers don't overflow", () => {
    const result = calculateMrr([
      { status: "active", mrrCents: 9999999 },
      { status: "active", mrrCents: 8888888 },
    ]);
    expect(result.mrrCents).toBe(18888887);
    expect(result.arrCents).toBe(226666644);
  });

  it("all canceled subscriptions returns zero MRR", () => {
    const result = calculateMrr([
      { status: "canceled", mrrCents: 10000 },
      { status: "canceled", mrrCents: 20000 },
      { status: "past_due", mrrCents: 5000 },
    ]);
    expect(result.mrrCents).toBe(0);
    expect(result.arrCents).toBe(0);
  });

  it("churn rate is exact when all subscriptions canceled", () => {
    const result = calculateMrr([
      { status: "canceled", mrrCents: 10000 },
      { status: "canceled", mrrCents: 20000 },
    ]);
    expect(result.churnRate).toBe(1);
  });

  it("mrrCents includes all active subscriptions regardless of amount", () => {
    const result = calculateMrr([
      { status: "active", mrrCents: 0 },
      { status: "active", mrrCents: 100 },
      { status: "active", mrrCents: 100000 },
    ]);
    expect(result.mrrCents).toBe(100100);
  });

  it("churn rate is unaffected by MRR amounts", () => {
    const active = { status: "active" as const, mrrCents: 99999 };
    const canceled = { status: "canceled" as const, mrrCents: 1 };
    const result = calculateMrr([active, active, active, canceled]);
    expect(result.churnRate).toBeCloseTo(0.25, 2);
  });
});
