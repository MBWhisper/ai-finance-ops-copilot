import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { StripeKeyForm } from '@/components/settings/stripe-key-form'
import { PlanBadge } from '@/components/settings/plan-badge'
import { getStripeAccount } from '@/db/queries/stripe-accounts'

export default async function SettingsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('trial_ends_at, plan')
    .eq('id', user.id)
    .single()

  const stripeAccount = await getStripeAccount(user.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="mt-1 text-gray-500">Manage your account and integrations.</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Account</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500">Email</label>
            <p className="mt-1 text-sm text-gray-900">{user.email}</p>
          </div>
          {profile?.plan && (
            <div>
              <label className="text-xs font-medium uppercase tracking-wide text-gray-500">Plan</label>
              <div className="mt-1 flex items-center gap-3">
                <PlanBadge plan={profile.plan as 'starter' | 'pro' | 'scale'} />
                <Link href="/dashboard/settings/billing" className="text-sm text-blue-600 hover:text-blue-700">
                  Manage billing
                </Link>
              </div>
            </div>
          )}
          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500">User ID</label>
            <p className="mt-1 font-mono text-xs text-gray-400">{user.id}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-base font-semibold text-gray-900">Stripe Integration</h2>
        <p className="mb-4 text-sm text-gray-500">
          Connect your Stripe account to automatically sync invoices and revenue metrics.
          Your key is encrypted with AES-256-GCM before storage.
        </p>

        {stripeAccount ? (
          <div>
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
              <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Stripe account connected
              {stripeAccount.lastSyncAt && (
                <span className="text-green-500">
                  &nbsp;(last sync: {new Date(stripeAccount.lastSyncAt).toLocaleDateString()})
                </span>
              )}
            </div>
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-blue-600 hover:text-blue-700">
                Update Stripe Key
              </summary>
              <div className="mt-4">
                <StripeKeyForm />
              </div>
            </details>
          </div>
        ) : (
          <div>
            <div className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-700">
              No Stripe account connected yet. Enter your key below to get started.
            </div>
            <StripeKeyForm />
          </div>
        )}
      </div>
    </div>
  )
}
