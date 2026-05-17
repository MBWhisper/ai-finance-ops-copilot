import { AlertTriangle, Info, AlertCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

type Severity = "info" | "warning" | "critical"

interface AlertCardProps {
  severity: Severity
  title: string
  message: string
  action?: { label: string; onClick: () => void }
  onDismiss?: () => void
  className?: string
}

const severityConfig: Record<Severity, { border: string; bg: string; icon: React.ComponentType<{ className?: string }>; iconColor: string }> = {
  info: { border: "border-blue-200", bg: "bg-blue-50", icon: Info, iconColor: "text-blue-600" },
  warning: { border: "border-amber-200", bg: "bg-amber-50", icon: AlertTriangle, iconColor: "text-amber-600" },
  critical: { border: "border-red-200", bg: "bg-red-50", icon: AlertCircle, iconColor: "text-red-600" },
}

export function AlertCard({ severity, title, message, action, onDismiss, className }: AlertCardProps) {
  const [dismissed, setDismissed] = useState(false)
  const config = severityConfig[severity]
  const Icon = config.icon

  if (dismissed) return null

  return (
    <div className={cn("rounded-xl border p-4 flex items-start gap-3", config.border, config.bg, className)} role="alert">
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", config.iconColor)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-sm text-gray-600 mt-0.5">{message}</p>
        {action && (
          <button
            onClick={action.onClick}
            className="mt-2 text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors min-touch-target"
          >
            {action.label}
          </button>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={() => { setDismissed(true); onDismiss() }}
          className="shrink-0 h-8 w-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white/50 transition-colors min-touch-target"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
