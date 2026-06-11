"use client";

import { useState } from "react";
import Link from "next/link";

export default function ChurnCalculatorPage() {
  const [startCustomers, setStartCustomers] = useState("");
  const [lostCustomers, setLostCustomers] = useState("");
  const [startMRR, setStartMRR] = useState("");
  const [lostMRR, setLostMRR] = useState("");

  const start = parseFloat(startCustomers) || 0;
  const lost = parseFloat(lostCustomers) || 0;
  const sMRR = parseFloat(startMRR) || 0;
  const lMRR = parseFloat(lostMRR) || 0;

  const customerChurn = start > 0 ? ((lost / start) * 100).toFixed(2) : "—";
  const revenueChurn = sMRR > 0 ? ((lMRR / sMRR) * 100).toFixed(2) : "—";
  const churnNum = parseFloat(customerChurn as string);
  const avgLifetime = !isNaN(churnNum) && churnNum > 0 ? (1 / (churnNum / 100)).toFixed(1) : "—";
  const ltv =
    avgLifetime !== "—" && sMRR > 0 && start > 0
      ? `$${((sMRR / start) * parseFloat(avgLifetime)).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
      : "—";

  const status = isNaN(churnNum) ? null : churnNum < 2 ? "green" : churnNum < 5 ? "yellow" : "red";
  const statusColor = status === "green" ? "text-emerald-500" : status === "yellow" ? "text-yellow-500" : "text-red-500";
  const statusLabel = status === "green" ? "Excellent" : status === "yellow" ? "Average" : "High Churn";

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard/overview" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to Dashboard</Link>
        </div>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Churn Rate Calculator</h1>
          <p className="text-sm text-muted-foreground mt-1">Calculate customer and revenue churn, average customer lifetime, and estimated LTV.</p>
        </div>
        <div className="space-y-4 mb-8">
          {[
            { label: "Customers at Start of Period", value: startCustomers, setter: setStartCustomers, placeholder: "e.g. 500" },
            { label: "Customers Lost This Period", value: lostCustomers, setter: setLostCustomers, placeholder: "e.g. 20" },
            { label: "MRR at Start of Period ($)", value: startMRR, setter: setStartMRR, placeholder: "e.g. 50000" },
            { label: "MRR Lost to Churn ($)", value: lostMRR, setter: setLostMRR, placeholder: "e.g. 2000" },
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
            {status && <span className={`text-sm font-semibold ${statusColor}`}>{statusLabel}</span>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Metric label="Customer Churn" value={customerChurn !== "—" ? `${customerChurn}%` : "—"} negative={churnNum > 5} />
            <Metric label="Revenue Churn" value={revenueChurn !== "—" ? `${revenueChurn}%` : "—"} negative={parseFloat(revenueChurn as string) > 5} />
            <Metric label="Avg Lifetime" value={avgLifetime !== "—" ? `${avgLifetime} months` : "—"} highlight />
            <Metric label="Est. LTV" value={ltv} highlight />
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-muted/30 p-4 text-xs text-muted-foreground space-y-1">
          <p>• <strong>Healthy SaaS churn:</strong> &lt; 2% monthly customer churn</p>
          <p>• <strong>Average SaaS churn:</strong> 2–5% monthly</p>
          <p>• <strong>High churn (&gt;5%):</strong> focus on retention immediately</p>
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
