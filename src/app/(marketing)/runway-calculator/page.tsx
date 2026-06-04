import type { Metadata } from "next"
import Link from "next/link"
import { OptimizedImage } from "@/components/OptimizedImage"
import { Calculator, Clock, TrendingUp, Check, ChevronDown } from "lucide-react"

export const metadata: Metadata = {
  title: "Startup Runway Calculator — How Long Does Your Cash Last? (2026)",
  description:
    "Calculate your SaaS runway instantly. Know exactly how many months until you run out of cash. Free runway calculator for startups — includes burn rate, cash balance, and extension scenarios.",
  alternates: { canonical: 'https://aifinanceops.app/runway-calculator' },
  openGraph: {
    title: "Startup Runway Calculator — How Long Does Your Cash Last? (2026)",
    description:
      "Calculate your SaaS runway instantly. Know exactly how many months until you run out of cash. Free for startups.",
    url: "https://aifinanceops.app/runway-calculator",
    siteName: "AI Finance Ops",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AI Finance Ops Runway Calculator" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Runway Calculator — Free Tool (2026)",
    description:
      "Know exactly how many months until you run out of cash. Free runway calculator for SaaS startups.",
    images: ["/og-image.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How do you calculate startup runway?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Runway = Cash Balance divided by Monthly Burn Rate. For example, if you have $120,000 in the bank and spend $10,000 per month (net burn), your runway is 12 months. Net burn = Total monthly expenses minus Monthly revenue."
      }
    },
    {
      "@type": "Question",
      "name": "What is a good amount of runway for a startup?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "18-24 months of runway is the recommended target for venture-backed startups. For bootstrapped SaaS, 6-12 months is common. You should start fundraising or cutting costs when runway drops below 6 months."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between gross burn and net burn?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Gross burn is your total monthly cash expenditure before revenue. Net burn is gross burn minus your monthly revenue. If your gross burn is $15,000 and your MRR is $5,000, your net burn is $10,000."
      }
    },
    {
      "@type": "Question",
      "name": "How can I extend my startup runway?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can extend runway by reducing burn (cut non-essential SaaS tools, defer hires), increasing revenue (reduce churn, grow expansion MRR, raise prices), or raising capital. Start fundraising at 9-12 months of runway, not 3 months."
      }
    },
    {
      "@type": "Question",
      "name": "When should I start worrying about runway?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start taking action when you have 6 months of runway left. At 3 months it is a crisis. AI Finance Ops sends automated alerts when your runway drops below configurable thresholds so you are never caught off guard."
      }
    }
  ]
}

const FAQS = [
  {
    q: "How do you calculate startup runway?",
    a: "Runway = Cash Balance ÷ Monthly Net Burn. If you have $120,000 in the bank and your net burn is $10,000/month, your runway is 12 months. Net burn = Total monthly expenses − Monthly revenue. AI Finance Ops calculates this automatically using real data."
  },
  {
    q: "What is a good amount of runway?",
    a: "18-24 months for venture-backed startups — enough time to reach milestones and raise your next round. For bootstrapped SaaS, aim for 6-12 months with a clear path to profitability. Start cutting or fundraising when runway drops below 6 months."
  },
  {
    q: "What is the difference between gross burn and net burn?",
    a: "Gross burn = total monthly expenses. Net burn = gross burn − monthly revenue. For runway, always use net burn. If your expenses are $15,000/month and your MRR is $5,000, your net burn is $10,000."
  },
  {
    q: "How can I extend my runway?",
    a: "Cut non-essential spend, focus on reducing churn and growing expansion MRR, or raise prices for new customers. AI Finance Ops shows what-if scenarios so you see exactly how each action extends runway."
  },
  {
    q: "When should I start worrying about runway?",
    a: "Act at 6 months — start fundraising or cutting costs. At 3 months, it is a crisis. AI Finance Ops sends alerts when runway drops below your threshold so you are never surprised."
  },
]

