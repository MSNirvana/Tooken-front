import { Bot, Crown, DollarSign, Timer, Zap } from "lucide-react";

export const tickerItems = [
  "✦ 20+ 全球模型接入",
  "✦ Auto 智能路由",
  "✦ 平均节省 70% Token 成本",
  "✦ x402 Web4 原生结算",
  "✦ 99.9% 可用率",
  "✦ OpenAI 兼容接口",
  "✦ Base 网络秒级到账",
  "✦ Agent 经济自治",
];

export const models = [
  { name: "GPT-5", provider: "OpenAI", category: "顶级", color: "#00A67E" },
  { name: "Claude Opus 4", provider: "Anthropic", category: "顶级", color: "#CC6B3D" },
  { name: "Gemini Ultra", provider: "Google", category: "顶级", color: "#4285F4" },
  { name: "Kimi K2", provider: "月之暗面", category: "国产", color: "#1A1A2E" },
  { name: "DeepSeek V3", provider: "DeepSeek", category: "国产", color: "#006FFF" },
  { name: "Qwen Max", provider: "阿里云", category: "国产", color: "#FF6A00" },
  { name: "Minimax", provider: "MiniMax", category: "国产", color: "#7C3AED" },
  { name: "Doubao Pro", provider: "字节跳动", category: "国产", color: "#1664FF" },
  { name: "Llama 3", provider: "Meta", category: "开源", color: "#0668E1" },
  { name: "Mistral", provider: "Mistral", category: "开源", color: "#FF7000" },
];

export const routeStrategies = [
  { id: "auto", icon: Zap, label: "auto — 全自动最优", desc: "综合成本与质量，智能平衡" },
  { id: "auto-cheap", icon: DollarSign, label: "auto-cheap — 极致省钱", desc: "同质量下优先最低成本模型" },
  { id: "auto-fast", icon: Timer, label: "auto-fast — 极速响应", desc: "TTFT < 500ms，实时交互首选" },
  { id: "auto-quality", icon: Crown, label: "auto-quality — 顶级质量", desc: "任务优先质量，不考虑成本" },
];

export const testimonials = [
  { content: "Auto 路由太聪明了，同样的业务场景，成本直接从每月 $800 降到 $180，省了 77%。", author: "张伟", role: "CTO @ 某 AI 创业公司", avatar: "ZW" },
  { content: "我们的 Agent 现在直接用 x402 自主充值，整个支付链路完全不需要人工干预。", author: "Li Wei", role: "Blockchain Engineer", avatar: "LW" },
  { content: "接入只改了 2 行代码，其他完全不动。OpenAI 兼容做得很好。", author: "陈浩", role: "独立开发者", avatar: "CH" },
  { content: "Claude Code 一行命令接入，现在用 Claude Opus 4 写代码，比之前便宜很多。", author: "Sarah K.", role: "Full-stack Developer", avatar: "SK" },
  { content: "故障自愈功能真的好用，上游模型偶尔抽风，请求自动切到备用账号。", author: "王磊", role: "后端工程师", avatar: "WL" },
  { content: "企业子账号管理非常方便，给不同部门 Agent 设不同预算，再也不担心超支。", author: "林经理", role: "AI 项目负责人", avatar: "L" },
];

export const plans = [
  {
    name: "按量付费",
    price: "0",
    unit: "月费",
    desc: "注册即用，按实际消耗扣减",
    cta: "免费开始",
    features: ["10 次/分钟请求限制", "免费赠送 1,000 Credits", "支持全部 20+ 模型", "Auto 智能路由", "用量监控面板", "社区支持"],
  },
  {
    name: "专业版",
    price: "¥999",
    unit: "/月",
    desc: "中小企业首选，赠送 Credits + 8 折优惠",
    cta: "开始专业版",
    highlight: true,
    badge: "Most Popular",
    features: ["300 次/分钟请求限制", "赠送 300,000 Credits", "后续充值 8 折", "5 个子账号", "优先路由队列", "ROI 分析面板", "邮件支持，8h 响应"],
  },
  {
    name: "企业版",
    price: "联系商务",
    unit: "",
    desc: "定制 SLA，专属接口，私有化部署",
    cta: "联系我们",
    features: ["自定义请求限制", "6 折起超量优惠", "无限子账号", "专属客服经理", "私有化模型部署", "合规发票 & SOC2", "SLA 99.99%"],
  },
];

export const routeResults = {
  auto: { model: "Kimi K2", task: "中文写作优化路由", cost: "0.5 Credits / 1K", original: "15 Credits / 1K", save: "97%" },
  "auto-cheap": { model: "DeepSeek V3", task: "低成本推理", cost: "0.8 Credits / 1K", original: "5 Credits / 1K", save: "84%" },
  "auto-fast": { model: "Gemini Flash", task: "实时交互响应", cost: "1.2 Credits / 1K", original: "2.4 Credits / 1K", save: "50%" },
  "auto-quality": { model: "Claude Opus 4", task: "代码生成与复杂推理", cost: "8 Credits / 1K", original: "15 Credits / 1K", save: "47%" },
};
