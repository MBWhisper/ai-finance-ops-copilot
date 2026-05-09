'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, TrendingUp, Receipt, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/browser"

const navItems = [
  { label: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
  { label: "Cash Flow", href: "/dashboard/cashflow", icon: TrendingUp },
  { label: "AR / Invoices", href: "/dashboard/ar", icon: Receipt },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white">
          F
        </div>
        <div>
          <h1 className="text-sm font-bold text-gray-900">Finance Ops</h1>
          <p className="text-[10px] text-gray-500">AI Copilot</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-blue-700" : "text-gray-400")} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-4">
        <p className="mb-2 truncate text-xs text-gray-500">{userEmail}</p>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}