export default function RunwayCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="min-h-screen bg-gray-950 text-gray-100">
        {/* Hero */}
        <section className="mx-auto max-w-5xl px-6 pt-32 pb-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-emerald-400 mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Free Tool
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Startup Runway Calculator<br />
            <span className="text-emerald-400">How Long Does Your Cash Last?</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4">
            Know exactly how many months you have before you run out of cash — automatically calculated
            from your real cash flow data, updated every day.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mb-8">
            Cash Balance · Monthly Burn Rate · Net Burn · Runway Months · Extension Scenarios
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
          >
            Track your runway free — no credit card
          </Link>
          <OptimizedImage
            src="https://images.unsplash.com/photo-1553484771-047a44eee27b?w=1200&h=630&fit=crop"
            alt="SaaS runway calculator with burn rate and cash projections"
            className="w-full max-w-4xl mx-auto mt-12 rounded-xl aspect-video object-cover shadow-2xl"
            width={1200}
            height={630}
          />
        </section>

        {/* Formula */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">How to Calculate Startup Runway</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Runway is the most important survival metric for any startup. It tells you how long you can
              operate before running out of money — assuming your current revenue and spending stay constant.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              The formula is simple: <strong className="text-white">Runway = Cash Balance &divide; Monthly Net Burn</strong>.
              But most founders do not know their exact net burn because they are not tracking expenses and
              revenue together in one place.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 font-mono text-sm">
                <div className="text-emerald-400 mb-3 font-sans text-xs font-semibold uppercase tracking-widest">Net Burn</div>
                <div className="text-gray-300">Net Burn =</div>
                <div className="text-gray-300 ml-4">Total monthly expenses</div>
                <div className="text-gray-300 ml-4">− Monthly MRR</div>
              </div>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 font-mono text-sm">
                <div className="text-emerald-400 mb-3 font-sans text-xs font-semibold uppercase tracking-widest">Runway</div>
                <div className="text-gray-300">Runway (months) =</div>
                <div className="text-gray-300 ml-4">Cash balance</div>
                <div className="text-gray-300 ml-4">÷ Monthly net burn</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              <strong className="text-white">Example:</strong> $120,000 cash balance, $15,000 monthly expenses, $5,000 MRR.
              Net burn = $10,000. Runway = 12 months.
            </p>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">What AI Finance Ops Tracks</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Calculator, label: "Cash Balance", desc: "Your exact cash position updated daily from connected bank accounts and payment processors." },
                { icon: Clock, label: "Months of Runway", desc: "Calculated automatically from real net burn — not manual estimates. Updated every 24 hours." },
                { icon: TrendingUp, label: "Net Burn Rate", desc: "Monthly expenses minus MRR. Tracks the trend over 12 months so you see if burn is accelerating." },
              ].map((f) => (
                <div key={f.label} className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 hover:border-gray-700 transition-colors">
                  <f.icon className="h-8 w-8 mb-4 text-emerald-400" />
                  <div className="text-base font-semibold text-white mb-2">{f.label}</div>
                  <div className="text-sm text-gray-400 leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Runway Thresholds */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Runway Thresholds — When to Act</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Most founders wait too long. By the time they realize their runway is dangerously short,
                they have 2-3 months left — not enough time to raise or pivot. Here is when you should act:
              </p>
              <div className="space-y-4">
                {[
                  { months: "18+ months", color: "text-emerald-400 bg-emerald-400/10", label: "Safe", desc: "Focus on growth. This is your operating target." },
                  { months: "12 months", color: "text-blue-400 bg-blue-400/10", label: "Plan ahead", desc: "Start thinking about your next fundraise or path to profitability." },
                  { months: "6 months", color: "text-amber-400 bg-amber-400/10", label: "Act now", desc: "Begin fundraising or aggressive cost-cutting immediately." },
                  { months: "3 months", color: "text-red-400 bg-red-400/10", label: "Crisis", desc: "Emergency mode — every decision should extend runway." },
                ].map((t) => (
                  <div key={t.months} className="flex items-start gap-4">
                    <div className={`text-xs font-bold px-2 py-1 rounded-md ${t.color} shrink-0 mt-0.5`}>{t.months}</div>
                    <div>
                      <div className="text-sm font-semibold text-white">{t.label}</div>
                      <div className="text-xs text-gray-500">{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-emerald-500/30 bg-emerald-500/5 rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-semibold tracking-widest uppercase text-emerald-400">AI Finance Ops Runway Tracking</span>
              </div>
              <ul className="space-y-3">
                {[
                  "Automatic runway calculation from real cash flow",
                  "Daily updates — never stale data",
                  "Alerts when runway drops below your threshold",
                  "What-if scenarios: see how cuts extend runway",
                  "Investor runway reports in one click",
                  "12-month burn rate trend charts",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-gray-300">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">Runway Calculator — FAQs</h2>
            <div className="space-y-4">
              {FAQS.map((faq) => (
                <details key={faq.q} className="group border border-gray-800 rounded-xl bg-gray-900/50">
                  <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none">
                    <span className="text-sm font-medium text-white">{faq.q}</span>
                    <ChevronDown className="h-4 w-4 text-gray-500 group-open:rotate-180 transition-transform shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-4 text-sm text-gray-400 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-800 px-6 py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Know your runway. Never run out of cash.</h2>
            <p className="text-gray-400 mb-8">
              Connect your accounts and get an accurate runway dashboard in under 2 minutes.
              Free to start — no credit card required.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
            >
              Try AI Finance Ops free
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
