"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LayoutDashboard, Inbox, Package, FileText, ExternalLink, LogOut, Menu, X } from "lucide-react";
import { LogoMark } from "@/components/Logo";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/enquiries", label: "Enquiries", icon: Inbox, badge: true },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/posts", label: "Posts", icon: FileText },
];

export function AdminShell({ children, email, newCount, logout }: { children: ReactNode; email: string; newCount: number; logout: () => Promise<void> }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const nav = (
    <nav aria-label="Admin" className="space-y-1">
      {items.map((it) => {
        const active = it.exact ? path === it.href : path.startsWith(it.href);
        return (
          <Link key={it.href} href={it.href} onClick={() => setOpen(false)} className={`relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors ${active ? "text-fg" : "text-muted hover:text-fg"}`}>
            {active && <motion.span layoutId="admin-active" className="absolute inset-0 rounded-xl border border-white/10 bg-gradient-to-r from-blue/25 to-violet/20 shadow-[0_8px_24px_-12px_rgb(59_108_255/0.9),inset_0_1px_0_rgb(255_255_255/0.08)]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
            <it.icon size={17} className={`relative ${active ? "text-cyan" : ""}`} />
            <span className="relative flex-1">{it.label}</span>
            {it.badge && newCount > 0 && <span className="relative rounded-full bg-gradient-to-r from-blue to-violet px-2 py-0.5 font-mono text-[0.65rem] text-white">{newCount}</span>}
          </Link>
        );
      })}
    </nav>
  );

  const footer = (
    <div className="space-y-2">
      <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-muted transition hover:text-fg"><ExternalLink size={17} />View website</Link>
      <form action={logout}>
        <button className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-muted transition hover:bg-white/[0.04] hover:text-fg"><LogOut size={17} />Sign out</button>
      </form>
      <div className="flex items-center gap-3 rounded-xl border border-line bg-white/[0.02] p-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue to-violet text-sm font-semibold">{email[0]?.toUpperCase()}</span>
        <span className="min-w-0"><span className="block truncate text-sm">{email}</span><span className="eyebrow !text-[0.58rem]">Administrator</span></span>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-dvh lg:grid lg:grid-cols-[272px_1fr]">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-50" />
        <div className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-violet/15 blur-[120px]" />
        <div className="absolute -bottom-48 left-1/3 h-[420px] w-[420px] rounded-full bg-blue/10 blur-[120px]" />
      </div>

      {/* desktop sidebar */}
      <aside className="sticky top-0 hidden h-dvh flex-col justify-between border-r border-line bg-surface/50 p-5 backdrop-blur-xl lg:flex">
        <div>
          <Link href="/admin" className="mb-8 flex items-center gap-3 px-1.5"><LogoMark className="h-8 w-8" /><span><span className="block text-[15px] font-semibold tracking-[0.2em]">ALTIVOX</span><span className="eyebrow !text-[0.58rem]">Control centre</span></span></Link>
          {nav}
        </div>
        {footer}
      </aside>

      {/* mobile top bar + drawer */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-ink/80 px-5 py-3 backdrop-blur-xl lg:hidden">
        <Link href="/admin" className="flex items-center gap-2.5"><LogoMark className="h-6 w-6" /><span className="text-sm font-semibold tracking-[0.2em]">ADMIN</span></Link>
        <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-10 w-10 place-items-center rounded-full border border-line">{open ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="fixed inset-x-0 top-[61px] z-30 flex max-h-[calc(100dvh-61px)] flex-col gap-6 overflow-y-auto border-b border-line bg-ink/95 p-5 backdrop-blur-xl lg:hidden">
            {nav}{footer}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="min-w-0 p-5 sm:p-8 lg:p-10"><div className="mx-auto max-w-6xl">{children}</div></main>
    </div>
  );
}
