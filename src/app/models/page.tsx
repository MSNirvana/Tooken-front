"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Footer } from "@/components/home/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { routeStrategies } from "@/lib/constants";
import { cn } from "@/lib/cn";

type ModelCapability = "编程" | "思考" | "文本" | "多模态" | "低延迟" | "长上下文" | "工具调用" | "多语言";
type SpeedTag = "极速" | "平衡" | "质量" | "经济";

type CatalogModel = {
  id: string;
  name: string;
  provider: string;
  apiModel: string;
  capabilities: ModelCapability[];
  context: string;
  pricing: string;
  speedTag: SpeedTag;
};

const providerLogoMap: Record<string, string | null> = {
  OpenAI: "/logos/ai/gpt.svg",
  Anthropic: "/logos/ai/claude.svg",
  Google: "/logos/ai/gemini.svg",
  月之暗面: "/logos/ai/kimi.svg",
  DeepSeek: "/logos/ai/deepseek.svg",
  阿里云: "/logos/ai/qwen.svg",
  智谱: "/logos/ai/glm.svg",
  MiniMax: "/logos/ai/minimax.svg",
  字节跳动: null,
};

const catalogModels: CatalogModel[] = [
  { id: "gpt-5-5", name: "GPT-5.5", provider: "OpenAI", apiModel: "gpt-5.5", capabilities: ["编程", "文本"], context: "1M", pricing: "$5/$30", speedTag: "平衡" },
  { id: "gpt-5-5-instant", name: "GPT-5.5 Instant", provider: "OpenAI", apiModel: "gpt-5.5-instant", capabilities: ["低延迟", "文本"], context: "1M", pricing: "$2.5/$15", speedTag: "极速" },
  { id: "gpt-5-5-pro", name: "GPT-5.5 Pro", provider: "OpenAI", apiModel: "gpt-5.5-pro", capabilities: ["思考", "编程"], context: "1M", pricing: "$8/$40", speedTag: "质量" },
  { id: "gpt-5-4", name: "GPT-5.4", provider: "OpenAI", apiModel: "gpt-5.4", capabilities: ["文本", "思考"], context: "1M", pricing: "$2.5/$15", speedTag: "平衡" },
  { id: "gpt-4-1", name: "GPT-4.1", provider: "OpenAI", apiModel: "gpt-4.1", capabilities: ["编程", "多模态"], context: "128K", pricing: "$3/$12", speedTag: "平衡" },

  { id: "claude-opus-4-7", name: "Claude Opus 4.7", provider: "Anthropic", apiModel: "claude-opus-4-7", capabilities: ["思考", "文本"], context: "1M", pricing: "$5/$25", speedTag: "质量" },
  { id: "claude-sonnet-4-6", name: "Claude Sonnet 4.6", provider: "Anthropic", apiModel: "claude-sonnet-4-6", capabilities: ["编程", "文本"], context: "1M", pricing: "$3/$15", speedTag: "平衡" },
  { id: "claude-haiku-4-5", name: "Claude Haiku 4.5", provider: "Anthropic", apiModel: "claude-haiku-4-5", capabilities: ["低延迟", "文本"], context: "1M", pricing: "$1/$5", speedTag: "极速" },
  { id: "claude-opus-4-6", name: "Claude Opus 4.6", provider: "Anthropic", apiModel: "claude-opus-4-6", capabilities: ["思考", "编程"], context: "1M", pricing: "$5/$25", speedTag: "质量" },

  { id: "gemini-3-1-pro", name: "Gemini 3.1 Pro", provider: "Google", apiModel: "gemini-3.1-pro", capabilities: ["思考", "多模态"], context: "1M", pricing: "$3/$15", speedTag: "平衡" },
  { id: "gemini-3-pro", name: "Gemini 3 Pro", provider: "Google", apiModel: "gemini-3-pro", capabilities: ["多模态", "文本"], context: "1M", pricing: "$2.5/$12", speedTag: "平衡" },
  { id: "gemini-2-5-pro", name: "Gemini 2.5 Pro", provider: "Google", apiModel: "gemini-2.5-pro", capabilities: ["长上下文", "思考"], context: "2M", pricing: "$3.5/$16", speedTag: "质量" },
  { id: "gemini-2-0-flash", name: "Gemini 2.0 Flash", provider: "Google", apiModel: "gemini-2.0-flash", capabilities: ["低延迟", "多模态"], context: "1M", pricing: "$0.9/$4.5", speedTag: "极速" },

  { id: "kimi-k2-5", name: "Kimi-K2.5", provider: "月之暗面", apiModel: "kimi-k2.5", capabilities: ["多模态", "思考"], context: "200K", pricing: "$1.2/$6", speedTag: "平衡" },
  { id: "kimi-k2", name: "Kimi-K2", provider: "月之暗面", apiModel: "kimi-k2", capabilities: ["文本", "长上下文"], context: "200K", pricing: "$1/$5", speedTag: "平衡" },
  { id: "kimi-1-5", name: "Kimi-1.5", provider: "月之暗面", apiModel: "kimi-1.5", capabilities: ["思考", "文本"], context: "128K", pricing: "$0.8/$4", speedTag: "经济" },
  { id: "kimi-1-3", name: "Kimi-1.3", provider: "月之暗面", apiModel: "kimi-1.3", capabilities: ["文本", "工具调用"], context: "128K", pricing: "$0.6/$3", speedTag: "经济" },

  { id: "deepseek-v4-pro", name: "DeepSeek V4-Pro", provider: "DeepSeek", apiModel: "deepseek-v4-pro", capabilities: ["思考", "文本"], context: "128K", pricing: "$1/$5", speedTag: "平衡" },
  { id: "deepseek-v4-flash", name: "DeepSeek V4-Flash", provider: "DeepSeek", apiModel: "deepseek-v4-flash", capabilities: ["低延迟", "文本"], context: "128K", pricing: "$0.5/$2.5", speedTag: "极速" },
  { id: "deepseek-v3-1", name: "DeepSeek V3.1", provider: "DeepSeek", apiModel: "deepseek-v3.1", capabilities: ["思考", "编程"], context: "128K", pricing: "$0.8/$4", speedTag: "平衡" },
  { id: "deepseek-r1", name: "DeepSeek R1", provider: "DeepSeek", apiModel: "deepseek-r1", capabilities: ["思考", "工具调用"], context: "128K", pricing: "$0.7/$3.8", speedTag: "质量" },

  { id: "qwen3-max", name: "Qwen3-Max", provider: "阿里云", apiModel: "qwen3-max", capabilities: ["思考", "文本"], context: "128K", pricing: "$1.3/$6.5", speedTag: "平衡" },
  { id: "qwen3-235b-a22b", name: "Qwen3-235B-A22B", provider: "阿里云", apiModel: "qwen3-235b-a22b", capabilities: ["思考", "编程"], context: "128K", pricing: "$1/$5.2", speedTag: "质量" },
  { id: "qwen3-32b", name: "Qwen3-32B", provider: "阿里云", apiModel: "qwen3-32b", capabilities: ["文本", "多语言"], context: "128K", pricing: "$0.5/$2.6", speedTag: "经济" },
  { id: "qwen2-5-max", name: "Qwen2.5-Max", provider: "阿里云", apiModel: "qwen2.5-max", capabilities: ["文本", "多语言"], context: "128K", pricing: "$0.6/$3", speedTag: "经济" },

  { id: "glm-5-1", name: "GLM-5.1", provider: "智谱", apiModel: "glm-5.1", capabilities: ["思考", "编程"], context: "128K", pricing: "$1.2/$6.1", speedTag: "平衡" },
  { id: "glm-5", name: "GLM-5", provider: "智谱", apiModel: "glm-5", capabilities: ["思考", "文本"], context: "128K", pricing: "$1/$5", speedTag: "平衡" },
  { id: "glm-4-5", name: "GLM-4.5", provider: "智谱", apiModel: "glm-4.5", capabilities: ["文本", "思考"], context: "128K", pricing: "$0.8/$4", speedTag: "经济" },
  { id: "glm-4-air", name: "GLM-4-Air", provider: "智谱", apiModel: "glm-4-air", capabilities: ["低延迟", "文本"], context: "128K", pricing: "$0.4/$2", speedTag: "极速" },

  { id: "minimax-m2-7", name: "MiniMax-M2.7", provider: "MiniMax", apiModel: "minimax-m2.7", capabilities: ["文本", "思考"], context: "128K", pricing: "$0.9/$4.6", speedTag: "平衡" },
  { id: "minimax-m2-5", name: "MiniMax-M2.5", provider: "MiniMax", apiModel: "minimax-m2.5", capabilities: ["文本", "多模态"], context: "128K", pricing: "$0.7/$3.5", speedTag: "经济" },
  { id: "abab-6-5", name: "abab-6.5", provider: "MiniMax", apiModel: "abab-6.5", capabilities: ["文本", "工具调用"], context: "64K", pricing: "$0.5/$2.5", speedTag: "经济" },
  { id: "minimax-text-01", name: "MiniMax-Text-01", provider: "MiniMax", apiModel: "minimax-text-01", capabilities: ["文本", "低延迟"], context: "64K", pricing: "$0.4/$2", speedTag: "极速" },

  { id: "doubao-1-5-pro", name: "Doubao 1.5 Pro", provider: "字节跳动", apiModel: "doubao-1.5-pro", capabilities: ["低延迟", "文本"], context: "128K", pricing: "$0.8/$3.8", speedTag: "极速" },
];

