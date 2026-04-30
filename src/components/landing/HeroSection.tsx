 "use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function HeroSection() {
  const t = useTranslations("common");

  return (
    <section className="relative overflow-hidden py-24">
      <motion.div
        className="container-shell"
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <Badge className="mb-5">AGI × Web4 Infrastructure</Badge>
        </motion.div>
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
          className="gradient-text mb-4 font-['Syne'] text-5xl font-extrabold leading-tight md:text-7xl"
        >
          Bring AGI to Web4
        </motion.h1>
        <motion.p
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
          className="mb-8 max-w-2xl text-lg text-zinc-300"
        >
          一个 API Key，接入全球最优模型。Auto 路由、x402 原生结算、Agent 经济自治。
        </motion.p>
        <motion.div variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }} className="mb-8 flex flex-wrap gap-3">
          <Link href="/dashboard">
            <Button>{t("buildNow")}</Button>
          </Link>
          <Link href="/docs">
            <Button variant="secondary">{t("docs")}</Button>
          </Link>
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }} className="flex flex-wrap gap-6 text-sm text-zinc-400">
          <span>20+ 模型</span>
          <span>60-80% 成本节省</span>
          <span>99.9% SLA</span>
          <span>x402 链上结算</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
