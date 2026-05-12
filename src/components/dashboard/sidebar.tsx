'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, TrendingUp, Receipt, Settings, CreditCard, Menu, X, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/browser"

const navItems = [
  { label: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
  { label: "Cash Flow", href: "/dashboard/cashflow", icon: TrendingUp },
  { label: "AR / Invoices", href: "/dashboard/ar", icon: Receipt },
  { label: "Billing", href: "/dashboard/settings/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar({ userEmail, plan }: { userEmail: string; plan?: string }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close drawer on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Close drawer on Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open])

  // Body scroll lock when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const sidebarContent = (
    <aside className={cn(
      "flex h-full w-full flex-col",
      "bg-white"
    )}>
      <div className="flex h-16 items-center justify-between gap-2 border-b px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-sm font-bold text-white">
            F
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">Finance Ops</h1>
            <p className="text-[10px] text-gray-500">AI Copilot</p>
          </div>
        </div>
        {/* Close button — visible only on mobile drawer */}
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-blue-700" : "text-gray-400")} />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <p className="mb-2 truncate text-xs text-gray-500" title={userEmail}>{userEmail}</p>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          <span>Sign out</span>
        </button>
      </div>
    </aside>
  )

  return (
    <>
      {/* Hamburger button — mobile only, clears global Navbar */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-20 left-4 z-30 flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-gray-200 shadow-md text-gray-700 hover:bg-gray-50 transition-colors"
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Desktop: fixed sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white">
        {sidebarContent}
      </div>

      {/* Mobile: drawer with backdrop */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute left-0 top-0 h-full w-[280px] max-w-[85vw] bg-white shadow-2xl animate-slide-in-right">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}
