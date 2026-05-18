"use client";

import { type MouseEvent, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import type { TocItem } from "@/lib/docs/mdx";

type Props = {
  items: TocItem[];
};

export function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState("");
  const ids = useMemo(() => items.map((item) => item.id), [items]);

  useEffect(() => {
    if (ids.length === 0) {
      return;
    }

    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));
    const offset = 130;
    let frame = 0;

    const updateActive = () => {
      if (!targets.length) {
        return;
      }

      let current = targets[0].id;
      for (const heading of targets) {
        if (heading.getBoundingClientRect().top - offset <= 0) {
          current = heading.id;
        } else {
          break;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  if (items.length === 0) return null;

  function onItemClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  }

  return (
    <aside className="hidden w-[200px] shrink-0 xl:block">
      <div className="sticky top-20 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-4">
        <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">本页目录</div>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(event) => onItemClick(event, item.id)}
                className={clsx(
                  "block rounded-md px-2 py-1 text-sm transition-colors",
                  item.level === 3 && "pl-5",
                  activeId === item.id
                    ? "bg-[var(--accent-subtle)] text-[var(--accent-primary)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
                )}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
