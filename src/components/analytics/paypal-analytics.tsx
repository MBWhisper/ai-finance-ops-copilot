'use client'

import { useEffect, useState, useCallback } from "react"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar,
} from "recharts"
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react"

interface MonthlyRevenue {
  month: string
  gross: number
  net: number
  fees: number
}

interface TransactionStatus {
  status: string
  count: number
  percentage: number
}

interface TopPayer {
  email: string
  name: string
  total: number
  count: number
}

interface TxItem {
  id: string
  transactionId: string
  transactionType: string | null
  status: string | null
  amount: number | null
  currency: string | null
  feeAmount: number | null
  netAmount: number | null
  payerEmail: string | null
  payerName: string | null
  itemName: string | null
  transactionDate: string | null
}

interface PaginatedTx {
  items: TxItem[]
  total: number
  page: number
  perPage: number
  totalPages: number
}

interface InvoiceItem {
  id: string
  invoiceId: string
  invoiceNumber: string | null
  status: string | null
  recipientEmail: string | null
  recipientName: string | null
  amount: number | null
  currency: string | null
  dueAmount: number | null
  invoiceDate: string | null
  dueDate: string | null
}

interface InvoicesData {
  items: InvoiceItem[]
  total: number
}

const TX_STATUS_COLORS: Record<string, string> = {
  S: "#10b981",
  P: "#f59e0b",
  F: "#ef4444",
  D: "#dc2626",
  V: "#6b7280",
}

const STATUS_LABEL: Record<string, string> = {
  S: "Success",
  P: "Pending",
  F: "Failed",
  D: "Denied",
  V: "Void",
}

function fmtUsd(amount: number): string {
  return `$${amount.toLocaleString()}`
}

