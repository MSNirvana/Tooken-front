"use client";

import { tickerItems } from "@/lib/constants";
import { useLocaleContext } from "@/components/providers/LocaleContext";

export function TickerBar() {
  const { locale } = useLocaleContext();
  const enItems = [
    "✦ 20+ global models connected",
    "✦ Auto intelligent routing",
    "✦ 70% average Token cost saving",
    "✦ x402 Web4 native settlement",
    "✦ 99.9% availability",
    "✦ OpenAI-compatible API",
    "✦ Base network fast settlement",
    "✦ Agent economic autonomy",
  ];
  const source = locale === "zh" ? tickerItems : enItems;
  const list = [...source, ...source];

  return (
    <section className="relative overflow-hidden bg-[var(--bg-dark)] py-3">
      <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--bg-dark)] to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--bg-dark)] to-transparent" />
      <div className="animate-marquee flex whitespace-nowrap">
        {list.map((item, index) => (
          <span key={`${item}-${index}`} className="mx-8 font-mono text-[13px] font-medium text-amber-400">
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
