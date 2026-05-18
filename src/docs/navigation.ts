export type DocNavItem = {
  title: string;
  href: string;
  children?: DocNavItem[];
};

export type DocNavGroup = {
  group: string;
  icon: string;
  items: DocNavItem[];
};

export const docsNavigation: DocNavGroup[] = [
  {
    group: "开始使用",
    icon: "🚀",
    items: [
      { title: "什么是 Tooken", href: "/docs/intro" },
      {
        title: "快速上手",
        href: "/docs/quickstart",
        children: [
          { title: "注册账户", href: "/docs/quickstart/register" },
          { title: "获取 API Key", href: "/docs/quickstart/api-key" },
          { title: "发送第一个请求", href: "/docs/quickstart/first-request" },
          { title: "接入 Claude Code", href: "/docs/quickstart/claude-code" },
        ],
      },
    ],
  },
  {
    group: "模型与路由",
    icon: "🤖",
    items: [
      { title: "模型列表", href: "/docs/models" },
      { title: "Auto 智能路由", href: "/docs/models/routing" },
      { title: "模型能力对比", href: "/docs/models/comparison" },
    ],
  },
  {
    group: "计费与支付",
    icon: "💳",
    items: [
      { title: "计费概览", href: "/docs/billing" },
      { title: "Credits 体系", href: "/docs/billing/credits" },
      { title: "充值方式", href: "/docs/billing/topup" },
    ],
  },
  {
    group: "Agent 经济层",
    icon: "🔗",
    items: [
      { title: "概览", href: "/docs/agent" },
      { title: "Agent 钱包", href: "/docs/agent/wallet" },
      { title: "Agent 自主路由", href: "/docs/agent/routing" },
      { title: "ERC-8183（路线图）", href: "/docs/agent/erc8183" },
    ],
  },
  {
    group: "企业合规",
    icon: "🏢",
    items: [{ title: "合规与隐私", href: "/docs/compliance" }],
  },
  {
    group: "API 参考",
    icon: "📡",
    items: [
      { title: "API 概览", href: "/docs/api" },
      { title: "认证方式", href: "/docs/api/authentication" },
      { title: "Chat Completions", href: "/docs/api/chat" },
      { title: "Messages（Claude 兼容）", href: "/docs/api/messages" },
      { title: "路由查询", href: "/docs/api/route" },
      { title: "错误码", href: "/docs/api/errors" },
      { title: "限流规则", href: "/docs/api/rate-limits" },
    ],
  },
  {
    group: "其他",
    icon: "📋",
    items: [{ title: "更新日志", href: "/docs/changelog" }],
  },
];

export type FlatDocNavItem = {
  title: string;
  href: string;
  group: string;
};

function walk(items: DocNavItem[], group: string, result: FlatDocNavItem[]) {
  for (const item of items) {
    result.push({ title: item.title, href: item.href, group });
    if (item.children?.length) {
      walk(item.children, group, result);
    }
  }
}

export function flattenDocsNavigation() {
  const result: FlatDocNavItem[] = [];
  for (const section of docsNavigation) {
    walk(section.items, section.group, result);
  }
  return result;
}

export function getPrevNextDoc(href: string) {
  const all = flattenDocsNavigation();
  const index = all.findIndex((item) => item.href === href);
  return {
    prev: index > 0 ? all[index - 1] : null,
    next: index >= 0 && index < all.length - 1 ? all[index + 1] : null,
  };
}
