import type { AgingBucket } from '@/lib/invoice-types'
import { formatCents } from '@/lib/invoice-utils'

interface Props {
  buckets: AgingBucket[]
}

const bucketColors: Record<string, string> = {
  'Current': 'bg-green-50 border-green-200',
  '1–30 days': 'bg-yellow-50 border-yellow-200',
  '31–60 days': 'bg-orange-50 border-orange-200',
  '61–90 days': 'bg-red-50 border-red-200',
  '90+ days': 'bg-red-100 border-red-300',
}

export function ARAgingCard({ buckets }: Props) {
  const total = buckets.reduce((s, b) => s + b.amountCents, 0)
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">AR Aging</h3>
        <span className="text-xs text-gray-400">{formatCents(total)} total outstanding</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {buckets.map(b => {
          const pct = total > 0 ? Math.round((b.amountCents / total) * 100) : 0
          return (
            <div key={b.label} className={`rounded-lg border p-3 ${bucketColors[b.label] ?? 'bg-gray-50 border-gray-200'}`}>
              <p className="text-[11px] font-medium text-gray-500 mb-1">{b.label}</p>
              <p className="text-sm font-bold text-gray-900">{b.count}</p>
              <p className="text-xs text-gray-600 mt-0.5">{formatCents(b.amountCents)}</p>
              {pct > 0 && (
                <div className="mt-1.5 h-1.5 w-full bg-white/60 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400 rounded-full" style={{ width: `${pct}%` }} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
