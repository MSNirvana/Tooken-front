import clsx from "clsx";
import type { ReactNode } from "react";

type CalloutType = "info" | "warning" | "danger" | "success";

const styleMap: Record<CalloutType, string> = {
  info: "border-sky-400/60 bg-sky-100/70 text-sky-800",
  warning: "border-amber-400/70 bg-amber-100/70 text-amber-900",
  danger: "border-rose-400/70 bg-rose-100/70 text-rose-900",
  success: "border-emerald-400/70 bg-emerald-100/70 text-emerald-900",
};

type CalloutProps = {
  type?: CalloutType;
  children: ReactNode;
};

export function Callout({ type = "info", children }: CalloutProps) {
  return (
    <div className={clsx("my-6 rounded-r-lg border-l-4 px-4 py-3 text-sm leading-7", styleMap[type])}>
      {children}
    </div>
  );
}
