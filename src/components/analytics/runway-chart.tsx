'use client'

import { useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts'
import type { CashFlowPoint } from '@/lib/analytics-data'

function fmtCents(c: number): string {
  const abs = Math.abs(c)
  if (abs >= 10000000) return `${c < 0 ? '-' : ''}$${(abs / 10000000).toFixed(1)}M`
  if (abs >= 100000) return `${c < 0 ? '-' : ''}$${(abs / 100000).toFixed(1)}K`
  if (abs >= 100) return `${c < 0 ? '-' : ''}$${(abs / 100).toFixed(0)}`
  return '$0'
}

export function RunwayChart({ data }: { data: CashFlowPoint[] }) {
  const chartData = useMemo(() => {
    let balance = 0
    return data.map((d) => {
      balance += d.netCents
      return { ...d, balanceCents: balance }
    })
  }, [data])

  if (!chartData.length) {
    return <div className="flex h-48 items-center justify-center text-sm text-gray-400">No cash flow data</div>
  }

  return (
    <div className="w-full h-52">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -8 }}>
          <defs>
            <linearGradient id="inflowFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.12} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="outflowFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} tickLine={false} axisLine={false} />
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
          <Area type="monotone" dataKey="inflowCents" name="Inflow" stroke="#10b981" strokeWidth={2} fill="url(#inflowFill)" dot={false} />
          <Area type="monotone" dataKey="outflowCents" name="Outflow" stroke="#ef4444" strokeWidth={2} fill="url(#outflowFill)" dot={false} />
          <Line type="monotone" dataKey="balanceCents" name="Cumulative" stroke="#6366f1" strokeWidth={2} dot={false} strokeDasharray="4 2" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
