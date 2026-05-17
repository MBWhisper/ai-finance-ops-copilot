import { describe, it, expect } from "vitest"
import {
  calculateRiskScore,
  calculateRevenueAlerts,
  calculatePMFStatus,
  type CustomerRiskInput,
  type MRRMetrics,
  type CohortData,
} from "./risk-engine"

describe("calculateRiskScore", () => {
  it("returns critical (score=100) when all 5 risk factors detected", () => {
    const input: CustomerRiskInput = {
      customerId: "c1",
      customerName: "John Doe",
      email: "john@example.com",
      mrr: 29900,
      renewalDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
      daysSinceLastLogin: 20,
      planDowngradedInLast30Days: true,
      paymentFailuresIn60Days: 3,
      usageChangePercent: -70,
      cancellationPageVisited: true,
    }
    const result = calculateRiskScore(input)
    expect(result.riskScore).toBe(100)
    expect(result.riskLevel).toBe("critical")
    expect(result.factors.length).toBe(5)
    expect(result.recommendation).toContain("Call this customer today")
  })

  it("returns safe (score=0) when no risk factors detected", () => {
    const input: CustomerRiskInput = {
      customerId: "c2",
      customerName: "Jane Smith",
      email: "jane@example.com",
      mrr: 50000,
      renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      daysSinceLastLogin: 2,
      planDowngradedInLast30Days: false,
      paymentFailuresIn60Days: 0,
      usageChangePercent: 10,
      cancellationPageVisited: false,
    }
    const result = calculateRiskScore(input)
    expect(result.riskScore).toBe(0)
    expect(result.riskLevel).toBe("safe")
    expect(result.factors.length).toBe(0)
    expect(result.recommendation).toBe("No action needed.")
  })

  it("returns watch (score=50) with payment failure + no login factors", () => {
    const input: CustomerRiskInput = {
      customerId: "c3",
      customerName: "Bob Wilson",
      email: "bob@example.com",
      mrr: 14900,
      renewalDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      daysSinceLastLogin: 15,
      planDowngradedInLast30Days: false,
      paymentFailuresIn60Days: 1,
      usageChangePercent: -10,
      cancellationPageVisited: false,
    }
    const result = calculateRiskScore(input)
    expect(result.riskScore).toBe(50)
    expect(result.riskLevel).toBe("watch")
    expect(result.factors.length).toBe(2)
    expect(result.factors.some((f) => f.id === "no_login")).toBe(true)
    expect(result.factors.some((f) => f.id === "payment_failure")).toBe(true)
  })
})

describe("calculateRevenueAlerts", () => {
  it("triggers net_mrr_negative alert when expirations < contractions + churned", () => {
    const metrics: MRRMetrics = {
      mrrCents: 5000000,
      arrCents: 60000000,
      churnRate: 3,
      ltvCents: 100000,
      totalCustomers: 50,
      topCustomerMrrCents: 500000,
      cashRunwayDays: 180,
      previousMonths: [
        { month: "2026-01", mrrCents: 5200000, churnRate: 2 },
        { month: "2026-02", mrrCents: 5100000, churnRate: 2.5 },
        { month: "2026-03", mrrCents: 5000000, churnRate: 3 },
      ],
    }
    const alerts = calculateRevenueAlerts(metrics)
    expect(alerts.some((a) => a.type === "net_mrr_negative")).toBe(true)
    expect(alerts.some((a) => a.type === "mrr_growth_drop")).toBe(true)
  })

  it("returns no alerts when all metrics are healthy", () => {
    const metrics: MRRMetrics = {
      mrrCents: 10000000,
      arrCents: 120000000,
      churnRate: 2,
      ltvCents: 500000,
      totalCustomers: 100,
      topCustomerMrrCents: 500000,
      cashRunwayDays: 200,
      previousMonths: [
        { month: "2026-01", mrrCents: 9000000, churnRate: 2 },
        { month: "2026-02", mrrCents: 9500000, churnRate: 2 },
        { month: "2026-03", mrrCents: 10000000, churnRate: 2 },
      ],
    }
    const alerts = calculateRevenueAlerts(metrics)
    expect(alerts.length).toBe(0)
  })
})

describe("calculatePMFStatus", () => {
  it("returns strong PMF when month1 > 60% and month3 > 40%", () => {
    const cohorts: CohortData[] = [
      { month: "2026-01", totalCustomers: 100, retainedMonth1: 72, retainedMonth2: 55, retainedMonth3: 48 },
      { month: "2026-02", totalCustomers: 80, retainedMonth1: 58, retainedMonth2: 45, retainedMonth3: 38 },
    ]
    const result = calculatePMFStatus(cohorts)
    expect(result.status).toBe("strong")
    expect(result.month1Retention).toBeGreaterThan(60)
    expect(result.month3Retention).toBeGreaterThan(40)
    expect(result.label).toContain("Strong PMF")
  })

  it("returns none when month1 retention < 40%", () => {
    const cohorts: CohortData[] = [
      { month: "2026-01", totalCustomers: 100, retainedMonth1: 35, retainedMonth2: 20, retainedMonth3: 10 },
    ]
    const result = calculatePMFStatus(cohorts)
    expect(result.status).toBe("none")
    expect(result.month1Retention).toBe(35)
    expect(result.label).toContain("No PMF")
  })
})
