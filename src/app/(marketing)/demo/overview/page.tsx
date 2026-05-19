import { KPICGrid } from "@/components/dashboard/kpi-grid"
import { MrrHistoryChart } from "@/components/dashboard/mrr-history-chart"
import { formatCurrency } from "@/lib/utils"
import { getDemoMetrics, getDemoMetricsHistory, getDemoInvoiceStats } from "@/lib/demo/data"
import Link from "next/link"

export default function DemoOverviewPage() {
  const metrics = getDemoMetrics()
  const history = getDemoMetricsHistory(90)
  const invoiceStats = getDemoInvoiceStats()
  const prev = history.length > 30 ? history[30] : null
  const changes = prev
    ? {
        mrr: prev.mrrCents > 0 ? ((metrics.mrrCents - prev.mrrCents) / prev.mrrCents) * 100 : 0,
        arr: prev.arrCents > 0 ? ((metrics.arrCents - prev.arrCents) / prev.arrCents) * 100 : 0,
        churn: prev.churnRate > 0 ? metrics.churnRate - prev.churnRate : 0,
        ltv: prev.ltvCents > 0 ? ((metrics.ltvCents - prev.ltvCents) / prev.ltvCents) * 100 : 0,
      }
    : undefined

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800 flex items-center gap-2">
        <span>📊</span>
        <span>This is a live demo — <Link href="/register" className="font-semibold underline">Sign up free</Link> to connect your data.</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Demo Dashboard</h1>
          <p className="mt-1 text-gray-500">This is a read-only preview with sample data.</p>
        </div>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Sign Up — It&apos;s Free
        </Link>
      </div>

      <KPICGrid metrics={metrics} changes={changes} />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Active Customers</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{metrics.activeCustomers}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Runway</p>
          <p className="mt-1 text-3xl font-bold text-gray-900">{metrics.runwayMonths} months</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Outstanding AR</p>
          <p className="mt-1 text-3xl font-bold text-amber-600">
            {formatCurrency(
              invoiceStats.totalAmountCents -
                invoiceStats.paid * (invoiceStats.totalAmountCents / (invoiceStats.total || 1))
            )}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <MrrHistoryChart data={history} />
      </div>
    </div>
  )
}
