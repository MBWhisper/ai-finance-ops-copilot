'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, TrendingUp, Receipt, Settings, CreditCard,
  Menu, X, LogOut, Bell, AlertTriangle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/browser"

export interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

export const navItems: NavItem[] = [
  { label: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
  { label: "Cash Flow", href: "/dashboard/cashflow", icon: TrendingUp },
  { label: "AR / Invoices", href: "/dashboard/ar", icon: Receipt },
  { label: "Billing", href: "/dashboard/settings/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar({ userEmail, plan, unreadAlerts = 0 }: { userEmail: string; plan?: string; unreadAlerts?: number }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  // ─── Desktop & Tablet sidebar content ───
  const sidebarExpanded = hovered

  const sidebarContent = (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "flex h-full flex-col bg-white border-r transition-all duration-200 ease-in-out",
        sidebarExpanded ? "w-60" : "w-16"
      )}
    >
      {/* Logo area */}
      <div className={cn(
        "flex h-16 items-center border-b shrink-0",
        sidebarExpanded ? "justify-between px-4" : "justify-center"
      )}>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-sm font-bold text-white shrink-0">
            F
          </div>
          {sidebarExpanded && (
            <div className="overflow-hidden">
              <h1 className="text-sm font-bold text-gray-900 whitespace-nowrap">Finance Ops</h1>
              <p className="text-[10px] text-gray-500 whitespace-nowrap">AI Copilot</p>
            </div>
          )}
        </div>
        {/* Close button — visible on mobile drawer only */}
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors min-touch-target"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2 overflow-y-auto scroll-container-touch">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg text-sm font-medium transition-colors min-touch-target",
                sidebarExpanded ? "px-3 py-2.5" : "justify-center px-0 py-3",
                active
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
              title={!sidebarExpanded ? item.label : undefined}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", active ? "text-blue-700" : "text-gray-400")} />
              {sidebarExpanded && <span className="truncate">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User area */}
      <div className={cn("border-t", sidebarExpanded ? "p-4" : "p-2")}>
        {sidebarExpanded && (
          <p className="mb-2 truncate text-xs text-gray-500" title={userEmail}>{userEmail}</p>
        )}
        <div className={cn("flex", sidebarExpanded ? "flex-col gap-1" : "flex-col items-center gap-2")}>
          {sidebarExpanded && plan && (
            <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">{plan} plan</span>
          )}
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-2 rounded-lg text-sm font-medium text-red-600 transition-colors hover:bg-red-50 min-touch-target",
              sidebarExpanded ? "w-full px-3 py-2" : "justify-center p-3"
            )}
            title="Sign out"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {sidebarExpanded && <span>Sign out</span>}
          </button>
        </div>
      </div>
    </aside>
  )

  return (
    <>
      {/* ─── MOBILE: Bottom tab bar (< md: 768px) ─── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden bg-white border-t bottom-tab-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition-colors min-touch-target",
                active ? "text-emerald-600" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <item.icon className={cn("h-5 w-5", active ? "text-emerald-600" : "text-gray-400")} />
              <span className="truncate max-w-[60px] text-center leading-tight">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* ─── HAMBURGER (mobile only) ─── */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-20 left-4 z-30 flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gray-200 shadow-md text-gray-700 hover:bg-gray-50 transition-colors min-touch-target"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* ─── TABLET + DESKTOP sidebar ─── */}
      <div className="hidden md:block fixed left-0 top-0 z-40 h-screen">
        {sidebarContent}
      </div>

      {/* ─── MOBILE drawer overlay ─── */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm backdrop-blur-safari"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[280px] max-w-[85vw] bg-white shadow-2xl animate-slide-in-right">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}
