import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function OverviewPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Welcome back{user.email ? `, ${user.email}` : ''} 👋
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">MRR</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">$0</p>
          <p className="text-xs text-gray-400 mt-1">Connect Stripe to track</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">ARR</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">$0</p>
          <p className="text-xs text-gray-400 mt-1">Connect Stripe to track</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Churn Rate</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">0%</p>
          <p className="text-xs text-gray-400 mt-1">Connect Stripe to track</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">LTV</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">$0</p>
          <p className="text-xs text-gray-400 mt-1">Connect Stripe to track</p>
        </div>
      </div>

      {/* Invoice Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Total Invoices</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">0</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Paid</p>
          <p className="text-3xl font-bold text-green-600 mt-1">0</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Outstanding</p>
          <p className="text-3xl font-bold text-amber-600 mt-1">0</p>
        </div>
      </div>

      {/* Get Started CTA */}
      <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
        <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Started</h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          Connect your Stripe account in Settings to automatically import invoices and track MRR, ARR, and churn.
        </p>
        <a
          href="/dashboard/settings"
          className="inline-flex mt-4 items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Go to Settings
        </a>
      </div>
    </div>
  )
}
