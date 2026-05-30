'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import Link from 'next/link'

const FREE_PLAN = {
  name: "Free",
  price: 0,
  desc: "For founders exploring their numbers",
  features: [
    "Up to 2 connected accounts",
    "MRR tracking only",
    "30-day history",
    "Community support",
  ],
  highlighted: false,
}

const PAID_PLANS = [
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
    annualCheckoutUrl: "https://ai-finance-ops.lemonsqueezy.com/checkout/buy/8d014d41-35a8-4d91-87a8-fbd63080e700",
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
    annualCheckoutUrl: "https://ai-finance-ops.lemonsqueezy.com/checkout/buy/4aa74f04-b732-410d-a862-d96573728dd4",
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
    annualCheckoutUrl: "https://ai-finance-ops.lemonsqueezy.com/checkout/buy/6944b5a1-7fc9-4439-987c-d1e8d214877f",
    highlighted: false,
  },
]

function PriceDisplay({ monthly }: { monthly: number }) {
  return <span className="text-5xl font-bold text-white">${monthly}</span>
}

export default function PricingCards() {
  const [annual, setAnnual] = useState(false)

  return (
    <>
      <div className="flex items-center justify-center gap-3 mb-12">
        <span className={`text-sm font-medium ${!annual ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
        <button
          onClick={() => setAnnual(!annual)}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${annual ? 'bg-emerald-500' : 'bg-gray-700'}`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${annual ? 'translate-x-6' : 'translate-x-1'}`}
          />
        </button>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${annual ? 'text-white' : 'text-gray-500'}`}>Annual</span>
          {annual && (
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-400">
              Save 20%
            </span>
          )}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Free Plan */}
        <div className="relative flex flex-col rounded-2xl border border-gray-800 bg-gray-900/50 p-8 hover:border-emerald-500/50 transition-colors">
          <h3 className="text-xl font-bold text-white">{FREE_PLAN.name}</h3>
          <p className="mt-2 text-sm text-gray-400">{FREE_PLAN.desc}</p>
          <div className="mt-6">
            <span className="text-5xl font-bold text-white">$0</span>
            <span className="text-gray-500">/mo</span>
          </div>
          <ul className="mt-8 flex-1 space-y-4">
            {FREE_PLAN.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                <span className="text-sm text-gray-300">{f}</span>
              </li>
            ))}
          </ul>
          <Link href="/register" className="mt-8 block">
            <span className="flex w-full items-center justify-center rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-300 hover:border-gray-500 hover:text-white transition-all">
              Get Started Free
            </span>
          </Link>
        </div>

        {/* Paid Plans */}
        {PAID_PLANS.map((plan) => {
          const displayPrice = annual ? Math.round(plan.price * 12 * 0.8 / 12) : plan.price
          const annualTotal = plan.price * 12 * 0.8
          const checkoutUrl = annual ? plan.annualCheckoutUrl : plan.checkoutUrl

          return (
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
                <PriceDisplay monthly={displayPrice} />
                <span className="text-gray-500">/mo</span>
                {annual && (
                  <p className="mt-1 text-xs text-gray-500">${Math.round(annualTotal)}/year</p>
                )}
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
                href={checkoutUrl}
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
          )
        })}
      </div>
    </>
  )
}
