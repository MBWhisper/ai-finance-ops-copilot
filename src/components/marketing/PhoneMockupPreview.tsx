"use client"

import { ScrollReveal } from "@/components/landing-interactive"

const bars = [35, 55, 45, 70, 60, 85]

const features = [
  "Live MRR & ARR tracking",
  "Cash flow forecast with AI",
  "PayPal + bank sync",
  "Churn & revenue analytics",
]

export function PhoneMockupPreview() {
  return (
    <section className="overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          <div className="flex-1 max-w-lg text-center lg:text-left">
            <ScrollReveal>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-400/10 rounded-full px-3 py-1 mb-4">
                Real-time dashboard
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                Your finances.<br />
                <span className="text-emerald-400">Always up to date.</span>
              </h2>
              <p className="text-gray-400 text-base mb-8 leading-relaxed">
                Connect PayPal + your bank in 60 seconds.
                AI Finance Ops tracks your MRR, cash flow,
                and runway — automatically.
              </p>
              <ul className="space-y-3 mb-8">
                {features.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/register"
                className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-full transition-colors min-h-[44px] text-base"
              >
                Start Free — No Credit Card
              </a>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={200}>
            <div className="relative flex-shrink-0 lg:rotate-2">
              <div className="absolute inset-0 -z-10 bg-emerald-500/10 blur-3xl rounded-full scale-75" />

              <div className="relative w-[260px] sm:w-[280px] rounded-[3rem] bg-gray-900 border-[6px] border-gray-700 shadow-2xl shadow-black/60 overflow-hidden">
                <div className="bg-gray-950 h-8 flex items-center justify-center">
                  <div className="w-20 h-4 bg-gray-800 rounded-full" />
                </div>

                <div className="bg-gray-950 px-3 py-3 space-y-3">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <p className="text-xs text-gray-500">Good morning 👋</p>
                      <p className="text-sm font-semibold text-white">Dashboard</p>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center">
                      <span className="text-xs font-bold text-white">A</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-800 rounded-2xl p-3">
                      <p className="text-[10px] text-gray-500 mb-1">MRR</p>
                      <p className="text-base font-bold text-white">$12,480</p>
                      <p className="text-[10px] text-emerald-400 mt-0.5">↑ 18%</p>
                    </div>
                    <div className="bg-gray-800 rounded-2xl p-3">
                      <p className="text-[10px] text-gray-500 mb-1">ARR</p>
                      <p className="text-base font-bold text-white">$149.7k</p>
                      <p className="text-[10px] text-emerald-400 mt-0.5">↑ 12%</p>
                    </div>
                    <div className="bg-gray-800 rounded-2xl p-3">
                      <p className="text-[10px] text-gray-500 mb-1">Churn</p>
                      <p className="text-base font-bold text-white">3.2%</p>
                      <p className="text-[10px] text-red-400 mt-0.5">↓ 0.4%</p>
                    </div>
                    <div className="bg-gray-800 rounded-2xl p-3">
                      <p className="text-[10px] text-gray-500 mb-1">Runway</p>
                      <p className="text-base font-bold text-white">14 mo</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Cash safe</p>
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-2xl p-3">
                    <p className="text-[10px] text-gray-500 mb-2">Revenue — last 6 months</p>
                    <div className="flex items-end gap-1 h-10">
                      {bars.map((h, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-sm ${i === 5 ? "bg-emerald-500" : "bg-gray-600"}`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-800 rounded-2xl p-3 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-[9px] font-bold text-white">PP</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-white font-medium truncate">PayPal Business</p>
                      <p className="text-[9px] text-gray-500">Synced 2 min ago</p>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  </div>
                </div>

                <div className="bg-gray-950 h-6 flex items-center justify-center">
                  <div className="w-20 h-1 bg-gray-700 rounded-full" />
                </div>
              </div>

              <div className="absolute -bottom-3 -right-3 bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                ✓ Live data
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
