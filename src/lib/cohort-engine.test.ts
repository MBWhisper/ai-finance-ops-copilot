import { describe, it, expect } from "vitest"
import { calculateCohorts, getRetentionColor, type StripeSubscription } from "./cohort-engine"

describe("calculateCohorts", () => {
  it("returns 100% Month-1 retention when all 3 customers active in Feb after Jan signup", () => {
    const subs: StripeSubscription[] = [
      { id: "s1", userId: "u1", status: "active", mrrCents: 10000, createdAt: "2026-01-15T00:00:00Z" },
      { id: "s2", userId: "u2", status: "active", mrrCents: 20000, createdAt: "2026-01-20T00:00:00Z" },
      { id: "s3", userId: "u3", status: "active", mrrCents: 15000, createdAt: "2026-01-25T00:00:00Z" },
    ]
    const result = calculateCohorts(subs)
    expect(result.cohorts.length).toBe(1)
    const jan = result.cohorts[0]
    expect(jan.cohortSize).toBe(3)
    expect(jan.retentionByMonth[0]).toBe(100)
    expect(jan.retentionByMonth[1]).toBe(100)
  })

  it("returns 66.7% Month-1 retention when 2 of 3 Jan customers active in Feb", () => {
    const subs: StripeSubscription[] = [
      { id: "s1", userId: "u1", status: "active", mrrCents: 10000, createdAt: "2026-01-15T00:00:00Z" },
      { id: "s2", userId: "u2", status: "active", mrrCents: 20000, createdAt: "2026-01-20T00:00:00Z" },
      { id: "s3", userId: "u3", status: "canceled", mrrCents: 15000, createdAt: "2026-01-25T00:00:00Z", canceledAt: "2026-02-01T00:00:00Z" },
    ]
    const result = calculateCohorts(subs)
    const jan = result.cohorts.find((c) => c.cohortDate === "2026-01")!
    expect(jan.cohortSize).toBe(3)
    expect(jan.retentionByMonth[1]).toBeCloseTo(66.7, 0)
  })

  it("returns empty result when no subscriptions provided", () => {
    const result = calculateCohorts([])
    expect(result.cohorts.length).toBe(0)
    expect(result.maxMonths).toBe(0)
    expect(result.overallMonth1).toBe(0)
    expect(result.overallMonth3).toBe(0)
  })

  it("handles multiple cohorts across different months with weighted averages", () => {
    const subs: StripeSubscription[] = [
      { id: "s1", userId: "u1", status: "active", mrrCents: 10000, createdAt: "2026-01-10T00:00:00Z" },
      { id: "s2", userId: "u2", status: "canceled", mrrCents: 20000, createdAt: "2026-01-15T00:00:00Z", canceledAt: "2026-02-01T00:00:00Z" },
      { id: "s3", userId: "u3", status: "active", mrrCents: 15000, createdAt: "2026-02-10T00:00:00Z" },
      { id: "s4", userId: "u4", status: "active", mrrCents: 25000, createdAt: "2026-02-15T00:00:00Z" },
    ]
    const result = calculateCohorts(subs)
    expect(result.cohorts.length).toBe(2)
    const jan = result.cohorts.find((c) => c.cohortDate === "2026-01")!
    const feb = result.cohorts.find((c) => c.cohortDate === "2026-02")!
    expect(jan.cohortSize).toBe(2)
    expect(feb.cohortSize).toBe(2)
  })
})

describe("getRetentionColor", () => {
  it("returns green for retention >= 70%", () => {
    expect(getRetentionColor(75)).toBe("green")
    expect(getRetentionColor(70)).toBe("green")
    expect(getRetentionColor(100)).toBe("green")
  })

  it("returns yellow for retention between 40% and 69%", () => {
    expect(getRetentionColor(50)).toBe("yellow")
    expect(getRetentionColor(40)).toBe("yellow")
    expect(getRetentionColor(69)).toBe("yellow")
  })

  it("returns red for retention < 40%", () => {
    expect(getRetentionColor(30)).toBe("red")
    expect(getRetentionColor(0)).toBe("red")
    expect(getRetentionColor(39)).toBe("red")
  })
})
