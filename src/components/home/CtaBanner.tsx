"use client";

import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useLocaleContext } from "@/components/providers/LocaleContext";

export function CtaBanner() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";
  return (
    <section className="relative overflow-hidden bg-[var(--bg-dark)] py-24">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[300px] w-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(249,115,22,0.12)_0%,transparent_70%)] blur-[40px]" />
      </div>
      <SectionWrapper className="relative z-10 text-center" maxWidth="960px">
        <h2 className="font-display text-[clamp(36px,5vw,64px)] font-black leading-tight tracking-[-0.03em] text-white">
          {isZh ? "加入 Web4 时代的" : "Join the era of Web4"}
          <br />
          <span className="brand-gradient-text">{isZh ? "AI 基础设施建设" : "AI infrastructure"}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[17px] text-gray-400">
          {isZh ? "5 分钟跑通第一个请求。免费额度，无需信用卡。" : "Run your first request in 5 minutes. Free credits, no credit card required."}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg">{isZh ? "免费开始使用 →" : "Start for free →"}</Button>
          <Button size="lg" variant="secondary" className="border-white/20 bg-transparent text-white hover:border-white/35 hover:bg-white/5">
            {isZh ? "查看文档" : "View docs"}
          </Button>
        </div>
        <p className="font-mono mt-6 text-[13px] text-gray-600">
          {isZh ? "sk-tok-•••••••• · 赠送 1,000 Credits · 随时可取消" : "sk-tok-•••••••• · 1,000 free Credits · cancel anytime"}
        </p>
      </SectionWrapper>
    </section>
  );
}
