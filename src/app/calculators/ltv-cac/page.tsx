"use client";

import { useState } from "react";
import Link from "next/link";

export default function LTVCACCalculatorPage() {
  const [avgRevenue, setAvgRevenue] = useState("");
  const [grossMargin, setGrossMargin] = useState("");
  const [churnRate, setChurnRate] = useState("");
  const [totalMarketingCost, setTotalMarketingCost] = useState("");
  const [newCustomers, setNewCustomers] = useState("");

  const arpu = parseFloat(avgRevenue) || 0;
  const margin = (parseFloat(grossMargin) || 0) / 100;
  const churn = (parseFloat(churnRate) || 0) / 100;
  const marketingCost = parseFloat(totalMarketingCost) || 0;
  const acquired = parseFloat(newCustomers) || 0;

  const ltv = churn > 0 ? (arpu * margin) / churn : 0;
  const cac = acquired > 0 ? marketingCost / acquired : 0;
  const ltvCacRatio = cac > 0 ? ltv / cac : 0;
  const paybackMonths = arpu * margin > 0 ? Math.ceil(cac / (arpu * margin)) : 0;

  const ratioStatus = ltvCacRatio === 0 ? null : ltvCacRatio >= 3 ? "green" : ltvCacRatio >= 1 ? "yellow" : "red";
  const ratioColor = ratioStatus === "green" ? "text-emerald-500" : ratioStatus === "yellow" ? "text-yellow-500" : "text-red-500";
  const ratioLabel = ratioStatus === "green" ? "Healthy" : ratioStatus === "yellow" ? "Break-even" : "Unprofitable";

  const fmt = (n: number) =>
    n > 0 ? `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : "—";

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard/overview" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to Dashboard</Link>
        </div>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">LTV:CAC Calculator</h1>
          <p className="text-sm text-muted-foreground mt-1">Customer Lifetime Value vs. Customer Acquisition Cost — the most important SaaS health ratio.</p>
        </div>
        <div className="space-y-4 mb-8">
          {[
            { label: "Avg Monthly Revenue per Customer ($)", value: avgRevenue, setter: setAvgRevenue, placeholder: "e.g. 99" },
            { label: "Gross Margin (%)", value: grossMargin, setter: setGrossMargin, placeholder: "e.g. 75" },
            { label: "Monthly Churn Rate (%)", value: churnRate, setter: setChurnRate, placeholder: "e.g. 3" },
            { label: "Total Marketing & Sales Cost ($)", value: totalMarketingCost, setter: setTotalMarketingCost, placeholder: "e.g. 10000" },
            { label: "New Customers Acquired", value: newCustomers, setter: setNewCustomers, placeholder: "e.g. 20" },
          ].map(({ label, value, setter, placeholder }) => (
            <div key={label}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type="number"
                min="0"
                className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={placeholder}
                value={value}
                onChange={(e) => setter(e.target.value)}
              />
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Results</h2>
            {ratioStatus && <span className={`text-sm font-semibold ${ratioColor}`}>{ratioLabel}</span>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Metric label="LTV" value={fmt(ltv)} highlight />
            <Metric label="CAC" value={fmt(cac)} />
            <Metric label="LTV:CAC Ratio" value={ltvCacRatio > 0 ? `${ltvCacRatio.toFixed(1)}x` : "—"} highlight={ltvCacRatio >= 3} negative={ltvCacRatio > 0 && ltvCacRatio < 1} />
            <Metric label="CAC Payback" value={paybackMonths > 0 ? `${paybackMonths} months` : "—"} negative={paybackMonths > 18} />
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-muted/30 p-4 text-xs text-muted-foreground space-y-1">
          <p>• <strong>LTV:CAC &gt; 3x</strong> — healthy, invest in growth</p>
          <p>• <strong>LTV:CAC 1–3x</strong> — break-even zone, optimize acquisition</p>
          <p>• <strong>LTV:CAC &lt; 1x</strong> — losing money per customer, fix urgently</p>
          <p>• <strong>Payback &lt; 12 months</strong> — ideal for efficient growth</p>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, highlight = false, negative = false }: { label: string; value: string; highlight?: boolean; negative?: boolean }) {
  return (
    <div className="rounded-lg bg-muted/40 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-lg font-semibold mt-0.5 ${highlight ? "text-primary" : negative ? "text-destructive" : ""}`}>{value}</p>
    </div>
  );
}
