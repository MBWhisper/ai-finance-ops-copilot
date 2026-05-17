"use client"

import { useState, useMemo, useRef } from "react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts"
import {
  BarChart3, Users, X, Send, Download, ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  calculateCohorts, getRetentionColor, INDUSTRY_BENCHMARKS,
  type StripeSubscription, type CohortMonth,
} from "@/lib/cohort-engine"
import type { RetentionCellColor } from "@/lib/cohort-engine"

function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(cents / 100)
}

const mockSubscriptions: StripeSubscription[] = [
  { id: "s1", userId: "u1", status: "active", mrrCents: 29900, createdAt: "2026-01-10T00:00:00Z" },
  { id: "s2", userId: "u2", status: "active", mrrCents: 14900, createdAt: "2026-01-15T00:00:00Z" },
  { id: "s3", userId: "u3", status: "active", mrrCents: 49900, createdAt: "2026-01-20T00:00:00Z" },
  { id: "s4", userId: "u4", status: "canceled", mrrCents: 9900, createdAt: "2026-01-22T00:00:00Z", canceledAt: "2026-03-01T00:00:00Z" },
  { id: "s5", userId: "u5", status: "active", mrrCents: 19900, createdAt: "2026-01-25T00:00:00Z" },
  { id: "s6", userId: "u6", status: "active", mrrCents: 39900, createdAt: "2026-01-28T00:00:00Z" },
  { id: "s7", userId: "u7", status: "active", mrrCents: 24900, createdAt: "2026-02-05T00:00:00Z" },
  { id: "s8", userId: "u8", status: "active", mrrCents: 34900, createdAt: "2026-02-10T00:00:00Z" },
  { id: "s9", userId: "u9", status: "active", mrrCents: 15900, createdAt: "2026-02-15T00:00:00Z" },
  { id: "s10", userId: "u10", status: "canceled", mrrCents: 29900, createdAt: "2026-02-18T00:00:00Z", canceledAt: "2026-04-01T00:00:00Z" },
  { id: "s11", userId: "u11", status: "active", mrrCents: 44900, createdAt: "2026-02-20T00:00:00Z" },
  { id: "s12", userId: "u12", status: "active", mrrCents: 12900, createdAt: "2026-03-01T00:00:00Z" },
  { id: "s13", userId: "u13", status: "active", mrrCents: 59900, createdAt: "2026-03-05T00:00:00Z" },
  { id: "s14", userId: "u14", status: "active", mrrCents: 27900, createdAt: "2026-03-10T00:00:00Z" },
  { id: "s15", userId: "u15", status: "active", mrrCents: 18900, createdAt: "2026-03-15T00:00:00Z" },
  { id: "s16", userId: "u16", status: "active", mrrCents: 35900, createdAt: "2026-03-20T00:00:00Z" },
  { id: "s17", userId: "u17", status: "active", mrrCents: 21900, createdAt: "2026-04-01T00:00:00Z" },
  { id: "s18", userId: "u18", status: "active", mrrCents: 41900, createdAt: "2026-04-05T00:00:00Z" },
  { id: "s19", userId: "u19", status: "active", mrrCents: 16900, createdAt: "2026-04-10T00:00:00Z" },
  { id: "s20", userId: "u20", status: "active", mrrCents: 31900, createdAt: "2026-04-15T00:00:00Z" },
  { id: "s21", userId: "u21", status: "active", mrrCents: 25900, createdAt: "2026-05-01T00:00:00Z" },
  { id: "s22", userId: "u22", status: "active", mrrCents: 38900, createdAt: "2026-05-05T00:00:00Z" },
]

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

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-gray-900 mb-1">Month {label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-xs" style={{ color: entry.color }}>
          {entry.name}: {entry.value}%
        </p>
      ))}
    </div>
  )
}

export default function CohortsPage() {
  const [drilldown, setDrilldown] = useState<{
    cohortDate: string
    monthIndex: number
    retention: number
    color: string
  } | null>(null)

  const result = useMemo(() => calculateCohorts(mockSubscriptions), [])
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
        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors min-touch-target"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* PMF Health Card */}
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
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-16">
          <Users className="h-12 w-12 text-gray-300" />
          <p className="mt-4 text-lg font-semibold text-gray-900">No subscription data yet</p>
          <p className="mt-1 text-sm text-gray-500">Connect Stripe to see your real cohorts.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm scroll-container-touch">
            <div className="relative">
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
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out",
          drilldown ? "translate-x-0" : "translate-x-full"
        )}
      >
        {drilldown && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Cohort Details</h3>
                <p className="text-xs text-gray-500">
                  {drilldown.cohortDate} · M+{drilldown.monthIndex} · {drilldown.retention}% retention
                </p>
              </div>
              <button
                onClick={() => setDrilldown(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors min-touch-target"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 scroll-container-touch">
              {mockSubscriptions
                .filter((s) => {
                  const cohort = cohorts.find((c) => c.cohortDate === drilldown.cohortDate)
                  if (!cohort) return false
                  // Show subscriptions from this cohort that were still active at monthIndex
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
              {mockSubscriptions.filter((s) => {
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
        )}
      </div>

      {/* Mobile Bottom Sheet */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl transform transition-transform duration-300 ease-in-out",
          drilldown ? "translate-y-0" : "translate-y-full"
        )}
        style={{ height: "70vh" }}
      >
        {drilldown && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Cohort Details</h3>
                <p className="text-xs text-gray-500">
                  {drilldown.cohortDate} · M+{drilldown.monthIndex}
                </p>
              </div>
              <button
                onClick={() => setDrilldown(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors min-touch-target"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 scroll-container-touch">
              {mockSubscriptions
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
        )}
      </div>

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
