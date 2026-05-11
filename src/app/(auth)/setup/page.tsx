import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ensureUserRecord } from '@/lib/auth/ensure-user'
import { Button } from '@/components/ui/button'

async function setupUser() {
  'use server'
  
  const supabase = createClient()
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  if (sessionError || !session) {
    throw new Error('NO_SESSION')
  }

  const user = session.user
  // eslint-disable-next-line no-console
  console.log('setup: session user id:', user.id)

  // eslint-disable-next-line no-console
  console.log('setup: calling ensureUserRecord...')
  const userRecord = await ensureUserRecord(
    user.id,
    user.email ?? '',
    user.user_metadata?.name as string | undefined
  )
  // eslint-disable-next-line no-console
  console.log('setup: result:', userRecord.id)
  return userRecord
}

export default async function SetupPage() {
  const supabase = createClient()
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()

  if (sessionError) {
    // eslint-disable-next-line no-console
    console.log('setup: session error:', sessionError.message)
  }

  if (!session) {
    // eslint-disable-next-line no-console
    console.log('setup: no session, redirecting to /login')
    redirect('/login')
  }

  const user = session.user
  // eslint-disable-next-line no-console
  console.log('setup: session user id:', user.id)

  let userRecord = null
  let setupError = null

  try {
    // eslint-disable-next-line no-console
    console.log('setup: calling ensureUserRecord...')
    userRecord = await ensureUserRecord(
      user.id,
      user.email ?? '',
      user.user_metadata?.name as string | undefined
    )
    // eslint-disable-next-line no-console
    console.log('setup: result:', userRecord.id)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('setup: ensureUserRecord failed:', err)
    setupError = err instanceof Error ? err.message : 'Failed to set up account'
  }

  if (setupError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow text-center">
          <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-red-600 mb-4">{setupError}</p>
          <form action={async () => {
            'use server'
            try {
              await setupUser()
              redirect('/dashboard/overview')
            } catch {
            }
          }}>
            <Button type="submit" className="w-full">
              Try Again
            </Button>
          </form>
        </div>
      </div>
    )
  }

  // eslint-disable-next-line no-console
  console.log('setup: redirecting to /dashboard/overview')
  redirect('/dashboard/overview')
}