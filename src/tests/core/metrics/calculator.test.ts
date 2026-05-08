import { describe, it, expect } from "vitest";
import {
  calculateMRR,
  calculateARR,
  calculateChurnRate,
  calculateLTV,
} from "@/core/metrics/calculator";
import type { SubscriptionEvent } from "@/core/metrics/calculator";

describe("calculator.calculateMRR", () => {
  it("returns zero when no subscriptions", () => {
    expect(calculateMRR([])).toBe(0);
  });

  it("sums a single monthly subscription", () => {
    const events: SubscriptionEvent[] = [
      {
        id: "sub_1",
        customerId: "cus_1",
        status: "active",
        amountCents: 9900,
        interval: "month",
        startDate: new Date("2026-01-01"),
        endDate: null,
      },
    ];
    expect(calculateMRR(events)).toBe(9900);
  });

  it("converts annual subscription to monthly MRR", () => {
    const events: SubscriptionEvent[] = [
      {
        id: "sub_2",
        customerId: "cus_2",
        status: "active",
        amountCents: 118800,
        interval: "year",
        startDate: new Date("2026-01-01"),
        endDate: null,
      },
    ];
    expect(calculateMRR(events)).toBe(9900);
  });

  it("excludes canceled subscriptions", () => {
    const events: SubscriptionEvent[] = [
      {
        id: "sub_3",
        customerId: "cus_3",
        status: "canceled",
        amountCents: 4900,
        interval: "month",
        startDate: new Date("2026-01-01"),
        endDate: new Date("2026-03-01"),
      },
    ];
    expect(calculateMRR(events)).toBe(0);
  });

  it("excludes past_due subscriptions", () => {
    const events: SubscriptionEvent[] = [
      {
        id: "sub_4",
        customerId: "cus_4",
        status: "past_due",
        amountCents: 2900,
        interval: "month",
        startDate: new Date("2026-01-01"),
        endDate: null,
      },
    ];
    expect(calculateMRR(events)).toBe(0);
  });

  it("includes trialing subscriptions", () => {
    const events: SubscriptionEvent[] = [
      {
        id: "sub_5",
        customerId: "cus_5",
        status: "trialing",
        amountCents: 7900,
        interval: "month",
        startDate: new Date("2026-01-01"),
        endDate: null,
      },
    ];
    expect(calculateMRR(events)).toBe(7900);
  });

  it("sums multiple active subscriptions correctly", () => {
    const events: SubscriptionEvent[] = [
      {
        id: "sub_6",
        customerId: "cus_6",
        status: "active",
        amountCents: 2900,
        interval: "month",
        startDate: new Date("2026-01-01"),
        endDate: null,
      },
      {
        id: "sub_7",
        customerId: "cus_7",
        status: "active",
        amountCents: 7900,
        interval: "month",
        startDate: new Date("2026-02-01"),
        endDate: null,
      },
      {
        id: "sub_8",
        customerId: "cus_8",
        status: "active",
        amountCents: 238800,
        interval: "year",
        startDate: new Date("2026-03-01"),
        endDate: null,
      },
    ];
    expect(calculateMRR(events)).toBe(30700);
  });
});

describe("calculator.calculateARR", () => {
  it("multiplies MRR by 12", () => {
    expect(calculateARR(10000)).toBe(120000);
  });

  it("returns zero for zero MRR", () => {
    expect(calculateARR(0)).toBe(0);
  });

  it("handles large MRR values", () => {
    expect(calculateARR(500000)).toBe(6000000);
  });
});

describe("calculator.calculateChurnRate", () => {
  it("returns zero when no starting MRR", () => {
    expect(calculateChurnRate(0, 0)).toBe(0);
  });

  it("calculates churn rate as percentage", () => {
    expect(calculateChurnRate(5000, 100000)).toBe(5);
  });

  it("returns 100 when all MRR lost", () => {
    expect(calculateChurnRate(50000, 50000)).toBe(100);
  });

  it("handles fractional churn rates", () => {
    expect(calculateChurnRate(250, 10000)).toBe(2.5);
  });
});

describe("calculator.calculateLTV", () => {
  it("caps lifetime at 36 months when churn is zero", () => {
    expect(calculateLTV(10000, 0)).toBe(10000 * 36);
  });

  it("calculates LTV with churn rate", () => {
    const ltv = calculateLTV(10000, 5);
    expect(ltv).toBe(10000 * 20 * 0.8);
  });

  it("uses default gross margin of 80%", () => {
    const ltv = calculateLTV(5000, 10);
    expect(ltv).toBe(5000 * 10 * 0.8);
  });

  it("returns zero MRR when churn is zero", () => {
    expect(calculateLTV(0, 5)).toBe(0);
  });

  it("handles custom gross margin", () => {
    const ltv = calculateLTV(10000, 5, 0.9);
    expect(ltv).toBe(10000 * 20 * 0.9);
  });
});
