"use client"

import { ScrollReveal, AnimatedCounter } from "@/components/landing-interactive"
import { Check, BarChart3, TrendingUp, Receipt, ArrowRight } from "lucide-react"
import Link from "next/link"

export function SocialProofSection() {
  return (
    <section className="border-t border-gray-800 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="mb-10 text-center text-sm font-medium uppercase tracking-widest text-gray-500">
            Trusted by 200+ SaaS founders
          </p>
        </ScrollReveal>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-12">
          <AnimatedCounter target={200} suffix="+" label="Active founders" />
          <AnimatedCounter target={12} suffix="M+" label="MRR tracked" />
          <AnimatedCounter target={98} suffix="%" label="Would recommend" />
          <AnimatedCounter target={47} suffix="K" label="Invoices processed" />
        </div>
      </div>
    </section>
  )
}

export function ProblemSection() {
  const cards = [
    { emoji: "😰", bg: "bg-red-500/10", title: "I don't know if I can make payroll next month", desc: "Cash runway is a guessing game. You have revenue coming in but no clear picture of when the money runs out." },
    { emoji: "📊", bg: "bg-amber-500/10", title: "My spreadsheet is always 2 weeks behind", desc: "Manual data entry is error-prone and stale. By the time you update your models, the numbers have already changed." },
    { emoji: "🎯", bg: "bg-purple-500/10", title: "I have no idea what my real MRR is", desc: "Between refunds, upgrades, downgrades, and failed payments — calculating real MRR requires more than just adding up invoices." },
  ]

  return (
    <section className="border-t border-gray-800 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Sound familiar?</h2>
            <p className="mt-4 text-lg text-gray-400">The struggles every SaaS founder knows too well.</p>
          </div>
        </ScrollReveal>
        <div className="grid gap-8 md:grid-cols-3">
          {cards.map((card, i) => (
            <ScrollReveal key={card.title} delay={i * 100}>
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 hover:border-gray-700 transition-colors group">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${card.bg} group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{card.emoji}</span>
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturesSection() {
  const features = [
    { icon: BarChart3, color: "text-emerald-400", bg: "bg-emerald-500/10", title: "MRR & KPI Dashboard", desc: "Real-time MRR, ARR, churn rate, and LTV — automatically calculated from your billing data. No manual entry required." },
    { icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-500/10", title: "Cash Flow Forecast P50/P80/P95", desc: "30/60/90 day projections with confidence bands. Know your best, expected, and worst case runway scenarios." },
    { icon: Receipt, color: "text-amber-400", bg: "bg-amber-500/10", title: "Accounts Receivable + Smart Reminders", desc: "Track overdue invoices, send automated payment reminders, and reduce DSO with AI-powered AR management." },
  ]

  return (
    <section id="features" className="border-t border-gray-800 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white">Built for SaaS founders who need answers now</h2>
            <p className="mt-4 text-lg text-gray-400">Everything you need to understand your financial health at a glance.</p>
          </div>
        </ScrollReveal>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feat, i) => (
            <ScrollReveal key={feat.title} delay={i * 100}>
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 hover:border-gray-700 transition-colors group">
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${feat.bg} group-hover:scale-110 transition-transform`}>
                  <feat.icon className={`h-7 w-7 ${feat.color}`} />
                </div>
                <h3 className="mb-3 text-lg font-semibold text-white">{feat.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
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
          <div id="testimonial-carousel" />
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
      </div>
    </section>
  )
}
