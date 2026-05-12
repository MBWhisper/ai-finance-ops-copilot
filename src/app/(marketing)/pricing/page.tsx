import Link from "next/link"
import { Check } from "lucide-react"

const PLANS = [
  {
    name: "Starter",
    price: 29,
    desc: "For solo founders getting started",
    features: [
      "1 workspace",
      "KPI dashboard (MRR, ARR, Churn)",
      "30-day cash flow forecast",
      "Single billing integration",
      "Email support",
    ],
    checkoutUrl: "https://ai-finance-ops.lemonsqueezy.com/checkout/buy/8d014d41-35a8-4d91-87a8-fbd63080e700",
    highlighted: false,
  },
  {
    name: "Growth",
    price: 79,
    desc: "For growing SaaS teams",
    features: [
      "3 workspaces",
      "Everything in Starter",
      "90-day P50/P80/P95 forecast",
      "Multiple billing integrations",
      "Smart AR reminders",
      "Priority support",
    ],
    checkoutUrl: "https://ai-finance-ops.lemonsqueezy.com/checkout/buy/4aa74f04-b732-410d-a862-d96573728dd4",
    highlighted: true,
  },
  {
    name: "Scale",
    price: 199,
    desc: "For established businesses",
    features: [
      "Unlimited workspaces",
      "Everything in Growth",
      "API access & webhooks",
      "AI-powered insights",
      "Custom integrations",
      "Dedicated account manager",
    ],
    checkoutUrl: "https://ai-finance-ops.lemonsqueezy.com/checkout/buy/6944b5a1-7fc9-4439-987c-d1e8d214877f",
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Simple, transparent pricing</h1>
          <p className="text-lg text-gray-400">Start free. Upgrade when you need more power.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-8 ${
                plan.highlighted
                  ? "border-2 border-emerald-500 bg-gray-900 shadow-xl shadow-emerald-500/10"
                  : "border border-gray-800 bg-gray-900/50"
              } hover:border-emerald-500/50 transition-colors`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-4 py-1 text-sm font-semibold text-white">
                  Recommended
                </div>
              )}
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-gray-400">{plan.desc}</p>
              <div className="mt-6">
                <span className="text-5xl font-bold text-white">${plan.price}</span>
                <span className="text-gray-500">/mo</span>
              </div>
              <ul className="mt-8 flex-1 space-y-4">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                    <span className="text-sm text-gray-300">{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`${plan.checkoutUrl}?checkout%5Bemail%5D=`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block"
              >
                <span
                  className={`flex w-full items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold transition-all ${
                    plan.highlighted
                      ? "bg-emerald-500 text-white hover:bg-emerald-400 shadow-lg shadow-emerald-500/25"
                      : "border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white"
                  }`}
                >
                  Start Free Trial
                </span>
              </a>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-gray-500">
          14-day free trial &bull; No credit card required &bull; Cancel anytime
        </p>
      </div>
    </div>
  )
}
