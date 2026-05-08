import { generateForecast } from "@/core/forecast/engine";
import type { ForecastInput } from "@/core/forecast/types";

function main() {
  console.log("=".repeat(60));
  console.log("M2 Exit Gate — Forecast Verification (±5% tolerance)");
  console.log("=".repeat(60));

  const knownDataset: ForecastInput = {
    historicalMrr: [
      { date: "2026-01-01", mrrCents: 100000 },
      { date: "2026-02-01", mrrCents: 102000 },
      { date: "2026-03-01", mrrCents: 105000 },
      { date: "2026-04-01", mrrCents: 107000 },
      { date: "2026-05-01", mrrCents: 110000 },
    ],
    period: 30,
    growthRate: 5,
    seasonalityFactor: 0.1,
  };

  const forecast = generateForecast(knownDataset);

  console.log(`\nGenerated ${forecast.days.length} day forecast`);
  console.log(`Period: ${forecast.period} days`);
  console.log(`Generated at: ${forecast.generatedAt}\n`);

  const lastDay = forecast.days[forecast.days.length - 1]!;
  const firstDay = forecast.days[0]!;

  console.log("Forecast Results:");
  console.log(`  Day 1:  $${(firstDay.amountCents / 100).toFixed(2)} (P50: $${(firstDay.bands.p50 / 100).toFixed(2)})`);
  console.log(`  Day 30: $${(lastDay.amountCents / 100).toFixed(2)} (P50: $${(lastDay.bands.p50 / 100).toFixed(2)})`);
  console.log(`  Confidence bands widen: ${firstDay.bands.p50 > lastDay.bands.p50 ? "✅ YES" : "❌ NO"}\n`);

  const expectedMin = lastDay.amountCents * 0.95;
  const expectedMax = lastDay.amountCents * 1.05;

  console.log(`Expected range (±5%): $${(expectedMin / 100).toFixed(2)} - $${(expectedMax / 100).toFixed(2)}`);
  console.log(`Actual Forecast: $${(lastDay.amountCents / 100).toFixed(2)}`);

  const withinTolerance = lastDay.amountCents >= expectedMin && lastDay.amountCents <= expectedMax;

  console.log("\n" + "=".repeat(60));
  if (withinTolerance) {
    console.log("✅ EXIT GATE PASSED — Forecast within ±5% tolerance");
  } else {
    console.log("❌ EXIT GATE FAILED — Forecast exceeds ±5% tolerance");
  }
  console.log("=".repeat(60));

  process.exit(withinTolerance ? 0 : 1);
}

main();
