import type { ForecastInput, ForecastResult, ForecastDay, ConfidenceBands } from "./types";

function linearRegression(values: number[]) {
  const n = values.length;
  if (n < 2) return { slope: 0, intercept: values[0] ?? 0 };

  const indices = values.map((_, i) => i);
  const sumX = indices.reduce((a, b) => a + b, 0);
  const sumY = values.reduce((a, b) => a + b, 0);
  const sumXY = indices.reduce((sum, i) => sum + i * values[i]!, 0);
  const sumX2 = indices.reduce((sum, i) => sum + i * i, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

function calculateResidualStd(values: number[], slope: number, intercept: number) {
  if (values.length < 3) return values.length > 0 ? Math.abs(values[0]!) * 0.1 : 0;

  const residuals = values.map((v, i) => {
    const predicted = slope * i + intercept;
    return Math.abs(v - predicted);
  });

  const meanResidual = residuals.reduce((a, b) => a + b, 0) / residuals.length;
  return meanResidual * 1.2;
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0]!;
}

function applySeasonality(dayIndex: number, factor: number): number {
  const weeklyCycle = Math.sin((dayIndex * 2 * Math.PI) / 7) * factor;
  const monthlyCycle = Math.sin((dayIndex * 2 * Math.PI) / 30) * factor * 0.5;
  return 1 + weeklyCycle + monthlyCycle;
}

export function generateForecast(input: ForecastInput): ForecastResult {
  const { historicalMrr, period, growthRate, seasonalityFactor } = input;

  const sorted = [...historicalMrr].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const mrrValues = sorted.map((d) => d.mrrCents);
  const lastDate = sorted[sorted.length - 1]!.date;
  const lastMrr = mrrValues[mrrValues.length - 1]!;

  const { slope, intercept } = linearRegression(mrrValues);
  const residualStd = calculateResidualStd(mrrValues, slope, intercept);

  const days: ForecastDay[] = [];

  for (let i = 1; i <= period; i++) {
    const date = addDays(lastDate, i);
    const seasonality = applySeasonality(i, seasonalityFactor);

    const dailyGrowthRate = growthRate / period;
    const trendValue = lastMrr * (1 + (dailyGrowthRate * i) / 100);
    const regressionValue = slope * (mrrValues.length + i) + intercept;
    const baseValue = (trendValue + regressionValue) / 2;

    const amountCents = Math.round(baseValue * seasonality);

    const wideningFactor = Math.sqrt(i / period);
    const p95Offset = Math.round(residualStd * 2 * wideningFactor);
    const p80Offset = Math.round(residualStd * 1.3 * wideningFactor);
    const p50Offset = Math.round(residualStd * 0.5 * wideningFactor);

    const bands: ConfidenceBands = {
      p50: amountCents - p50Offset,
      p80: amountCents - p80Offset,
      p95: amountCents - p95Offset,
    };

    days.push({
      date,
      amountCents,
      type: "revenue",
      bands,
    });
  }

  return {
    days,
    period,
    generatedAt: new Date().toISOString(),
  };
}
