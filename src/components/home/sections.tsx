"use client"

import { ScrollReveal, TestimonialCarousel, FaqAccordion } from "@/components/landing-interactive"
import { Check } from "lucide-react"
import Link from "next/link"

export function SocialProofSection() {
  return (
    <section className="border-t border-gray-800 px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              5 min setup
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              Real-time data
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-500" />
              Free to start
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export function ProblemSection() {
  return (
    <section className="border-t border-gray-800 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-10 md:p-14 text-center">
            <p className="text-xl text-gray-300 leading-relaxed">
              You&apos;re building a SaaS. You shouldn&apos;t be rebuilding your revenue report every month.
            </p>
            <div className="mt-8 space-y-4 text-left max-w-2xl mx-auto">
              <div className="flex items-start gap-4 rounded-lg border border-gray-800 bg-gray-900/50 p-5">
                <span className="text-xl shrink-0 mt-0.5">📊</span>
                <p className="text-gray-400 text-sm"><strong className="text-gray-200">ChartMogul</strong> is built for enterprise.</p>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-gray-800 bg-gray-900/50 p-5">
                <span className="text-xl shrink-0 mt-0.5">💰</span>
                <p className="text-gray-400 text-sm"><strong className="text-gray-200">Baremetrics</strong> costs more than your first paying customer.</p>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-5">
                <span className="text-xl shrink-0 mt-0.5">✅</span>
                <p className="text-emerald-300 text-sm"><strong className="text-emerald-200">aifinanceops</strong> gives you everything you need — and nothing you don&apos;t.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export function FeaturesSection() {
  const features = [
    { label: "MRR & ARR", desc: "updated in real-time" },
    { label: "Churn tracking", desc: "know before it&apos;s too late" },
    { label: "90-day cash flow forecast", desc: "plan with confidence" },
    { label: "AI revenue insights", desc: "not just data, but direction" },
    { label: "5-minute setup", desc: "connect Stripe and you&apos;re done" },
  ]

  return (
    <section id="features" className="border-t border-gray-800 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Everything you need. Nothing you don&apos;t.</h2>
            <p className="mt-4 text-lg text-gray-400">No enterprise bloat. Just the metrics that keep your SaaS alive.</p>
          </div>
        </ScrollReveal>
        <div className="grid gap-4 md:grid-cols-2 max-w-2xl mx-auto">
          {features.map((feat, i) => (
            <ScrollReveal key={feat.label} delay={i * 100}>
              <div className="flex items-center gap-4 rounded-xl border border-gray-800 bg-gray-900/50 p-5 hover:border-gray-700 transition-colors">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Check className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-white">{feat.label}</span>
                  <span className="text-sm text-gray-400"> — {feat.desc}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ComparisonTableSection() {
  const rows = [
    { label: "Price", values: ["From $29", "From $79", "From $199"] },
    { label: "Free Plan", values: ["✅", "❌", "❌"] },
    { label: "AI Forecasting", values: ["✅", "❌", "❌"] },
    { label: "Setup time", values: ["5 minutes", "30 minutes", "2+ hours"] },
    { label: "Built for", values: ["Founders", "SMB teams", "Enterprise"] },
  ]

  return (
    <section className="border-t border-gray-800 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Compare your options</h2>
            <p className="mt-4 text-lg text-gray-400">Honest pricing. No hidden complexity.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="pb-4 pr-4 text-sm font-semibold text-gray-500" />
                  <th className="pb-4 px-4 text-sm font-semibold text-emerald-400">aifinanceops</th>
                  <th className="pb-4 px-4 text-sm font-semibold text-gray-400">Baremetrics</th>
                  <th className="pb-4 px-4 text-sm font-semibold text-gray-400">ChartMogul</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-gray-800/50">
                    <td className="py-4 pr-4 text-sm text-gray-500 font-medium">{row.label}</td>
                    {row.values.map((v, i) => (
                      <td
                        key={i}
                        className={`py-4 px-4 text-sm ${i === 0 ? "text-emerald-300 font-medium" : "text-gray-400"}`}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export function ReassuranceSection() {
  return (
    <section className="border-t border-gray-800 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-10 md:p-14">
            <h2 className="text-2xl font-bold text-white mb-2">Built for early-stage SaaS, not enterprises</h2>
            <p className="text-gray-400 mb-10">No sales calls. No implementation teams. No BS.</p>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">Stripe-native setup</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">Connect your Stripe account and we handle the rest. No CSV exports, no manual mapping.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">No accounting degree required</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">We translate GAAP into plain English. If you understand MRR and burn, you understand this dashboard.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">Built by a founder, in public</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">No VC pressure, no enterprise roadmap. Just a fellow founder solving a real cash flow problem.</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export function PricingSection() {
  const plans = [
    { name: "Starter", price: 29, desc: "For solo founders getting started", features: ["1 workspace", "KPI dashboard (MRR, ARR, Churn)", "30-day cash flow forecast", "Single billing integration", "Email support"], highlighted: false },
    { name: "Growth", price: 79, desc: "For growing SaaS teams", features: ["3 workspaces", "Everything in Starter", "90-day P50/P80/P95 forecast", "Multiple billing integrations", "Smart AR reminders", "Priority support"], highlighted: true },
    { name: "Scale", price: 199, desc: "For established businesses", features: ["Unlimited workspaces", "Everything in Growth", "API access & webhooks", "AI-powered insights", "Custom integrations", "Dedicated account manager"], highlighted: false },
  ]

  return (
    <section id="pricing" className="border-t border-gray-800 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Simple, transparent pricing</h2>
            <p className="mt-4 text-lg text-gray-400">Start free. Upgrade when you need more power.</p>
          </div>
        </ScrollReveal>
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 100}>
              <div className={`relative flex flex-col rounded-2xl p-8 ${plan.highlighted ? "border-2 border-emerald-500 bg-gray-900 shadow-xl shadow-emerald-500/10" : "border border-gray-800 bg-gray-900/50"} hover:border-emerald-500/50 transition-colors`}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-sm font-semibold text-white">
                    Recommended
                  </div>
                )}
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-400">{plan.desc}</p>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <ul className="mt-8 flex-1 space-y-4">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                      <span className="text-sm text-gray-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="mt-8 block">
                  <span className={`flex w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all ${plan.highlighted ? "bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/25" : "border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"}`}>
                    Start Free Trial
                  </span>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <p className="mt-8 text-center text-sm text-gray-500">14-day free trial &bull; No credit card required &bull; Cancel anytime</p>
        </ScrollReveal>
      </div>
    </section>
  )
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="border-t border-gray-800 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white">Loved by SaaS founders</h2>
            <p className="mt-4 text-lg text-gray-400">Real founders, real results.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <TestimonialCarousel />
        </ScrollReveal>
      </div>
    </section>
  )
}

export function FAQSection() {
  return (
    <section id="faq" className="border-t border-gray-800 px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white">Frequently asked questions</h2>
            <p className="mt-4 text-lg text-gray-400">Everything you need to know.</p>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <FaqAccordion />
        </ScrollReveal>
      </div>
    </section>
  )
}
