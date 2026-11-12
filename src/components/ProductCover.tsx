import { Icon } from "@/components/ui/Icon";
import { ProductArt, hasProductArt } from "./ProductArt";

/** Generated interface-style cover (no stock imagery). Real screenshots can replace it via admin. */
export function ProductCover({ icon, from, to, name, slug, className = "" }: { icon: string; from: string; to: string; name: string; slug?: string; className?: string }) {
  if (hasProductArt(slug)) return <ProductArt slug={slug!} from={from} to={to} name={name} className={className} />;
  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden rounded-xl border border-line ${className}`}
      style={{ background: `radial-gradient(120% 90% at 80% 0%, ${to}33, transparent 60%), radial-gradient(90% 80% at 0% 100%, ${from}2e, transparent 60%), #0E1017` }}
      role="img"
      aria-label={`${name} interface preview`}
    >
      <div className="absolute inset-x-4 top-4 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" /><span className="h-1.5 w-1.5 rounded-full bg-white/20" /><span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="ml-2 h-1.5 w-16 rounded bg-white/10" />
      </div>
      <div className="absolute inset-x-4 bottom-4 top-10 grid grid-cols-[22%_1fr] gap-3">
        <div className="space-y-2 rounded-lg bg-white/[0.04] p-2">
          {[70, 50, 60, 40].map((w, i) => <div key={i} className="h-1.5 rounded bg-white/15" style={{ width: `${w}%` }} />)}
        </div>
        <div className="grid grid-rows-[auto_1fr] gap-3">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg bg-white/[0.05] p-2">
                <div className="h-1 w-1/2 rounded bg-white/15" />
                <div className="mt-2 h-2.5 w-2/3 rounded" style={{ background: `linear-gradient(90deg, ${from}, ${to})`, opacity: 0.85 }} />
              </div>
            ))}
          </div>
          <div className="flex items-end gap-1.5 rounded-lg bg-white/[0.04] p-3">
            {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: `linear-gradient(to top, ${from}99, ${to}cc)` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute right-4 top-3 grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-ink/70 backdrop-blur" style={{ color: to }}>
        <Icon name={icon} size={18} />
      </div>
    </div>
  );
}
