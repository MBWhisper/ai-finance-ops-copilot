"use client"

import { useState } from "react"
import { ForecastChart } from "@/components/cashflow/forecast-chart"
import { PeriodSelector } from "@/components/cashflow/period-selector"
import { getDemoForecasts } from "@/lib/demo/data"
import type { ForecastDay } from "@/core/forecast/types"
import Link from "next/link"

export default function DemoCashflowPage() {
  const [period, setPeriod] = useState<30 | 60 | 90>(30)
  const raw = getDemoForecasts(period)

  const forecastData: ForecastDay[] = raw.map((d) => ({
    date: d.forecastDate,
    amountCents: d.amountCents,
    type: d.type,
    bands: {
      p50: d.p50Cents ?? d.amountCents,
      p80: d.p80Cents ?? d.amountCents,
      p95: d.p95Cents ?? d.amountCents,
    },
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Cash Flow Forecast</h1>
          <p className="mt-1 text-gray-500">Demo data — projected revenue and expenses.</p>
        </div>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Sign Up — It&apos;s Free
        </Link>
      </div>

      <PeriodSelector selectedPeriod={period} onPeriodChange={setPeriod} />

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <ForecastChart data={forecastData} period={period} />
      </div>
    </div>
  )
}
