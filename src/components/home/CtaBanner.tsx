"use client";

import { motion } from "framer-motion";
import { ArrowRight, Landmark, Link2, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { useLocaleContext } from "@/components/providers/LocaleContext";
import { useEffect, useRef, useState } from "react";

export function CtaBanner() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";
  const [activeStep, setActiveStep] = useState(0);
  const [sliderY, setSliderY] = useState(0);
  const [sliderHeight, setSliderHeight] = useState(40);
  const flowTrackRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  const flowSteps = [
    {
      id: "agent",
      title: isZh ? "AI Agent 发起请求" : "AI Agent starts request",
      detail: isZh ? "解析任务并准备访问第三方平台 API" : "Parses task and prepares third-party API call",
      icon: Sparkles,
      tag: "Step 1",
    },
    {
      id: "api",
      title: isZh ? "访问第三方 API" : "Request third-party API",
      detail: isZh ? "服务端返回 x402 计费挑战和价格信息" : "Server returns x402 payment challenge and pricing",
      icon: Link2,
      tag: "Step 2",
    },
    {
      id: "x402",
      title: isZh ? "x402 借用稳定币支付" : "x402 pays with stablecoin",
      detail: isZh ? "通过 x402 借用 USDC / USDT 完成链上结算" : "Borrow USDC / USDT through x402 for settlement",
      icon: Wallet,
      tag: "Step 3",
    },
    {
      id: "granted",
      title: isZh ? "支付验证通过" : "Payment verified",
      detail: isZh ? "第三方 API 放行并返回成功结果" : "Third-party API grants access and returns result",
      icon: ShieldCheck,
      tag: "Step 4",
    },
  ] as const;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % flowSteps.length);
    }, 1800);
    return () => window.clearInterval(timer);
  }, [flowSteps.length]);

  useEffect(() => {
    const updateSliderPosition = () => {
      const activeNode = stepRefs.current[activeStep];
      const trackNode = flowTrackRef.current;
      if (!activeNode || !trackNode) return;

      const nextHeight = Math.min(44, Math.max(34, activeNode.offsetHeight - 22));
      const centeredY = activeNode.offsetTop + activeNode.offsetHeight / 2 - nextHeight / 2;
      setSliderY(Math.max(0, centeredY));
      setSliderHeight(nextHeight);
    };

    updateSliderPosition();
    window.addEventListener("resize", updateSliderPosition);
    return () => window.removeEventListener("resize", updateSliderPosition);
  }, [activeStep, isZh]);

  return (
    <section className="relative overflow-hidden bg-[var(--bg-dark)] py-24">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[300px] w-[600px] rounded-full bg-[radial-gradient(ellipse,rgba(249,115,22,0.12)_0%,transparent_70%)] blur-[40px]" />
      </div>
      <SectionWrapper className="relative z-10" maxWidth="1200px">
        <div className="grid items-stretch gap-10 lg:grid-cols-[1.06fr_0.94fr]">
          <div className="text-left">
            <h2 className="font-display text-[clamp(24px,3.2vw,40px)] font-black leading-tight tracking-[-0.02em] text-white">
              {isZh ? "让 AI Agent 即刻接入" : "Connect AI Agents instantly"}
              <br />
              <span className="brand-gradient-text">{isZh ? "x402 天然无许可支付" : "x402 native permissionless payments"}</span>
            </h2>
            <p className="mt-6 max-w-xl text-[17px] text-gray-300">
              {isZh
                ? "AI Agent 访问第三方 API 时，自动完成 x402 计费挑战，并用 USDC / USDT 链上结算，快速拿到可验证结果。"
                : "When your AI Agent calls third-party APIs, it handles x402 payment challenges and settles on-chain with USDC / USDT automatically."}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80">
                <Sparkles size={13} />
                {isZh ? "Agent Ready" : "Agent Ready"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80">
                <Wallet size={13} />
                {isZh ? "x402 + USDC/USDT" : "x402 + USDC/USDT"}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80">
                <ShieldCheck size={13} />
                {isZh ? "可验证回执" : "Verifiable receipt"}
              </span>
            </div>

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-medium tracking-[0.04em] text-white/55">{isZh ? "核心链路" : "Core pipeline"}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/80">AI Agent</span>
                <ArrowRight size={12} className="text-white/45" />
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-white/80">Third-party API</span>
                <ArrowRight size={12} className="text-white/45" />
                <span className="rounded-full border border-orange-300/30 bg-orange-400/10 px-2.5 py-1 text-orange-200">x402 + USDC/USDT</span>
                <ArrowRight size={12} className="text-white/45" />
                <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2.5 py-1 text-emerald-200">
                  {isZh ? "访问成功" : "Access Granted"}
                </span>
              </div>
              <motion.div
                className="mt-3 flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2"
                animate={{ borderColor: ["rgba(255,255,255,0.12)", "rgba(249,115,22,0.45)", "rgba(255,255,255,0.12)"] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <span className="text-xs text-white/70">{isZh ? "当前实时步骤" : "Current live step"}</span>
                <span className="text-xs font-semibold text-orange-200">{flowSteps[activeStep].title}</span>
              </motion.div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-[11px] text-white/55">{isZh ? "接入方式" : "Integration"}</p>
                <p className="mt-1 text-sm font-semibold text-white">{isZh ? "标准 HTTP API" : "Standard HTTP API"}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-[11px] text-white/55">{isZh ? "结算资产" : "Settlement asset"}</p>
                <p className="mt-1 text-sm font-semibold text-white">USDC / USDT</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <p className="text-[11px] text-white/55">{isZh ? "支付模型" : "Payment model"}</p>
                <p className="mt-1 text-sm font-semibold text-white">{isZh ? "按请求实时结算" : "Per-request live settlement"}</p>
              </div>
            </div>
          </div>

          <div className="relative h-full rounded-3xl border border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(17,24,39,0.4)_100%)] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[rgba(249,115,22,0.26)] blur-2xl" />
            <div className="pointer-events-none absolute -bottom-7 -left-7 h-24 w-24 rounded-full bg-[rgba(56,189,248,0.16)] blur-2xl" />

            <div className="relative">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{isZh ? "AI Agent 支付访问流程" : "AI Agent payment flow"}</p>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-white/80">{isZh ? "实时结算" : "Real-time settlement"}</span>
              </div>

              <div ref={flowTrackRef} className="relative pl-11">
                <div className="absolute left-[18px] top-2 h-[calc(100%-10px)] w-[2px] rounded-full bg-[linear-gradient(180deg,rgba(249,115,22,0.45)_0%,rgba(59,130,246,0.35)_100%)]" />
                <motion.div
                  className="absolute left-[13px] top-2 w-4 rounded-full bg-[linear-gradient(180deg,#f97316_0%,#fb923c_100%)] shadow-[0_0_0_4px_rgba(249,115,22,0.2)]"
                  style={{ height: sliderHeight }}
                  animate={{ y: sliderY }}
                  transition={{ type: "spring", stiffness: 220, damping: 24 }}
                />

                <div className="space-y-3.5">
                  {flowSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === activeStep;
                    return (
                      <motion.div
                        key={step.id}
                        ref={(node) => {
                          stepRefs.current[index] = node;
                        }}
                        className={`rounded-2xl border p-3 transition-all duration-300 ${
                          isActive
                            ? "border-[rgba(249,115,22,0.55)] bg-white/14 shadow-[0_12px_32px_rgba(249,115,22,0.2)]"
                            : "border-white/10 bg-white/5"
                        }`}
                        animate={{ scale: isActive ? 1.02 : 1, opacity: isActive ? 1 : 0.8 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                              isActive ? "bg-[rgba(249,115,22,0.22)] text-orange-300" : "bg-white/10 text-white/75"
                            }`}
                          >
                            <Icon size={16} />
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-semibold text-white">{step.title}</p>
                              <span className="text-[10px] font-mono text-white/60">{step.tag}</span>
                            </div>
                            <p className="mt-1 text-xs leading-5 text-white/70">{step.detail}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <motion.div
                className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-300/30 bg-emerald-400/10 px-3.5 py-2.5 text-sm font-medium text-emerald-200"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.1, repeat: Infinity }}
              >
                <Landmark size={15} />
                {isZh ? "Access Granted：第三方 API 返回成功结果" : "Access Granted: third-party API returns successfully"}
                <ArrowRight size={14} />
              </motion.div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
