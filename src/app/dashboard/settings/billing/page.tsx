import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CreditCard, ExternalLink } from 'lucide-react'
import { CancelSubscriptionSection } from '@/components/CancelSubscriptionSection'

export const revalidate = 60

export default async function BillingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, trial_ends_at')
    .eq('id', user.id)
    .single()

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('lemonsqueezy_customer_portal_url')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const planLabel: Record<string, string> = {
    free: 'Free',
    starter: 'Starter — $29/mo',
    pro: 'Pro — $79/mo',
    enterprise: 'Enterprise — $199/mo',
  }

  const label = planLabel[profile?.plan ?? 'free'] ?? profile?.plan

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/settings"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Billing</h1>
          <p className="mt-0.5 text-sm text-gray-500">Manage your subscription and payment method.</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Current Plan</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-gray-900">
              {planLabel[profile?.plan ?? 'free'] ?? profile?.plan}
            </p>
            {profile?.trial_ends_at && new Date(profile.trial_ends_at) > new Date() && (
              <p className="mt-1 text-sm text-amber-600">
                Trial ends {new Date(profile.trial_ends_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            )}
          </div>
          <a
            href="https://billing.stripe.com/p/login/test_placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
          >
            <CreditCard className="h-4 w-4" />
            Manage on Stripe
            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
          </a>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Upgrade Plan</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { id: 'starter', label: 'Starter', price: '$29/mo', features: ['Up to 100 customers', 'AR + Cohorts', 'Email support'] },
            { id: 'pro', label: 'Pro', price: '$79/mo', features: ['Unlimited customers', '+ Cash Flow forecast', 'Priority support'] },
            { id: 'enterprise', label: 'Enterprise', price: '$199/mo', features: ['Everything in Pro', '+ AI Chat copilot', 'Dedicated onboarding'] },
          ].map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl border p-4 ${profile?.plan === plan.id ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-white'}`}
            >
              <p className="text-sm font-semibold text-gray-900">{plan.label}</p>
              <p className="mt-0.5 text-lg font-bold text-gray-900">{plan.price}</p>
              <ul className="mt-3 space-y-1.5">
                {plan.features.map((f: string) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              {profile?.plan !== plan.id && (
                <a
                  href={`/api/checkout?plan=${plan.id}`}
                  className="mt-4 block w-full rounded-lg bg-blue-600 px-3 py-2 text-center text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
                >
                  Upgrade to {plan.label}
                </a>
              )}
              {profile?.plan === plan.id && (
                <p className="mt-4 text-center text-xs font-medium text-blue-600">Current plan ✓</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <CancelSubscriptionSection
        customerPortalUrl={subscription?.lemonsqueezy_customer_portal_url}
        planLabel={label}
      />
    </div>
  )
}
