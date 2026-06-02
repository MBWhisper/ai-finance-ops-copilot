'use client'

import { useMemo } from "react"
import { formatCurrency } from "@/lib/utils"

interface PayPalDashboardData {
  balance: number
  monthlyRevenue: number
  prevMonthlyRevenue: number
  pendingTransactions: number
  pendingAmount: number
  outstandingInvoices: number
  outstandingTotal: number
  refundsThisMonth: number
  activeSubscriptions: number
  lastSyncedAt: string | null
  isConnected: boolean
  merchantEmail?: string
}

interface Props {
  data: PayPalDashboardData | null
  loading: boolean
  error: string | null
  onRefresh?: () => void
}

function StatCard({
  title,
  value,
  subtext,
  trend,
  trendLabel,
  color,
}: {
  title: string
  value: string
  subtext?: string
  trend?: number
  trendLabel?: string
  color?: "green" | "yellow" | "red" | "blue" | "default"
}) {
  const trendColor =
    color ??
    (trend === undefined
      ? "default"
      : trend > 0
        ? "green"
        : trend < 0
          ? "red"
          : "default")

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900 tabular-nums">{value}</p>
      {trend !== undefined && (
        <div className="mt-1 flex items-center gap-1">
          <span
            className={`text-xs font-medium ${
              trendColor === "green"
                ? "text-green-600"
                : trendColor === "red"
                  ? "text-red-600"
                  : "text-yellow-600"
            }`}
          >
            {trend >= 0 ? "+" : ""}{trend.toFixed(1)}%
          </span>
          {trendLabel && <span className="text-xs text-gray-400">{trendLabel}</span>}
        </div>
      )}
      {subtext && <p className="mt-0.5 text-xs text-gray-400">{subtext}</p>}
    </div>
  )
}

const handleRefresh = (onRefresh?: () => void) => {
  if (onRefresh) onRefresh()
  else window.location.reload()
}

export function PayPalKpiGrid({ data, loading, error, onRefresh }: Props) {
  const revenueTrend = useMemo(() => {
    if (!data || data.prevMonthlyRevenue === 0) return undefined
    return ((data.monthlyRevenue - data.prevMonthlyRevenue) / data.prevMonthlyRevenue) * 100
  }, [data])

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-700">{error}</p>
        <button
          onClick={() => handleRefresh(onRefresh)}
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm animate-pulse"
          >
            <div className="h-3 w-16 bg-gray-100 rounded" />
            <div className="mt-3 h-6 w-20 bg-gray-100 rounded" />
            <div className="mt-2 h-3 w-12 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#003087">
            <path d="M20.067 8.478c.493.526.746 1.255.746 2.188 0 2.625-1.588 4.068-3.979 4.068h-1.416l-.925 3.894H12.89l.924-3.894h.738c1.875 0 2.813-.937 3.214-2.516.357-1.416.179-3.74-1.696-3.74h-2.5l-1.116 4.688H9.86l1.116-4.688H7.64l-1.116 4.688H3.964l1.116-4.688H.559l.372-1.563h4.52l.893-3.75H2.011l.372-1.563h6.25c.894 0 1.563.223 2.055.669.492.446.738 1.116.738 2.011 0 .894-.246 1.696-.738 2.409-.492.713-1.117 1.07-1.875 1.07h-.67l.892-3.75h-.625l-1.116 4.688h1.563z" />
          </svg>
          <h2 className="text-base font-semibold text-gray-900">PayPal</h2>
          {data.lastSyncedAt && (
            <span className="text-xs text-gray-400">
              Synced{" "}
              {new Date(data.lastSyncedAt).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>
        <button
          onClick={() => handleRefresh(onRefresh)}
          className="text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <StatCard
          title="PayPal Balance"
          value={formatCurrency(data.balance)}
          subtext="Lifetime net"
        />
        <StatCard
          title="Revenue This Month"
          value={formatCurrency(data.monthlyRevenue)}
          trend={revenueTrend}
          trendLabel="vs last month"
          color="green"
        />
        <StatCard
          title="Pending Payments"
          value={`${data.pendingTransactions} (${formatCurrency(data.pendingAmount)})`}
          subtext="Awaiting clearance"
          color="yellow"
        />
        <StatCard
          title="Outstanding Invoices"
          value={`${data.outstandingInvoices} (${formatCurrency(data.outstandingTotal)})`}
          subtext="SENT + UNPAID"
          color={data.outstandingInvoices > 0 ? "yellow" : "default"}
        />
        <StatCard
          title="Refunds This Month"
          value={formatCurrency(data.refundsThisMonth)}
          color={data.refundsThisMonth > 10000 ? "red" : "default"}
        />
      </div>
    </div>
  )
}
