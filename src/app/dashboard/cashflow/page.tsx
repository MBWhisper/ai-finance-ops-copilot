import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function CashflowPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Cash Flow</h1>
        <p className="text-gray-500 mt-1">Track your income and expenses over time.</p>
      </div>
      <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-12 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No cash flow data yet</h3>
        <p className="text-sm text-gray-500">Connect Stripe in Settings to import transactions.</p>
      </div>
    </div>
  )
}
