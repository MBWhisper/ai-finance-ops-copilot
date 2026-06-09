'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, TrendingUp, Receipt, Settings, CreditCard,
  Menu, X, LogOut, Bell, AlertTriangle, BarChart3, Bot, Activity,
  Ellipsis, BookOpen, Calculator, ArrowRight, ChevronDown, ChevronUp,
  Layers, Zap,
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
  { label: "Analytics", href: "/dashboard/analytics", icon: Activity },
  { label: "AR / Invoices", href: "/dashboard/ar", icon: Receipt },
  { label: "Cash Flow", href: "/dashboard/cashflow", icon: TrendingUp },
  { label: "Cohorts", href: "/dashboard/cohorts", icon: BarChart3 },
  { label: "Warnings", href: "/dashboard/warnings", icon: AlertTriangle },
  { label: "AI Copilot", href: "/dashboard/ai-chat", icon: Bot },
  { label: "Billing", href: "/dashboard/settings/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

// ─── Internal resource links for SEO + UX ───
const resourceLinks = [
  {
    group: "Calculators",
    icon: Calculator,
    items: [
      { label: "MRR Calculator", href: "/calculators/mrr" },
      { label: "Runway Calculator", href: "/calculators/runway" },
      { label: "Churn Rate", href: "/calculators/churn" },
      { label: "LTV / CAC", href: "/calculators/ltv-cac" },
    ],
  },
  {
    group: "Guides & Blog",
    icon: BookOpen,
    items: [
      { label: "Stripe MRR for Founders", href: "/blog/stripe-mrr-dashboard-for-founders" },
      { label: "SaaS Cash Flow Forecast", href: "/blog/saas-cash-flow-forecast" },
      { label: "AI Finance for Startups", href: "/blog/ai-finance-tool-bootstrapped-startups" },
    ],
  },
  {
    group: "Compare",
    icon: Layers,
    items: [
      { label: "vs Baremetrics", href: "/vs-baremetrics" },
      { label: "vs ChartMogul", href: "/vs-chartmogul" },
      { label: "Pricing Plans", href: "/pricing" },
    ],
  },
]

// ─── Desktop / Tablet Resources Panel ───
function ResourcesPanel({ expanded }: { expanded: boolean }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  if (!expanded) {
    // Icon-only: show a single bookmarks icon that links to /blog
    return (
      <div className="border-t pt-2 pb-1 px-2">
        <Link
          href="/blog"
          className="flex justify-center items-center py-3 rounded-lg text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors min-touch-target"
          title="Resources & Guides"
        >
          <BookOpen className="h-5 w-5" />
        </Link>
      </div>
    )
  }

  return (
    <div className="border-t pt-3 pb-2 px-2">
      <p className="px-1 mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">Resources</p>
      <div className="space-y-0.5">
        {resourceLinks.map((group) => (
          <div key={group.group}>
            <button
              onClick={() => setOpenGroup(openGroup === group.group ? null : group.group)}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <group.icon className="h-3.5 w-3.5 shrink-0 text-gray-400" />
              <span className="flex-1 text-left truncate">{group.group}</span>
              {openGroup === group.group
                ? <ChevronUp className="h-3 w-3 text-gray-300" />
                : <ChevronDown className="h-3 w-3 text-gray-300" />}
            </button>
            {openGroup === group.group && (
              <div className="ml-5 mt-0.5 space-y-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-xs text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors group"
                  >
                    <ArrowRight className="h-3 w-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Mobile Resources Full Drawer ───
function MobileResourcesDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, onClose])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[80dvh] overflow-y-auto"
        style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-emerald-600" />
            <span className="text-sm font-semibold text-gray-900">Resources & Guides</span>
          </div>
          <button
            onClick={onClose}
            className="h-9 w-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Upgrade CTA */}
        <div className="mx-4 mt-4 mb-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 p-4 text-white">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-bold">Unlock All Features</span>
          </div>
          <p className="text-xs text-emerald-100 mb-3">Forecasts, AI Copilot, cohort analysis and more.</p>
          <Link
            href="/pricing"
            onClick={onClose}
            className="block w-full text-center bg-white text-emerald-700 text-xs font-semibold py-2 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            See Pricing Plans →
          </Link>
        </div>

        {/* Resource Groups */}
        <div className="px-4 pb-2 space-y-4">
          {resourceLinks.map((group) => (
            <div key={group.group}>
              <div className="flex items-center gap-2 mb-2">
                <group.icon className="h-4 w-4 text-gray-400" />
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{group.group}</p>
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="h-4 w-4 text-gray-300" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function Sidebar({ userEmail, plan, unreadAlerts = 0 }: { userEmail: string; plan?: string; unreadAlerts?: number }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  const primaryMobileItems: NavItem[] = [
    { label: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
    { label: "Analytics", href: "/dashboard/analytics", icon: Activity },
    { label: "Cash", href: "/dashboard/cashflow", icon: TrendingUp },
    { label: "Alerts", href: "/dashboard/warnings", icon: AlertTriangle },
  ]

  const secondaryMobileItems: NavItem[] = [
    { label: "AR / Invoices", href: "/dashboard/ar", icon: Receipt },
    { label: "Cohorts", href: "/dashboard/cohorts", icon: BarChart3 },
    { label: "Billing", href: "/dashboard/settings/billing", icon: CreditCard },
    { label: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  useEffect(() => { setOpen(false); setMoreOpen(false); setResourcesOpen(false) }, [pathname])

  useEffect(() => {
    if (!open && !moreOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); setMoreOpen(false) } }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, moreOpen])

  useEffect(() => {
    document.body.style.overflow = (open || moreOpen || resourcesOpen) ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open, moreOpen, resourcesOpen])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')
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
          const showBadge = item.href === "/dashboard/warnings" && unreadAlerts > 0
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
              <div className="relative">
                <item.icon className={cn("h-5 w-5 shrink-0", active ? "text-blue-700" : "text-gray-400")} />
                {showBadge && !sidebarExpanded && (
                  <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
                    {unreadAlerts > 9 ? '9+' : unreadAlerts}
                  </span>
                )}
              </div>
              {sidebarExpanded && (
                <>
                  <span className="truncate">{item.label}</span>
                  {showBadge && (
                    <span className="ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                      {unreadAlerts > 99 ? '99+' : unreadAlerts}
                    </span>
                  )}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Resources Panel — internal links for SEO */}
      <ResourcesPanel expanded={sidebarExpanded} />

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
      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden bg-white border-t"
        style={{ paddingBottom: 'max(0px, env(safe-area-inset-bottom))' }}
      >
        {primaryMobileItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-1 flex-col items-center justify-center gap-0.5 py-1.5 min-touch-target transition-colors"
            >
              <item.icon className={cn("h-5 w-5", active ? "text-emerald-600" : "text-gray-400")} />
              <span className={cn("text-[10px] leading-tight font-medium", active ? "text-emerald-600" : "text-gray-400")}>
                {item.label}
              </span>
            </Link>
          )
        })}
        {/* More button */}
        <button
          onClick={() => setMoreOpen(true)}
          className="flex flex-1 flex-col items-center justify-center gap-0.5 py-1.5 min-touch-target transition-colors text-gray-400"
          aria-label="More menu"
        >
          <Ellipsis className="h-5 w-5" />
          <span className="text-[10px] leading-tight font-medium">More</span>
        </button>
      </nav>

      {/* ─── MOBILE: More bottom sheet ─── */}
      {moreOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMoreOpen(false)} />
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl animate-slide-up"
            style={{ paddingBottom: 'max(0px, env(safe-area-inset-bottom))' }}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <span className="text-sm font-semibold text-gray-900">More</span>
              <button
                onClick={() => setMoreOpen(false)}
                className="h-9 w-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-2 space-y-0.5">
              {secondaryMobileItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                      active
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", active ? "text-emerald-600" : "text-gray-400")} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}

              {/* Resources entry */}
              <button
                onClick={() => { setMoreOpen(false); setResourcesOpen(true) }}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <BookOpen className="h-5 w-5 text-gray-400" />
                <span>Resources & Guides</span>
                <ArrowRight className="ml-auto h-4 w-4 text-gray-300" />
              </button>

              {/* AI Copilot shortcut */}
              <Link
                href="/dashboard/ai-chat"
                onClick={() => setMoreOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive("/dashboard/ai-chat")
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-gray-700 hover:bg-gray-50 active:bg-gray-100"
                )}
              >
                <Bot className={cn("h-5 w-5", isActive("/dashboard/ai-chat") ? "text-emerald-600" : "text-gray-400")} />
                <span>AI Copilot</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ─── MOBILE: Resources Drawer ─── */}
      <MobileResourcesDrawer open={resourcesOpen} onClose={() => setResourcesOpen(false)} />

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
