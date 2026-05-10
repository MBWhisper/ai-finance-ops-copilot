'use client'

import { useState, useMemo } from 'react'
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

type Period = 30 | 60 | 90

interface MetricRow {
  date: string
  mrrCents: number
  arrCents: number
  churnRate: number
}

interface MrrHistoryChartProps {
  data: MetricRow[]
  /** data is expected DESC from DB — we reverse internally */
  className?: string
}

function formatCents(cents: number): string {
  if (cents >= 100_000_00) return `$${(cents / 100_000_00).toFixed(1)}M`
  if (cents >= 1_000_00) return `$${(cents / 1_000_00).toFixed(1)}K`
  return `$${(cents / 100).toFixed(0)}`
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function momChange(current: number, previous: number | undefined): number | null {
  if (previous == null || previous === 0) return null
  return ((current - previous) / previous) * 100
}

const PERIOD_OPTIONS: Period[] = [30, 60, 90]

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
  allData: Array<{ date: string; mrr: number; arr: number }>
}

function CustomTooltip({ active, payload, label, allData }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null

  const idx = allData.findIndex((d) => d.date === label)
  const prev = idx > 0 ? allData[idx - 1] : null

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 shadow-lg">
      <p className="mb-1.5 text-xs font-medium text-gray-500">
        {label ? formatDate(label) : ''}
      </p>
      {payload.map((entry) => {
        const prevVal = prev
          ? entry.name === 'MRR'
            ? prev.mrr
            : prev.arr
          : null
        const change = momChange(entry.value, prevVal ?? undefined)
        return (
          <div key={entry.name} className="flex items-center gap-3">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: entry.color }}
            />
            <span className="text-xs text-gray-600">{entry.name}</span>
            <span className="ml-auto text-xs font-semibold text-gray-900">
              ${(entry.value / 100).toLocaleString('en-US', { minimumFractionDigits: 0 })}
            </span>
            {change !== null && (
              <span
                className={`text-xs font-medium ${
                  change >= 0 ? 'text-emerald-600' : 'text-red-500'
                }`}
              >
                {change >= 0 ? '+' : ''}{change.toFixed(1)}%
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function MrrHistoryChart({ data, className }: MrrHistoryChartProps) {
  const [period, setPeriod] = useState<Period>(30)
  const [showArr, setShowArr] = useState(false)

  // data comes DESC from DB — reverse to ASC for chart
  const ascending = useMemo(() => [...data].reverse(), [data])

  const sliced = useMemo(
    () => ascending.slice(-period),
    [ascending, period]
  )

  const chartData = useMemo(
    () =>
      sliced.map((d) => ({
        date: d.date,
        mrr: d.mrrCents,
        arr: d.arrCents,
      })),
    [sliced]
  )

  const latestMrr = chartData[chartData.length - 1]?.mrr ?? 0
  const prevMrr = chartData[chartData.length - 2]?.mrr
  const mrrChange = momChange(latestMrr, prevMrr)

  if (data.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 py-16 text-center ${
          className ?? ''
        }`}
      >
        <svg
          className="h-8 w-8 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
          />
        </svg>
        <p className="text-sm font-medium text-gray-500">No revenue data yet</p>
        <p className="max-w-xs text-xs text-gray-400">
          Sync your Stripe account to start tracking MRR history
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-gray-900">MRR History</h2>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span className="text-2xl font-bold tabular-nums text-gray-900">
              ${(latestMrr / 100).toLocaleString('en-US', { minimumFractionDigits: 0 })}
            </span>
            {mrrChange !== null && (
              <span
                className={`text-sm font-medium ${
                  mrrChange >= 0 ? 'text-emerald-600' : 'text-red-500'
                }`}
              >
                {mrrChange >= 0 ? '▲' : '▼'} {Math.abs(mrrChange).toFixed(1)}% vs prev day
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* ARR toggle */}
          <button
            onClick={() => setShowArr((v) => !v)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              showArr
                ? 'bg-violet-100 text-violet-700'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            ARR
          </button>

          {/* Period selector */}
          <div className="flex rounded-lg border border-gray-200 bg-gray-50 p-0.5">
            {PERIOD_OPTIONS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  period === p
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {p}d
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="arrGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatDate}
              interval={period === 30 ? 4 : period === 60 ? 9 : 14}
            />

            <YAxis
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatCents}
              width={56}
            />

            <Tooltip
              content={<CustomTooltip allData={chartData} />}
              cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
            />

            {showArr && (
              <Area
                type="monotone"
                dataKey="arr"
                name="ARR"
                stroke="#8b5cf6"
                strokeWidth={1.5}
                fill="url(#arrGradient)"
                dot={false}
                activeDot={{ r: 4, fill: '#8b5cf6', strokeWidth: 0 }}
              />
            )}

            <Area
              type="monotone"
              dataKey="mrr"
              name="MRR"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#mrrGradient)"
              dot={false}
              activeDot={{ r: 5, fill: '#3b82f6', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer stats */}
      {chartData.length > 1 && (
        <div className="mt-4 flex gap-6 border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs text-gray-400">Period high</p>
            <p className="text-sm font-semibold tabular-nums text-gray-900">
              ${(Math.max(...chartData.map((d) => d.mrr)) / 100).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Period low</p>
            <p className="text-sm font-semibold tabular-nums text-gray-900">
              ${(Math.min(...chartData.map((d) => d.mrr)) / 100).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Data points</p>
            <p className="text-sm font-semibold tabular-nums text-gray-900">{chartData.length}</p>
          </div>
        </div>
      )}
    </div>
  )
}
