import { db } from "@/db";
import { metricsDaily } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { logger } from "@/lib/logger";

export async function getLatestMetrics(userId: string) {
  const result = await db.query.metricsDaily.findFirst({
    where: eq(metricsDaily.userId, userId),
    orderBy: (m) => [desc(m.date)],
  });

  if (!result) {
    logger.warn({ userId }, "No metrics found for user");
    return null;
  }

  return {
    mrrCents: result.mrrCents,
    arrCents: result.arrCents,
    churnRate: result.churnRate ? parseFloat(result.churnRate) : 0,
    ltvCents: result.ltvCents ?? 0,
  };
}

export async function getMetricsHistory(
  userId: string,
  days: number = 90
) {
  const result = await db.query.metricsDaily.findMany({
    where: eq(metricsDaily.userId, userId),
    orderBy: (m) => [desc(m.date)],
    limit: days,
  });

  return result.map((r) => ({
    date: r.date,
    mrrCents: r.mrrCents,
    arrCents: r.arrCents,
    churnRate: r.churnRate ? parseFloat(r.churnRate) : 0,
    ltvCents: r.ltvCents ?? 0,
  }));
}
