import Link from "next/link";
import { ProductCover } from "./ProductCover";
import { SampleBadge } from "./ui/Section";
import { TiltCard } from "./3d/TiltCard";
import { formatPrice } from "@/lib/purchase";
import { ArrowUpRight } from "lucide-react";

type P = { slug: string; name: string; tagline: string; icon: string; accentFrom: string; accentTo: string; isSample: boolean; priceINR: number | null; priceUSD: number | null; pricingModel: string; pricingNote: string | null; category: { name: string } };

export function ProductCard({ p }: { p: P }) {
  const price = formatPrice(p);
  return (
    <TiltCard className="h-full" max={7}>
      <Link href={`/products/${p.slug}`} className="preserve-3d group relative flex h-full flex-col rounded-2xl border border-line bg-gradient-to-b from-white/[0.05] to-white/[0.015] p-3 shadow-[0_24px_50px_-28px_rgb(0_0_0/1),inset_0_1px_0_rgb(255_255_255/0.06)] transition-colors duration-300 hover:border-violet/50">
        <div style={{ transform: "translateZ(34px)" }} className="shadow-[0_18px_30px_-14px_rgb(0_0_0/0.8)]">
          <ProductCover slug={p.slug} icon={p.icon} from={p.accentFrom} to={p.accentTo} name={p.name} className="transition duration-500 group-hover:brightness-125" />
        </div>
        <div className="flex flex-1 flex-col px-2 pb-2 pt-5" style={{ transform: "translateZ(14px)" }}>
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
    </TiltCard>
  );
}
