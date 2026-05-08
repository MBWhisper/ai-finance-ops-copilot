"use client";

import { KPICard } from "@/components/dashboard/kpi-card";
import type { MetricResult } from "@/core/metrics/types";

interface KPICGridProps {
  metrics: MetricResult;
  changes?: {
    mrr?: number;
    arr?: number;
    churn?: number;
    ltv?: number;
  };
}

export function KPICGrid({ metrics, changes = {} }: KPICGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="MRR"
        value={metrics.mrrCents}
        format="currency"
        change={changes.mrr}
      />
      <KPICard
        title="ARR"
        value={metrics.arrCents}
        format="currency"
        change={changes.arr}
      />
      <KPICard
        title="Churn Rate"
        value={metrics.churnRate}
        format="percent"
        change={changes.churn}
      />
      <KPICard
        title="LTV"
        value={metrics.ltvCents}
        format="currency"
        change={changes.ltv}
      />
    </div>
  );
}
