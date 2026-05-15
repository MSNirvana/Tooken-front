# Tooken 官网

Tooken LLM API 中转平台官网，基于 Next.js 构建。提供产品介绍、模型列表、定价、文档等公开页面。

> 后台控制台（app.tooken.ai）位于 [tooken-frontend](../tooken-frontend/) 项目。

## 技术栈

| 层 | 技术 |
| --- | --- |
| 框架 | Next.js 16 (App Router) + React 19 |
| 语言 | TypeScript |
| UI | Tailwind CSS 4 + Radix UI + Framer Motion |
| 图表 | Recharts |
| 国际化 | next-intl |
| 状态 | Zustand |
| Web3 | wagmi + viem |
| 包管理 | npm |

## 快速开始

```bash
npm install
cp .env.example .env   # 按需编辑
npm run dev            # http://localhost:3000
```

## 页面结构

```
src/app/
├── (marketing)/       # 官网落地页（首页、定价等）
├── (dashboard)/       # 用户面板（API Keys、用量、钱包等）
├── docs/              # 文档页
├── login/             # 登录页
├── layout.tsx         # 根布局
└── page.tsx           # 首页
```

## 生产部署

域名：`tooken.ai`，端口 `:3200`，PM2 进程名 `tooken-web`。

### 零停机部署

```bash
bash deploy.sh              # 拉取代码 + 安装依赖 + 构建 + 原子切换 + PM2 reload
bash deploy.sh --skip-pull  # 跳过 git pull，仅 build + 部署
```

原理：通过 `NEXT_DIST_DIR` 环境变量将构建产物输出到 `.next-staging`，完成后原子替换 `.next` 目录再 reload PM2。

### 首次启动

```bash
npm ci
npm run build
pm2 start ecosystem.config.cjs
pm2 save && pm2 startup
```

### Nginx 配置

```bash
cp nginx.conf.example /etc/nginx/conf.d/tooken.ai.conf
nginx -t && nginx -s reload
```

> HTTPS 由 Cloudflare 处理，nginx 只监听 80。