const routeTagClass: Record<string, string> = {
  auto: "border-orange-200 bg-orange-50 text-orange-700",
  "auto-fast": "border-cyan-200 bg-cyan-50 text-cyan-700",
  "auto-cheap": "border-emerald-200 bg-emerald-50 text-emerald-700",
  "auto-quality": "border-violet-200 bg-violet-50 text-violet-700",
};

const modelIntroMap: Record<string, string> = {
  "gpt-5-5": "综合能力最稳，代码生成与复杂指令遵循表现均衡，适合主力生产流量。",
  "gpt-5-5-instant": "首 token 返回更快，适合客服对话、实时 Agent 与高并发低延迟场景。",
  "gpt-5-5-pro": "推理深度更强，长链路任务和复杂工程问题拆解能力更突出。",
  "gpt-5-4": "成本与质量平衡，适合通用文本处理、知识问答和中等复杂度任务。",
  "gpt-4-1": "工具调用与多模态能力成熟，适合代码助手与图文混合输入流程。",

  "claude-opus-4-7": "长文本理解和严谨推理能力突出，适合法务、研究与高质量写作。",
  "claude-sonnet-4-6": "编码与文本质量兼顾，响应速度稳定，适合工程团队日常开发。",
  "claude-haiku-4-5": "轻量快速、单位成本低，适合高频自动化任务与批量轻推理。",
  "claude-opus-4-6": "复杂指令遵循表现强，适合高要求代码评审与深度分析任务。",

  "gemini-3-1-pro": "原生多模态优势明显，图文音视频混合任务场景适配能力更强。",
  "gemini-3-pro": "通用多模态表现稳定，适合内容理解、摘要生成与跨模态问答。",
  "gemini-2-5-pro": "超长上下文窗口适合长文档、多轮工作流和知识库整编任务。",
  "gemini-2-0-flash": "极速响应与低成本兼顾，适合交互式应用和实时推荐策略。",

  "kimi-k2.5": "中文与长文本场景表现优秀，适合报告写作、检索增强与资料整合。",
  "kimi-k2": "长上下文性价比高，适合大段材料处理和连续对话记忆型任务。",
  "kimi-1.5": "中文通用推理稳定，适合企业文档问答、改写润色与知识助手。",
  "kimi-1.3": "轻量通用版本，部署门槛低，适合作为成本敏感场景基础模型。",

  "deepseek-v4-pro": "推理和文本质量较均衡，适合代码分析、问答和结构化输出。",
  "deepseek-v4-flash": "面向低延迟交互优化，适合高并发入口与实时业务编排层。",
  "deepseek-v3-1": "编程推理能力更实用，适合代码补全、调试建议和脚本生成。",
  "deepseek-r1": "链式推理能力强，适合数学、逻辑与复杂决策类问题。",

  "qwen3-max": "中文能力与推理质量突出，适合本地化业务和复杂知识任务。",
  "qwen3-235b-a22b": "大参数推理模型，复杂代码与结构化任务的稳定性更好。",
  "qwen3-32b": "更轻量且多语言能力实用，适合全球化中小负载场景。",
  "qwen2-5-max": "成熟稳定的通用版本，适合文本生成、分类与企业流程自动化。",

  "glm-5.1": "面向工程任务优化，代码与推理协同效果好，适合开发链路集成。",
  "glm-5": "综合能力均衡，适合企业问答、内容生成和业务规则推理。",
  "glm-4.5": "成本更友好，适合规模化调用和中低复杂度文本处理场景。",
  "glm-4-air": "低时延轻量模型，适合即时回复、路由探测和边缘推理任务。",

  "minimax-m2.7": "文本与推理表现稳健，适合内容生成和通用助手类产品。",
  "minimax-m2.5": "多模态能力更均衡，适合图文理解与交互式内容应用。",
  "abab-6-5": "对话表现自然、成本可控，适合聊天机器人与业务陪练场景。",
  "minimax-text-01": "轻量文本版本，响应快且便宜，适合批处理和高频触发流程。",

  "doubao-1-5-pro": "低延迟与中文实用性兼顾，适合实时交互和国内场景快速落地。",
};

