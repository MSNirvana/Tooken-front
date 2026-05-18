import Link from "next/link";
import type { FlatDocNavItem } from "@/docs/navigation";

type Props = {
  prev: FlatDocNavItem | null;
  next: FlatDocNavItem | null;
};

function NavCard({ item, direction }: { item: FlatDocNavItem | null; direction: "prev" | "next" }) {
  if (!item) return <div className="hidden sm:block" />;

  return (
    <Link href={item.href} className="glass-surface block p-4 transition-colors hover:border-[var(--border-accent)]">
      <div className="text-xs text-[var(--text-muted)]">{direction === "prev" ? "上一篇" : "下一篇"}</div>
      <div className="mt-1 text-sm font-medium text-[var(--text-primary)]">
        {direction === "prev" ? "← " : ""}
        {item.title}
        {direction === "next" ? " →" : ""}
      </div>
    </Link>
  );
}

export function FooterNav({ prev, next }: Props) {
  return (
    <footer className="mt-12 grid grid-cols-1 gap-3 border-t border-[var(--border-subtle)] pt-6 sm:grid-cols-2">
      <NavCard item={prev} direction="prev" />
      <NavCard item={next} direction="next" />
    </footer>
  );
}
