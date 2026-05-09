'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface RevenueChartProps {
  data: Array<{ date: string; mrrCents: number; arrCents: number }>
}

export function RevenueChart({ data }: RevenueChartProps) {
  const chartData = data.map((d) => ({
    date: d.date.slice(5),
    mrr: d.mrrCents / 100,
    arr: d.arrCents / 100,
  }))

  if (chartData.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-gray-400">
        No revenue data yet. Sync your Stripe account to see charts.
      </div>
    )
  }

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={(v) => `$${v}`} />
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
            contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }}
          />
          <Line
            type="monotone"
            dataKey="mrr"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3, fill: '#3b82f6' }}
            name="MRR"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
