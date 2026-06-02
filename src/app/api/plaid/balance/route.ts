import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { decrypt } from "@/lib/crypto";
import { getPlaidAccount } from "@/db/queries/plaid";
import { getBalances } from "@/services/plaid";

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const account = await getPlaidAccount(user.id);
    if (!account) {
      return NextResponse.json({ error: "No Plaid account connected" }, { status: 404 });
    }

    const accessToken = decrypt(account.accessToken);
    const data = await getBalances(accessToken);

    return NextResponse.json({
      accounts: data.accounts,
      institutionName: account.institutionName,
      institutionId: account.institutionId,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch balances" }, { status: 500 });
  }
}
