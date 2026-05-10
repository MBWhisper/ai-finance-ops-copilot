'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/browser'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function SetupPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function init() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      const { data: existing } = await supabase
        .from('users')
        .select('id')
        .eq('id', user.id)
        .single()

      if (!existing) {
        const res = await fetch('/api/auth/create-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: user.id,
            email: user.email,
            name: user.user_metadata?.name ?? '',
          }),
        })

        if (!res.ok) {
          const data = await res.json()
          setError(data.error || 'Failed to create user')
          setLoading(false)
          return
        }
      }

      setLoading(false)
    }
    init()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow text-center">
        {loading ? (
          <>
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            <p className="text-gray-500">Setting up your account...</p>
          </>
        ) : error ? (
          <>
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-red-600 mb-4">{error}</p>
            <Button onClick={() => router.push('/dashboard/overview')}>
              Go to Dashboard
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-2">You&apos;re all set!</h1>
            <p className="text-gray-500 mb-6">
              Your account is ready. Connect your Stripe account to start tracking metrics.
            </p>
            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => router.push('/dashboard/settings')}
              >
                Connect Stripe
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push('/dashboard/overview')}
              >
                Go to Dashboard
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
