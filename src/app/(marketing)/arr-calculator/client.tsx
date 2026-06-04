"use client"
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'

export function ARRCalculatorClient() {
  const [mrr, setMrr] = useState('10000')
  const [lastMrr, setLastMrr] = useState('8500')

  const mrrVal = parseFloat(mrr) || 0
  const lastMrrVal = parseFloat(lastMrr) || 0

  const arr = mrrVal * 12
  const lastArr = lastMrrVal * 12
  const mrrGrowth = lastMrrVal > 0 ? ((mrrVal - lastMrrVal) / lastMrrVal) * 100 : 0
  const arrGrowth = mrrGrowth // same rate

  // ARR milestones
  const milestones = [
    { label: '$100K ARR', value: 100_000 },
    { label: '$500K ARR', value: 500_000 },
    { label: '$1M ARR', value: 1_000_000 },
    { label: '$10M ARR', value: 10_000_000 },
  ]

  const monthsToMilestone = (target: number) => {
    if (mrrGrowth <= 0 || mrrVal <= 0) return null
    const targetMRR = target / 12
    if (mrrVal >= targetMRR) return 0
    const rate = mrrGrowth / 100
    return Math.ceil(Math.log(targetMRR / mrrVal) / Math.log(1 + rate))
  }

  const fmt = (n: number) => n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(2)}M`
    : n >= 1_000 ? `$${(n / 1_000).toFixed(1)}K`
    : `$${n.toFixed(0)}`

  const inputClass = "w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-2xl px-6 py-24">
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 mb-4">Free Tool</span>
          <h1 className="text-4xl font-bold text-white mb-4">ARR Calculator</h1>
          <p className="text-lg text-gray-400">Calculate Annual Recurring Revenue and see how long until you hit your next milestone.</p>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 mb-8">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-gray-500 mb-2">Current MRR ($)</label>
              <input type="number" min="0" className={inputClass} value={mrr} onChange={e => setMrr(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-2">Last month&apos;s MRR ($)</label>
              <input type="number" min="0" className={inputClass} value={lastMrr} onChange={e => setLastMrr(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-xs text-gray-500 mb-1">ARR</p>
            <p className="text-3xl font-bold text-emerald-400">{fmt(arr)}</p>
            <p className="text-xs text-gray-600 mt-1">Annual Recurring Revenue</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-xs text-gray-500 mb-1">MRR</p>
            <p className="text-3xl font-bold text-white">{fmt(mrrVal)}</p>
            <p className="text-xs text-gray-600 mt-1">Monthly Recurring Revenue</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-xs text-gray-500 mb-1">MoM Growth</p>
            <p className={`text-3xl font-bold ${mrrGrowth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {mrrGrowth >= 0 ? '+' : ''}{mrrGrowth.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-600 mt-1">Month-over-month</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-xs text-gray-500 mb-1">ARR Growth</p>
            <p className={`text-3xl font-bold ${arrGrowth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {arrGrowth >= 0 ? '+' : ''}{arrGrowth.toFixed(1)}%
            </p>
            <p className="text-xs text-gray-600 mt-1">Month-over-month</p>
          </div>
        </div>

        {/* Milestones */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-6 mb-10">
          <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            ARR Milestone Tracker
          </h2>
          <p className="text-xs text-gray-500 mb-5">
            {mrrGrowth > 0
              ? `Based on your current ${mrrGrowth.toFixed(1)}% MoM growth rate:`
              : 'Enter last month’s MRR to see milestone projections.'}
          </p>
          <div className="space-y-3">
            {milestones.map(m => {
              const months = monthsToMilestone(m.value)
              const reached = mrrVal * 12 >= m.value
              return (
                <div key={m.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${reached ? 'bg-emerald-400' : 'bg-gray-700'}`} />
                    <span className={`text-sm font-semibold ${reached ? 'text-emerald-400' : 'text-gray-300'}`}>{m.label}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {reached ? '\u2713 Reached' : months === null ? 'Enter growth rate' : `~${months} months`}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-6 mb-10">
          <h2 className="text-sm font-bold text-white mb-3">ARR vs MRR: What&apos;s the difference?</h2>
          <div className="space-y-2 text-sm text-gray-400">
            <p><strong className="text-gray-200">MRR</strong> = Monthly Recurring Revenue. Your recurring revenue in a single month.</p>
            <p><strong className="text-gray-200">ARR</strong> = MRR &times; 12. Your recurring revenue annualized. Useful for benchmarking and fundraising.</p>
            <p><strong className="text-gray-200">Note:</strong> ARR is not the same as annual revenue &mdash; it&apos;s a forward-looking metric based on your current run rate.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Track ARR automatically</h3>
          <p className="text-gray-400 mb-6 text-sm">AI Finance Ops connects to Stripe and tracks your MRR, ARR, and growth rate in real-time &mdash; with milestone alerts.</p>
          <Link href="/register" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-all">
            Start Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
