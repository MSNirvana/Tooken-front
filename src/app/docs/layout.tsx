import Link from "next/link";

const sections = [
  "5分钟跑通",
  "注册与登录",
  "Credits 充值",
  "Auto 智能路由",
  "API 参考",
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-shell grid gap-6 py-10 lg:grid-cols-[240px_1fr]">
      <aside className="rounded-xl border border-white/10 bg-[#111118] p-4">
        <h3 className="mb-3 text-sm font-semibold text-zinc-300">文档导航</h3>
        <nav className="space-y-2 text-sm text-zinc-400">
          {sections.map((item) => (
            <Link key={item} href="/docs" className="block hover:text-zinc-100">
              {item}
            </Link>
          ))}
        </nav>
      </aside>
      <div>{children}</div>
    </div>
  );
}
