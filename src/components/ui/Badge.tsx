import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "brand" | "neutral" | "success" | "warning";
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[12px] font-medium",
        variant === "brand" && "border-orange-200 bg-orange-50 text-orange-600",
        variant === "neutral" && "border-[var(--border-default)] bg-white text-[var(--text-secondary)]",
        variant === "success" && "border-emerald-200 bg-emerald-50 text-emerald-600",
        variant === "warning" && "border-amber-200 bg-amber-50 text-amber-700",
        className,
      )}
      {...props}
    />
  );
}
