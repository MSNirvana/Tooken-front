import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const footerLinks = {
  产品: ["模型列表", "Auto 路由", "API 文档", "定价", "更新日志"],
  开发者: ["快速上手", "OpenAI 兼容", "Claude Code 接入", "SDK 下载", "状态页"],
  公司: ["关于我们", "博客", "联系我们", "商务合作"],
  法律: ["服务条款", "隐私政策", "数据安全"],
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--bg-dark)] py-14 text-white">
      <SectionWrapper>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_3fr]">
          <div>
            <p className="inline-flex items-center gap-2 font-display text-2xl font-bold">
              <Image src="/logo.png" alt="Tooken Logo" width={30} height={30} className="rounded-md object-contain" />
              Tooken
            </p>
            <p className="mt-3 text-sm text-white/45">AGI × Web4 经济基础设施。一个 API，连接全球模型与原生结算。</p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-white/50">{title}</p>
                <div className="space-y-2.5 text-sm text-white/40">
                  {links.map((link) => (
                    <a key={link} href="#" className="block transition hover:text-white/85">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/35">
          <span>© 2026 Tooken. All rights reserved.</span>
          <span>EN / 中文</span>
        </div>
      </SectionWrapper>
    </footer>
  );
}
