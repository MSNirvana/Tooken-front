"use client";

import { useMemo, useState } from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { routeResults, routeStrategies } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { useLocaleContext } from "@/components/providers/LocaleContext";

type StrategyId = "auto" | "auto-cheap" | "auto-fast" | "auto-quality";

export function RoutingDemo() {
  const [active, setActive] = useState<StrategyId>("auto");
  const { locale } = useLocaleContext();
  const isZh = locale === "zh";
  const result = useMemo(() => routeResults[active], [active]);
  const routeResultEn = {
    auto: { task: "Chinese writing optimization route", save: "97%" },
    "auto-cheap": { task: "Low-cost reasoning route", save: "84%" },
    "auto-fast": { task: "Realtime interaction route", save: "50%" },
    "auto-quality": { task: "Code generation and complex reasoning route", save: "47%" },
  };
  const strategyText = {
    auto: { zh: "auto — 全自动最优", en: "auto — balanced best fit", descZh: "综合成本与质量，智能平衡", descEn: "balance quality and cost automatically" },
    "auto-cheap": { zh: "auto-cheap — 极致省钱", en: "auto-cheap — minimize cost", descZh: "同质量下优先最低成本模型", descEn: "prefer lowest cost at same quality" },
    "auto-fast": { zh: "auto-fast — 极速响应", en: "auto-fast — lowest latency", descZh: "TTFT < 500ms，实时交互首选", descEn: "TTFT < 500ms for realtime UX" },
    "auto-quality": { zh: "auto-quality — 顶级质量", en: "auto-quality — maximize quality", descZh: "任务优先质量，不考虑成本", descEn: "prioritize quality over cost" },
  };
  const routeInsights: Record<
    StrategyId,
    {
      latency: string;
      quality: string;
      cost: string;
      candidates: Array<{ name: string; score: number }>;
    }
  > = {
    auto: {
      latency: "78",
      quality: "90",
      cost: "88",
      candidates: [
        { name: "Kimi K2", score: 96 },
        { name: "GPT-5.5", score: 87 },
        { name: "DeepSeek V3", score: 82 },
      ],
    },
    "auto-cheap": {
      latency: "70",
      quality: "76",
      cost: "98",
      candidates: [
        { name: "DeepSeek V3", score: 94 },
        { name: "Kimi K2", score: 86 },
        { name: "Gemini Flash", score: 74 },
      ],
    },
    "auto-fast": {
      latency: "98",
      quality: "75",
      cost: "70",
      candidates: [
        { name: "Gemini Flash", score: 95 },
        { name: "Doubao 1.5", score: 82 },
        { name: "DeepSeek V3", score: 70 },
      ],
    },
    "auto-quality": {
      latency: "64",
      quality: "99",
      cost: "58",
      candidates: [
        { name: "Claude Opus 4", score: 97 },
        { name: "GPT-5.5", score: 91 },
        { name: "Kimi K2", score: 78 },
      ],
    },
  };
  const activeInsight = routeInsights[active];

  return (
    <section className="bg-white py-24">
      <SectionWrapper>
        <div className="grid items-stretch gap-10 lg:grid-cols-2">
          <div className="flex h-full flex-col">
            <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[var(--text-brand)]">{isZh ? "智能路由" : "intelligent routing"}</span>
            <h2 className="font-display mt-3 text-[clamp(28px,3vw,44px)] font-bold leading-tight">
              {isZh ? "告诉我任务，" : "Tell me the task,"}
              <br />
              {isZh ? "我来选最优模型" : "I pick the best model"}
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)]">
              {isZh
                ? "Auto 路由在 5ms 内分析你的请求，综合评估质量、成本、延迟，自动选择当前最优模型。你只需写业务逻辑，其余交给我们。"
                : "Auto routing analyzes each request in 5ms and selects the best model by quality, cost and latency so you can focus on business logic."}
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {routeStrategies.map((strategy) => {
                const Icon = strategy.icon;
                return (
                  <button
                    key={strategy.id}
                    onClick={() => setActive(strategy.id as StrategyId)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200",
                      active === strategy.id
                        ? "border-orange-200 bg-orange-50 shadow-[0_0_0_1px_rgba(249,115,22,0.2)]"
                        : "border-[var(--border-subtle)] bg-white hover:border-[var(--border-default)]",
                    )}
                  >
                    <Icon size={20} className={active === strategy.id ? "text-[var(--text-brand)]" : "text-[var(--text-muted)]"} />
                    <div>
                      <div className="font-display text-[15px] font-semibold">
                        {isZh ? strategyText[strategy.id as StrategyId].zh : strategyText[strategy.id as StrategyId].en}
                      </div>
                      <div className="mt-0.5 text-[13px] text-[var(--text-secondary)]">
                        {isZh ? strategyText[strategy.id as StrategyId].descZh : strategyText[strategy.id as StrategyId].descEn}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex h-full flex-col rounded-[20px] border border-[var(--border-default)] bg-white p-6 shadow-[var(--shadow-lg)]">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">{isZh ? "实时路由引擎" : "live routing engine"}</p>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">{isZh ? "5ms 内完成判定" : "decision in 5ms"}</span>
            </div>
            <pre className="rounded-xl bg-[var(--bg-page)] p-4 font-mono text-xs text-[var(--text-secondary)]">
{`const client = new OpenAI({
  baseURL: "https://tooken.ai/v1",
  apiKey: process.env.TOOKEN_API_KEY,
});

const response = await client.chat.completions.create({
  model: "${active}",
  messages: [..],
});`}
            </pre>
            <div className="my-6 grid grid-cols-3 gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-page)] p-2.5">
              <div className="rounded-lg bg-white px-2 py-1.5 text-center">
                <p className="text-[10px] text-[var(--text-muted)]">{isZh ? "延迟" : "latency"}</p>
                <p className="text-xs font-semibold text-[var(--text-primary)]">{activeInsight.latency}%</p>
              </div>
              <div className="rounded-lg bg-white px-2 py-1.5 text-center">
                <p className="text-[10px] text-[var(--text-muted)]">{isZh ? "质量" : "quality"}</p>
                <p className="text-xs font-semibold text-[var(--text-primary)]">{activeInsight.quality}%</p>
              </div>
              <div className="rounded-lg bg-white px-2 py-1.5 text-center">
                <p className="text-[10px] text-[var(--text-muted)]">{isZh ? "成本" : "cost"}</p>
                <p className="text-xs font-semibold text-[var(--text-primary)]">{activeInsight.cost}%</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-[var(--border-subtle)] p-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">{isZh ? "路由结果" : "routing result"}</p>
                <p className="font-display mt-2 text-2xl font-bold text-[var(--text-primary)]">{result.model}</p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {isZh ? result.task : routeResultEn[active].task}
                </p>
                <div className="mt-5 space-y-2 text-sm">
                  <p className="text-[var(--text-muted)] line-through">{result.original}</p>
                  <p className="font-semibold">{result.cost}</p>
                  <p className="font-display text-2xl font-bold text-emerald-600">
                    {isZh ? "节省" : "save"} {isZh ? result.save : routeResultEn[active].save}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border-subtle)] p-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-muted)]">{isZh ? "候选模型 Top 3" : "candidate top 3"}</p>
                <div className="mt-2.5 space-y-2.5">
                  {activeInsight.candidates.map((candidate, index) => (
                    <div key={candidate.name} className="rounded-lg bg-[var(--bg-page)] px-3 py-2">
                      <div className="flex items-center justify-between gap-3 text-xs">
                        <span className="font-medium text-[var(--text-primary)]">
                          {index + 1}. {candidate.name}
                        </span>
                        <span className="font-semibold text-[var(--text-brand)]">{candidate.score}</span>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-white">
                        <div className="h-full rounded-full bg-[linear-gradient(90deg,#f97316_0%,#fb923c_100%)]" style={{ width: `${candidate.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
