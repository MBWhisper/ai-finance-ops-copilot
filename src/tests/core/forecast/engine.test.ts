import { describe, it, expect } from "vitest";
import { generateForecast } from "@/core/forecast/engine";
import type { ForecastInput } from "@/core/forecast/types";

const baseInput: ForecastInput = {
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

describe("generateForecast", () => {
  it("returns correct number of forecast days", () => {
    const result = generateForecast(baseInput);
    expect(result.days).toHaveLength(30);
  });

  it("returns correct period in result", () => {
    const result = generateForecast(baseInput);
    expect(result.period).toBe(30);
  });

  it("generates forecast for 60 day period", () => {
    const input = { ...baseInput, period: 60 as const };
    const result = generateForecast(input);
    expect(result.days).toHaveLength(60);
  });

  it("generates forecast for 90 day period", () => {
    const input = { ...baseInput, period: 90 as const };
    const result = generateForecast(input);
    expect(result.days).toHaveLength(90);
  });

  it("each day has date, amountCents, type, and bands", () => {
    const result = generateForecast(baseInput);
    for (const day of result.days) {
      expect(day).toHaveProperty("date");
      expect(day).toHaveProperty("amountCents");
      expect(day).toHaveProperty("type");
      expect(day).toHaveProperty("bands");
    }
  });

  it("type is revenue for all days", () => {
    const result = generateForecast(baseInput);
    for (const day of result.days) {
      expect(day.type).toBe("revenue");
    }
  });

  it("has confidence bands (p50, p80, p95)", () => {
    const result = generateForecast(baseInput);
    for (const day of result.days) {
      expect(day.bands).toHaveProperty("p50");
      expect(day.bands).toHaveProperty("p80");
      expect(day.bands).toHaveProperty("p95");
    }
  });

  it("confidence bands widen over time", () => {
    const result = generateForecast(baseInput);
    const firstDay = result.days[0]!;
    const lastDay = result.days[result.days.length - 1]!;
    const firstSpread = firstDay.bands.p50 - firstDay.bands.p95;
    const lastSpread = lastDay.bands.p50 - lastDay.bands.p95;
    expect(lastSpread).toBeGreaterThanOrEqual(firstSpread);
  });

  it("generatedAt is a valid ISO string", () => {
    const result = generateForecast(baseInput);
    expect(() => new Date(result.generatedAt)).not.toThrow();
  });

  it("amountCents are positive", () => {
    const result = generateForecast(baseInput);
    for (const day of result.days) {
      expect(day.amountCents).toBeGreaterThan(0);
    }
  });

  it("forecast dates are chronological", () => {
    const result = generateForecast(baseInput);
    for (let i = 1; i < result.days.length; i++) {
      expect(new Date(result.days[i]!.date).getTime()).toBeGreaterThan(
        new Date(result.days[i - 1]!.date).getTime()
      );
    }
  });
});
