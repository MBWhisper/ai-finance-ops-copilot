'use client'

import { useState, useEffect, useTransition } from 'react'
import { createClient } from '@/lib/supabase/browser'
import { InvoiceStatusBadge } from '@/components/ar/invoice-status-badge'
import { formatCurrency, formatDate } from '@/lib/utils'
import Link from 'next/link'

interface Invoice {
  id: string
  customer_email: string
  amount_cents: number
  due_date: string
  status: string
  stripe_invoice_id: string | null
  reminders_sent: number
  created_at: string
}

const MAX_REMINDERS = 3

export default function ARPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sendingId, setSendingId] = useState<string | null>(null)
  const [toastMsg, setToastMsg] = useState<{ text: string; ok: boolean } | null>(null)
  const [, startTransition] = useTransition()

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const supabase = createClient()
        const { data: { user }, error: authErr } = await supabase.auth.getUser()
        if (authErr || !user) { window.location.href = '/login'; return }

        const { data, error: dbErr } = await supabase
          .from('invoices')
          .select('*')
          .eq('user_id', user.id)
          .order('due_date', { ascending: false })

        if (dbErr) throw new Error(dbErr.message)
        if (!cancelled) setInvoices(data ?? [])
      } catch (e: any) {
        if (!cancelled) setError(e?.message ?? 'Failed to load invoices.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  function showToast(text: string, ok: boolean) {
    setToastMsg({ text, ok })
    setTimeout(() => setToastMsg(null), 4000)
  }

  async function handleSendReminder(invoiceId: string) {
    setSendingId(invoiceId)
    try {
      const res = await fetch(`/api/ar/remind`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceId }),
      })

      const json = await res.json()

      if (!res.ok) {
        showToast(json?.error ?? 'Failed to send reminder.', false)
        return
      }

      // Optimistically increment reminders_sent in local state
      startTransition(() => {
        setInvoices((prev) =>
          prev.map((inv) =>
            inv.id === invoiceId
              ? { ...inv, reminders_sent: inv.reminders_sent + 1 }
              : inv
          )
        )
      })
      showToast(`Reminder sent to ${json.customerEmail ?? 'customer'}.`, true)
    } catch {
      showToast('Network error. Please try again.', false)
    } finally {
      setSendingId(null)
    }
  }

  const stats = {
    total: invoices.length,
    paid: invoices.filter((i) => i.status === 'paid').length,
    overdue: invoices.filter((i) => i.status === 'overdue').length,
    sent: invoices.filter((i) => i.status === 'sent').length,
    overdueAmount: invoices
      .filter((i) => i.status === 'overdue')
      .reduce((sum, i) => sum + i.amount_cents, 0),
  }

  const canRemind = (inv: Invoice) =>
    (inv.status === 'overdue' || inv.status === 'sent') &&
    inv.reminders_sent < MAX_REMINDERS

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium shadow-lg transition-all ${
            toastMsg.ok
              ? 'bg-emerald-600 text-white'
              : 'bg-red-600 text-white'
          }`}
        >
          {toastMsg.ok ? (
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
          {toastMsg.text}
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">AR / Invoices</h1>
        <p className="mt-1 text-gray-500">Manage your accounts receivable and overdue invoices.</p>
      </div>

      {/* KPI bar */}
      <div className="grid gap-4 md:grid-cols-5">
        {[
          { label: 'Total', value: stats.total, color: 'text-gray-900' },
          { label: 'Paid', value: stats.paid, color: 'text-green-600' },
          { label: 'Sent', value: stats.sent, color: 'text-amber-600' },
          { label: 'Overdue', value: stats.overdue, color: 'text-red-600' },
          { label: 'Outstanding', value: formatCurrency(stats.overdueAmount), color: 'text-gray-900' },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className={`mt-1 text-2xl font-bold tabular-nums ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-700">All Invoices</h2>
          {stats.overdue > 0 && (
            <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-600">
              {stats.overdue} overdue
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-3 p-12 text-center">
            <svg className="h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <p className="text-sm font-medium text-red-600">{error}</p>
          </div>
        ) : invoices.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-12 text-center">
            <svg className="h-10 w-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <h3 className="text-base font-semibold text-gray-900">No invoices found</h3>
            <p className="max-w-xs text-sm text-gray-500">
              Connect Stripe in Settings to automatically import your invoices.
            </p>
            <Link
              href="/dashboard/settings"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Go to Settings
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-3 text-left font-medium text-gray-500">Customer</th>
                  <th className="px-6 py-3 text-right font-medium text-gray-500">Amount</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">Due Date</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">Status</th>
                  <th className="px-6 py-3 text-center font-medium text-gray-500">Reminders</th>
                  <th className="px-6 py-3 text-right font-medium text-gray-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900">{inv.customer_email}</td>
                    <td className="px-6 py-4 text-right font-medium tabular-nums text-gray-900">
                      {formatCurrency(inv.amount_cents)}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{formatDate(new Date(inv.due_date))}</td>
                    <td className="px-6 py-4">
                      <InvoiceStatusBadge status={inv.status} />
                    </td>
                    <td className="px-6 py-4 text-center tabular-nums text-gray-500">
                      {inv.reminders_sent} / {MAX_REMINDERS}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {canRemind(inv) ? (
                        <button
                          onClick={() => handleSendReminder(inv.id)}
                          disabled={sendingId === inv.id}
                          aria-label={`Send reminder to ${inv.customer_email}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {sendingId === inv.id ? (
                            <>
                              <span className="h-3 w-3 animate-spin rounded-full border-2 border-amber-600 border-t-transparent" />
                              Sending…
                            </>
                          ) : (
                            <>
                              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                              </svg>
                              Send Reminder
                            </>
                          )}
                        </button>
                      ) : inv.reminders_sent >= MAX_REMINDERS ? (
                        <span className="text-xs text-gray-400">Max reached</span>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
