import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPayPalAccount } from "@/db/queries/paypal";
import { syncPayPalTransactions, syncPayPalInvoices } from "@/services/paypalSync";
import { db } from "@/db";
import { paypalAccounts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { logger } from "@/lib/logger";

export async function POST() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const account = await getPayPalAccount(user.id);
  if (!account) {
    return NextResponse.json({ error: "PayPal not connected" }, { status: 400 });
  }

  try {
    await syncPayPalTransactions(account.id);
    await syncPayPalInvoices(account.id);
    await db
      .update(paypalAccounts)
      .set({ lastSyncedAt: new Date() })
      .where(eq(paypalAccounts.id, account.id));

    logger.info({ userId: user.id, accountId: account.id }, "PayPal sync completed");

    return NextResponse.json({ success: true, syncedAt: new Date().toISOString() });
  } catch (err) {
    logger.error({ err, userId: user.id }, "PayPal sync failed");
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
