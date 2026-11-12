import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

export function AdminHeader({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div><p className="eyebrow">Altivox admin</p><h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{title}</h1>{sub && <p className="mt-1.5 text-muted">{sub}</p>}</div>
      {action}
    </div>
  );
}

export function Panel({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <Reveal delay={delay}><div className={`rounded-2xl border border-line bg-gradient-to-b from-white/[0.045] to-white/[0.015] shadow-[0_20px_50px_-30px_rgb(0_0_0/0.9),inset_0_1px_0_rgb(255_255_255/0.05)] backdrop-blur ${className}`}>{children}</div></Reveal>;
}

const typeColor: Record<string, string> = { CONTACT: "text-blue border-blue/40 bg-blue/10", QUOTE: "text-violet border-violet/40 bg-violet/10", PRODUCT: "text-cyan border-cyan/40 bg-cyan/10", DEMO: "text-amber-300 border-amber-300/40 bg-amber-300/10" };
const statusColor: Record<string, string> = { NEW: "text-cyan border-cyan/40 bg-cyan/10", CONTACTED: "text-amber-300 border-amber-300/40 bg-amber-300/10", CLOSED: "text-muted border-line bg-white/[0.03]" };

export const TypeBadge = ({ t }: { t: string }) => <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider ${typeColor[t] ?? ""}`}>{t}</span>;
export const StatusBadge = ({ s }: { s: string }) => <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-wider ${statusColor[s] ?? ""}`}>{s}</span>;
export const Avatar = ({ name }: { name: string }) => <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-blue/70 to-violet/70 text-sm font-semibold">{name.trim()[0]?.toUpperCase()}</span>;

export const btnSolid = "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue to-violet px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue/20 transition hover:shadow-violet/30";
export const btnOutline = "inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm transition hover:border-muted/50 hover:bg-white/[0.04]";
