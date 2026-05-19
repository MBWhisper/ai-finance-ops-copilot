import type { Invoice } from './invoice-types'
import { computeOverdueStatus, computeInvoiceStats, computeAging } from './invoice-utils'

// ─── Types ───

export interface MrrTrendPoint {
  date: string
  mrrCents: number
  arrCents: number
  growthRate: number
}

export interface RevenueBreakdown {
  newCents: number
  expansionCents: number
  churnedCents: number
  netNewCents: number
  months: { label: string; newCents: number; expansionCents: number; churnedCents: number }[]
}

export interface RetentionSummary {
  month1: number
  month3: number
  cohortLabel: string
  benchmark1: number
  benchmark3: number
  status: 'strong' | 'at-risk' | 'weak'
}

export interface CashFlowPoint {
  month: string
  inflowCents: number
  outflowCents: number
  netCents: number
}

export interface RunwayEstimate {
  monthlyBurnCents: number
  cashOnHandCents: number
  runwayMonths: number
  isHealthy: boolean
}

export interface CollectionHealth {
  dso: number
  collectionRate: number
  totalOutstandingCents: number
  overdueRate: number
  reminderEffectiveness: number
}

export interface OperationalInsight {
  type: 'warning' | 'positive' | 'info'
  title: string
  description: string
}

// ─── Selectors ───

export function computeMRRTrend(history: { date: string; mrrCents: number; arrCents: number }[]): MrrTrendPoint[] {
  return history.map((d, i) => {
    const prev = i > 0 ? history[i - 1].mrrCents : d.mrrCents
    const growthRate = prev > 0 ? ((d.mrrCents - prev) / prev) * 100 : 0
    return { date: d.date, mrrCents: d.mrrCents, arrCents: d.arrCents, growthRate }
  })
}

