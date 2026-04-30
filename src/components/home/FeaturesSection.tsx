"use client";

import { motion } from "framer-motion";
import { Bot, Route, Zap } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { fadeUpVariant, staggerContainer } from "@/lib/motion";

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
    title: "x402 原生结算",
    subtitle: "机器原生支付，无需预充值",
    desc: "AI 请求触发微支付，链上流式结算。Base 网络 10 秒到账，手续费不到 $0.01。",
    metric: "< 10s",
    metricLabel: "链上到账时间",
    points: ["USDT/USDC 多链支持", "Agent 自主支付", "链上透明可审计"],
  },
  {
    number: "03",
    icon: Bot,
    title: "Agent 经济自治",
    subtitle: "Web4 时代的经济参与者",
    desc: "为每个 AI Agent 分配钱包、预算与决策权。Agent 拥有身份、持有资产、自主交易。",
    metric: "ERC-8183",
    metricLabel: "Agent 合约标准",
    points: ["Agent DID 身份", "可编程预算策略", "A2A 协议（路线图）"],
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <SectionWrapper>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
          <motion.div variants={fadeUpVariant} className="mb-14 text-center">
            <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-brand)]">核心能力</span>
            <h2 className="font-display mt-3 text-[clamp(28px,3vw,44px)] font-bold leading-tight tracking-[-0.025em]">
              三层架构，完整覆盖
              <br />
              AI 经济基础设施
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[18px] leading-relaxed text-[var(--text-secondary)]">
              从模型调用到链上结算，Tooken 是第一个将 AGI 与 Web4 原生融合的平台。
            </p>
          </motion.div>
          <div className="grid gap-5 lg:grid-cols-3">
            {features.map((feature) => {
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
