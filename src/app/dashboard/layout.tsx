import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/dashboard/sidebar'
import { ensureUserRecord } from '@/lib/auth/ensure-user'
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

  // Use service role to check profile (bypasses RLS)
  try {
    const userRecord = await ensureUserRecord(
      user.id,
      user.email ?? '',
      user.user_metadata?.name as string | undefined
    )
    logger.info({ userId: userRecord.id }, '[DASHBOARD-LAYOUT] User profile exists')
  } catch {
    logger.info('[DASHBOARD-LAYOUT] Failed to verify profile, redirecting to /setup')
    redirect('/setup')
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar userEmail={user.email ?? ''} />
      <main className="flex-1 ml-64 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}