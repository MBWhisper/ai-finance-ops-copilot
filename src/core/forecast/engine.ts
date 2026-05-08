import type { ForecastInput, ForecastResult, ForecastDay, ConfidenceBands } from "./types";

export function generateForecast(input: ForecastInput): ForecastResult {
  const { historicalMrr, period, growthRate, seasonalityFactor } = input;

  if (historicalMrr.length === 0) {
    return { days: [], period, generatedAt: new Date().toISOString() };
  }

  const lastMrr = historicalMrr[historicalMrr.length - 1]!.mrrCents;
  const days: ForecastDay[] = [];
  const startDate = new Date();

  for (let i = 1; i <= period; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);

    const monthlyGrowth = growthRate / 100;
    const dailyGrowth = monthlyGrowth / 30;
    const baseAmount = Math.round(lastMrr * (1 + dailyGrowth * i));

    const monthOfYear = date.getMonth();
    const seasonalMultiplier = 1 + seasonalityFactor * Math.sin((monthOfYear * Math.PI) / 6);
    const adjustedAmount = Math.round(baseAmount * seasonalMultiplier);

    const bands = calculateConfidenceBands(adjustedAmount, i, period);

    days.push({
      date: date.toISOString().split("T")[0]!,
      amountCents: adjustedAmount,
      type: "revenue",
      bands,
    });
  }

  return { days, period, generatedAt: new Date().toISOString() };
}

function calculateConfidenceBands(
  baseAmount: number,
  dayIndex: number,
  totalDays: number
): ConfidenceBands {
  const uncertainty = dayIndex / totalDays;
  const p50Range = Math.round(baseAmount * 0.05 * uncertainty);
  const p80Range = Math.round(baseAmount * 0.12 * uncertainty);
  const p95Range = Math.round(baseAmount * 0.20 * uncertainty);

  return {
    p50: baseAmount - p50Range,
    p80: baseAmount - p80Range,
    p95: baseAmount - p95Range,
  };
}
