import Link from "next/link"
import { LogOut, LayoutDashboard, TrendingUp, Receipt } from "lucide-react"

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r bg-white">
        <div className="flex h-16 items-center gap-2 border-b px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600 text-sm font-bold text-white">
            D
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">Finance Ops</h1>
            <p className="text-[10px] text-gray-500">Demo Mode</p>
          </div>
        </div>

        <div className="mx-3 mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
          Read-only demo.{" "}
          <Link href="/register" className="font-medium underline">
            Sign up
          </Link>{" "}
          for full access.
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {[
            { label: "Overview", href: "/demo/overview", icon: LayoutDashboard },
            { label: "Cash Flow", href: "/demo/cashflow", icon: TrendingUp },
            { label: "AR / Invoices", href: "/demo/ar", icon: Receipt },
          ].map((item) => (
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
      </aside>
      <main className="flex-1 ml-64 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
