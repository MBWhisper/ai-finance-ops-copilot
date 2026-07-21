import type { Metadata } from "next"
import Link from "next/link"
import { InternalLinks } from "@/components/InternalLinks"
import { Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Startup Runway Calculator (Free) — Calculate Cash Runway | AI Finance Ops",
  description:
    "Free startup runway calculator. Estimate how many months of cash runway you have left based on cash balance and monthly burn. Instant results — no sign up needed.",
  alternates: {
    canonical: "https://aifinanceops.app/runway-calculator",
  },
  openGraph: {
  title: { absolute: "Startup Runway Calculator (Free) — Calculate Cash Runway | AI Finance Ops" },
    description:
      "Free startup runway calculator. Estimate how many months of cash runway you have left based on cash balance and monthly burn.",
    url: "https://aifinanceops.app/runway-calculator",
    siteName: "AI Finance Ops",
    images: [{ url: "https://aifinanceops.app/og/runway-calculator.png", width: 1200, height: 630, alt: "Startup Runway Calculator — AI Finance Ops" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Runway Calculator (Free) — Calculate Cash Runway",
    description: "Free startup runway calculator. Estimate how many months of cash runway you have left.",
    images: ["https://aifinanceops.app/og/runway-calculator.png"],
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is startup runway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Startup runway is the number of months your company can continue operating before it runs out of cash, based on your current cash balance and monthly burn rate. It is one of the most important metrics for early-stage founders to track.",
      },
    },
    {
      "@type": "Question",
      name: "How do you calculate startup runway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The runway formula is: Runway (months) = Cash Balance ÷ Monthly Net Burn. For example, if you have $120,000 in cash and your monthly burn is $10,000, your runway is 12 months.",
      },
    },
    {
      "@type": "Question",
      name: "What is a good runway for a SaaS startup?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most SaaS founders and investors recommend maintaining at least 12 to 18 months of runway. Below 6 months is considered a danger zone and typically triggers immediate fundraising or cost-cutting decisions.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between gross burn and net burn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Gross burn is total monthly cash spent (expenses only). Net burn is gross burn minus revenue. Use net burn in the runway formula for the most accurate picture. If your MRR is $5,000 and expenses are $15,000, your net burn is $10,000.",
      },
    },
    {
      "@type": "Question",
      name: "How can I extend my startup runway?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can extend runway by growing MRR, reducing churn, cutting non-essential expenses, or raising new capital. AI Finance Ops tracks all of these metrics automatically so you always know where your runway stands.",
      },
    },
  ],
}

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Startup Runway Calculator",
  url: "https://aifinanceops.app/runway-calculator",
  description: "Free startup runway calculator. Estimate how many months of cash runway you have left based on cash balance and monthly burn.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
}

