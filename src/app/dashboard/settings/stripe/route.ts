import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { upsertStripeAccount } from "@/db/queries/stripe-accounts";
import { encrypt } from "@/lib/crypto";
import { stripeKeySchema } from "@/lib/validation";
import { syncStripeData } from "@/core/stripe/sync";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const validated = stripeKeySchema.safeParse(body);

  if (!validated.success) {
    return NextResponse.json(
      { error: validated.error.errors[0]?.message ?? "Invalid key" },
      { status: 400 }
    );
  }

  try {
    const encrypted = encrypt(validated.data.stripeKey);
    await upsertStripeAccount(user.id, encrypted);
    await syncStripeData(user.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    logger.error({ err, userId: user.id }, "Failed to save Stripe key");
    return NextResponse.json(
      { error: "Failed to save Stripe key" },
      { status: 500 }
    );
  }
}
