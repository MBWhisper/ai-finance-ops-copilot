import { NextResponse } from "next/server";
import { db } from "@/db";
import { stripeAccounts } from "@/db/schema";
import { syncStripeData } from "@/core/stripe/sync";
import { logger } from "@/lib/logger";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const accounts = await db.query.stripeAccounts.findMany();
    const results = [];

    for (const account of accounts) {
      try {
        const result = await syncStripeData(account.userId);
        results.push({ userId: account.userId, ...result });
      } catch (err) {
        logger.error({ err, userId: account.userId }, "Stripe sync failed");
        results.push({ userId: account.userId, error: String(err) });
      }
    }

    return NextResponse.json({ synced: results.length, results });
  } catch (err) {
    logger.error({ err }, "Stripe sync cron failed");
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
