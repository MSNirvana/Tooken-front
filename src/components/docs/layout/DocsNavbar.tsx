"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "首页", href: "/docs" },
  { label: "API", href: "/docs/api" },
  { label: "更新日志", href: "/docs/changelog" },
];

export function DocsNavbar() {
  const pathname = usePathname();

  return (
    <header
      className={clsx(
        "sticky top-0 z-40 border-b border-[var(--border-subtle)]",
        "bg-[color-mix(in_srgb,var(--bg-surface)_86%,transparent)] backdrop-blur-md",
      )}
    >
      <div className="docs-container flex h-16 items-center justify-between gap-6">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/docs" className="flex items-center gap-2.5">
            <Image src="/tooken-logo.png" alt="Tooken Logo" width={24} height={24} className="rounded-sm" priority />
            <span className="font-display text-[18px] font-semibold text-[var(--text-primary)]">Tooken Docs</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-[var(--text-secondary)] md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "transition-colors hover:text-[var(--accent-primary)]",
                  pathname === item.href && "text-[var(--accent-primary)]",
                )}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://www.tooken.ai"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-[var(--accent-primary)]"
            >
              官网 ↗
            </a>
          </nav>
        </div>
        <a
          href="https://www.tooken.ai"
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full border border-[var(--accent-primary)] bg-[var(--accent-primary)] px-4 py-1.5 text-xs font-medium text-[#2d2100] shadow-[0_6px_20px_var(--accent-glow)] transition-all hover:translate-y-[-1px] hover:opacity-95 md:block"
        >
          免费开始
        </a>
      </div>
    </header>
  );
}
