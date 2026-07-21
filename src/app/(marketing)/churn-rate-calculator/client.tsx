"use client"
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, AlertTriangle, CheckCircle } from 'lucide-react'

export function ChurnCalculatorClient() {
  const [startCustomers, setStartCustomers] = useState('100')
  const [lostCustomers, setLostCustomers] = useState('5')
  const [startMRR, setStartMRR] = useState('10000')
  const [lostMRR, setLostMRR] = useState('600')
  const [expansionMRR, setExpansionMRR] = useState('200')

  const start = parseInt(startCustomers) || 0
  const lost = parseInt(lostCustomers) || 0
  const sMRR = parseFloat(startMRR) || 0
  const lMRR = parseFloat(lostMRR) || 0
  const eMRR = parseFloat(expansionMRR) || 0

  const customerChurn = start > 0 ? (lost / start) * 100 : 0
  const revenueChurn = sMRR > 0 ? (lMRR / sMRR) * 100 : 0
  const nrr = sMRR > 0 ? ((sMRR - lMRR + eMRR) / sMRR) * 100 : 0
  const annualChurn = customerChurn * 12

  const getChurnHealth = (rate: number) => {
    if (rate < 2) return { label: 'Excellent', color: 'text-emerald-400', icon: 'good' }
    if (rate < 5) return { label: 'Good', color: 'text-emerald-400', icon: 'good' }
    if (rate < 8) return { label: 'Average', color: 'text-amber-400', icon: 'warn' }
    return { label: 'High — needs attention', color: 'text-red-400', icon: 'bad' }
  }

  const health = getChurnHealth(customerChurn)

  const inputClass = "w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <div className="mx-auto max-w-2xl px-6 py-24">
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 mb-4">Free Tool</span>
          <h1 className="text-4xl font-bold text-white mb-4">Churn Rate Calculator</h1>
          <p className="text-lg text-gray-400">Calculate customer churn, revenue churn, and net revenue retention for any period.</p>
        </div>

        {/* Inputs */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-300 mb-5 uppercase tracking-wider">Customer Churn</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="churn-start-customers" className="block text-xs text-gray-500 mb-2">Customers at start of period</label>
              <input id="churn-start-customers" type="number" min="0" className={inputClass} value={startCustomers} onChange={e => setStartCustomers(e.target.value)} />
            </div>
            <div>
              <label htmlFor="churn-lost-customers" className="block text-xs text-gray-500 mb-2">Customers lost this period</label>
              <input id="churn-lost-customers" type="number" min="0" className={inputClass} value={lostCustomers} onChange={e => setLostCustomers(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 mb-8">
          <h2 className="text-sm font-semibold text-gray-300 mb-5 uppercase tracking-wider">Revenue Churn (MRR)</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="churn-start-mrr" className="block text-xs text-gray-500 mb-2">MRR at start of period ($)</label>
              <input id="churn-start-mrr" type="number" min="0" className={inputClass} value={startMRR} onChange={e => setStartMRR(e.target.value)} />
            </div>
            <div>
              <label htmlFor="churn-lost-mrr" className="block text-xs text-gray-500 mb-2">MRR lost this period ($)</label>
              <input id="churn-lost-mrr" type="number" min="0" className={inputClass} value={lostMRR} onChange={e => setLostMRR(e.target.value)} />
            </div>
          </div>
          <div>
              <label htmlFor="churn-expansion-mrr" className="block text-xs text-gray-500 mb-2">Expansion MRR this period (upgrades, $)</label>
              <input id="churn-expansion-mrr" type="number" min="0" className={inputClass} value={expansionMRR} onChange={e => setExpansionMRR(e.target.value)} />
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-xs text-gray-500 mb-1">Customer Churn Rate</p>
            <p className={`text-3xl font-bold ${health.color}`}>{customerChurn.toFixed(2)}%</p>
            <p className="text-xs text-gray-600 mt-1">per month</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-xs text-gray-500 mb-1">Revenue Churn Rate</p>
            <p className="text-3xl font-bold text-amber-400">{revenueChurn.toFixed(2)}%</p>
            <p className="text-xs text-gray-600 mt-1">per month</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-xs text-gray-500 mb-1">Net Revenue Retention</p>
            <p className={`text-3xl font-bold ${nrr >= 100 ? 'text-emerald-400' : 'text-red-400'}`}>{nrr.toFixed(1)}%</p>
            <p className="text-xs text-gray-600 mt-1">{nrr >= 100 ? 'Negative churn!' : 'Below 100% = shrinking'}</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-5">
            <p className="text-xs text-gray-500 mb-1">Annualized Churn</p>
            <p className={`text-3xl font-bold ${health.color}`}>{Math.min(annualChurn, 100).toFixed(1)}%</p>
            <p className="text-xs text-gray-600 mt-1">projected per year</p>
          </div>
        </div>

        {/* Health indicator */}
        <div className={`rounded-xl border p-5 mb-10 flex items-start gap-3 ${
          health.icon === 'good' ? 'border-emerald-500/20 bg-emerald-500/5' : health.icon === 'warn' ? 'border-amber-500/20 bg-amber-500/5' : 'border-red-500/20 bg-red-500/5'
        }`}>
          {health.icon === 'good' ? <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" /> : <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />}
          <div>
            <p className={`text-sm font-semibold ${health.color}`}>Churn health: {health.label}</p>
            <p className="text-xs text-gray-400 mt-1">
              {customerChurn < 2 ? 'Best-in-class SaaS churn. Keep doing what you\'re doing.' :
               customerChurn < 5 ? 'Healthy churn for an early-stage SaaS.' :
               customerChurn < 8 ? 'Worth investigating — aim to get below 5% monthly churn.' :
               'High churn will limit your growth. Investigate reasons customers are leaving immediately.'}
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Track churn automatically</h3>
          <p className="text-gray-400 mb-6 text-sm">AI Finance Ops connects to Stripe and tracks your churn rate, NRR, and customer health automatically — with alerts when churn spikes.</p>
          <Link href="/register" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-all">
            Start Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