export default function RunwayCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
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
            <span className="text-emerald-400">How Long Will Your Cash Last?</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4">
            Use this free startup runway calculator to estimate how many months of cash runway
            your company has left. Enter your cash balance and monthly burn rate to calculate
            runway instantly — no sign up required.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mb-8">
            Want automatic runway tracking?{" "}
            <Link href="/register" className="text-emerald-400 hover:underline">
              Connect Stripe and get live runway alerts →
            </Link>
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3 text-base font-medium text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25 hover:-translate-y-0.5"
          >
            Track runway automatically — start free
          </Link>
        </section>

        {/* Formula */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              How to Calculate Startup Runway
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Startup runway is the number of months your company can keep operating before it runs
              out of cash, at the current monthly burn rate. It is one of the most critical metrics
              for any early-stage founder to monitor — especially in the 12 months before a fundraise.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              The runway calculation uses your current cash balance and your monthly net burn (total
              expenses minus revenue). Read our{" "}
              <Link href="/blog/how-many-months-of-runway-do-i-have" className="text-emerald-400 hover:underline">
                full guide on how many months of runway you should have
              </Link>{" "}
              for startup benchmarks and planning advice.
            </p>
            <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6 mb-6">
              <div className="text-sm font-mono text-emerald-400 mb-2">Runway Formula</div>
              <div className="text-lg font-mono text-white">
                Runway (months) = Cash Balance &divide; Monthly Net Burn
              </div>
              <div className="mt-3 text-sm text-gray-500">
                Example: $120,000 cash &divide; $10,000 monthly burn = 12 months runway
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-5">
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Good Runway</div>
                <div className="text-2xl font-bold text-emerald-400 mb-1">18+ months</div>
                <div className="text-sm text-gray-400">Comfortable runway for hiring and growth</div>
              </div>
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-5">
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Danger Zone</div>
                <div className="text-2xl font-bold text-red-400 mb-1">&lt; 6 months</div>
                <div className="text-sm text-gray-400">Start fundraising or cutting costs immediately</div>
              </div>
            </div>
          </div>
        </section>

        {/* What affects runway */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              What Affects Your Startup Runway?
            </h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
              Runway is not just about how much cash you have — it is about how fast you spend it
              and how fast you grow revenue. These four metrics have the biggest impact on your cash runway.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { label: "MRR growth",    link: "/mrr-tracker",       desc: "More revenue means longer runway. Track your MRR growth trends in real time." },
                { label: "Churn rate",    link: "/churn-rate-calculator", desc: "High churn shrinks revenue faster than you can grow it, burning through runway faster." },
                { label: "Burn rate",     link: "/cash-flow-tracker",  desc: "Track every cash outflow to identify unnecessary expenses before they drain your runway." },
                { label: "LTV:CAC ratio", link: "/ltv-calculator",     desc: "Efficient growth extends runway. Poor LTV:CAC burns through cash without building a sustainable business." },
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
            <h2 className="text-3xl font-bold text-white mb-10">
              Startup Runway FAQ
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What is startup runway?</h3>
                <p className="text-gray-400 leading-relaxed">
                  Startup runway is the number of months your company can continue operating before it runs out
                  of cash, based on your current cash balance and monthly burn rate. It is one of the most
                  important financial metrics for early-stage founders to track and communicate to investors.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">How do you calculate startup runway?</h3>
                <p className="text-gray-400 leading-relaxed">
                  The runway formula is simple: <strong className="text-white">Cash Balance ÷ Monthly Net Burn</strong>.
                  If you have $120,000 in the bank and your net burn is $10,000 per month, your runway is 12 months.
                  Always use net burn (expenses minus revenue), not gross burn, for the most accurate runway calculation.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What is a good runway for a SaaS startup?</h3>
                <p className="text-gray-400 leading-relaxed">
                  Most SaaS investors recommend maintaining at least 12 to 18 months of runway at all times.
                  Below 6 months is a danger zone that typically triggers immediate fundraising or cost-cutting.
                  If you are planning a Series A, aim to start the process with at least 9–12 months of runway remaining.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">What is the difference between gross burn and net burn?</h3>
                <p className="text-gray-400 leading-relaxed">
                  Gross burn is your total monthly cash spending (all expenses). Net burn is gross burn minus
                  your monthly revenue. For startup runway planning, always use net burn — it shows how fast
                  you are actually depleting your cash balance after accounting for incoming revenue.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">How can I extend my startup runway?</h3>
                <p className="text-gray-400 leading-relaxed">
                  The fastest ways to extend runway: grow MRR, reduce churn, cut non-essential expenses, or
                  raise new capital. AI Finance Ops tracks{" "}
                  <Link href="/mrr-tracker" className="text-emerald-400 hover:underline">MRR</Link>,{" "}
                  <Link href="/churn-rate-calculator" className="text-emerald-400 hover:underline">churn rate</Link>, and{" "}
                  <Link href="/cash-flow-tracker" className="text-emerald-400 hover:underline">cash flow</Link>{" "}
                  automatically so you always know where your runway stands.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Never Be Surprised by Your Runway Again</h2>
            <p className="text-gray-400 mb-8">
              AI Finance Ops tracks your runway automatically — alerting you when it drops below your target.
              A smarter{" "}
              <Link href="/vs-baremetrics" className="text-emerald-400 hover:underline">Baremetrics alternative</Link>{" "}
              for SaaS founders who care about cash runway and growth metrics.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-10 py-4 text-base font-semibold text-white hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/25"
            >
              Start free — no credit card required
            </Link>
          </div>
        </section>

        {/* Internal Links */}
        <InternalLinks
          variant="mixed"
          exclude="/runway-calculator"
          title="More Free SaaS Finance Tools"
          limit={8}
        />
      </div>
    </>
  )
}
