"use client"
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function LTVCalculatorClient() {
  const [arpu, setArpu] = useState('79')
  const [churnRate, setChurnRate] = useState('3')
  const [grossMargin, setGrossMargin] = useState('80')
  const [cac, setCac] = useState('300')

  const a = parseFloat(arpu) || 0
  const c = parseFloat(churnRate) / 100 || 0.001
  const g = parseFloat(grossMargin) / 100 || 1
  const cacVal = parseFloat(cac) || 0

  const avgLifetime = c > 0 ? 1 / c : 0
  const ltv = a * avgLifetime * g
  const ltvCac = cacVal > 0 ? ltv / cacVal : 0
  const paybackMonths = arpu && cac ? cacVal / (a * g) : 0

  const getLTVHealth = () => {
    if (ltvCac >= 3) return { label: 'Healthy (3:1+)', color: 'text-emerald-400' }
    if (ltvCac >= 1) return { label: 'Marginal (1-3:1)', color: 'text-amber-400' }
    return { label: 'Unsustainable (<1:1)', color: 'text-red-400' }
  }

  const health = getLTVHealth()
  const fmt = (n: number, decimals = 0) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: decimals })
  const inputClass = "w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-2xl px-6 py-24">
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 mb-4">Free Tool</span>
          <h1 className="text-4xl font-bold text-white mb-4">LTV Calculator</h1>
          <p className="text-lg text-gray-400">Calculate Customer Lifetime Value and LTV:CAC ratio for your SaaS.</p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 mb-8">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-gray-500 mb-2">Average Revenue Per User / month ($)</label>
              <input type="number" min="0" className={inputClass} value={arpu} onChange={e => setArpu(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Monthly Churn Rate (%)</label>
              <input type="number" min="0.1" max="100" step="0.1" className={inputClass} value={churnRate} onChange={e => setChurnRate(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Gross Margin (%)</label>
              <input type="number" min="0" max="100" className={inputClass} value={grossMargin} onChange={e => setGrossMargin(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Customer Acquisition Cost ($)</label>
              <input type="number" min="0" className={inputClass} value={cac} onChange={e => setCac(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-xs text-gray-500 mb-1">Customer LTV</p>
            <p className="text-3xl font-bold text-emerald-400">{fmt(ltv)}</p>
            <p className="text-xs text-gray-600 mt-1">avg lifetime value</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-xs text-gray-500 mb-1">LTV:CAC Ratio</p>
            <p className={`text-3xl font-bold ${health.color}`}>{ltvCac.toFixed(1)}:1</p>
            <p className={`text-xs mt-1 ${health.color}`}>{health.label}</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-xs text-gray-500 mb-1">Avg Customer Lifetime</p>
            <p className="text-3xl font-bold text-white">{avgLifetime.toFixed(1)}</p>
            <p className="text-xs text-gray-600 mt-1">months</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-xs text-gray-500 mb-1">CAC Payback Period</p>
            <p className="text-3xl font-bold text-white">{paybackMonths.toFixed(1)}</p>
            <p className="text-xs text-gray-600 mt-1">months to recover CAC</p>
          </div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-6 mb-10">
          <h2 className="text-sm font-bold text-white mb-3">LTV:CAC Benchmarks</h2>
          <div className="space-y-2 text-sm">
            {[
              { ratio: '5:1+', label: 'World-class', color: 'text-emerald-400' },
              { ratio: '3:1', label: 'Target for most SaaS', color: 'text-emerald-400' },
              { ratio: '1–3:1', label: 'Marginal — improve retention or reduce CAC', color: 'text-amber-400' },
              { ratio: '<1:1', label: 'Losing money on every customer', color: 'text-red-400' },
            ].map(b => (
              <div key={b.ratio} className="flex justify-between">
                <span className={`font-mono font-semibold ${b.color}`}>{b.ratio}</span>
                <span className="text-gray-400">{b.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Track LTV automatically</h3>
          <p className="text-gray-400 mb-6 text-sm">AI Finance Ops calculates your real LTV, CAC payback, and cohort retention from your Stripe data automatically.</p>
          <Link href="/register" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-all">
            Start Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