function speedTagClass(speed: SpeedTag) {
  if (speed === "极速") return "border-cyan-200 bg-cyan-50 text-cyan-700";
  if (speed === "质量") return "border-violet-200 bg-violet-50 text-violet-700";
  if (speed === "经济") return "border-emerald-200 bg-emerald-50 text-emerald-700";
  return "border-orange-200 bg-orange-50 text-orange-700";
}

export default function ModelsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProvider, setActiveProvider] = useState("全部");
  const [activeCapability, setActiveCapability] = useState("全部");

  const providerOptions = useMemo(() => ["全部", ...new Set(catalogModels.map((model) => model.provider))], []);
  const capabilityOptions = useMemo(() => ["全部", ...new Set(catalogModels.flatMap((model) => model.capabilities))], []);
  const totalProviders = providerOptions.length - 1;
  const totalCapabilities = capabilityOptions.length - 1;

  const filteredModels = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return catalogModels.filter((model) => {
      const providerMatch = activeProvider === "全部" || model.provider === activeProvider;
      const capabilityMatch = activeCapability === "全部" || model.capabilities.includes(activeCapability as ModelCapability);
      const queryMatch =
        query.length === 0 ||
        model.name.toLowerCase().includes(query) ||
        model.provider.toLowerCase().includes(query) ||
        model.apiModel.toLowerCase().includes(query);
      return providerMatch && capabilityMatch && queryMatch;
    });
  }, [activeCapability, activeProvider, searchQuery]);

  return (
    <main className="bg-[var(--bg-page)]">
      <Navbar />
      <section id="intelligent-routing" className="section-shell scroll-mt-24 pt-28 pb-6">
        <div className="rounded-[24px] border border-[var(--border-default)] bg-[linear-gradient(140deg,#ffffff_0%,#fffaf3_65%,#fffbeb_100%)] p-5 shadow-[var(--shadow-sm)]">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange-500">Routing Layer</p>
              <h2 className="font-display mt-1 text-[26px] font-black tracking-[-0.01em] text-[var(--text-primary)]">智能路由</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">在请求层自动决策速度、成本与质量，优先给出当前任务的最优模型组合。</p>
            </div>
            <span className="rounded-full border border-orange-200 bg-white/90 px-3 py-1 text-xs font-medium text-orange-700">4 种路由策略</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {routeStrategies.map((strategy) => {
              const Icon = strategy.icon;
              return (
                <article
                  key={strategy.id}
                  className="rounded-xl border border-[var(--border-default)] bg-white/85 p-4 transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-[var(--shadow-md)]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)]">
                        <Icon className="h-4 w-4 text-[var(--text-secondary)]" />
                      </span>
                      <span className="font-mono text-sm text-[var(--text-primary)]">{strategy.id}</span>
                    </div>
                    <span className={cn("rounded-full border px-2 py-0.5 text-[11px] font-medium", routeTagClass[strategy.id])}>{strategy.id}</span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--text-secondary)]">{strategy.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="model-catalog" className="section-shell scroll-mt-24 pb-20">
        <div className="rounded-[24px] border border-[var(--border-default)] bg-white p-5 shadow-[var(--shadow-sm)]">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-orange-500">Model Catalog</p>
              <h2 className="font-display mt-1 text-[26px] font-black tracking-[-0.01em] text-[var(--text-primary)]">模型列表</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">已接入 {totalProviders} 家厂商，共 {filteredModels.length} 个可调用版本（价格单位：USD / 1M token）。</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full border border-[var(--border-default)] bg-[var(--bg-subtle)] px-2.5 py-1 text-[var(--text-secondary)]">{totalCapabilities} 类能力标签</span>
              <span className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-orange-700">持续扩容中</span>
            </div>
          </div>

          <div className="mb-4 relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="搜索模型或厂商（例如 GPT、Claude、DeepSeek）"
              className="h-12 w-full rounded-2xl border border-[var(--border-default)] bg-[var(--bg-subtle)] pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--border-brand)] focus:bg-white focus:shadow-[var(--shadow-sm)]"
            />
          </div>

          <div className="mb-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              {providerOptions.map((provider) => (
                <button
                  key={provider}
                  type="button"
                  onClick={() => setActiveProvider(provider)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                    activeProvider === provider
                      ? "border-orange-200 bg-orange-50 text-orange-700"
                      : "border-[var(--border-default)] bg-white text-[var(--text-secondary)] hover:border-orange-200 hover:text-[var(--text-primary)]",
                  )}
                >
                  {provider}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {capabilityOptions.map((capability) => (
                <button
                  key={capability}
                  type="button"
                  onClick={() => setActiveCapability(capability)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                    activeCapability === capability
                      ? "border-orange-200 bg-orange-50 text-orange-700"
                      : "border-[var(--border-default)] bg-white text-[var(--text-secondary)] hover:border-orange-200 hover:text-[var(--text-primary)]",
                  )}
                >
                  {capability}
                </button>
              ))}
            </div>
          </div>

          {filteredModels.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--border-default)] bg-[var(--bg-subtle)] p-10 text-center text-sm text-[var(--text-secondary)]">
              当前筛选条件下没有匹配结果，试试切换厂商、能力或关键词。
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredModels.map((model) => {
                const providerLogo = providerLogoMap[model.provider];
                return (
                  <article
                    key={model.id}
                    className="group flex h-full flex-col rounded-2xl border border-[var(--border-default)] bg-white p-4 transition hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-[var(--shadow-md)]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-[var(--text-muted)]">{model.provider}</p>
                        <h3 className="mt-1 flex items-center gap-2 text-[15px] font-semibold leading-5 text-[var(--text-primary)]">
                          {providerLogo ? (
                            <img src={providerLogo} alt={`${model.provider} logo`} className="h-4 w-4 object-contain" loading="lazy" />
                          ) : (
                            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[linear-gradient(135deg,#60a5fa_0%,#8b5cf6_100%)] text-[9px] font-bold text-white">
                              豆
                            </span>
                          )}
                          <span>{model.name}</span>
                        </h3>
                      </div>
                      <span className={cn("rounded-full border px-2 py-0.5 text-[11px] font-medium", speedTagClass(model.speedTag))}>{model.speedTag}</span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {model.capabilities.map((capability) => (
                        <span key={`${model.id}-${capability}`} className="rounded-full border border-[var(--border-default)] bg-[var(--bg-subtle)] px-2 py-0.5 text-[11px] text-[var(--text-secondary)]">
                          {capability}
                        </span>
                      ))}
                    </div>

                    <p className="mt-3 h-10 overflow-hidden text-[12px] leading-5 text-[var(--text-secondary)]">
                      {modelIntroMap[model.id] ?? "该版本具备稳定的通用能力，可覆盖主流文本与推理任务。"}
                    </p>

                    <div className="mt-auto grid grid-cols-2 gap-2 pt-3 text-sm">
                      <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] p-2">
                        <p className="text-[11px] text-[var(--text-muted)]">上下文</p>
                        <p className="mt-0.5 font-medium text-[var(--text-primary)]">{model.context}</p>
                      </div>
                      <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-subtle)] p-2">
                        <p className="text-[11px] text-[var(--text-muted)]">价格</p>
                        <p className="mt-0.5 font-medium text-orange-700">{model.pricing}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
