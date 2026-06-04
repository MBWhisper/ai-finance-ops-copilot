"use client"
import { useState } from 'react'
import Link from 'next/link'
import { Plus, Trash2, ArrowRight, TrendingUp } from 'lucide-react'

interface Plan {
  id: string
  name: string
  price: string
  customers: string
  interval: 'monthly' | 'annual'
}

export function MRRCalculatorClient() {
  const [plans, setPlans] = useState<Plan[]>([
    { id: '1', name: 'Starter', price: '29', customers: '10', interval: 'monthly' },
    { id: '2', name: 'Growth', price: '79', customers: '5', interval: 'monthly' },
  ])

  const addPlan = () => {
    setPlans(p => [...p, { id: Date.now().toString(), name: '', price: '', customers: '', interval: 'monthly' }])
  }

  const removePlan = (id: string) => setPlans(p => p.filter(x => x.id !== id))

  const updatePlan = (id: string, field: keyof Plan, value: string) => {
    setPlans(p => p.map(x => x.id === id ? { ...x, [field]: value } : x))
  }

  const mrr = plans.reduce((sum, p) => {
    const price = parseFloat(p.price) || 0
    const customers = parseInt(p.customers) || 0
    const monthly = p.interval === 'annual' ? price / 12 : price
    return sum + monthly * customers
  }, 0)

  const arr = mrr * 12
  const totalCustomers = plans.reduce((s, p) => s + (parseInt(p.customers) || 0), 0)
  const arpu = totalCustomers > 0 ? mrr / totalCustomers : 0

  const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "MRR Calculator",
        applicationCategory: "BusinessApplication",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      }) }} />

      <div className="mx-auto max-w-3xl px-6 py-24">
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 mb-4">Free Tool</span>
          <h1 className="text-4xl font-bold text-white mb-4">MRR Calculator</h1>
          <p className="text-lg text-gray-400">Calculate your Monthly Recurring Revenue in seconds. Add your pricing plans and customer counts below.</p>
        </div>

        {/* Results */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: 'MRR', value: fmt(mrr), sub: 'Monthly Recurring Revenue' },
            { label: 'ARR', value: fmt(arr), sub: 'Annual Run Rate' },
            { label: 'ARPU', value: fmt(arpu), sub: 'Avg Revenue per User' },
          ].map(stat => (
            <div key={stat.label} className="rounded-xl border border-gray-800 bg-gray-900/50 p-5 text-center">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-emerald-400">{stat.value}</p>
              <p className="text-xs text-gray-600 mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Plans Input */}
        <div className="space-y-3 mb-6">
          {plans.map((plan) => (
            <div key={plan.id} className="rounded-xl border border-gray-800 bg-gray-900/50 p-4">
              <div className="grid grid-cols-12 gap-3 items-center">
                <input
                  className="col-span-3 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
                  placeholder="Plan name"
                  value={plan.name}
                  onChange={e => updatePlan(plan.id, 'name', e.target.value)}
                />
                <div className="col-span-3 relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                  <input
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 pl-7 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
                    placeholder="Price"
                    type="number"
                    min="0"
                    value={plan.price}
                    onChange={e => updatePlan(plan.id, 'price', e.target.value)}
                  />
                </div>
                <input
                  className="col-span-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none"
                  placeholder="Customers"
                  type="number"
                  min="0"
                  value={plan.customers}
                  onChange={e => updatePlan(plan.id, 'customers', e.target.value)}
                />
                <select
                  className="col-span-3 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:border-emerald-500 focus:outline-none"
                  value={plan.interval}
                  onChange={e => updatePlan(plan.id, 'interval', e.target.value)}
                >
                  <option value="monthly">Monthly</option>
                  <option value="annual">Annual</option>
                </select>
                <button
                  onClick={() => removePlan(plan.id)}
                  className="col-span-1 flex justify-center text-gray-600 hover:text-red-400 transition-colors"
                  aria-label="Remove plan"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addPlan}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-gray-700 py-3 text-sm text-gray-400 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors mb-12"
        >
          <Plus className="h-4 w-4" /> Add pricing plan
        </button>

        {/* How it works */}
        <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-8 mb-10">
          <h2 className="text-xl font-bold text-white mb-4">How MRR is calculated</h2>
          <div className="space-y-3 text-sm text-gray-400">
            <p><strong className="text-gray-200">Monthly plans:</strong> Price × Number of customers</p>
            <p><strong className="text-gray-200">Annual plans:</strong> (Annual price ÷ 12) × Number of customers</p>
            <p><strong className="text-gray-200">Total MRR:</strong> Sum of MRR from all plans</p>
            <p><strong className="text-gray-200">ARR:</strong> MRR × 12 (Annual Run Rate)</p>
            <p><strong className="text-gray-200">ARPU:</strong> MRR ÷ Total active customers</p>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
          <TrendingUp className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Track your real MRR automatically</h3>
          <p className="text-gray-400 mb-6 text-sm">Connect Stripe and AI Finance Ops tracks your MRR, ARR, churn, and cash flow in real-time — no spreadsheets, no manual calculation.</p>
          <Link href="/register" className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-all">
            Start Free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
