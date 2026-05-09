import Stripe from "stripe";

let client: Stripe | null = null;

export function getStripeClient(secretKey: string): Stripe {
  if (!client) {
    client = new Stripe(secretKey, {
      apiVersion: "2024-06-20",
    });
  }
  return client;
}

export function resetStripeClient(): void {
  client = null;
}
