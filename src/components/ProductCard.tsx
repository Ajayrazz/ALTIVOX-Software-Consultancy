import Link from "next/link";
import { ProductCover } from "./ProductCover";
import { SampleBadge } from "./ui/Section";
import { formatPrice } from "@/lib/purchase";
import { ArrowUpRight } from "lucide-react";

type P = { slug: string; name: string; tagline: string; icon: string; accentFrom: string; accentTo: string; isSample: boolean; priceINR: number | null; priceUSD: number | null; pricingModel: string; pricingNote: string | null; category: { name: string } };

export function ProductCard({ p }: { p: P }) {
  const price = formatPrice(p);
  return (
    <Link href={`/products/${p.slug}`} className="group relative flex flex-col rounded-2xl border border-line bg-surface/60 p-3 transition duration-300 hover:-translate-y-1 hover:border-violet/50 hover:bg-raised/60">
      <ProductCover slug={p.slug} icon={p.icon} from={p.accentFrom} to={p.accentTo} name={p.name} className="transition duration-500 group-hover:brightness-125" />
      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <div className="flex items-center justify-between gap-2">
          <span className="eyebrow !text-[0.65rem]">{p.category.name}</span>
          {p.isSample && <SampleBadge label="Demo" />}
        </div>
        <h3 className="mt-3 flex items-center justify-between text-xl font-semibold tracking-tight">
          {p.name}
          <ArrowUpRight size={18} className="text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cyan" />
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.tagline}</p>
        <p className="mt-5 flex items-baseline gap-2 border-t border-line pt-4">
          <span className="font-semibold">{price.main}</span>
          <span className="text-xs text-muted">{price.sub}</span>
        </p>
      </div>
    </Link>
  );
}