function fmtDate(d: string | null): string {
  if (!d) return "—"
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

function statusBadge(status: string | null) {
  const cls: Record<string, string> = {
    S: "bg-green-100 text-green-700",
    P: "bg-yellow-100 text-yellow-700",
    F: "bg-red-100 text-red-700",
    D: "bg-red-100 text-red-700",
    V: "bg-gray-100 text-gray-700",
    DRAFT: "bg-gray-100 text-gray-700",
    SENT: "bg-blue-100 text-blue-700",
    PAID: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
    REFUNDED: "bg-yellow-100 text-yellow-700",
    UNPAID: "bg-orange-100 text-orange-700",
    PARTIAL_PAYMENT: "bg-yellow-100 text-yellow-700",
  }
  return cls[status ?? ""] ?? "bg-gray-100 text-gray-700"
}

export function PayPalAnalytics() {
  const [loading, setLoading] = useState(true)
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([])
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus[]>([])
  const [topPayers, setTopPayers] = useState<TopPayer[]>([])
  const [transactions, setTransactions] = useState<PaginatedTx | null>(null)
  const [invoices, setInvoices] = useState<InvoicesData | null>(null)
  const [page, setPage] = useState(1)
  const [error, setError] = useState("")

  const loadData = useCallback(async (p: number) => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch(`/api/paypal/analytics?page=${p}`)
      const json = await res.json()
      if (!res.ok || !json.connected) {
        throw new Error(json.error ?? "Not connected")
      }
      setMonthlyRevenue(json.monthlyRevenue)
      setTransactionStatus(json.transactionStatus)
      setTopPayers(json.topPayers)
      setTransactions(json.transactions)
      setInvoices(json.invoices)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load")
    }
    setLoading(false)
  }, [])

  useEffect(() => { loadData(page) }, [loadData, page])

  if (loading && !transactions) {
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

  if (!transactions || monthlyRevenue.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center shadow-sm">
        <p className="text-sm text-gray-400">No PayPal data yet. Connect your account in Settings and sync.</p>
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
              <LineChart data={monthlyRevenue} margin={{ top: 4, right: 12, bottom: 0, left: -8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(m: string) => {
                    const d = new Date(m + "-01")
                    return d.toLocaleDateString("en-US", { month: "short", year: "2-digit" })
                  }}
                />
                <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} width={48} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null
                    const d = new Date(label + "-01")
                    const lbl = d.toLocaleDateString("en-US", { month: "long", year: "numeric" })
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
                <Line type="monotone" dataKey="gross" stroke="#3b82f6" strokeWidth={2} name="Gross Revenue" dot={{ r: 3 }} />
                <Line type="monotone" dataKey="net" stroke="#003087" strokeWidth={2} name="Net Revenue" dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Section B: Transaction Status */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          Transaction Status
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={transactionStatus}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                  >
                    {transactionStatus.map((entry) => (
                      <Cell key={entry.status} fill={TX_STATUS_COLORS[entry.status] ?? "#6b7280"} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null
                      const d = payload[0].payload as TransactionStatus
                      return (
                        <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg text-xs">
                          <p className="font-medium text-gray-900">{STATUS_LABEL[d.status] ?? d.status}</p>
                          <p className="text-gray-500">{d.count} txns ({d.percentage}%)</p>
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
              {transactionStatus.map((s) => (
                <div key={s.status} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: TX_STATUS_COLORS[s.status] ?? "#6b7280" }}
                    />
                    <span className="text-xs text-gray-700">{STATUS_LABEL[s.status] ?? s.status}</span>
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

      {/* Section C: Top Payers */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Top Payers by Volume
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPayers} layout="vertical" margin={{ top: 4, right: 12, bottom: 0, left: 120 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#9ca3af" }} tickLine={false} axisLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} />
                <YAxis type="category" dataKey="email" tick={{ fontSize: 10, fill: "#374151" }} tickLine={false} axisLine={false} width={110} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (!active || !payload?.length) return null
                    const entry = topPayers.find((p) => p.email === label)
                    return (
                      <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg text-xs">
                        <p className="font-medium text-gray-900 mb-1">{entry?.name ?? label}</p>
                        <p className="text-gray-500">{entry?.count} transactions</p>
                        <p className="text-gray-900 font-medium">${(payload[0].value as number).toLocaleString()}</p>
                      </div>
                    )
                  }}
                />
                <Bar dataKey="total" fill="#003087" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Section D: Transactions Table */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
          Transactions
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Payer</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Gross</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fee</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Net</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.items.map((t) => (
                  <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{fmtDate(t.transactionDate)}</td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-900">{t.transactionId.slice(0, 12)}...</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{t.payerName ?? t.payerEmail ?? "—"}</td>
                    <td className="px-4 py-3 text-xs text-right font-medium tabular-nums text-gray-900">${((t.amount ?? 0) / 100).toFixed(2)}</td>
                    <td className="px-4 py-3 text-xs text-right font-medium tabular-nums text-red-500">${((t.feeAmount ?? 0) / 100).toFixed(2)}</td>
                    <td className="px-4 py-3 text-xs text-right font-medium tabular-nums text-gray-900">${((t.netAmount ?? 0) / 100).toFixed(2)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${statusBadge(t.status)}`}>
                        {STATUS_LABEL[t.status ?? ""] ?? t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {transactions.totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 bg-gray-50">
              <p className="text-xs text-gray-500">
                Page {transactions.page} of {transactions.totalPages} ({transactions.total} transactions)
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={transactions.page <= 1}
                  className="rounded-lg border border-gray-300 p-1.5 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(transactions.totalPages, p + 1))}
                  disabled={transactions.page >= transactions.totalPages}
                  className="rounded-lg border border-gray-300 p-1.5 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section E: Invoices Table */}
      <section>
        <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
          Invoices
        </h2>
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice #</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Recipient</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Due</th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {(invoices?.items ?? []).length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-xs text-gray-400">No invoices found</td>
                  </tr>
                ) : (invoices?.items ?? []).map((inv) => (
                  <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-900">{inv.invoiceNumber ?? inv.invoiceId.slice(0, 12)}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{fmtDate(inv.invoiceDate)}</td>
                    <td className="px-4 py-3 text-xs text-gray-700">{inv.recipientName ?? inv.recipientEmail ?? "—"}</td>
                    <td className="px-4 py-3 text-xs text-right font-medium tabular-nums text-gray-900">${((inv.amount ?? 0) / 100).toFixed(2)}</td>
                    <td className="px-4 py-3 text-xs text-right font-medium tabular-nums text-gray-900">${((inv.dueAmount ?? 0) / 100).toFixed(2)}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${statusBadge(inv.status)}`}>
                        {inv.status?.replace("_", " ") ?? "—"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
