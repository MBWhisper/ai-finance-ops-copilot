import { cn } from "@/lib/utils"

interface RiskBadgeProps {
  score: number
  className?: string
}

function getRiskLevel(score: number): { label: string; color: string; bg: string } {
  if (score <= 30) return { label: "Safe", color: "text-risk-safe", bg: "bg-risk-safe/10" }
  if (score <= 60) return { label: "Watch", color: "text-risk-watch", bg: "bg-risk-watch/10" }
  if (score <= 80) return { label: "At Risk", color: "text-risk-danger", bg: "bg-risk-danger/10" }
  return { label: "Critical", color: "text-risk-critical", bg: "bg-risk-critical/10" }
}

export function RiskBadge({ score, className }: RiskBadgeProps) {
  const { label, color, bg } = getRiskLevel(score)
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold min-touch-target",
        color,
        bg,
        className
      )}
      title={`Risk score: ${score}%`}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", color.replace("text", "bg"))} />
      {label} ({score})
    </span>
  )
}
