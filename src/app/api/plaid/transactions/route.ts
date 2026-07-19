import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { decrypt } from "@/lib/crypto";
import { getPlaidAccount } from "@/db/queries/plaid";
import { getTransactions } from "@/services/plaid";

export async function GET() {
  const supabase = await createClient();
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
    const data = await getTransactions(accessToken);

    return NextResponse.json({
      accounts: data.accounts,
      transactions: data.transactions,
      total_transactions: data.total_transactions,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}
