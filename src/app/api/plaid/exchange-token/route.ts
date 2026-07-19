import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { encrypt } from "@/lib/crypto";
import { exchangePublicToken } from "@/services/plaid";
import { upsertPlaidAccount } from "@/db/queries/plaid";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { publicToken, institutionName, institutionId } = body as Record<string, string>;

  if (!publicToken) {
    return NextResponse.json({ error: "Public token is required" }, { status: 400 });
  }

  try {
    const exchange = await exchangePublicToken(publicToken);
    const encryptedToken = encrypt(exchange.access_token);

    await upsertPlaidAccount(
      user.id,
      encryptedToken,
      exchange.item_id,
      institutionName,
      institutionId,
    );

    return NextResponse.json({
      success: true,
      institutionName: institutionName ?? "Bank",
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to exchange token" }, { status: 500 });
  }
}
