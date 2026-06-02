import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPayPalAccount, getPayPalMonthlyRevenue, getPayPalTransactionStatusBreakdown, getPayPalTopPayers, getPayPalTransactionsPaginated, getPayPalInvoicesList } from "@/db/queries/paypal";

export async function GET(req: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const account = await getPayPalAccount(user.id);
  if (!account) {
    return NextResponse.json({ connected: false });
  }

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") ?? "1");

  const [monthlyRevenue, transactionStatus, topPayers, transactions, invoices] = await Promise.all([
    getPayPalMonthlyRevenue(account.id),
    getPayPalTransactionStatusBreakdown(account.id),
    getPayPalTopPayers(account.id),
    getPayPalTransactionsPaginated(account.id, page),
    getPayPalInvoicesList(account.id),
  ]);

  return NextResponse.json({
    connected: true,
    monthlyRevenue,
    transactionStatus,
    topPayers,
    transactions,
    invoices,
  });
}
