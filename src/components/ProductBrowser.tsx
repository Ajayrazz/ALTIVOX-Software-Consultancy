"use client";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ProductCard } from "./ProductCard";

type Item = Parameters<typeof ProductCard>[0]["p"] & { description: string; categorySlug: string };

export function ProductBrowser({ products, categories }: { products: Item[]; categories: { slug: string; name: string }[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return products.filter((p) => (cat === "all" || p.categorySlug === cat) && (!s || `${p.name} ${p.tagline} ${p.description}`.toLowerCase().includes(s)));
  }, [products, q, cat]);
  const chip = (active: boolean) => `rounded-full border px-4 py-2 text-sm transition ${active ? "border-transparent bg-fg text-ink" : "border-line text-muted hover:text-fg"}`;
  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
          <button className={chip(cat === "all")} onClick={() => setCat("all")} aria-pressed={cat === "all"}>All</button>
          {categories.map((c) => <button key={c.slug} className={chip(cat === c.slug)} onClick={() => setCat(c.slug)} aria-pressed={cat === c.slug}>{c.name}</button>)}
        </div>
        <label className="relative block lg:w-72">
          <span className="sr-only">Search products</span>
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products…" className="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue" />
        </label>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {list.map((p) => <ProductCard key={p.slug} p={p} />)}
      </div>
      {list.length === 0 && <p className="mt-16 text-center text-muted">No products match your search. Try another term or <a className="text-cyan underline" href="/contact">tell us what you need</a>.</p>}
    </div>
  );
}
