import { db } from "@/db";
import { plaidAccounts, plaidTransactions } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";

export async function getPlaidAccount(userId: string) {
  const row = await db.query.plaidAccounts.findFirst({
    where: eq(plaidAccounts.userId, userId),
  });
  return row ?? null;
}

export async function getPlaidAccountById(id: string) {
  const row = await db.query.plaidAccounts.findFirst({
    where: eq(plaidAccounts.id, id),
  });
  return row ?? null;
}

export async function upsertPlaidAccount(
  userId: string,
  accessToken: string,
  itemId: string,
  institutionName?: string,
  institutionId?: string,
  bacs?: string,
) {
  const existing = await db.query.plaidAccounts.findFirst({
    where: eq(plaidAccounts.userId, userId),
  });

  if (existing) {
    await db
      .update(plaidAccounts)
      .set({ accessToken, itemId, institutionName, institutionId, bacs, lastSyncedAt: null })
      .where(eq(plaidAccounts.userId, userId));
  } else {
    await db
      .insert(plaidAccounts)
      .values({ userId, accessToken, itemId, institutionName, institutionId, bacs });
  }
}

export async function deletePlaidAccount(userId: string) {
  const account = await db.query.plaidAccounts.findFirst({
    where: eq(plaidAccounts.userId, userId),
    columns: { id: true },
  });
  if (account) {
    await db.delete(plaidTransactions).where(eq(plaidTransactions.accountId, account.id));
  }
  await db.delete(plaidAccounts).where(eq(plaidAccounts.userId, userId));
}

export async function updatePlaidLastSynced(userId: string) {
  await db
    .update(plaidAccounts)
    .set({ lastSyncedAt: new Date() })
    .where(eq(plaidAccounts.userId, userId));
}

export async function upsertPlaidTransactions(
  accountId: string,
  transactions: {
    plaidTransactionId: string;
    plaidAccountId?: string;
    category?: string;
    subcategory?: string;
    type?: string;
    name?: string;
    merchantName?: string;
    amount: number;
    currency?: string;
    isoCurrencyCode?: string;
    date: string;
    pending?: string;
    paymentChannel?: string;
  }[],
) {
  for (const txn of transactions) {
    await db
      .insert(plaidTransactions)
      .values({ accountId, ...txn })
      .onConflictDoNothing({ target: plaidTransactions.plaidTransactionId });
  }
}
