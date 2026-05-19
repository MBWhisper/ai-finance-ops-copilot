'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { AgingBucket } from '@/lib/invoice-types'

const bucketColors: Record<string, string> = {
  'Current': '#22c55e',
  '1–30 days': '#eab308',
  '31–60 days': '#f97316',
  '61–90 days': '#ef4444',
  '90+ days': '#991b1b',
}

export function AgingBarChart({ buckets }: { buckets: AgingBucket[] }) {
  if (!buckets.length) {
    return <div className="flex h-48 items-center justify-center text-sm text-gray-400">No data</div>
  }
  const chartData = buckets.map(b => ({
    label: b.label,
    amount: Math.round(b.amountCents / 100),
    fill: bucketColors[b.label] ?? '#6b7280',
  }))
  return (
    <div className="w-full h-52">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} tickFormatter={v => `$${v}`} width={48} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null
              const v = payload[0].value as number
              return (
                <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
                  <p className="text-xs text-gray-500">{label}</p>
                  <p className="text-sm font-semibold text-gray-900">${v.toLocaleString()}</p>
                </div>
              )
            }}
          />
          <Bar dataKey="amount" name="Outstanding" radius={[4, 4, 0, 0]}>
            {chartData.map((d, i) => (
              <Cell key={i} fill={d.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
