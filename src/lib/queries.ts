import "server-only";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";

export const getCategories = () => db.productCategory.findMany({ orderBy: { name: "asc" } });

export const getProducts = (opts: { featured?: boolean; take?: number } = {}) =>
  db.product.findMany({
    where: { published: true, ...(opts.featured ? { featured: true } : {}) },
    include: { category: true },
    orderBy: [{ featured: "desc" }, { createdAt: "asc" }],
    take: opts.take,
  });

export const getProduct = (slug: string) =>
  unstable_cache(
    () => db.product.findFirst({ where: { slug, published: true }, include: { category: true } }),
    ["product", slug],
    { revalidate: 300, tags: ["content"] },
  )();

// Cached 5 min: used by the always-dynamic /contact page, so it must not hit the DB on every visit.
export const getServices = unstable_cache(
  () => db.service.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
  ["services-list"],
  { revalidate: 300, tags: ["content"] },
);
export const getService = (slug: string) => db.service.findFirst({ where: { slug, published: true } });

export const getIndustries = () => db.industry.findMany({ where: { published: true }, orderBy: { order: "asc" } });

export const getProjects = () => db.project.findMany({ where: { published: true }, orderBy: { createdAt: "asc" } });
export const getProject = (slug: string) => db.project.findFirst({ where: { slug, published: true } });

export const getPosts = () =>
  db.post.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" } });
export const getPost = (slug: string) => db.post.findFirst({ where: { slug, published: true } });
