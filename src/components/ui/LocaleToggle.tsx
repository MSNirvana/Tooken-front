"use client";

import { Button } from "@/components/ui/Button";
import { useLocaleContext } from "@/components/providers/LocaleContext";

export function LocaleToggle({ variant = "secondary" }: { variant?: "primary" | "secondary" | "ghost" | "link" }) {
  const { locale, toggleLocale } = useLocaleContext();
  return (
    <Button variant={variant} size="sm" onClick={toggleLocale} aria-label="Switch language">
      {locale === "zh" ? "EN" : "中文"}
    </Button>
  );
}
