import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getLemonSqueezyAccount } from "@/db/queries/lemon-squeezy";
import { getLemonSqueezyDashboardData } from "@/db/queries/lemon-squeezy";
import { decrypt } from "@/lib/crypto";
import { logger } from "@/lib/logger";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const account = await getLemonSqueezyAccount(user.id);
    if (!account) {
      return NextResponse.json({ connected: false, data: null });
    }

    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get("refresh") === "true";

    if (forceRefresh) {
      const { syncLemonSqueezyData } = await import("@/services/lemonSqueezySync");
      const apiKey = decrypt(account.apiKey);
      await syncLemonSqueezyData(user.id, apiKey);
    }

    const data = await getLemonSqueezyDashboardData(user.id);
    return NextResponse.json({
      connected: true,
      storeName: account.storeName,
      storeId: account.storeId,
      data,
    });
  } catch (err) {
    logger.error({ err, userId: user.id }, "Failed to fetch LS dashboard data");
    return NextResponse.json({ error: "Unable to reach Lemon Squeezy. Showing cached data." }, { status: 500 });
  }
}
