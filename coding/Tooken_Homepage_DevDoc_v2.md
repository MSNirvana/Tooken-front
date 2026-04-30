# Tooken 官网首页 前端开发文档 v2.0
> 仅限官网首页（`/`）· 亮色科技风 · 自然动效 · Cursor 直接开发

---

## 目录

1. [设计理念与风格定调](#1-设计理念与风格定调)
2. [技术栈](#2-技术栈)
3. [设计系统](#3-设计系统)
4. [页面整体结构](#4-页面整体结构)
5. [各 Section 详细规范](#5-各-section-详细规范)
   - 5.1 Navbar
   - 5.2 Hero Section
   - 5.3 Ticker Bar（数据流动条）
   - 5.4 核心能力 Features
   - 5.5 模型展示 Models Marquee
   - 5.6 Auto 路由演示
   - 5.7 数据成就 Stats
   - 5.8 用户评价 Testimonials
   - 5.9 定价 Pricing
   - 5.10 CTA Banner
   - 5.11 Footer
6. [动效总规范](#6-动效总规范)
7. [组件规范](#7-组件规范)
8. [文件结构](#8-文件结构)

---

## 1. 设计理念与风格定调

### 核心关键词

**亮 · 净 · 锋 · 动**

- **亮**：主色调为米白/暖白背景，不用黑压压的深色系。像 Linear、b.ai、ZenMux 一样——干净、明亮、有空气感
- **净**：大量留白，信息密度受控，每个 Section 只说一件事
- **锋**：科技感来自精准的排版、锋利的线条、克制的对比，而非霓虹堆砌
- **动**：动画如呼吸一样自然——缓入缓出、物理感、不打断阅读

### Logo 解读 → 视觉语言提取

Tooken Logo 是一只巨嘴鸟，特征：
- **粗黑线条**：外圆 + 鸟身轮廓，力量感、简洁、辨识度高 → 排版用粗体、大字重
- **橙黄渐变鸟嘴**：饱和度高、有光泽感，从橙金（`#F97316`）到亮黄（`#FBBF24`）→ 这是品牌主色
- **螺旋纹身感**：鸟身下方螺旋线条 → 流动感、弧线元素、圆润的卡片
- **黑白 + 橙**：极简配色，不需要五颜六色 → 全站沿用这个三色系

### 色彩策略：**亮底 · 橙金点睛**

背景是暖白/浅灰，黑色文字，橙金色作为唯一强调色。
参考：b.ai 的白底简洁 + ZenMux 的现代科技感

**一句话设计哲学**：像苹果网站一样克制，像 Stripe 一样精工，用橙金色点亮每一个关键时刻。

---

## 2. 技术栈

```
框架：        Next.js 15 (App Router)
样式：        Tailwind CSS v4
动效：        Framer Motion 11
字体：        Google Fonts（见下方规范）
图标：        Lucide React
代码高亮：    Shiki（Hero 代码展示用）
轮播/Marquee: 纯 CSS animation（无需库）
```

### 安装

```bash
npx create-next-app@latest tooken-web --typescript --tailwind --app --src-dir
cd tooken-web
npm install framer-motion lucide-react shiki clsx tailwind-merge
```

### globals.css 字体引入

```css
@import url('https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;700;800;900&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
```

---

## 3. 设计系统

### 3.1 色彩（CSS Variables）

```css
/* src/app/globals.css */
:root {
  /* ===== 背景层 ===== */
  --bg-page:       #FAFAF8;   /* 主背景：暖白，不刺眼 */
  --bg-surface:    #FFFFFF;   /* 卡片背景 */
  --bg-subtle:     #F4F3EF;   /* 次级区域背景（交替 Section 用）*/
  --bg-dark:       #0F0F0D;   /* 深色 Section（CTA Banner）*/

  /* ===== 橙金主色系 ===== */
  --color-amber-50:  #FFFBEB;
  --color-amber-100: #FEF3C7;
  --color-amber-200: #FDE68A;
  --color-amber-300: #FCD34D;
  --color-amber-400: #FBBF24;  /* 亮黄 */
  --color-amber-500: #F59E0B;  /* 标准金 */
  --color-amber-600: #D97706;  /* 深金 */

  /* Logo 鸟嘴渐变复现 */
  --gradient-brand: linear-gradient(135deg, #F97316 0%, #FBBF24 60%, #FDE68A 100%);
  --gradient-brand-subtle: linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%);

  /* ===== 文字 ===== */
  --text-primary:   #0F0F0D;   /* 近黑，主文字 */
  --text-secondary: #6B7280;   /* 灰色，次级文字 */
  --text-muted:     #9CA3AF;   /* 更浅，辅助信息 */
  --text-brand:     #F97316;   /* 橙色强调文字 */

  /* ===== 边框 ===== */
  --border-default: #E5E5E0;   /* 默认描边 */
  --border-subtle:  #EFEFEB;   /* 轻描边 */
  --border-brand:   rgba(249, 115, 22, 0.3);  /* 橙色描边 */

  /* ===== 阴影 ===== */
  --shadow-sm:    0 1px 3px rgba(15,15,13,0.06), 0 1px 2px rgba(15,15,13,0.04);
  --shadow-md:    0 4px 16px rgba(15,15,13,0.08), 0 2px 4px rgba(15,15,13,0.04);
  --shadow-lg:    0 12px 40px rgba(15,15,13,0.10), 0 4px 8px rgba(15,15,13,0.04);
  --shadow-brand: 0 8px 32px rgba(249, 115, 22, 0.20);

  /* ===== 圆角 ===== */
  --radius-sm:   8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-full: 9999px;
}
```

### 3.2 字体规范

```css
:root {
  /* 展示字体：Cabinet Grotesk — 几何感、圆润有力，比 Inter 更有个性 */
  --font-display: 'Cabinet Grotesk', sans-serif;

  /* 正文字体：Instrument Sans — 优雅可读，国际化 */
  --font-body: 'Instrument Sans', sans-serif;

  /* 代码字体 */
  --font-mono: 'JetBrains Mono', monospace;
}

/* 字号体系 */
/* Hero 主标题 */  clamp(48px, 6.5vw, 88px)  font-weight: 900  line-height: 1.0  letter-spacing: -0.04em
/* H1 */          clamp(36px, 4.5vw, 60px)   font-weight: 800  line-height: 1.1  letter-spacing: -0.03em
/* H2 */          clamp(28px, 3vw, 44px)      font-weight: 700  line-height: 1.2  letter-spacing: -0.025em
/* H3 */          24px                         font-weight: 600  line-height: 1.3
/* Body Large */  18px                         font-weight: 400  line-height: 1.65
/* Body */        16px                         font-weight: 400  line-height: 1.6
/* Small */       14px                         font-weight: 500  line-height: 1.5
/* Caption */     12px                         font-weight: 600  letter-spacing: 0.06em  text-transform: uppercase
/* Mono */        13px                         font-weight: 400
```

### 3.3 Tailwind 扩展配置

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        brand: {
          orange: '#F97316',
          gold:   '#FBBF24',
        },
        page:    '#FAFAF8',
        surface: '#FFFFFF',
        subtle:  '#F4F3EF',
        ink:     '#0F0F0D',
      },
      fontFamily: {
        display: ['Cabinet Grotesk', 'sans-serif'],
        body:    ['Instrument Sans', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'marquee':      'marquee 40s linear infinite',
        'marquee-rev':  'marquee-rev 40s linear infinite',
        'float':        'float 8s ease-in-out infinite',
        'float-delay':  'float 8s ease-in-out infinite 2s',
        'pulse-soft':   'pulse-soft 3s ease-in-out infinite',
        'gradient-x':   'gradient-x 6s ease infinite',
        'fade-up':      'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-10px) rotate(1deg)' },
          '66%':      { transform: 'translateY(-5px) rotate(-0.5deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1', transform: 'scale(1.02)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
} satisfies Config
```

---

## 4. 页面整体结构

```
官网首页 /
├── <Navbar />                     固定顶部导航
├── <HeroSection />                全屏首屏
├── <TickerBar />                  数据流动条（无缝滚动）
├── <FeaturesSection />            三大核心能力
├── <ModelsMarquee />              模型品牌展示
├── <RoutingDemo />                Auto 路由可视化演示
├── <StatsSection />               成就数字
├── <TestimonialsSection />        用户评价
├── <PricingSection />             定价
├── <CtaBanner />                  行动号召（深色背景）
└── <Footer />                     页脚
```

**Section 背景节奏**（制造层次感而非单调）：

```
Navbar:          透明 → 滚动后白色毛玻璃
Hero:            #FAFAF8（暖白）
Ticker:          #0F0F0D（深色条）
Features:        #FFFFFF
Models Marquee:  #F4F3EF（浅灰暖）
Routing Demo:    #FFFFFF
Stats:           brand gradient（橙金渐变）
Testimonials:    #FAFAF8
Pricing:         #F4F3EF
CTA Banner:      #0F0F0D（深色）
Footer:          #0F0F0D
```

---

## 5. 各 Section 详细规范

---

### 5.1 Navbar

**高度**：64px（桌面）/ 56px（移动端）

**布局**：`Logo左 | 导航链接中 | 按钮右`

**Logo 使用**：左侧 Logo 图片（32px 高）+ 文字 "Tooken"（Cabinet Grotesk，700，20px，ink色）

**导航链接**（桌面）：
```
Models    Pricing    Docs    Blog
```
字体：Instrument Sans，15px，500，text-secondary，hover 变 ink色，transition 200ms

**右侧按钮区**：
```
[Log in]  （Ghost 样式，无边框，text-ink）
[Get Started →]  （橙金渐变主按钮）
```

**滚动态变化**：
```css
/* 初始：完全透明 */
/* 滚动 > 60px 后：*/
background: rgba(250, 250, 248, 0.85);
backdrop-filter: blur(16px) saturate(1.5);
border-bottom: 1px solid var(--border-subtle);
/* transition: all 300ms ease */
```

**移动端**：汉堡菜单，点击弹出全屏遮罩导航（从上往下 slide-down）

---

### 5.2 Hero Section

**容器**：`min-height: 100svh`，Flex 列居中，内容区最大宽度 `max-w-5xl`，水平居中

#### 5.2.1 背景设计

```css
/* 主背景：暖白 */
background-color: #FAFAF8;

/* 背景装饰层（绝对定位，pointer-events: none）*/

/* 装饰1：左上角橙色光晕 */
.bg-glow-left {
  position: absolute;
  top: -100px;
  left: -150px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(60px);
  animation: float 10s ease-in-out infinite;
}

/* 装饰2：右侧金色光晕 */
.bg-glow-right {
  position: absolute;
  top: 100px;
  right: -100px;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(80px);
  animation: float 12s ease-in-out infinite 3s;
}

/* 装饰3：细网格线（极淡，增加科技感）*/
.bg-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(15,15,13,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15,15,13,0.03) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
}
```

#### 5.2.2 内容层（垂直居中）

**排列顺序**（从上到下，带 stagger 动画）：

```
① 顶部 Tag Pill（动画延迟 0ms）
② 主标题 H1（动画延迟 100ms）
③ 副标题（动画延迟 200ms）
④ CTA 按钮组（动画延迟 320ms）
⑤ 信任徽章（动画延迟 440ms）
⑥ Hero 产品截图/演示卡片（动画延迟 560ms）
```

**① Tag Pill**：
```tsx
// 小胶囊标签，居中
// 样式：橙色细边框 + 橙色文字 + 极淡橙色背景
// 内容：✦ AGI × Web4 Infrastructure  →
<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
     border border-orange-200 bg-orange-50 text-orange-600 text-sm font-medium">
  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse-soft" />
  AGI × Web4 Infrastructure
  <span className="opacity-60">→</span>
</div>
```

**② 主标题**：
```tsx
// 布局：居中，两行
// 第一行：纯黑文字
// 第二行/关键词：橙金渐变文字
<h1 className="font-display font-black text-center tracking-tight leading-none">
  <span className="text-ink">One API for</span>
  <br />
  <span 
    style={{ 
      background: 'linear-gradient(135deg, #F97316 0%, #FBBF24 60%, #F59E0B 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundSize: '200% auto',
      animation: 'gradient-x 5s ease infinite',
    }}
  >
    Every AI Model.
  </span>
</h1>

// 尺寸：clamp(52px, 7vw, 96px)
// 字重：900（Cabinet Grotesk Black）
// letter-spacing：-0.04em
```

**③ 副标题**：
```tsx
<p className="text-center font-body text-[18px] text-secondary leading-relaxed max-w-[560px] mx-auto">
  智能路由全球顶级模型，节省 60–80% Token 成本。
  <br />
  x402 原生结算，让 AI Agent 自主参与 Web4 经济。
</p>
// 可以中英文各一版，根据用户语言切换
```

**④ CTA 按钮组**：
```tsx
<div className="flex items-center gap-3 justify-center flex-wrap">
  {/* 主按钮 */}
  <button className="
    inline-flex items-center gap-2 
    px-7 py-3.5 rounded-full 
    font-display font-700 text-[16px] text-white
    shadow-[0_8px_32px_rgba(249,115,22,0.30)]
    transition-all duration-200 ease-out
    hover:shadow-[0_12px_40px_rgba(249,115,22,0.40)] hover:-translate-y-0.5 hover:scale-[1.02]
    active:scale-[0.98]
  "
  style={{ background: 'linear-gradient(135deg, #F97316 0%, #FBBF24 100%)' }}
  >
    免费开始 <ArrowRight size={16} />
  </button>
  
  {/* 次按钮 */}
  <button className="
    inline-flex items-center gap-2
    px-7 py-3.5 rounded-full
    font-body font-500 text-[16px] text-ink
    border border-[--border-default] bg-white
    shadow-[--shadow-sm]
    transition-all duration-200 ease-out
    hover:border-[--border-brand] hover:shadow-[--shadow-md] hover:-translate-y-0.5
  ">
    查看文档 <BookOpen size={15} className="text-secondary" />
  </button>
</div>
```

**⑤ 信任徽章**：
```tsx
// 一排小标签，居中
// 内容：已服务 2,000+ 开发者  ·  ★★★★★ 4.9/5  ·  SOC2 认证（路线图）
<div className="flex items-center gap-4 justify-center text-[13px] text-muted font-body">
  <span className="flex items-center gap-1.5">
    <Users size={13} className="text-brand-orange" />
    2,000+ 开发者信赖
  </span>
  <span className="text-border-default">·</span>
  <span className="flex items-center gap-1">
    {[...Array(5)].map(i => <Star key={i} size={11} fill="#FBBF24" className="text-amber-400" />)}
    4.9 / 5
  </span>
  <span className="text-border-default">·</span>
  <span>20+ 全球模型</span>
</div>
```

**⑥ Hero 产品演示卡片**：
```tsx
// 这是页面最重要的视觉亮点
// 设计：一个"浮动的代码/路由演示卡片"，带轻微 3D 透视倾斜
// 尺寸：最大宽度 860px，居中

// 卡片外层：白色背景 + 精细阴影 + 微圆角
// 内部分为 左右 两区：
//   左：代码编辑器（Shiki高亮，3行关键代码）
//   右：路由结果可视化（实时展示选中模型 + 节省成本）

// ---- 卡片整体 ----
// background: #FFFFFF
// border: 1px solid #E5E5E0
// border-radius: 20px
// box-shadow: 0 24px 80px rgba(15,15,13,0.12), 0 4px 16px rgba(15,15,13,0.06)
// 轻微 CSS perspective tilt（仅桌面）：
//   transform: perspective(1200px) rotateX(3deg)
//   transition: transform 600ms ease（鼠标悬停时还原到 rotateX(0)）

// ---- 卡片顶栏（类 macOS 窗口）----
// height: 40px
// background: #F4F3EF
// border-bottom: 1px solid #E5E5E0
// 左侧：三个圆点（红#FF5F57 黄#FEBC2E 绿#28C840），直径 12px
// 中间：地址栏样式文字 "api.tooken.ai/v1/chat/completions"（mono字体，12px，text-muted）

// ---- 左侧：代码区 ----
// 背景: #FAFAF8
// padding: 24px
// 字体: JetBrains Mono, 13px
// 展示内容（Shiki 高亮，github-light 主题）：
const codeSnippet = `
const client = new OpenAI({
  apiKey: "sk-tok-••••••",
  baseURL: "https://api.tooken.ai/v1",
});

const res = await client.chat.completions.create({
  model: "auto",   // ← 智能路由，自动最优
  messages: [{ role: "user", content: prompt }],
});
`
// 高亮行："auto" 所在行：左侧橙色 border 3px + 橙色背景 rgba(249,115,22,0.06)
// 右上角：复制按钮（Copy → ✓ 动效）

// ---- 右侧：路由结果面板 ----
// 背景: #FFFFFF
// border-left: 1px solid #EFEFEB
// padding: 24px
// 内容：

// 顶部标签：
// <span>Auto Route Result</span>  — text-caption，text-muted

// 路由到的模型（大字展示）：
// 模型图标（小圆形） + "Kimi K2"（font-display, 20px, bold）
// 副文字："中文写作优化路由" （text-small, text-secondary）

// 成本对比：
// 原价（划线）：15 Credits / 1K token
// 实际：0.5 Credits / 1K token
// 节省：97% ↓  — 绿色大字，font-display

// 底部：3 个备选 pill（claude-haiku / gemini-flash / deepseek-v3），
// 灰色 pill 展示备选方案

// ---- 动态效果 ----
// 每隔 3.5s 自动轮换路由结果（切换到不同的"任务类型"）：
// - 代码生成 → Claude Opus 4（节省 60%）
// - 中文写作 → Kimi K2（节省 97%）
// - 数学推理 → GPT-5（节省 55%）
// - 长文处理 → Minimax（节省 90%）
// 切换动画：旧内容 fade+slide-down，新内容 fade+slide-up，200ms
```

---

### 5.3 Ticker Bar（数据流动条）

**高度**：48px  
**背景**：`#0F0F0D`（深色，与 Hero 亮色形成强对比）  
**字体**：JetBrains Mono，13px，500，颜色 `#FBBF24`（金色）  

**内容**（无限循环横向滚动，速度：40s/round）：

```
✦ 20+ 全球模型接入  ·  ✦ Auto 智能路由  ·  ✦ 平均节省 70% Token 成本  ·  
✦ x402 Web4 原生结算  ·  ✦ 99.9% 可用率  ·  ✦ OpenAI 兼容接口  ·  
✦ Base 网络秒级到账  ·  ✦ Agent 经济自治  ·
```

**实现**：
```tsx
// 两份相同内容首尾相接，CSS translateX 动画
// 遮罩：左右淡出 mask-image linear-gradient
<div className="overflow-hidden relative bg-ink py-3">
  <div className="absolute inset-y-0 left-0 w-20 z-10 
       bg-gradient-to-r from-ink to-transparent" />
  <div className="absolute inset-y-0 right-0 w-20 z-10 
       bg-gradient-to-l from-ink to-transparent" />
  <div className="flex whitespace-nowrap animate-marquee">
    {/* 内容重复2次 */}
    {[...tickerItems, ...tickerItems].map((item, i) => (
      <span key={i} className="font-mono text-amber-400 text-[13px] mx-8">
        {item}
      </span>
    ))}
  </div>
</div>
```

---

### 5.4 核心能力 Features

**背景**：白色  
**上下 padding**：`py-24`（桌面）/ `py-16`（移动端）

**布局**：
```
顶部：Section 标签 + 标题（居中）
中部：3列卡片网格（桌面）/ 1列（移动端）
```

**顶部文字**：
```tsx
<div className="text-center mb-16">
  <span className="text-caption text-brand-orange">核心能力</span>
  <h2 className="font-display font-bold text-ink mt-3">
    三层架构，完整覆盖<br />AI 经济基础设施
  </h2>
  <p className="text-body-lg text-secondary mt-4 max-w-xl mx-auto">
    从模型调用到链上结算，Tooken 是第一个将 AGI 与 Web4 原生融合的平台。
  </p>
</div>
```

**Feature 卡片（3张）**：

```tsx
const features = [
  {
    number: "01",
    icon: <RouteIcon />,     // 路由/分叉图标
    color: "orange",          // 橙色系
    title: "Auto 智能路由",
    subtitle: "最优模型，自动匹配",
    desc: "声明任务类型，系统在 5ms 内分析并路由至最优模型。代码选 Claude，中文选 Kimi，长文选 Minimax——完全自动化。",
    metric: "↓ 70%",
    metricLabel: "平均 Token 成本",
    points: ["任务感知路由", "账号池故障自愈", "路由透明可溯源"],
  },
  {
    number: "02",
    icon: <ZapIcon />,
    color: "gold",
    title: "x402 原生结算",
    subtitle: "机器原生支付，无需预充值",
    desc: "AI 请求触发微支付，链上流式结算。Base 网络 10 秒到账，手续费不到 $0.01。Agent 自主完成支付，零人工干预。",
    metric: "< 10s",
    metricLabel: "链上到账时间",
    points: ["USDT/USDC 多链支持", "Agent 自主支付", "链上透明可审计"],
  },
  {
    number: "03",
    icon: <BotIcon />,
    color: "amber",
    title: "Agent 经济自治",
    subtitle: "Web4 时代的经济参与者",
    desc: "为每个 AI Agent 分配钱包、预算与决策权。Agent 拥有身份、持有资产、自主交易——Web4 经济基础设施的第一层。",
    metric: "ERC-8183",
    metricLabel: "Agent 合约标准",
    points: ["Agent DID 身份", "可编程预算策略", "A2A 协议（路线图）"],
  },
]

// ---- 卡片设计规范 ----
// 背景：白色
// 边框：1px solid #E5E5E0
// 圆角：20px
// padding：32px
// 阴影：--shadow-sm（默认）→ --shadow-md（Hover）
// Hover：translateY(-4px)，transition 300ms ease-out

// 卡片内部布局（从上到下）：
// 1. 顶行：编号（02，font-mono，12px，text-muted）+ 右对齐图标（32px，圆形橙色淡背景）
// 2. 标题（font-display，22px，bold，ink色）
// 3. 副标题（14px，text-secondary，mb-3）
// 4. 描述文字（16px，text-secondary，line-height 1.65）
// 5. 分割线（1px，#EFEFEB）
// 6. 核心指标（大数字 + 标签）
//    大数字：font-display，32px，bold，橙金渐变色
// 7. 功能点列表（3个，前缀 ✓ 橙色，14px，text-secondary）
```

---

### 5.5 模型展示 Models Marquee

**背景**：`#F4F3EF`（浅暖灰）  
**上下 padding**：`py-20`

**顶部**：
```tsx
<div className="text-center mb-12">
  <span className="text-caption text-muted">接入的模型</span>
  <h2 className="font-display font-bold text-ink mt-3 text-[32px]">
    一个 Key，调用全球所有主流模型
  </h2>
</div>
```

**Marquee 双轨**：

```tsx
// 第一排：从左向右滚动，速度 35s
// 第二排：从右向左滚动，速度 45s（错位感）
// 两排之间 gap: 16px

const models = [
  { name: 'GPT-5',         provider: 'OpenAI',    category: '顶级',  logoColor: '#00A67E' },
  { name: 'Claude Opus 4', provider: 'Anthropic', category: '顶级',  logoColor: '#CC6B3D' },
  { name: 'Gemini Ultra',  provider: 'Google',    category: '顶级',  logoColor: '#4285F4' },
  { name: 'Kimi K2',       provider: '月之暗面',   category: '国产',  logoColor: '#1A1A2E' },
  { name: 'DeepSeek V3',   provider: 'DeepSeek',  category: '国产',  logoColor: '#006FFF' },
  { name: 'Qwen Max',      provider: '阿里云',     category: '国产',  logoColor: '#FF6A00' },
  { name: 'Minimax',       provider: 'MiniMax',   category: '国产',  logoColor: '#7C3AED' },
  { name: 'Doubao Pro',    provider: '字节跳动',   category: '国产',  logoColor: '#1664FF' },
  { name: 'Llama 3',       provider: 'Meta',      category: '开源',  logoColor: '#0668E1' },
  { name: 'Mistral',       provider: 'Mistral',   category: '开源',  logoColor: '#FF7000' },
]

// ---- 单个模型 Pill 样式 ----
// 背景：白色
// 边框：1px solid #E5E5E0
// 圆角：12px（不是 full，更有科技感）
// padding：12px 20px
// 内部：[彩色小圆点（provider color，8px）] [模型名（font-display，15px，bold，ink）] [分类标签（amber pill，9px）]
// box-shadow: --shadow-sm
// hover：shadow-md，translateY(-2px)，300ms
```

**底部链接**：
```tsx
<div className="text-center mt-10">
  <a href="/models" className="inline-flex items-center gap-2 text-[15px] font-medium 
     text-brand-orange hover:gap-3 transition-all duration-200">
    查看全部模型 <ArrowRight size={15} />
  </a>
</div>
```

---

### 5.6 Auto 路由演示（交互式）

**背景**：白色  
**上下 padding**：`py-24`

**布局**：左右两列（桌面），左 说明文字 / 右 交互演示

**左列（说明）**：
```tsx
<div>
  <span className="text-caption text-brand-orange">智能路由</span>
  <h2 className="font-display font-bold text-ink mt-3">
    告诉我任务，<br />我来选最优模型
  </h2>
  <p className="text-body text-secondary mt-4 leading-relaxed">
    Auto 路由在 5ms 内分析你的请求，综合评估质量、成本、延迟，
    自动选择当前最优模型。你只需写业务逻辑，其余交给我们。
  </p>
  
  {/* 路由策略 4 个选项（Tab 按钮） */}
  <div className="mt-8 flex flex-col gap-3">
    {routeStrategies.map(s => (
      <button key={s.id} onClick={() => setActive(s.id)}
        className={`flex items-center gap-3 p-4 rounded-xl border text-left
          transition-all duration-200
          ${active === s.id 
            ? 'border-orange-200 bg-orange-50 shadow-[0_0_0_1px_rgba(249,115,22,0.2)]' 
            : 'border-[--border-subtle] bg-white hover:border-[--border-default]'
          }`}>
        <s.icon size={20} className={active === s.id ? 'text-brand-orange' : 'text-muted'} />
        <div>
          <div className="font-display font-600 text-[15px] text-ink">{s.label}</div>
          <div className="text-[13px] text-secondary mt-0.5">{s.desc}</div>
        </div>
      </button>
    ))}
  </div>
</div>

const routeStrategies = [
  { id: 'auto',         icon: Zap,      label: 'auto — 全自动最优',    desc: '综合成本与质量，智能平衡' },
  { id: 'auto-cheap',   icon: DollarSign, label: 'auto-cheap — 极致省钱', desc: '同质量下优先最低成本模型' },
  { id: 'auto-fast',    icon: Timer,    label: 'auto-fast — 极速响应',  desc: 'TTFT < 500ms，实时交互首选' },
  { id: 'auto-quality', icon: Crown,    label: 'auto-quality — 顶级质量', desc: '任务优先质量，不考虑成本' },
]
```

**右列（可视化路由卡片）**：
```tsx
// 根据左侧选中的策略，显示不同的路由结果
// 卡片：白色，圆角20px，border，shadow-lg

// 卡片内部：
// 1. 顶部：请求任务预览（代码片段，3行，mono字体）
// 2. 中部：流动的"路由中..."动画箭头线（纯CSS SVG路径动画）
//    - 3条细线分叉，连接到3个模型节点
//    - 最优模型节点：橙色高亮 + 放大
//    - 其他节点：灰色小字
// 3. 底部：路由结果摘要
//    - "已路由至 Kimi K2"，大字
//    - 预计成本、预计延迟、节省金额

// 路由动画（策略切换时）：
// - 节点先全部灰色（400ms 延迟感，"分析中"）
// - 最优节点橙色高亮 + scale(1.1)（stagger 100ms/每节点）
// - 结果区 fade-up
```

---

### 5.7 数据成就 Stats

**背景**：橙金渐变  
```css
background: linear-gradient(135deg, #F97316 0%, #FBBF24 50%, #F59E0B 100%);
```
**上下 padding**：`py-20`  
**文字颜色**：白色

**布局**：4列横排（桌面）/ 2x2（平板）/ 1列（移动端）

```tsx
const stats = [
  { value: '20+',    label: '接入模型数量',    sub: '持续增加' },
  { value: '70%',    label: '平均成本节省',    sub: 'vs 直接调用' },
  { value: '99.9%',  label: '平台可用率',      sub: 'SLA 保障' },
  { value: '< 10s',  label: 'Base 网络到账',   sub: '手续费 < $0.01' },
]

// 数字：font-display，900，clamp(40px, 5vw, 64px)，白色
// 标签：font-body，16px，rgba(255,255,255,0.85)
// Sub：font-body，13px，rgba(255,255,255,0.6)
// 数字之间用细竖线分割（1px rgba(255,255,255,0.2)）

// 数字动画：进入视口时从 0 数到目标值，duration 1500ms，easeOut
// 使用 IntersectionObserver + useEffect + requestAnimationFrame
```

---

### 5.8 用户评价 Testimonials

**背景**：`#FAFAF8`  
**上下 padding**：`py-24`

**顶部**：
```tsx
<div className="text-center mb-14">
  <span className="text-caption text-muted">用户评价</span>
  <h2 className="font-display font-bold text-ink mt-3">
    开发者们都在用 Tooken
  </h2>
</div>
```

**布局**：瀑布流 / Masonry 3列（桌面），每列错位高度营造层次感

```tsx
const testimonials = [
  {
    content: "Auto 路由太聪明了，同样的业务场景，成本直接从每月 $800 降到 $180，省了 77%。",
    author: "张伟",
    role: "CTO @ 某 AI 创业公司",
    avatar: "ZW",
    stars: 5,
  },
  {
    content: "我们的 Agent 现在直接用 x402 自主充值，整个支付链路完全不需要人工干预，这才是 Web4 该有的样子。",
    author: "Li Wei",
    role: "Blockchain Engineer",
    avatar: "LW",
    stars: 5,
  },
  {
    content: "接入只改了 2 行代码，其他完全不动。OpenAI 兼容做得很好。",
    author: "陈浩",
    role: "独立开发者",
    avatar: "CH",
    stars: 5,
  },
  {
    content: "Claude Code 一行命令接入，现在用 Claude Opus 4 写代码，比之前便宜很多。",
    author: "Sarah K.",
    role: "Full-stack Developer",
    avatar: "SK",
    stars: 5,
  },
  {
    content: "故障自愈功能真的好用，上游模型偶尔抽风，用户完全无感知，请求自动切到备用账号。",
    author: "王磊",
    role: "后端工程师",
    avatar: "WL",
    stars: 5,
  },
  {
    content: "企业子账号管理非常方便，给不同部门的 Agent 设不同预算，再也不担心超支了。",
    author: "林经理",
    role: "AI 项目负责人",
    avatar: "L",
    stars: 5,
  },
]

// ---- 单个评价卡片设计 ----
// 背景：白色
// 边框：1px solid #E5E5E0
// 圆角：16px
// padding：24px
// box-shadow：--shadow-sm
// hover：shadow-md，200ms

// 内部布局（从上到下）：
// 1. 星级（5个实心星，amber-400）
// 2. 评价内容（17px，text-ink，leading-relaxed，行情感引号样式）
//    前加大号 "（橙色，opacity 0.3，font-display，48px，leading-none）
// 3. 底部：头像圆 + 姓名 + 职位
//    头像：橙金渐变背景圆，白色首字母，36px

// 卡片进入动画（Intersection Observer）：fade-up + 错位 stagger（每列 delay 不同）
```

---

### 5.9 定价 Pricing

**背景**：`#F4F3EF`  
**上下 padding**：`py-24`

**顶部**：
```tsx
<div className="text-center mb-16">
  <span className="text-caption text-brand-orange">定价</span>
  <h2 className="font-display font-bold text-ink mt-3">
    用量越大，价格越优
  </h2>
  <p className="text-body text-secondary mt-3 max-w-md mx-auto">
    1 Credit = 0.001 USD。链上充值，即充即用，无月费锁定。
  </p>
  {/* 切换：按量付费 / 企业套餐 */}
  <div className="inline-flex rounded-full border border-[--border-default] bg-white p-1 mt-6">
    <button className="px-5 py-2 rounded-full text-[14px] font-medium 
      bg-ink text-white transition-all">按量付费</button>
    <button className="px-5 py-2 rounded-full text-[14px] font-medium 
      text-secondary hover:text-ink transition-all">企业套餐</button>
  </div>
</div>
```

**定价卡片（3列）**：

```tsx
const plans = [
  {
    name: '按量付费',
    price: '0',
    unit: '月费',
    desc: '注册即用，按实际消耗扣减',
    highlight: false,
    cta: '免费开始',
    features: [
      '10 次/分钟 请求限制',
      '免费赠送 1,000 Credits',
      '支持全部 20+ 模型',
      'Auto 智能路由',
      '用量监控面板',
      '社区支持',
    ],
  },
  {
    name: '专业版',
    price: '¥999',
    unit: '/月',
    desc: '中小企业首选，赠送 Credits + 8 折优惠',
    highlight: true,          // ← 推荐套餐，金色高亮
    badge: 'Most Popular',
    cta: '开始专业版',
    features: [
      '300 次/分钟 请求限制',
      '赠送 300,000 Credits',
      '后续充值 8 折',
      '5 个子账号',
      '优先路由队列',
      'ROI 分析面板',
      '邮件支持，8h 响应',
    ],
  },
  {
    name: '企业版',
    price: '联系商务',
    unit: '',
    desc: '定制 SLA，专属接口，私有化部署',
    highlight: false,
    cta: '联系我们',
    features: [
      '自定义请求限制',
      '6 折起超量优惠',
      '无限子账号',
      '专属客服经理',
      '私有化模型部署',
      '合规发票 & SOC2',
      'SLA 99.99%',
    ],
  },
]

// ---- 推荐卡片（专业版）设计 ----
// 整体比其他两张 translateY(-8px)，略大 scale(1.02)（视觉突出）
// 边框：2px solid #FBBF24（金色）
// 顶部有 "Most Popular" 金色 badge（绝对定位在卡片顶边中心）
// badge 样式：橙金渐变背景，白色文字，小圆角，font-mono，12px

// ---- 普通卡片 ----
// 背景：白色
// 边框：1px solid #E5E5E0
// 圆角：20px
// padding：32px
// hover：shadow-md，translateY(-4px)

// ---- 卡片内部 ----
// 1. 套餐名（text-caption，text-muted）
// 2. 价格（font-display，bold，推荐卡橙金渐变文字）
// 3. 描述（14px，text-secondary）
// 4. 分割线
// 5. 功能列表（✓ 图标橙色，14px，text-ink，gap-3）
// 6. CTA 按钮（推荐卡：主按钮橙金渐变；其他：描边按钮）
```

---

### 5.10 CTA Banner

**背景**：`#0F0F0D`（深黑）  
**上下 padding**：`py-24`

```tsx
// 布局：居中，左右对称
// 背景装饰：橙色 radial glow 在标题后方（opacity 0.08）

<section className="bg-ink py-24 relative overflow-hidden">
  {/* 背景光晕 */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-[600px] h-[300px] rounded-full"
      style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)',
               filter: 'blur(40px)' }} />
  </div>
  
  <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
    {/* 标题 */}
    <h2 className="font-display font-900 text-white leading-tight"
        style={{ fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.03em' }}>
      加入 Web4 时代的<br />
      <span style={{ background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent' }}>
        AI 基础设施建设
      </span>
    </h2>
    
    {/* 副文字 */}
    <p className="text-[17px] text-gray-400 mt-6 leading-relaxed">
      5 分钟跑通第一个请求。免费额度，无需信用卡。
    </p>
    
    {/* 按钮组 */}
    <div className="flex items-center gap-4 justify-center mt-10">
      <button className="px-8 py-4 rounded-full font-display font-700 text-white text-[16px]
        shadow-[0_8px_32px_rgba(249,115,22,0.35)] hover:shadow-[0_12px_48px_rgba(249,115,22,0.5)]
        hover:-translate-y-1 transition-all duration-300"
        style={{ background: 'linear-gradient(135deg, #F97316 0%, #FBBF24 100%)' }}>
        免费开始使用 →
      </button>
      <button className="px-8 py-4 rounded-full font-body font-500 text-[16px] text-white
        border border-white/15 hover:border-white/30 hover:-translate-y-1 transition-all duration-300">
        查看文档
      </button>
    </div>
    
    {/* 底部小字：信任背书 */}
    <p className="text-[13px] text-gray-600 mt-6 font-mono">
      sk-tok-•••••••• &nbsp;·&nbsp; 赠送 1,000 Credits &nbsp;·&nbsp; 随时可取消
    </p>
  </div>
</section>
```

---

### 5.11 Footer

**背景**：`#0F0F0D`（与 CTA Banner 连续，无缝衔接）  
**顶部**：1px 分割线，颜色 `rgba(255,255,255,0.08)`

```tsx
// 布局：4列（桌面）/ 2列（平板）/ 1列（移动端）
// 顶部：Logo + 简介 + 社交图标
// 中部：4列链接

const footerLinks = {
  产品: ['模型列表', 'Auto 路由', 'API 文档', '定价', '更新日志'],
  开发者: ['快速上手', 'OpenAI 兼容', 'Claude Code 接入', 'SDK 下载', '状态页'],
  公司: ['关于我们', '博客', '联系我们', '商务合作'],
  法律: ['服务条款', '隐私政策', '数据安全'],
}

// 版权行（底部）：
// © 2026 Tooken. All rights reserved.
// 右侧：EN / 中文 语言切换

// 文字颜色：
// 标题：rgba(255,255,255,0.5)，text-caption
// 链接：rgba(255,255,255,0.4)，hover rgba(255,255,255,0.85)，transition 150ms
// 版权：rgba(255,255,255,0.3)
```

---

## 6. 动效总规范

### 6.1 核心原则

- **不能让用户等动画**：任何动画不阻塞信息获取
- **缓入快出**：进场慢（优雅），离场快（不拖沓）
- **物理感**：用 spring 曲线，避免线性匀速
- **单次触发**：Scroll 动画只播放一次（`once: true`）

### 6.2 Framer Motion 统一配置

```tsx
// lib/motion.ts — 复用的动画变量

// 基础淡入上移（最常用）
export const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

// 容器（控制子元素 stagger）
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
}

// 卡片 Hover
export const cardHover = {
  rest: { y: 0, boxShadow: 'var(--shadow-sm)' },
  hover: {
    y: -5,
    boxShadow: 'var(--shadow-lg)',
    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },  // spring
  },
}

// 按钮点击
export const buttonTap = {
  whileTap: { scale: 0.97, transition: { duration: 0.1 } },
  whileHover: { scale: 1.02, transition: { duration: 0.2 } },
}

// Scroll 触发（InView）
export const scrollReveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
}
```

### 6.3 页面加载序列（Hero）

```tsx
// 使用 Framer Motion AnimatePresence + stagger
// 时序（从页面加载开始）：

// t=0ms:    Navbar fade-in（100ms）
// t=150ms:  Hero Tag Pill（fade-up，100ms duration）
// t=280ms:  H1 标题（fade-up，120ms duration）
// t=400ms:  副标题（fade-up，100ms duration）
// t=520ms:  CTA 按钮组（fade-up，100ms duration）
// t=640ms:  信任徽章（fade-up，80ms duration）
// t=800ms:  产品演示卡片（fade-up + scale from 0.96，600ms，spring）
// t=900ms:  背景光晕开始漂浮动画（float，8s 循环）
```

### 6.4 Scroll 触发时机

```tsx
// 所有 Section 的子内容均用 Framer Motion whileInView
// viewport margin: '-100px'（提前一点触发，更自然）
// 同一 Section 内多元素：stagger 0.08s - 0.12s
// 数字 Counter：进入视口后 200ms 开始计数，1500ms 完成
```

### 6.5 禁止的动画

```
✗ 不要旋转 360°（除 loading spinner 外）
✗ 不要 bounce 太夸张（spring tension 控制在合理范围）
✗ 不要页面滚动时持续并行动画超过 2 个
✗ 不要用 setTimeout + CSS 替代 Framer Motion（不一致）
✗ 不要在移动端用 perspective 3D 变换（性能差）
✗ 不要闪烁（opacity 0→1→0→1）
```

---

## 7. 组件规范

### Button

```tsx
// variants: 'primary' | 'secondary' | 'ghost' | 'link'
// sizes: 'sm' | 'md' | 'lg'

// primary（橙金渐变）
// 圆角：rounded-full
// 文字：白色，font-display，font-700
// hover：shadow 增强 + translateY(-2px) + brightness(1.05)
// active：scale(0.97)

// secondary（白底描边）
// 圆角：rounded-full
// 背景：white
// 边框：border-[--border-default]
// hover：border-[--border-brand] + shadow-md

// 必须有 loading 态：spinner 替换文字，禁止点击
```

### Tag / Badge

```tsx
// variants: 'brand' | 'neutral' | 'success' | 'warning'

// brand: bg-orange-50 text-orange-600 border border-orange-200
// 圆角：rounded-full
// 大小：px-3 py-1 text-[12px] font-medium
```

### SectionWrapper

```tsx
// 统一 Section 外层容器
// max-w: 1200px（大内容）/ 960px（聚焦内容）
// padding: px-6（移动）/ px-8（平板）/ px-12（桌面）
// margin: 0 auto

const SectionWrapper = ({ children, className, maxWidth = '1200px' }) => (
  <div className={cn('mx-auto w-full px-6 md:px-8 lg:px-12', className)}
       style={{ maxWidth }}>
    {children}
  </div>
)
```

### SectionLabel

```tsx
// 每个 Section 顶部的小标签（如"核心能力"）
// font-caption（12px，uppercase，600，letter-spacing 0.06em）
// 颜色：brand-orange 或 text-muted
// 通常在标题 h2 上方 mb-3

const SectionLabel = ({ children, color = 'brand' }) => (
  <span className={cn(
    'block text-[12px] font-semibold uppercase tracking-[0.06em] mb-3',
    color === 'brand' ? 'text-brand-orange' : 'text-muted'
  )}>
    {children}
  </span>
)
```

---

## 8. 文件结构

```
src/
├── app/
│   ├── globals.css           # CSS变量、字体、重置样式
│   ├── layout.tsx            # <html> 根布局，字体注入
│   └── page.tsx              # 首页，组合所有 Section
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx        # 顶部导航
│   │
│   ├── home/                 # 首页专属组件
│   │   ├── HeroSection.tsx
│   │   ├── TickerBar.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── ModelsMarquee.tsx
│   │   ├── RoutingDemo.tsx
│   │   ├── StatsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── CtaBanner.tsx
│   │   └── Footer.tsx
│   │
│   └── ui/                   # 通用 UI 组件
│       ├── Button.tsx
│       ├── Badge.tsx
│       └── SectionWrapper.tsx
│
├── lib/
│   ├── motion.ts             # Framer Motion 动画变量
│   ├── cn.ts                 # clsx + twMerge 工具
│   └── constants.ts          # 模型数据、评价数据等静态内容
│
└── public/
    ├── logo.png              # Tooken Logo
    └── logos/                # 各模型 Provider Logo（SVG）
        ├── openai.svg
        ├── anthropic.svg
        ├── google.svg
        └── ...
```

### page.tsx 结构

```tsx
// src/app/page.tsx
import Navbar from '@/components/layout/Navbar'
import HeroSection from '@/components/home/HeroSection'
import TickerBar from '@/components/home/TickerBar'
import FeaturesSection from '@/components/home/FeaturesSection'
import ModelsMarquee from '@/components/home/ModelsMarquee'
import RoutingDemo from '@/components/home/RoutingDemo'
import StatsSection from '@/components/home/StatsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import PricingSection from '@/components/home/PricingSection'
import CtaBanner from '@/components/home/CtaBanner'
import Footer from '@/components/home/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <TickerBar />
      <FeaturesSection />
      <ModelsMarquee />
      <RoutingDemo />
      <StatsSection />
      <TestimonialsSection />
      <PricingSection />
      <CtaBanner />
      <Footer />
    </main>
  )
}
```

### cn.ts

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
```

---

## 附录 A：设计核查清单（给 Cursor 的提示）

开发过程中请确保以下每一条：

**色彩**
- [ ] 背景主色用 `#FAFAF8`，不是纯白 `#FFFFFF`（纯白稍刺眼）
- [ ] 强调色只有橙金色系，不随意引入蓝/紫/绿
- [ ] 深色 Section（Ticker、CTA、Footer）背景统一用 `#0F0F0D`

**字体**
- [ ] 所有标题用 `Cabinet Grotesk`（font-display）
- [ ] 所有正文用 `Instrument Sans`（font-body）
- [ ] API Key、代码用 `JetBrains Mono`（font-mono）
- [ ] 字体已从 Google Fonts 正确引入

**动画**
- [ ] 所有 Scroll 动画 `once: true`（不重复播放）
- [ ] 按钮 hover 有 `-translate-y-0.5` 微上移
- [ ] 卡片 hover 有 `shadow` 增强 + 微上移
- [ ] Marquee 动画左右两侧有渐变遮罩

**响应式**
- [ ] Hero 标题用 `clamp()` 自适应大小
- [ ] 所有网格在移动端降为 1 列
- [ ] Navbar 移动端有汉堡菜单
- [ ] 定价卡片推荐卡在移动端 translateY 取消（避免溢出）

**性能**
- [ ] 背景光晕效果用 CSS `filter: blur()`，不用 canvas
- [ ] 图片用 Next.js `<Image />`，设置 `priority` 仅对 Hero
- [ ] Framer Motion 按需导入（`from 'framer-motion'`）

---

## 附录 B：关键视觉 DNA 速查

| 元素 | 规格 |
|------|------|
| 主背景色 | `#FAFAF8` |
| 强调色 | `#F97316` → `#FBBF24` |
| 标题字体 | Cabinet Grotesk 900 |
| 正文字体 | Instrument Sans 400 |
| 圆角风格 | `rounded-full`（按钮）/ `rounded-[20px]`（卡片）|
| 阴影策略 | 浅色柔和，品牌色版仅用于主 CTA |
| 动画曲线 | `cubic-bezier(0.16, 1, 0.3, 1)` |
| 深色区背景 | `#0F0F0D` |
| Section 节奏 | 亮→深→亮→亮→品牌渐变→亮→灰→深→深 |

---

*文档版本：v2.0 · 更新日期：2026-04-29 · 仅限官网首页 · 面向 Cursor 开发*
