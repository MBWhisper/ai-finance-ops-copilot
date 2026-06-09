import Link from 'next/link'

interface InternalLink {
  href: string
  label: string
  description?: string
}

interface InternalLinksProps {
  links: InternalLink[]
  title?: string
  variant?: 'grid' | 'list' | 'footer'
}

export function InternalLinks({ links, title = 'Explore More', variant = 'grid' }: InternalLinksProps) {
  if (variant === 'footer') {
    return (
      <div className="mt-12 pt-8 border-t border-gray-800">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">{title}</p>
        <div className="flex flex-wrap gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-full transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    )
  }

  if (variant === 'list') {
    return (
      <div className="mt-10">
        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">{title}</p>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors text-sm"
              >
                → {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // Default: grid
  return (
    <div className="mt-12">
      <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">{title}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group block p-4 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-emerald-500/50 hover:bg-gray-800 transition-all"
          >
            <span className="text-white font-medium group-hover:text-emerald-400 transition-colors text-sm">
              {link.label}
            </span>
            {link.description && (
              <span className="block text-gray-400 text-xs mt-1">{link.description}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

// ─── Pre-built link sets for reuse across pages ───────────────────────────────

export const CALCULATOR_LINKS: InternalLink[] = [
  { href: '/mrr-calculator', label: 'MRR Calculator', description: 'Calculate monthly recurring revenue' },
  { href: '/arr-calculator', label: 'ARR Calculator', description: 'Annual recurring revenue formula' },
  { href: '/churn-rate-calculator', label: 'Churn Rate Calculator', description: 'Customer & revenue churn' },
  { href: '/ltv-calculator', label: 'LTV Calculator', description: 'Customer lifetime value' },
  { href: '/runway-calculator', label: 'Runway Calculator', description: 'How many months of cash?' },
  { href: '/cash-flow-tracker', label: 'Cash Flow Tracker', description: 'Track & forecast cash flow' },
]

export const COMPARISON_LINKS: InternalLink[] = [
  { href: '/vs-baremetrics', label: 'vs Baremetrics', description: 'Side-by-side comparison' },
  { href: '/vs-chartmogul', label: 'vs ChartMogul', description: 'Feature & price comparison' },
  { href: '/vs-profitwell', label: 'vs ProfitWell', description: 'Which is better for your stage?' },
  { href: '/vs-stripe-sigma', label: 'vs Stripe Sigma', description: 'SQL vs no-code analytics' },
]

export const BLOG_LINKS: InternalLink[] = [
  { href: '/blog/stripe-mrr-dashboard-for-founders', label: 'Stripe MRR Dashboard Guide' },
  { href: '/blog/saas-cash-flow-forecast', label: 'SaaS Cash Flow Forecasting' },
  { href: '/blog/ai-finance-tool-bootstrapped-startups', label: 'AI Finance for Bootstrapped Founders' },
  { href: '/blog/net-revenue-retention-saas', label: 'Net Revenue Retention Guide' },
  { href: '/blog/how-to-reduce-saas-churn', label: 'How to Reduce SaaS Churn' },
  { href: '/blog/baremetrics-alternative-2026', label: 'Baremetrics Alternative 2026' },
]

export const FEATURE_LINKS: InternalLink[] = [
  { href: '/mrr-tracker', label: 'MRR Tracker', description: 'Real-time Stripe MRR dashboard' },
  { href: '/automate-reporting', label: 'Automate Reporting', description: 'AI-generated finance reports' },
  { href: '/cash-flow-tracker', label: 'Cash Flow Tracker', description: 'Runway & cash projections' },
  { href: '/pricing', label: 'See Pricing', description: 'Start free, upgrade anytime' },
]
