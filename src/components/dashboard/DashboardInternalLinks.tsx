"use client"

import Link from 'next/link'

const TOOLS = [
  { href: '/mrr-calculator', label: 'MRR Calculator', icon: '📊' },
  { href: '/arr-calculator', label: 'ARR Calculator', icon: '📈' },
  { href: '/runway-calculator', label: 'Runway Calculator', icon: '⏱️' },
  { href: '/churn-rate-calculator', label: 'Churn Calculator', icon: '📉' },
  { href: '/ltv-calculator', label: 'LTV Calculator', icon: '💰' },
  { href: '/cash-flow-tracker', label: 'Cash Flow', icon: '💵' },
]

const RESOURCES = [
  { href: '/blog/stripe-mrr-dashboard-for-founders', label: 'MRR Dashboard Guide' },
  { href: '/blog/saas-cash-flow-forecast', label: 'Cash Flow Forecasting' },
  { href: '/blog/ai-finance-tool-bootstrapped-startups', label: 'AI Finance for Bootstrapped' },
  { href: '/blog/how-to-reduce-saas-churn', label: 'Reduce Churn Guide' },
  { href: '/blog/net-revenue-retention-saas', label: 'NRR Guide' },
]

export function DashboardToolsPanel() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Free Tools</p>
      <div className="grid grid-cols-2 gap-2">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            target="_blank"
            className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group"
          >
            <span className="text-base">{tool.icon}</span>
            <span className="text-xs text-gray-300 group-hover:text-white transition-colors">{tool.label}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export function DashboardResourcesPanel() {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Resources</p>
      <ul className="space-y-2">
        {RESOURCES.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              target="_blank"
              className="text-xs text-gray-400 hover:text-emerald-400 hover:underline transition-colors block py-0.5"
            >
              {item.label} →
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/blog"
        className="mt-4 block text-center text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
      >
        All articles →
      </Link>
    </div>
  )
}
