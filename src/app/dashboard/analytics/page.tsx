'use client'

import { useMemo, useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/browser'
import { KPICard } from '@/components/dashboard/kpi-card'
import { MrrTrendChart } from '@/components/analytics/mrr-trend-chart'
import { RevenueCompositionChart } from '@/components/analytics/revenue-composition-chart'
import { AgingBarChart } from '@/components/analytics/aging-bar-chart'
import { RunwayChart } from '@/components/analytics/runway-chart'
import { CohortRetentionGrid } from '@/components/analytics/cohort-retention-grid'
import {
  computeMRRTrend, computeRevenueBreakdown, computeRetentionSummary,
  computeCashFlow, computeRunway, computeCollectionHealth,
  computeOperationalInsights, type OperationalInsight,
} from '@/lib/analytics-data'
import { computeInvoiceStats, computeAging } from '@/lib/invoice-utils'
import { mapDbInvoiceToFrontend } from '@/lib/invoices-live'
import type { Invoice } from '@/lib/invoice-types'

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<30 | 60 | 90>(90)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [metricsHistory, setMetricsHistory] = useState<{ date: string; mrrCents: number; arrCents: number; churnRate: number; ltvCents: number }[]>([])
  const [subscriptions, setSubscriptions] = useState<{ created_at: string; status: string; mrr_cents: number }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  async function loadData() {
    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }

      const [
        { data: invData },
        { data: metricData },
        { data: subData },
      ] = await Promise.all([
        supabase.from('invoices').select('*').eq('user_id', user.id).order('due_date', { ascending: false }),
        supabase.from('metrics_daily').select('*').eq('user_id', user.id).order('date', { ascending: true }),
        supabase.from('subscriptions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      ])

      if (invData) setInvoices(invData.map(mapDbInvoiceToFrontend))
      if (metricData) {
        setMetricsHistory(metricData.map((r) => ({
          date: r.date,
          mrrCents: r.mrr_cents,
          arrCents: r.arr_cents,
          churnRate: r.churn_rate ?? 0,
          ltvCents: r.ltv_cents ?? 0,
        })))
      }
      if (subData) setSubscriptions(subData)
      setLastUpdated(new Date())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed')
    }
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  const periodHistory = useMemo(() => {
    if (metricsHistory.length === 0) return metricsHistory
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - period)
    return metricsHistory.filter(h => new Date(h.date) >= cutoff)
  }, [metricsHistory, period])

  const stats = useMemo(() => computeInvoiceStats(invoices), [invoices])
  const aging = useMemo(() => computeAging(invoices), [invoices])
  const mrrTrend = useMemo(() => computeMRRTrend(periodHistory), [periodHistory])
  const revenueBreakdown = useMemo(() => computeRevenueBreakdown(periodHistory), [periodHistory])

  // Derive retention from real subscriptions
  const retentionData = useMemo(() => {
    const now = new Date()
    const month1Ago = new Date(now.getTime() - 30 * 86400000)
    const month3Ago = new Date(now.getTime() - 90 * 86400000)

    const startedMonth1 = subscriptions.filter((s) => new Date(s.created_at) <= month1Ago)
    const startedMonth3 = subscriptions.filter((s) => new Date(s.created_at) <= month3Ago)

    const retainedMonth1 = startedMonth1.filter((s) =>
      s.status === 'active' || s.status === 'trialing'
    )
    const retainedMonth3 = startedMonth3.filter((s) =>
      s.status === 'active' || s.status === 'trialing'
    )

    return {
      month1: startedMonth1.length > 0
        ? Math.round((retainedMonth1.length / startedMonth1.length) * 100)
        : 0,
      month3: startedMonth3.length > 0
        ? Math.round((retainedMonth3.length / startedMonth3.length) * 100)
        : 0,
    }
  }, [subscriptions])

  const retention = useMemo(() => computeRetentionSummary(
    retentionData.month1 > 0 ? retentionData : undefined
  ), [retentionData])

  const cashFlow = useMemo(() => computeCashFlow(periodHistory), [periodHistory])
  const runway = useMemo(() => computeRunway(cashFlow), [cashFlow])
  const collectionHealth = useMemo(() => computeCollectionHealth(invoices), [invoices])

  const latest = periodHistory[periodHistory.length - 1]
  const mrGrowth = periodHistory.length > 1 && periodHistory[periodHistory.length - 2].mrrCents > 0
    ? ((latest?.mrrCents ?? 0 - (periodHistory[periodHistory.length - 2]?.mrrCents ?? 0)) / (periodHistory[periodHistory.length - 2]?.mrrCents ?? 1)) * 100
    : 0

  const insights = useMemo(
    () => computeOperationalInsights(invoices, retention, runway, collectionHealth, mrGrowth),
    [invoices, retention, runway, collectionHealth, mrGrowth],
  )

  const insightIcon = (type: OperationalInsight['type']) => {
    if (type === 'warning') return '⚠'
    if (type === 'positive') return '✓'
    return 'ℹ'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm text-red-600 font-medium mb-1">Failed to load analytics</p>
        <p className="text-xs text-gray-400 mb-4">{error}</p>
        <button onClick={loadData} className="inline-flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-0.5">Deep analysis of your SaaS financial data.</p>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdated && (
            <p className="text-[11px] text-gray-400 hidden sm:block">
              Updated {lastUpdated.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </p>
          )}
          <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-0.5">
          {([30, 60, 90] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                period === p ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {p}d
            </button>
          ))}
        </div>
        </div>
      </div>

      {/* A. Revenue Analytics */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Revenue Analytics
        </h2>
        {metricsHistory.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-gray-400">No revenue data yet. Connect Stripe and sync your metrics.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <KPICard title="MRR" value={latest?.mrrCents ?? 0} format="currency" change={mrGrowth} />
              <KPICard title="ARR" value={latest?.arrCents ?? 0} format="currency" />
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-gray-500">Growth Rate</p>
                <p className={`text-lg font-bold mt-1 tabular-nums ${mrGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {mrGrowth >= 0 ? '+' : ''}{mrGrowth.toFixed(1)}%
                </p>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-gray-500">Net New (MTD)</p>
                <p className="text-lg font-bold mt-1 text-gray-900 tabular-nums">
                  ${Math.round((revenueBreakdown.netNewCents) / 100).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm min-h-[256px]">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">MRR Trend</h3>
                <MrrTrendChart data={mrrTrend} height={200} />
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm min-h-[256px]">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Revenue Composition</h3>
                <RevenueCompositionChart data={revenueBreakdown} />
              </div>
            </div>
          </>
        )}
      </section>

      {/* B. Retention / Cohort Analytics */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Retention &amp; Cohort Analytics
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Cohort Retention</h3>
            <CohortRetentionGrid />
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Retention Summary</h3>
            {subscriptions.length === 0 ? (
              <p className="text-sm text-gray-400">No subscription data yet.</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Month-1</span>
                    <span className={`text-sm font-bold ${retention.month1 >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {retention.month1}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-green-500" style={{ width: `${retention.month1}%` }} />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">Benchmark: {retention.benchmark1}%</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Month-3</span>
                    <span className={`text-sm font-bold ${retention.month3 >= 50 ? 'text-green-600' : 'text-yellow-600'}`}>
                      {retention.month3}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-yellow-500" style={{ width: `${retention.month3}%` }} />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">Benchmark: {retention.benchmark3}%</p>
                </div>
                <div className={`rounded-lg px-3 py-2 text-sm mt-2 ${
                  retention.status === 'strong' ? 'bg-green-50 text-green-700' :
                  retention.status === 'at-risk' ? 'bg-yellow-50 text-yellow-700' : 'bg-red-50 text-red-700'
                }`}>
                  <span className="text-xs font-medium">
                    {retention.status === 'strong' ? '✅ PMF Status: Strong' :
                     retention.status === 'at-risk' ? '⚠ PMF Status: At Risk' : '❌ PMF Status: Weak'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* C. AR / Collections Analytics */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          AR / Collections Analytics
        </h2>
        {invoices.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-gray-400">No invoice data yet. Create invoices to see AR analytics.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-gray-500">DSO</p>
                <p className={`text-lg font-bold mt-1 tabular-nums ${collectionHealth.dso > 45 ? 'text-red-600' : 'text-green-600'}`}>
                  {collectionHealth.dso}d
                </p>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-gray-500">Collection Rate</p>
                <p className="text-lg font-bold mt-1 text-gray-900 tabular-nums">{collectionHealth.collectionRate}%</p>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-gray-500">Overdue Rate</p>
                <p className={`text-lg font-bold mt-1 tabular-nums ${collectionHealth.overdueRate > 20 ? 'text-red-600' : 'text-gray-900'}`}>
                  {collectionHealth.overdueRate.toFixed(0)}%
                </p>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-gray-500">Reminder Effectiveness</p>
                <p className="text-lg font-bold mt-1 text-gray-900 tabular-nums">
                  {collectionHealth.reminderEffectiveness === 0 ? 'N/A' : `${Math.round(collectionHealth.reminderEffectiveness)}%`}
                </p>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">AR Aging Distribution</h3>
                <AgingBarChart buckets={aging} />
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Aging Details</h3>
                <div className="space-y-2">
                  {aging.map(b => (
                    <div key={b.label} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                      <span className="text-xs text-gray-600">{b.label}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-400">{b.count} invoices</span>
                        <span className="text-xs font-semibold text-gray-900 tabular-nums min-w-[60px] text-right">
                          ${Math.round(b.amountCents / 100).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-1.5 font-medium">
                    <span className="text-xs text-gray-800">Total Outstanding</span>
                    <span className="text-xs font-bold text-gray-900 tabular-nums">
                      ${Math.round(aging.reduce((s, b) => s + b.amountCents, 0) / 100).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      {/* D. Cash Flow / Runway Analytics */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          Cash Flow &amp; Runway
        </h2>
        {periodHistory.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-sm text-gray-400">No cash flow data yet. Sync financial data to see runway projections.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-gray-500">Monthly Burn</p>
                <p className="text-lg font-bold mt-1 text-red-600 tabular-nums">
                  ${(runway.monthlyBurnCents / 100).toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-gray-500">Cash on Hand</p>
                <p className="text-lg font-bold mt-1 text-gray-900 tabular-nums">
                  ${(runway.cashOnHandCents / 100).toLocaleString()}
                </p>
              </div>
              <div className="rounded-lg border bg-white p-4 shadow-sm">
                <p className="text-xs font-medium text-gray-500">Runway</p>
                <p className={`text-lg font-bold mt-1 tabular-nums ${runway.isHealthy ? 'text-green-600' : 'text-red-600'}`}>
                  {runway.runwayMonths} months
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Monthly Inflow vs Outflow</h3>
              <RunwayChart data={cashFlow} />
            </div>
          </>
        )}
      </section>

      {/* E. Operational Insights */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
          Operational Insights
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          {insights.length === 0 ? (
            <p className="text-sm text-gray-400">No insights available yet. Add more data to see operational insights.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {insights.map((insight, i) => (
                <div
                  key={i}
                  className={`rounded-lg border px-4 py-3 ${
                    insight.type === 'warning'
                      ? 'bg-red-50 border-red-100'
                      : insight.type === 'positive'
                        ? 'bg-green-50 border-green-100'
                        : 'bg-blue-50 border-blue-100'
                  }`}
                >
                  <p className="text-xs font-semibold mb-1">
                    {insightIcon(insight.type)} {insight.title}
                  </p>
                  <p className={`text-xs leading-relaxed ${
                    insight.type === 'warning' ? 'text-red-600' : insight.type === 'positive' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {insight.description}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
