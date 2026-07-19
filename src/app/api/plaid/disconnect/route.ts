import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { deletePlaidAccount } from "@/db/queries/plaid";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await deletePlaidAccount(user.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to disconnect" }, { status: 500 });
  }
}
