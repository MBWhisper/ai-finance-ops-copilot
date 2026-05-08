import Stripe from "stripe";

const stripeCache = new Map<string, Stripe>();

export function getStripeClient(secretKey: string): Stripe {
  const cached = stripeCache.get(secretKey);
  if (cached) return cached;

  const client = new Stripe(secretKey, {
    apiVersion: "2024-06-20",
    typescript: true,
  });

  stripeCache.set(secretKey, client);
  return client;
}
