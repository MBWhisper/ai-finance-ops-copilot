"use client"

import { useState, useMemo, useEffect } from "react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts"
import {
  BarChart3, Users, X, Send, Download,
} from "lucide-react"
import { createClient } from '@/lib/supabase/browser'
import { cn } from "@/lib/utils"
import type { TooltipProps } from 'recharts'
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent'
import {
  calculateCohorts, getRetentionColor, INDUSTRY_BENCHMARKS,
  type StripeSubscription,
} from "@/lib/cohort-engine"
import type { RetentionCellColor } from "@/lib/cohort-engine"

function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(cents / 100)
}

function CohortCell({
  retention, monthIndex, cohortDate, color, isFuture,
}: {
  retention: number | null
  monthIndex: number
  cohortDate: string
  color: RetentionCellColor | "empty"
  isFuture: boolean
}) {
  const [tooltip, setTooltip] = useState(false)

  if (isFuture || retention === null) {
    return (
      <td className="px-2 py-2.5 text-center text-xs text-gray-300 bg-gray-50/50 min-w-[52px] h-10">--</td>
    )
  }

  const colorClasses: Record<string, string> = {
    green: "bg-emerald-100 text-emerald-800",
    yellow: "bg-amber-100 text-amber-800",
    red: "bg-red-100 text-red-800",
    empty: "bg-gray-100 text-gray-400",
  }

  return (
    <td
      className={cn(
        "px-2 py-2.5 text-center text-xs font-medium min-w-[52px] h-10 relative cursor-pointer hover:ring-2 hover:ring-inset hover:ring-blue-400 transition-all",
        colorClasses[color] || colorClasses.empty
      )}
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
      onClick={() => {
        const event = new CustomEvent('open-drilldown', {
          detail: { cohortDate, monthIndex, retention, color }
        })
        window.dispatchEvent(event)
      }}
    >
      <span>{retention}%</span>
      {tooltip && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-50 px-2 py-1 rounded bg-gray-900 text-white text-[10px] whitespace-nowrap shadow-lg pointer-events-none">
          {retention}% retained
        </div>
      )}
    </td>
  )
}

function ChartTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-gray-900 mb-1">Month {label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {entry.value}%
        </p>
      ))}
    </div>
  )
}

