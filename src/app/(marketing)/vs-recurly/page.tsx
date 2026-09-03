import type { Metadata } from "next"
import Link from "next/link"
import { Check, ArrowRight, DollarSign, AlertTriangle } from "lucide-react"
import { FaqSchema } from "@/components/FaqSchema"
import { InternalLinks } from "@/components/InternalLinks"

export const metadata: Metadata = {
  title: "AI Finance Ops vs Recurly | Simpler SaaS Billing (2026)",
  description: "Compare AI Finance Ops vs Recurly. AI Finance Ops connects to your existing Stripe setup — no migration needed. Free MRR tracking, churn alerts, and AI forecasting.",
  alternates: { canonical: "https://aifinanceops.app/vs-recurly" },
  openGraph: {
    title: "AI Finance Ops vs Recurly | SaaS Analytics Without Migration",
    description: "Keep Stripe. Add AI Finance Ops for real-time MRR, churn, and forecasting. No billing migration needed.",
    url: "https://aifinanceops.app/vs-recurly",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Finance Ops vs Recurly" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Finance Ops vs Recurly (2026)",
    description: "No billing migration. Keep Stripe, add AI Finance Ops for real-time SaaS analytics.",
    images: ["/og-image.png"],
  },
}

const COMPARISON_ROWS = [
  { label: "Price", ours: "Free plan + from $29/mo", theirs: "From $249/mo + 0.9% revenue" },
  { label: "Free Plan", ours: "✅ Full MRR tracking free", theirs: "❌ No free plan" },
  { label: "Stripe Migration Required", ours: "❌ Keep your Stripe setup", theirs: "✅ Full billing migration needed" },
  { label: "AI Forecasting", ours: "✅ 90-day cash flow", theirs: "❌ Not available" },
  { label: "Setup time", ours: "2 minutes", theirs: "Weeks (migration + testing)" },
  { label: "Churn Analytics", ours: "✅ Real-time + alerts", theirs: "✅ Basic reporting" },
  { label: "Revenue share fee", ours: "❌ No percentage fee", theirs: "✅ 0.9% of revenue" },
  { label: "Built for", ours: "Solo founders & early-stage", theirs: "Enterprise billing teams" },
]

const REASONS = [
  {
    number: "1",
    title: "Recurly charges 0.9% of your revenue",
    desc: "At $50k MRR, Recurly's 0.9% revenue share costs you $450/mo — before the base fee. AI Finance Ops has flat pricing with no percentage cut of your revenue. Ever.",
  },
  {
    number: "2",
    title: "No migration — keep your Stripe setup",
    desc: "Switching to Recurly means migrating your entire billing stack — customers, subscriptions, payment methods. Weeks of engineering work. AI Finance Ops connects read-only to your existing Stripe account in 2 minutes.",
  },
  {
    number: "3",
    title: "Free plan with full MRR tracking",
    desc: "Recurly starts at $249/mo with no free option. AI Finance Ops gives you complete MRR tracking, churn monitoring, and LTV calculation on the free plan — no credit card required.",
  },
]

