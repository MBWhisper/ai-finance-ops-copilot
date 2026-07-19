import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPayPalAccount, getPayPalDashboardData } from "@/db/queries/paypal";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const account = await getPayPalAccount(user.id);
  if (!account) {
    return NextResponse.json({ connected: false });
  }

  const dashboard = await getPayPalDashboardData(user.id);

  return NextResponse.json({
    connected: true,
    mrr: dashboard?.activeSubscriptions ?? 0,
    monthlyRevenue: dashboard?.monthlyRevenue ?? 0,
    lifetimeRevenue: dashboard?.balance ?? 0,
    activeSubscriptions: dashboard?.activeSubscriptions ?? 0,
  });
}
