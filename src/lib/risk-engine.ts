export interface RiskFactor {
  id: string
  label: string
  points: number
  detected: boolean
  detail: string
}

export interface CustomerRiskInput {
  customerId: string
  customerName: string
  email: string
  mrr: number
  renewalDate: Date
  daysSinceLastLogin: number
  planDowngradedInLast30Days: boolean
  paymentFailuresIn60Days: number
  usageChangePercent: number
  cancellationPageVisited: boolean
}

export interface CustomerRisk {
  customerId: string
  customerName: string
  email: string
  mrr: number
  renewalDate: Date
  daysToRenewal: number
  riskScore: number
  riskLevel: "safe" | "watch" | "at-risk" | "critical"
  factors: RiskFactor[]
  recommendation: string
}

export interface MRRMetrics {
  mrrCents: number
  arrCents: number
  churnRate: number
  ltvCents: number
  previousMonths: { month: string; mrrCents: number; churnRate: number }[]
  totalCustomers: number
  topCustomerMrrCents: number
  cashRunwayDays: number
}

export interface RevenueAlert {
  type: "mrr_growth_drop" | "churn_rate_high" | "net_mrr_negative" | "cash_runway_low" | "top_customer_concentration"
  severity: "warning" | "critical"
  title: string
  message: string
}

export interface CohortData {
  month: string
  totalCustomers: number
  retainedMonth1: number
  retainedMonth2: number
  retainedMonth3: number
}

export interface PMFStatus {
  status: "strong" | "at-risk" | "none"
  month1Retention: number
  month3Retention: number
  label: string
  description: string
}

function getRiskLevel(score: number): CustomerRisk["riskLevel"] {
  if (score <= 30) return "safe"
  if (score <= 60) return "watch"
  if (score <= 80) return "at-risk"
  return "critical"
}

function getRecommendation(level: CustomerRisk["riskLevel"]): string {
  switch (level) {
    case "critical": return "Call this customer today. Offer 2 months free."
    case "at-risk": return "Send a personal email within 24 hours."
    case "watch": return "Check in with a quick product tip email."
    case "safe": return "No action needed."
  }
}

export function calculateRiskScore(customer: CustomerRiskInput): CustomerRisk {
  const factors: RiskFactor[] = []
  let score = 0

  const daysToRenewal = Math.max(0, Math.ceil((customer.renewalDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)))

  if (customer.daysSinceLastLogin >= 14) {
    factors.push({
      id: "no_login",
      label: "No recent login",
      points: 30,
      detected: true,
      detail: `No login for ${customer.daysSinceLastLogin} days`,
    })
    score += 30
  }

  if (customer.planDowngradedInLast30Days) {
    factors.push({
      id: "plan_downgrade",
      label: "Plan downgraded",
      points: 25,
      detected: true,
      detail: "Plan downgraded in last 30 days",
    })
    score += 25
  }

  if (customer.paymentFailuresIn60Days >= 1) {
    factors.push({
      id: "payment_failure",
      label: "Payment failures",
      points: 20,
      detected: true,
      detail: `${customer.paymentFailuresIn60Days} payment failure(s) in 60 days`,
    })
    score += 20
  }

  if (customer.usageChangePercent <= -50) {
    factors.push({
      id: "usage_drop",
      label: "Usage dropped",
      points: 15,
      detected: true,
      detail: `Usage dropped ${Math.abs(customer.usageChangePercent)}% vs previous month`,
    })
    score += 15
  }

  if (customer.cancellationPageVisited) {
    factors.push({
      id: "cancel_visit",
      label: "Cancellation page visited",
      points: 10,
      detected: true,
      detail: "Visited cancellation page and stayed",
    })
    score += 10
  }

  score = Math.min(100, score)
  const level = getRiskLevel(score)
  const recommendation = getRecommendation(level)

  return {
    customerId: customer.customerId,
    customerName: customer.customerName,
    email: customer.email,
    mrr: customer.mrr,
    renewalDate: customer.renewalDate,
    daysToRenewal,
    riskScore: score,
    riskLevel: level,
    factors,
    recommendation,
  }
}

