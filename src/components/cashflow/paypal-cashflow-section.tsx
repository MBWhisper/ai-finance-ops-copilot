'use client'

import { useEffect, useState } from "react"
import { Loader2, TrendingUp, DollarSign, Activity } from "lucide-react"

interface PayPalCashflowData {
  connected: boolean
  mrr: number
  monthlyRevenue: number
  lifetimeRevenue: number
  activeSubscriptions: number
}

export function PayPalCashflowSection() {
  const [data, setData] = useState<PayPalCashflowData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/paypal/cashflow")
        const json = await res.json()
        if (json.connected) setData(json)
      } catch {
        // silently fail
      }
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return null
  if (!data) return null

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#003087">
          <path d="M20.067 8.478c.493.526.746 1.255.746 2.188 0 2.625-1.588 4.068-3.979 4.068h-1.416l-.925 3.894H12.89l.924-3.894h.738c1.875 0 2.813-.937 3.214-2.516.357-1.416.179-3.74-1.696-3.74h-2.5l-1.116 4.688H9.86l1.116-4.688H7.64l-1.116 4.688H3.964l1.116-4.688H.559l.372-1.563h4.52l.893-3.75H2.011l.372-1.563h6.25c.894 0 1.563.223 2.055.669.492.446.738 1.116.738 2.011 0 .894-.246 1.696-.738 2.409-.492.713-1.117 1.07-1.875 1.07h-.67l.892-3.75h-.625l-1.116 4.688h1.563z" />
        </svg>
        PayPal Revenue
      </h2>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-[#003087]" />
            <p className="text-xs font-medium text-gray-500">PayPal Monthly Revenue</p>
          </div>
          <p className="text-lg font-bold text-gray-900 tabular-nums">${(data.monthlyRevenue ?? 0).toLocaleString()}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Net this month</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="h-4 w-4 text-[#003087]" />
            <p className="text-xs font-medium text-gray-500">PayPal Lifetime Net</p>
          </div>
          <p className="text-lg font-bold text-gray-900 tabular-nums">${(data.lifetimeRevenue ?? 0).toLocaleString()}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Gross - fees - refunds</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="h-4 w-4 text-[#003087]" />
            <p className="text-xs font-medium text-gray-500">PayPal Subscriptions MRR</p>
          </div>
          <p className="text-lg font-bold text-gray-900 tabular-nums">${(data.mrr ?? 0).toLocaleString()}/mo</p>
          <p className="text-[11px] text-gray-400 mt-0.5">{data.activeSubscriptions ?? 0} active subs</p>
        </div>
      </div>
    </div>
  )
}
