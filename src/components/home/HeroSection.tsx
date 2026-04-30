"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { fadeUpVariant, staggerContainer } from "@/lib/motion";
import { InteractiveToucan } from "@/components/home/InteractiveToucan";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--bg-page)] pt-28">
      <div className="pointer-events-none absolute -left-36 -top-20 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.08)_0%,transparent_70%)] blur-[60px] animate-float" />
      <div className="pointer-events-none absolute -right-24 top-24 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.07)_0%,transparent_70%)] blur-[80px] animate-float" />
      <div className="bg-grid pointer-events-none" />
      <InteractiveToucan />
      <SectionWrapper className="relative z-10">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mx-auto max-w-5xl text-center">
          <motion.div variants={fadeUpVariant}>
            <Badge variant="brand" className="inline-flex gap-2 px-4 py-1.5 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
              AGI × Web4 Infrastructure →
            </Badge>
          </motion.div>
          <motion.h1 variants={fadeUpVariant} className="font-display mt-6 text-[clamp(52px,7vw,96px)] font-black leading-[0.98] tracking-[-0.04em]">
            <span className="text-[var(--text-primary)]">Bringing AGI</span>
            <br />
            <span className="brand-gradient-text">to Web4.</span>
          </motion.h1>
          <motion.p variants={fadeUpVariant} className="mx-auto mt-6 max-w-[560px] text-[18px] leading-relaxed text-[var(--text-secondary)]">
            做一个猜想？
            <br />
            Tooken = Crypto Token + AI Token
          </motion.p>
          <motion.div variants={fadeUpVariant} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg">
              免费开始 <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button size="lg" variant="secondary">
              查看文档 <BookOpen className="ml-1 h-4 w-4 text-[var(--text-secondary)]" />
            </Button>
          </motion.div>
          <motion.div variants={fadeUpVariant} className="mt-6 flex flex-wrap items-center justify-center gap-3 text-[13px] text-[var(--text-muted)]">
            <span className="inline-flex items-center gap-1.5">
              <Users size={13} className="text-[var(--text-brand)]" />
              2,000+ 开发者信赖
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-0.5">
              {[0, 1, 2, 3, 4].map((item) => (
                <Star key={item} size={11} className="fill-amber-400 text-amber-400" />
              ))}
              4.9 / 5
            </span>
            <span>·</span>
            <span>20+ 全球模型</span>
          </motion.div>
          <motion.div
            variants={fadeUpVariant}
            className="mx-auto mt-12 max-w-[860px] rounded-[20px] border border-[var(--border-default)] bg-white text-left shadow-[0_24px_80px_rgba(15,15,13,0.12),0_4px_16px_rgba(15,15,13,0.06)] transition-transform duration-500 md:[transform:perspective(1200px)_rotateX(3deg)] md:hover:[transform:perspective(1200px)_rotateX(0deg)]"
          >
            <div className="flex h-10 items-center gap-2 border-b border-[var(--border-default)] bg-[var(--bg-subtle)] px-4">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              <span className="ml-2 truncate font-mono text-xs text-[var(--text-muted)]">api.tooken.ai/v1/chat/completions</span>
            </div>
            <div className="grid gap-0 md:grid-cols-[1.25fr_1fr]">
              <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-page)] p-6 md:border-b-0 md:border-r">
                <pre className="font-mono text-[13px] leading-6 text-[#334155]">
{`const client = new OpenAI({
  apiKey: "sk-tok-••••••",
  baseURL: "https://api.tooken.ai/v1",
});

const res = await client.chat.completions.create({
  model: "auto", // 智能路由
  messages: [{ role: "user", content: prompt }],
});`}
                </pre>
              </div>
              <div className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">Auto Route Result</p>
                <p className="font-display mt-3 text-2xl font-bold">Kimi K2</p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">中文写作优化路由</p>
                <div className="mt-6 space-y-2 text-sm">
                  <p className="text-[var(--text-muted)] line-through">15 Credits / 1K token</p>
                  <p className="font-semibold text-[var(--text-primary)]">0.5 Credits / 1K token</p>
                  <p className="font-display text-2xl font-bold text-emerald-600">97% ↓</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </SectionWrapper>
    </section>
  );
}
