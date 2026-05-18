import Link from "next/link";
import { CodeBlock } from "@/components/docs/mdx/CodeBlock";
import { CodeTabs } from "@/components/docs/mdx/CodeTabs";
import { FadeIn } from "@/components/docs/ui/FadeIn";

export default function DocsHomePage() {
  const cards = [
    { icon: "🚀", title: "快速上手", description: "5分钟完成接入，一行代码切换全球模型", href: "/docs/quickstart" },
    { icon: "🤖", title: "模型与路由", description: "20+ 主流模型，Auto 智能路由自动选优", href: "/docs/models" },
    { icon: "💳", title: "计费体系", description: "Credits 体系、链上支付、ROI 监控", href: "/docs/billing" },
    { icon: "🔗", title: "Agent 模块", description: "为 Agent 分配钱包、预算与自主支付能力", href: "/docs/agent" },
    { icon: "📡", title: "API 参考", description: "完整端点文档，OpenAI 兼容接口", href: "/docs/api" },
    { icon: "🏢", title: "企业合规", description: "上游可信渠道、隐私承诺、数据安全", href: "/docs/compliance" },
  ];

  const heroHighlights = [
    { icon: "⛓️", title: "链上支付", desc: "支持 x402 方向，天然兼容钱包流程" },
    { icon: "🔍", title: "可验证路由", desc: "请求路由可追踪，模型决策更透明" },
    { icon: "🧠", title: "Agent 钱包", desc: "预算边界 + 自主执行能力" },
  ];

  return (
    <div className="docs-container py-12">
      <FadeIn>
        <section className="relative overflow-hidden rounded-[24px] border border-[var(--border-default)] bg-[color-mix(in_srgb,var(--bg-surface)_92%,transparent)] px-6 py-8 text-center shadow-[0_12px_34px_rgba(31,35,43,0.08)]">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="h-full w-full bg-[linear-gradient(rgba(31,35,43,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(31,35,43,0.03)_1px,transparent_1px)] bg-[length:36px_36px]" />
          </div>
          <div className="relative mx-auto max-w-3xl">
            <div className="mb-3 inline-flex items-center rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 py-1 text-xs text-[var(--text-secondary)]">
              Crypto-native AI Infrastructure
            </div>
            <h1 className="mb-2 font-display text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] md:text-4xl">
              Tooken 文档中心
            </h1>
            <p className="mx-auto mb-4 max-w-2xl text-sm text-[var(--text-secondary)]">
              一站式查看 Tooken 的接入、模型路由、计费、Agent 与 API 说明。
            </p>
            <div className="mb-5 flex items-center justify-center gap-2.5">
              <Link
                href="/docs/intro"
                className="rounded-full border border-[var(--accent-primary)] bg-[var(--accent-primary)] px-4 py-1.5 text-sm font-medium text-[#2d2100] shadow-[0_6px_16px_var(--accent-glow)]"
              >
                开始阅读
              </Link>
              <Link
                href="/docs/api"
                className="rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-1.5 text-sm text-[var(--text-secondary)] hover:border-[var(--border-accent)] hover:text-[var(--text-primary)]"
              >
                API 文档
              </Link>
            </div>
            <div className="mx-auto grid max-w-[700px] gap-2 md:grid-cols-3">
              {heroHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 py-2 text-left"
                >
                  <div className="mb-1 text-sm font-semibold text-[var(--text-primary)]">
                    {item.icon} {item.title}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">{item.desc}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-xs text-[var(--text-muted)]">面向 Web3 Builder 与 Agent Native 产品设计。</div>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.05}>
        <section className="mt-7">
          <h2 className="mb-4 font-display text-2xl font-semibold">文档模块</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="glass-surface p-4 transition-all hover:border-[var(--border-accent)] hover:shadow-[0_0_20px_var(--accent-glow)]"
              >
                <div className="mb-1 text-lg">{card.icon}</div>
                <div className="text-sm font-semibold text-[var(--text-primary)]">{card.title}</div>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">{card.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="mt-12">
          <h2 className="mb-4 font-display text-2xl font-semibold">接入示例</h2>
          <CodeTabs labels={["Python", "Node.js", "curl"]}>
            <CodeBlock language="python">{`from openai import OpenAI

client = OpenAI(
  api_key="YOUR_TOKEN",
  base_url="https://api.tooken.ai/v1"
)`}</CodeBlock>
            <CodeBlock language="javascript">{`import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.TOOKEN_API_KEY,
  baseURL: "https://api.tooken.ai/v1"
});`}</CodeBlock>
            <CodeBlock language="bash">{`curl https://api.tooken.ai/v1/chat/completions \\
  -H "Authorization: Bearer $TOOKEN_API_KEY" \\
  -H "Content-Type: application/json"`}</CodeBlock>
          </CodeTabs>
        </section>
      </FadeIn>
    </div>
  );
}
