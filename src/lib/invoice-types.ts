export type InvoiceStatus = 'draft' | 'sent' | 'viewed' | 'partial' | 'paid' | 'overdue'

export type ReminderType = 'upcoming' | 'first_overdue' | 'second_overdue' | 'escalation'

export interface ReminderRecord {
  id: string
  type: ReminderType
  sentAt: string
  method: 'email' | 'system'
}

export interface InvoiceLineItem {
  description: string
  quantity: number
  unitPriceCents: number
  totalCents: number
}

export interface Invoice {
  id: string
  customerName: string
  customerEmail: string
  amountCents: number
  currency: string
  issueDate: string
  dueDate: string
  status: InvoiceStatus
  remindersSent: number
  reminders: ReminderRecord[]
  lineItems: InvoiceLineItem[]
  notes: string
  stripeInvoiceId: string | null
  paymentLink: string | null
  paidAt: string | null
  createdAt: string
  updatedAt: string
}

export interface InvoiceStats {
  total: number
  paid: number
  sent: number
  draft: number
  viewed: number
  partial: number
  overdue: number
  totalAmountCents: number
  paidAmountCents: number
  overdueAmountCents: number
  outstandingAmountCents: number
  dso: number
  collectionRate: number
}

export interface AgingBucket {
  label: string
  minDays: number
  maxDays: number
  count: number
  amountCents: number
}

export interface ARSummary {
  stats: InvoiceStats
  aging: AgingBucket[]
  totalAgingAmountCents: number
}
