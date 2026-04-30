"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { testimonials } from "@/lib/constants";
import { fadeUpVariant } from "@/lib/motion";

export function TestimonialsSection() {
  return (
    <section className="bg-[var(--bg-page)] py-24">
      <SectionWrapper>
        <div className="mb-14 text-center">
          <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-muted)]">用户评价</span>
          <h2 className="font-display mt-3 text-[clamp(28px,3vw,44px)] font-bold">开发者们都在用 Tooken</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
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
