import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export function Section({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro, action }: { eyebrow: string; title: ReactNode; intro?: string; action?: { label: string; href: string } }) {
  return (
    <div className="mb-12 flex flex-col justify-between gap-6 sm:mb-16 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">{title}</h2>
        {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
      </div>
      {action && (
        <Link href={action.href} className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-fg hover:text-cyan">
          {action.label} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: string; children?: ReactNode }) {
  return (
    <header className="relative overflow-hidden border-b border-line pt-32 sm:pt-40">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[700px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgb(124_92_255/0.18),transparent_65%)]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.06] tracking-[-0.035em] sm:text-6xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
        {children}
      </div>
    </header>
  );
}

export function SampleBadge({ label = "Sample" }: { label?: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-cyan/30 bg-cyan/10 px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider text-cyan">
      {label}
    </span>
  );
}

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue to-violet px-6 py-3.5 font-medium text-white shadow-lg shadow-blue/20 transition hover:shadow-violet/30 focus-visible:outline-offset-4";
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 font-medium transition hover:border-muted/50 hover:bg-white/[0.03]";
