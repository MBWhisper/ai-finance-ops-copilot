import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/dashboard/sidebar'
import { NotificationBell } from '@/components/risk/NotificationBell'
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
        Mobile (< 768px): bottom tab bar + drawer, no margin needed
        Tablet (768px+): sidebar is 64px icon-only, so md:ml-16
        Desktop (1024px+): sidebar expands to 240px on hover, so lg:ml-60
      */}
      <main className="flex-1 min-w-0 md:ml-16 lg:ml-60 overflow-x-hidden pb-16 md:pb-0">
        {/* Top bar with notification bell */}
        <div className="sticky-safari top-0 z-30 flex items-center justify-end gap-3 border-b bg-white/95 backdrop-blur-safari px-4 py-2 sm:px-6 lg:px-8">
          <NotificationBell unreadCount={0} />
        </div>

        {subscription.isFree && (
          <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-amber-800">
              🚀 You&apos;re on the <strong>Free plan</strong>. Upgrade to unlock forecasts, AI Copilot, and more.
            </p>
            <a href="/pricing" className="text-xs sm:text-sm font-semibold text-amber-900 underline whitespace-nowrap shrink-0 min-touch-target flex items-center">
              Upgrade now
            </a>
          </div>
        )}
        <div className="p-3 sm:p-4 lg:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
