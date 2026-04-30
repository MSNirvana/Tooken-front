# Tooken 前端开发文档 v1.0
> AGI 基础设施 · 智能路由 · Web4 原生结算层  
> 面向 Cursor 开发者的完整前端实现规范

---

## 目录

1. [设计系统与视觉规范](#1-设计系统与视觉规范)
2. [技术栈选型](#2-技术栈选型)
3. [页面结构总览](#3-页面结构总览)
4. [模块详细设计](#4-模块详细设计)
   - 4.1 首页 Landing Page
   - 4.2 控制台 Dashboard
   - 4.3 模型市场 Models
   - 4.4 API Keys 管理
   - 4.5 用量监控 Usage
   - 4.6 支付与充值 Billing
   - 4.7 Agent 钱包
   - 4.8 文档中心 Docs
5. [组件库规范](#5-组件库规范)
6. [路由结构](#6-路由结构)
7. [状态管理](#7-状态管理)
8. [接口对接规范](#8-接口对接规范)
9. [响应式与国际化](#9-响应式与国际化)
10. [动效规范](#10-动效规范)

---

## 1. 设计系统与视觉规范

### 1.1 品牌基调

Tooken 是 **AI × Web4** 时代的经济基础设施平台。视觉风格定位：

- **简约大气**：留白充足，结构清晰，不堆砌元素
- **金融科技感**：参考 Stripe、Linear 的精工感，叠加 Web3 的流动性
- **未来感**：非霓虹赛博朋克，而是克制的"数字黄金"美学
- **国际化**：英文优先布局，中英文双语兼容

**一句话设计原则**：黑色宇宙中的金色光芒，秩序感中透出野心。

---

### 1.2 色彩系统（CSS Variables）

```css
:root {
  /* === 主色：金色渐变系 === */
  --color-primary-50:  #FFFBEB;
  --color-primary-100: #FEF3C7;
  --color-primary-200: #FDE68A;
  --color-primary-300: #FCD34D;
  --color-primary-400: #FBBF24;  /* 主金色 */
  --color-primary-500: #F59E0B;  /* 深金 */
  --color-primary-600: #D97706;  /* 橙金 */
  --color-primary-700: #B45309;

  /* === 渐变定义 === */
  --gradient-gold: linear-gradient(135deg, #F59E0B 0%, #FBBF24 40%, #FDE68A 70%, #F59E0B 100%);
  --gradient-gold-subtle: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%);
  --gradient-hero: linear-gradient(135deg, #0A0A0F 0%, #0F0E1A 50%, #1A0E00 100%);
  --gradient-card: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(251,191,36,0.03) 100%);
  --gradient-button: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%);

  /* === 背景色系（深色为主） === */
  --bg-base:       #09090F;   /* 主背景，近黑色带深蓝 */
  --bg-surface:    #111118;   /* 卡片背景 */
  --bg-elevated:   #1A1A26;   /* 悬浮层、弹窗 */
  --bg-overlay:    #22222E;   /* Hover 态 */

  /* === 文字色 === */
  --text-primary:   #F9F9FB;   /* 主文字，接近纯白 */
  --text-secondary: #A1A1B5;   /* 次级文字 */
  --text-muted:     #64648A;   /* 灰暗提示文字 */
  --text-gold:      #FBBF24;   /* 金色强调 */

  /* === 边框 === */
  --border-default:  rgba(251, 191, 36, 0.12);  /* 金色微透明边框 */
  --border-subtle:   rgba(255, 255, 255, 0.06);
  --border-strong:   rgba(251, 191, 36, 0.35);

  /* === 功能色 === */
  --color-success: #34D399;
  --color-warning: #FBBF24;
  --color-error:   #F87171;
  --color-info:    #60A5FA;

  /* === Web3 强调色 === */
  --color-chain-eth:     #627EEA;
  --color-chain-base:    #0052FF;
  --color-chain-solana:  #9945FF;

  /* === 间距基准 === */
  --spacing-unit: 4px;
}
```

---

### 1.3 字体规范

```css
/* 引入方式（在 index.html 或 globals.css 中）*/
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  /* 展示字体：Syne — 几何感强，高辨识度，适合大标题 */
  --font-display: 'Syne', sans-serif;

  /* 正文字体：DM Sans — 现代、可读性强，国际化 */
  --font-body: 'DM Sans', sans-serif;

  /* 等宽字体：JetBrains Mono — API Key、代码块 */
  --font-mono: 'JetBrains Mono', monospace;
}

/* 字体等级 */
.text-hero     { font-family: var(--font-display); font-size: clamp(48px, 7vw, 96px); font-weight: 800; line-height: 1.0; letter-spacing: -0.04em; }
.text-h1       { font-family: var(--font-display); font-size: clamp(32px, 4vw, 56px);  font-weight: 700; line-height: 1.1; letter-spacing: -0.03em; }
.text-h2       { font-family: var(--font-display); font-size: clamp(24px, 3vw, 40px);  font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; }
.text-h3       { font-family: var(--font-display); font-size: 24px; font-weight: 600; line-height: 1.3; }
.text-body-lg  { font-family: var(--font-body);    font-size: 18px; font-weight: 400; line-height: 1.6; }
.text-body     { font-family: var(--font-body);    font-size: 16px; font-weight: 400; line-height: 1.6; }
.text-small    { font-family: var(--font-body);    font-size: 14px; font-weight: 400; line-height: 1.5; }
.text-caption  { font-family: var(--font-body);    font-size: 12px; font-weight: 500; line-height: 1.4; letter-spacing: 0.08em; text-transform: uppercase; }
.text-mono     { font-family: var(--font-mono);    font-size: 13px; }
```

---

### 1.4 圆角、阴影、模糊

```css
:root {
  /* 圆角 */
  --radius-sm:  6px;
  --radius-md:  12px;
  --radius-lg:  16px;
  --radius-xl:  24px;
  --radius-2xl: 32px;
  --radius-full: 9999px;

  /* 阴影 */
  --shadow-gold-sm:  0 0 16px rgba(251, 191, 36, 0.15);
  --shadow-gold-md:  0 0 32px rgba(251, 191, 36, 0.20);
  --shadow-gold-lg:  0 0 64px rgba(251, 191, 36, 0.25);
  --shadow-card:     0 1px 0 rgba(255,255,255,0.05) inset, 0 4px 24px rgba(0,0,0,0.4);
  --shadow-elevated: 0 16px 64px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset;

  /* 玻璃模糊效果 */
  --blur-glass: blur(20px) saturate(1.5);
  --blur-sm:    blur(8px);
}
```

---

## 2. 技术栈选型

| 层级 | 技术 | 原因 |
|------|------|------|
| 框架 | **Next.js 15 (App Router)** | SSR/SSG 兼容，SEO 友好，文件路由清晰 |
| UI 库 | **自定义组件 + Tailwind CSS v4** | 完全定制化，避免通用组件库的平庸感 |
| 动效 | **Framer Motion** | 物理动画、页面过渡、scroll 触发 |
| 图表 | **Recharts** | 轻量，可高度定制，Tailwind 友好 |
| Web3 | **wagmi v2 + viem** | 现代 Web3 钱包连接方案 |
| 状态管理 | **Zustand** | 轻量，无 boilerplate |
| 数据请求 | **TanStack Query v5** | 缓存、轮询、请求状态管理 |
| 代码高亮 | **Shiki** | 服务端高亮，支持多主题 |
| 图标 | **Lucide React + 自定义 SVG** | 简洁现代 |
| 表单 | **React Hook Form + Zod** | 高性能验证 |
| 国际化 | **next-intl** | 支持中英文切换 |

### 安装命令

```bash
npx create-next-app@latest tooken-web --typescript --tailwind --app
cd tooken-web

npm install framer-motion recharts wagmi viem @tanstack/react-query zustand
npm install lucide-react react-hook-form zod @hookform/resolvers
npm install next-intl shiki
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tooltip
npm install clsx tailwind-merge
```

### tailwind.config.ts 关键配置

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        bg: {
          base:     '#09090F',
          surface:  '#111118',
          elevated: '#1A1A26',
          overlay:  '#22222E',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'shimmer':     'shimmer 2.5s linear infinite',
        'float':       'float 6s ease-in-out infinite',
        'pulse-gold':  'pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up':    'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.5', boxShadow: '0 0 32px rgba(251,191,36,0.4)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
}
export default config
```

---

## 3. 页面结构总览

```
/                       → 首页 Landing Page
/dashboard              → 控制台首页（需登录）
/dashboard/models       → 模型市场
/dashboard/api-keys     → API Keys 管理
/dashboard/usage        → 用量监控
/dashboard/billing      → 支付与充值
/dashboard/wallet       → Agent 钱包
/dashboard/settings     → 账户设置
/docs                   → 文档首页
/docs/[slug]            → 文档详情（快速上手/API参考等）
/pricing                → 定价页
/login                  → 登录
```

---

## 4. 模块详细设计

---

### 4.1 首页 Landing Page（`/`）

#### 整体布局

```
┌─────────────────────────────────────────┐
│  Navbar（透明 → 滚动后毛玻璃）            │
├─────────────────────────────────────────┤
│  Hero Section（全屏 vh-screen）          │
│  - 主标题 + 副标题 + CTA                 │
│  - 动态粒子/流动背景效果                  │
├─────────────────────────────────────────┤
│  Ticker / 数据滚动条（实时数据展示）        │
├─────────────────────────────────────────┤
│  核心能力 3 列 Feature Cards             │
├─────────────────────────────────────────┤
│  模型展示 Marquee                        │
├─────────────────────────────────────────┤
│  Web4 架构演进图（交互式时间线）            │
├─────────────────────────────────────────┤
│  ROI 数据展示（数字动画 Counter）          │
├─────────────────────────────────────────┤
│  代码示例（对比展示 + 语法高亮）            │
├─────────────────────────────────────────┤
│  定价概览 / CTA Banner                   │
├─────────────────────────────────────────┤
│  Footer                                 │
└─────────────────────────────────────────┘
```

#### Navbar 组件规范

```tsx
// components/layout/Navbar.tsx
// 状态：默认透明，滚动超过 60px 后切换为毛玻璃
// 高度：72px
// 内容：Logo左 | 导航中 | 登录/Connect Wallet 右

const navLinks = [
  { label: 'Models',  href: '/dashboard/models' },
  { label: 'Docs',    href: '/docs' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog',    href: '/blog' },
]

// 毛玻璃样式
// backdrop-filter: blur(20px) saturate(1.8)
// background: rgba(9, 9, 15, 0.80)
// border-bottom: 1px solid rgba(251, 191, 36, 0.08)
```

#### Hero Section 规范

```tsx
// 背景：深色（#09090F）+ 金色光晕 radial-gradient + 噪点纹理
// 布局：垂直居中，内容左对齐（宽屏）或居中（移动端）

// 标题层级：
// Tag:  "AGI × Web4 Infrastructure"  — 小标签，金色描边
// H1:   "Bring AGI to Web4"          — 特大字，金色渐变文字
// Sub:  "一个 API Key，接入全球最优模型。  
//        Auto 路由 · x402 结算 · Agent 经济自治"
// CTA:  [开始构建 →]  [查看文档]

// 背景特效（CSS实现）：
// - 左上角：大型金色 radial glow，opacity 0.08
// - 右下角：蓝紫色 radial glow（Web3感），opacity 0.06  
// - 全局：SVG 噪点纹理 overlay，opacity 0.03
// - 网格线：细线网格，opacity 0.04

// 动画：
// - 标题：staggered fade-up（0ms, 150ms, 300ms）
// - CTA 按钮：scale 从 0.95 到 1
// - 背景光晕：缓慢漂浮 float 动画

// Hero 核心指标（标题下方）：
// [20+ 模型] · [60-80% 成本节省] · [99.9% 可用率] · [x402 链上结算]
```

**渐变文字实现：**
```css
.gradient-text {
  background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 40%, #FDE68A 60%, #F59E0B 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 3s linear infinite;
}
```

#### Feature Cards（3列）

```tsx
// 卡片设计：
// - 背景：rgba(17, 17, 24, 0.8) + 1px 金色描边（低透明度）
// - Hover：边框高亮 + 上移 4px + gold glow shadow
// - 顶部：图标（金色线框 SVG）

const features = [
  {
    icon: <RouteIcon />,
    tag: "Core Feature",
    title: "Auto 智能路由",
    desc: "声明任务类型，系统自动选择最优模型。平均降低 60–80% Token 成本，零人工维护。",
    metric: "↓ 70% 平均成本",
  },
  {
    icon: <PaymentIcon />,
    tag: "Web4 Native",
    title: "x402 原生结算",
    desc: "AI 请求即触发支付，流式微结算。Agent 自主发起支付，无需人工干预。",
    metric: "< 10s 链上到账",
  },
  {
    icon: <AgentIcon />,
    tag: "Future",
    title: "Agent 经济自治",
    desc: "为 AI Agent 分配钱包、预算与决策权。机器经济的第一层基础设施。",
    metric: "ERC-8183 支持",
  },
]
```

#### 模型展示 Marquee

```tsx
// 无限横向滚动展示支持的模型品牌
// 两行：第一行左→右，第二行右→左（错位美感）

const models = [
  { name: 'GPT-5',           provider: 'OpenAI',     logo: '/logos/openai.svg' },
  { name: 'Claude Opus 4',   provider: 'Anthropic',  logo: '/logos/anthropic.svg' },
  { name: 'Gemini Ultra',    provider: 'Google',     logo: '/logos/google.svg' },
  { name: 'Kimi K2',         provider: '月之暗面',    logo: '/logos/kimi.svg' },
  { name: 'DeepSeek V3',     provider: 'DeepSeek',   logo: '/logos/deepseek.svg' },
  { name: 'Qwen Max',        provider: '阿里云',      logo: '/logos/qwen.svg' },
  { name: 'Minimax',         provider: 'MiniMax',    logo: '/logos/minimax.svg' },
  { name: 'Llama 3',         provider: 'Meta',       logo: '/logos/meta.svg' },
]

// 样式：卡片 pill 形，dark bg，logo + 模型名，Hover 显示价格
```

#### Web4 演进时间线

```tsx
// 交互式水平时间线（鼠标 hover/点击激活）
// Web1 → Web2 → Web3 → Web4（高亮）

const eras = [
  { era: 'Web1', subject: '网站',    economy: '信息消费', payment: '无',          active: false },
  { era: 'Web2', subject: '平台',    economy: '注意力经济', payment: '法币/信用卡', active: false },
  { era: 'Web3', subject: '用户',    economy: '所有权经济', payment: '加密货币',    active: false },
  { era: 'Web4', subject: 'AGI Agent', economy: '机器经济', payment: 'x402·Token 原生', active: true },
]

// Web4 节点：金色高亮 + 脉冲环形动画
// 激活态：展开详细内容卡片，带 fade-in 动画
```

#### ROI 数字区（Counter Animation）

```tsx
// 3 个大数字，滚动进入视口时触发计数动画
const stats = [
  { value: 70,    suffix: '%',  label: '平均 Token 成本节省',   desc: '通过 Auto 路由优化' },
  { value: 99.9,  suffix: '%',  label: '平台可用率 SLA',        desc: '秒级故障自愈切换' },
  { value: 20,    suffix: '+',  label: '支持模型数量',           desc: '持续更新接入' },
]
// 数字字体：font-display，超大，金色渐变
// 使用 IntersectionObserver + requestAnimationFrame 实现平滑计数
```

#### 代码对比区（"只需改 2 行"）

```tsx
// 左侧：原始 OpenAI 配置（灰暗）
// 右侧：Tooken 配置（高亮金色变更行）
// Tab 切换：Python / Node.js / cURL

// 样式：代码块深色背景，JetBrains Mono，
//        变更行：金色左边框 + 金色背景微高亮
```

---

### 4.2 控制台 Dashboard（`/dashboard`）

#### 布局结构

```
┌──────────┬────────────────────────────────┐
│          │  顶部栏（账户信息 + 余额 + 通知）  │
│  侧边栏  ├────────────────────────────────┤
│  240px   │                                │
│          │  主内容区（随路由切换）            │
│          │                                │
└──────────┴────────────────────────────────┘
```

#### 侧边栏 Sidebar 规范

```tsx
// 固定左侧，宽度 240px（折叠态 64px）
// 背景：bg-surface（#111118）+ 右侧 1px border

const sidebarItems = [
  { icon: <LayoutDashboard />, label: 'Overview',  href: '/dashboard' },
  { icon: <Cpu />,             label: 'Models',    href: '/dashboard/models' },
  { icon: <Key />,             label: 'API Keys',  href: '/dashboard/api-keys' },
  { icon: <BarChart3 />,       label: 'Usage',     href: '/dashboard/usage' },
  { icon: <CreditCard />,      label: 'Billing',   href: '/dashboard/billing' },
  { icon: <Wallet />,          label: 'Wallet',    href: '/dashboard/wallet' },
  { icon: <BookOpen />,        label: 'Docs',      href: '/docs' },
  { icon: <Settings />,        label: 'Settings',  href: '/dashboard/settings' },
]

// 激活态：金色左边框（3px）+ 金色文字 + 背景微高亮
// 徽章：Usage 旁边显示本月用量百分比小圆圈
```

#### Dashboard Overview 内容

```tsx
// === 第一行：4 个核心指标卡（KPI Cards）===
const kpiCards = [
  {
    title: '本月消耗',
    value: '¥245.80',
    change: '+12.3%',
    trend: 'up',
    icon: <Coins />,
    sub: '较上月',
  },
  {
    title: 'Credits 余额',
    value: '128,400',
    sub: '≈ ¥898',
    icon: <Zap />,
    action: '充值',
  },
  {
    title: '调用次数',
    value: '34,821',
    change: '+8.1%',
    trend: 'up',
    icon: <Activity />,
    sub: '本月',
  },
  {
    title: '节省金额',
    value: '¥1,204',
    sub: 'vs 直接调用',
    icon: <TrendingDown />,
    highlight: true,  // 金色特殊高亮
  },
]

// KPI 卡设计：
// - 背景：bg-surface + 1px border-subtle
// - Hover：border 变亮 + shadow-gold-sm
// - 数字：font-display，text-2xl，text-primary
// - 趋势箭头：绿色（+）红色（-）

// === 第二行：折线图（用量趋势）+ 模型分布饼图 ===
// 折线图：Recharts LineChart，自定义金色线条，深色背景
// 饼图：Recharts PieChart，金/橙/蓝/绿配色

// === 第三行：最近 API 调用记录（Table）===
// 列：时间 | 模型 | 路由模型 | Tokens | 成本 | 状态
// 状态：success(绿) / error(红) / cached(蓝)
```

---

### 4.3 模型市场（`/dashboard/models`）

```tsx
// === 顶部：搜索框 + 分类过滤 ===
// 分类 Tab：全部 | 国际顶级 | 国产优选 | 开源部署 | Auto 路由

// === 模型卡片网格（3列）===
interface ModelCard {
  id: string;           // 'claude-opus-4'
  name: string;         // 'Claude Opus 4'
  provider: string;     // 'Anthropic'
  logo: string;         // logo URL
  context: string;      // '200K'
  creditsPer1k: number; // 15
  features: string[];   // ['代码最强', '长文', '工具调用']
  speed: 'fast' | 'medium' | 'slow';
  rating: number;       // 能力评分 0-5
  tags: string[];       // ['推荐', '热门']
}

// 卡片设计：
// - 顶部：Provider logo + Model ID（mono字体）
// - 中部：功能标签 chips（小圆角pill）
// - 能力雷达图（6维，迷你版）或星级展示
// - 底部：Credits价格 + "立即使用" 按钮

// Auto 路由卡片（置顶）：
// - 特殊设计：金色边框 + "RECOMMENDED" 标签
// - 展示 auto / auto-fast / auto-cheap / auto-quality 4个变体
// - 中间展示路由流程动画（简化版）

// 悬浮详情：hover 展示能力对比矩阵（5个维度星级）
```

---

### 4.4 API Keys 管理（`/dashboard/api-keys`）

```tsx
// === 顶部操作栏 ===
// [+ 创建新 Key]  搜索框  [筛选：状态/日期]

// === Key 列表（Table 样式）===
interface APIKey {
  id: string;
  name: string;        // 'production-agent-001'
  keyPreview: string;  // 'sk-...abc4'（只显示首尾）
  monthlyLimit: number | null;  // Credits 月上限
  monthlyUsed: number;
  createdAt: string;
  lastUsed: string;
  status: 'active' | 'disabled';
}

// 表格列：名称 | Key（脱敏+复制按钮）| 月用量进度条 | 月上限 | 最后使用 | 状态 | 操作

// 进度条：used/limit，超过 80% 显示橙色警告，超过 100% 红色

// === 创建 Key 弹窗（Modal）===
// 字段：
// - Key 名称（必填，placeholder: agent-001）
// - 月消耗上限（可选，Credits，0=无上限）
// - 允许访问的模型（多选，全部/指定）
// - IP 白名单（可选）
// 创建成功后展示完整 Key（仅一次），带"一键复制"按钮
// 注意文案：⚠️ 请立即保存，此后将不再显示完整 Key

// Key 卡片设计：
// - mono 字体展示 Key
// - 复制成功：短暂 checkmark 动画
// - 危险区：删除需二次确认弹窗
```

---

### 4.5 用量监控（`/dashboard/usage`）

#### 顶部筛选

```tsx
// 时间范围：今日 / 7天 / 30天 / 自定义（日期选择器）
// 分组维度：按模型 / 按 Key / 按日期
```

#### 图表区域

```tsx
// === 图表1：折线图——每日消耗趋势 ===
// X轴：日期，Y轴：Credits 消耗
// 多条线：总量、各Top模型分线
// 样式：金色主线 + 渐变填充，其他模型淡色线

// === 图表2：柱状图——模型调用分布 ===
// 各模型调用次数对比
// 金/橙/蓝/绿色系，渐变填充

// === 图表3：ROI 面板 ===
// 左：支出 Credits 数量（实际花费）
// 右：节省金额（对比无路由的成本）
// 大字展示 ROI 倍数，金色

// === 明细表格 ===
// 列：时间 | Key名称 | 模型 | 路由模型 | 输入Token | 输出Token | 成本 | 节省
// 支持：导出 CSV
// 状态标签：success / error / cache_hit（缓存命中）

// === 实时监控小组件（右侧面板）===
// 最近 5 分钟 QPS 迷你折线图
// 当前活跃 Key 数量
// 当前错误率
```

---

### 4.6 支付与充值（`/dashboard/billing`）

#### 整体布局

```tsx
// 左列（2/3宽）：充值记录 + 消费记录
// 右列（1/3宽）：余额卡片 + 充值入口 + 套餐展示
```

#### 余额卡片

```tsx
// 设计：大号金色渐变数字
// - Credits 余额：128,400
// - 折算美元：≈ $128.40
// - 折算人民币：≈ ¥918
// [立即充值] 金色主按钮   [查看套餐] 描边次级按钮

// 充值方式选择（Tab）：
// - 链上充值（Web3）：MetaMask / OKX Wallet
//   - 网络选择：Base（推荐）/ Ethereum / Solana / BNB Chain
//   - 显示平台收款地址（带 QR 码）
//   - 状态跟踪：等待确认 → 确认中（n/required）→ 到账
// - 法币充值：支付宝 / 微信 / Stripe / 银行转账
```

#### 套餐展示

```tsx
const plans = [
  { name: '入门版',  price: '¥199/月',  credits: '50,000',  discount: '9折', color: 'default' },
  { name: '专业版',  price: '¥999/月',  credits: '300,000', discount: '8折', color: 'gold', popular: true },
  { name: '企业版',  price: '¥4,999/月', credits: '2,000,000', discount: '7折', color: 'default' },
  { name: '旗舰版',  price: '联系商务',  credits: '无上限',  discount: '6折起', color: 'default' },
]

// 推荐套餐（专业版）：金色边框 + "Most Popular" 标签
// 价格展示：大字 + 小字注释
// 功能列表：✓ 子账号 ✓ 用量监控 ✓ 合规发票 等
```

#### 账单记录表格

```tsx
// 列：时间 | 类型（充值/消耗）| 金额 | Credits变化 | 状态 | 详情
// 类型图标：充值=绿色上箭头，消耗=橙色下箭头
// 链上充值：显示 TxHash（可点击跳转区块浏览器）
```

---

### 4.7 Agent 钱包（`/dashboard/wallet`）

```tsx
// === 钱包概览 ===
// 显示关联的钱包地址（ENS 优先）
// 余额：USDC / USDT 余额（多链）
// 链选择：Ethereum / Base / Solana 切换

// === Agent 预算管理 ===
// 为每个 API Key（Agent）设置独立预算
interface AgentBudget {
  keyName: string;
  walletAddress: string;
  monthlyLimit: number;   // Credits
  currentUsed: number;
  autoRefill: boolean;    // 余额低于阈值时自动链上充值
  refillThreshold: number;
  refillAmount: number;
}

// 预算卡片：环形进度图（已用/上限）+ 自动补充开关

// === x402 支付历史 ===
// 链上交易记录：TxHash | 金额 | 时间 | 用途（对应的 API 调用）

// === 连接新钱包 ===
// 支持的钱包列表卡片（MetaMask / OKX / Phantom / WalletConnect）
// 连接态：显示地址 + 断开按钮
// 连接流程说明：签名验证不消耗 Gas
```

---

### 4.8 文档中心（`/docs`）

```tsx
// 布局：
// 左侧固定导航（240px）+ 右侧内容（最大宽度 760px）+ 右侧文章大纲（200px）

// 文档导航树：
const docTree = [
  {
    section: '快速上手',
    items: ['5分钟跑通', '注册与登录', 'Credits充值', 'Claude Code接入'],
  },
  {
    section: '模型与路由',
    items: ['模型列表', 'Auto智能路由', '故障自愈', 'ROI监测'],
  },
  {
    section: '支付与结算',
    items: ['Credits体系', '链上支付', 'x402协议', '企业账单'],
  },
  {
    section: 'Agent经济',
    items: ['Agent钱包', '预算管理', 'A2A协议', 'Web4愿景'],
  },
  {
    section: 'API参考',
    items: ['认证', 'Chat Completions', 'Messages', '路由API', '错误码'],
  },
]

// 代码块样式：
// - 主题：深色（与整体一致）
// - 语言标签：右上角
// - 一键复制按钮
// - 行号显示
// - 高亮重要行（变更行金色高亮）

// 快速导航：右侧实时高亮当前阅读位置（Intersection Observer）

// 内容区：
// - Markdown 渲染
// - 表格：金色表头
// - 警告块：⚠️ 金色背景 / ℹ️ 蓝色背景
// - API 参数表格：可折叠
```

---

## 5. 组件库规范

### 5.1 Button 组件

```tsx
// variants: primary | secondary | ghost | danger | link
// sizes: sm | md | lg

// primary（主按钮）：
// - 背景：var(--gradient-button)
// - 文字：深色（#1A1000）
// - Hover：brightness(1.1) + shadow-gold-sm
// - Active：scale(0.97)
// - Loading：金色 spinner

// secondary（次级）：
// - 背景：transparent
// - 边框：1px solid var(--border-strong)
// - 文字：gold-400
// - Hover：bg-overlay + 边框亮度提升

// 示例：
<Button variant="primary" size="md" icon={<ArrowRight />} iconPosition="right">
  开始构建
</Button>
```

### 5.2 Card 组件

```tsx
// variants: default | gold | glass | flat

// default：
// bg-surface + border-subtle + shadow-card
// Hover（如果 hoverable）：translateY(-2px) + border-default

// gold（强调卡片）：
// 额外金色渐变左边框（4px）或顶部边框

// glass（毛玻璃）：
// backdrop-filter: blur(20px)
// background: rgba(17,17,24,0.7)
// border: 1px solid rgba(251,191,36,0.15)
```

### 5.3 Badge / Tag 组件

```tsx
// variants: gold | success | warning | error | info | neutral | outline

// gold: bg-primary-500/15 text-gold border border-gold-500/30
// 用于：RECOMMENDED、POPULAR、Auto路由等标签
```

### 5.4 Input 组件

```tsx
// 默认态：border-subtle，focus 时 border-gold-400 + gold glow ring
// 错误态：border-error + error 文字
// 带前缀：图标 / 下拉选择（如模型选择器）
// 带后缀：单位文字（Credits）/ 复制按钮
```

### 5.5 Modal / Dialog

```tsx
// 基于 Radix UI Dialog 封装
// 背景：backdrop-blur(8px) + rgba(0,0,0,0.7)
// 弹窗：bg-elevated + border-default + shadow-elevated
// 动画：scale from 0.95 + fade，cubic-bezier(0.16,1,0.3,1)
// 关闭：ESC / 点击外部 / X 按钮
```

### 5.6 Table 组件

```tsx
// thead：bg-overlay，文字 text-muted，text-caption 样式
// tr hover：bg-overlay/50
// 固定首列（sticky）用于宽表格
// 空状态：居中插图 + 描述文字 + CTA
// 加载态：skeleton 骨架屏（金色 shimmer 动画）
```

### 5.7 Toast / 通知组件

```tsx
// 位置：右上角，最大 3 条叠加
// 类型：success（绿）/ error（红）/ warning（金）/ info（蓝）
// 样式：bg-elevated + 左色彩边框 + icon + 文字 + 关闭
// 进入：从右侧滑入，退出：向右淡出
// 自动消失：3秒（error 6秒）
```

### 5.8 CodeBlock 组件

```tsx
// 使用 Shiki 服务端渲染语法高亮
// 主题：'github-dark' 基础上自定义 token colors
// 功能：
// - 语言切换 Tab（Python / Node.js / cURL）
// - 一键复制（图标按钮，成功后变为 ✓）
// - 可选行号
// - 高亮特定行（className: 金色左边框 + 金色背景）
```

### 5.9 ProgressBar 组件

```tsx
// 线性进度条（用于 Credits 使用量）
// - 0~60%：金色
// - 60~80%：橙色
// - 80~100%：红色
// - 动画：初始从 0 增长，600ms ease-out
```

### 5.10 WalletConnect 按钮

```tsx
// 未连接：[🔗 Connect Wallet] — 描边按钮，图标动画
// 连接中：spinner
// 已连接：[○ 0x1a2b...cd4e ▾] — 截断地址 + 下拉菜单
// 下拉：复制地址 / 查看钱包 / 断开连接
```

---

## 6. 路由结构

```typescript
// app/layout.tsx
// - 全局字体注入
// - Providers（QueryClient、Web3Provider、Zustand）
// - Toast 容器

// app/(marketing)/layout.tsx
// - Navbar（透明）
// - Footer

// app/(marketing)/page.tsx → Landing Page

// app/(dashboard)/layout.tsx
// - 要求登录（middleware 鉴权）
// - Sidebar + 顶部栏布局

// app/(dashboard)/dashboard/page.tsx → Overview
// app/(dashboard)/dashboard/models/page.tsx
// app/(dashboard)/dashboard/api-keys/page.tsx
// app/(dashboard)/dashboard/usage/page.tsx
// app/(dashboard)/dashboard/billing/page.tsx
// app/(dashboard)/dashboard/wallet/page.tsx
// app/(dashboard)/dashboard/settings/page.tsx

// app/docs/layout.tsx → 文档布局（侧边导航 + 大纲）
// app/docs/page.tsx → 文档首页
// app/docs/[...slug]/page.tsx → 文档详情

// app/login/page.tsx → 登录页
// app/pricing/page.tsx → 定价页
```

---

## 7. 状态管理

### 全局 Store（Zustand）

```typescript
// store/useAuthStore.ts
interface AuthStore {
  user: User | null;
  walletAddress: string | null;
  isConnected: boolean;
  credits: number;
  login: (user: User) => void;
  logout: () => void;
  setWallet: (address: string) => void;
  updateCredits: (amount: number) => void;
}

// store/useUIStore.ts
interface UIStore {
  sidebarCollapsed: boolean;
  theme: 'dark'; // 暂时只支持深色
  toggleSidebar: () => void;
}

// store/useModelsStore.ts
interface ModelsStore {
  models: Model[];
  selectedCategory: string;
  searchQuery: string;
  setCategory: (cat: string) => void;
  setSearch: (q: string) => void;
}
```

### 数据请求（TanStack Query）

```typescript
// hooks/useUsageStats.ts
export const useUsageStats = (range: '7d' | '30d') => {
  return useQuery({
    queryKey: ['usage', range],
    queryFn: () => api.getUsageStats(range),
    refetchInterval: 60_000, // 每分钟刷新
  })
}

// hooks/useApiKeys.ts
// hooks/useCreditsBalance.ts — refetchInterval: 30_000
// hooks/useModels.ts — staleTime: 5 * 60 * 1000
// hooks/useTransactions.ts
```

---

## 8. 接口对接规范

### 基础配置

```typescript
// lib/api/client.ts
import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.tooken.ai',
  timeout: 30_000,
})

// 请求拦截器：注入 Bearer Token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('tooken_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// 响应拦截器：统一错误处理
apiClient.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const status = err.response?.status
    if (status === 401) { /* 跳转登录 */ }
    if (status === 402) { /* 余额不足 Toast */ }
    return Promise.reject(err)
  }
)
```

### API 端点列表

```typescript
// 认证
POST   /auth/wallet-login     // Web3 钱包登录（签名验证）
POST   /auth/email-login      // 邮箱登录
POST   /auth/google           // Google OAuth

// 用户
GET    /user/profile
GET    /user/credits          // 余额查询
POST   /user/credits/recharge // 充值

// API Keys
GET    /api-keys
POST   /api-keys
DELETE /api-keys/:id
PATCH  /api-keys/:id          // 更新限额/状态

// 用量
GET    /usage/stats?range=7d&groupBy=model
GET    /usage/list?page=1&limit=20
GET    /usage/export?format=csv

// 模型
GET    /models                // 全部模型列表
GET    /models/:id            // 模型详情
POST   /v1/route              // 路由查询

// 支付
GET    /billing/transactions
POST   /billing/recharge/crypto
POST   /billing/recharge/fiat
GET    /billing/invoices

// Agent 钱包
GET    /wallet/balances
GET    /wallet/transactions
POST   /wallet/agent-budget
```

---

## 9. 响应式与国际化

### 断点规范（Tailwind）

```
sm:   640px   手机横屏
md:   768px   平板
lg:   1024px  小屏笔记本
xl:   1280px  标准桌面
2xl:  1536px  宽屏
```

### 响应式原则

- 移动端：侧边栏收起为底部导航栏（5个核心入口）
- 平板：侧边栏折叠（仅图标），内容区全宽
- 桌面：标准 Sidebar + 内容区
- Landing Page：Hero 文字 `clamp()` 自适应，网格从 3列 → 2列 → 1列

### 国际化（next-intl）

```
/messages/
  zh.json   // 中文
  en.json   // 英文（默认）

// 路由：/en/... / /zh/...
// 语言切换：Navbar 右上角地球图标 + 下拉
// 优先级：URL参数 > 浏览器语言 > 默认英文
```

---

## 10. 动效规范

### 核心动效原则

- **目的性**：动效服务于信息传递，不为炫技
- **速度**：快进慢出，符合物理直觉
- **克制**：页面同一时间最多 2 处动画在播放

### 标准时间曲线

```css
--ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);   /* 弹窗、模态框 */
--ease-in-out:    cubic-bezier(0.4, 0, 0.2, 1);     /* 过渡、展开 */
--ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1); /* 按钮、卡片 Hover */
```

### 标准动画时长

| 类型 | 时长 |
|------|------|
| 微交互（按钮Hover） | 120ms |
| 组件展示/隐藏 | 200ms |
| 弹窗打开 | 300ms |
| 页面过渡 | 400ms |
| 复杂路径动画 | 600-800ms |
| Counter 计数 | 1500ms |

### 页面加载动画（首页 Hero）

```tsx
// 使用 Framer Motion stagger
const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

// 顺序：Tag → H1 → Sub → CTA → 指标行
```

### Scroll 触发动画

```tsx
// 使用 Framer Motion whileInView
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
>
```

### 金色 Shimmer 动画（加载态）

```css
.skeleton {
  background: linear-gradient(
    90deg,
    rgba(251,191,36,0.05) 0%,
    rgba(251,191,36,0.12) 50%,
    rgba(251,191,36,0.05) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.8s linear infinite;
}
```

---

## 附录 A：目录结构

```
src/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx              # Landing Page
│   │   ├── pricing/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   ├── page.tsx          # Overview
│   │   │   ├── models/page.tsx
│   │   │   ├── api-keys/page.tsx
│   │   │   ├── usage/page.tsx
│   │   │   ├── billing/page.tsx
│   │   │   ├── wallet/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── layout.tsx
│   ├── docs/
│   │   ├── page.tsx
│   │   ├── [...slug]/page.tsx
│   │   └── layout.tsx
│   ├── login/page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── DashboardHeader.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Table.tsx
│   │   ├── Toast.tsx
│   │   ├── CodeBlock.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Skeleton.tsx
│   ├── charts/
│   │   ├── LineChart.tsx
│   │   ├── BarChart.tsx
│   │   ├── PieChart.tsx
│   │   └── MiniSparkline.tsx
│   ├── landing/
│   │   ├── HeroSection.tsx
│   │   ├── FeatureCards.tsx
│   │   ├── ModelMarquee.tsx
│   │   ├── Web4Timeline.tsx
│   │   ├── StatsCounter.tsx
│   │   └── CodeCompare.tsx
│   ├── dashboard/
│   │   ├── KPICard.tsx
│   │   ├── RecentCalls.tsx
│   │   └── UsageSummary.tsx
│   ├── wallet/
│   │   ├── WalletConnectButton.tsx
│   │   ├── AgentBudgetCard.tsx
│   │   └── ChainSelector.tsx
│   └── models/
│       ├── ModelCard.tsx
│       └── ModelFilter.tsx
├── hooks/
│   ├── useUsageStats.ts
│   ├── useApiKeys.ts
│   ├── useCreditsBalance.ts
│   └── useScrolled.ts
├── store/
│   ├── useAuthStore.ts
│   ├── useUIStore.ts
│   └── useModelsStore.ts
├── lib/
│   ├── api/
│   │   └── client.ts
│   └── utils/
│       ├── cn.ts               # clsx + twMerge
│       ├── format.ts           # 数字/日期格式化
│       └── clipboard.ts
├── types/
│   ├── api.ts
│   ├── models.ts
│   └── wallet.ts
└── messages/
    ├── en.json
    └── zh.json
```

---

## 附录 B：关键视觉参考描述

| 页面 | 参考对象 | 取其精华 |
|------|----------|----------|
| Landing Hero | Linear.app | 大气排版、简洁文案、精准动效 |
| Feature Cards | Stripe | 功能说明精准、卡片质感 |
| Dashboard | Vercel Analytics | 数据密度、深色系、干净 |
| Docs | Anthropic Docs | 结构清晰、代码展示 |
| Models | Replicate | 模型卡片展示方式 |
| Wallet | Rainbow Wallet | Web3 钱包 UI 惯例 |
| 代码对比 | Cursor 官网 | 代码差异高亮展示 |

---

## 附录 C：性能指标目标

| 指标 | 目标值 |
|------|--------|
| LCP（首屏加载） | < 2.0s |
| FID（交互延迟） | < 100ms |
| CLS（布局偏移） | < 0.1 |
| 首页 JS Bundle | < 150KB gzipped |
| Dashboard 初始 | < 200KB gzipped |

---

*文档版本：v1.0 · 生成日期：2026-04-29 · 适用于 Cursor 开发*
