"use client"

import { useState, useEffect, useMemo } from "react"
import { createClient } from "@/lib/supabase/browser"
import { AlertTriangle, TrendingDown, Users, DollarSign, Calendar, Send } from "lucide-react"
import { RiskBadge } from "@/components/risk/RiskBadge"
import { cn } from "@/lib/utils"

interface DemoCustomer {
  id: string
  name: string
  email: string
  mrrCents: number
  riskScore: number
  riskLevel: "safe" | "watch" | "at-risk" | "critical"
  daysToRenewal: number
  topFactor: string
  recommendation: string
}

interface DemoAlert {
  type: "net_mrr" | "churn_rate" | "cash_runway" | "concentration"
  severity: "warning" | "critical"
  title: string
  message: string
  icon: "trending" | "users" | "dollar"
}

function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(cents / 100)
}

function getDemoCustomers(): DemoCustomer[] {
  return [
    { id: "1", name: "John Doe", email: "john@acme.com", mrrCents: 29900, riskScore: 87, riskLevel: "critical", daysToRenewal: 8, topFactor: "No login for 18 days", recommendation: "Call this customer today. Offer 2 months free." },
    { id: "2", name: "Sara Miller", email: "sara@tech.co", mrrCents: 14900, riskScore: 65, riskLevel: "at-risk", daysToRenewal: 14, topFactor: "Usage dropped 52%", recommendation: "Send a personal email within 24 hours." },
    { id: "3", name: "Alex Chen", email: "alex@startup.io", mrrCents: 49900, riskScore: 45, riskLevel: "watch", daysToRenewal: 21, topFactor: "Payment failure last week", recommendation: "Check in with a quick product tip email." },
    { id: "4", name: "Lisa Park", email: "lisa@design.studio", mrrCents: 9900, riskScore: 30, riskLevel: "watch", daysToRenewal: 35, topFactor: "Plan downgrade 2 weeks ago", recommendation: "Check in with a quick product tip email." },
    { id: "5", name: "Tom Baker", email: "tom@baker.co", mrrCents: 79900, riskScore: 15, riskLevel: "safe", daysToRenewal: 60, topFactor: "None", recommendation: "No action needed." },
    { id: "6", name: "Emma Wilson", email: "emma@wilson.com", mrrCents: 19900, riskScore: 72, riskLevel: "at-risk", daysToRenewal: 10, topFactor: "Cancellation page visited", recommendation: "Send a personal email within 24 hours." },
  ]
}

function getDemoRevenueAlerts(): DemoAlert[] {
  return [
    { type: "net_mrr", severity: "critical", title: "Net MRR Negative", message: "-$340 this month (expansions < contractions)", icon: "trending" },
    { type: "churn_rate", severity: "warning", title: "Churn Rate Rising", message: "4.8% this month (up 2 consecutive months)", icon: "users" },
  ]
}

const filterOptions = ["All", "Critical", "At Risk", "Watch"] as const

