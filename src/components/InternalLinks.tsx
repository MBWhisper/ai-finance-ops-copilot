import Link from "next/link"

type LinkItem = {
  href: string
  label: string
  description: string
  emoji: string
}

const allTools: LinkItem[] = [
  { href: "/churn-calculator",     label: "Churn Rate Calculator",       description: "Calculate monthly & annual churn instantly",        emoji: "📉" },
  { href: "/churn-rate-calculator",label: "Churn Rate Calculator (v2)",  description: "Detailed churn analysis with revenue impact",        emoji: "📊" },
  { href: "/mrr-calculator",       label: "MRR Calculator",              description: "Calculate Monthly Recurring Revenue",               emoji: "💰" },
  { href: "/mrr-tracker",          label: "MRR Tracker",                 description: "Track MRR growth trends over time",                  emoji: "📈" },
  { href: "/arr-calculator",       label: "ARR Calculator",              description: "Annual Recurring Revenue calculator",                emoji: "🗓️" },
  { href: "/runway-calculator",    label: "Runway Calculator",           description: "How long will your cash last?",                     emoji: "🛫" },
  { href: "/cash-flow-tracker",    label: "Cash Flow Tracker",          description: "Track SaaS cash flow projections",                  emoji: "🌊" },
  { href: "/ltv-calculator",       label: "LTV Calculator",              description: "Calculate Customer Lifetime Value",                  emoji: "♾️" },
]

const allComparisons: LinkItem[] = [
  { href: "/vs-baremetrics",    label: "vs Baremetrics",     description: "AI Finance Ops vs Baremetrics — detailed comparison",  emoji: "⚔️" },
  { href: "/vs-chartmogul",     label: "vs ChartMogul",      description: "AI Finance Ops vs ChartMogul — which is better?",      emoji: "⚔️" },
  { href: "/vs-profitwell",     label: "vs ProfitWell",      description: "AI Finance Ops vs ProfitWell — full breakdown",        emoji: "⚔️" },
  { href: "/vs-recurly",        label: "vs Recurly",         description: "AI Finance Ops vs Recurly — pricing & features",       emoji: "⚔️" },
  { href: "/vs-stripe-sigma",   label: "vs Stripe Sigma",    description: "AI Finance Ops vs Stripe Sigma — finance ops focus",  emoji: "⚔️" },
]

const allBlogPosts: LinkItem[] = [
  { href: "/blog/saas-financial-metrics",          label: "SaaS Financial Metrics Guide",          description: "The 12 metrics every SaaS CFO must track",            emoji: "📖" },
  { href: "/blog/90-day-cash-flow-forecast",       label: "90-Day Cash Flow Forecast",             description: "How to forecast SaaS cash flow for 90 days",          emoji: "📖" },
  { href: "/blog/runway",                          label: "SaaS Runway Guide",                     description: "How to calculate and extend your startup runway",      emoji: "📖" },
]

type Variant = "tools" | "comparisons" | "blog" | "mixed"

interface InternalLinksProps {
  variant?: Variant
  exclude?: string        // current page href — will be filtered out
  title?: string
  limit?: number
}

export function InternalLinks({
  variant = "mixed",
  exclude,
  title,
  limit,
}: InternalLinksProps) {
  let items: LinkItem[] = []

  if (variant === "tools")       items = allTools
  else if (variant === "comparisons") items = allComparisons
  else if (variant === "blog")   items = allBlogPosts
  else {
    // mixed: 4 tools + 2 comparisons + 2 blog
    items = [
      ...allTools.slice(0, 4),
      ...allComparisons.slice(0, 2),
      ...allBlogPosts.slice(0, 2),
    ]
  }

  if (exclude) items = items.filter((i) => i.href !== exclude)
  if (limit)   items = items.slice(0, limit)

  const defaultTitle =
    variant === "tools"       ? "Free SaaS Finance Tools" :
    variant === "comparisons" ? "Compare AI Finance Ops" :
    variant === "blog"        ? "Learn More" :
    "Related Tools & Guides"

  return (
    <section className="border-t border-gray-800 px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center">
          {title ?? defaultTitle}
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group block border border-gray-800 bg-gray-900/50 hover:border-emerald-500/40 hover:bg-emerald-500/5 rounded-xl p-5 transition-all"
            >
              <div className="text-2xl mb-3">{item.emoji}</div>
              <div className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors mb-1">
                {item.label}
              </div>
              <div className="text-xs text-gray-500 leading-relaxed">
                {item.description}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
