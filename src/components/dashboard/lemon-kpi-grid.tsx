'use client'

import { useMemo } from 'react'
import { formatCurrency } from '@/lib/utils'

interface LemonDashboardData {
  mrr: number
  prevMrr: number
  activeSubscriptions: number
  totalRevenue: number
  churnRate: number
  prevChurnRate: number
  newCustomersThisMonth: number
  newCustomersLastMonth: number
  cancelledThisMonth: number
  totalCustomers: number
  totalOrders: number
  lastSyncAt: string | null
}

interface Props {
  data: LemonDashboardData | null
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
  color?: 'green' | 'yellow' | 'red' | 'default'
}) {
  const trendColor =
    color ??
    (trend === undefined
      ? 'default'
      : trend > 0
        ? 'green'
        : trend < 0
          ? 'red'
          : 'default')

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900 tabular-nums">{value}</p>
      {trend !== undefined && (
        <div className="mt-1 flex items-center gap-1">
          <span
            className={`text-xs font-medium ${
              trendColor === 'green'
                ? 'text-green-600'
                : trendColor === 'red'
                  ? 'text-red-600'
                  : 'text-yellow-600'
            }`}
          >
            {trend >= 0 ? '+' : ''}{trend.toFixed(1)}%
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

export function LemonKpiGrid({ data, loading, error, onRefresh }: Props) {
  const churnColor = useMemo(() => {
    if (!data) return 'default'
    if (data.churnRate > 5) return 'red'
    if (data.churnRate > 2) return 'yellow'
    return 'green'
  }, [data])

  const mrrTrend = useMemo(() => {
    if (!data || data.prevMrr === 0) return undefined
    return ((data.mrr - data.prevMrr) / data.prevMrr) * 100
  }, [data])

  const customerTrend = useMemo(() => {
    if (!data || data.newCustomersLastMonth === 0) return undefined
    return (
      ((data.newCustomersThisMonth - data.newCustomersLastMonth) /
        data.newCustomersLastMonth) *
      100
    )
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

  if (!data) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🍋</span>
          <h2 className="text-base font-semibold text-gray-900">
            Lemon Squeezy
          </h2>
          {data.lastSyncAt && (
            <span className="text-xs text-gray-400">
              Synced{' '}
              {new Date(data.lastSyncAt).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
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
          title="MRR"
          value={formatCurrency(data.mrr)}
          trend={mrrTrend}
          trendLabel="vs last month"
        />
        <StatCard
          title="Active Subs"
          value={String(data.activeSubscriptions)}
          subtext={`${data.totalOrders} total orders`}
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(data.totalRevenue)}
          subtext="All time"
        />
        <StatCard
          title="Churn Rate"
          value={`${data.churnRate}%`}
          trend={data.prevChurnRate > 0 ? data.churnRate - data.prevChurnRate : undefined}
          color={churnColor}
          trendLabel="vs last month"
        />
        <StatCard
          title="New Customers"
          value={String(data.newCustomersThisMonth)}
          trend={customerTrend}
          trendLabel="this month"
          subtext={`${data.totalCustomers} total`}
        />
      </div>
    </div>
  )
}
