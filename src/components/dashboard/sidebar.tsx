import Link from "next/link";
import { LayoutDashboard, TrendingUp, Receipt, Settings } from "lucide-react";

const navItems = [
  { label: "Overview", href: "/overview", icon: LayoutDashboard },
  { label: "Cash Flow", href: "/cashflow", icon: TrendingUp },
  { label: "AR", href: "/ar", icon: Receipt },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-white p-6">
      <Link href="/overview" className="mb-8 block text-xl font-bold">
        Finance Copilot
      </Link>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
