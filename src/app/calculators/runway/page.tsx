"use client";

import { useState } from "react";
import Link from "next/link";

export default function RunwayCalculatorPage() {
  const [cashBalance, setCashBalance] = useState("");
  const [monthlyRevenue, setMonthlyRevenue] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");

  const balance = parseFloat(cashBalance) || 0;
  const revenue = parseFloat(monthlyRevenue) || 0;
  const expenses = parseFloat(monthlyExpenses) || 0;
  const burnRate = Math.max(expenses - revenue, 0);
  const runway = burnRate > 0 ? Math.floor(balance / burnRate) : Infinity;
  const runwayLabel = runway === Infinity ? "∞ (profitable)" : `${runway} months`;
  const runwayDate = burnRate > 0
    ? new Date(Date.now() + runway * 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "—";
  const status = runway === Infinity ? "green" : runway >= 12 ? "green" : runway >= 6 ? "yellow" : "red";
  const statusColor = status === "green" ? "text-emerald-500" : status === "yellow" ? "text-yellow-500" : "text-red-500";
  const statusLabel = status === "green" ? "Healthy" : status === "yellow" ? "Caution" : "Critical";

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard/overview" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to Dashboard</Link>
        </div>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Runway Calculator</h1>
          <p className="text-sm text-muted-foreground mt-1">How many months before you run out of cash at your current burn rate.</p>
        </div>
        <div className="space-y-4 mb-8">
          {[
            { label: "Cash Balance ($)", value: cashBalance, setter: setCashBalance, placeholder: "e.g. 250000" },
            { label: "Monthly Revenue ($)", value: monthlyRevenue, setter: setMonthlyRevenue, placeholder: "e.g. 15000" },
            { label: "Monthly Expenses ($)", value: monthlyExpenses, setter: setMonthlyExpenses, placeholder: "e.g. 30000" },
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
            {(cashBalance || monthlyExpenses) && (
              <span className={`text-sm font-semibold ${statusColor}`}>{statusLabel}</span>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Metric label="Monthly Burn" value={burnRate > 0 ? `$${burnRate.toLocaleString()}` : "$0 (profitable)"} negative={burnRate > 0} />
            <Metric label="Runway" value={runwayLabel} highlight />
            <Metric label="Cash Out Date" value={runwayDate} />
            <Metric label="Net Burn/Month" value={`$${(expenses - revenue).toLocaleString()}`} negative={expenses > revenue} />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-6 text-center">Runway = Cash Balance ÷ Monthly Net Burn Rate</p>
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
