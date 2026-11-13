"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";

const lines = (s: FormDataEntryValue | null) => String(s ?? "").split("\n").map((x) => x.trim()).filter(Boolean);
const num = (s: FormDataEntryValue | null) => { const n = parseInt(String(s ?? ""), 10); return Number.isFinite(n) ? n : null; };
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const bust = () => { revalidateTag("content", "max"); for (const p of ["/", "/products", "/blog", "/work", "/services", "/sitemap.xml"]) revalidatePath(p); revalidatePath("/products/[slug]", "page"); revalidatePath("/blog/[slug]", "page"); };

const productSchema = z.object({
  name: z.string().trim().min(2).max(80), tagline: z.string().trim().min(2).max(160),
  description: z.string().trim().min(10).max(2000), problem: z.string().trim().max(1000), audience: z.string().trim().max(500),
  categoryId: z.string().min(1), purchaseAction: z.enum(["BUY_NOW", "DEMO", "WHATSAPP", "INSTAGRAM", "CUSTOMIZATION"]),
  pricingModel: z.enum(["ONE_TIME", "MONTHLY", "CUSTOM"]),
});

export async function saveProduct(id: string | null, fd: FormData) {
  await requireAdmin();
  const base = productSchema.parse(Object.fromEntries(fd));
  const buyUrl = String(fd.get("buyUrl") ?? "").trim();
  if (buyUrl && !/^https:\/\//.test(buyUrl)) throw new Error("Buy URL must start with https://");
  const data = {
    ...base, icon: String(fd.get("icon") || "box"), pricingNote: String(fd.get("pricingNote") ?? "") || null,
    features: lines(fd.get("features")), benefits: lines(fd.get("benefits")), screenshots: lines(fd.get("screenshots")).filter((u) => /^https:\/\//.test(u)),
    demoVideoUrl: String(fd.get("demoVideoUrl") ?? "").startsWith("https://") ? String(fd.get("demoVideoUrl")) : null,
    priceINR: num(fd.get("priceINR")), priceUSD: num(fd.get("priceUSD")), buyUrl: buyUrl || null,
    featured: fd.get("featured") === "on", published: fd.get("published") === "on", isSample: fd.get("isSample") === "on",
  };
  if (id) await db.product.update({ where: { id }, data });
  else await db.product.create({ data: { ...data, slug: slugify(base.name), faqs: [] } });
  bust();
  redirect("/admin/products");
}
export async function deleteProduct(id: string) { await requireAdmin(); await db.product.delete({ where: { id } }); bust(); redirect("/admin/products"); }

export async function savePost(id: string | null, fd: FormData) {
  await requireAdmin();
  const d = z.object({ title: z.string().trim().min(3).max(160), excerpt: z.string().trim().min(10).max(400), content: z.string().trim().min(20).max(50000), category: z.string().trim().min(2).max(60) }).parse(Object.fromEntries(fd));
  const published = fd.get("published") === "on";
  const data = { ...d, readMinutes: Math.max(1, Math.round(d.content.split(/\s+/).length / 200)), published, ...(published ? { publishedAt: new Date() } : {}) };
  if (id) await db.post.update({ where: { id }, data }); else await db.post.create({ data: { ...data, slug: slugify(d.title) } });
  bust();
  redirect("/admin/posts");
}
export async function deletePost(id: string) { await requireAdmin(); await db.post.delete({ where: { id } }); bust(); redirect("/admin/posts"); }

export async function setEnquiryStatus(id: string, fd: FormData) {
  await requireAdmin();
  const status = z.enum(["NEW", "CONTACTED", "CLOSED"]).parse(fd.get("status"));
  await db.enquiry.update({ where: { id }, data: { status } });
  revalidatePath("/admin/enquiries");
}
export async function toggleProduct(id: string, field: "featured" | "published") {
  await requireAdmin();
  const p = await db.product.findUniqueOrThrow({ where: { id } });
  await db.product.update({ where: { id }, data: { [field]: !p[field] } });
  bust(); revalidatePath("/admin/products");
}
