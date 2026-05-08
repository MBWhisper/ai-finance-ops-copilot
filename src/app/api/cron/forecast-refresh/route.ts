import { NextResponse } from "next/server";
import { db } from "@/db";
import { metricsDaily } from "@/db/schema";
import { generateForecast } from "@/core/forecast/engine";
import { upsertForecasts } from "@/db/queries/forecasts";
import { FORECAST_PERIODS } from "@/lib/constants";
import { logger } from "@/lib/logger";
import { eq, desc } from "drizzle-orm";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await db.selectDistinct({ userId: metricsDaily.userId }).from(metricsDaily);
    const results = [];

    for (const { userId } of users) {
      try {
        const history = await db.query.metricsDaily.findMany({
          where: eq(metricsDaily.userId, userId),
          orderBy: (m) => [desc(m.date)],
          limit: 90,
        });

        const historicalMrr = history.map((h) => ({
          date: h.date,
          mrrCents: h.mrrCents,
        }));

        if (historicalMrr.length < 2) continue;

        const firstMrr = historicalMrr[historicalMrr.length - 1]!.mrrCents;
        const lastMrr = historicalMrr[0]!.mrrCents;
        const growthRate = firstMrr > 0 ? ((lastMrr - firstMrr) / firstMrr) * 100 : 0;

        for (const period of FORECAST_PERIODS) {
          const forecast = generateForecast({
            historicalMrr,
            period,
            growthRate,
            seasonalityFactor: 0.1,
          });

          await upsertForecasts(
            userId,
            forecast.days.map((d) => ({
              forecastDate: d.date,
              amountCents: d.amountCents,
              type: d.type,
              bands: d.bands,
            }))
          );
        }

        results.push({ userId, status: "ok" });
      } catch (err) {
        logger.error({ err, userId }, "Forecast generation failed");
        results.push({ userId, status: "error", error: String(err) });
      }
    }

    return NextResponse.json({ generated: results.length, results });
  } catch (err) {
    logger.error({ err }, "Forecast refresh cron failed");
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