export default function CohortsPage() {
  const [subscriptions, setSubscriptions] = useState<StripeSubscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [drilldown, setDrilldown] = useState<{
    cohortDate: string
    monthIndex: number
    retention: number
    color: string
  } | null>(null)

  const FALLBACK_SUBS: StripeSubscription[] = [
    { id: 'mock_1', userId: 'mock', status: 'active', mrrCents: 290000, createdAt: '2025-10-01T00:00:00Z', canceledAt: null },
    { id: 'mock_2', userId: 'mock', status: 'active', mrrCents: 150000, createdAt: '2025-11-15T00:00:00Z', canceledAt: null },
    { id: 'mock_3', userId: 'mock', status: 'canceled', mrrCents: 99000, createdAt: '2025-08-01T00:00:00Z', canceledAt: '2026-01-01T00:00:00Z' },
    { id: 'mock_4', userId: 'mock', status: 'active', mrrCents: 420000, createdAt: '2025-12-01T00:00:00Z', canceledAt: null },
    { id: 'mock_5', userId: 'mock', status: 'active', mrrCents: 75000, createdAt: '2026-01-10T00:00:00Z', canceledAt: null },
    { id: 'mock_6', userId: 'mock', status: 'canceled', mrrCents: 200000, createdAt: '2025-06-15T00:00:00Z', canceledAt: '2025-09-01T00:00:00Z' },
    { id: 'mock_7', userId: 'mock', status: 'active', mrrCents: 310000, createdAt: '2026-02-05T00:00:00Z', canceledAt: null },
    { id: 'mock_8', userId: 'mock', status: 'active', mrrCents: 180000, createdAt: '2025-09-20T00:00:00Z', canceledAt: null },
  ]

  useEffect(() => {
    async function load() {
      setLoading(true)
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from('stripe_subscriptions')
        .select('id, user_id, status, mrr_cents, created_at, canceled_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })

      if (data && data.length > 0) {
        setSubscriptions(
          data.map((r): StripeSubscription => ({
            id: r.id,
            userId: r.user_id,
            status: r.status as 'active' | 'canceled',
            mrrCents: r.mrr_cents,
            createdAt: r.created_at,
            canceledAt: r.canceled_at ?? undefined,
          }))
        )
      }
      setLoading(false)
    }
    load()
  }, [])

  // Task 1: Listen for drilldown custom event from CohortCell
  useEffect(() => {
    const handler = (e: Event) => {
      const { cohortDate, monthIndex, retention, color } = (e as CustomEvent).detail
      setDrilldown({ cohortDate, monthIndex, retention, color })
    }
    window.addEventListener('open-drilldown', handler)
    return () => window.removeEventListener('open-drilldown', handler)
  }, [])

  // Task 2: Media query for desktop vs mobile breakpoint
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const result = useMemo(() => calculateCohorts(subscriptions), [subscriptions])
  const { cohorts, overallMonth1, overallMonth3, maxMonths } = result

  const chartData = useMemo(() => {
    const data: { month: string; you: number | null; benchmark: number | null }[] = []
    const benchmarks: Record<number, number> = {
      1: INDUSTRY_BENCHMARKS.month1,
      3: INDUSTRY_BENCHMARKS.month3,
      6: INDUSTRY_BENCHMARKS.month6,
      12: INDUSTRY_BENCHMARKS.month12,
    }

    for (let i = 0; i <= maxMonths; i++) {
      const cohortRetentions = cohorts
        .filter((c) => c.retentionByMonth.length > i)
        .map((c) => ({ retention: c.retentionByMonth[i], size: c.cohortSize }))
      const totalSize = cohortRetentions.reduce((s, c) => s + c.size, 0)
      const weighted = totalSize > 0
        ? parseFloat((cohortRetentions.reduce((s, c) => s + c.retention * c.size, 0) / totalSize).toFixed(1))
        : null

      data.push({
        month: `${i}`,
        you: weighted,
        benchmark: benchmarks[i] ?? null,
      })
    }
    return data
  }, [cohorts, maxMonths])

  const exportCSV = () => {
    const headers = ["Cohort", "Size", ...Array.from({ length: maxMonths }, (_, i) => `M+${i}`)]
    const rows = cohorts.map((c) => [
      c.cohortDate,
      c.cohortSize.toString(),
      ...c.retentionByMonth.map((r) => `${r}%`),
      ...Array.from({ length: Math.max(0, maxMonths - c.retentionByMonth.length + 1) }, () => ""),
    ])
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `cohort-analysis-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const pmfStatus = overallMonth1 > 60 && overallMonth3 > 40 ? "strong" : overallMonth1 >= 40 ? "at-risk" : "none"
  const pmfLabel = pmfStatus === "strong" ? "Strong PMF" : pmfStatus === "at-risk" ? "PMF At Risk" : "No PMF"
  const pmfEmoji = pmfStatus === "strong" ? "✅" : pmfStatus === "at-risk" ? "⚠️" : "❌"
  const pmfDesc = pmfStatus === "strong"
    ? "You're retaining users well. Keep iterating."
    : pmfStatus === "at-risk"
      ? "Retention needs improvement. Focus on engagement."
      : "Significant product-market fit work needed."

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              Cohort Analysis
            </h1>
            <p className="mt-1 text-sm text-gray-500">Track how well you retain customers over time.</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 min-w-[100px]">Cohort</th>
                <th className="px-3 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 min-w-[60px]">Size</th>
                {Array.from({ length: 6 }, (_, i) => (
                  <th key={i} className="px-3 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 min-w-[52px]">M+{i}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {Array.from({ length: 3 }, (_, row) => (
                <tr key={row}>
                  <td className="px-3 py-2.5"><div className="h-4 w-24 bg-gray-200 rounded animate-pulse" /></td>
                  <td className="px-3 py-2.5"><div className="h-4 w-8 bg-gray-200 rounded animate-pulse mx-auto" /></td>
                  {Array.from({ length: 6 }, (_, cell) => (
                    <td key={cell} className="px-3 py-2.5"><div className="h-8 w-[52px] bg-gray-100 rounded animate-pulse mx-auto" /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              Cohort Analysis
            </h1>
            <p className="mt-1 text-sm text-gray-500">Track how well you retain customers over time.</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm text-red-600 font-medium mb-1">Failed to load cohort data</p>
          <p className="text-xs text-gray-400 mb-4 max-w-sm text-center">{error}</p>
          <button onClick={() => window.location.reload()} className="inline-flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            Cohort Analysis
          </h1>
          <p className="mt-1 text-sm text-gray-500">Track how well you retain customers over time.</p>
        </div>
        {cohorts.length > 0 && (
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors min-touch-target"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        )}
      </div>

      {/* PMF Health Card */}
      {subscriptions.length > 0 && (
        <div className={cn(
          "rounded-xl border p-5 shadow-sm",
          pmfStatus === "strong" ? "border-emerald-200 bg-emerald-50" :
          pmfStatus === "at-risk" ? "border-amber-200 bg-amber-50" :
          "border-red-200 bg-red-50"
        )}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className={cn(
                "text-lg font-semibold",
                pmfStatus === "strong" ? "text-emerald-800" :
                pmfStatus === "at-risk" ? "text-amber-800" : "text-red-800"
              )}>
                {pmfLabel} {pmfEmoji}
              </p>
              <p className={cn(
                "mt-1 text-sm",
                pmfStatus === "strong" ? "text-emerald-600" :
                pmfStatus === "at-risk" ? "text-amber-600" : "text-red-600"
              )}>{pmfDesc}</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <p className={cn(
                  "text-2xl font-bold",
                  pmfStatus === "strong" ? "text-emerald-700" : "text-amber-700"
                )}>{overallMonth1}%</p>
                <p className="text-xs text-gray-500">Month-1 Retention</p>
                <p className="text-[10px] text-gray-400">Benchmark: {INDUSTRY_BENCHMARKS.month1}%</p>
              </div>
              <div className="text-center">
                <p className={cn(
                  "text-2xl font-bold",
                  pmfStatus === "strong" ? "text-emerald-700" : "text-amber-700"
                )}>{overallMonth3}%</p>
                <p className="text-xs text-gray-500">Month-3 Retention</p>
                <p className="text-[10px] text-gray-400">Benchmark: {INDUSTRY_BENCHMARKS.month3}%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Color Legend */}
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded bg-emerald-100" /> &ge; 70%
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded bg-amber-100" /> 40-69%
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded bg-red-100" /> &lt; 40%
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded bg-gray-100" /> No data
        </span>
      </div>

        {/* Cohort Table - Desktop & Mobile */}
        {cohorts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-6 sm:p-16">
            <Users className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300" />
            <p className="mt-4 text-base sm:text-lg font-semibold text-gray-900">No subscription data yet</p>
            <p className="mt-1 text-sm text-gray-500">Connect Stripe to see your real cohorts.</p>
          </div>
        ) : (
          <>
            <div className="-mx-3 sm:-mx-0 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm scroll-container-touch">
              <div className="min-w-[600px]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="sticky left-0 z-10 bg-gray-50 px-3 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 min-w-[100px]">
                        Cohort
                      </th>
                      <th className="px-3 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 min-w-[60px]">
                        Size
                      </th>
                      {Array.from({ length: maxMonths }, (_, i) => (
                        <th key={i} className="px-3 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-gray-500 min-w-[52px]">
                          M+{i}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {cohorts.map((c) => (
                      <tr key={c.cohortDate} className="hover:bg-gray-50/50 transition-colors">
                        <td className="sticky left-0 z-10 bg-white px-3 py-2.5 text-sm font-medium text-gray-900 min-w-[100px]">
                          {c.cohortDate}
                        </td>
                        <td className="px-3 py-2.5 text-center text-sm font-medium text-gray-700 min-w-[60px]">
                          {c.cohortSize}
                        </td>
                        {Array.from({ length: maxMonths }, (_, i) => {
                          const retention = c.retentionByMonth[i]
                          const isFuture = retention === undefined
                          const color = isFuture ? "empty" : getRetentionColor(retention!)
                          return (
                            <CohortCell
                              key={i}
                              retention={isFuture ? null : retention!}
                              monthIndex={i}
                              cohortDate={c.cohortDate}
                              color={color}
                              isFuture={isFuture}
                            />
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          {/* Retention Curve Chart */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">Retention Curve</h3>
            <div className="h-[200px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                    label={{ value: "Month", position: "insideBottom", offset: -5, style: { fontSize: 11, fill: "#9ca3af" } }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                    tickFormatter={(v: number) => `${v}%`}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                    iconType="plainline"
                  />
                  <Line
                    type="monotone"
                    dataKey="you"
                    name="Your retention"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={{ r: 3, fill: "#2563eb" }}
                    activeDot={{ r: 5 }}
                    connectNulls
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    name="Industry average"
                    stroke="#9ca3af"
                    strokeWidth={2}
                    strokeDasharray="6 4"
                    dot={{ r: 3, fill: "#9ca3af" }}
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* Customer Drill-Down Drawer (Desktop) */}
      {isDesktop && drilldown && (
        <div className="fixed inset-y-0 right-0 z-50 w-96 bg-white shadow-2xl" role="dialog" aria-labelledby="drilldown-title">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900" id="drilldown-title">Cohort Details</h3>
                <p className="text-xs text-gray-500">
                  {drilldown.cohortDate} · M+{drilldown.monthIndex} · {drilldown.retention}% retention
                </p>
              </div>
              <button
                onClick={() => setDrilldown(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors min-touch-target"
                aria-label="Close drill-down"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 scroll-container-touch">
              {subscriptions
                .filter((s) => {
                  const cohort = cohorts.find((c) => c.cohortDate === drilldown.cohortDate)
                  if (!cohort) return false
                  const subCohortDate = new Date(s.createdAt)
                  const cDate = new Date(drilldown.cohortDate + "-01")
                  const diffMonths = (subCohortDate.getFullYear() - cDate.getFullYear()) * 12 + subCohortDate.getMonth() - cDate.getMonth()
                  return diffMonths === 0
                })
                .map((s) => (
                  <div key={s.id} className="mb-2 rounded-lg border border-gray-100 bg-gray-50 p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Customer</p>
                        <p className="text-xs text-gray-500">ID: {s.userId}</p>
                      </div>
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        s.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                      )}>
                        {s.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-800">{formatCents(s.mrrCents)}/mo</p>
                    <button
                      onClick={() => window.location.href = `mailto:customer@example.com?subject=How%20can%20we%20help`}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors min-touch-target"
                    >
                      <Send className="h-3 w-3" />
                      Send Email
                    </button>
                  </div>
                ))}
              {subscriptions.filter((s) => {
                const cohort = cohorts.find((c) => c.cohortDate === drilldown.cohortDate)
                if (!cohort) return false
                const subCohortDate = new Date(s.createdAt)
                const cDate = new Date(drilldown.cohortDate + "-01")
                return (subCohortDate.getFullYear() - cDate.getFullYear()) * 12 + subCohortDate.getMonth() - cDate.getMonth() === 0
              }).length === 0 && (
                <div className="py-8 text-center text-sm text-gray-500">No customers in this cohort.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Sheet */}
      {!isDesktop && drilldown && (
        <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl pb-safe" style={{ height: "70vh" }}>
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900" id="drilldown-title">Cohort Details</h3>
                <p className="text-xs text-gray-500">
                  {drilldown.cohortDate} · M+{drilldown.monthIndex}
                </p>
              </div>
              <button
                onClick={() => setDrilldown(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors min-touch-target"
                aria-label="Close drill-down"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 scroll-container-touch" role="dialog" aria-labelledby="drilldown-title">
              {subscriptions
                .filter((s) => {
                  const subCohortDate = new Date(s.createdAt)
                  const cDate = new Date(drilldown.cohortDate + "-01")
                  return (subCohortDate.getFullYear() - cDate.getFullYear()) * 12 + subCohortDate.getMonth() - cDate.getMonth() === 0
                })
                .map((s) => (
                  <div key={s.id} className="mb-2 rounded-lg border border-gray-100 bg-gray-50 p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Customer</p>
                        <p className="text-xs text-gray-500">ID: {s.userId}</p>
                      </div>
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded-full",
                        s.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                      )}>
                        {s.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-gray-800">{formatCents(s.mrrCents)}/mo</p>
                    <a
                      href={`mailto:customer@example.com`}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 transition-colors min-touch-target"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Send Email
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Overlay for drill-down */}
      {drilldown && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setDrilldown(null)}
        />
      )}
    </div>
  )
}
