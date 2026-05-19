'use client'

import { useMemo } from 'react'
import { KPICGrid } from '@/components/dashboard/kpi-grid'
import { MrrTrendChart } from '@/components/analytics/mrr-trend-chart'
import { computeMRRTrend, computeCashFlow, computeRunway } from '@/lib/analytics-data'
import type { MetricResult } from '@/core/metrics/types'

interface Props {
  metrics: MetricResult
  changes?: { mrr?: number; arr?: number; churn?: number; ltv?: number }
  metricsHistory?: { date: string; mrrCents: number; arrCents: number; churnRate: number; ltvCents: number }[]
}

export function OverviewExecutiveSummary({ metrics, changes, metricsHistory }: Props) {
  const history = useMemo(() => {
    if (metricsHistory && metricsHistory.length > 0) return metricsHistory
    return []
  }, [metricsHistory])
  const mrrTrend = useMemo(() => computeMRRTrend(history), [history])
  const cashFlow = useMemo(() => computeCashFlow(history), [history])
  const runway = useMemo(() => computeRunway(cashFlow), [cashFlow])

  const recentTrend = mrrTrend.slice(-30)
  const latestMrr = recentTrend[recentTrend.length - 1]
  const prevMrr = recentTrend[recentTrend.length - 2]
  const mrrGrowth = prevMrr && prevMrr.mrrCents > 0
    ? ((latestMrr.mrrCents - prevMrr.mrrCents) / prevMrr.mrrCents) * 100
    : 0

  return (
    <>
      <KPICGrid metrics={metrics} changes={changes} />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Revenue Trend</h3>
              <p className="text-xs text-gray-500">Last 30 days</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900 tabular-nums">
                ${(latestMrr?.mrrCents ?? 0 / 100).toLocaleString()}
              </p>
              {mrrGrowth !== 0 && (
                <span className={`text-xs font-medium ${mrrGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {mrrGrowth >= 0 ? '▲' : '▼'} {Math.abs(mrrGrowth).toFixed(1)}%
                </span>
              )}
            </div>
          </div>
          <MrrTrendChart data={recentTrend} height={160} />
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Cash Runway</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-xs text-gray-500">Monthly burn</span>
              <span className="text-sm font-semibold text-gray-900 tabular-nums">
                ${(runway.monthlyBurnCents / 100).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-xs text-gray-500">Cash on hand</span>
              <span className="text-sm font-semibold text-gray-900 tabular-nums">
                ${(runway.cashOnHandCents / 100).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-gray-500">Runway</span>
              <span className={`text-sm font-semibold tabular-nums ${runway.isHealthy ? 'text-green-600' : 'text-red-600'}`}>
                {runway.runwayMonths} months
              </span>
            </div>
            {!runway.isHealthy && (
              <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
                Runway below 12-month threshold. Review costs.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
