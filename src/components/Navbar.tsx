"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  useEffect(() => { setOpen(false); }, [path]);

  const isActive = (href: string) => path === href || path.startsWith(href + "/");

  return (
    <>
      <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-blue via-violet to-cyan" style={{ scaleX: progress }} />
      <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4">
        <div className={`flex w-full max-w-md items-center justify-between gap-1 rounded-full border px-3 py-1.5 backdrop-blur-xl transition-all duration-300 lg:w-auto lg:max-w-none lg:justify-center lg:gap-2 lg:px-2.5 ${scrolled || open ? "border-white/12 bg-ink/75 shadow-[0_12px_40px_-12px_rgb(59_108_255/0.5),inset_0_1px_0_rgb(255_255_255/0.08)]" : "border-white/10 bg-white/[0.035] shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]"}`}>
          <div className="lg:pl-2 lg:pr-3"><Logo /></div>
          <nav aria-label="Primary" className="hidden items-center lg:flex">
            {nav.main.map((item) => {
              const active = isActive(item.href);
              return (
                <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`relative rounded-full px-4 py-2 text-sm transition-colors ${active ? "text-fg" : "text-muted hover:text-fg"}`}>
                  {active && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.08]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <Link href={nav.cta.href} className="hidden rounded-full bg-gradient-to-r from-blue to-violet px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue/20 transition hover:shadow-violet/40 sm:inline-block lg:ml-1">{nav.cta.label}</Link>
            <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((v) => !v)}>{open ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>

        {open && (
          <div id="mobile-menu" className="fixed inset-x-3 top-[68px] max-h-[calc(100dvh-84px)] overflow-y-auto rounded-3xl border border-white/10 bg-ink/95 p-5 shadow-2xl shadow-black/60 backdrop-blur-xl lg:hidden">
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.main.map((item) => (
                <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined} className={`border-b border-line py-4 text-2xl font-medium tracking-tight ${isActive(item.href) ? "text-cyan" : ""}`}>{item.label}</Link>
              ))}
            </nav>
            <Link href={nav.cta.href} className="mt-6 block rounded-full bg-gradient-to-r from-blue to-violet py-3.5 text-center font-medium text-white">{nav.cta.label}</Link>
          </div>
        )}
      </header>
    </>
  );
}
