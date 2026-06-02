import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'
import { TrialBanner } from '@/components/dashboard/trial-banner'
import { PlanGate } from '@/components/plan-gate'
import { getUserSubscription } from '@/lib/subscription'
import { getLatestMetrics, getMetricsHistory } from '@/db/queries/metrics'
import { getInvoiceStats, getAllInvoices } from '@/db/queries/invoices'
import { getStripeAccount } from '@/db/queries/stripe-accounts'
import { getLemonSqueezyAccount, getLemonSqueezyDashboardData } from '@/db/queries/lemon-squeezy'
import { getPayPalAccount, getPayPalDashboardData } from '@/db/queries/paypal'
import { OverviewExecutiveSummary } from '@/components/analytics/overview-executive-summary'
import { OverviewAttentionSection } from '@/components/analytics/overview-attention-section'

export const revalidate = 60

const MrrHistoryChart = dynamic(
  () => import('@/components/dashboard/mrr-history-chart').then(m => ({ default: m.MrrHistoryChart })),
  {
    ssr: true,
    loading: () => <div className="h-64 w-full rounded-lg bg-gray-200" />,
  }
)

const LemonKpiGrid = dynamic(
  () => import('@/components/dashboard/lemon-kpi-grid').then(m => ({ default: m.LemonKpiGrid })),
  { ssr: true, loading: () => <div className="h-12" /> }
)

const PayPalKpiGrid = dynamic(
  () => import('@/components/dashboard/paypal-kpi-grid').then(m => ({ default: m.PayPalKpiGrid })),
  { ssr: true, loading: () => <div className="h-12" /> }
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

  // ✅ Fix error: 'profiles' بدلاً من 'users'
  const { data: profile } = await supabase
    .from('profiles')
    .select('trial_ends_at, plan')
    .eq('id', user.id)
    .single()

  const subscription = await getUserSubscription(user.id)

  const [latestMetrics, metricsHistory, invoiceStats, stripeAccount, allInvoices, lsAccount, lsDashboardData, ppAccount, ppDashboardData] = await Promise.all([
    getLatestMetrics(user.id),
    getMetricsHistory(user.id, 90),
    getInvoiceStats(user.id),
    getStripeAccount(user.id),
    getAllInvoices(user.id),
    getLemonSqueezyAccount(user.id),
    getLemonSqueezyDashboardData(user.id).catch(() => null),
    getPayPalAccount(user.id),
    getPayPalDashboardData(user.id).catch(() => null),
  ])

  const hasStripe = !!stripeAccount
  const hasLemonSqueezy = !!lsAccount
  const hasPayPal = !!ppAccount
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

  // ✅ Fix CLS: احسب trialDaysLeft هنا في server بدلاً من client
  const trialEndsAt = profile?.trial_ends_at ?? null
  const trialDaysLeft = trialEndsAt
    ? Math.ceil((new Date(trialEndsAt).getTime() - Date.now()) / 86_400_000)
    : null
  const showBanner = trialDaysLeft !== null && trialDaysLeft <= 7 && (profile?.plan ?? 'starter') !== 'pro'

  return (
    <div className="space-y-5">
      {/* ✅ Fix CLS: min-h ثابتة دائماً حتى لو banner مخفي */}
      <div className="min-h-[56px]">
        {showBanner && (
          <TrialBanner
            trialEndsAt={trialEndsAt}
            plan={profile?.plan ?? 'starter'}
            createdAt={user.created_at}
            showWelcome={searchParams.welcome === 'true'}
          />
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Welcome back{user.email ? `, ${user.email}` : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasStripe && (
            <p className="text-[11px] text-gray-400 hidden sm:block">
              Data refreshed{' '}
              {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </p>
          )}
          {!hasStripe && (
            <a
              href="/dashboard/settings"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-lg bg-blue-600 text-sm font-medium text-white hover:bg-blue-700"
            >
              Connect Stripe
            </a>
          )}
        </div>
      </div>

      {!hasStripe ? (
        <>
          {/* ✅ Fix CLS: حجم ثابت للـ KPI grid قبل data */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {(['MRR', 'ARR', 'Churn Rate', 'LTV'] as const).map((label) => (
              <div
                key={label}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm min-h-[100px]"
              >
                <p className="text-sm font-medium text-gray-500">{label}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900">
                  {label === 'Churn Rate' ? '0%' : '$0'}
                </p>
                <p className="mt-1 text-xs text-gray-400">Connect Stripe to track</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border-2 border-dashed border-gray-200 bg-white p-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <svg className="h-7 w-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">Your dashboard is ready &mdash; just waiting for data</h3>
            <p className="mx-auto max-w-sm text-sm text-gray-500">
              Connect Stripe to see your MRR, churn, and runway in real time.
            </p>
            <a
              href="/dashboard/settings"
              className="mt-6 inline-flex items-center rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Connect Stripe
            </a>
            <p className="mt-2 text-xs text-gray-400">Takes less than 60 seconds</p>
          </div>
        </>
      ) : (
        <>
          <OverviewExecutiveSummary
            metrics={metricResult}
            changes={changes}
            metricsHistory={metricsHistory}
          />

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-emerald-800">PMF Status: Strong ✅</p>
                <p className="mt-0.5 text-xs text-emerald-600">You&apos;re retaining users well. Keep iterating.</p>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-emerald-700">72%</p>
                  <p className="text-[10px] text-emerald-500">Month-1 Retention</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-emerald-700">48%</p>
                  <p className="text-[10px] text-emerald-500">Month-3 Retention</p>
                </div>
              </div>
            </div>
          </div>

          <PlanGate requiredPlan="starter" currentPlan={subscription.plan} feature="Invoice tracking">
            <OverviewAttentionSection
              invoices={allInvoices}
              metricsHistory={metricsHistory}
            />
          </PlanGate>

          <PlanGate requiredPlan="pro" currentPlan={subscription.plan} feature="MRR History Chart">
            {/* ✅ Fix CLS: wrapper بنفس الـ height الثابتة */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm min-h-[304px]">
              <MrrHistoryChart data={metricsHistory} />
            </div>
          </PlanGate>
        </>
      )}

      {hasLemonSqueezy && (
        <LemonKpiGrid
          data={lsDashboardData}
          loading={false}
          error={null}
        />
      )}

      {hasPayPal && (
        <PayPalKpiGrid
          data={ppDashboardData}
          loading={false}
          error={null}
        />
      )}
    </div>
  )
}
