import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ARPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">AR / Invoices</h1>
        <p className="text-gray-500 mt-1">Manage your accounts receivable and invoices.</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-700">All Invoices</h2>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">0 invoices</span>
        </div>
        <div className="p-12 text-center">
          <p className="text-sm text-gray-500">No invoices found. Connect Stripe to import automatically.</p>
        </div>
      </div>
    </div>
  )
}
