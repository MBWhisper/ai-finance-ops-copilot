import { db } from "@/db";
import { metricsDaily } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function getLatestMetrics(userId: string) {
  const rows = await db.query.metricsDaily.findMany({
    where: eq(metricsDaily.userId, userId),
    orderBy: (m) => [desc(m.date)],
    limit: 1,
  });
  if (rows.length === 0) return null;
  const row = rows[0]!;
  return {
    mrrCents: row.mrrCents,
    arrCents: row.arrCents,
    churnRate: row.churnRate ? Number(row.churnRate) : 0,
    ltvCents: row.ltvCents ?? 0,
  };
}

export async function getMetricsHistory(userId: string, days: number) {
  const rows = await db.query.metricsDaily.findMany({
    where: eq(metricsDaily.userId, userId),
    orderBy: (m) => [desc(m.date)],
    limit: days,
  });
  return rows.map((r) => ({
    date: r.date,
    mrrCents: r.mrrCents,
    arrCents: r.arrCents,
    churnRate: r.churnRate ? Number(r.churnRate) : 0,
    ltvCents: r.ltvCents ?? 0,
  }));
}
