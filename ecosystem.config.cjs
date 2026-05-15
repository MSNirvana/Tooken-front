/** @type {import('pm2').StartOptions} */
const app = {
  name: 'tooken-web',
  script: 'node_modules/next/dist/bin/next',
  args: 'start -p 3000',
  cwd: '/root/projects/Tooken-front',

  // Next.js 不支持 cluster 模式，必须用 fork
  instances: 1,
  exec_mode: 'fork',

  // 内存超限自动重启
  max_memory_restart: '512M',

  // 环境变量
  env: {
    NODE_ENV: 'production',
    PORT: 3000,
  },

  // 日志
  out_file: './logs/out.log',
  error_file: './logs/error.log',
  merge_logs: true,
  log_date_format: 'YYYY-MM-DD HH:mm:ss Z',

  // 崩溃后自动重启，指数退避，最多重试 10 次
  autorestart: true,
  min_uptime: '10s',
  max_restarts: 10,
  restart_delay: 3000,
  exp_backoff_restart_delay: 100,

  // 优雅关闭
  kill_timeout: 5000,
  listen_timeout: 10000,
};

module.exports = { apps: [app] };
