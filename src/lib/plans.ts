export const PLANS = {
  starter: {
    name: "Starter",
    slug: "starter",
    price: 29,
    description: "Perfect for solo founders and small startups",
    features: [
      "Up to 2 team members",
      "1 workspace",
      "1 billing integration (Stripe or Lemon Squeezy)",
      "MRR, ARR, Churn, LTV tracking",
      "30-day cash flow forecast",
      "Basic dashboard",
      "Email support",
    ],
    limits: {
      users: 2,
      workspaces: 1,
      integrations: 1,
    },
    lemonSqueezyVariantId: "1046512",
  },
  growth: {
    name: "Growth",
    slug: "growth",
    price: 79,
    description: "For growing SaaS teams",
    features: [
      "Up to 5 team members",
      "Multiple workspaces",
      "Multiple billing integrations",
      "All Starter features",
      "90-day forecast with P50/P80/P95 bands",
      "AI-powered insights & forecasting",
      "Custom reports",
      "Priority support",
    ],
    limits: {
      users: 5,
      workspaces: 3,
      integrations: 3,
    },
    lemonSqueezyVariantId: "1046520",
  },
  scale: {
    name: "Scale",
    slug: "scale",
    price: 199,
    description: "For established businesses",
    features: [
      "Unlimited team members",
      "Unlimited workspaces",
      "Unlimited integrations",
      "All Growth features",
      "Advanced AI copilot",
      "Custom exports & API access",
      "SLA guarantee (99.9%)",
      "Dedicated account manager",
    ],
    limits: {
      users: Infinity,
      workspaces: Infinity,
      integrations: Infinity,
    },
    lemonSqueezyVariantId: "1046525",
  },
} as const;

export type PlanSlug = keyof typeof PLANS;
export type Plan = (typeof PLANS)[PlanSlug];

export const FREE_TRIAL_DAYS = 14;

export function getPlanBySlug(slug: string): Plan | undefined {
  return PLANS[slug as PlanSlug];
}

export function getPlanByVariantId(variantId: string): Plan | undefined {
  return Object.values(PLANS).find((p) => p.lemonSqueezyVariantId === variantId);
}

export function isFeatureAllowed(planSlug: string, feature: string): boolean {
  const plan = getPlanBySlug(planSlug);
  if (!plan) return false;
  return plan.features.some((f) => f.toLowerCase().includes(feature.toLowerCase()));
}

export function checkLimit(planSlug: string, limitKey: keyof Plan["limits"], currentValue: number): boolean {
  const plan = getPlanBySlug(planSlug);
  if (!plan) return false;
  const limit = plan.limits[limitKey];
  return currentValue < limit;
}
