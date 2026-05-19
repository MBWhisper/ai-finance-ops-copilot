import type { AgingBucket, Invoice, InvoiceStats, InvoiceStatus, ReminderType } from './invoice-types'

export function computeOverdueStatus(invoice: Invoice): InvoiceStatus {
  if (invoice.status === 'paid' || invoice.status === 'draft') return invoice.status
  const due = new Date(invoice.dueDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (due < today) return 'overdue'
  return invoice.status
}

export function computeInvoiceStats(invoices: Invoice[]): InvoiceStats {
  const withOverdue = invoices.map(i => ({ ...i, status: computeOverdueStatus(i) }))
  const total = withOverdue.length
  const paid = withOverdue.filter(i => i.status === 'paid')
  const overdue = withOverdue.filter(i => i.status === 'overdue')
  const sent = withOverdue.filter(i => i.status === 'sent')
  const draft = withOverdue.filter(i => i.status === 'draft')
  const viewed = withOverdue.filter(i => i.status === 'viewed')
  const partial = withOverdue.filter(i => i.status === 'partial')

  const totalAmountCents = withOverdue.reduce((s, i) => s + i.amountCents, 0)
  const paidAmountCents = paid.reduce((s, i) => s + i.amountCents, 0)
  const overdueAmountCents = overdue.reduce((s, i) => s + i.amountCents, 0)
  const outstandingAmountCents = withOverdue
    .filter(i => i.status !== 'paid' && i.status !== 'draft')
    .reduce((s, i) => s + i.amountCents, 0)

  const avgPaidCents = paid.length > 0 ? paidAmountCents / paid.length : 0
  const dailyRevenueCents = avgPaidCents > 0 ? paidAmountCents / 30 : 1
  const dso = dailyRevenueCents > 0 ? Math.round(outstandingAmountCents / dailyRevenueCents) : 0
  const collectionRate = totalAmountCents > 0 ? Math.round((paidAmountCents / totalAmountCents) * 100) : 0

  return {
    total, paid: paid.length, sent: sent.length, draft: draft.length,
    viewed: viewed.length, partial: partial.length, overdue: overdue.length,
    totalAmountCents, paidAmountCents, overdueAmountCents, outstandingAmountCents,
    dso, collectionRate,
  }
}

export function computeAging(invoices: Invoice[]): AgingBucket[] {
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const buckets: { label: string; minDays: number; maxDays: number }[] = [
    { label: 'Current', minDays: -Infinity, maxDays: 0 },
    { label: '1–30 days', minDays: 1, maxDays: 30 },
    { label: '31–60 days', minDays: 31, maxDays: 60 },
    { label: '61–90 days', minDays: 61, maxDays: 90 },
    { label: '90+ days', minDays: 91, maxDays: Infinity },
  ]

  const unpaid = invoices.filter(i => {
    const s = computeOverdueStatus(i)
    return s !== 'paid' && s !== 'draft'
  })

  return buckets.map(b => {
    const matched = unpaid.filter(i => {
      const due = new Date(i.dueDate)
      const diffDays = Math.floor((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24))
      return diffDays >= b.minDays && diffDays <= b.maxDays
    })
    return {
      label: b.label,
      minDays: b.minDays,
      maxDays: b.maxDays,
      count: matched.length,
      amountCents: matched.reduce((s, i) => s + i.amountCents, 0),
    }
  })
}

export function getNextReminderType(remindersSent: number): ReminderType {
  if (remindersSent === 0) return 'upcoming'
  if (remindersSent === 1) return 'first_overdue'
  if (remindersSent === 2) return 'second_overdue'
  return 'escalation'
}

export function getReminderLabel(type: ReminderType): string {
  const map: Record<ReminderType, string> = {
    upcoming: 'Upcoming',
    first_overdue: '1st Overdue',
    second_overdue: '2nd Overdue',
    escalation: 'Escalation',
  }
  return map[type]
}

export function canSendReminder(invoice: Invoice): boolean {
  const s = computeOverdueStatus(invoice)
  return s !== 'paid' && s !== 'draft' && invoice.remindersSent < 4
}

export function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

export function filterInvoices(
  invoices: Invoice[],
  search: string,
  statusFilter: InvoiceStatus | 'all',
): Invoice[] {
  return invoices.filter(inv => {
    const s = search.toLowerCase()
    if (s) {
      const match =
        inv.customerName.toLowerCase().includes(s) ||
        inv.customerEmail.toLowerCase().includes(s) ||
        inv.id.toLowerCase().includes(s)
      if (!match) return false
    }
    if (statusFilter !== 'all') {
      const effectiveStatus = computeOverdueStatus(inv)
      if (effectiveStatus !== statusFilter) return false
    }
    return true
  })
}

export function sortInvoices(invoices: Invoice[], key: keyof Invoice, desc = false): Invoice[] {
  return [...invoices].sort((a, b) => {
    const va = a[key] ?? ''
    const vb = b[key] ?? ''
    if (typeof va === 'string' && typeof vb === 'string') {
      return desc ? vb.localeCompare(va) : va.localeCompare(vb)
    }
    if (typeof va === 'number' && typeof vb === 'number') {
      return desc ? vb - va : va - vb
    }
    return 0
  })
}
