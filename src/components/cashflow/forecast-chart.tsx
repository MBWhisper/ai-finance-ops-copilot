"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ForecastDay } from "@/core/forecast/types";

interface ForecastChartProps {
  data: ForecastDay[];
  period: 30 | 60 | 90;
}

export function ForecastChart({ data, period }: ForecastChartProps) {
  const chartData = data.map((day) => ({
    date: day.date,
    amount: day.amountCents / 100,
    p50: day.bands.p50 / 100,
    p80: day.bands.p80 / 100,
    p95: day.bands.p95 / 100,
  }));

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            interval={period === 30 ? 4 : period === 60 ? 9 : 14}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, ""]} />
          <Legend />
          <Line
            type="monotone"
            dataKey="p95"
            stroke="#ef4444"
            strokeWidth={1}
            strokeDasharray="8 8"
            name="P95 (Conservative)"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="p80"
            stroke="#f59e0b"
            strokeWidth={1}
            strokeDasharray="4 4"
            name="P80"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="p50"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="2 2"
            name="P50 (Expected)"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Forecast"
            dot={{ r: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
