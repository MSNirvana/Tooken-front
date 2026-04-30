"use client";

import { ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { models } from "@/lib/constants";
import { useLocaleContext } from "@/components/providers/LocaleContext";

function Row({ reverse = false, isZh }: { reverse?: boolean; isZh: boolean }) {
  const items = [...models, ...models];
  return (
    <div className={reverse ? "animate-marquee-rev flex whitespace-nowrap" : "animate-marquee flex whitespace-nowrap"}>
      {items.map((item, idx) => (
        <div
          key={`${item.name}-${idx}`}
          className="mx-2 inline-flex items-center gap-2 rounded-xl border border-[var(--border-default)] bg-white px-5 py-3 shadow-[var(--shadow-sm)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]"
        >
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
          <span className="font-display text-[15px] font-bold">{item.name}</span>
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] text-amber-700">
            {isZh ? item.category : item.category === "顶级" ? "top" : item.category === "国产" ? "cn" : "open"}
          </span>
        </div>
      ))}
    </div>
  );
}

export function ModelsMarquee() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";
  return (
    <section id="models" className="overflow-hidden bg-[var(--bg-subtle)] py-20">
      <SectionWrapper>
        <div className="mb-10 text-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]">
            {isZh ? "接入的模型" : "connected models"}
          </span>
          <h2 className="font-display mt-3 text-[32px] font-bold">
            {isZh ? "一个 Key，调用全球所有主流模型" : "One key for all major global models"}
          </h2>
        </div>
      </SectionWrapper>
      <div className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--bg-subtle)] to-transparent" />
        <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--bg-subtle)] to-transparent" />
        <div className="space-y-4">
          <Row isZh={isZh} />
          <Row reverse isZh={isZh} />
        </div>
      </div>
      <div className="mt-10 text-center">
        <a href="#" className="inline-flex items-center gap-2 text-[15px] font-medium text-[var(--text-brand)] transition-all hover:gap-3">
          {isZh ? "查看全部模型" : "Explore all models"} <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}
