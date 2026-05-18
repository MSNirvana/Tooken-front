"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LocaleToggle } from "@/components/ui/LocaleToggle";
import { cn } from "@/lib/cn";
import { useLocaleContext } from "@/components/providers/LocaleContext";

type DropdownItem = {
  zh: string;
  en: string;
  href: string;
  external?: boolean;
  icon?: "x" | "telegram";
};

type NavItem = {
  zh: string;
  en: string;
  href: string;
  items: DropdownItem[];
};

const navItems: NavItem[] = [
  {
    zh: "模型",
    en: "Models",
    href: "/models",
    items: [
      { zh: "智能路由", en: "Smart Routing", href: "/models#intelligent-routing" },
      { zh: "模型列表", en: "Model Catalog", href: "/models#model-catalog" },
    ],
  },
  {
    zh: "文档",
    en: "Docs",
    href: "/docs",
    items: [
      { zh: "文档首页", en: "Docs Home", href: "/docs" },
    ],
  },
  {
    zh: "社区",
    en: "Community",
    href: "https://x.com",
    items: [
      { zh: "X", en: "X", href: "https://x.com", external: true, icon: "x" },
      { zh: "TG", en: "Telegram", href: "https://t.me", external: true, icon: "telegram" },
    ],
  },
];

const communityIconMap: Record<NonNullable<DropdownItem["icon"]>, string> = {
  x: "/logos/social/x.svg",
  telegram: "/logos/social/telegram.svg",
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale } = useLocaleContext();
  const startFreeUrl = "https://app.tooken.ai";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-40 w-full border-b border-transparent transition-all duration-300",
          scrolled && "border-[var(--border-subtle)] bg-[rgba(250,250,248,0.85)] backdrop-blur-xl",
        )}
      >
        <div className="section-shell relative flex h-16 items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 font-display text-xl font-bold text-[var(--text-primary)]">
            <Image src="/logo.png" alt="Tooken Logo" width={28} height={28} className="rounded-md object-contain" />
            Tooken
          </Link>
          <nav className="hidden absolute left-1/2 -translate-x-1/2 items-center gap-7 md:flex">
            {navItems.map((item) => (
              <div key={item.en} className="group relative">
                <Link
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 py-2 text-[15px] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                  {locale === "zh" ? item.zh : item.en}
                  <ChevronDown className="h-3.5 w-3.5 opacity-70 transition group-hover:translate-y-[1px]" />
                </Link>
                <div className="pointer-events-none absolute left-0 top-full z-50 w-[230px] pt-2 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="rounded-xl border border-[rgba(15,15,13,0.09)] bg-white/97 p-1.5 shadow-[0_12px_28px_rgba(15,15,13,0.12)] backdrop-blur-sm">
                    {item.items.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.href}
                        href={dropdownItem.href}
                        target={dropdownItem.external ? "_blank" : undefined}
                        rel={dropdownItem.external ? "noreferrer" : undefined}
                        className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-medium text-[rgba(15,15,13,0.72)] transition-colors hover:bg-[rgba(15,15,13,0.04)] hover:text-[var(--text-primary)]"
                      >
                        {dropdownItem.icon ? (
                          <span className="inline-flex h-5 w-5 items-center justify-center">
                            <Image src={communityIconMap[dropdownItem.icon]} alt={`${dropdownItem.en} logo`} width={18} height={18} className="h-[18px] w-[18px] object-contain" />
                          </span>
                        ) : null}
                        <span>{locale === "zh" ? dropdownItem.zh : dropdownItem.en}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <LocaleToggle variant="ghost" />
            <Button
              className="relative h-10 overflow-hidden border-[0.5px] border-white/45 px-5 text-sm shadow-[0_6px_16px_rgba(249,115,22,0.22)] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(115deg,rgba(255,255,255,0)_18%,rgba(255,255,255,0.34)_48%,rgba(255,255,255,0)_78%)] after:opacity-0 after:transition-opacity after:duration-300 hover:shadow-[0_10px_24px_rgba(249,115,22,0.3)] hover:after:opacity-100"
              onClick={() => window.location.assign(startFreeUrl)}
            >
              {locale === "zh" ? "免费开始" : "Start Free"}
            </Button>
          </div>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-default)] md:hidden" onClick={() => setMenuOpen((v) => !v)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>
      {menuOpen ? (
        <div className="fixed inset-0 z-30 bg-[rgba(250,250,248,0.96)] pt-24 md:hidden">
          <div className="section-shell flex flex-col gap-6 text-xl font-semibold">
            {navItems.map((item) => (
              <div key={item.en} className="space-y-2">
                <Link
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  onClick={() => setMenuOpen(false)}
                  className="block"
                >
                  {locale === "zh" ? item.zh : item.en}
                </Link>
                <div className="space-y-1.5 pl-4 text-sm font-medium text-[var(--text-secondary)]">
                  {item.items.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.href}
                      href={dropdownItem.href}
                      target={dropdownItem.external ? "_blank" : undefined}
                      rel={dropdownItem.external ? "noreferrer" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2"
                    >
                      {dropdownItem.icon ? (
                        <span className="inline-flex h-5 w-5 items-center justify-center">
                          <Image src={communityIconMap[dropdownItem.icon]} alt={`${dropdownItem.en} logo`} width={18} height={18} className="h-[18px] w-[18px] object-contain" />
                        </span>
                      ) : null}
                      <span>{locale === "zh" ? dropdownItem.zh : dropdownItem.en}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-4 flex gap-3">
              <LocaleToggle variant="ghost" />
              <Button
                className="relative h-10 overflow-hidden border-[0.5px] border-white/45 px-5 text-sm shadow-[0_6px_16px_rgba(249,115,22,0.22)] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(115deg,rgba(255,255,255,0)_18%,rgba(255,255,255,0.34)_48%,rgba(255,255,255,0)_78%)] after:opacity-0 after:transition-opacity after:duration-300 hover:shadow-[0_10px_24px_rgba(249,115,22,0.3)] hover:after:opacity-100"
                onClick={() => window.location.assign(startFreeUrl)}
              >
                {locale === "zh" ? "免费开始" : "Start Free"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
