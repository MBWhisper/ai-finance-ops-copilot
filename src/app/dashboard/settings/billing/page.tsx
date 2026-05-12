import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getUserSubscription, PLAN_FEATURES, type PlanId } from '@/lib/subscription'
import { getSubscription } from '@/db/queries/subscriptions'
import { getCustomerPortalUrl } from '@/app/actions/billing'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, ExternalLink } from 'lucide-react'
import Link from 'next/link'

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

export default async function BillingPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const subscription = await getUserSubscription(user.id)
  const dbSubscription = await getSubscription(user.id)

  let customerPortalUrl: string | null = null

  if (dbSubscription?.lemonSqueezyCustomerPortalUrl) {
    customerPortalUrl = dbSubscription.lemonSqueezyCustomerPortalUrl
  } else if (dbSubscription?.lemonSqueezySubscriptionId) {
    customerPortalUrl = await getCustomerPortalUrl(dbSubscription.lemonSqueezySubscriptionId)
  }

  const currentPlanName = PLAN_NAMES[subscription.plan] ?? 'Free'
  const currentPrice = PLAN_PRICES[subscription.plan] ?? 0
  const statusInfo = STATUS_BADGE[subscription.status ?? ''] ?? { label: subscription.status ?? 'Unknown', variant: 'default' as const }

  const planOrder: PlanId[] = ['starter', 'pro', 'growth']
  const upgradePlans = subscription.isFree
    ? planOrder
    : planOrder.filter((p) => p !== subscription.plan)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Billing</h1>
        <p className="mt-1 text-gray-500">Manage your subscription and billing information.</p>
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

          {/* Feature list */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            {(Object.keys(PLAN_FEATURES) as Array<keyof typeof PLAN_FEATURES>).map((key) => (
              <div key={key} className="text-sm">
                <span className="text-gray-500">{PLAN_FEATURE_LABELS[key]}: </span>
                <span className="font-medium text-gray-900">
                  {formatFeatureValue(key, PLAN_FEATURES[key][subscription.plan])}
                </span>
              </div>
            ))}
          </div>

          {/* Renewal / Cancel info */}
          {dbSubscription?.renewsAt && subscription.isActive && (
            <p className="text-sm text-gray-500 mb-4">
              Renews on {new Date(dbSubscription.renewsAt).toLocaleDateString()}
            </p>
          )}
          {dbSubscription?.endsAt && !subscription.isActive && (
            <p className="text-sm text-gray-500 mb-4">
              Access ends on {new Date(dbSubscription.endsAt).toLocaleDateString()}
            </p>
          )}

          {/* Manage Subscription */}
          {customerPortalUrl && (
            <a
              href={customerPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Manage Subscription
            </a>
          )}
        </CardContent>
      </Card>

      {/* Upgrade / Available Plans */}
      {upgradePlans.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
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
                      {(Object.keys(PLAN_FEATURES) as Array<keyof typeof PLAN_FEATURES>).map((key) => (
                        <li key={key} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                          <span className="text-gray-700">
                            {PLAN_FEATURE_LABELS[key]}:{' '}
                            <span className="font-medium">
                              {formatFeatureValue(key, PLAN_FEATURES[key][planId])}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                    {subscription.plan === planId ? (
                      <Badge variant="default" className="w-full text-center py-2">Current Plan</Badge>
                    ) : (
                      <a
                        href={`${checkoutUrl}?checkout%5Bemail%5D=${encodeURIComponent(user.email ?? '')}`}
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

      {/* Footer info */}
      <p className="text-sm text-gray-500 text-center">
        All plans include a 14-day free trial. No credit card required. Cancel anytime.
      </p>
    </div>
  )
}
