import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function OverviewPage() {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome to your AI Finance dashboard</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'MRR', value: '$0', change: '+0%' },
          { label: 'ARR', value: '$0', change: '+0%' },
          { label: 'Active Users', value: '0', change: '+0%' },
          { label: 'Churn Rate', value: '0%', change: '0%' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{kpi.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
            <p className="text-xs text-gray-400 mt-1">{kpi.change} from last month</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-base font-semibold text-gray-800 mb-4">Getting Started</h2>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">1</span>
            <div>
              <p className="text-sm font-medium text-gray-800">Connect your payment provider</p>
              <p className="text-xs text-gray-500">Link Stripe or LemonSqueezy to start tracking revenue.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">2</span>
            <div>
              <p className="text-sm font-medium text-gray-800">View your Cash Flow forecast</p>
              <p className="text-xs text-gray-500">AI-powered 12-month runway predictions.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">3</span>
            <div>
              <p className="text-sm font-medium text-gray-800">Ask the AI Copilot</p>
              <p className="text-xs text-gray-500">Chat with your finance data in natural language.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
