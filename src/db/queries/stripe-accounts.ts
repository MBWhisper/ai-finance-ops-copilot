import { db } from "@/db";
import { stripeAccounts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getStripeAccount(userId: string) {
  return db.query.stripeAccounts.findFirst({
    where: eq(stripeAccounts.userId, userId),
  });
}

export async function upsertStripeAccount(
  userId: string,
  accessToken: string
) {
  const existing = await getStripeAccount(userId);

  if (existing) {
    return db
      .update(stripeAccounts)
      .set({ accessToken, lastSyncAt: null })
      .where(eq(stripeAccounts.userId, userId));
  }

  return db.insert(stripeAccounts).values({ userId, accessToken });
}

export async function updateLastSync(userId: string) {
  return db
    .update(stripeAccounts)
    .set({ lastSyncAt: new Date() })
    .where(eq(stripeAccounts.userId, userId));
}
