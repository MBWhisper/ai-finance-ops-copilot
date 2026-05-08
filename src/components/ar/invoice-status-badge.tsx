import { Badge } from "@/components/ui/badge";

const statusMap: Record<string, { label: string; variant: "default" | "success" | "warning" | "destructive" }> = {
  draft: { label: "Draft", variant: "default" },
  sent: { label: "Sent", variant: "warning" },
  paid: { label: "Paid", variant: "success" },
  overdue: { label: "Overdue", variant: "destructive" },
};

export function InvoiceStatusBadge({ status }: { status: string }) {
  const config = statusMap[status] ?? statusMap.draft;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
