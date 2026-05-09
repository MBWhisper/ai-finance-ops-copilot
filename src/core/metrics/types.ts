export interface MetricResult {
  mrrCents: number;
  arrCents: number;
  churnRate: number;
  ltvCents: number;
}

export interface MetricChange {
  mrr?: number;
  arr?: number;
  churn?: number;
  ltv?: number;
}
