import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const revalidate = 300

export default async function AdminCancellationReasonsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single()

  const { data: feedback } = await supabase
    .from('cancellation_feedback')
    .select('reason')

  const counts: Record<string, number> = {}
  if (feedback) {
    for (const f of feedback) {
      counts[f.reason] = (counts[f.reason] || 0) + 1
    }
  }

  const reasons = Object.entries(counts).sort(([, a], [, b]) => b - a)
  const total = feedback?.length ?? 0

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Cancellation Reasons</h1>
        <p className="mt-0.5 text-sm text-gray-500">{total} total cancellations</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Summary</h2>
        <div className="space-y-3">
          {reasons.map(([reason, count]) => (
            <div key={reason} className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3">
              <span className="text-sm font-medium text-gray-900">{reason}</span>
              <span className="text-sm text-gray-500">{count}</span>
            </div>
          ))}
          {reasons.length === 0 && (
            <p className="text-sm text-gray-400">No cancellation feedback yet.</p>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-gray-900">Recent Feedback</h2>
        <div className="space-y-3">
          {feedback?.slice(-10).reverse().map((f, i) => (
            <div key={i} className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">{f.reason}</span>
            </div>
          ))}
          {(!feedback || feedback.length === 0) && (
            <p className="text-sm text-gray-400">No feedback received yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
