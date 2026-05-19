import { createClient } from '@/lib/supabase/browser'
import type { Invoice } from './invoice-types'

export interface DbInvoiceRow {
  id: string
  user_id: string
  customer_email: string
  amount_cents: number
  due_date: string
  status: 'draft' | 'sent' | 'paid' | 'overdue'
  stripe_invoice_id: string | null
  reminders_sent: number
  created_at: string
}

export function mapDbInvoiceToFrontend(row: DbInvoiceRow): Invoice {
  return {
    id: row.id,
    customerName: row.customer_email.split('@')[0] || row.customer_email,
    customerEmail: row.customer_email,
    amountCents: row.amount_cents,
    currency: 'USD',
    issueDate: row.created_at?.split('T')[0] ?? row.due_date,
    dueDate: row.due_date,
    status: row.status,
    remindersSent: row.reminders_sent,
    reminders: [],
    lineItems: [{
      description: 'Invoice',
      quantity: 1,
      unitPriceCents: row.amount_cents,
      totalCents: row.amount_cents,
    }],
    notes: '',
    stripeInvoiceId: row.stripe_invoice_id,
    paymentLink: null,
    paidAt: null,
    createdAt: row.created_at,
    updatedAt: row.created_at,
  }
}

export async function fetchInvoices(userId: string): Promise<Invoice[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('user_id', userId)
    .order('due_date', { ascending: false })

  if (error) throw error
  return (data ?? []).map(mapDbInvoiceToFrontend)
}

export async function updateInvoiceStatus(invoiceId: string, status: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('invoices')
    .update({ status } as any)
    .eq('id', invoiceId)

  if (error) throw error
}

export async function incrementRemindersSent(invoiceId: string): Promise<void> {
  const supabase = createClient()
  const { data: row } = await supabase
    .from('invoices')
    .select('reminders_sent')
    .eq('id', invoiceId)
    .single()

  if (!row) throw new Error('Invoice not found')

  const { error } = await supabase
    .from('invoices')
    .update({ reminders_sent: (row as any).reminders_sent + 1 } as any)
    .eq('id', invoiceId)

  if (error) throw error
}

export async function createInvoice(userId: string, data: {
  customerEmail: string
  amountCents: number
  dueDate: string
}): Promise<Invoice | null> {
  const supabase = createClient()
  const { data: row, error } = await supabase
    .from('invoices')
    .insert({
      user_id: userId,
      customer_email: data.customerEmail,
      amount_cents: data.amountCents,
      due_date: data.dueDate,
      status: 'draft',
      reminders_sent: 0,
    })
    .select()
    .single()

  if (error) throw error
  return row ? mapDbInvoiceToFrontend(row as any) : null
}
