'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar,
} from 'recharts'
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react'

interface MonthlyRevenue {
  month: string
  revenue: number
  mrr: number
}

interface TopProduct {
  product: string
  revenue: number
}

interface StatusBreakdown {
  status: string
  count: number
  percentage: number
}

interface OrderItem {
  id: string
  lsOrderId: string
  orderNumber: number
  total: number
  currency: string
  status: string
  customerName: string | null
  customerEmail: string | null
  productName: string | null
  variantName: string | null
  createdAt: string
}

interface PaginatedOrders {
  items: OrderItem[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

const STATUS_COLORS: Record<string, string> = {
  active: '#10b981',
  cancelled: '#ef4444',
  paused: '#f59e0b',
  trial: '#6366f1',
  expired: '#6b7280',
  past_due: '#f97316',
}

const DONUT_COLORS = ['#10b981', '#ef4444', '#f59e0b', '#6366f1', '#6b7280', '#f97316']

function fmtUsd(amount: number): string {
  return `$${amount.toLocaleString()}`
}

function fmtDate(d: string): string {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function statusBadge(status: string) {
  const cls: Record<string, string> = {
    paid: 'bg-green-100 text-green-700',
    refunded: 'bg-red-100 text-red-700',
    partial_refund: 'bg-yellow-100 text-yellow-700',
  }
  return cls[status] ?? 'bg-gray-100 text-gray-700'
}

export function LemonAnalytics() {
  const [loading, setLoading] = useState(true)
  const [revenue, setRevenue] = useState<MonthlyRevenue[]>([])
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])
  const [statusBreakdown, setStatusBreakdown] = useState<StatusBreakdown[]>([])
  const [orders, setOrders] = useState<PaginatedOrders | null>(null)
  const [page, setPage] = useState(1)
  const [error, setError] = useState('')

  const loadData = useCallback(async (p: number) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/lemonsqueezy/analytics?page=${p}`)
      const json = await res.json()
      if (!res.ok || !json.connected) {
        throw new Error(json.error ?? 'Not connected')
      }
      setRevenue(json.revenue)
      setTopProducts(json.topProducts)
      setStatusBreakdown(json.statusBreakdown)
      setOrders(json.orders)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load')
    }
    setLoading(false)
  }, [])

  useEffect(() => { loadData(page) }, [loadData, page])

  if (loading && !orders) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-sm text-red-600 mb-4">{error}</p>
        <button
          onClick={() => loadData(page)}
          className="inline-flex items-center px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!orders || revenue.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
        <p className="text-sm text-gray-400">No Lemon Squeezy data yet. Connect your store in Settings and sync.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Section A: Revenue Over Time */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Revenue Over Time
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenue} margin={{ top: 4, right: 12, bottom: 0, left: -8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: '#9ca3af' }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(m: string) => {
                    const d = new Date(m + '-01')
                    return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
                  }}
                />
                <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} width={48} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null
                    const d = new Date(label + '-01')
                    const lbl = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                    return (
                      <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg text-xs">
                        <p className="font-medium text-gray-900 mb-1">{lbl}</p>
                        {payload.map((p) => (
                          <div key={p.name} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                            <span className="text-gray-500">{p.name}</span>
                            <span className="ml-auto font-medium text-gray-900">${(p.value as number).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    )
                  }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Monthly Revenue" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="mrr" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" name="MRR" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Section B: Subscription Status */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          Subscription Status
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusBreakdown}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {statusBreakdown.map((entry, i) => (
                      <Cell key={entry.status} fill={STATUS_COLORS[entry.status] ?? DONUT_COLORS[i % DONUT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null
                      const d = payload[0].payload as StatusBreakdown
                      return (
                        <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg text-xs">
                          <p className="font-medium text-gray-900 capitalize">{d.status}</p>
                          <p className="text-gray-500">{d.count} subs ({d.percentage}%)</p>
                        </div>
                      )
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Breakdown</h3>
            <div className="space-y-2">
              {statusBreakdown.map((s) => (
                <div key={s.status} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: STATUS_COLORS[s.status] ?? '#6b7280' }}
                    />
                    <span className="text-xs text-gray-700 capitalize">{s.status.replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{s.count}</span>
                    <span className="text-xs font-semibold text-gray-900 min-w-[40px] text-right">{s.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section C: Top Products */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Top Products by Revenue
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{ top: 4, right: 12, bottom: 0, left: 100 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="product" tick={{ fontSize: 11, fill: '#374151' }} tickLine={false} axisLine={false} width={90} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null
                    return (
                      <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg text-xs">
                        <p className="font-medium text-gray-900 mb-1">{label}</p>
                        <p className="text-gray-500">${(payload[0].value as number).toLocaleString()}</p>
                      </div>
                    )
                  }}
                />
                <Bar dataKey="revenue" fill="#f59e0b" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Section D: Orders Table */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
          Orders
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order #</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.items.map((o) => (
                  <tr key={o.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{fmtDate(o.createdAt)}</td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-900">#{o.orderNumber}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{o.customerName ?? o.customerEmail ?? '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{o.productName ?? '—'}</td>
                    <td className="px-4 py-3 text-xs text-right font-medium tabular-nums text-gray-900">
                      {o.currency === 'usd' ? '$' : o.currency}{' '}{(o.total / 100).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${statusBadge(o.status)}`}>
                        {o.status.replace('_', ' ')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 bg-gray-50">
              <p className="text-xs text-gray-500">
                Page {orders.page} of {orders.totalPages} ({orders.total} orders)
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={orders.page <= 1}
                  className="rounded-lg border border-gray-300 p-1.5 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(orders.totalPages, p + 1))}
                  disabled={orders.page >= orders.totalPages}
                  className="rounded-lg border border-gray-300 p-1.5 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
