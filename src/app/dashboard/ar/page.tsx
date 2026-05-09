'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/browser'
import { InvoiceStatusBadge } from '@/components/ar/invoice-status-badge'
import { formatCurrency, formatDate } from '@/lib/utils'

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

export default function ARPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) { window.location.href = '/login'; return }

        const { data, error: err } = await supabase
          .from('invoices')
          .select('*')
          .eq('user_id', user.id)
          .order('due_date', { ascending: false })

        if (err) throw err
        setInvoices(data ?? [])
      } catch (e: any) {
        setError(e.message)
      }
      setLoading(false)
    }
    load()
  }, [])

  const stats = {
    total: invoices.length,
    paid: invoices.filter((i) => i.status === 'paid').length,
    overdue: invoices.filter((i) => i.status === 'overdue').length,
    sent: invoices.filter((i) => i.status === 'sent').length,
    draft: invoices.filter((i) => i.status === 'draft').length,
    totalAmount: invoices.reduce((sum, i) => sum + i.amount_cents, 0),
    overdueAmount: invoices.filter((i) => i.status === 'overdue').reduce((sum, i) => sum + i.amount_cents, 0),
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">AR / Invoices</h1>
        <p className="mt-1 text-gray-500">Manage your accounts receivable and invoices.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Paid</p>
          <p className="mt-1 text-2xl font-bold text-green-600">{stats.paid}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Sent</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{stats.sent}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Overdue</p>
          <p className="mt-1 text-2xl font-bold text-red-600">{stats.overdue}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Outstanding</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{formatCurrency(stats.overdueAmount)}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-sm font-semibold text-gray-700">All Invoices</h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          </div>
        ) : error ? (
          <div className="p-12 text-center text-sm text-red-500">{error}</div>
        ) : invoices.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-sm text-gray-500">No invoices found. Connect Stripe to import automatically.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-3 text-left font-medium text-gray-500">Customer</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">Amount</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">Due Date</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">Status</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">Reminders</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-900">{inv.customer_email}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">{formatCurrency(inv.amount_cents)}</td>
                    <td className="px-6 py-4 text-gray-600">{formatDate(new Date(inv.due_date))}</td>
                    <td className="px-6 py-4">
                      <InvoiceStatusBadge status={inv.status} />
                    </td>
                    <td className="px-6 py-4 text-gray-500">{inv.reminders_sent}/3</td>
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
