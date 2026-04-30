"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { testimonials } from "@/lib/constants";
import { fadeUpVariant } from "@/lib/motion";
import { useLocaleContext } from "@/components/providers/LocaleContext";

const testimonialsEn = [
  { content: "Auto routing is smart. Our monthly bill dropped from $800 to $180 in similar workloads.", author: "Zhang Wei", role: "CTO @ AI startup", avatar: "ZW" },
  { content: "Our Agent now recharges itself through x402. The payment flow is fully autonomous.", author: "Li Wei", role: "Blockchain Engineer", avatar: "LW" },
  { content: "Only two lines changed for integration. OpenAI compatibility is excellent.", author: "Chen Hao", role: "Indie Developer", avatar: "CH" },
  { content: "One command in Claude Code, and now Claude Opus 4 is both better and cheaper.", author: "Sarah K.", role: "Full-stack Developer", avatar: "SK" },
  { content: "Self-healing route fallback works. Upstream failures are invisible to end users.", author: "Wang Lei", role: "Backend Engineer", avatar: "WL" },
  { content: "Sub-account budget control is great for teams running multiple Agents.", author: "Lin", role: "AI Program Lead", avatar: "L" },
];

export function TestimonialsSection() {
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";
  const list = isZh ? testimonials : testimonialsEn;
  return (
    <section className="bg-[var(--bg-page)] py-24">
      <SectionWrapper>
        <div className="mb-14 text-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]">{isZh ? "用户评价" : "testimonials"}</span>
          <h2 className="font-display mt-3 text-[clamp(28px,3vw,44px)] font-bold">{isZh ? "开发者们都在用 Tooken" : "Developers are building with Tooken"}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {list.map((item, index) => (
            <motion.article
              key={`${item.author}-${index}`}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: (index % 3) * 0.08 }}
              className="rounded-2xl border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-sm)] transition hover:shadow-[var(--shadow-md)]"
            >
              <div className="mb-3 flex gap-0.5">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-base leading-relaxed text-[var(--text-primary)]">"{item.content}"</p>
              <div className="mt-5 flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#F97316_0%,#FBBF24_100%)] text-sm font-semibold text-white">
                  {item.avatar}
                </span>
                <div>
                  <p className="text-sm font-semibold">{item.author}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{item.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
