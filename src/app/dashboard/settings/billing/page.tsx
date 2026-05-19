import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getUserSubscription, PLAN_FEATURES, type PlanId } from '@/lib/subscription'
import { getSubscription } from '@/db/queries/subscriptions'
import { getCustomerPortalUrl } from '@/app/actions/billing'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, ExternalLink, AlertTriangle, Download } from 'lucide-react'
import { db } from '@/db'
import { invoices } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'

const PLAN_NAMES: Record<PlanId, string> = {
  free: 'Free',
  starter: 'Starter',
  pro: 'Pro',
  growth: 'Growth',
}

const PLAN_PRICES: Record<PlanId, number> = {
  free: 0,
  starter: 29,
  pro: 79,
  growth: 199,
}

const PLAN_COLORS: Record<PlanId, 'default' | 'success' | 'warning' | 'destructive'> = {
  free: 'default',
  starter: 'default',
  pro: 'success',
  growth: 'warning',
}

const STATUS_BADGE: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'destructive' }> = {
  active: { label: 'Active', variant: 'success' },
  on_trial: { label: 'Trial', variant: 'default' },
  cancelled: { label: 'Canceled', variant: 'destructive' },
  expired: { label: 'Expired', variant: 'destructive' },
  past_due: { label: 'Past Due', variant: 'warning' },
  paused: { label: 'Paused', variant: 'warning' },
}

const PLAN_FEATURE_LABELS: Record<string, string> = {
  stripeConnections: 'Stripe connections',
  forecastDays: 'Forecast days',
  aiCopilot: 'AI Copilot',
  csvExport: 'CSV export',
  teamMembers: 'Team members',
}

const CHECKOUT_URLS: Record<string, string> = {
  starter: 'https://ai-finance-ops.lemonsqueezy.com/checkout/buy/a6fac794-fedd-46cb-a998-913316b62e89',
  pro: 'https://ai-finance-ops.lemonsqueezy.com/checkout/buy/8e49a214-837d-40cf-86a9-121dc483b335',
  growth: 'https://ai-finance-ops.lemonsqueezy.com/checkout/buy/ba80d7d9-f9ab-4d09-99b1-841c81c59697',
}

function formatFeatureValue(key: string, value: unknown): string {
  if (typeof value === 'boolean') return value ? '✅' : '—'
  if (value === Infinity) return 'Unlimited'
  return String(value)
}

function formatCents(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(cents / 100)
}

