"use client"

import { useState } from "react"
import { ScrollReveal } from "@/components/landing-interactive"

function calculateProjection(currentMRR: number, growthRate: number, churnRate: number, months: number) {
  const data: { month: number; mrr: number }[] = []
  let mrr = currentMRR
  for (let m = 0; m <= months; m++) {
    data.push({ month: m, mrr: Math.round(mrr) })
    mrr = mrr * (1 + growthRate / 100) * (1 - churnRate / 100)
  }
  return data
}

export function MRRCalculator() {
  const [currentMRR, setCurrentMRR] = useState(5000)
  const [growthRate, setGrowthRate] = useState(10)
  const [churnRate, setChurnRate] = useState(3)
  const [months, setMonths] = useState(12)

  const projection = calculateProjection(currentMRR, growthRate, churnRate, months)
  const finalMRR = projection[projection.length - 1]?.mrr ?? currentMRR
  const totalGrowth = finalMRR - currentMRR

  return (
    <section className="border-t border-gray-800 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white">MRR Projection Calculator</h2>
            <p className="mt-4 text-lg text-gray-400">See where your revenue is headed.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 md:p-10">
            <div className="grid gap-6 sm:grid-cols-2 mb-8">
              <div>
                <label htmlFor="mrr-current" className="mb-1.5 block text-sm font-medium text-gray-300">Current MRR ($)</label>
                <input
                  id="mrr-current"
                  type="number"
                  value={currentMRR}
                  onChange={(e) => setCurrentMRR(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="mrr-growth" className="mb-1.5 block text-sm font-medium text-gray-300">Monthly growth rate (%)</label>
                <input
                  id="mrr-growth"
                  type="number"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="mrr-churn" className="mb-1.5 block text-sm font-medium text-gray-300">Monthly churn rate (%)</label>
                <input
                  id="mrr-churn"
                  type="number"
                  value={churnRate}
                  onChange={(e) => setChurnRate(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="mrr-months" className="mb-1.5 block text-sm font-medium text-gray-300">Projection period (months)</label>
                <input
                  id="mrr-months"
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(Math.max(1, Math.min(60, Number(e.target.value))))}
                  className="w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-gray-800 bg-gray-950/50 p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Current MRR</p>
                <p className="text-2xl font-bold text-white">${currentMRR.toLocaleString()}</p>
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-950/50 p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Projected MRR ({months}mo)</p>
                <p className="text-2xl font-bold text-emerald-400">${finalMRR.toLocaleString()}</p>
              </div>
              <div className="rounded-lg border border-gray-800 bg-gray-950/50 p-4 text-center">
                <p className="text-xs text-gray-400 mb-1">Total growth</p>
                <p className={`text-2xl font-bold ${totalGrowth >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {totalGrowth >= 0 ? "+" : ""}${totalGrowth.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="flex gap-1 min-w-[300px]" style={{ height: "160px", alignItems: "flex-end" }}>
                {projection.map((d, i) => {
                  const maxMrr = Math.max(...projection.map((p) => p.mrr), 1)
                  const heightPct = (d.mrr / maxMrr) * 100
                  return (
                    <div
                      key={i}
                      className="relative flex-1 transition-all duration-300"
                      style={{ height: `${Math.max(heightPct, 2)}%` }}
                      title={`Month ${d.month}: $${d.mrr.toLocaleString()}`}
                    >
                      <div
                        className={`absolute bottom-0 w-full rounded-t ${i === 0 ? "bg-emerald-500/40" : "bg-emerald-500/60 hover:bg-emerald-500"} transition-colors`}
                        style={{ height: "100%" }}
                      />
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Month 0</span>
                <span>Month {months}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
