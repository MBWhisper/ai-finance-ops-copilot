import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPayPalAccount, getPayPalDashboardData } from "@/db/queries/paypal";

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const account = await getPayPalAccount(user.id);
  if (!account) {
    return NextResponse.json({ isConnected: false });
  }

  const data = await getPayPalDashboardData(user.id);

  return NextResponse.json({
    ...data,
    merchantEmail: account.merchantEmail,
    storeName: account.merchantName,
  });
}
