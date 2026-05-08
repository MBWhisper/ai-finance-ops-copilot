import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: number;
  format?: "currency" | "percent" | "number";
  change?: number;
  icon?: React.ReactNode;
}

export function KPICard({ title, value, format = "currency", change, icon }: KPICardProps) {
  const displayValue =
    format === "currency"
      ? formatCurrency(value)
      : format === "percent"
        ? `${value.toFixed(2)}%`
        : value.toLocaleString();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{displayValue}</div>
        {change !== undefined && (
          <p
            className={`text-xs ${change >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {change >= 0 ? "+" : ""}
            {change.toFixed(1)}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
