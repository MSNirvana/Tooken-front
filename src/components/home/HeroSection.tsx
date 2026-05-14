"use client";

import { motion } from "framer-motion";
import { Landmark, Link2, MessageCircleMore, Send, ShieldCheck, Sparkles, Wallet } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { fadeUpVariant, staggerContainer } from "@/lib/motion";
import { InteractiveToucan } from "@/components/home/InteractiveToucan";
import { useLocaleContext } from "@/components/providers/LocaleContext";

type ModelOption = {
  id: string;
  label: string;
  short: string;
  logo?: string;
  versions: Array<{
    version: string;
    category: string;
  }>;
};

type TokenLogoOption = {
  id: string;
  label: string;
  short: string;
  logo: string;
};

export function HeroSection() {
  const router = useRouter();
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";
  const [selectedModel, setSelectedModel] = useState("kimi");
  const [question, setQuestion] = useState("");
  const [brokenLogos, setBrokenLogos] = useState<Record<string, boolean>>({});
  const [hoveredModelId, setHoveredModelId] = useState<string | null>(null);
  const [hoveredPopupX, setHoveredPopupX] = useState<number | null>(null);
  const [logoSwapTick, setLogoSwapTick] = useState(0);
  const marqueeViewportRef = useRef<HTMLDivElement | null>(null);

  const models = useMemo<ModelOption[]>(
    () => [
      {
        id: "kimi",
        label: "Kimi",
        short: "KM",
        logo: "/logos/ai/kimi.svg",
        versions: [
          { version: "Kimi-K2.5", category: "多模态 旗舰" },
          { version: "Kimi-K2", category: "长上下文" },
          { version: "Kimi-1.5", category: "推理 文本" },
          { version: "Kimi-1.3", category: "通用" },
        ],
      },
      {
        id: "claude",
        label: "Claude",
        short: "CL",
        logo: "/logos/ai/claude.svg",
        versions: [
          { version: "Claude Opus 4.7", category: "旗舰 推理" },
          { version: "Claude Sonnet 4.6", category: "编码 文本" },
          { version: "Claude Haiku 4.5", category: "轻量响应" },
          { version: "Claude Opus 4.6", category: "复杂任务" },
        ],
      },
      {
        id: "gpt",
        label: "GPT",
        short: "GP",
        logo: "/logos/ai/gpt.svg",
        versions: [
          { version: "GPT-5.5", category: "编程 文本" },
          { version: "GPT-5.5 Instant", category: "低延迟" },
          { version: "GPT-5.5 Pro", category: "高推理" },
          { version: "GPT-5.4", category: "通用" },
          { version: "GPT-4.1", category: "兼容" },
        ],
      },
      {
        id: "gemini",
        label: "Gemini",
        short: "GM",
        logo: "/logos/ai/gemini.svg",
        versions: [
          { version: "Gemini 3.1 Pro", category: "旗舰 推理" },
          { version: "Gemini 3 Pro", category: "多模态" },
          { version: "Gemini 2.5 Pro", category: "长上下文" },
          { version: "Gemini 2.0 Flash", category: "低延迟" },
        ],
      },
      {
        id: "deepseek",
        label: "DeepSeek",
        short: "DS",
        logo: "/logos/ai/deepseek.svg",
        versions: [
          { version: "DeepSeek V4-Pro", category: "旗舰 通用" },
          { version: "DeepSeek V4-Flash", category: "低延迟" },
          { version: "DeepSeek V3.1", category: "混合推理" },
          { version: "DeepSeek R1", category: "推理" },
        ],
      },
      {
        id: "qwen",
        label: "Qwen",
        short: "QW",
        logo: "/logos/ai/qwen.svg",
        versions: [
          { version: "Qwen3-Max", category: "旗舰 推理" },
          { version: "Qwen3-235B-A22B", category: "MoE 旗舰" },
          { version: "Qwen3-32B", category: "通用" },
          { version: "Qwen2.5-Max", category: "稳定" },
        ],
      },
      {
        id: "glm",
        label: "GLM",
        short: "GL",
        logo: "/logos/ai/glm.svg",
        versions: [
          { version: "GLM-5.1", category: "旗舰 Agent" },
          { version: "GLM-5", category: "推理 编程" },
          { version: "GLM-4.5", category: "文本 推理" },
          { version: "GLM-4-Air", category: "轻量" },
        ],
      },
      {
        id: "minimax",
        label: "MiniMax",
        short: "MM",
        logo: "/logos/ai/minimax.svg",
        versions: [
          { version: "MiniMax-M2.7", category: "旗舰 文本" },
          { version: "MiniMax-M2.5", category: "稳定 通用" },
          { version: "abab-6.5", category: "历史旗舰" },
          { version: "MiniMax-Text-01", category: "文本" },
        ],
      },
    ],
    [],
  );

  const marqueeModels = [...models, ...models, ...models];
  const aiTokenLogos = useMemo<TokenLogoOption[]>(
    () => [
      { id: "claude", label: "Claude", short: "CL", logo: "/logos/ai/claude.svg" },
      { id: "gpt", label: "GPT", short: "GP", logo: "/logos/ai/gpt.svg" },
      { id: "gemini", label: "Gemini", short: "GM", logo: "/logos/ai/gemini.svg" },
      { id: "deepseek", label: "Deepseek", short: "DS", logo: "/logos/ai/deepseek.svg" },
      { id: "qwen", label: "Qwen", short: "QW", logo: "/logos/ai/qwen.svg" },
      { id: "minimax", label: "MiniMax", short: "MM", logo: "/logos/ai/minimax.svg" },
      { id: "kimi", label: "Kimi", short: "KM", logo: "/logos/ai/kimi.svg" },
    ],
    [],
  );
  const cryptoTokenLogos = useMemo<TokenLogoOption[]>(
    () => [
      { id: "btc", label: "BTC", short: "BTC", logo: "/logos/crypto/btc.svg" },
      { id: "eth", label: "ETH", short: "ETH", logo: "/logos/crypto/eth.svg" },
      { id: "usdt", label: "USDT", short: "USDT", logo: "/logos/crypto/usdt.svg" },
      { id: "usdc", label: "USDC", short: "USDC", logo: "/logos/crypto/usdc.svg" },
      { id: "sol", label: "SOL", short: "SOL", logo: "/logos/crypto/sol.svg" },
      { id: "bnb", label: "BNB", short: "BNB", logo: "/logos/crypto/bnb.svg" },
      { id: "trx", label: "TRX", short: "TRX", logo: "/logos/crypto/trx.svg" },
    ],
    [],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLogoSwapTick((prev) => prev + 1);
    }, 2200);

    return () => window.clearInterval(timer);
  }, []);

  const showFirstO = logoSwapTick % 2 === 0;
  const logoIndex = logoSwapTick % aiTokenLogos.length;
  const currentAiLogo = aiTokenLogos[logoIndex % aiTokenLogos.length];
  const currentCryptoLogo = cryptoTokenLogos[logoIndex % cryptoTokenLogos.length];
  const hoveredModel = hoveredModelId ? models.find((model) => model.id === hoveredModelId) ?? null : null;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[var(--bg-page)] pt-44">
      <div className="hero-ambient-orb hero-ambient-orb-left pointer-events-none" />
      <div className="hero-ambient-orb hero-ambient-orb-right pointer-events-none" />
      <div className="hero-ambient-orb hero-ambient-orb-bottom pointer-events-none" />
      <div className="bg-grid pointer-events-none" />
      <InteractiveToucan />
      <SectionWrapper className="relative z-10">
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mx-auto max-w-5xl pt-14 text-center md:pt-16">
          <motion.div variants={fadeUpVariant}>
            <motion.button
              type="button"
              onClick={() => router.push("/login")}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-flex"
              aria-label="进入登录"
            >
              <span className="pointer-events-none absolute inset-0 rounded-full bg-orange-300/30 opacity-0 blur-md transition duration-200 group-hover:opacity-100" />
              <span className="pointer-events-none absolute -inset-1 rounded-full border border-orange-300/50 opacity-0 transition duration-200 group-hover:opacity-100" />
              <Badge variant="brand" className="relative inline-flex gap-2 px-3 py-1.5 text-sm">
                <Sparkles size={12} />
              </Badge>
              <span className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 w-[22rem] -translate-x-1/2 rounded-2xl border border-[rgba(249,115,22,0.14)] bg-white/94 px-3.5 py-3 text-left text-xs text-[var(--text-secondary)] opacity-0 shadow-[0_12px_28px_rgba(15,15,13,0.12)] backdrop-blur-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="flex flex-col gap-1.5">
                  <span className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(249,115,22,0.14)] text-[10px] font-bold text-orange-700">
                      1
                    </span>
                    <span className="font-medium text-[var(--text-primary)]">注册无许可</span>
                    <span className="ml-auto flex items-center gap-1.5 whitespace-nowrap text-[11px] text-[var(--text-muted)]">
                      <Wallet size={12} />
                      Web3钱包｜邮箱登录
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(249,115,22,0.14)] text-[10px] font-bold text-orange-700">
                      2
                    </span>
                    <span className="font-medium text-[var(--text-primary)]">支付无许可</span>
                    <span className="ml-auto flex items-center gap-1.5 whitespace-nowrap text-[11px] text-[var(--text-muted)]">
                      <Landmark size={12} />
                      Crypto链上支付｜银联
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(249,115,22,0.14)] text-[10px] font-bold text-orange-700">
                      3
                    </span>
                    <span className="font-medium text-[var(--text-primary)]">一行 API 直连全模型</span>
                    <span className="ml-auto flex items-center gap-1.5 whitespace-nowrap font-mono text-[11px] text-[var(--text-muted)]">
                      <Link2 size={12} />
                      https://tooken.ai/v1
                    </span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[rgba(249,115,22,0.14)] text-[10px] font-bold text-orange-700">
                      4
                    </span>
                    <span className="font-medium text-[var(--text-primary)]">企业级合规架构</span>
                    <span className="ml-auto flex items-center gap-1.5 whitespace-nowrap text-[11px] text-[var(--text-muted)]">
                      <ShieldCheck size={12} />
                      可助企业开票
                    </span>
                  </span>
                </span>
              </span>
            </motion.button>
          </motion.div>
          <motion.h1 variants={fadeUpVariant} className="font-display mt-8 text-[clamp(52px,7vw,96px)] font-black leading-[0.98] tracking-[-0.005em]">
            <span className="token-brandmark mt-2 inline-flex items-center justify-center text-[var(--text-primary)]">
              <span className="token-word token-word-leading token-word-initial">T</span>
              <span className="token-letter token-letter-ai" aria-label="AI model token o">
                <span className="token-logo-stack">
                  <motion.span
                    className="token-slot-content token-logo-item-letter"
                    animate={{
                      opacity: showFirstO ? 1 : 0,
                      scale: showFirstO ? 1 : 0.82,
                    }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="token-alt-letter">o</span>
                  </motion.span>
                  <motion.span
                    className="token-slot-content"
                    animate={{
                      opacity: showFirstO ? 0 : 1,
                      scale: showFirstO ? 0.82 : 1,
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {!brokenLogos[`token-${currentAiLogo.id}`] ? (
                      <img
                        src={currentAiLogo.logo}
                        alt={`${currentAiLogo.label} logo`}
                        className="token-logo-image"
                        loading="lazy"
                        onError={() => setBrokenLogos((prev) => ({ ...prev, [`token-${currentAiLogo.id}`]: true }))}
                      />
                    ) : (
                      <span className="token-alt-letter">o</span>
                    )}
                  </motion.span>
                </span>
              </span>
              <span className="token-letter token-letter-crypto" aria-label="Crypto token o">
                <span className="token-logo-stack">
                  <motion.span
                    className="token-slot-content token-logo-item-letter"
                    animate={{
                      opacity: showFirstO ? 0 : 1,
                      scale: showFirstO ? 0.82 : 1,
                    }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="token-alt-letter">o</span>
                  </motion.span>
                  <motion.span
                    className="token-slot-content"
                    animate={{
                      opacity: showFirstO ? 1 : 0,
                      scale: showFirstO ? 1 : 0.82,
                    }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {!brokenLogos[`token-${currentCryptoLogo.id}`] ? (
                      <img
                        src={currentCryptoLogo.logo}
                        alt={`${currentCryptoLogo.label} logo`}
                        className="token-logo-image"
                        loading="lazy"
                        onError={() => setBrokenLogos((prev) => ({ ...prev, [`token-${currentCryptoLogo.id}`]: true }))}
                      />
                    ) : (
                      <span className="token-alt-letter">o</span>
                    )}
                  </motion.span>
                </span>
              </span>
              <span className="token-word token-word-trailing token-word-trailing-split" aria-label="ken">ken</span>
            </span>
          </motion.h1>

          <motion.div
            variants={fadeUpVariant}
            className="mx-auto mt-14 max-w-[920px] rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(255,251,245,0.48)_100%)] p-4 text-left shadow-[0_28px_90px_rgba(15,15,13,0.1),0_8px_30px_rgba(249,115,22,0.08)] backdrop-blur-xl md:p-5"
          >
            <div className="relative overflow-visible rounded-2xl bg-white/45 py-2">
              {hoveredModel && hoveredPopupX !== null ? (
                <div
                  className="pointer-events-none absolute bottom-full z-40 mb-2.5 w-52 -translate-x-1/2 rounded-xl border border-[rgba(15,15,13,0.07)] bg-[rgba(255,255,255,0.9)] p-2.5 text-left shadow-[0_8px_22px_rgba(15,15,13,0.1)] backdrop-blur-md transition-all duration-150"
                  style={{ left: `${hoveredPopupX}px` }}
                >
                  <span className="flex flex-col gap-1.5">
                    {hoveredModel.versions.slice(0, 5).map((item) => (
                      <span key={`${item.version}-${item.category}`} className="flex items-center justify-between gap-2 text-[11px] leading-tight">
                        <span className="flex items-center gap-1.5 text-[var(--text-primary)]">
                          {hoveredModel.logo && !brokenLogos[hoveredModel.id] ? (
                            <img
                              src={hoveredModel.logo}
                              alt={`${hoveredModel.label} black logo`}
                              className="h-3.5 w-3.5 object-contain brightness-0 saturate-0"
                              loading="lazy"
                              onError={() => setBrokenLogos((prev) => ({ ...prev, [hoveredModel.id]: true }))}
                            />
                          ) : (
                            <span className="inline-flex h-3 w-3 rounded-sm bg-black" />
                          )}
                          <span>{item.version}</span>
                        </span>
                        <span className="font-mono text-[10px] text-[var(--text-muted)]">{item.category}</span>
                      </span>
                    ))}
                  </span>
                </div>
              ) : null}
              <div ref={marqueeViewportRef} className="relative overflow-x-hidden overflow-y-visible rounded-2xl">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[rgba(255,249,239,0.95)] to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[rgba(255,249,239,0.95)] to-transparent" />
                <div
                  className={`animate-marquee flex min-w-max gap-2 px-2 [--marquee-shift:-33.333%] [animation-duration:34s] ${
                    hoveredModelId ? "[animation-play-state:paused]" : ""
                  }`}
                  style={{ animationPlayState: hoveredModelId ? "paused" : "running" }}
                >
                  {marqueeModels.map((model, index) => (
                    <button
                      key={`${model.id}-${index}`}
                      type="button"
                      onClick={() => setSelectedModel(model.id)}
                      onMouseEnter={(event) => {
                        setHoveredModelId(model.id);
                        const viewport = marqueeViewportRef.current?.getBoundingClientRect();
                        const target = event.currentTarget.getBoundingClientRect();
                        if (viewport) {
                          const relativeX = target.left - viewport.left + target.width / 2;
                          const popupHalf = 104;
                          const clampedX = Math.max(popupHalf, Math.min(viewport.width - popupHalf, relativeX));
                          setHoveredPopupX(clampedX);
                        }
                      }}
                      onMouseLeave={() => {
                        setHoveredModelId((prev) => (prev === model.id ? null : prev));
                        setHoveredPopupX(null);
                      }}
                      onFocus={(event) => {
                        setHoveredModelId(model.id);
                        const viewport = marqueeViewportRef.current?.getBoundingClientRect();
                        const target = event.currentTarget.getBoundingClientRect();
                        if (viewport) {
                          const relativeX = target.left - viewport.left + target.width / 2;
                          const popupHalf = 104;
                          const clampedX = Math.max(popupHalf, Math.min(viewport.width - popupHalf, relativeX));
                          setHoveredPopupX(clampedX);
                        }
                      }}
                      onBlur={() => {
                        setHoveredModelId((prev) => (prev === model.id ? null : prev));
                        setHoveredPopupX(null);
                      }}
                      className={`group relative inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-all duration-200 ${
                        selectedModel === model.id
                          ? "scale-[1.03] border border-[rgba(249,115,22,0.42)] bg-[linear-gradient(135deg,rgba(255,249,235,0.95)_0%,rgba(255,234,201,0.92)_100%)] text-orange-700"
                          : "border border-transparent bg-white/78 text-[var(--text-secondary)] hover:border-[rgba(249,115,22,0.2)] hover:bg-white hover:text-[var(--text-primary)] hover:shadow-[0_3px_14px_rgba(249,115,22,0.14)]"
                      }`}
                      aria-label={model.label}
                    >
                      {model.logo && !brokenLogos[model.id] ? (
                        <img
                          src={model.logo}
                          alt={`${model.label} logo`}
                          className="h-4 w-4 rounded-full object-cover"
                          loading="lazy"
                          onError={() => setBrokenLogos((prev) => ({ ...prev, [model.id]: true }))}
                        />
                      ) : (
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[var(--bg-subtle)] text-[9px] font-bold text-[var(--text-secondary)]">
                          {model.short}
                        </span>
                      )}
                      {model.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[22px] bg-white/72 p-2.5 backdrop-blur-md transition focus-within:bg-white/86">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--bg-subtle)] text-[var(--text-secondary)]">
                  <MessageCircleMore size={16} />
                </span>
                <input
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder={isZh ? "Do what you love ..." : "Do what you love ..."}
                  className="h-12 flex-1 bg-transparent px-1 text-[16px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
                />
                <Button size="lg" className="h-11 w-11 rounded-full p-0" disabled={!question.trim()} aria-label={isZh ? "发送" : "Send"}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </SectionWrapper>
    </section>
  );
}