export default function WarningsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All")
  const [customers, setCustomers] = useState<DemoCustomer[]>([])
  const [alerts, setAlerts] = useState<DemoAlert[]>([])
  const [isDemo, setIsDemo] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = await createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setIsDemo(true)
        setCustomers(getDemoCustomers())
        setAlerts(getDemoRevenueAlerts())
        setLoading(false)
        return
      }

      const { data: subs } = await supabase
        .from('stripe_subscriptions')
        .select('id, user_id, status, mrr_cents, created_at, canceled_at')
        .eq('user_id', user.id)

      if (subs && subs.length > 0) {
        setCustomers(subs.map((s, i: number) => ({
          id: s.id,
          name: `Customer ${i + 1}`,
          email: `customer${i + 1}@example.com`,
          mrrCents: s.mrr_cents,
          riskScore: s.status === 'canceled' ? 85 : 20,
          riskLevel: s.status === 'canceled' ? 'critical' as const : 'safe' as const,
          daysToRenewal: 30,
          topFactor: s.status === 'canceled' ? 'Subscription canceled' : 'None',
          recommendation: s.status === 'canceled' ? 'Reach out to win back this customer.' : 'No action needed.',
        })))
        setAlerts([])
      } else {
        setIsDemo(true)
        setCustomers(getDemoCustomers())
        setAlerts(getDemoRevenueAlerts())
      }
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => {
    if (activeFilter === "All") return customers
    return customers.filter((c) => {
      if (activeFilter === "Critical") return c.riskLevel === "critical"
      if (activeFilter === "At Risk") return c.riskLevel === "at-risk"
      if (activeFilter === "Watch") return c.riskLevel === "watch"
      return true
    })
  }, [activeFilter, customers])

  const criticalCount = customers.filter((c) => c.riskLevel === "critical").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            Early Warnings
          </h1>
          <p className="mt-1 text-sm text-gray-500">Monitor customer health and revenue risks.</p>
        </div>
        {criticalCount > 0 && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            {criticalCount} Critical
          </span>
        )}
      </div>

      {loading && (
        <div className="space-y-3">
          {[1,2,3].map(i => (
            <div key={i} className="h-16 w-full rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      )}

      {isDemo && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
          📊 This is a live demo —{' '}
          <a href="/register" className="font-semibold underline underline-offset-2">
            Sign up free to connect your data
          </a>
        </div>
      )}

      {!loading && (
      <>
      <div className="grid gap-3 sm:grid-cols-2">
        {alerts.map((alert) => (
          <div
            key={alert.type}
            className={cn(
              "rounded-xl border p-4 shadow-sm",
              alert.severity === "critical" ? "border-red-200 bg-red-50" : "border-amber-200 bg-amber-50"
            )}
          >
            <div className="flex items-start gap-3">
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                alert.severity === "critical" ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
              )}>
                {alert.icon === "trending" ? <TrendingDown className="h-5 w-5" /> : <Users className="h-5 w-5" />}
              </div>
              <div className="min-w-0">
                <p className={cn(
                  "text-sm font-semibold",
                  alert.severity === "critical" ? "text-red-800" : "text-amber-800"
                )}>{alert.title}</p>
                <p className={cn(
                  "mt-0.5 text-sm",
                  alert.severity === "critical" ? "text-red-600" : "text-amber-600"
                )}>{alert.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      </>)}

      {!loading && (
        <>
      {/* PMF Status Banner */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
            <DollarSign className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-800">Product-Market Fit: Strong ✅</p>
            <p className="mt-0.5 text-sm text-emerald-600">
              Month-1: 72% retention &middot; Month-3: 48% retention &middot; You&apos;re retaining users well. Keep iterating.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scroll-container-touch -mx-1 px-1">
        {filterOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setActiveFilter(opt)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors min-h-[44px]",
              activeFilter === opt
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
            )}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-16">
          <Users className="h-12 w-12 text-gray-300" />
          <p className="mt-4 text-lg font-semibold text-gray-900">All customers look healthy</p>
          <p className="mt-1 text-sm text-gray-500">Check back after your next billing cycle.</p>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden sm:block rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto">
        <div className="min-w-[600px]">
          <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Customer</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">MRR</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Risk</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Days</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Top Factor</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Action</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <p className="text-sm font-medium text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[160px]">{c.email}</p>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{formatCents(c.mrrCents)}</td>
                <td className="px-4 py-3"><RiskBadge score={c.riskScore} /></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5 text-sm text-gray-600">
                    <Calendar className="h-3.5 w-3.5" />
                    {c.daysToRenewal}d
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-[180px] truncate">{c.topFactor}</td>
                <td className="px-4 py-3">
                  <p className="text-xs text-gray-500 max-w-[160px] leading-tight">{c.recommendation}</p>
                </td>
                <td className="px-4 py-3">
                  <a
                    href={`mailto:${c.email}?subject=We%20noticed%20something`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 transition-colors min-touch-target"
                    aria-label={`Send email to ${c.name}`}
                  >
                    <Send className="h-3.5 w-3.5" />
                    Send Email
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-3">
        {filtered.map((c) => (
          <div key={c.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{c.name}</p>
                <p className="text-xs text-gray-500 truncate">{c.email}</p>
              </div>
              <RiskBadge score={c.riskScore} />
            </div>
            <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
              <span className="font-medium text-gray-900">{formatCents(c.mrrCents)}</span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {c.daysToRenewal}d
              </span>
            </div>
            <p className="mt-2 text-xs text-gray-500">{c.topFactor}</p>
            <p className="mt-1 text-xs text-gray-400 leading-tight">{c.recommendation}</p>
            <a
              href={`mailto:${c.email}?subject=We%20noticed%20something`}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors min-touch-target"
            >
              <Send className="h-4 w-4" />
              Send Email
            </a>
          </div>
        ))}
      </div>
        </>
      )}
    </div>
  )
}
