import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/dashboard/sidebar'
import { ensureUserRecord } from '@/lib/auth/ensure-user'
import { getUserSubscription } from '@/lib/subscription'
import { logger } from '@/lib/logger'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    logger.info('[DASHBOARD-LAYOUT] No session, redirecting to /login')
    redirect('/login')
  }

  const user = session.user
  logger.info({ userId: user.id }, '[DASHBOARD-LAYOUT] User authenticated')

  try {
    const userRecord = await ensureUserRecord(
      user.id,
      user.email ?? '',
      user.user_metadata?.name as string | undefined
    )
    logger.info({ userId: userRecord.id }, '[DASHBOARD-LAYOUT] User profile exists')
  } catch {
    logger.info('[DASHBOARD-LAYOUT] Failed to verify profile, redirecting to /onboarding')
    redirect('/onboarding')
  }

  const subscription = await getUserSubscription(user.id)

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar userEmail={user.email ?? ''} plan={subscription.plan} />
      {/*
        On desktop (lg+): sidebar is 256px (w-64), so main content needs lg:ml-64
        On mobile: sidebar is a drawer overlay, so no margin needed
      */}
      <main className="flex-1 min-w-0 lg:ml-64 overflow-x-hidden">
        {subscription.isFree && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center justify-between">
            <p className="text-sm text-amber-800">
              🚀 You&apos;re on the <strong>Free plan</strong>. Upgrade to unlock forecasts, AI Copilot, and more.
            </p>
            <a href="/pricing" className="text-sm font-semibold text-amber-900 underline ml-4 whitespace-nowrap">
              Upgrade now
            </a>
          </div>
        )}
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
