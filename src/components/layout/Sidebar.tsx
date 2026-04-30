"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, Cpu, CreditCard, KeyRound, LayoutDashboard, Settings, Wallet } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const items = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Cpu, label: "Models", href: "/dashboard/models" },
  { icon: KeyRound, label: "API Keys", href: "/dashboard/api-keys" },
  { icon: BarChart3, label: "Usage", href: "/dashboard/usage" },
  { icon: CreditCard, label: "Billing", href: "/dashboard/billing" },
  { icon: Wallet, label: "Wallet", href: "/dashboard/wallet" },
  { icon: BookOpen, label: "Docs", href: "/docs" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-60 shrink-0 border-r border-white/10 bg-[#111118] p-4 lg:block">
      <div className="mb-6 px-2 text-lg font-semibold text-amber-300">Tooken</div>
      <nav className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl border-l-2 border-transparent px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900",
                active && "border-amber-400 bg-zinc-900 text-amber-200",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
