import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { events } from "@/db/schema";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, userId, anonymousId, metadata, page } = body;

    if (!name) {
      return NextResponse.json({ error: "Missing event name" }, { status: 400 });
    }

    await db.insert(events).values({
      name,
      userId: userId ?? null,
      anonymousId: anonymousId ?? null,
      metadata: metadata ?? null,
      page: page ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 });
  }
}
