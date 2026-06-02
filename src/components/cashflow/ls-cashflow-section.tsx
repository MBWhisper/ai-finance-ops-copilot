'use client'

import { useEffect, useState } from 'react'
import { Loader2, TrendingUp, DollarSign, Activity } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface LsCashflowData {
  connected: boolean
  mrr: number
  activeSubscriptions: number
  lifetimeRevenue: number
  totalRevenue: number
}

export function LsCashflowSection() {
  const [data, setData] = useState<LsCashflowData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/lemonsqueezy/cashflow')
        const json = await res.json()
        if (json.connected) setData(json)
      } catch {
        // silently fail — not connected
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return null
  if (!data) return null

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-lg">🍋</span>
        Lemon Squeezy
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-[#FFC233]" />
            <p className="text-xs font-medium text-gray-500">Lemon Squeezy MRR</p>
          </div>
          <p className="text-lg font-bold text-gray-900 tabular-nums">${data.mrr.toLocaleString()}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{data.activeSubscriptions} active subscriptions</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-4 w-4 text-[#FFC233]" />
            <p className="text-xs font-medium text-gray-500">LS Lifetime Revenue</p>
          </div>
          <p className="text-lg font-bold text-gray-900 tabular-nums">${data.lifetimeRevenue.toLocaleString()}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Total paid - refunds</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="h-4 w-4 text-[#FFC233]" />
            <p className="text-xs font-medium text-gray-500">Forecast — LS MRR (Recurring)</p>
          </div>
          <p className="text-lg font-bold text-gray-900 tabular-nums">+${data.mrr.toLocaleString()}/mo</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Included in recurring income projection</p>
        </div>
      </div>
    </div>
  )
}
