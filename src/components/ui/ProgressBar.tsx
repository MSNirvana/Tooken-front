import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  value: number;
  className?: string;
}

export function ProgressBar({ value, className }: ProgressBarProps) {
  const safe = Math.max(0, Math.min(100, value));
  const color = safe >= 80 ? "bg-red-400" : safe >= 60 ? "bg-orange-400" : "bg-amber-400";

  return (
    <div className={cn("h-2 w-full rounded-full bg-zinc-800", className)}>
      <div className={cn("h-2 rounded-full transition-all duration-500", color)} style={{ width: `${safe}%` }} />
    </div>
  );
}
