'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import type { MrrTrendPoint } from '@/lib/analytics-data'

function fmtCents(c: number): string {
  if (c >= 10000000) return `$${(c / 10000000).toFixed(1)}M`
  return `$${(c / 100000).toFixed(0)}K`
}

function fmtDate(d: string): string {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function MrrTrendChart({ data, height = 240 }: { data: MrrTrendPoint[]; height?: number }) {
  if (!data.length) {
    return <div className="flex h-48 items-center justify-center text-sm text-gray-400">No data</div>
  }
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -8 }}>
          <defs>
            <linearGradient id="mrrTrendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.12} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} tickFormatter={fmtDate} interval="preserveStartEnd" />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} tickFormatter={fmtCents} width={48} />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null
              const d = payload[0]
              return (
                <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg">
                  <p className="text-xs text-gray-500 mb-1">{fmtDate(label || '')}</p>
                  <p className="text-sm font-semibold text-gray-900">{fmtCents(d.value as number)}</p>
                </div>
              )
            }}
            cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
          />
          <Area type="monotone" dataKey="mrrCents" stroke="#3b82f6" strokeWidth={2} fill="url(#mrrTrendFill)" dot={false} activeDot={{ r: 4, fill: '#3b82f6' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
