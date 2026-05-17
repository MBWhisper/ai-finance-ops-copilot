"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Bell, Info, AlertTriangle, AlertCircle, CheckCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  severity: "info" | "warning" | "critical"
  title: string
  message: string
  actionLabel?: string
  actionUrl?: string
  read: boolean
  createdAt: string
}

interface NotificationBellProps {
  unreadCount?: number
  className?: string
}

function getSeverityIcon(severity: Notification["severity"]) {
  switch (severity) {
    case "critical": return AlertCircle
    case "warning": return AlertTriangle
    case "info": return Info
  }
}

function getSeverityColors(severity: Notification["severity"]) {
  switch (severity) {
    case "critical": return { bg: "bg-red-50", icon: "text-red-500", title: "text-red-800", msg: "text-red-600" }
    case "warning": return { bg: "bg-amber-50", icon: "text-amber-500", title: "text-amber-800", msg: "text-amber-600" }
    case "info": return { bg: "bg-blue-50", icon: "text-blue-500", title: "text-blue-800", msg: "text-blue-600" }
  }
}

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = now - then
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString()
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    severity: "critical",
    title: "John Doe at risk",
    message: "Risk score 87 — no login for 18 days, payment failed 3 times.",
    actionLabel: "View warnings",
    actionUrl: "/dashboard/warnings",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "2",
    severity: "warning",
    title: "Net MRR negative",
    message: "MRR dropped $340 this month. Expansions lagging behind churn.",
    actionLabel: "View warnings",
    actionUrl: "/dashboard/warnings",
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "3",
    severity: "info",
    title: "Weekly digest ready",
    message: "Your weekly summary is available in the dashboard.",
    actionLabel: "View",
    actionUrl: "/dashboard/overview",
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
]

export function NotificationBell({ unreadCount: initialCount = 2, className }: NotificationBellProps) {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const markRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open])

  const hasCritical = notifications.some((n) => n.severity === "critical" && !n.read)

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors min-touch-target"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className={cn(
            "absolute -top-0.5 -right-0.5 flex min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold text-white leading-none h-[18px]",
            hasCritical ? "bg-red-500" : "bg-blue-500"
          )}>
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className={cn(
            "absolute right-0 top-full mt-2 z-50 rounded-xl border border-gray-200 bg-white shadow-xl animate-in fade-in slide-in-from-top-2",
            "w-80 sm:w-96" // mobile: 320px, desktop: 384px
          )}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors min-touch-target px-2 py-1"
                  >
                    <CheckCheck className="h-3.5 w-3.5" />
                    Mark all read
                  </button>
                )}
                <Link
                  href="/dashboard/warnings"
                  className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors min-touch-target px-2 py-1"
                  onClick={() => setOpen(false)}
                >
                  View all
                </Link>
              </div>
            </div>

            {/* Notification List */}
            <div className="max-h-80 overflow-y-auto scroll-container-touch">
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <Bell className="h-8 w-8 mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500">No notifications yet</p>
                </div>
              ) : (
                notifications.slice(0, 10).map((n) => {
                  const Icon = getSeverityIcon(n.severity)
                  const colors = getSeverityColors(n.severity)
                  return (
                    <div
                      key={n.id}
                      className={cn(
                        "px-4 py-3 border-b last:border-b-0 transition-colors min-h-[56px] flex items-start gap-3",
                        n.read ? "bg-white" : colors.bg,
                        n.actionUrl ? "cursor-pointer hover:brightness-95" : ""
                      )}
                      onClick={() => {
                        if (n.actionUrl) {
                          markRead(n.id)
                          window.location.href = n.actionUrl
                        }
                      }}
                    >
                      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", colors.icon)} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className={cn("text-sm font-medium", colors.title)}>{n.title}</p>
                          <span className="shrink-0 text-[10px] text-gray-400">{timeAgo(n.createdAt)}</span>
                        </div>
                        <p className={cn("mt-0.5 text-xs leading-tight", colors.msg)}>{n.message}</p>
                        {n.actionLabel && (
                          <span className="mt-1 inline-block text-xs font-medium text-blue-600 hover:text-blue-700">
                            {n.actionLabel}
                          </span>
                        )}
                      </div>
                      {!n.read && (
                        <span className="shrink-0 mt-1.5 h-2 w-2 rounded-full bg-blue-500" />
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
