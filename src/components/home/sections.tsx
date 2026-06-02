"use client"

import { ScrollReveal, TestimonialCarousel, FaqAccordion, AnimatedCounter } from "@/components/landing-interactive"
import { Check } from "lucide-react"
import Link from "next/link"

export function SocialProofSection() {
  const logos = [
    {
      name: "Product Hunt",
      svg: (
        <svg viewBox="0 0 20 20" className="h-6 w-6" fill="currentColor">
          <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm2.5 11.5H9V8h3.5a1.5 1.5 0 010 3z" />
        </svg>
      ),
    },
    {
      name: "Indie Hackers",
      svg: (
        <svg viewBox="0 0 20 20" className="h-6 w-6" fill="currentColor">
          <circle cx="10" cy="10" r="9" strokeWidth="1" fill="none" stroke="currentColor" />
          <path d="M6 7h2v6H6zm6 0h2v6h-2zm-3 2h2v2H9zm0-4h2v2H9z" />
        </svg>
      ),
    },
    {
      name: "Hacker News",
      svg: (
        <svg viewBox="0 0 20 20" className="h-6 w-6" fill="currentColor">
          <rect x="2" y="2" width="16" height="16" rx="3" strokeWidth="1" fill="none" stroke="currentColor" />
          <path d="M6 7l2.5 4.5V13h3v-1.5L14 7h-2l-2 3.5L8 7H6z" />
        </svg>
      ),
    },
    {
      name: "Y Combinator",
      svg: (
        <svg viewBox="0 0 20 20" className="h-6 w-6" fill="currentColor">
          <rect x="2" y="2" width="16" height="16" rx="2" strokeWidth="1" fill="none" stroke="currentColor" />
          <path d="M6 6l2.5 4.5V14h3v-3.5L14 6h-2l-2 3.5L8 6H6z" />
        </svg>
      ),
    },
    {
      name: "TechCrunch",
      svg: (
        <svg viewBox="0 0 20 20" className="h-6 w-6" fill="currentColor">
          <rect x="3" y="3" width="14" height="14" rx="2" strokeWidth="1" fill="none" stroke="currentColor" />
          <path d="M6 8h8v1.5H6zm0 3h6v1.5H6z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="border-t border-gray-800/50 bg-gray-900/80 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-gray-400">
            As featured on
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center gap-2 text-gray-400 opacity-50 grayscale transition-all duration-300 hover:opacity-80 hover:grayscale-0"
              >
                {logo.svg}
                <span className="text-sm font-semibold tracking-tight">{logo.name}</span>
              </div>
            ))}
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
    { label: "Churn tracking", desc: "know before it's too late" },
    { label: "90-day cash flow forecast", desc: "plan with confidence" },
    { label: "AI revenue insights", desc: "not just data, but direction" },
    { label: "5-minute setup", desc: "connect Stripe and you're done" },
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
            <ScrollReveal key={feat.label} delay={i * 100} className={i === 4 ? 'md:col-span-2' : ''}>
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
                  <th className="pb-4 pr-4 text-sm font-semibold text-gray-400" />
                  <th className="pb-4 px-4 text-sm font-semibold text-emerald-400">aifinanceops</th>
                  <th className="pb-4 px-4 text-sm font-semibold text-gray-400">Baremetrics</th>
                  <th className="pb-4 px-4 text-sm font-semibold text-gray-400">ChartMogul</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b border-gray-800/50">
                    <td className="py-4 pr-4 text-sm text-gray-400 font-medium">{row.label}</td>
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
                  <p className="text-sm text-gray-400 leading-relaxed">Connect your Stripe account and we handle the rest. No CSV exports, no manual mapping.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">No accounting degree required</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">We translate GAAP into plain English. If you understand MRR and burn, you understand this dashboard.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">Built by a founder, in public</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">No VC pressure, no enterprise roadmap. Just a fellow founder solving a real cash flow problem.</p>
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
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-1 text-sm font-semibold text-white">
                    Recommended
                  </div>
                )}
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="mt-2 text-sm text-gray-400">{plan.desc}</p>
                <div className="mt-6">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400">/mo</span>
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
                  <span className={`flex w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all ${plan.highlighted ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-600/25" : "border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"}`}>
                    Start Free Trial
                  </span>
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal>
          <p className="mt-8 text-center text-sm text-gray-400">14-day free trial &bull; No credit card required &bull; Cancel anytime</p>
        </ScrollReveal>
      </div>
    </section>
  )
}

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Chen",
      role: "Founder @ NexusMetrics",
      avatar: "https://ui-avatars.com/api/?name=Alex+Chen&background=random",
      text: "Finally a tool that gives me real cash flow visibility. Saved me 5+ hours every week on financial reporting.",
    },
    {
      name: "Sarah Mitchell",
      role: "CEO @ GrowthStack",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Mitchell&background=random",
      text: "The 90-day forecast alone is worth the subscription. I can now predict runway 3 months ahead with confidence.",
    },
    {
      name: "Marcus Rodriguez",
      role: "Co-founder @ CloudPipe",
      avatar: "https://ui-avatars.com/api/?name=Marcus+Rodriguez&background=random",
      text: "Stripe + LemonSqueezy in one dashboard. The MRR tracking is incredibly accurate.",
    },
    {
      name: "Emily Watson",
      role: "Founder @ DataFlow",
      avatar: "https://ui-avatars.com/api/?name=Emily+Watson&background=random",
      text: "Best investment for any SaaS founder. The churn alerts alone saved me 2 customers last month.",
    },
    {
      name: "James Park",
      role: "CTO @ ScaleUp",
      avatar: "https://ui-avatars.com/api/?name=James+Park&background=random",
      text: "Setup took 5 minutes. Dashboard was live immediately. The AI insights are surprisingly accurate.",
    },
  ]

  return (
    <section id="testimonials" className="border-t border-gray-800 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white">Loved by SaaS Founders</h2>
            <p className="mt-4 text-lg text-gray-400">Real founders, real results.</p>
          </div>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 100}>
              <div className="flex h-full flex-col rounded-xl border border-gray-800 bg-gray-900/50 p-6 shadow-sm transition-colors hover:border-gray-700">
                <div className="mb-3 flex gap-0.5">
                  {[...Array(5)].map((_, si) => (
                    <svg key={si} className="h-4 w-4 fill-amber-500 text-amber-500" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <svg className="mb-3 h-6 w-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                </svg>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-300">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-10 w-10 rounded-full"
                    width={40}
                    height={40}
                    loading="lazy"
                    style={{ background: 'transparent' }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StatsSection() {
  return (
    <section className="border-t border-gray-800 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="grid gap-8 md:grid-cols-3">
            <AnimatedCounter target={200} suffix="+" label="Founders using AI Finance Ops" />
            <AnimatedCounter target={2000000} suffix="+" label="MRR tracked" prefix="$" />
            <AnimatedCounter target={12000} suffix="+" label="Invoices processed" />
          </div>
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
