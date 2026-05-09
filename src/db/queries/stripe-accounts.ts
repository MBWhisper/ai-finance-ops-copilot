import { db } from "@/db";
import { stripeAccounts } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getStripeAccount(userId: string) {
  const row = await db.query.stripeAccounts.findFirst({
    where: eq(stripeAccounts.userId, userId),
  });
  if (!row) return null;
  return {
    id: row.id,
    userId: row.userId,
    stripeAccountId: row.stripeAccountId,
    accessToken: row.accessToken,
    lastSyncAt: row.lastSyncAt,
    webhookSecret: row.webhookSecret,
    createdAt: row.createdAt,
  };
}

export async function upsertStripeAccount(userId: string, encryptedKey: string) {
  const existing = await db.query.stripeAccounts.findFirst({
    where: eq(stripeAccounts.userId, userId),
  });

  if (existing) {
    await db
      .update(stripeAccounts)
      .set({ accessToken: encryptedKey, lastSyncAt: null })
      .where(eq(stripeAccounts.userId, userId));
  } else {
    await db.insert(stripeAccounts).values({
      userId,
      accessToken: encryptedKey,
    });
  }
}
