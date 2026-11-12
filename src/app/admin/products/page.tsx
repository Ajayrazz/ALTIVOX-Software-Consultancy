import Link from "next/link";
import { Plus, Pencil, Star } from "lucide-react";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { toggleProduct } from "@/actions/admin";
import { ProductCover } from "@/components/ProductCover";
import { AdminHeader, Panel, btnSolid } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AdminProducts() {
  await requireAdmin();
  const list = await db.product.findMany({ include: { category: true }, orderBy: { createdAt: "asc" } });
  return (
    <div>
      <AdminHeader title="Products" sub={`${list.length} products · ${list.filter((p) => p.published).length} published`} action={<Link href="/admin/products/new" className={btnSolid}><Plus size={16} />New product</Link>} />
      <div className="space-y-3">
        {list.map((p, i) => (
          <Panel key={p.id} delay={Math.min(i, 6) * 0.04}>
            <div className="flex flex-wrap items-center gap-4 p-4 sm:gap-6">
              <ProductCover slug={p.slug} icon={p.icon} from={p.accentFrom} to={p.accentTo} name={p.name} className="w-32 shrink-0 sm:w-40" />
              <div className="min-w-0 flex-1 basis-48">
                <Link href={`/admin/products/${p.id}`} className="flex items-center gap-2 text-lg font-semibold tracking-tight hover:text-cyan">{p.name}{p.featured && <Star size={15} className="fill-cyan text-cyan" />}</Link>
                <p className="text-sm text-muted">{p.category.name}</p>
                <p className="mt-1 font-mono text-sm">{p.priceINR != null ? `₹${p.priceINR.toLocaleString("en-IN")}` : "—"} <span className="text-muted">/ {p.priceUSD != null ? `$${p.priceUSD}` : "—"}{p.pricingModel === "MONTHLY" ? " per month" : ""}</span></p>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <form action={toggleProduct.bind(null, p.id, "featured")}><button className={`rounded-full border px-3.5 py-1.5 transition ${p.featured ? "border-cyan/50 bg-cyan/10 text-cyan" : "border-line text-muted hover:text-fg"}`}>{p.featured ? "Featured" : "Feature"}</button></form>
                <form action={toggleProduct.bind(null, p.id, "published")}><button className={`rounded-full border px-3.5 py-1.5 transition ${p.published ? "border-blue/50 bg-blue/10 text-blue" : "border-line text-muted hover:text-fg"}`}>{p.published ? "Published" : "Draft"}</button></form>
                <Link href={`/admin/products/${p.id}`} className="inline-flex items-center gap-1.5 rounded-full bg-fg px-4 py-1.5 font-medium text-ink transition hover:bg-white"><Pencil size={13} />Edit</Link>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </div>
  );
}
