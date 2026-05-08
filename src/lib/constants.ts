export const PLANS = {
  starter: { name: "Starter", price: 29, stripePriceId: "price_starter_placeholder" },
  pro: { name: "Pro", price: 79, stripePriceId: "price_pro_placeholder" },
  scale: { name: "Scale", price: 199, stripePriceId: "price_scale_placeholder" },
} as const;

export type PlanKey = keyof typeof PLANS;

export const FORECAST_PERIODS = [30, 60, 90] as const;

export const MAX_REMINDER_COUNT = 3;

export const CACHE_TTL_HOURS = 6;
