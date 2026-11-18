import Link from "next/link";
import { Inbox, Mail, Package, FileText, Plus, ArrowUpRight, Star } from "lucide-react";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { TiltCard } from "@/components/3d/TiltCard";
import { CountUp } from "@/components/admin/CountUp";
import { ActivityChart } from "@/components/admin/ActivityChart";
import { AdminHeader, Panel, Avatar, TypeBadge, StatusBadge, btnSolid, btnOutline } from "@/components/admin/ui";
import { Reveal } from "@/components/ui/Reveal";

export const dynamic = "force-dynamic";

const DAY = 86400000;
const key = (d: Date) => d.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

export default async function AdminHome() {
  await requireAdmin();
  const since = new Date(Date.now() - 13 * DAY);
  since.setHours(0, 0, 0, 0);
  const [newEnq, total, products, featured, posts, recent, last14, byType] = await Promise.all([
    db.enquiry.count({ where: { status: "NEW" } }), db.enquiry.count(), db.product.count(), db.product.count({ where: { featured: true } }), db.post.count(),
    db.enquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    db.enquiry.findMany({ where: { createdAt: { gte: since } }, select: { createdAt: true } }),
    db.enquiry.groupBy({ by: ["type"], _count: true }),
  ]);
  const days = Array.from({ length: 14 }, (_, i) => new Date(Date.now() - (13 - i) * DAY));
  const chart = days.map((d) => ({ label: d.toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "Asia/Kolkata" }), count: last14.filter((e) => key(e.createdAt) === key(d)).length }));
  const week = chart.slice(7).reduce((a, b) => a + b.count, 0);
  const typeMax = Math.max(1, ...byType.map((t) => t._count));

  const stats = [
    { label: "New enquiries", value: newEnq, note: `${week} in the last 7 days`, icon: Inbox, href: "/admin/enquiries?status=NEW", grad: "from-blue to-cyan" },
    { label: "Total enquiries", value: total, note: "All time", icon: Mail, href: "/admin/enquiries", grad: "from-violet to-blue" },
    { label: "Products", value: products, note: `${featured} featured`, icon: Package, href: "/admin/products", grad: "from-cyan to-violet" },
    { label: "Articles", value: posts, note: "Insights blog", icon: FileText, href: "/admin/posts", grad: "from-blue to-violet" },
  ];

  return (
    <div>
      <AdminHeader title="Welcome back" sub="Here's what's happening across Altivox." action={
        <div className="flex gap-2"><Link href="/admin/products/new" className={btnSolid}><Plus size={16} />New product</Link><Link href="/admin/posts/new" className={btnOutline}><Plus size={16} />New post</Link></div>} />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07}>
            <TiltCard>
              <Link href={s.href} className="group relative block overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-6 shadow-[0_24px_50px_-28px_rgb(0_0_0/1),inset_0_1px_0_rgb(255_255_255/0.07)]" style={{ transformStyle: "preserve-3d" }}>
                <div aria-hidden className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${s.grad} opacity-20 blur-2xl transition group-hover:opacity-40`} />
                <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${s.grad} shadow-lg shadow-blue/20`} style={{ transform: "translateZ(40px)" }}><s.icon size={20} className="text-ink" /></span>
                <p className="eyebrow mt-6">{s.label}</p>
                <p className="mt-1 text-5xl font-semibold tracking-tight" style={{ transform: "translateZ(30px)" }}><CountUp value={s.value} /></p>
                <p className="mt-3 flex items-center justify-between text-sm text-muted">{s.note}<ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" /></p>
              </Link>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <Panel className="p-6" delay={0.1}>
          <div className="mb-6 flex items-center justify-between"><div><h2 className="font-semibold">Enquiry activity</h2><p className="text-sm text-muted">Last 14 days</p></div><span className="eyebrow">{chart.reduce((a, b) => a + b.count, 0)} total</span></div>
          <ActivityChart data={chart} />
        </Panel>
        <Panel className="p-6" delay={0.18}>
          <h2 className="font-semibold">By type</h2><p className="text-sm text-muted">Where enquiries come from</p>
          <div className="mt-6 space-y-5">
            {["CONTACT", "QUOTE", "PRODUCT", "DEMO"].map((t) => {
              const n = byType.find((b) => b.type === t)?._count ?? 0;
              return <div key={t}><div className="mb-2 flex items-center justify-between"><TypeBadge t={t} /><span className="font-mono text-sm">{n}</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-gradient-to-r from-blue to-violet transition-all duration-1000" style={{ width: `${(n / typeMax) * 100}%` }} /></div></div>;
            })}
          </div>
        </Panel>
      </div>

      <Panel className="mt-6" delay={0.1}>
        <div className="flex items-center justify-between border-b border-line p-6"><div><h2 className="font-semibold">Recent enquiries</h2><p className="text-sm text-muted">Latest messages from the website</p></div><Link href="/admin/enquiries" className="text-sm text-cyan hover:underline">View all</Link></div>
        <ul className="divide-y divide-line">
          {recent.map((e) => (
            <li key={e.id}><Link href="/admin/enquiries" className="flex items-center gap-4 px-6 py-4 transition hover:bg-white/[0.03]">
              <Avatar name={e.name} />
              <span className="min-w-0 flex-1"><span className="block truncate font-medium">{e.name}</span><span className="block truncate text-sm text-muted">{e.message}</span></span>
              <span className="hidden items-center gap-2 sm:flex"><TypeBadge t={e.type} /><StatusBadge s={e.status} /></span>
              <span className="hidden text-xs text-muted md:block">{e.createdAt.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
            </Link></li>
          ))}
          {recent.length === 0 && <li className="p-10 text-center text-muted">No enquiries yet. They'll appear here as soon as someone writes in.</li>}
        </ul>
      </Panel>
      <p className="mt-8 flex items-center gap-2 text-xs text-muted"><Star size={12} className="text-cyan" />Demo products and sample case studies are marked on the public site until you replace them.</p>
    </div>
  );
}
