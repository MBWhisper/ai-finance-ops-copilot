import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { encrypt } from "@/lib/crypto";
import { upsertPayPalAccount } from "@/db/queries/paypal";
import { validateCredentials } from "@/services/paypal";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { clientId, clientSecret, mode } = body as Record<string, string>;

  if (!clientId || !clientSecret) {
    return NextResponse.json({ error: "Client ID and Secret are required" }, { status: 400 });
  }

  try {
    const userInfo = await validateCredentials(clientId, clientSecret, mode ?? "sandbox");

    const encryptedId = encrypt(clientId);
    const encryptedSecret = encrypt(clientSecret);
    await upsertPayPalAccount(
      user.id,
      encryptedId,
      encryptedSecret,
      mode ?? "sandbox",
      userInfo.email,
      userInfo.name ? `${userInfo.name.given_name ?? ""} ${userInfo.name.surname ?? ""}`.trim() : undefined,
    );

    logger.info({ userId: user.id, merchantEmail: userInfo.email }, "PayPal connected");

    return NextResponse.json({
      success: true,
      merchantEmail: userInfo.email,
      merchantName: userInfo.name ? `${userInfo.name.given_name ?? ""} ${userInfo.name.surname ?? ""}`.trim() : null,
    });
  } catch (err) {
    logger.error({ err, userId: user.id }, "Failed to validate PayPal credentials");
    return NextResponse.json({ error: "Invalid PayPal credentials" }, { status: 400 });
  }
}
