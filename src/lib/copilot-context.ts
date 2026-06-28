import { getLatestMetrics, getMetricsHistory } from '@/db/queries/metrics'
import { getForecasts } from '@/db/queries/forecasts'
import { db } from '@/db'
import { invoices, notifications } from '@/db/schema'
import { eq, and, or, desc } from 'drizzle-orm'

// ─── helpers ────────────────────────────────────────────────────────────────

function cents(v: number) { return Math.round(v / 100) }
function fmt(v: number) { return `$${(v / 100).toLocaleString('en-US', { minimumFractionDigits: 0 })}` }

function calcTrend(current: number, previous: number | undefined): string {
  if (!previous || previous === 0) return 'N/A'
  const pct = ((current - previous) / previous) * 100
  return `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`
}

function buildMrrHistory(rows: { date: string; mrrCents: number }[]) {
  const sorted = [...rows].reverse() // oldest → newest
  const months = sorted.map(r => {
    const d = new Date(r.date)
    return d.toLocaleString('en-US', { month: 'short' })
  })
  const values = sorted.map(r => cents(r.mrrCents))
  if (sorted.length < 2) return { months, values, growthRate: 'N/A' }
  const first = sorted[0]!.mrrCents
  const last  = sorted[sorted.length - 1]!.mrrCents
  const pct   = first > 0 ? (((last - first) / first) * 100).toFixed(0) : 0
  return { months, values, growthRate: `+${pct}% over ${sorted.length} months` }
}

// ─── DEMO fallback (used only when user has no synced data yet) ──────────────

function demoContext(page: string, pageData?: any) {
  const base = {
    currentPage: page,
    timestamp: new Date().toISOString(),
    dataSource: 'demo',
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
  if (page === 'invoices' && pageData?.invoices) return { ...base, invoiceDetails: pageData.invoices }
  if (page === 'analytics' && pageData?.cohorts)  return { ...base, cohortData: pageData.cohorts }
  return base
}

// ─── LIVE context builder ────────────────────────────────────────────────────

export async function buildCopilotContextLive(userId: string, page: string, pageData?: any) {
  try {
    // 1. Latest metrics snapshot + 6-month history
    const [latest, history] = await Promise.all([
      getLatestMetrics(userId),
      getMetricsHistory(userId, 6),
    ])

    // No data yet — fall back to demo so the AI still works
    if (!latest) return demoContext(page, pageData)

    const prev = history[1] // second-most-recent row = previous month

    // 2. Trend calculations
    const mrrTrend      = calcTrend(latest.mrrCents,  prev?.mrrCents)
    const arrTrend      = calcTrend(latest.arrCents,  prev?.arrCents)
    const churnTrend    = prev
      ? calcTrend(latest.churnRate * 100, prev.churnRate * 100)
      : 'N/A'
    const ltvTrend      = calcTrend(latest.ltvCents,  prev?.ltvCents)

    // 3. Invoices (live)
    const invoiceRows = await db.query.invoices.findMany({
      where: eq(invoices.userId, userId),
      orderBy: [desc(invoices.createdAt)],
      limit: 50,
    })
    const paidInvoices      = invoiceRows.filter(i => i.status === 'paid')
    const overdueInvoices   = invoiceRows.filter(i => i.status === 'overdue')
    const outstandingCents  = invoiceRows
      .filter(i => i.status !== 'paid')
      .reduce((s, i) => s + (i.amountCents ?? 0), 0)

    // 4. Upcoming forecasts (next 90 days)
    const today     = new Date().toISOString().slice(0, 10)
    const in90days  = new Date(Date.now() + 90 * 864e5).toISOString().slice(0, 10)
    const forecasts = await getForecasts(userId, today, in90days)
    const forecastSummary = forecasts.slice(0, 3).map(f => ({
      date: f.forecastDate,
      amount: fmt(f.amountCents),
      p50: f.p50Cents ? fmt(f.p50Cents) : null,
    }))

    // 5. Unread alerts / notifications
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

    // 6. MRR history for trend graph context
    const mrrHistory = buildMrrHistory(history)

    // 7. PMF heuristic from retention (derived from cohort data if available, else estimated)
    const churnDecimal = latest.churnRate / 100
    const estimatedMonth1Retention = Math.round(Math.max(0, (1 - churnDecimal) * 100))
    const estimatedMonth3Retention = Math.round(Math.max(0, Math.pow(1 - churnDecimal, 3) * 100))
    const pmfScore = estimatedMonth1Retention >= 65
      ? 'Strong'
      : estimatedMonth1Retention >= 40
        ? 'Developing'
        : 'Weak'

    // ── assemble context ────────────────────────────────────────────────────
    const base = {
      currentPage: page,
      timestamp: new Date().toISOString(),
      dataSource: 'live',
      metrics: {
        mrr:       { value: cents(latest.mrrCents),  formatted: fmt(latest.mrrCents),  trend: mrrTrend,   label: 'Monthly Recurring Revenue' },
        arr:       { value: cents(latest.arrCents),  formatted: fmt(latest.arrCents),  trend: arrTrend,   label: 'Annual Recurring Revenue' },
        churnRate: { value: `${latest.churnRate.toFixed(2)}%`, trend: churnTrend, label: 'Monthly Churn Rate' },
        ltv:       { value: cents(latest.ltvCents),  formatted: fmt(latest.ltvCents),  trend: ltvTrend,   label: 'Customer Lifetime Value' },
        pmfScore,
        month1Retention: `${estimatedMonth1Retention}%`,
        month3Retention: `${estimatedMonth3Retention}%`,
      },
      invoices: {
        total:        invoiceRows.length,
        paid:         paidInvoices.length,
        outstanding:  cents(outstandingCents),
        outstandingFormatted: fmt(outstandingCents),
        overdueCount: overdueInvoices.length,
      },
      mrrHistory,
      forecastNext90Days: forecastSummary,
      activeAlerts: alertSummary,
    }

    if (page === 'invoices' && pageData?.invoices) return { ...base, invoiceDetails: pageData.invoices }
    if (page === 'analytics' && pageData?.cohorts)  return { ...base, cohortData: pageData.cohorts }
    return base

  } catch (err) {
    console.error('[copilot-context] live query failed, falling back to demo', err)
    return demoContext(page, pageData)
  }
}

// ─── Legacy sync export (kept for any existing callers) ─────────────────────
// Kept for backward compatibility — new code should use buildCopilotContextLive
export function buildCopilotContext(page: string, pageData?: any) {
  return demoContext(page, pageData)
}