export default async function BillingPage() {
  const planLimits = PLAN_FEATURES
  const planOrder: PlanId[] = ['starter', 'pro', 'growth']

  let subscription: Awaited<ReturnType<typeof getUserSubscription>>
  let dbSubscription: any
  let user: any
  let customerPortalUrl: string | null = null
  let invoiceRows: any[] = []

  try {
    const supabase = createClient()
    const { data: { user: u } } = await supabase.auth.getUser()
    if (!u) redirect('/login')
    user = u

    const [subResult, dbSubResult] = await Promise.all([
      getUserSubscription(user.id),
      getSubscription(user.id),
    ])

    subscription = subResult as any
    dbSubscription = dbSubResult

    if (dbSubscription?.lemonSqueezyCustomerPortalUrl) {
      customerPortalUrl = dbSubscription.lemonSqueezyCustomerPortalUrl
    } else if (dbSubscription?.lemonSqueezySubscriptionId) {
      customerPortalUrl = await getCustomerPortalUrl(dbSubscription.lemonSqueezySubscriptionId)
    }

    invoiceRows = await db.query.invoices.findMany({
      where: eq(invoices.userId, user.id),
      orderBy: (i) => [desc(i.createdAt)],
      limit: 20,
    })
  } catch (e: any) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your subscription and billing information.</p>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Failed to load billing data</h3>
          <p className="text-sm text-gray-500 mb-4">{e.message ?? 'Something went wrong'}</p>
          <a href="/dashboard/settings/billing" className="inline-flex items-center px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Reload
          </a>
        </div>
      </div>
    )
  }

  const currentPlanName = PLAN_NAMES[subscription.plan] ?? 'Free'
  const currentPrice = PLAN_PRICES[subscription.plan] ?? 0
  const statusInfo = STATUS_BADGE[subscription.status ?? ''] ?? { label: subscription.status ?? 'Unknown', variant: 'default' as const }

  const upgradePlans = subscription.isFree
    ? planOrder
    : planOrder.filter((p) => p !== subscription.plan)

  const totalInvoices = invoiceRows.length
  const paidInvoices = invoiceRows.filter((r: any) => r.status === 'paid').length
  const overdueInvoices = invoiceRows.filter((r: any) => r.status === 'overdue').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-sm text-gray-500 mt-0.5">Manage your subscription and billing information.</p>
      </div>

      {/* Current Plan Card */}
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>
            You are currently on the <strong>{currentPlanName}</strong> plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge variant={PLAN_COLORS[subscription.plan]}>
              {currentPlanName} — ${currentPrice}/mo
            </Badge>
            <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
          </div>

          {/* Lifecycle state handling */}
          {subscription.status === 'past_due' && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 mb-4">
              <AlertTriangle className="h-4 w-4" />
              Your payment is past due. Update your payment method to avoid service interruption.
            </div>
          )}
          {subscription.status === 'cancelled' && (
            <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700 mb-4">
              <AlertTriangle className="h-4 w-4" />
              Your subscription has been canceled.
              {dbSubscription?.endsAt && <> Access continues until {new Date(dbSubscription.endsAt).toLocaleDateString()}.</>}
            </div>
          )}

          {/* Feature list */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {(Object.keys(planLimits) as Array<keyof typeof planLimits>).map((key) => (
              <div key={key} className="text-sm">
                <span className="text-gray-500">{PLAN_FEATURE_LABELS[key]}: </span>
                <span className="font-medium text-gray-900">
                  {formatFeatureValue(key, planLimits[key][subscription.plan])}
                </span>
              </div>
            ))}
          </div>

          {/* Renewal / Cancel info */}
          {dbSubscription?.renewsAt && subscription.isActive && subscription.status !== 'past_due' && (
            <p className="text-sm text-gray-500 mb-4">
              Renews on {new Date(dbSubscription.renewsAt).toLocaleDateString()}
            </p>
          )}
          {dbSubscription?.trialEndsAt && subscription.status === 'on_trial' && (
            <p className="text-sm text-amber-600 mb-4">
              Trial ends on {new Date(dbSubscription.trialEndsAt).toLocaleDateString()}
            </p>
          )}
          {dbSubscription?.endsAt && !subscription.isActive && (
            <p className="text-sm text-gray-500 mb-4">
              Access ends on {new Date(dbSubscription.endsAt).toLocaleDateString()}
            </p>
          )}

          {/* Manage Subscription */}
          {customerPortalUrl ? (
            <a
              href={customerPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Manage Subscription
            </a>
          ) : (
            <div className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-700">
              <p className="font-medium">Billing portal</p>
              <p className="text-xs mt-1">Customer portal URL will appear here after subscription setup. Contact support for billing changes.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage / Entitlement Summary */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Usage This Month</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Invoices Processed', value: String(totalInvoices), sub: `${paidInvoices} paid, ${overdueInvoices} overdue` },
            { label: 'Team Members', value: String(planLimits.teamMembers[subscription.plan] === Infinity ? '∞' : planLimits.teamMembers[subscription.plan]), sub: 'Plan limit' },
            { label: 'Stripe Connections', value: String(planLimits.stripeConnections[subscription.plan]), sub: 'Plan limit' },
            { label: 'Forecast Range', value: `${planLimits.forecastDays[subscription.plan]}d`, sub: 'Plan limit' },
          ].map(c => (
            <div key={c.label} className="rounded-lg border bg-white p-4 shadow-sm">
              <p className="text-xs text-gray-500">{c.label}</p>
              <p className="text-lg font-bold text-gray-900 mt-1">{c.value}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{c.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment details.</CardDescription>
        </CardHeader>
        <CardContent>
          {customerPortalUrl ? (
            <div>
              <p className="text-sm text-gray-500 mb-3">Manage your payment method through the LemonSqueezy customer portal.</p>
              <a
                href={customerPortalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Update Payment Method
              </a>
            </div>
          ) : (
            <div className="rounded-lg border-2 border-dashed border-gray-200 px-4 py-6 text-center">
              <p className="text-sm text-gray-500">No payment method on file.</p>
              <p className="text-xs text-gray-400 mt-1">Subscribe to a plan to add a payment method.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Recent invoices and receipts.</CardDescription>
        </CardHeader>
        <CardContent>
          {invoiceRows.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-gray-200 px-4 py-8 text-center">
              <p className="text-sm text-gray-500">No invoices yet.</p>
              <p className="text-xs text-gray-400 mt-1">Invoice records will appear here after you send your first invoice.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left px-3 py-2 text-xs font-medium text-gray-500 uppercase">Invoice</th>
                    <th className="text-left px-3 py-2 text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="text-left px-3 py-2 text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="text-left px-3 py-2 text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="text-right px-3 py-2 text-xs font-medium text-gray-500 uppercase">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {invoiceRows.map(inv => (
                    <tr key={inv.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2.5 font-medium text-gray-900">{inv.id.slice(0, 8)}</td>
                      <td className="px-3 py-2.5 text-gray-600">{new Date(inv.createdAt).toLocaleDateString()}</td>
                      <td className="px-3 py-2.5 font-medium text-gray-900">{formatCents(inv.amountCents)}</td>
                      <td className="px-3 py-2.5">
                        <Badge variant={inv.status === 'paid' ? 'success' : inv.status === 'overdue' ? 'destructive' : 'default'}>
                          {inv.status}
                        </Badge>
                      </td>
                      <td className="px-3 py-2.5 text-right">
                        {inv.status === 'paid' ? (
                          <a
                            href={`/api/invoices/${inv.id}/pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                          >
                            <Download className="h-3 w-3" /> PDF
                          </a>
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
        </CardContent>
      </Card>

      {/* Upgrade / Available Plans */}
      {upgradePlans.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {subscription.isFree ? 'Choose a plan' : 'Available upgrades'}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {upgradePlans.map((planId) => {
              const price = PLAN_PRICES[planId]
              const checkoutUrl = CHECKOUT_URLS[planId]
              if (!checkoutUrl) return null

              return (
                <Card key={planId} className="relative flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl capitalize">{planId}</CardTitle>
                    <CardDescription>
                      {planId === 'starter' && 'For solo founders'}
                      {planId === 'pro' && 'For growing teams'}
                      {planId === 'growth' && 'For established businesses'}
                    </CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900">${price}</span>
                      <span className="text-gray-500">/mo</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ul className="mb-6 flex-1 space-y-2">
                      {(Object.keys(planLimits) as Array<keyof typeof planLimits>).map((key) => (
                        <li key={key} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                          <span className="text-gray-700">
                            {PLAN_FEATURE_LABELS[key]}:{' '}
                            <span className="font-medium">
                              {formatFeatureValue(key, planLimits[key][planId])}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                    {subscription.plan === planId ? (
                      <Badge variant="default" className="w-full text-center py-2">Current Plan</Badge>
                    ) : (
                      <a
                        href={`${checkoutUrl}?checkout%5Bemail%5D=${encodeURIComponent(user?.email ?? '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <span className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
                          {subscription.isFree ? 'Upgrade' : 'Switch'}
                        </span>
                      </a>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* Support card */}
      <Card>
        <CardContent className="flex items-center justify-between py-4">
          <div>
            <p className="text-sm font-medium text-gray-900">Need help with billing?</p>
            <p className="text-xs text-gray-500 mt-0.5">Contact us for subscription changes or billing questions.</p>
          </div>
          <a href="mailto:support@aifinanceops.app" className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
            Contact Support
          </a>
        </CardContent>
      </Card>
    </div>
  )
}
