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
    images: [{ url: "https://aifinanceops.app/og-image.png", width: 1200, height: 630, alt: "Startup Runway Calculator — AI Finance Ops" }],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Startup Runway Calculator (Free) — Calculate Cash Runway",
    description: "Free startup runway calculator. Estimate how many months of cash runway you have left.",
    images: ["https://aifinanceops.app/og-image.png"],
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

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Calculate Startup Runway",
  description: "Step-by-step guide to calculating your startup's cash runway in months.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Calculate your total cash balance",
      text: "Add up all available cash across bank accounts and liquid investments to get your total cash balance.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Calculate monthly net burn",
      text: "Subtract your monthly revenue from your total monthly expenses. This gives you the monthly net burn rate.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Apply the runway formula",
      text: "Divide your cash balance by your monthly net burn. Runway = Cash Balance ÷ Monthly Net Burn.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Compare to benchmarks",
      text: "18+ months of runway is healthy, while fewer than 6 months is a danger zone requiring immediate action.",
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
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
                { label: "Calculate recurring revenue", link: "/mrr-calculator", desc: "MRR offsets burn. Calculate your recurring revenue to see how it extends your runway." },
                { label: "Track cash flow live", link: "/cash-flow-tracker", desc: "Monitor cash inflows and outflows in real time to manage runway proactively." },
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

        {/* Runway Benchmarks by Funding Stage */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Runway Benchmarks by Funding Stage
            </h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
              Investors expect different runway targets depending on your funding stage.
              Use this table to benchmark your runway and plan your next move.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="pb-4 text-sm font-semibold text-white">Stage</th>
                    <th className="pb-4 text-sm font-semibold text-white">Typical Runway Target</th>
                    <th className="pb-4 text-sm font-semibold text-white">Action if Below</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr className="border-b border-gray-800/50">
                    <td className="py-4 text-white font-medium">Pre-seed</td>
                    <td className="py-4">12–18 months</td>
                    <td className="py-4">Cut costs or raise</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-4 text-white font-medium">Seed</td>
                    <td className="py-4">12–18 months</td>
                    <td className="py-4">Optimize unit economics</td>
                  </tr>
                  <tr className="border-b border-gray-800/50">
                    <td className="py-4 text-white font-medium">Series A</td>
                    <td className="py-4">18–24 months</td>
                    <td className="py-4">Focus on growth</td>
                  </tr>
                  <tr>
                    <td className="py-4 text-white font-medium">Growth</td>
                    <td className="py-4">24+ months</td>
                    <td className="py-4">Optimize for profitability</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* How to Extend Your Runway */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              How to Extend Your Runway
            </h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
              Running low on runway? These four strategies can buy you more time
              before you need to fundraise — or help you reach profitability.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Grow MRR Faster</h3>
                <p className="text-sm text-gray-400">
                  Accelerate revenue growth through upsells, new pricing tiers, or expanding
                  into new segments. Every dollar of MRR directly extends your runway.
                </p>
              </div>
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Reduce Churn</h3>
                <p className="text-sm text-gray-400">
                  Lowering churn by even 1–2% can add months to your runway. Focus on
                  onboarding, customer success, and product-market fit improvements.
                </p>
              </div>
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Cut Non-Essential Spend</h3>
                <p className="text-sm text-gray-400">
                  Review every line item. Pause non-critical hires, renegotiate contracts,
                  and eliminate tools you rarely use. Every dollar saved is runway gained.
                </p>
              </div>
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Raise at the Right Time</h3>
                <p className="text-sm text-gray-400">
                  Start fundraising when you have 9–12 months of runway remaining. Raising
                  from a position of strength — not desperation — leads to better terms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Runway Scenario Planning */}
        <section className="border-t border-gray-800 px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              Runway Scenario Planning
            </h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
              Your runway depends heavily on growth rate. Here is how different
              MRR growth scenarios impact your timeline.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-emerald-800/50 bg-emerald-950/20 rounded-xl p-6">
                <div className="text-xs text-emerald-400 uppercase tracking-widest mb-2">Best Case</div>
                <div className="text-2xl font-bold text-emerald-400 mb-1">24 months</div>
                <div className="text-sm text-gray-400 mb-4">20% MoM MRR growth</div>
                <p className="text-sm text-gray-400">
                  Aggressive growth compounds quickly, significantly extending your
                  runway and giving you leverage in fundraising negotiations.
                </p>
              </div>
              <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-6">
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">Base Case</div>
                <div className="text-2xl font-bold text-white mb-1">15 months</div>
                <div className="text-sm text-gray-400 mb-4">10% MoM MRR growth</div>
                <p className="text-sm text-gray-400">
                  Steady growth keeps you on track. This is the baseline most
                  investors expect to see from a well-run SaaS startup.
                </p>
              </div>
              <div className="border border-red-800/50 bg-red-950/20 rounded-xl p-6">
                <div className="text-xs text-red-400 uppercase tracking-widest mb-2">Worst Case</div>
                <div className="text-2xl font-bold text-red-400 mb-1">10 months</div>
                <div className="text-sm text-gray-400 mb-4">Flat MRR (0% growth)</div>
                <p className="text-sm text-gray-400">
                  Without growth, revenue stops offsetting burn and your runway
                  shrinks fast. This scenario demands immediate cost cuts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Real Runway Example */}
        <section className="border-t border-gray-800 bg-gray-900/30 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Real Runway Example
            </h2>
            <p className="text-center text-gray-400 max-w-2xl mx-auto mb-10">
              Here is a concrete example of how runway calculation works for a
              typical early-stage SaaS startup.
            </p>
            <div className="border border-gray-800 bg-gray-900/50 rounded-xl p-8">
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Cash Balance</div>
                  <div className="text-2xl font-bold text-white">$200,000</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">MRR</div>
                  <div className="text-2xl font-bold text-white">$15,000</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Monthly Expenses</div>
                  <div className="text-2xl font-bold text-white">$25,000</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Net Burn</div>
                  <div className="text-2xl font-bold text-emerald-400">$10,000</div>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-6 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Runway = $200,000 ÷ $10,000</div>
                  <div className="text-3xl font-bold text-emerald-400">20 months</div>
                </div>
                <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-400">
                  Healthy runway
                </span>
              </div>
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
