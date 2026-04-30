"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { plans } from "@/lib/constants";
import { cn } from "@/lib/cn";

export function PricingSection() {
  const [mode, setMode] = useState<"usage" | "enterprise">("usage");

  return (
    <section className="bg-[var(--bg-subtle)] py-24">
      <SectionWrapper>
        <div className="mb-16 text-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-brand)]">定价</span>
          <h2 className="font-display mt-3 text-[clamp(28px,3vw,44px)] font-bold">用量越大，价格越优</h2>
          <p className="mx-auto mt-3 max-w-md text-base text-[var(--text-secondary)]">1 Credit = 0.001 USD。链上充值，即充即用，无月费锁定。</p>
          <div className="mt-6 inline-flex rounded-full border border-[var(--border-default)] bg-white p-1">
            <button
              onClick={() => setMode("usage")}
              className={cn("rounded-full px-5 py-2 text-sm font-medium transition", mode === "usage" ? "bg-[var(--bg-dark)] text-white" : "text-[var(--text-secondary)]")}
            >
              按量付费
            </button>
            <button
              onClick={() => setMode("enterprise")}
              className={cn("rounded-full px-5 py-2 text-sm font-medium transition", mode === "enterprise" ? "bg-[var(--bg-dark)] text-white" : "text-[var(--text-secondary)]")}
            >
              企业套餐
            </button>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                "relative rounded-[20px] border bg-white p-8 shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]",
                plan.highlight ? "border-2 border-amber-400 lg:-translate-y-2 lg:scale-[1.02]" : "border-[var(--border-default)]",
              )}
            >
              {plan.highlight ? (
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-md bg-[linear-gradient(135deg,#F97316_0%,#FBBF24_100%)] px-3 py-1 font-mono text-xs text-white">
                  {plan.badge}
                </span>
              ) : null}
              <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]">{plan.name}</p>
              <p className={cn("font-display mt-3 text-5xl font-bold", plan.highlight && "brand-gradient-text")}>
                {plan.price}
                <span className="ml-1 text-base text-[var(--text-secondary)]">{plan.unit}</span>
              </p>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">{plan.desc}</p>
              <div className="my-6 h-px bg-[var(--border-subtle)]" />
              <ul className="space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-[var(--text-primary)]">
                    <Check size={15} className="mt-0.5 text-[var(--text-brand)]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-7 w-full" variant={plan.highlight ? "primary" : "secondary"}>
                {plan.cta}
              </Button>
            </article>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
