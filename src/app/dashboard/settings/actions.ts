"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function saveStripeKey(formData: FormData): Promise<void> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  try {
    const { stripeKeySchema } = await import('@/lib/validation')
    const { encrypt } = await import('@/lib/crypto')
    const { stripeAccounts } = await import('@/db/schema')
    const { syncStripeData } = await import('@/core/stripe/sync')
    const { logger } = await import('@/lib/logger')

    const raw = { stripeKey: formData.get("stripeKey") as string };
    const validated = stripeKeySchema.safeParse(raw);
    if (!validated.success) throw new Error(validated.error.errors[0]?.message ?? "Invalid key");

    const encrypted = encrypt(validated.data.stripeKey);
    const existing = await db.query.stripeAccounts.findFirst({
      where: eq(stripeAccounts.userId, user.id),
    });

    if (existing) {
      await db.update(stripeAccounts).set({ accessToken: encrypted, lastSyncAt: null }).where(eq(stripeAccounts.userId, user.id));
    } else {
      await db.insert(stripeAccounts).values({ userId: user.id, accessToken: encrypted });
    }

    logger.info({ userId: user.id }, "Stripe key saved");
    await syncStripeData(user.id);
    revalidatePath("/dashboard/overview");
    redirect("/dashboard/overview");
  } catch (err) {
    throw err;
  }
}

export async function updateProfile(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  const name = formData.get("name") as string;
  if (!name?.trim()) return { success: false, error: "Name is required" };

  try {
    await db.update(users).set({ name: name.trim(), updatedAt: new Date() }).where(eq(users.id, user.id));
    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to update profile" };
  }
}

type WorkspaceSettings = {
  companyName?: string;
  billingEmail?: string;
  financeContact?: string;
  defaultCurrency?: string;
  invoicePrefix?: string;
};

type NotificationSettings = {
  overdueAlerts?: boolean;
  paymentReceived?: boolean;
  weeklySummary?: boolean;
  churnWarnings?: boolean;
  productAnnouncements?: boolean;
};

export async function updateWorkspaceSettings(
  data: WorkspaceSettings
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  try {
    const existing = await db.query.users.findFirst({
      where: eq(users.id, user.id),
      columns: { settings: true },
    });

    const currentSettings = (existing?.settings ?? {}) as Record<string, unknown>;
    const merged = { ...currentSettings, workspace: data };

    await db
      .update(users)
      .set({ settings: merged, updatedAt: new Date() })
      .where(eq(users.id, user.id));

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to save workspace settings" };
  }
}

export async function updateNotificationSettings(
  data: NotificationSettings
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Unauthorized" };

  try {
    const existing = await db.query.users.findFirst({
      where: eq(users.id, user.id),
      columns: { settings: true },
    });

    const currentSettings = (existing?.settings ?? {}) as Record<string, unknown>;
    const merged = { ...currentSettings, notifications: data };

    await db
      .update(users)
      .set({ settings: merged, updatedAt: new Date() })
      .where(eq(users.id, user.id));

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (err) {
    return { success: false, error: "Failed to save notification preferences" };
  }
}
