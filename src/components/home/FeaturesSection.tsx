"use client";

import { motion } from "framer-motion";
import { Bot, Route, Zap } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { fadeUpVariant, staggerContainer } from "@/lib/motion";
import { useLocaleContext } from "@/components/providers/LocaleContext";

const features = [
  {
    number: "01",
    icon: Route,
    title: "Auto 智能路由",
    subtitle: "最优模型，自动匹配",
    desc: "声明任务类型，系统在 5ms 内分析并路由至最优模型。代码选 Claude，中文选 Kimi，长文选 Minimax。",
    metric: "↓ 70%",
    metricLabel: "平均 Token 成本",
    points: ["任务感知路由", "账号池故障自愈", "路由透明可溯源"],
  },
  {
    number: "02",
    icon: Zap,
    title: "OnChain 原生结算",
    subtitle: "x402 + MPP 融合协议，无需预充值",
    desc: "AI 请求先由 x402 完成链上可验证支付，再由 MPP 承担高频微支付拆分与聚合结算。链上可信、链下高效，成本控制。",
    metric: "< 10s",
    metricLabel: "链上到账时间",
    points: ["x402 原生支付握手", "MPP 多路径微支付聚合", "链上透明可审计"],
  },
  {
    number: "03",
    icon: Bot,
    title: "Agent 经济自治",
    subtitle: "ERC-8183 + 8004 协议协同",
    desc: "为每个 AI Agent 分配钱包、预算与决策权，完成身份、权限与任务协同。Agent 拥有身份、持有资产并可自主执行交易。",
    metric: "ERC-8183-8004",
    metricLabel: "Agent 合约标准",
    points: ["Agent DID 身份", "8004 协议任务协同", "可编程预算策略"],
  },
];

const featuresEn = [
  {
    number: "01",
    icon: Route,
    title: "Auto intelligent routing",
    subtitle: "Best-fit model, auto selected",
    desc: "Declare your task type and route to the best model in 5ms. Code to Claude, Chinese writing to Kimi, long context to Minimax.",
    metric: "↓ 70%",
    metricLabel: "average Token cost",
    points: ["task-aware routing", "account pool self-healing", "transparent route traceability"],
  },
  {
    number: "02",
    icon: Zap,
    title: "OnChain native settlement",
    subtitle: "x402 + MPP, no pre-deposit needed",
    desc: "AI requests are first paid on-chain via x402, then high-frequency micropayments are split and aggregated by MPP for efficiency and cost control.",
    metric: "< 10s",
    metricLabel: "on-chain settlement time",
    points: ["x402 native payment handshake", "MPP multi-path micropayment aggregation", "on-chain auditability"],
  },
  {
    number: "03",
    icon: Bot,
    title: "Agent economic autonomy",
    subtitle: "ERC-8183 + 8004 collaboration",
    desc: "Assign wallet, budget and decision rights to each AI Agent, with identity, permission and task collaboration via ERC-8183 + 8004.",
    metric: "ERC-8183",
    metricLabel: "Agent contract standard",
    points: ["Agent DID identity", "8004 task collaboration", "programmable budget strategy"],
  },
];

export function FeaturesSection() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";
  const featureList = isZh ? features : featuresEn;

  return (
    <section className="bg-white py-16 md:py-24">
      <SectionWrapper>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.div variants={fadeUpVariant} className="mb-14 text-center">
            <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-brand)]">{isZh ? "核心能力" : "Core capabilities"}</span>
            <h2 className="font-display mt-3 text-[clamp(28px,3vw,44px)] font-bold leading-tight tracking-[-0.025em]">
              {isZh ? "三层架构覆盖" : "Three-layer architecture"}
              <br />
              {isZh ? "AI 经济基础设施" : "for AI economic infrastructure"}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[18px] leading-relaxed text-[var(--text-secondary)]">
              {isZh
                ? (
                  <>
                    从模型调用到链上结算，
                    <br />
                    Tooken 是第一个将 AGI 与 Web4 原生融合的平台。
                  </>
                )
                : "From model invocation to on-chain settlement, Tooken is the first platform to merge AGI with native Web4 economics."}
            </p>
          </motion.div>
          <div className="grid gap-5 lg:grid-cols-3">
            {featureList.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.article
                  key={feature.title}
                  variants={fadeUpVariant}
                  className="rounded-[20px] border border-[var(--border-default)] bg-white p-8 shadow-[var(--shadow-sm)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[var(--text-muted)]">{feature.number}</span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-[var(--text-brand)]">
                      <Icon size={18} />
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-[22px] font-bold">{feature.title}</h3>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{feature.subtitle}</p>
                  <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary)]">{feature.desc}</p>
                  <div className="my-5 h-px bg-[var(--border-subtle)]" />
                  <p className="font-display brand-gradient-text text-3xl font-bold">{feature.metric}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{feature.metricLabel}</p>
                  <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                    {feature.points.map((point) => (
                      <li key={point}>✓ {point}</li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </SectionWrapper>
    </section>
  );
}
