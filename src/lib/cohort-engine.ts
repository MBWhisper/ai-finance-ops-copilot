export interface StripeSubscription {
  id: string
  userId: string
  status: string
  mrrCents: number
  createdAt: string
  canceledAt?: string | null
}

export type CohortMonth = {
  cohortDate: string
  cohortSize: number
  retentionByMonth: number[]
}

export type CohortData = {
  cohorts: CohortMonth[]
  maxMonths: number
  overallMonth1: number
  overallMonth3: number
  cohortDates: string[]
  months: number[]
}

export const INDUSTRY_BENCHMARKS = {
  month1: 65,
  month3: 45,
  month6: 35,
  month12: 25,
}

function toMonthKey(dateStr: string): string {
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
}

function getMonthDiff(from: string, to: string): number {
  const [fy, fm] = from.split("-").map(Number)
  const [ty, tm] = to.split("-").map(Number)
  return (ty - fy) * 12 + (tm - fm)
}

export function calculateCohorts(subscriptions: StripeSubscription[]): CohortData {
  if (subscriptions.length === 0) {
    return { cohorts: [], maxMonths: 0, overallMonth1: 0, overallMonth3: 0, cohortDates: [], months: [] }
  }

  const now = new Date()
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`

  const cohortsByDate = new Map<string, StripeSubscription[]>()
  for (const sub of subscriptions) {
    const key = toMonthKey(sub.createdAt)
    if (!cohortsByDate.has(key)) cohortsByDate.set(key, [])
    cohortsByDate.get(key)!.push(sub)
  }

  const sortedDates = Array.from(cohortsByDate.keys()).sort()
  const maxMonths = Math.min(
    12,
    sortedDates.length > 0 ? getMonthDiff(sortedDates[0], currentMonth) + 1 : 0
  )

  const cohorts: CohortMonth[] = sortedDates.map((cohortDate) => {
    const subs = cohortsByDate.get(cohortDate)!
    const cohortSize = subs.length
    const retentionByMonth: number[] = []

    for (let monthOffset = 0; monthOffset <= maxMonths; monthOffset++) {
      if (monthOffset === 0) {
        retentionByMonth.push(100)
        continue
      }

      const targetMonth = getMonthDiff(sortedDates[0], cohortDate) + monthOffset
      if (targetMonth > maxMonths - 1) {
        break
      }

      const targetDate = new Date(now.getFullYear(), now.getMonth() - (maxMonths - 1 - targetMonth), 1)
      const targetMonthKey = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, "0")}`

      if (getMonthDiff(cohortDate, targetMonthKey) > getMonthDiff(cohortDate, currentMonth)) {
        break
      }

      let active = 0
      for (const sub of subs) {
        if (sub.status === "active" || sub.status === "trialing") {
          const createdMonth = toMonthKey(sub.createdAt)
          const monthsSinceStart = getMonthDiff(createdMonth, targetMonthKey)
          if (monthsSinceStart >= 0) {
            active++
          }
        } else if (sub.status === "canceled" || sub.status === "past_due") {
          const createdMonth = toMonthKey(sub.createdAt)
          const monthsSinceStart = getMonthDiff(createdMonth, targetMonthKey)
          if (sub.canceledAt) {
            const cancelMonth = toMonthKey(sub.canceledAt)
            if (monthsSinceStart >= 0 && monthsSinceStart < getMonthDiff(createdMonth, cancelMonth)) {
              active++
            }
          } else {
            if (monthsSinceStart < 0) {
              active++
            }
          }
        } else if (sub.status === "incomplete" || sub.status === "incomplete_expired") {
          if (monthOffset === 0) active++
        }
      }

      retentionByMonth.push(cohortSize > 0 ? parseFloat(((active / cohortSize) * 100).toFixed(1)) : 0)
    }

    return { cohortDate, cohortSize, retentionByMonth }
  })

  const months = Array.from({ length: maxMonths }, (_, i) => i)

  const month1Total = cohorts
    .filter((c) => c.retentionByMonth.length > 1)
    .reduce((sum, c) => sum + (c.retentionByMonth[1] || 0) * c.cohortSize, 0)
  const month1Customers = cohorts
    .filter((c) => c.retentionByMonth.length > 1)
    .reduce((sum, c) => sum + c.cohortSize, 0)
  const overallMonth1 = month1Customers > 0 ? parseFloat((month1Total / month1Customers).toFixed(1)) : 0

  const month3Total = cohorts
    .filter((c) => c.retentionByMonth.length > 3)
    .reduce((sum, c) => sum + (c.retentionByMonth[3] || 0) * c.cohortSize, 0)
  const month3Customers = cohorts
    .filter((c) => c.retentionByMonth.length > 3)
    .reduce((sum, c) => sum + c.cohortSize, 0)
  const overallMonth3 = month3Customers > 0 ? parseFloat((month3Total / month3Customers).toFixed(1)) : 0

  return {
    cohorts,
    maxMonths,
    overallMonth1,
    overallMonth3,
    cohortDates: sortedDates,
    months,
  }
}

export type RetentionCellColor = "green" | "yellow" | "red" | "empty"

export function getRetentionColor(retention: number): RetentionCellColor {
  if (retention >= 70) return "green"
  if (retention >= 40) return "yellow"
  return "red"
}
