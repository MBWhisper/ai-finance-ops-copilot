import { NextResponse } from "next/server";
import { sendArReminders } from "@/core/notifications/ar-reminders";
import { logger } from "@/lib/logger";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const sentCount = await sendArReminders();
    return NextResponse.json({ remindersProcessed: sentCount });
  } catch (err) {
    logger.error({ err }, "AR reminders cron failed");
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
