'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { RevenueBreakdown } from '@/lib/analytics-data'

function fmtCents(c: number): string {
  if (c >= 10000000) return `$${(c / 10000000).toFixed(1)}M`
  return `$${(c / 100000).toFixed(0)}K`
}

export function RevenueCompositionChart({ data }: { data: RevenueBreakdown }) {
  if (!data.months.length) {
    return <div className="flex h-48 items-center justify-center text-sm text-gray-400">No data</div>
  }
  return (
    <div className="w-full h-60">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data.months} margin={{ top: 4, right: 4, bottom: 0, left: -8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} tickFormatter={fmtCents} width={48} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null
              return (
                <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg text-xs">
                  <p className="font-medium text-gray-900 mb-1">{label}</p>
                  {payload.map((p) => (
                    <div key={p.name} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                      <span className="text-gray-500">{p.name}</span>
                      <span className="ml-auto font-medium text-gray-900">{fmtCents(p.value as number)}</span>
                    </div>
                  ))}
                </div>
              )
            }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="newCents" name="New" fill="#3b82f6" stackId="a" radius={[2, 2, 0, 0]} />
          <Bar dataKey="expansionCents" name="Expansion" fill="#10b981" stackId="a" radius={[2, 2, 0, 0]} />
          <Bar dataKey="churnedCents" name="Churned" fill="#ef4444" stackId="a" radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
