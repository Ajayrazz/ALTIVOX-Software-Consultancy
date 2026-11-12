import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { AdminHeader, Panel, btnSolid } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AdminPosts() {
  await requireAdmin();
  const list = await db.post.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <AdminHeader title="Posts" sub="Articles shown on the Insights page." action={<Link href="/admin/posts/new" className={btnSolid}><Plus size={16} />New post</Link>} />
      <div className="space-y-3">
        {list.map((p, i) => (
          <Panel key={p.id} delay={Math.min(i, 6) * 0.04}>
            <Link href={`/admin/posts/${p.id}`} className="flex flex-wrap items-center gap-4 p-5 transition hover:bg-white/[0.03]">
              <div className="min-w-0 flex-1 basis-64"><p className="eyebrow !text-[0.62rem]">{p.category} · {p.readMinutes} min</p><h2 className="mt-1.5 text-lg font-semibold tracking-tight">{p.title}</h2></div>
              <span className={`rounded-full border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider ${p.published ? "border-blue/50 bg-blue/10 text-blue" : "border-line text-muted"}`}>{p.published ? "Published" : "Draft"}</span>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted"><Pencil size={14} />Edit</span>
            </Link>
          </Panel>
        ))}
        {list.length === 0 && <Panel className="p-14 text-center text-muted">No posts yet. Write your first one.</Panel>}
      </div>
    </div>
  );
}
