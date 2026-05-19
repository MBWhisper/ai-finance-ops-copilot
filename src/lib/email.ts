import { resend } from './resend'
import { logger } from './logger'

const FROM = process.env.RESEND_FROM_EMAIL ?? 'noreply@ai-finance-ops.com'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://www.aifinanceops.app'

interface EmailUser {
  email: string
  name?: string | null
}

export async function sendInvoicePaidEmail(invoice: {
  customerEmail: string
  customerName?: string
  amountCents: number
  invoiceNumber: string
}) {
  const amount = (invoice.amountCents / 100).toFixed(2)
  const name = invoice.customerName ?? 'Valued Customer'

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: invoice.customerEmail,
      subject: `Invoice #${invoice.invoiceNumber} paid — $${amount}`,
      html: `<!DOCTYPE html>
<html><body style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px">
<div style="font-size:32px;margin-bottom:16px">✅</div>
<h1 style="color:#111;font-size:24px;margin-bottom:8px">Payment received</h1>
<p style="color:#555;line-height:1.6;margin-bottom:24px">Hi ${name},<br><br>We&rsquo;ve received your payment of <strong>$${amount}</strong> for Invoice #${invoice.invoiceNumber}. Thank you!</p>
<a href="${APP_URL}/dashboard/ar" style="display:inline-block;background:#10b981;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">View Invoice</a>
<hr style="border:none;border-top:1px solid #eee;margin:24px 0">
<p style="color:#999;font-size:12px">AI Finance Ops &mdash; Automated billing notification</p>
</body></html>`,
    })

    if (error) {
      logger.error({ error, invoiceId: invoice.invoiceNumber }, 'Failed to send invoice paid email')
      return false
    }
    logger.info({ invoiceId: invoice.invoiceNumber }, 'Invoice paid email sent')
    return true
  } catch (err) {
    logger.error({ err, invoiceId: invoice.invoiceNumber }, 'Exception sending invoice paid email')
    return false
  }
}

export async function sendOverdueEmail(invoice: {
  customerEmail: string
  customerName?: string
  amountCents: number
  invoiceNumber: string
  dueDate: string
  daysOverdue: number
}) {
  const amount = (invoice.amountCents / 100).toFixed(2)
  const name = invoice.customerName ?? 'Valued Customer'

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: invoice.customerEmail,
      subject: `Overdue: Invoice #${invoice.invoiceNumber} (${invoice.daysOverdue} days)`,
      html: `<!DOCTYPE html>
<html><body style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px">
<div style="font-size:32px;margin-bottom:16px">⚠️</div>
<h1 style="color:#111;font-size:24px;margin-bottom:8px">Invoice overdue</h1>
<p style="color:#555;line-height:1.6;margin-bottom:24px">Hi ${name},<br><br>Invoice #${invoice.invoiceNumber} for <strong>$${amount}</strong> was due on <strong>${invoice.dueDate}</strong> and is now <strong>${invoice.daysOverdue} days overdue</strong>. Please pay at your earliest convenience.</p>
<a href="${APP_URL}/dashboard/ar" style="display:inline-block;background:#dc2626;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">Pay Now</a>
<hr style="border:none;border-top:1px solid #eee;margin:24px 0">
<p style="color:#999;font-size:12px">AI Finance Ops &mdash; Automated billing notification</p>
</body></html>`,
    })

    if (error) {
      logger.error({ error, invoiceId: invoice.invoiceNumber }, 'Failed to send overdue email')
      return false
    }
    logger.info({ invoiceId: invoice.invoiceNumber }, 'Overdue email sent')
    return true
  } catch (err) {
    logger.error({ err, invoiceId: invoice.invoiceNumber }, 'Exception sending overdue email')
    return false
  }
}

export async function sendSubscriptionEventEmail(user: EmailUser, event: string) {
  const name = user.name ?? 'there'

  const subjectMap: Record<string, string> = {
    trial_ending: 'Your trial ends in 2 days',
    trial_expired: 'Your trial has ended',
    subscription_active: 'Welcome to AI Finance Ops Pro',
    subscription_canceled: 'We&rsquo;re sorry to see you go',
    payment_failed: 'Payment failed — update your billing info',
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: user.email,
      subject: subjectMap[event] ?? `Update: ${event}`,
      html: `<!DOCTYPE html>
<html><body style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px">
<h1 style="color:#111;font-size:24px;margin-bottom:8px">${subjectMap[event] ?? 'Subscription update'}</h1>
<p style="color:#555;line-height:1.6;margin-bottom:24px">Hi ${name},<br><br>Your subscription status has changed: <strong>${event}</strong>.</p>
<a href="${APP_URL}/dashboard/settings/billing" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">Manage Billing</a>
<hr style="border:none;border-top:1px solid #eee;margin:24px 0">
<p style="color:#999;font-size:12px">AI Finance Ops &mdash; Automated billing notification</p>
</body></html>`,
    })

    if (error) {
      logger.error({ error, event, userEmail: user.email }, 'Failed to send subscription event email')
      return false
    }
    logger.info({ event, userEmail: user.email }, 'Subscription event email sent')
    return true
  } catch (err) {
    logger.error({ err, event, userEmail: user.email }, 'Exception sending subscription event email')
    return false
  }
}