export function calculateRevenueAlerts(metrics: MRRMetrics): RevenueAlert[] {
  const alerts: RevenueAlert[] = []

  const months = metrics.previousMonths
  if (months.length >= 3) {
    const lastMonth = months[months.length - 1]
    const prevMonth = months[months.length - 2]
    const twoMonthsAgo = months[months.length - 3]

    const lastGrowth = lastMonth.mrrCents - prevMonth.mrrCents
    const prevGrowth = prevMonth.mrrCents - twoMonthsAgo.mrrCents

    if (lastGrowth < 0 && prevGrowth < 0) {
      alerts.push({
        type: "mrr_growth_drop",
        severity: "critical",
        title: "MRR growth declining",
        message: "MRR growth rate dropped for 2 consecutive months.",
      })
    }
  }

  if (metrics.churnRate > 5) {
    alerts.push({
      type: "churn_rate_high",
      severity: "warning",
      title: "High churn rate",
      message: `Churn rate is ${metrics.churnRate.toFixed(1)}% this month.`,
    })
  }

  if (months.length >= 2) {
    const lastMonth = months[months.length - 1]
    const prevMonth = months[months.length - 2]
    const expansions = lastMonth.mrrCents - prevMonth.mrrCents
    if (expansions < 0) {
      alerts.push({
        type: "net_mrr_negative",
        severity: "critical",
        title: "Net MRR negative",
        message: `Net MRR change is -$${Math.abs(expansions / 100).toFixed(0)} this month (expansions < contractions + churned).`,
      })
    }
  }

  if (metrics.cashRunwayDays < 90) {
    alerts.push({
      type: "cash_runway_low",
      severity: "critical",
      title: "Cash runway low",
      message: `Cash runway is ${metrics.cashRunwayDays} days (below 90-day threshold).`,
    })
  }

  if (metrics.totalCustomers > 0 && metrics.topCustomerMrrCents > 0) {
    const concentration = (metrics.topCustomerMrrCents / (metrics.mrrCents || 1)) * 100
    if (concentration > 20) {
      alerts.push({
        type: "top_customer_concentration",
        severity: "warning",
        title: "Customer concentration risk",
        message: `Top customer is ${concentration.toFixed(0)}% of total MRR.`,
      })
    }
  }

  return alerts
}

export function calculatePMFStatus(cohorts: CohortData[]): PMFStatus {
  if (cohorts.length === 0) {
    return {
      status: "none",
      month1Retention: 0,
      month3Retention: 0,
      label: "No data yet",
      description: "Not enough cohort data to determine PMF.",
    }
  }

  const totalMonth1Retention = cohorts.reduce((sum, c) => sum + (c.totalCustomers > 0 ? c.retainedMonth1 / c.totalCustomers : 0), 0)
  const totalMonth3Retention = cohorts.reduce((sum, c) => sum + (c.totalCustomers > 0 ? c.retainedMonth3 / c.totalCustomers : 0), 0)

  const month1Retention = parseFloat(((totalMonth1Retention / cohorts.length) * 100).toFixed(1))
  const month3Retention = parseFloat(((totalMonth3Retention / cohorts.length) * 100).toFixed(1))

  if (month1Retention > 60 && month3Retention > 40) {
    return {
      status: "strong",
      month1Retention,
      month3Retention,
      label: "Strong PMF ✅",
      description: "You're retaining users well. Keep iterating.",
    }
  }

  if (month1Retention >= 40 || month3Retention >= 20) {
    return {
      status: "at-risk",
      month1Retention,
      month3Retention,
      label: "PMF At Risk ⚠️",
      description: "Retention needs improvement. Focus on engagement.",
    }
  }

  return {
    status: "none",
    month1Retention,
    month3Retention,
    label: "No PMF ❌",
    description: "Significant product-market fit work needed.",
  }
}
