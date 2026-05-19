'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/browser'
import { ForecastChart } from '@/components/cashflow/forecast-chart'
import { PeriodSelector } from '@/components/cashflow/period-selector'
import { PlanGate } from '@/components/plan-gate'
import type { PlanId } from '@/lib/subscription'
import type { ForecastDay } from '@/core/forecast/types'

export default function CashflowPage() {
  const [period, setPeriod] = useState<30 | 60 | 90>(30)
  const [forecasts, setForecasts] = useState<ForecastDay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [plan, setPlan] = useState<PlanId>('free')

  const loadData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/login'
        return
      }

      const { data: sub } = await supabase
        .from('subscriptions')
        .select('plan, status')
        .eq('user_id', user.id)
        .in('status', ['active', 'on_trial'])
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      setPlan((sub?.plan as PlanId) ?? 'free')

      const endDate = new Date()
      endDate.setDate(endDate.getDate() + period)
      const endStr = endDate.toISOString().split('T')[0]
      const todayStr = new Date().toISOString().split('T')[0]

      const { data } = await supabase
        .from('cashflow_forecasts')
        .select('*')
        .eq('user_id', user.id)
        .gte('forecast_date', todayStr)
        .lte('forecast_date', endStr)
        .order('forecast_date', { ascending: true })

      if (data) {
        setForecasts(
          data.map((r: any) => ({
            date: r.forecast_date,
            amountCents: r.amount_cents,
            type: r.type as 'revenue' | 'expense' | 'net',
            bands: {
              p50: r.p50_cents ?? r.amount_cents,
              p80: r.p80_cents ?? r.amount_cents,
              p95: r.p95_cents ?? r.amount_cents,
            },
          }))
        )
      }
    } catch (e: any) {
      setError(e?.message || e?.error_description || 'Failed to load forecast')
    }
    setLoading(false)
  }, [period])

  useEffect(() => { loadData() }, [loadData])

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Cash Flow Forecast</h1>
          <p className="mt-1 text-gray-500">
            Projected revenue with P50/P80/P95 confidence bands
          </p>
        </div>
        <PeriodSelector selectedPeriod={period} onPeriodChange={setPeriod} />
      </div>

      <PlanGate requiredPlan="pro" currentPlan={plan} feature="Cash flow forecast">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {loading ? (
            <div className="flex h-96 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-red-600 font-medium mb-1">Failed to load forecast</p>
              <p className="text-xs text-gray-400 mb-4">{error}</p>
              <button onClick={loadData} className="inline-flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Retry
              </button>
            </div>
          ) : forecasts.length === 0 ? (
            <div className="flex h-96 items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">No forecast data yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Connect Stripe in Settings and wait for the next sync to generate forecasts.
                </p>
              </div>
            </div>
          ) : (
            <ForecastChart data={forecasts} period={period} />
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">P50 (Expected)</p>
            <p className="mt-1 text-lg font-semibold text-emerald-600">
              ~{forecasts.length > 0 ? `$${(forecasts[forecasts.length - 1].bands.p50 / 100).toFixed(0)}` : '—'}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">P80 (Moderate)</p>
            <p className="mt-1 text-lg font-semibold text-amber-600">
              ~{forecasts.length > 0 ? `$${(forecasts[forecasts.length - 1].bands.p80 / 100).toFixed(0)}` : '—'}
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">P95 (Conservative)</p>
            <p className="mt-1 text-lg font-semibold text-red-600">
              ~{forecasts.length > 0 ? `$${(forecasts[forecasts.length - 1].bands.p95 / 100).toFixed(0)}` : '—'}
            </p>
          </div>
        </div>
      </PlanGate>
    </div>
  )
}
