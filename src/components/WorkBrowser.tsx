"use client";
import { useState } from "react";
import Link from "next/link";
import { SampleBadge } from "./ui/Section";

const labels: Record<string, string> = { WEB: "Web Development", MOBILE: "Mobile Applications", AI: "AI / ML", SAAS: "SaaS", AUTOMATION: "Automation", ENTERPRISE: "Enterprise Solutions" };
type P = { slug: string; title: string; summary: string; category: string; isSample: boolean; accentFrom: string; accentTo: string; tech: string[] };

export function WorkBrowser({ projects }: { projects: P[] }) {
  const [cat, setCat] = useState("ALL");
  const list = projects.filter((p) => cat === "ALL" || p.category === cat);
  const chip = (a: boolean) => `rounded-full border px-4 py-2 text-sm transition ${a ? "border-transparent bg-fg text-ink" : "border-line text-muted hover:text-fg"}`;
  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {["ALL", ...Object.keys(labels)].map((k) => <button key={k} className={chip(cat === k)} aria-pressed={cat === k} onClick={() => setCat(k)}>{k === "ALL" ? "All" : labels[k]}</button>)}
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="group rounded-2xl border border-line bg-surface/50 p-6 transition hover:border-violet/50">
            <div className="h-28 rounded-xl" style={{ background: `radial-gradient(120% 120% at 80% 0%, ${p.accentTo}55, transparent 60%), radial-gradient(100% 100% at 0% 100%, ${p.accentFrom}44, transparent 60%), #0E1017` }} />
            <div className="mt-5 flex items-center justify-between"><span className="eyebrow !text-[0.65rem]">{labels[p.category]}</span>{p.isSample && <SampleBadge />}</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
            <p className="mt-4 flex flex-wrap gap-1.5">{p.tech.map((t) => <span key={t} className="rounded-full border border-line px-2.5 py-1 text-xs text-muted">{t}</span>)}</p>
          </Link>
        ))}
      </div>
      {list.length === 0 && <p className="mt-12 text-center text-muted">No projects in this category yet.</p>}
    </>
  );
}
