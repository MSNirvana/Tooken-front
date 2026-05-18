"use client";

import { Children, isValidElement, type ReactElement, type ReactNode, useMemo, useState } from "react";
import clsx from "clsx";

type CodeTabsProps = {
  labels?: string[];
  children: ReactNode;
};

export function CodeTabs({ labels, children }: CodeTabsProps) {
  const blocks = useMemo(() => {
    const normalized = Children.toArray(children).filter((child) => isValidElement(child)) as ReactElement[];
    return normalized;
  }, [children]);

  const tabLabels = useMemo(() => {
    if (Array.isArray(labels) && labels.length > 0) {
      return labels;
    }
    return blocks.map((_, index) => `Tab ${index + 1}`);
  }, [blocks, labels]);

  const [active, setActive] = useState(0);
  const activeIndex = Math.min(active, Math.max(0, blocks.length - 1));

  if (blocks.length === 0) {
    return null;
  }

  return (
    <div className="my-6 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-2">
      <div className="mb-2 flex flex-wrap gap-2 px-1">
        {tabLabels.map((label, index) => (
          <button
            key={`${label}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            className={clsx(
              "rounded-md px-3 py-1 text-xs transition-colors",
              activeIndex === index
                ? "bg-[var(--bg-subtle)] text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div>{blocks[activeIndex]}</div>
    </div>
  );
}
