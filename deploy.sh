#!/bin/bash
# ============================================
# Tooken 官网 - 零停机部署脚本
# ============================================
# 原理：build 到独立目录 .next-staging，完成后原子替换 .next，再 reload PM2
# 整个 build 过程中旧的 .next 不受影响，用户无感知
#
# 用法：
#   bash deploy.sh              # 拉取最新代码并部署
#   bash deploy.sh --skip-pull  # 跳过 git pull，仅 build + 部署

set -euo pipefail

APP_DIR="/root/projects/Tooken-front"
STAGING_DIR=".next-staging"
PM2_APP_NAME="tooken-web"

cd "$APP_DIR"

# ---- 参数解析 ----
SKIP_PULL=false
for arg in "$@"; do
  case $arg in
    --skip-pull) SKIP_PULL=true ;;
  esac
done

echo "🚀 开始部署 Tooken 官网..."
echo "   时间: $(date '+%Y-%m-%d %H:%M:%S')"

# ---- 1. 拉取代码 ----
if [ "$SKIP_PULL" = false ]; then
  echo "📥 拉取最新代码..."
  git stash --quiet 2>/dev/null || true
  git pull --rebase
  git stash pop --quiet 2>/dev/null || true
fi

# ---- 2. 安装依赖 ----
echo "📦 安装依赖..."
npm ci

# ---- 3. Build 到 staging 目录（不影响当前运行的 .next）----
echo "🔨 构建中（输出到 $STAGING_DIR）..."
NEXT_DIST_DIR="$STAGING_DIR" npm run build

# 还原 tsconfig.json（Next.js 会自动注入 .next-staging 路径）
git checkout -- tsconfig.json 2>/dev/null || true

# ---- 4. 原子替换 ----
echo "🔄 切换构建产物..."
rm -rf .next-old
[ -d .next ] && mv .next .next-old
mv "$STAGING_DIR" .next

# ---- 5. 重启 PM2（优雅重载，首次则启动）----
echo "♻️  重载 PM2 进程..."
if pm2 describe "$PM2_APP_NAME" > /dev/null 2>&1; then
  pm2 reload "$PM2_APP_NAME"
else
  pm2 start ecosystem.config.cjs
  pm2 save
fi

# ---- 6. 清理旧构建 ----
rm -rf .next-old

echo "✅ 部署完成！$(date '+%Y-%m-%d %H:%M:%S')"
echo "   访问: http://localhost:3000"
