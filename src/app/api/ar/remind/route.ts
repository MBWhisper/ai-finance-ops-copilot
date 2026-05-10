import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { Resend } from 'resend'
import { buildReminderEmail } from '@/core/notifications/templates'
import { logger } from '@/lib/logger'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'noreply@ai-finance-ops.com'
const MAX_REMINDERS = 3

export async function POST(req: NextRequest) {
  try {
    // 1. Auth guard
    const supabase = createClient()
    const { data: { user }, error: authErr } = await supabase.auth.getUser()
    if (authErr || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Validate body
    const body = await req.json().catch(() => null)
    const invoiceId = typeof body?.invoiceId === 'string' ? body.invoiceId.trim() : null
    if (!invoiceId) {
      return NextResponse.json({ error: 'Missing invoiceId' }, { status: 400 })
    }

    // 3. Fetch invoice — must belong to this user
    const { data: inv, error: fetchErr } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .eq('user_id', user.id)
      .single()

    if (fetchErr || !inv) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }

    // 4. Business rules
    if (!['overdue', 'sent'].includes(inv.status)) {
      return NextResponse.json(
        { error: `Cannot send reminder for a ${inv.status} invoice.` },
        { status: 422 }
      )
    }
    if (inv.reminders_sent >= MAX_REMINDERS) {
      return NextResponse.json(
        { error: 'Maximum reminder limit (3) already reached for this invoice.' },
        { status: 422 }
      )
    }

    // 5. Build + send email
    const dueDate = new Date(inv.due_date)
    const daysOverdue = Math.max(
      0,
      Math.floor((Date.now() - dueDate.getTime()) / (1000 * 60 * 60 * 24))
    )

    const email = buildReminderEmail({
      customerEmail: inv.customer_email,
      invoiceNumber: inv.id.slice(0, 8).toUpperCase(),
      amountCents: inv.amount_cents,
      dueDate: inv.due_date,
      daysOverdue,
    })

    const { error: sendErr } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email.to,
      subject: email.subject,
      html: email.html,
    })

    if (sendErr) {
      logger.error({ invoiceId, sendErr }, 'Resend rejected manual AR reminder')
      return NextResponse.json({ error: 'Email delivery failed. Try again.' }, { status: 502 })
    }

    // 6. Increment counter
    await supabase
      .from('invoices')
      .update({ reminders_sent: inv.reminders_sent + 1 })
      .eq('id', invoiceId)

    logger.info({ invoiceId, to: email.to, daysOverdue }, 'Manual AR reminder sent')

    return NextResponse.json({
      ok: true,
      customerEmail: inv.customer_email,
      remindersSent: inv.reminders_sent + 1,
    })
  } catch (err) {
    logger.error({ err }, 'Unexpected error in POST /api/ar/remind')
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
