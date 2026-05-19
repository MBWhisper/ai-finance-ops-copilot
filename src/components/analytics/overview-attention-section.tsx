'use client'

import { useMemo } from 'react'
import { computeInvoiceStats, computeAging, computeOverdueStatus, formatCents } from '@/lib/invoice-utils'
import {
  computeRetentionSummary,
  computeCollectionHealth,
  computeRunway,
  computeCashFlow,
  computeOperationalInsights,
} from '@/lib/analytics-data'
import type { Invoice } from '@/lib/invoice-types'

interface Props {
  invoices: Invoice[]
  metricsHistory: { date: string; mrrCents: number; arrCents: number; churnRate: number; ltvCents: number }[]
}

export function OverviewAttentionSection({ invoices, metricsHistory }: Props) {
  const stats = useMemo(() => computeInvoiceStats(invoices), [invoices])
  const aging = useMemo(() => computeAging(invoices), [invoices])
  const retention = useMemo(() => computeRetentionSummary(), [])
  const collectionHealth = useMemo(() => computeCollectionHealth(invoices), [invoices])
  const cashFlow = useMemo(() => computeCashFlow(metricsHistory), [metricsHistory])
  const runway = useMemo(() => computeRunway(cashFlow), [cashFlow])

  const latestMrr = metricsHistory.length > 0 ? metricsHistory[metricsHistory.length - 1].mrrCents : 0
  const prevMrr = metricsHistory.length > 1 ? metricsHistory[metricsHistory.length - 2].mrrCents : 0
  const mrrGrowth = prevMrr > 0 ? ((latestMrr - prevMrr) / prevMrr) * 100 : 0

  const insights = useMemo(
    () => computeOperationalInsights(invoices, retention, runway, collectionHealth, mrrGrowth),
    [invoices, retention, runway, collectionHealth, mrrGrowth],
  )

  const overdueCount = stats.overdue
  const paidCount = invoices.filter(i => computeOverdueStatus(i) === 'paid').length
  const collectionPct = invoices.length > 0 ? Math.round((paidCount / invoices.length) * 100) : 0

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Outstanding</p>
          <p className="mt-1 text-lg font-bold text-gray-900 tabular-nums">{formatCents(stats.outstandingAmountCents)}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Overdue</p>
          <p className="mt-1 text-lg font-bold text-red-600 tabular-nums">{overdueCount}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500">DSO</p>
          <p className="mt-1 text-lg font-bold text-gray-900 tabular-nums">{stats.dso}d</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-gray-500">Collection Rate</p>
          <p className="mt-1 text-lg font-bold text-gray-900 tabular-nums">{collectionPct}%</p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">AR Aging Preview</h3>
          <div className="space-y-2">
            {aging.map(b => (
              <div key={b.label} className="flex items-center justify-between text-sm">
                <span className="text-xs text-gray-600 min-w-[72px]">{b.label}</span>
                <div className="flex-1 mx-3">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(100, b.amountCents / Math.max(...aging.map(x => x.amountCents), 1) * 100)}%`,
                        background: b.label === 'Current' ? '#22c55e' : b.label === '1–30 days' ? '#eab308' : b.label === '31–60 days' ? '#f97316' : '#ef4444',
                      }}
                    />
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-900 tabular-nums min-w-[60px] text-right">
                  {b.count} / {formatCents(b.amountCents)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">What Needs Attention</h3>
          {insights.length === 0 ? (
            <p className="text-sm text-gray-400">All clear — no issues detected.</p>
          ) : (
            <div className="space-y-2">
              {insights.slice(0, 4).map((insight, i) => (
                <div
                  key={i}
                  className={`rounded-lg px-3 py-2.5 text-sm ${
                    insight.type === 'warning'
                      ? 'bg-red-50 border border-red-100'
                      : insight.type === 'positive'
                        ? 'bg-green-50 border border-green-100'
                        : 'bg-blue-50 border border-blue-100'
                  }`}
                >
                  <p className={`text-xs font-medium ${
                    insight.type === 'warning' ? 'text-red-700' : insight.type === 'positive' ? 'text-green-700' : 'text-blue-700'
                  }`}>{insight.title}</p>
                  <p className={`text-xs mt-0.5 ${
                    insight.type === 'warning' ? 'text-red-600' : insight.type === 'positive' ? 'text-green-600' : 'text-blue-600'
                  }`}>{insight.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
