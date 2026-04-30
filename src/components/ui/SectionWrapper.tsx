import { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface SectionWrapperProps extends HTMLAttributes<HTMLDivElement> {
  maxWidth?: "1200px" | "960px";
}

export function SectionWrapper({ className, maxWidth = "1200px", ...props }: SectionWrapperProps) {
  return <div className={cn("mx-auto w-full px-6 md:px-8 lg:px-12", className)} style={{ maxWidth }} {...props} />;
}
