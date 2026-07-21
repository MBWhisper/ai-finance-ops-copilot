"use client"
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, AlertTriangle, CheckCircle, Calendar } from 'lucide-react'

export function RunwayCalculatorClient() {
  const [cash, setCash] = useState('500000')
  const [burn, setBurn] = useState('35000')
  const [mrr, setMrr] = useState('15000')
  const [mrrGrowth, setMrrGrowth] = useState('8')

  const cashVal = parseFloat(cash) || 0
  const burnVal = parseFloat(burn) || 0
  const mrrVal = parseFloat(mrr) || 0
  const growthRate = parseFloat(mrrGrowth) / 100 || 0

  const netBurn = Math.max(0, burnVal - mrrVal)
  const staticRunway = netBurn > 0 ? cashVal / netBurn : Infinity

  // Dynamic runway (MRR grows month by month)
  let dynamicRunway = 0
  if (netBurn > 0 && mrrVal < burnVal) {
    let remainingCash = cashVal
    let currentMrr = mrrVal
    let months = 0
    while (remainingCash > 0 && months < 120) {
      const monthlyNetBurn = Math.max(0, burnVal - currentMrr)
      if (monthlyNetBurn === 0) { dynamicRunway = Infinity; break }
      remainingCash -= monthlyNetBurn
      currentMrr *= (1 + growthRate)
      months++
      if (remainingCash <= 0) { dynamicRunway = months; break }
    }
    if (dynamicRunway === 0) dynamicRunway = months
  } else {
    dynamicRunway = Infinity
  }

  const fundraiseAlert = staticRunway <= 6
  const warningLevel = staticRunway < 3 ? 'critical' : staticRunway < 6 ? 'warning' : 'good'

  const runwayDate = (months: number) => {
    if (!isFinite(months)) return 'Profitable'
    const d = new Date()
    d.setMonth(d.getMonth() + Math.floor(months))
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
  const inputClass = "w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-2xl px-6 py-24">
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 mb-4">Free Tool</span>
          <h1 className="text-4xl font-bold text-white mb-4">Runway Calculator</h1>
          <p className="text-lg text-gray-400">How many months of runway do you have? Enter your cash, burn rate, and MRR below.</p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 mb-6">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label htmlFor="rw-cash" className="block text-xs text-gray-500 mb-2">Current cash balance ($)</label>
              <input id="rw-cash" type="number" min="0" className={inputClass} value={cash} onChange={e => setCash(e.target.value)} />
            </div>
            <div>
              <label htmlFor="rw-burn" className="block text-xs text-gray-500 mb-2">Monthly gross burn ($)</label>
              <input id="rw-burn" type="number" min="0" className={inputClass} value={burn} onChange={e => setBurn(e.target.value)} />
            </div>
            <div>
              <label htmlFor="rw-mrr" className="block text-xs text-gray-500 mb-2">Current MRR ($)</label>
              <input id="rw-mrr" type="number" min="0" className={inputClass} value={mrr} onChange={e => setMrr(e.target.value)} />
            </div>
            <div>
              <label htmlFor="rw-growth" className="block text-xs text-gray-500 mb-2">Monthly MRR growth (%)</label>
              <input id="rw-growth" type="number" min="0" max="100" step="0.5" className={inputClass} value={mrrGrowth} onChange={e => setMrrGrowth(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-xs text-gray-500 mb-1">Static Runway</p>
            <p className={`text-3xl font-bold ${warningLevel === 'good' ? 'text-emerald-400' : warningLevel === 'warning' ? 'text-amber-400' : 'text-red-400'}`}>
              {isFinite(staticRunway) ? `${staticRunway.toFixed(1)} mo` : '∞'}
            </p>
            <p className="text-xs text-gray-600 mt-1">at current net burn</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-xs text-gray-500 mb-1">Dynamic Runway</p>
            <p className="text-3xl font-bold text-emerald-400">
              {isFinite(dynamicRunway) ? `${dynamicRunway} mo` : '∞'}
            </p>
            <p className="text-xs text-gray-600 mt-1">with {mrrGrowth}% MoM growth</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-xs text-gray-500 mb-1">Net Monthly Burn</p>
            <p className="text-3xl font-bold text-white">{fmt(netBurn)}</p>
            <p className="text-xs text-gray-600 mt-1">gross burn minus MRR</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-xs text-gray-500 mb-1">Cash Out Date</p>
            <p className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              {runwayDate(staticRunway)}
            </p>
            <p className="text-xs text-gray-600 mt-1">static projection</p>
          </div>
        </div>

        {/* Alert */}
        {fundraiseAlert && (
          <div className={`rounded-xl border p-5 mb-8 flex items-start gap-3 ${
            warningLevel === 'critical' ? 'border-red-500/20 bg-red-500/5' : 'border-amber-500/20 bg-amber-500/5'
          }`}>
            <AlertTriangle className={`h-5 w-5 shrink-0 mt-0.5 ${warningLevel === 'critical' ? 'text-red-400' : 'text-amber-400'}`} />
            <div>
              <p className={`text-sm font-semibold ${warningLevel === 'critical' ? 'text-red-400' : 'text-amber-400'}`}>
                {warningLevel === 'critical' ? 'Critical: Under 3 months runway' : 'Warning: Under 6 months runway'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {warningLevel === 'critical'
                  ? 'Fundraising or cutting costs should be your #1 priority right now. Investors need 3-6 months to close a round.'
                  : 'Start fundraising conversations now. Most rounds take 3-6 months to close — you need to start before you reach 3 months.'}
              </p>
            </div>
          </div>
        )}

        {!fundraiseAlert && isFinite(staticRunway) && (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 mb-8 flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-300">Healthy runway. Plan your next fundraise or path to profitability with your current trajectory.</p>
          </div>
        )}

        <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-6 mb-10">
          <h2 className="text-sm font-bold text-white mb-3">Runway rules of thumb</h2>
          <div className="space-y-2 text-sm">
            {[
              { months: '18-24 months', label: 'Ideal after a funding round', color: 'text-emerald-400' },
              { months: '12-18 months', label: 'Comfortable — start planning next raise', color: 'text-emerald-400' },
              { months: '6-12 months', label: 'Start fundraising conversations now', color: 'text-amber-400' },
              { months: '<6 months', label: 'Urgent: fundraise or cut burn immediately', color: 'text-red-400' },
            ].map(r => (
              <div key={r.months} className="flex justify-between">
                <span className={`font-mono font-semibold text-xs ${r.color}`}>{r.months}</span>
                <span className="text-gray-400 text-xs">{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Track runway automatically</h3>
          <p className="text-gray-400 mb-6 text-sm">AI Finance Ops tracks your burn rate, MRR, and runway in real-time — with alerts when runway drops below your threshold.</p>
          <Link href="/register" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-all">
            Start Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
