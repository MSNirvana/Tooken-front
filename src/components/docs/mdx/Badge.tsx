import clsx from "clsx";
import type { ReactNode } from "react";

type BadgeType = "required" | "optional";

const badgeStyle: Record<BadgeType, string> = {
  required: "border-rose-300 bg-rose-100 text-rose-700",
  optional: "border-zinc-200 bg-zinc-100 text-zinc-600",
};

type BadgeProps = {
  type?: BadgeType;
  children: ReactNode;
};

export function Badge({ type = "optional", children }: BadgeProps) {
  return (
    <span className={clsx("inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium", badgeStyle[type])}>
      {children}
    </span>
  );
}
