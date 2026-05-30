import { lemonSqueezySetup, listProducts, listVariants } from '@lemonsqueezy/lemonsqueezy.js';

export function configureLemonSqueezy() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  if (!apiKey) throw new Error('LEMONSQUEEZY_API_KEY is not set');
  lemonSqueezySetup({ apiKey });
}

export const PLANS = [
  {
    name: 'Starter',
    description: 'For solo founders getting started',
    price: '$29',
    period: '/month',
    variantId: '1046512',
    checkoutUrl: 'https://ai-finance-ops.lemonsqueezy.com/checkout/buy/8d014d41-35a8-4d91-87a8-fbd63080e700',
    features: [
      '1 workspace',
      'KPI dashboard (MRR, ARR, Churn)',
      '30-day cash flow forecast',
      'Single billing integration',
      'Email support',
    ],
    highlighted: false,
  },
  {
    name: 'Growth',
    description: 'For growing SaaS teams',
    price: '$79',
    period: '/month',
    variantId: '1046520',
    checkoutUrl: 'https://ai-finance-ops.lemonsqueezy.com/checkout/buy/4aa74f04-b732-410d-a862-d96573728dd4',
    features: [
      '3 workspaces',
      'Everything in Starter',
      '90-day P50/P80/P95 forecast',
      'Multiple billing integrations',
      'Smart AR reminders',
      'Priority support',
    ],
    highlighted: true,
  },
  {
    name: 'Scale',
    description: 'For established businesses',
    price: '$199',
    period: '/month',
    variantId: '1046525',
    checkoutUrl: 'https://ai-finance-ops.lemonsqueezy.com/checkout/buy/6944b5a1-7fc9-4439-987c-d1e8d214877f',
    features: [
      'Unlimited workspaces',
      'Everything in Growth',
      'API access & webhooks',
      'AI-powered insights',
      'Custom integrations',
      'Dedicated account manager',
    ],
    highlighted: false,
  },
];

export type Plan = typeof PLANS[0];
