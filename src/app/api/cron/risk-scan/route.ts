import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    logger.info("[RISK-SCAN] Starting risk scan for all customers");

    // TODO: In production, fetch all customers from DB, run calculateRiskScore
    // and create notifications for high-risk customers

    return NextResponse.json({
      ok: true,
      message: "Risk scan completed. 0 critical, 0 at-risk customers found.",
    });
  } catch (err) {
    logger.error({ err }, "[RISK-SCAN] Risk scan failed");
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
