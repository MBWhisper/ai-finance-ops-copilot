import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getLemonSqueezyAccount } from "@/db/queries/lemon-squeezy";
import { decrypt } from "@/lib/crypto";
import { syncLemonSqueezyData } from "@/services/lemonSqueezySync";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const account = await getLemonSqueezyAccount(user.id);
    if (!account) {
      return NextResponse.json({ error: "No Lemon Squeezy account connected" }, { status: 400 });
    }

    const apiKey = decrypt(account.apiKey);
    const result = await syncLemonSqueezyData(user.id, apiKey);

    logger.info({ userId: user.id, ...result }, "Lemon Squeezy manual sync completed");

    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    logger.error({ err, userId: user.id }, "Lemon Squeezy sync failed");
    return NextResponse.json({ error: "Sync failed. Please try again." }, { status: 500 });
  }
}
