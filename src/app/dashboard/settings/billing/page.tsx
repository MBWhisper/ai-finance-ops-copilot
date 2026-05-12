import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { getSubscription } from '@/db/queries/subscriptions'
import { PLAN_LIMITS as PLANS, FREE_TRIAL_DAYS } from '@/lib/plans'
import { PlanBadge } from '@/components/settings/plan-badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default async function BillingPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('trial_ends_at, plan')
    .eq('id', user.id)
    .single()

  const subscription = await getSubscription(user.id)
  const currentPlanSlug = (profile?.plan as string) ?? 'starter'
  const currentPlan = PLANS[currentPlanSlug as keyof typeof PLANS] ?? PLANS.starter
  const isTrialing = profile?.trial_ends_at && new Date(profile.trial_ends_at) > new Date()
  const daysLeft = isTrialing
    ? Math.ceil((new Date(profile.trial_ends_at!).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0

  const subStatus = subscription?.status ?? (isTrialing ? 'trialing' : 'active')

  const statusBadge: Record<string, { label: string; variant: 'default' | 'success' | 'warning' | 'destructive' }> = {
    trialing: { label: 'Free Trial', variant: 'default' },
    active: { label: 'Active', variant: 'success' },
    canceled: { label: 'Canceled', variant: 'destructive' },
    expired: { label: 'Expired', variant: 'destructive' },
    paused: { label: 'Paused', variant: 'warning' },
  }

  const badge = statusBadge[subStatus] ?? { label: subStatus, variant: 'default' as const }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Billing</h1>
        <p className="mt-1 text-gray-500">Manage your subscription and billing information.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the <strong>{currentPlan.name}</strong> plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <PlanBadge plan={currentPlanSlug as 'starter' | 'pro' | 'scale'} />
            <Badge variant={badge.variant}>{badge.label}</Badge>
          </div>

          {isTrialing && (
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 mb-4">
              <p className="text-sm font-medium text-blue-900">
                {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left in your {FREE_TRIAL_DAYS}-day free trial
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Upgrade anytime to keep full access. No credit card required during trial.
              </p>
            </div>
          )}

          {subStatus === 'canceled' && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4 mb-4">
              <p className="text-sm font-medium text-red-900">Your subscription has been canceled</p>
              <p className="text-sm text-red-700 mt-1">
                You will lose access at the end of your billing period. Resume your subscription to continue.
              </p>
            </div>
          )}

          {subscription?.lemonSqueezyCustomerPortalUrl && (
            <a
              href={subscription.lemonSqueezyCustomerPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 mb-4"
            >
              <ExternalLink className="h-4 w-4" />
              Manage in Lemon Squeezy
            </a>
          )}
        </CardContent>
      </Card>

      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Available Plans</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {Object.values(PLANS).map((plan) => {
            const isCurrentPlan = plan.slug === currentPlanSlug
            const checkoutUrl = `https://ai-finance-ops.lemonsqueezy.com/checkout/buy/${plan.slug === 'starter' ? 'a6fac794-fedd-46cb-a998-913316b62e89' : plan.slug === 'growth' ? '8e49a214-837d-40cf-86a9-121dc483b335' : 'ba80d7d9-f9ab-4d09-99b1-841c81c59697'}`

            return (
              <Card key={plan.slug} className={`relative ${isCurrentPlan ? 'border-blue-500 ring-1 ring-blue-500' : ''}`}>
                {isCurrentPlan && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-xs font-semibold text-white">
                    Current Plan
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-600">/mo</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {isCurrentPlan ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <a
                      href={`${checkoutUrl}?checkout%5Bemail%5D=${encodeURIComponent(user.email ?? '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="w-full">
                        {subStatus === 'trialing' || subStatus === 'canceled' ? 'Upgrade' : 'Switch Plan'}
                      </Button>
                    </a>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
