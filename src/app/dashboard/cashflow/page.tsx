'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/browser'
import { ForecastChart } from '@/components/cashflow/forecast-chart'
import { PeriodSelector } from '@/components/cashflow/period-selector'
import type { ForecastDay } from '@/core/forecast/types'
import Link from 'next/link'

export default function CashflowPage() {
  const [period, setPeriod] = useState<30 | 60 | 90>(30)
  const [forecasts, setForecasts] = useState<ForecastDay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const supabase = createClient()
        const { data: { user }, error: authErr } = await supabase.auth.getUser()

        if (authErr || !user) {
          window.location.href = '/login'
          return
        }

        const endDate = new Date()
        endDate.setDate(endDate.getDate() + period)
        const endStr = endDate.toISOString().split('T')[0]
        const todayStr = new Date().toISOString().split('T')[0]

        const { data, error: dbErr } = await supabase
          .from('cashflow_forecasts')
          .select('*')
          .eq('user_id', user.id)
          .gte('forecast_date', todayStr)
          .lte('forecast_date', endStr)
          .order('forecast_date', { ascending: true })

        if (dbErr) throw new Error(dbErr.message)

        if (!cancelled) {
          setForecasts(
            (data ?? []).map((r: any) => ({
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
      } catch (err: any) {
        if (!cancelled) setError(err?.message ?? 'Something went wrong.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [period])

  const lastDay = forecasts.at(-1)

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Cash Flow Forecast</h1>
          <p className="mt-1 text-gray-500">
            Projected revenue with P50 / P80 / P95 confidence bands
          </p>
        </div>
        <PeriodSelector selectedPeriod={period} onPeriodChange={setPeriod} />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          </div>
        ) : error ? (
          <div className="flex h-96 flex-col items-center justify-center gap-3 text-center">
            <svg className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p className="text-sm font-medium text-red-600">{error}</p>
            <button
              onClick={() => setPeriod((p) => p)}
              className="mt-1 rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Try again
            </button>
          </div>
        ) : forecasts.length === 0 ? (
          <div className="flex h-96 flex-col items-center justify-center gap-3 text-center">
            <svg className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            <h3 className="text-base font-semibold text-gray-900">No forecast data yet</h3>
            <p className="max-w-xs text-sm text-gray-500">
              Connect your Stripe account in Settings, then wait for the next sync to generate forecasts.
            </p>
            <Link
              href="/dashboard/settings"
              className="mt-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Go to Settings
            </Link>
          </div>
        ) : (
          <ForecastChart data={forecasts} period={period} />
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: 'P50 (Expected)', value: lastDay?.bands.p50, color: 'text-emerald-600' },
          { label: 'P80 (Moderate)', value: lastDay?.bands.p80, color: 'text-amber-600' },
          { label: 'P95 (Conservative)', value: lastDay?.bands.p95, color: 'text-red-600' },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className={`mt-1 text-lg font-semibold tabular-nums ${color}`}>
              {value != null ? `~$${(value / 100).toFixed(0)}` : '—'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
