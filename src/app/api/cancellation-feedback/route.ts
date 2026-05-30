import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { cancellationFeedback } from "@/db/schema";
import { logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { reason, comment } = await req.json();

    if (!reason || typeof reason !== "string") {
      return NextResponse.json({ error: "Missing cancellation reason" }, { status: 400 });
    }

    await db.insert(cancellationFeedback).values({
      userId: user.id,
      reason,
      comment: comment ?? null,
      cancelledAt: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    logger.error({ err }, "Failed to save cancellation feedback");
    return NextResponse.json({ error: "Failed to save feedback" }, { status: 500 });
  }
}
