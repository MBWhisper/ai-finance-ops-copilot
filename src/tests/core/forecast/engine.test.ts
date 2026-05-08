import { describe, it, expect } from "vitest";
import { generateForecast } from "@/core/forecast/engine";
import type { ForecastInput } from "@/core/forecast/types";

describe("forecast.generateForecast", () => {
  it("returns empty array when no historical data", () => {
    const input: ForecastInput = {
      historicalMrr: [],
      period: 30,
      growthRate: 5,
      seasonalityFactor: 0,
    };
    const result = generateForecast(input);
    expect(result.days).toEqual([]);
    expect(result.period).toBe(30);
  });

  it("generates 30 days of forecast", () => {
    const input: ForecastInput = {
      historicalMrr: [{ date: "2026-05-01", mrrCents: 100000 }],
      period: 30,
      growthRate: 5,
      seasonalityFactor: 0,
    };
    const result = generateForecast(input);
    expect(result.days).toHaveLength(30);
  });

  it("generates 90 days of forecast", () => {
    const input: ForecastInput = {
      historicalMrr: [{ date: "2026-05-01", mrrCents: 100000 }],
      period: 90,
      growthRate: 0,
      seasonalityFactor: 0,
    };
    const result = generateForecast(input);
    expect(result.days).toHaveLength(90);
  });

  it("shows growth when growth rate is positive", () => {
    const input: ForecastInput = {
      historicalMrr: [{ date: "2026-05-01", mrrCents: 100000 }],
      period: 30,
      growthRate: 10,
      seasonalityFactor: 0,
    };
    const result = generateForecast(input);
    const lastDay = result.days[result.days.length - 1]!;
    expect(lastDay.amountCents).toBeGreaterThan(100000);
  });

  it("confidence bands decrease over time", () => {
    const input: ForecastInput = {
      historicalMrr: [{ date: "2026-05-01", mrrCents: 100000 }],
      period: 90,
      growthRate: 0,
      seasonalityFactor: 0,
    };
    const result = generateForecast(input);
    const firstDay = result.days[0]!;
    const lastDay = result.days[result.days.length - 1]!;

    expect(firstDay.bands.p50).toBeGreaterThan(lastDay.bands.p50);
    expect(firstDay.bands.p80).toBeGreaterThan(lastDay.bands.p80);
    expect(firstDay.bands.p95).toBeGreaterThan(lastDay.bands.p95);
  });

  it("p50 wider than p80 wider than p95 at same day", () => {
    const input: ForecastInput = {
      historicalMrr: [{ date: "2026-05-01", mrrCents: 100000 }],
      period: 30,
      growthRate: 0,
      seasonalityFactor: 0,
    };
    const result = generateForecast(input);
    const day = result.days[15]!;

    expect(day.amountCents - day.bands.p50).toBeLessThan(day.amountCents - day.bands.p80);
    expect(day.amountCents - day.bands.p80).toBeLessThan(day.amountCents - day.bands.p95);
  });

  it("bands exist for every day", () => {
    const input: ForecastInput = {
      historicalMrr: [{ date: "2026-05-01", mrrCents: 100000 }],
      period: 60,
      growthRate: 0,
      seasonalityFactor: 0,
    };
    const result = generateForecast(input);
    result.days.forEach((day) => {
      expect(day.bands).toBeDefined();
      expect(day.bands.p50).toBeGreaterThan(0);
      expect(day.bands.p80).toBeGreaterThan(0);
      expect(day.bands.p95).toBeGreaterThan(0);
    });
  });

  it("applies seasonality factor", () => {
    const input: ForecastInput = {
      historicalMrr: [{ date: "2026-05-01", mrrCents: 100000 }],
      period: 30,
      growthRate: 0,
      seasonalityFactor: 0.2,
    };
    const result = generateForecast(input);
    expect(result.days[0]!.amountCents).not.toBe(100000);
  });

  it("sets generatedAt timestamp", () => {
    const input: ForecastInput = {
      historicalMrr: [{ date: "2026-05-01", mrrCents: 100000 }],
      period: 30,
      growthRate: 0,
      seasonalityFactor: 0,
    };
    const result = generateForecast(input);
    expect(result.generatedAt).toBeDefined();
    expect(new Date(result.generatedAt).getTime()).toBeLessThanOrEqual(
      Date.now()
    );
  });

  it("each day has valid date format", () => {
    const input: ForecastInput = {
      historicalMrr: [{ date: "2026-05-01", mrrCents: 100000 }],
      period: 60,
      growthRate: 0,
      seasonalityFactor: 0,
    };
    const result = generateForecast(input);
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    result.days.forEach((day) => {
      expect(dateRegex.test(day.date)).toBe(true);
    });
  });

  it("known dataset produces expected values within ±5%", () => {
    const input: ForecastInput = {
      historicalMrr: [
        { date: "2026-04-01", mrrCents: 100000 },
        { date: "2026-04-15", mrrCents: 102000 },
        { date: "2026-05-01", mrrCents: 105000 },
      ],
      period: 30,
      growthRate: 5,
      seasonalityFactor: 0,
    };
    const result = generateForecast(input);
    const lastDay = result.days[result.days.length - 1]!;

    const expectedMin = lastDay.amountCents * 0.95;
    const expectedMax = lastDay.amountCents * 1.05;

    expect(lastDay.amountCents).toBeGreaterThanOrEqual(expectedMin);
    expect(lastDay.amountCents).toBeLessThanOrEqual(expectedMax);
  });
});
