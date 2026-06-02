import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createLinkToken as plaidCreateLinkToken } from "@/services/plaid";

export async function POST() {
  if (!process.env.PLAID_CLIENT_ID || !process.env.PLAID_SECRET) {
    return NextResponse.json(
      { error: "Plaid not configured — missing PLAID_CLIENT_ID or PLAID_SECRET" },
      { status: 500 }
    );
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await plaidCreateLinkToken(user.id);
    return NextResponse.json({ link_token: data.link_token });
  } catch (error: unknown) {
    const plaidError = error as { response?: { data?: { error_message?: string } }; message?: string };
    const message =
      plaidError.response?.data?.error_message ||
      plaidError.message ||
      "Failed to create link token";
    console.error("Plaid error:", plaidError.response?.data || plaidError.message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
