/**
 * copilot-context.server.ts
 *
 * SERVER-ONLY — never import this from a client component or hook.
 * Used exclusively by src/app/api/copilot/route.ts
 */

import { getLatestMetrics, getMetricsHistory } from '@/db/queries/metrics'
import { getForecasts } from '@/db/queries/forecasts'
import { db } from '@/db'
import { invoices, notifications } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'

// ─── helpers ──────────────────────────────────────────────────────────────────

function cents(v: number) { return Math.round(v / 100) }
function fmt(v: number) {
  return '$' + (v / 100).toLocaleString('en-US', { minimumFractionDigits: 0 })
}

function calcTrend(current: number, previous: number | undefined): string {
  if (!previous || previous === 0) return 'N/A'
  const pct = ((current - previous) / previous) * 100
  return `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`
}

function buildMrrHistory(rows: { date: string; mrrCents: number }[]) {
  const sorted = [...rows].reverse()
  const months = sorted.map(r =>
    new Date(r.date).toLocaleString('en-US', { month: 'short' })
  )
  const values = sorted.map(r => cents(r.mrrCents))
  if (sorted.length < 2) return { months, values, growthRate: 'N/A' }
  const first = sorted[0]!.mrrCents
  const last  = sorted[sorted.length - 1]!.mrrCents
  const pct   = first > 0 ? (((last - first) / first) * 100).toFixed(0) : '0'
  return { months, values, growthRate: `+${pct}% over ${sorted.length} months` }
}

// ─── demo fallback ─────────────────────────────────────────────────────────────

function demoContext(page: string, pageData?: unknown) {
  const base = {
    currentPage: page,
    timestamp: new Date().toISOString(),
    dataSource: 'demo' as const,
    metrics: {
      mrr:       { value: 72600,  trend: '+12.4%', label: 'Monthly Recurring Revenue' },
      arr:       { value: 871200, trend: '+12.4%', label: 'Annual Recurring Revenue' },
      churnRate: { value: '0.80%', trend: '-0.2%', label: 'Monthly Churn Rate' },
      ltv:       { value: 92000,  trend: '+8.1%',  label: 'Customer Lifetime Value' },
      pmfScore: 'Strong',
      month1Retention: '72%',
      month3Retention: '48%',
    },
    invoices:   { total: 5, paid: 2, outstanding: 453, overdueCount: 2 },
    mrrHistory: {
      months: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
      values: [41200, 48900, 55600, 61300, 68100, 72600],
      growthRate: '+76% over 6 months',
    },
    trialDaysLeft: 5,
    notice: 'Demo data — connect an integration to see your real numbers.',
  }
  return { ...base, ...(pageData ? { pageData } : {}) }
}

// ─── LIVE context builder ──────────────────────────────────────────────────────

export async function buildCopilotContextLive(
  userId: string,
  page: string,
  pageData?: unknown
) {
  try {
    const [latest, history] = await Promise.all([
      getLatestMetrics(userId),
      getMetricsHistory(userId, 6),
    ])

    if (!latest) return demoContext(page, pageData)

    const prev = history[1]

    const mrrTrend   = calcTrend(latest.mrrCents, prev?.mrrCents)
    const arrTrend   = calcTrend(latest.arrCents, prev?.arrCents)
    const churnTrend = prev
      ? calcTrend(latest.churnRate * 100, prev.churnRate * 100)
      : 'N/A'
    const ltvTrend   = calcTrend(latest.ltvCents, prev?.ltvCents)

    const invoiceRows = await db.query.invoices.findMany({
      where: eq(invoices.userId, userId),
      orderBy: [desc(invoices.createdAt)],
      limit: 50,
    })
    const paidInvoices     = invoiceRows.filter(i => i.status === 'paid')
    const overdueInvoices  = invoiceRows.filter(i => i.status === 'overdue')
    const outstandingCents = invoiceRows
      .filter(i => i.status !== 'paid')
      .reduce((s, i) => s + (i.amountCents ?? 0), 0)

    const today    = new Date().toISOString().slice(0, 10)
    const in90days = new Date(Date.now() + 90 * 864e5).toISOString().slice(0, 10)
    const forecasts = await getForecasts(userId, today, in90days)
    const forecastSummary = forecasts.slice(0, 3).map(f => ({
      date:   f.forecastDate,
      amount: fmt(f.amountCents),
      p50:    f.p50Cents ? fmt(f.p50Cents) : null,
    }))

    const alerts = await db.query.notifications.findMany({
      where: and(
        eq(notifications.userId, userId),
        eq(notifications.read, false)
      ),
      orderBy: [desc(notifications.createdAt)],
      limit: 5,
    })
    const alertSummary = alerts.map(a => ({
      severity: a.severity,
      title:    a.title,
      message:  a.message,
    }))

    const mrrHistory = buildMrrHistory(history)

    const churnDecimal = latest.churnRate / 100
    const m1Retention  = Math.round(Math.max(0, (1 - churnDecimal) * 100))
    const m3Retention  = Math.round(Math.max(0, Math.pow(1 - churnDecimal, 3) * 100))
    const pmfScore     = m1Retention >= 65 ? 'Strong' : m1Retention >= 40 ? 'Developing' : 'Weak'

    const base = {
      currentPage: page,
      timestamp:   new Date().toISOString(),
      dataSource:  'live' as const,
      metrics: {
        mrr:       { value: cents(latest.mrrCents), formatted: fmt(latest.mrrCents), trend: mrrTrend,   label: 'Monthly Recurring Revenue' },
        arr:       { value: cents(latest.arrCents), formatted: fmt(latest.arrCents), trend: arrTrend,   label: 'Annual Recurring Revenue' },
        churnRate: { value: `${latest.churnRate.toFixed(2)}%`,                        trend: churnTrend, label: 'Monthly Churn Rate' },
        ltv:       { value: cents(latest.ltvCents), formatted: fmt(latest.ltvCents), trend: ltvTrend,   label: 'Customer Lifetime Value' },
        pmfScore,
        month1Retention: `${m1Retention}%`,
        month3Retention: `${m3Retention}%`,
      },
      invoices: {
        total:               invoiceRows.length,
        paid:                paidInvoices.length,
        outstanding:         cents(outstandingCents),
        outstandingFormatted: fmt(outstandingCents),
        overdueCount:        overdueInvoices.length,
      },
      mrrHistory,
      forecastNext90Days: forecastSummary,
      activeAlerts:       alertSummary,
    }

    return { ...base, ...(pageData ? { pageData } : {}) }
  } catch (err) {
    console.error('[copilot-context.server] live query failed, falling back to demo', err)
    return demoContext(page, pageData)
  }
}
