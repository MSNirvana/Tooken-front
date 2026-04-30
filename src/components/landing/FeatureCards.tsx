"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";

const features = [
  { title: "Auto 智能路由", desc: "自动选择最优模型，平均降低 60-80% Token 成本。", metric: "↓ 70% 平均成本" },
  { title: "x402 原生结算", desc: "AI 请求即触发支付，流式微结算，Agent 自主完成。", metric: "< 10s 链上到账" },
  { title: "Agent 经济自治", desc: "为 Agent 分配钱包与预算，支持机器经济闭环。", metric: "ERC-8183 支持" },
];

export function FeatureCards() {
  return (
    <section className="container-shell grid gap-4 pb-16 md:grid-cols-3">
      {features.map((item) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          <Card className="transition hover:-translate-y-1 hover:border-amber-300/30">
          <p className="mb-2 text-xs uppercase tracking-widest text-amber-200">Core Feature</p>
          <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
          <p className="mb-4 text-sm text-zinc-400">{item.desc}</p>
          <p className="text-sm text-amber-300">{item.metric}</p>
          </Card>
        </motion.div>
      ))}
    </section>
  );
}
