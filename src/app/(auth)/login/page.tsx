'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/browser'

export default function LoginPage() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [magicSent, setMagicSent] = useState(false)
  const [magicLoading, setMagicLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setIsLoading(false)
      return
    }

    window.location.href = '/onboarding'
  }

  async function handleMagicLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMagicLoading(true)
    setError('')
    setMagicSent(false)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('magic-email') as string

    if (!email) {
      setError('Please enter your email')
      setMagicLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setMagicLoading(false)
      return
    }

    setMagicSent(true)
    setMagicLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-1">AI Finance Ops Copilot</h1>
        <p className="text-gray-500 mb-6">SaaS finance tracking, simplified.</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200">
            {error}
          </div>
        )}

        {magicSent && (
          <div className="bg-green-50 text-green-700 p-3 rounded mb-4 text-sm border border-green-200">
            ✅ Check your email for a login link
          </div>
        )}

        {/* Email + Password form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              defaultValue=""
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded font-medium disabled:opacity-50 hover:bg-blue-700 transition-colors"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 border-t border-gray-200" />
          <span className="text-sm text-gray-400">or</span>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        {/* Magic Link form */}
        <form onSubmit={handleMagicLink}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="magic-email"
              type="email"
              required
              placeholder="founder@saas.com"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={magicLoading || magicSent}
            className="w-full border border-blue-600 text-blue-600 py-2 rounded font-medium disabled:opacity-50 hover:bg-blue-50 transition-colors"
          >
            {magicLoading ? 'Sending...' : 'Send me a login link'}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  )
}
