"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNavigation, type DocNavItem } from "@/docs/navigation";

function SidebarItem({ item }: { item: DocNavItem }) {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  return (
    <li className="space-y-1">
      <Link
        href={item.href}
        className={clsx(
          "block rounded-md px-2 py-1.5 text-sm transition-colors",
          isActive
            ? "bg-[var(--accent-subtle)] text-[var(--accent-primary)]"
            : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]",
        )}
      >
        {item.title}
      </Link>
      {item.children && item.children.length > 0 && (
        <ul className="ml-3 border-l border-[var(--border-subtle)] pl-3">
          {item.children.map((child) => (
            <SidebarItem key={child.href} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden w-[260px] shrink-0 lg:block">
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
        {docsNavigation.map((group) => (
          <section key={group.group} className="mb-5">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              <span className="mr-1">{group.icon}</span>
              {group.group}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <SidebarItem key={item.href} item={item} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </aside>
  );
}
