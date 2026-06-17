import type { Metadata } from "next"
import Link from "next/link"
import { InternalLinks } from "@/components/InternalLinks"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "SaaS LTV Calculator — Customer Lifetime Value | AI Finance Ops",
  description:
    "Calculate Customer Lifetime Value (LTV) for your SaaS business. Understand your LTV:CAC ratio and what drives long-term profitability. Free LTV calculator for SaaS founders.",
  alternates: {
    canonical: "https://aifinanceops.app/ltv-calculator",
  },
  openGraph: {
    title: "SaaS LTV Calculator — Customer Lifetime Value | AI Finance Ops",
    description: "Calculate Customer Lifetime Value (LTV) and your LTV:CAC ratio. Free for SaaS founders.",
    url: "https://aifinanceops.app/ltv-calculator",
    siteName: "AI Finance Ops",
    images: [{ url: "https://aifinanceops.app/og/ltv-calculator.png", width: 1200, height: 630, alt: "SaaS LTV Calculator" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS LTV Calculator — Customer Lifetime Value | AI Finance Ops",
    description: "Calculate LTV and LTV:CAC ratio for your SaaS. Free tool.",
    images: ["https://aifinanceops.app/og/ltv-calculator.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you calculate LTV for SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The basic SaaS LTV formula is: LTV = Average Revenue Per User (ARPU) ÷ Monthly Churn Rate. For example, if ARPU is $100 and monthly churn is 5%, LTV = $100 ÷ 0.05 = $2,000.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good LTV:CAC ratio for SaaS?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A healthy LTV:CAC ratio for SaaS is 3:1 or higher — meaning you earn at least $3 in lifetime value for every $1 spent acquiring a customer. Below 3:1 suggests your unit economics need improvement.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between LTV and CLV?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "LTV (Lifetime Value) and CLV (Customer Lifetime Value) refer to the same metric — the total revenue a business can expect from a single customer over the entire relationship. The terms are used interchangeably in SaaS.",
      },
    },
  ],
}

export default function LTVCalculatorPage() {
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
            SaaS LTV Calculator<br />
            <span className="text-emerald-400">Customer Lifetime Value</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Calculate the lifetime value of your SaaS customers and your LTV:CAC ratio.
            Understand which customer segments drive the most long-term revenue.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
          >
            Track LTV automatically — start free
          </Link>
        </section>

        {/* Formula */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              How to Calculate SaaS LTV
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Customer Lifetime Value (LTV) measures the total revenue you can expect from a single
              customer over the entire time they remain a paying subscriber. It is the foundation of
              healthy SaaS unit economics and directly determines how much you can spend to acquire customers.
            </p>
            <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 mb-6">
              <div className="text-sm font-mono text-emerald-400 mb-2">LTV Formula</div>
              <div className="text-lg font-mono text-white">
                LTV = ARPU &divide; Monthly Churn Rate
              </div>
              <div className="mt-3 text-sm text-gray-500">
                Example: $100 ARPU &divide; 5% churn = $2,000 LTV
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-5">
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Healthy LTV:CAC</div>
                <div className="text-2xl font-bold text-emerald-400 mb-1">3:1 or higher</div>
                <div className="text-sm text-gray-400">Sustainable unit economics for growth</div>
              </div>
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-5">
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Danger Zone</div>
                <div className="text-2xl font-bold text-red-400 mb-1">&lt; 1:1</div>
                <div className="text-sm text-gray-400">Spending more to acquire than you earn</div>
              </div>
            </div>
          </div>
        </section>

        {/* What affects LTV */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
              What Affects Your SaaS LTV?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: "Churn rate",    link: "/churn-rate-calculator", desc: "Lower churn = higher LTV. Even a 1% reduction in monthly churn can dramatically increase lifetime value." },
                { label: "MRR per user",  link: "/mrr-tracker",       desc: "Higher ARPU directly increases LTV. Track expansion revenue and upsell opportunities." },
                { label: "Cash runway",   link: "/runway-calculator",  desc: "High LTV gives you more flexibility to invest in growth without burning through runway." },
                { label: "ARR growth",    link: "/arr-calculator",     desc: "Compounding ARR growth multiplies the value of each percentage point improvement in LTV." },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <Check className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                  <div>
                    <Link href={item.link} className="text-sm font-semibold text-emerald-400 hover:underline">
                      {item.label}
                    </Link>
                    <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-10">SaaS LTV FAQ</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">How do you calculate LTV for SaaS?</h3>
                <p className="text-gray-400 leading-relaxed">
                  The basic SaaS LTV formula is: <strong className="text-white">LTV = ARPU ÷ Monthly Churn Rate</strong>.
                  If your average revenue per user is $100 and monthly churn is 5%, your LTV is $2,000.
                  A more advanced version accounts for gross margin: LTV = (ARPU × Gross Margin %) ÷ Churn Rate.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What is a good LTV:CAC ratio for SaaS?</h3>
                <p className="text-gray-400 leading-relaxed">
                  A healthy LTV:CAC ratio is 3:1 or higher — meaning you earn at least $3 in lifetime value
                  for every $1 spent acquiring a customer. Below 3:1 suggests your customer acquisition costs
                  are too high or your retention is too low for sustainable growth.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What is the difference between LTV and CLV?</h3>
                <p className="text-gray-400 leading-relaxed">
                  LTV (Lifetime Value) and CLV (Customer Lifetime Value) are the same metric used interchangeably
                  in SaaS. Both measure the total expected revenue from a single customer over the full duration
                  of their relationship with your business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Track LTV and All SaaS Metrics Automatically</h2>
            <p className="text-gray-400 mb-8">
              AI Finance Ops calculates LTV, churn, MRR, and cash runway automatically by connecting
              directly to Stripe. No spreadsheets. No manual updates.{" "}
              <Link href="/vs-baremetrics" className="text-emerald-400 hover:underline">See how we compare to Baremetrics →</Link>
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-10 py-4 text-base font-semibold text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25"
            >
              Start free — no credit card required
            </Link>
          </div>
        </section>

        <InternalLinks
          variant="mixed"
          exclude="/ltv-calculator"
          title="More Free SaaS Finance Tools"
          limit={8}
        />
      </div>
    </>
  )
}
