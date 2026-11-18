"use client";
import { ProductCover } from "./ProductCover";
import { TiltCard } from "./3d/TiltCard";

/** Product cover on a tilting 3D card with floating info chips at different depths. */
export function ProductHero3D({ slug, icon, from, to, name, category, price }: { slug: string; icon: string; from: string; to: string; name: string; category: string; price: string }) {
  return (
    <TiltCard max={10} className="mx-auto w-full max-w-xl">
      <div className="preserve-3d relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-3 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.95),inset_0_1px_0_rgb(255_255_255/0.1)]">
        <div style={{ transform: "translateZ(40px)" }} className="shadow-[0_30px_50px_-20px_rgb(0_0_0/0.9)]">
          <ProductCover slug={slug} icon={icon} from={from} to={to} name={name} />
        </div>
        <span style={{ transform: "translateZ(90px)" }} className="absolute -right-3 -top-4 rounded-full border border-white/15 bg-ink/85 px-4 py-1.5 text-xs shadow-xl shadow-black/50 backdrop-blur"><span className="eyebrow !text-[0.6rem]">{category}</span></span>
        <span style={{ transform: "translateZ(110px)" }} className="absolute -bottom-5 left-6 rounded-2xl border border-white/15 bg-gradient-to-r from-blue to-violet px-5 py-2.5 text-sm font-semibold text-white shadow-xl shadow-blue/30">{price}</span>
      </div>
    </TiltCard>
  );
}
