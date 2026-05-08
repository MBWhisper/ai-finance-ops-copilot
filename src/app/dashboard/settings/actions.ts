"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { stripeAccounts } from "@/db/schema";
import { encrypt } from "@/lib/crypto";
import { stripeKeySchema } from "@/lib/validation";
import { logger } from "@/lib/logger";
import { syncStripeData } from "@/core/stripe/sync";
import { eq } from "drizzle-orm";

export async function saveStripeKey(formData: FormData): Promise<void> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const raw = {
    stripeKey: formData.get("stripeKey") as string,
  };

  const validated = stripeKeySchema.safeParse(raw);
  if (!validated.success) {
    throw new Error(validated.error.errors[0]?.message ?? "Invalid key");
  }

  try {
    const encrypted = encrypt(validated.data.stripeKey);

    const existing = await db.query.stripeAccounts.findFirst({
      where: eq(stripeAccounts.userId, user.id),
    });

    if (existing) {
      await db
        .update(stripeAccounts)
        .set({ accessToken: encrypted, lastSyncAt: null })
        .where(eq(stripeAccounts.userId, user.id));
    } else {
      await db.insert(stripeAccounts).values({
        userId: user.id,
        accessToken: encrypted,
      });
    }

    logger.info({ userId: user.id }, "Stripe key saved");

    await syncStripeData(user.id);

    revalidatePath("/dashboard/overview");
    redirect("/dashboard/overview");
  } catch (err) {
    logger.error({ err, userId: user.id }, "Failed to save Stripe key");
    throw err;
  }
}
