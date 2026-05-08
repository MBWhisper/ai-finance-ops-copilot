export interface ConfidenceBands {
  p50: number;
  p80: number;
  p95: number;
}

export interface ForecastDay {
  date: string;
  amountCents: number;
  type: "revenue" | "expense" | "net";
  bands: ConfidenceBands;
}

export interface ForecastResult {
  days: ForecastDay[];
  period: 30 | 60 | 90;
  generatedAt: string;
}

export interface ForecastInput {
  historicalMrr: Array<{ date: string; mrrCents: number }>;
  period: 30 | 60 | 90;
  growthRate: number;
  seasonalityFactor: number;
}
