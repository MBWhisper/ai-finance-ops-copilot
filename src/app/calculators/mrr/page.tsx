"use client";

import { useState } from "react";
import Link from "next/link";

export default function MRRCalculatorPage() {
  const [newCustomers, setNewCustomers] = useState("");
  const [avgRevenue, setAvgRevenue] = useState("");
  const [expansionMRR, setExpansionMRR] = useState("");
  const [churnedMRR, setChurnedMRR] = useState("");
  const [existingMRR, setExistingMRR] = useState("");

  const newMRR = (parseFloat(newCustomers) || 0) * (parseFloat(avgRevenue) || 0);
  const expansion = parseFloat(expansionMRR) || 0;
  const churned = parseFloat(churnedMRR) || 0;
  const existing = parseFloat(existingMRR) || 0;
  const netNewMRR = newMRR + expansion - churned;
  const totalMRR = existing + netNewMRR;
  const arr = totalMRR * 12;
  const growthRate = existing > 0 ? ((netNewMRR / existing) * 100).toFixed(1) : "—";

  return (
    <div className="min-h-screen bg-background p-6 md:p-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/dashboard/overview" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to Dashboard</Link>
        </div>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">MRR Calculator</h1>
          <p className="text-sm text-muted-foreground mt-1">Monthly Recurring Revenue — calculate your net new MRR and projected ARR.</p>
        </div>
        <div className="space-y-4 mb-8">
          {[
            { label: "Existing MRR ($)", value: existingMRR, setter: setExistingMRR, placeholder: "e.g. 10000" },
            { label: "New Customers", value: newCustomers, setter: setNewCustomers, placeholder: "e.g. 15" },
            { label: "Avg Revenue per New Customer ($)", value: avgRevenue, setter: setAvgRevenue, placeholder: "e.g. 99" },
            { label: "Expansion MRR ($)", value: expansionMRR, setter: setExpansionMRR, placeholder: "e.g. 500" },
            { label: "Churned MRR ($)", value: churnedMRR, setter: setChurnedMRR, placeholder: "e.g. 200" },
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
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Results</h2>
          <div className="grid grid-cols-2 gap-4">
            <Metric label="New MRR" value={`$${newMRR.toLocaleString()}`} />
            <Metric label="Net New MRR" value={`$${netNewMRR.toLocaleString()}`} highlight={netNewMRR > 0} />
            <Metric label="Total MRR" value={`$${totalMRR.toLocaleString()}`} />
            <Metric label="ARR" value={`$${arr.toLocaleString()}`} highlight />
            <Metric label="MoM Growth" value={`${growthRate}%`} />
            <Metric label="Churned MRR" value={`$${churned.toLocaleString()}`} negative={churned > 0} />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-6 text-center">Net New MRR = New MRR + Expansion MRR − Churned MRR</p>
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
