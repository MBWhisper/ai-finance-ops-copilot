import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { encrypt } from "@/lib/crypto";
import { upsertLemonSqueezyAccount } from "@/db/queries/lemon-squeezy";
import { validateLemonSqueezyKey } from "@/services/lemonSqueezy";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const apiKey = body.apiKey as string | undefined;

  if (!apiKey || apiKey.length < 10) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 400 });
  }

  try {
    const result = await validateLemonSqueezyKey(apiKey);
    if (!result.valid) {
      return NextResponse.json({ error: "Invalid API key. Please check your Lemon Squeezy settings." }, { status: 400 });
    }

    const encrypted = encrypt(apiKey);
    await upsertLemonSqueezyAccount(user.id, encrypted, result.storeName, result.storeId);

    logger.info({ userId: user.id, storeName: result.storeName }, "Lemon Squeezy connected");

    return NextResponse.json({ success: true, storeName: result.storeName, storeId: result.storeId });
  } catch (err) {
    logger.error({ err, userId: user.id }, "Failed to validate Lemon Squeezy key");
    return NextResponse.json({ error: "Unable to reach Lemon Squeezy. Please try again." }, { status: 500 });
  }
}
