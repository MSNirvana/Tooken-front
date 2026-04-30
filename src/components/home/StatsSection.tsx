"use client";

import { useEffect, useRef, useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useLocaleContext } from "@/components/providers/LocaleContext";

const stats = [
  { value: 20, suffix: "+", label: "接入模型数量", sub: "持续增加" },
  { value: 70, suffix: "%", label: "平均成本节省", sub: "vs 直接调用" },
  { value: 99.9, suffix: "%", label: "平台可用率", sub: "SLA 保障" },
  { value: 10, prefix: "< ", suffix: "s", label: "Base 网络到账", sub: "手续费 < $0.01" },
];

function useInView() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return { ref, show };
}

export function StatsSection() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";
  const { ref, show } = useInView();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!show) return;
    const start = performance.now();
    const duration = 1500;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setProgress(p);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [show]);

  const labels = isZh
    ? [
        { label: "接入模型数量", sub: "持续增加" },
        { label: "平均成本节省", sub: "vs 直接调用" },
        { label: "平台可用率", sub: "SLA 保障" },
        { label: "Base 网络到账", sub: "手续费 < $0.01" },
      ]
    : [
        { label: "Connected models", sub: "growing continuously" },
        { label: "Average cost saved", sub: "vs direct invocation" },
        { label: "Platform availability", sub: "SLA guaranteed" },
        { label: "Base settlement", sub: "fee < $0.01" },
      ];

  return (
    <section
      ref={ref}
      className="py-20 text-white"
      style={{ background: "linear-gradient(135deg, #F97316 0%, #FBBF24 50%, #F59E0B 100%)" }}
    >
      <SectionWrapper>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => {
            const value = item.value * progress;
            return (
              <div key={item.label} className="relative">
                {index > 0 ? <div className="absolute -left-4 top-2 hidden h-16 w-px bg-white/20 lg:block" /> : null}
                <p className="font-display text-[clamp(40px,5vw,64px)] font-black leading-none">
                  {item.prefix ?? ""}
                  {item.value % 1 === 0 ? Math.round(value) : value.toFixed(1)}
                  {item.suffix}
                </p>
                <p className="mt-3 text-base text-white/85">{labels[index].label}</p>
                <p className="mt-1 text-sm text-white/65">{labels[index].sub}</p>
              </div>
            );
          })}
        </div>
      </SectionWrapper>
    </section>
  );
}