export function computeRevenueBreakdown(history: { date: string; mrrCents: number }[]): RevenueBreakdown {
  const months = history.map((d, i) => {
    const prev = i > 0 ? history[i - 1].mrrCents : d.mrrCents
    const delta = d.mrrCents - prev
    const expansionCents = delta > 0 ? Math.round(delta * 0.4) : 0
    const newCents = delta > 0 ? Math.round(delta * 0.6) : 0
    const churnedCents = delta < 0 ? Math.abs(delta) : 0
    return {
      label: new Date(d.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      newCents, expansionCents, churnedCents,
    }
  })

  const latest = months[months.length - 1] ?? { newCents: 0, expansionCents: 0, churnedCents: 0 }
  const totalNew = months.reduce((s, m) => s + m.newCents, 0)
  const totalExpansion = months.reduce((s, m) => s + m.expansionCents, 0)
  const totalChurned = months.reduce((s, m) => s + m.churnedCents, 0)

  return {
    newCents: latest.newCents,
    expansionCents: latest.expansionCents,
    churnedCents: latest.churnedCents,
    netNewCents: totalNew + totalExpansion - totalChurned,
    months,
  }
}

export function computeRetentionSummary(data?: {
  month1: number
  month3: number
}): RetentionSummary {
  const month1 = data?.month1 ?? 72
  const month3 = data?.month3 ?? 48
  return {
    month1,
    month3,
    cohortLabel: 'Jan 2026',
    benchmark1: 60,
    benchmark3: 40,
    status: month1 >= 70 ? 'strong' : month3 >= 40 ? 'at-risk' : 'weak',
  }
}

export function computeCashFlow(history: { date: string; mrrCents: number }[]): CashFlowPoint[] {
  return history.map((d) => {
    const inflowCents = d.mrrCents
    const outflowCents = Math.round(d.mrrCents * 0.75)
    return {
      month: new Date(d.date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
      inflowCents,
      outflowCents,
      netCents: inflowCents - outflowCents,
    }
  })
}

export function computeRunway(cashFlow: CashFlowPoint[], cashOnHandOverrideCents?: number): RunwayEstimate {
  const avgBurn = cashFlow.length > 0
    ? cashFlow.reduce((s, m) => s + Math.abs(Math.min(m.netCents, 0)), 0) / cashFlow.length
    : 0
  const cashOnHandCents = cashOnHandOverrideCents ?? 12000000
  const monthlyBurnCents = Math.max(avgBurn, 1)
  return {
    monthlyBurnCents,
    cashOnHandCents,
    runwayMonths: Math.round(cashOnHandCents / monthlyBurnCents),
    isHealthy: cashOnHandCents / Math.max(monthlyBurnCents, 1) >= 12,
  }
}

export function computeCollectionHealth(invoices: Invoice[]): CollectionHealth {
  const stats = computeInvoiceStats(invoices)
  const total = invoices.length
  const overdueCount = invoices.filter(i => computeOverdueStatus(i) === 'overdue').length
  const withReminders = invoices.filter(i => i.remindersSent > 0)
  const remindedPaid = withReminders.filter(i => i.status === 'paid').length
  return {
    dso: stats.dso,
    collectionRate: stats.collectionRate,
    totalOutstandingCents: stats.outstandingAmountCents,
    overdueRate: total > 0 ? (overdueCount / total) * 100 : 0,
    reminderEffectiveness: withReminders.length > 0 ? (remindedPaid / withReminders.length) * 100 : 0,
  }
}

export function computeOperationalInsights(
  invoices: Invoice[],
  retention: RetentionSummary,
  runway: RunwayEstimate,
  collectionHealth: CollectionHealth,
  mrrGrowth: number,
): OperationalInsight[] {
  const insights: OperationalInsight[] = []
  const aging = computeAging(invoices)
  const midAging = aging.find(b => b.label === '31–60 days')
  const oldAging = aging.find(b => b.label === '90+ days')

  if (midAging && midAging.amountCents > 50000) {
    insights.push({
      type: 'warning',
      title: 'Overdue invoices concentrated in 31–60 day bucket',
      description: `${midAging.count} invoices totaling ${formatCentsShort(midAging.amountCents)} are 31–60 days overdue. Prioritize collections.`,
    })
  }

  if (retention.month3 < 50) {
    insights.push({
      type: 'warning',
      title: 'Retention weakens after month 3',
      description: `Month-3 retention is ${retention.month3}% (benchmark: ${retention.benchmark3}%). Focus on onboarding and engagement.`,
    })
  }

  if (mrrGrowth > 10) {
    insights.push({
      type: 'positive',
      title: 'Revenue growth is strong',
      description: `MRR grew ${mrrGrowth.toFixed(1)}% month-over-month. New business and expansions are driving momentum.`,
    })
  }

  if (collectionHealth.dso > 45) {
    insights.push({
      type: 'warning',
      title: 'DSO is above target',
      description: `Days Sales Outstanding is ${collectionHealth.dso}d. Target is under 45d. Review payment terms and collections.`,
    })
  }

  if (!runway.isHealthy) {
    insights.push({
      type: 'warning',
      title: 'Runway below 12-month threshold',
      description: `Current runway is ${runway.runwayMonths} months. Monitor burn rate and explore cost optimization.`,
    })
  } else {
    insights.push({
      type: 'info',
      title: 'Runway is healthy',
      description: `Current runway is ${runway.runwayMonths} months with a monthly burn of ${formatCentsShort(runway.monthlyBurnCents)}.`,
    })
  }

  if (collectionHealth.overdueRate > 20) {
    insights.push({
      type: 'warning',
      title: 'Overdue rate exceeds 20%',
      description: `${collectionHealth.overdueRate.toFixed(0)}% of invoices are overdue. Review credit policies and follow-up cadence.`,
    })
  }

  if (oldAging && oldAging.amountCents > 10000) {
    insights.push({
      type: 'warning',
      title: 'Aged receivables in 90+ day bucket',
      description: `${oldAging.count} invoice(s) totaling ${formatCentsShort(oldAging.amountCents)} are over 90 days past due. Consider escalation.`,
    })
  }

  return insights.slice(0, 6)
}

function formatCentsShort(cents: number): string {
  if (cents >= 10000000) return `$${(cents / 10000000).toFixed(1)}M`
  if (cents >= 100000) return `$${(cents / 100000).toFixed(1)}K`
  return `$${(cents / 100).toFixed(0)}`
}
