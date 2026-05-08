import { db } from "@/db";
import { cashflowForecasts } from "@/db/schema";
import { eq, and, gte, lte } from "drizzle-orm";

const SIX_HOURS_MS = 6 * 60 * 60 * 1000;

export async function getForecasts(
  userId: string,
  options?: { period?: 30 | 60 | 90 }
) {
  const period = options?.period ?? 30;
  const today = new Date().toISOString().split("T")[0]!;
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + period);
  const endDateStr = endDate.toISOString().split("T")[0]!;

  const sixHoursAgo = new Date(Date.now() - SIX_HOURS_MS);

  return db.query.cashflowForecasts.findMany({
    where: and(
      eq(cashflowForecasts.userId, userId),
      gte(cashflowForecasts.forecastDate, today),
      lte(cashflowForecasts.forecastDate, endDateStr),
      gte(cashflowForecasts.createdAt, sixHoursAgo)
    ),
    orderBy: (f, { asc }) => [asc(f.forecastDate)],
  });
}

export async function upsertForecasts(
  userId: string,
  forecasts: Array<{
    forecastDate: string;
    amountCents: number;
    type: "revenue" | "expense" | "net";
    bands: { p50: number; p80: number; p95: number };
  }>
) {
  const today = new Date().toISOString().split("T")[0]!;

  await db
    .delete(cashflowForecasts)
    .where(
      and(
        eq(cashflowForecasts.userId, userId),
        gte(cashflowForecasts.forecastDate, today)
      )
    );

  if (forecasts.length === 0) return;

  await db.insert(cashflowForecasts).values(
    forecasts.map((f) => ({
      userId,
      forecastDate: f.forecastDate,
      amountCents: f.amountCents,
      type: f.type,
      p50Cents: f.bands.p50,
      p80Cents: f.bands.p80,
      p95Cents: f.bands.p95,
    }))
  );
}