export default function VsRecurlyPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-gray-950 to-gray-950" />
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-emerald-500/10 blur-3xl" />
          </div>
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6">
              Comparison
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              AI Finance Ops vs Recurly
            </h1>
            <p className="mt-6 text-xl leading-8 text-gray-400 max-w-2xl mx-auto">
              Recurly is a full billing platform that requires migrating away from Stripe and costs $249+/mo.
              AI Finance Ops connects to your existing Stripe in 2 minutes — free to start.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center rounded-lg bg-emerald-500 px-8 py-4 text-base font-semibold text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25"
              >
                Start Free — No Credit Card
              </Link>
              <Link
                href="/mrr-tracker"
                className="inline-flex items-center rounded-lg border border-gray-700 px-8 py-4 text-base font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
              >
                See MRR Tracker
              </Link>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white text-center mb-4">Feature comparison</h2>
            <p className="text-gray-400 text-center mb-12">AI Finance Ops vs Recurly — analytics without the migration.</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/50">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th scope="col" className="p-5 text-sm font-semibold text-gray-500 w-1/3" />
                    <th scope="col" className="p-5 text-sm font-semibold text-emerald-400 w-1/3">AI Finance Ops</th>
                    <th scope="col" className="p-5 text-sm font-semibold text-gray-400 w-1/3">Recurly</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => (
                    <tr key={row.label} className="border-b border-gray-800/50 last:border-0">
                      <td className="p-5 text-sm text-gray-500 font-medium">{row.label}</td>
                      <td className="p-5 text-sm text-emerald-300 font-medium">{row.ours}</td>
                      <td className="p-5 text-sm text-gray-400">{row.theirs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 3 Reasons */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-white text-center mb-4">3 reasons to choose AI Finance Ops over Recurly</h2>
            <p className="text-gray-400 text-center mb-16">Especially if you are already on Stripe.</p>
            <div className="grid gap-8 md:grid-cols-3">
              {REASONS.map((r) => (
                <div key={r.number} className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8 hover:border-gray-700 transition-colors">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-xl font-bold text-emerald-400">
                    {r.number}
                  </div>
                  <h3 className="mb-3 text-lg font-semibold text-white">{r.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What is Recurly */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-6">What is Recurly?</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Recurly is a subscription billing platform founded in 2009. It handles subscription management, payment processing, and revenue recognition for SaaS companies. Unlike AI Finance Ops, Recurly is a full billing platform — meaning you'd need to migrate your entire billing stack from Stripe to Recurly.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              Recurly charges a base fee starting at $249/mo plus 0.9% of your revenue. For a SaaS company doing $50k MRR, that's $450/mo in revenue share alone — on top of the base fee. Over a year, that's $5,400+ in fees.
            </p>
            <p className="text-gray-400 leading-relaxed">
              The migration process takes weeks: you need to move customers, subscriptions, payment methods, and historical data. Any mistakes can result in failed charges and angry customers.
            </p>
          </div>
        </section>

        {/* Real Cost Calculator */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white text-center mb-4">The real cost of Recurly</h2>
            <p className="text-gray-400 text-center mb-12">See how Recurly's 0.9% revenue share adds up as you grow.</p>
            <div className="overflow-x-auto rounded-2xl border border-gray-800 bg-gray-900/50">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th scope="col" className="p-5 text-sm font-semibold text-gray-500">Your MRR</th>
                    <th scope="col" className="p-5 text-sm font-semibold text-gray-500">Recurly 0.9% Fee</th>
                    <th scope="col" className="p-5 text-sm font-semibold text-gray-500">Annual Cost</th>
                    <th scope="col" className="p-5 text-sm font-semibold text-emerald-400">AI Finance Ops</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { mrr: "$10,000", fee: "$90/mo", annual: "$1,080/yr", ours: "Free" },
                    { mrr: "$25,000", fee: "$225/mo", annual: "$2,700/yr", ours: "$29/mo" },
                    { mrr: "$50,000", fee: "$450/mo", annual: "$5,400/yr", ours: "$29/mo" },
                    { mrr: "$100,000", fee: "$900/mo", annual: "$10,800/yr", ours: "$99/mo" },
                    { mrr: "$250,000", fee: "$2,250/mo", annual: "$27,000/yr", ours: "$99/mo" },
                  ].map((row) => (
                    <tr key={row.mrr} className="border-b border-gray-800/50 last:border-0">
                      <td className="p-5 text-gray-300 font-medium">{row.mrr}</td>
                      <td className="p-5 text-red-400">{row.fee}</td>
                      <td className="p-5 text-red-400">{row.annual}</td>
                      <td className="p-5 text-emerald-400 font-semibold">{row.ours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              <AlertTriangle className="h-4 w-4 inline mr-1" />
              Recurly's 0.9% fee is on top of their base fee ($249-$599/mo). AI Finance Ops has flat pricing with no percentage fee.
            </p>
          </div>
        </section>

        {/* Migration Comparison */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-24">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Migration: Recurly vs AI Finance Ops</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-red-400" />
                  Switching to Recurly
                </h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Migrate all customers to new billing system
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Move payment methods and subscriptions
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Test all billing flows (upgrades, downgrades, cancellations)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Update your codebase and integrations
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Risk of failed charges during migration
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400">•</span>
                    Timeline: 2-6 weeks of engineering work
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-8">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-400" />
                  Adding AI Finance Ops
                </h3>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    Connect Stripe via OAuth (read-only)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    Automatic data sync — no migration needed
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    Keep your existing billing setup unchanged
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    Zero risk to your current revenue
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    MRR, churn, and forecasting ready in minutes
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    Timeline: 2 minutes
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                { q: "Can I use AI Finance Ops with Recurly?", a: "AI Finance Ops connects directly to Stripe, not Recurly. If you're already using Recurly, you'd need to keep both tools. AI Finance Ops is designed as an alternative to migrating to Recurly in the first place." },
                { q: "How much does Recurly really cost?", a: "Recurly starts at $249/mo plus 0.9% of your revenue. At $50k MRR, that's $450/mo in revenue share alone. At $100k MRR, it's $900/mo. AI Finance Ops has flat pricing with no percentage fee." },
                { q: "Why would someone choose Recurly over AI Finance Ops?", a: "Recurly is a full billing platform — it processes payments, manages subscriptions, and handles revenue recognition. AI Finance Ops is an analytics layer that connects to your existing Stripe. If you need a billing platform, Recurly is the right choice. If you need analytics, AI Finance Ops is simpler and cheaper." },
                { q: "Is migrating to Recurly risky?", a: "Yes. Migration involves moving customers, payment methods, and subscription data. Any mistakes can result in failed charges, lost revenue, and angry customers. Most migrations take 2-6 weeks of engineering work." },
              ].map((item) => (
                <div key={item.q} className="border border-gray-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{item.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-16">
          <InternalLinks variant="mixed" exclude="/vs-recurly" title="Related SaaS Finance Tools" limit={8} />
        </section>

        {/* Final CTA */}
        <section className="border-t border-gray-800 px-6 py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold text-white">Keep Stripe. Get better analytics.</h2>
            <p className="mt-4 text-lg text-gray-400">Connect in 2 minutes. No migration. No percentage fee. Free to start.</p>
            <Link href="/register" className="mt-10 inline-flex">
              <span className="group inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-10 py-4 text-lg font-semibold text-white hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/25">
                Start Free Today <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </section>
      </main>
    </div>
    <FaqSchema items={[
      { question: "Can I use AI Finance Ops with Recurly?", answer: "AI Finance Ops connects directly to Stripe, not Recurly. If you're already using Recurly, you'd need to keep both tools. AI Finance Ops is designed as an alternative to migrating to Recurly in the first place." },
      { question: "How much does Recurly really cost?", answer: "Recurly starts at $249/mo plus 0.9% of your revenue. At $50k MRR, that's $450/mo in revenue share alone. At $100k MRR, it's $900/mo. AI Finance Ops has flat pricing with no percentage fee." },
      { question: "Why would someone choose Recurly over AI Finance Ops?", answer: "Recurly is a full billing platform — it processes payments, manages subscriptions, and handles revenue recognition. AI Finance Ops is an analytics layer that connects to your existing Stripe. If you need a billing platform, Recurly is the right choice. If you need analytics, AI Finance Ops is simpler and cheaper." },
      { question: "Is migrating to Recurly risky?", answer: "Yes. Migration involves moving customers, payment methods, and subscription data. Any mistakes can result in failed charges, lost revenue, and angry customers. Most migrations take 2-6 weeks of engineering work." },
    ]} />
  )
}
