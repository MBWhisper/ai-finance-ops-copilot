import { cn } from "@/lib/utils";
import type { InvoiceStatus } from "@/lib/invoice-types";

const statusConfig: Record<InvoiceStatus, { label: string; className: string }> = {
  draft: { label: "Draft", className: "bg-gray-100 text-gray-700" },
  sent: { label: "Sent", className: "bg-blue-100 text-blue-800" },
  viewed: { label: "Viewed", className: "bg-indigo-100 text-indigo-800" },
  partial: { label: "Partial", className: "bg-amber-100 text-amber-800" },
  paid: { label: "Paid", className: "bg-green-100 text-green-800" },
  overdue: { label: "Overdue", className: "bg-red-100 text-red-800" },
};

export function InvoiceStatusBadge({ status }: { status: string }) {
  const config = statusConfig[status as InvoiceStatus] ?? statusConfig.draft;
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", config.className)}>
      {config.label}
    </span>
  );
}
