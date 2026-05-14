"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LocaleToggle } from "@/components/ui/LocaleToggle";
import { cn } from "@/lib/cn";
import { useLocaleContext } from "@/components/providers/LocaleContext";

const links = [
  { zh: "模型", en: "Models", href: "#models" },
  { zh: "文档", en: "Docs", href: "/docs" },
  { zh: "博客", en: "Blog", href: "#" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale } = useLocaleContext();

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
          <nav className="hidden absolute left-1/2 -translate-x-1/2 gap-8 text-[15px] font-medium text-[var(--text-secondary)] md:flex">
            {links.map((item) => (
              <Link key={item.en} href={item.href} className="transition-colors hover:text-[var(--text-primary)]">
                {locale === "zh" ? item.zh : item.en}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <LocaleToggle variant="ghost" />
            <Button className="relative h-10 overflow-hidden border-[0.5px] border-white/45 px-5 text-sm shadow-[0_6px_16px_rgba(249,115,22,0.22)] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(115deg,rgba(255,255,255,0)_18%,rgba(255,255,255,0.34)_48%,rgba(255,255,255,0)_78%)] after:opacity-0 after:transition-opacity after:duration-300 hover:shadow-[0_10px_24px_rgba(249,115,22,0.3)] hover:after:opacity-100">
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
            {links.map((item) => (
              <Link key={item.en} href={item.href} onClick={() => setMenuOpen(false)}>
                {locale === "zh" ? item.zh : item.en}
              </Link>
            ))}
            <div className="mt-4 flex gap-3">
              <LocaleToggle variant="ghost" />
              <Button className="relative h-10 overflow-hidden border-[0.5px] border-white/45 px-5 text-sm shadow-[0_6px_16px_rgba(249,115,22,0.22)] after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(115deg,rgba(255,255,255,0)_18%,rgba(255,255,255,0.34)_48%,rgba(255,255,255,0)_78%)] after:opacity-0 after:transition-opacity after:duration-300 hover:shadow-[0_10px_24px_rgba(249,115,22,0.3)] hover:after:opacity-100">
                {locale === "zh" ? "免费开始" : "Start Free"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
