"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const links = [
  { label: "Models", href: "#models" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Blog", href: "#" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="section-shell flex h-16 items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 font-display text-xl font-bold text-[var(--text-primary)]">
            <Image src="/logo.png" alt="Tooken Logo" width={28} height={28} className="rounded-md object-contain" />
            Tooken
          </Link>
          <nav className="hidden gap-8 text-[15px] font-medium text-[var(--text-secondary)] md:flex">
            {links.map((item) => (
              <Link key={item.label} href={item.href} className="transition-colors hover:text-[var(--text-primary)]">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost">Log in</Button>
            <Button>Get Started →</Button>
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
              <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex gap-3">
              <Button variant="secondary">Log in</Button>
              <Button>Get Started</Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
