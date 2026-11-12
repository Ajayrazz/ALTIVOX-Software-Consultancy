import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { db } from "@/lib/db";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, services, projects, posts] = await Promise.all([
    db.product.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    db.service.findMany({ where: { published: true }, select: { slug: true } }),
    db.project.findMany({ where: { published: true }, select: { slug: true } }),
    db.post.findMany({ where: { published: true }, select: { slug: true, publishedAt: true } }),
  ]);
  const u = (p: string, priority = 0.6, d?: Date | null) => ({ url: `${site.url}${p}`, priority, ...(d ? { lastModified: d } : {}) });
  return [
    u("/", 1), u("/services", 0.9), u("/products", 0.9), u("/industries"), u("/work"), u("/about"), u("/blog"), u("/contact", 0.8), u("/quote", 0.8), u("/faq", 0.5),
    ...services.map((s) => u(`/services/${s.slug}`, 0.7)),
    ...products.map((p) => u(`/products/${p.slug}`, 0.8, p.updatedAt)),
    ...projects.map((p) => u(`/work/${p.slug}`, 0.5)),
    ...posts.map((p) => u(`/blog/${p.slug}`, 0.6, p.publishedAt)),
  ];
}
