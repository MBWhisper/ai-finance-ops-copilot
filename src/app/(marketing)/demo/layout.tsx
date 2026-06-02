"use client"

import { useState } from "react"
import Link from "next/link"
import { LogOut, LayoutDashboard, TrendingUp, Receipt, Menu, X } from "lucide-react"

const NAV_ITEMS = [
  { label: "Overview", href: "/demo/overview", icon: LayoutDashboard },
  { label: "Cash Flow", href: "/demo/cashflow", icon: TrendingUp },
  { label: "AR / Invoices", href: "/demo/ar", icon: Receipt },
]

function SidebarContent() {
  return (
    <>
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 text-sm font-bold text-white">D</div>
        <div>
          <h1 className="text-sm font-bold text-gray-900">Finance Ops</h1>
          <p className="text-[10px] text-gray-500">Demo Mode</p>
        </div>
      </div>

      <div className="mx-3 mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
        Read-only demo.{" "}
        <Link href="/register" className="font-medium underline">Sign up</Link> for full access.
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <item.icon className="h-5 w-5 text-gray-400" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t p-4">
        <Link
          href="/register"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          <LogOut className="h-4 w-4" />
          Sign Up Free
        </Link>
      </div>
    </>
  )
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:z-40 lg:h-screen lg:w-64 lg:flex-col lg:border-r lg:bg-white">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <aside className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r bg-white shadow-xl">
            <div className="flex justify-end p-3">
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 w-full min-w-0 lg:ml-64 overflow-x-hidden">
        {/* Mobile nav bar */}
        <div className="sticky top-0 z-30 flex items-center gap-3 border-b bg-white px-4 py-3 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100">
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-600 text-xs font-bold text-white">D</div>
            <span className="text-sm font-semibold text-gray-900">Finance Ops</span>
            <span className="text-[10px] text-gray-500 ml-1">Demo</span>
          </div>
        </div>
        <div className="p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">{children}</div>
      </main>
    </div>
  )
}
