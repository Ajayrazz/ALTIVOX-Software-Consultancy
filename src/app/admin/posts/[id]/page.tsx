import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { savePost, deletePost } from "@/actions/admin";
import { Field, Input, Textarea } from "@/components/forms/fields";

export const dynamic = "force-dynamic";

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const isNew = id === "new";
  const p = isNew ? null : await db.post.findUnique({ where: { id } });
  if (!isNew && !p) notFound();
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">{isNew ? "New post" : "Edit post"}</h1>
      <form action={savePost.bind(null, isNew ? null : id)} className="mt-8 space-y-5 rounded-2xl border border-line bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.05)] sm:p-8">
        <Field label="Title" name="title"><Input name="title" defaultValue={p?.title} required /></Field>
        <Field label="Category" name="category"><Input name="category" defaultValue={p?.category} required /></Field>
        <Field label="Excerpt" name="excerpt"><Textarea name="excerpt" defaultValue={p?.excerpt} required /></Field>
        <Field label="Content (use “## ” for headings; blank line between paragraphs)" name="content"><Textarea name="content" defaultValue={p?.content} required /></Field>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="published" defaultChecked={p?.published} /> Published</label>
        <button className="rounded-full bg-gradient-to-r from-blue to-violet px-6 py-3 font-medium text-white">Save post</button>
      </form>
      {!isNew && <form action={deletePost.bind(null, id)} className="mt-10 border-t border-line pt-6"><button className="text-sm text-red-400 hover:underline">Delete this post</button></form>}
    </div>
  );
}
