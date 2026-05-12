import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getSubscription(userId: string) {
  const result = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, userId))
    .limit(1);
  return result[0] ?? null;
}

export async function upsertSubscription(
  userId: string,
  data: {
    plan: string;
    status: string;
    lemonSqueezySubscriptionId?: string;
    lemonSqueezyCustomerId?: string;
    lemonSqueezyOrderId?: string;
    lemonSqueezyProductId?: string;
    lemonSqueezyVariantId?: string;
    lemonSqueezyCustomerPortalUrl?: string;
    trialEndsAt?: Date | null;
    renewsAt?: Date | null;
    endsAt?: Date | null;
    isCancelled?: boolean;
    stripeSubId?: string;
  }
) {
  const existing = await getSubscription(userId);
  if (existing) {
    return db
      .update(subscriptions)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(subscriptions.userId, userId))
      .returning();
  }
  return db
    .insert(subscriptions)
    .values({ userId, ...data })
    .returning();
}
