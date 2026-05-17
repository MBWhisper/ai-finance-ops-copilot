import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'
import { TrialBanner } from '@/components/dashboard/trial-banner'
import { KPICGrid } from '@/components/dashboard/kpi-grid'
import { PlanGate } from '@/components/plan-gate'
import { getUserSubscription } from '@/lib/subscription'
import { getLatestMetrics, getMetricsHistory } from '@/db/queries/metrics'
import { getInvoiceStats } from '@/db/queries/invoices'
import { getStripeAccount } from '@/db/queries/stripe-accounts'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'

const MrrHistoryChart = dynamic(
  () => import('@/components/dashboard/mrr-history-chart').then(m => ({ default: m.MrrHistoryChart })),
  { ssr: true, loading: () => <div className="h-64 animate-pulse rounded-lg bg-gray-200" /> }
)

export default async function OverviewPage({
  searchParams,
}: {
  searchParams: { welcome?: string }
}) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/login')
  const user = session.user

  const { data: profile } = await supabase
    .from('users')
    .select('trial_ends_at, plan')
    .eq('id', user.id)
    .single()

  const subscription = await getUserSubscription(user.id)

  const [latestMetrics, metricsHistory, invoiceStats, stripeAccount] = await Promise.all([
    getLatestMetrics(user.id),
    getMetricsHistory(user.id, 90),
    getInvoiceStats(user.id),
    getStripeAccount(user.id),
  ])

  const hasStripe = !!stripeAccount
  const metricResult = latestMetrics ?? { mrrCents: 0, arrCents: 0, churnRate: 0, ltvCents: 0 }
  const prevPeriod = metricsHistory.length > 30 ? metricsHistory[30] : null
  const changes = prevPeriod
    ? {
        mrr: prevPeriod.mrrCents > 0 ? ((metricResult.mrrCents - prevPeriod.mrrCents) / prevPeriod.mrrCents) * 100 : 0,
        arr: prevPeriod.arrCents > 0 ? ((metricResult.arrCents - prevPeriod.arrCents) / prevPeriod.arrCents) * 100 : 0,
        churn: prevPeriod.churnRate > 0 ? metricResult.churnRate - prevPeriod.churnRate : 0,
        ltv: prevPeriod.ltvCents > 0 ? ((metricResult.ltvCents - prevPeriod.ltvCents) / prevPeriod.ltvCents) * 100 : 0,
      }
    : undefined

  return (
    <div className="space-y-6">
      <TrialBanner
        trialEndsAt={profile?.trial_ends_at ?? null}
        plan={profile?.plan ?? 'starter'}
        createdAt={user.created_at}
        showWelcome={searchParams.welcome === 'true'}
      />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Welcome back{user.email ? `, ${user.email}` : ''}
          </p>
        </div>
        {!hasStripe && (
          <Link
            href="/dashboard/settings"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Connect Stripe
          </Link>
        )}
      </div>

      {!hasStripe ? (
        <>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {(['MRR', 'ARR', 'Churn Rate', 'LTV'] as const).map((label) => (
              <div key={label} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                  {label === 'Churn Rate' ? '0%' : '$0'}
                </p>
                <p className="mt-1 text-xs text-gray-400">Connect Stripe to track</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Get Started</h3>
            <p className="mx-auto max-w-sm text-sm text-gray-500">
              Connect your Stripe account in Settings to automatically import invoices and track MRR, ARR, and churn.
            </p>
            <Link
              href="/dashboard/settings"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Go to Settings
            </Link>
          </div>
        </>
      ) : (
        <>
          <KPICGrid metrics={metricResult} changes={changes} />

          {/* Invoice stats row */}
          <PlanGate requiredPlan="starter" currentPlan={subscription.plan} feature="Invoice tracking">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">Total Invoices</p>
                <p className="mt-1 text-3xl font-bold text-gray-900">{invoiceStats.total}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">Paid</p>
                <p className="mt-1 text-3xl font-bold text-green-600">{invoiceStats.paid}</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-gray-500">Outstanding</p>
                <p className="mt-1 text-3xl font-bold text-amber-600">
                  {formatCurrency(
                    invoiceStats.totalAmountCents -
                      invoiceStats.paid * (invoiceStats.totalAmountCents / (invoiceStats.total || 1))
                  )}
                </p>
              </div>
            </div>
          </PlanGate>

          {/* MRR History Chart */}
          <PlanGate requiredPlan="pro" currentPlan={subscription.plan} feature="MRR History Chart">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <MrrHistoryChart data={metricsHistory} />
            </div>
          </PlanGate>
        </>
      )}
    </div>
  )
}
