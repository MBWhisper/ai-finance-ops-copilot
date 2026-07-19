import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { deletePayPalAccount } from "@/db/queries/paypal";

export async function DELETE() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await deletePayPalAccount(user.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to disconnect" }, { status: 500 });
  }
}
