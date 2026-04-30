import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export function Button({ className, variant = "primary", size = "md", loading = false, children, ...props }: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all duration-200",
        size === "sm" && "h-9 px-4 text-sm",
        size === "md" && "h-11 px-6 text-[15px]",
        size === "lg" && "h-12 px-7 text-base",
        variant === "primary" &&
          "font-display font-bold text-white shadow-[var(--shadow-brand)] hover:-translate-y-0.5 hover:brightness-105 disabled:pointer-events-none disabled:opacity-60",
        variant === "secondary" &&
          "border border-[var(--border-default)] bg-white font-medium text-[var(--text-primary)] shadow-[var(--shadow-sm)] hover:-translate-y-0.5 hover:border-[var(--border-brand)] hover:shadow-[var(--shadow-md)]",
        variant === "ghost" && "font-medium text-[var(--text-primary)] hover:bg-black/5",
        variant === "link" && "text-[var(--text-brand)] hover:underline",
        className,
      )}
      style={variant === "primary" ? { background: "linear-gradient(135deg, #F97316 0%, #FBBF24 100%)" } : undefined}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : children}
    </button>
  );
}
