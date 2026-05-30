import Link from "next/link"
import { OptimizedImage } from "@/components/OptimizedImage"

export const metadata = {
    title: "What is MRR? The SaaS Founder's Complete Guide | AI Finance Ops",
  description:
    "Learn what Monthly Recurring Revenue is, how to calculate it correctly, and the 3 mistakes that give founders a false picture of their SaaS growth.",
  alternates: { canonical: 'https://aifinanceops.app/blog/what-is-mrr' },
}

export default function WhatIsMrrPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-300">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop"
          alt="SaaS MRR growth chart on a modern dashboard"
          className="w-full rounded-xl mb-8 aspect-video object-cover"
          width={1200}
          height={630}
        />
        <h1 className="text-4xl font-bold text-white mb-4">
          What is MRR and Why Every SaaS Founder Should Track It Daily
        </h1>
        <div className="flex items-center gap-3 mb-8">
          <span className="inline-block rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            Finance Basics
          </span>
          <span className="text-xs text-slate-500">May 10, 2026</span>
        </div>
        <div className="flex gap-4 text-sm text-slate-500 mb-12">
          <span>5 min read</span>
        </div>

        <p className="leading-relaxed mb-6 text-slate-300">
          If you run a SaaS business and you&apos;re not tracking MRR every single day,
          you&apos;re flying blind. Monthly Recurring Revenue is the heartbeat of your
          business — it tells you whether you&apos;re growing, shrinking, or stalling.
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">What is MRR?</h2>
        <p className="leading-relaxed mb-6 text-slate-300">
          MRR is the total predictable revenue your business generates each month
          from active subscriptions. One-time payments and setup fees do NOT count.
        </p>
        <div className="rounded-xl bg-slate-800 p-4 font-mono text-emerald-400 my-6">
          <p>MRR = Number of Active Customers × Average Revenue Per User (ARPU)</p>
        </div>
        <p className="leading-relaxed mb-6 text-slate-300">
          Example: 40 customers × $29 + 10 customers × $79 = <strong className="text-white">$1,950 MRR</strong>
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">The 5 Components of MRR</h2>
        <div className="space-y-3 mb-6">
          {[
            ["New MRR", "Revenue from new customers this month"],
            ["Expansion MRR", "Revenue from upgrades"],
            ["Contraction MRR", "Revenue lost from downgrades"],
            ["Churn MRR", "Revenue lost from cancellations"],
          ].map(([label, desc], i) => (
            <div key={label} className="flex items-start gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-sm font-bold text-emerald-400">
                {i + 1}
              </span>
              <div>
                <span className="font-semibold text-white">{label}</span>
                <span className="text-slate-400"> — {desc}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-slate-800 p-4 font-mono text-emerald-400 my-6">
          Net New MRR = New + Expansion − Contraction − Churn
        </div>
        <p className="leading-relaxed mb-6 text-slate-300">
          <strong className="text-white">Net New MRR</strong> is the number that tells you if you&apos;re actually growing.
        </p>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">3 Mistakes Founders Make</h2>
        <div className="grid gap-6 mb-8">
          {[
            {
              title: "Including annual plans in full",
              desc: "If a customer pays $348 upfront for an annual plan, your MRR is $29 — not $348. Always normalize to monthly value.",
            },
            {
              title: "Counting trial users",
              desc: "Free trial users generate zero MRR. Only count actively paying customers.",
            },
            {
              title: "Ignoring contraction",
              desc: "5 customers downgrading from $79 to $29 = $250 lost in Contraction MRR. Most founders only track new signups and miss the leaks.",
            },
          ].map((card) => (
            <div key={card.title} className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-sm text-slate-400">{card.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why Track MRR Daily?</h2>
        <ul className="space-y-2 text-slate-300 mb-8">
          {[
            "Spot churn spikes the day they happen",
            "See which channels drive real revenue",
            "Catch billing failures before cancellations",
            "Make hiring decisions with confidence",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold text-white mt-12 mb-4">ARR: The Investor Metric</h2>
        <p className="leading-relaxed mb-6 text-slate-300">
          ARR = MRR × 12. If your MRR is $1,950, your ARR is $23,400.
          Investors use ARR to evaluate SaaS scale.
        </p>

        {/* AFFILIATE CALLOUT */}
        <div className="rounded-xl border border-emerald-500/20 bg-slate-900 p-6 my-8">
          <div className="flex items-start gap-4">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-semibold text-white mb-2">Want to grow your SaaS revenue faster?</h3>
              <p className="text-sm text-slate-400 mb-4">
                The best SaaS founders use the right tools. Find top freelance developers and
                designers on Fiverr to build and scale your product faster — without the
                overhead of full-time hires.
              </p>
              <a
                href="https://go.fiverr.com/visit/?bta=870194&brand=fiverraffiliates"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Browse SaaS freelancers on Fiverr →
              </a>
              <p className="text-xs text-slate-600 mt-2">
                (Affiliate link — we may earn a small commission at no cost to you)
              </p>
            </div>
          </div>
        </div>

        {/* MAIN CTA */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-8 text-center my-8">
          <h3 className="text-xl font-bold text-white mb-3">Track Your MRR Automatically</h3>
          <p className="text-slate-400 mb-6">
            Connect Stripe. Get real MRR, ARR, and all 5 components — updated daily.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-400 transition-colors"
          >
            Start Free 14-Day Trial →
          </Link>
        </div>
      </article>
    </div>
  )
}
