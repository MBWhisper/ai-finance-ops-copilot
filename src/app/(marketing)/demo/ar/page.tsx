import { InvoiceStatusBadge } from "@/components/ar/invoice-status-badge"
import { formatCurrency, formatDate } from "@/lib/utils"
import { getDemoInvoices } from "@/lib/demo/data"
import Link from "next/link"

export default function DemoArPage() {
  const invoices = getDemoInvoices()

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800 flex items-center gap-2">
        <span>📊</span>
        <span>This is a live demo — <Link href="/register" className="font-semibold underline">Sign up free</Link> to connect your data.</span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">AR / Invoices</h1>
          <p className="mt-1 text-gray-500">Demo data — sample invoices.</p>
        </div>
        <Link
          href="/register"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Sign Up — It&apos;s Free
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{inv.customerName}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{inv.customerEmail}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{formatCurrency(inv.amountCents)}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{formatDate(new Date(inv.dueDate))}</td>
                <td className="whitespace-nowrap px-6 py-4"><InvoiceStatusBadge status={inv.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
