import { Badge } from "@/components/ui/badge";
import { PLANS, type PlanKey } from "@/lib/constants";

const planColors: Record<PlanKey, "default" | "success" | "warning"> = {
  starter: "default",
  pro: "success",
  scale: "warning",
};

export function PlanBadge({ plan }: { plan: PlanKey }) {
  const config = PLANS[plan];
  return (
    <Badge variant={planColors[plan]}>
      {config.name} — ${config.price}/mo
    </Badge>
  );
}
