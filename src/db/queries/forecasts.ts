import { db } from "@/db";
import { cashflowForecasts } from "@/db/schema";
import { eq, and, gte, desc } from "drizzle-orm";

interface UpsertForecastInput {
  forecastDate: string;
  amountCents: number;
  type: string;
  bands?: { p50: number; p80: number; p95: number } | null;
}

export async function upsertForecasts(userId: string, forecasts: UpsertForecastInput[]) {
  for (const f of forecasts) {
    const existing = await db.query.cashflowForecasts.findFirst({
      where: and(
        eq(cashflowForecasts.userId, userId),
        eq(cashflowForecasts.forecastDate, f.forecastDate),
        eq(cashflowForecasts.type, f.type)
      ),
    });

    if (existing) {
      await db
        .update(cashflowForecasts)
        .set({
          amountCents: f.amountCents,
          p50Cents: f.bands?.p50 ?? null,
          p80Cents: f.bands?.p80 ?? null,
          p95Cents: f.bands?.p95 ?? null,
        })
        .where(eq(cashflowForecasts.id, existing.id));
    } else {
      await db.insert(cashflowForecasts).values({
        userId,
        forecastDate: f.forecastDate,
        amountCents: f.amountCents,
        type: f.type,
        p50Cents: f.bands?.p50 ?? null,
        p80Cents: f.bands?.p80 ?? null,
        p95Cents: f.bands?.p95 ?? null,
      });
    }
  }
}

export async function getForecasts(userId: string, startDate: string, endDate: string) {
  return db.query.cashflowForecasts.findMany({
    where: and(
      eq(cashflowForecasts.userId, userId),
      gte(cashflowForecasts.forecastDate, startDate),
      gte(cashflowForecasts.forecastDate, endDate)
    ),
    orderBy: (f) => [desc(f.createdAt)],
  });
}
