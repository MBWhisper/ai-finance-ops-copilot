'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { createClient } from '@/lib/supabase/browser'
import { PlanGate } from '@/components/plan-gate'
import { InvoiceStatusBadge } from '@/components/ar/invoice-status-badge'
import { ARActionBar } from '@/components/ar/ar-action-bar'
import { ARAgingCard } from '@/components/ar/ar-aging-card'
import { InvoiceDetailDrawer } from '@/components/ar/invoice-detail-drawer'
import { CreateInvoiceModal } from '@/components/ar/create-invoice-modal'
import { formatCents, computeInvoiceStats, computeAging, computeOverdueStatus, filterInvoices, sortInvoices, canSendReminder } from '@/lib/invoice-utils'
import { fetchInvoices, updateInvoiceStatus, incrementRemindersSent } from '@/lib/invoices-live'
import type { Invoice, InvoiceStatus } from '@/lib/invoice-types'
import type { PlanId } from '@/lib/subscription'

export default function ARPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [plan, setPlan] = useState<PlanId>('free')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | 'all'>('all')
  const [sortKey, setSortKey] = useState<keyof Invoice>('dueDate')
  const [sortDesc, setSortDesc] = useState(true)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  // Load data
  const loadData = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }

      const { data: subRows } = await supabase
        .from('subscriptions')
        .select('plan, status')
        .eq('user_id', user.id)
        .in('status', ['active', 'on_trial'])
        .order('created_at', { ascending: false })
        .limit(1)
      const sub = subRows?.[0] ?? null
      setPlan((sub?.plan as PlanId) ?? 'free')

      const liveInvoices = await fetchInvoices(user.id)
      setInvoices(liveInvoices)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load invoices')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Derived data
  const stats = useMemo(() => computeInvoiceStats(invoices), [invoices])
  const aging = useMemo(() => computeAging(invoices), [invoices])

  const filtered = useMemo(() => {
    const f = filterInvoices(invoices, search, statusFilter)
    return sortInvoices(f, sortKey, sortDesc)
  }, [invoices, search, statusFilter, sortKey, sortDesc])

  // Actions
  function handleSort(key: keyof Invoice) {
    if (sortKey === key) setSortDesc(d => !d)
    else { setSortKey(key); setSortDesc(false) }
  }

  const handleInvoiceCreated = useCallback(async () => {
    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const liveInvoices = await fetchInvoices(user.id)
      setInvoices(liveInvoices)
    } catch {
      // Refresh failed silently — user can reload manually
    }
  }, [])

  function handleView(invoice: Invoice) {
    window.open(`/api/invoices/${invoice.id}/pdf`, '_blank')
  }

  async function handleMarkPaid(id: string) {
    try {
      await updateInvoiceStatus(id, 'paid')
      setInvoices(prev => prev.map(i =>
        i.id === id ? { ...i, status: 'paid' as const, paidAt: new Date().toISOString() } : i
      ))
      showToast('Marked as paid')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed')
    }
    setDrawerOpen(false)
  }

  async function handleSendReminder(id: string) {
    try {
      await incrementRemindersSent(id)
      setInvoices(prev => prev.map(i => {
        if (i.id !== id) return i
        const sentAt = new Date().toISOString()
        const types = ['upcoming', 'first_overdue', 'second_overdue', 'escalation'] as const
        const nextType = types[Math.min(i.remindersSent, 3)]
        return {
          ...i,
          remindersSent: i.remindersSent + 1,
          reminders: [...i.reminders, { id: `rem-${Date.now()}`, type: nextType, sentAt, method: 'email' as const }],
          status: i.status === 'overdue' ? 'overdue' : i.status,
        }
      }))
      setSelectedInvoice(prev => prev?.id === id ? { ...prev!, remindersSent: prev!.remindersSent + 1 } : prev)
      showToast('Reminder sent')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed')
    }
  }

  function handleEdit(id: string) {
    setDrawerOpen(false)
    // Edit support: open modal with pre-filled values could be added here
  }

  function handleCreateInvoice() {
    setModalOpen(true)
  }

  // Sort arrow helper
  function sortArrow(key: keyof Invoice): string {
    if (sortKey !== key) return ''
    return sortDesc ? ' ↓' : ' ↑'
  }

  // Aging bucket label for each invoice
  function agingBucket(invoice: Invoice): string {
    const s = computeOverdueStatus(invoice)
    if (s === 'paid' || s === 'draft') return '—'
    const due = new Date(invoice.dueDate)
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    const diff = Math.floor((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24))
    if (diff <= 0) return 'Current'
    if (diff <= 30) return '1–30d'
    if (diff <= 60) return '31–60d'
    if (diff <= 90) return '61–90d'
    return '90d+'
  }

  function agingColor(invoice: Invoice): string {
    const s = computeOverdueStatus(invoice)
    if (s === 'paid' || s === 'draft') return 'text-gray-400'
    const due = new Date(invoice.dueDate)
    const now = new Date()
    now.setHours(0, 0, 0, 0)
    const diff = Math.floor((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24))
    if (diff <= 0) return 'text-green-600'
    if (diff <= 30) return 'text-yellow-600'
    if (diff <= 60) return 'text-orange-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AR / Invoices</h1>
        <p className="text-sm text-gray-500 mt-1">Manage accounts receivable and invoice workflow.</p>
      </div>

      <PlanGate requiredPlan="starter" currentPlan={plan} feature="Invoice tracking">

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'Total', value: String(stats.total), color: 'text-gray-900' },
            { label: 'Paid', value: String(stats.paid), color: 'text-green-600' },
            { label: 'Sent', value: String(stats.sent), color: 'text-blue-600' },
            { label: 'Overdue', value: String(stats.overdue), color: 'text-red-600' },
            { label: 'Outstanding', value: formatCents(stats.outstandingAmountCents), color: 'text-gray-900' },
            { label: 'DSO', value: `${stats.dso}d`, color: 'text-gray-600' },
          ].map(card => (
            <div key={card.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium text-gray-500">{card.label}</p>
              <p className={`mt-1 text-lg font-bold ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Aging section */}
        <ARAgingCard buckets={aging} />

        {/* Action bar */}
        <ARActionBar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onCreateInvoice={handleCreateInvoice}
          invoiceCount={invoices.length}
          filteredCount={filtered.length}
        />

        {/* Invoice table */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-sm text-red-500">{error}</p>
              <p className="text-xs text-gray-400 mt-1">Try reloading or check your connection.</p>
            </div>
          ) : invoices.length === 0 ? (
            <div className="p-6 sm:p-12 text-center">
              <svg className="mx-auto h-10 w-10 text-gray-300 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
              <p className="text-sm font-medium text-gray-900">No invoices yet</p>
              <p className="text-xs text-gray-500 mt-1">Create your first invoice to get started.</p>
              <button onClick={handleCreateInvoice} className="mt-4 inline-flex items-center gap-1.5 h-10 min-w-[44px] px-4 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
                Create Invoice
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-6 sm:p-12 text-center">
              <svg className="mx-auto h-10 w-10 text-gray-300 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
              <p className="text-sm font-medium text-gray-900">No matching invoices</p>
              <p className="text-xs text-gray-500 mt-1">Try a different search or filter.</p>
              <button onClick={() => { setSearch(''); setStatusFilter('all') }} className="mt-3 text-xs text-blue-600 hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="-mx-3 sm:-mx-0 overflow-x-auto">
              <div className="min-w-[650px]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      {[
                        { key: 'id', label: 'Invoice #' },
                        { key: 'customerName', label: 'Customer' },
                        { key: 'amountCents', label: 'Amount' },
                        { key: 'issueDate', label: 'Issue Date' },
                        { key: 'dueDate', label: 'Due Date' },
                        { key: 'status', label: 'Status' },
                      ].map(col => (
                        <th
                          key={col.key}
                          onClick={() => handleSort(col.key as keyof Invoice)}
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700 select-none whitespace-nowrap"
                        >
                          {col.label}{sortArrow(col.key as keyof Invoice)}
                        </th>
                      ))}
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Reminders</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Aging</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map(inv => {
                      const effStatus = computeOverdueStatus(inv)
                      const canRemind = canSendReminder(inv)
                      return (
                        <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{inv.id}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div>
                              <p className="text-gray-900">{inv.customerName}</p>
                              <p className="text-xs text-gray-400">{inv.customerEmail}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{formatCents(inv.amountCents)}</td>
                          <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                            {new Date(inv.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={effStatus === 'overdue' ? 'text-red-600 font-medium' : 'text-gray-600'}>
                              {new Date(inv.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <InvoiceStatusBadge status={effStatus} />
                          </td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                            <span className="text-xs">{inv.remindersSent}/3</span>
                            {inv.reminders.length > 0 && (
                              <span className="ml-1 text-[10px] text-gray-400">
                                (last {new Date(inv.reminders[inv.reminders.length - 1].sentAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })})
                              </span>
                            )}
                          </td>
                          <td className={`px-4 py-3 whitespace-nowrap text-xs font-medium ${agingColor(inv)}`}>
                            {agingBucket(inv)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-1 min-w-max">
                              <button
                                onClick={() => handleView(inv)}
                                className="inline-flex items-center gap-1 h-8 min-w-[44px] px-3 rounded-md text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap"
                                aria-label="View invoice"
                              >
                                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                                View
                              </button>
                              {effStatus !== 'paid' && effStatus !== 'draft' && (
                                <button
                                  onClick={() => handleMarkPaid(inv.id)}
                                  className="inline-flex items-center gap-1 h-8 min-w-[44px] px-3 rounded-md text-xs font-medium text-green-700 hover:bg-green-50 transition-colors whitespace-nowrap"
                                  aria-label="Mark as paid"
                                >
                                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                  Mark Paid
                                </button>
                              )}
                              {canRemind && (
                                <button
                                  onClick={() => handleSendReminder(inv.id)}
                                  className="inline-flex items-center gap-1 h-8 min-w-[44px] px-3 rounded-md text-xs font-medium text-amber-700 hover:bg-amber-50 transition-colors whitespace-nowrap"
                                  aria-label="Send reminder"
                                >
                                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                                  Remind
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </PlanGate>

      {/* Detail drawer */}
      <InvoiceDetailDrawer
        invoice={selectedInvoice}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onMarkPaid={handleMarkPaid}
        onSendReminder={handleSendReminder}
        onEdit={handleEdit}
      />

      {/* Create invoice modal */}
      <CreateInvoiceModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={handleInvoiceCreated}
      />

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-20 sm:bottom-6 right-6 z-[60] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg border text-sm font-medium transition-all ${
          toast.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {toast.type === 'success' ? (
            <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          ) : (
            <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          )}
          {toast.message}
        </div>
      )}
    </div>
  )
}
