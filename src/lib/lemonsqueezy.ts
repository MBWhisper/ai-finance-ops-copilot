import { lemonSqueezySetup, listProducts, listVariants } from '@lemonsqueezy/lemonsqueezy.js';

export function configureLemonSqueezy() {
  const apiKey = process.env.LEMONSQUEEZY_API_KEY;
  if (!apiKey) throw new Error('LEMONSQUEEZY_API_KEY is not set');
  lemonSqueezySetup({ apiKey });
}

export const PLANS = [
  {
    name: 'Starter',
    description: 'Perfect for small teams and startups',
    price: '$29',
    period: '/month',
    variantId: '1046512',
    checkoutUrl: 'https://ai-finance-ops.lemonsqueezy.com/checkout/buy/a6fac794-fedd-46cb-a998-913316b62e89',
    features: [
      'Up to 5 team members',
      'MRR & ARR tracking',
      'Cash flow dashboard',
      '10 invoices/month',
      'Email support',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    description: 'For growing businesses that need more power',
    price: '$79',
    period: '/month',
    variantId: '1046520',
    checkoutUrl: 'https://ai-finance-ops.lemonsqueezy.com/checkout/buy/8e49a214-837d-40cf-86a9-121dc483b335',
    features: [
      'Unlimited team members',
      'Advanced AI analytics',
      'Unlimited invoices',
      'Webhook integrations',
      'Priority support',
      'Custom reports',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'For large organizations with custom needs',
    price: '$199',
    period: '/month',
    variantId: '1046525',
    checkoutUrl: 'https://ai-finance-ops.lemonsqueezy.com/checkout/buy/ba80d7d9-f9ab-4d09-99b1-841c81c59697',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'Custom AI models',
      'SLA guarantee (99.9%)',
      'On-premise option',
      'Custom integrations',
    ],
    highlighted: false,
  },
];

export type Plan = typeof PLANS[0];
