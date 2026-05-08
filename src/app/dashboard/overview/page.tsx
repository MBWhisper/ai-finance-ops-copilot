import { createClient } from "@/lib/supabase/server";
import { getLatestMetrics, getMetricsHistory } from "@/db/queries/metrics";
import { getInvoiceStats } from "@/db/queries/invoices";
import { TrialBanner } from "@/components/dashboard/trial-banner";
import { KPICard } from "@/components/dashboard/kpi-card";
import { redirect } from "next/navigation";

export default async function OverviewPage({
  searchParams,
}: {
  searchParams: { welcome?: string };
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const showWelcome = searchParams.welcome === "true";

  const metrics = await getLatestMetrics(user.id);
  const invoiceStats = await getInvoiceStats(user.id);
  const hasPaidInvoices = invoiceStats.paid > 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back{user.user_metadata?.name ? `, ${user.user_metadata.name}` : ""}
        </p>
      </div>

      <TrialBanner
        trialEndsAt={user.user_metadata?.trialEndsAt as string ?? null}
        plan={user.user_metadata?.plan as string ?? "starter"}
        showWelcome={showWelcome}
      />

      {metrics ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard title="MRR" value={metrics.mrrCents} format="currency" />
          <KPICard title="ARR" value={metrics.arrCents} format="currency" />
          <KPICard title="Churn Rate" value={metrics.churnRate} format="percent" />
          <KPICard title="LTV" value={metrics.ltvCents} format="currency" />
        </div>
      ) : (
        <div className="rounded-lg border bg-card p-12 text-center">
          <h3 className="mb-2 text-lg font-semibold">No metrics yet</h3>
          <p className="text-sm text-muted-foreground">
            Connect your Stripe account in Settings to see your KPIs.
          </p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm font-medium text-muted-foreground">Total Invoices</p>
          <p className="text-3xl font-bold">{invoiceStats.total}</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm font-medium text-muted-foreground">Paid</p>
          <p className="text-3xl font-bold text-green-600">{invoiceStats.paid}</p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <p className="text-sm font-medium text-muted-foreground">Outstanding</p>
          <p className="text-3xl font-bold text-amber-600">
            {invoiceStats.sent + invoiceStats.overdue}
          </p>
        </div>
      </div>

      {!hasPaidInvoices && (
        <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-12 text-center">
          <h3 className="mb-2 text-lg font-semibold">Get started</h3>
          <p className="text-sm text-muted-foreground">
            Connect your Stripe account to automatically import invoices and track MRR.
          </p>
        </div>
      )}
    </div>
  );
}
