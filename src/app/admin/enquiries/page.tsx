import Link from "next/link";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { setEnquiryStatus } from "@/actions/admin";
import { AdminHeader, Panel, Avatar, TypeBadge, StatusBadge } from "@/components/admin/ui";
import { Mail, Phone, Building2 } from "lucide-react";

export const dynamic = "force-dynamic";
const tabs = ["ALL", "NEW", "CONTACTED", "CLOSED"] as const;

export default async function EnquiriesPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireAdmin();
  const { status } = await searchParams;
  const active = tabs.includes(status as never) ? (status as (typeof tabs)[number]) : "ALL";
  const [list, counts] = await Promise.all([
    db.enquiry.findMany({ where: active === "ALL" ? {} : { status: active }, orderBy: { createdAt: "desc" }, take: 200 }),
    db.enquiry.groupBy({ by: ["status"], _count: true }),
  ]);
  const count = (t: string) => t === "ALL" ? counts.reduce((a, b) => a + b._count, 0) : counts.find((c) => c.status === t)?._count ?? 0;

  return (
    <div>
      <AdminHeader title="Enquiries" sub="Messages and quote requests from the website." />
      <div className="mb-6 flex flex-wrap gap-2" role="tablist">
        {tabs.map((t) => <Link key={t} href={t === "ALL" ? "/admin/enquiries" : `/admin/enquiries?status=${t}`} className={`rounded-full border px-4 py-2 text-sm transition ${active === t ? "border-transparent bg-fg text-ink" : "border-line text-muted hover:text-fg"}`}>{t === "ALL" ? "All" : t[0] + t.slice(1).toLowerCase()} <span className="ml-1 font-mono text-xs opacity-70">{count(t)}</span></Link>)}
      </div>
      <div className="space-y-4">
        {list.map((e, i) => (
          <Panel key={e.id} className="p-5 sm:p-6" delay={Math.min(i, 6) * 0.04}>
            <div className="flex flex-wrap items-start gap-4">
              <Avatar name={e.name} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2"><h2 className="font-semibold">{e.name}</h2><TypeBadge t={e.type} /><StatusBadge s={e.status} /></div>
                <p className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                  <a href={`mailto:${e.email}`} className="inline-flex items-center gap-1.5 hover:text-cyan"><Mail size={14} />{e.email}</a>
                  {e.phone && <span className="inline-flex items-center gap-1.5"><Phone size={14} />{e.phone}</span>}
                  {e.company && <span className="inline-flex items-center gap-1.5"><Building2 size={14} />{e.company}</span>}
                </p>
              </div>
              <form action={setEnquiryStatus.bind(null, e.id)} className="flex items-center gap-2">
                <select name="status" defaultValue={e.status} aria-label="Status" className="rounded-lg border border-line bg-ink px-2.5 py-2 text-sm">{["NEW", "CONTACTED", "CLOSED"].map((s) => <option key={s}>{s}</option>)}</select>
                <button className="rounded-lg bg-fg px-3.5 py-2 text-sm font-medium text-ink transition hover:bg-white">Save</button>
              </form>
            </div>
            <p className="mt-5 whitespace-pre-wrap rounded-xl border border-line bg-ink/60 p-4 text-[0.95rem] leading-relaxed">{e.message}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
              {[e.service, e.budget, e.timeline, e.contactPref && `Prefers ${e.contactPref}`, e.productSlug && `Product: ${e.productSlug}`].filter(Boolean).map((t) => <span key={t as string} className="rounded-full border border-line px-2.5 py-1">{t}</span>)}
              {e.meta && Object.entries(e.meta as Record<string, string>).filter(([, v]) => v.trim()).map(([k, v]) => <span key={k} className={`rounded-full border px-2.5 py-1 ${k.startsWith("feature") ? "border-violet/40 bg-violet/10 text-fg" : "border-line"}`}>{k.startsWith("feature") ? v : `${k}: ${v}`}</span>)}
              <span className="ml-auto font-mono">{e.createdAt.toLocaleString("en-IN")}</span>
            </div>
          </Panel>
        ))}
        {list.length === 0 && <Panel className="p-14 text-center text-muted">Nothing here yet.</Panel>}
      </div>
    </div>
  );
}
