import { db } from "@/db";
import { events } from "@/db/schema";

type EventName =
  | "page_view"
  | "cta_click_start_trial"
  | "cta_click_live_demo"
  | "cta_click_upgrade"
  | "trial_started"
  | "subscription_activated"
  | "subscription_canceled"
  | "signup_completed";

export async function trackEvent(
  name: EventName,
  opts?: {
    userId?: string;
    metadata?: Record<string, unknown>;
    page?: string;
  }
) {
  try {
    await db.insert(events).values({
      name,
      userId: opts?.userId ?? null,
      metadata: opts?.metadata ?? null,
      page: opts?.page ?? null,
    });
  } catch {
    // Analytics should never break the app
  }
}
