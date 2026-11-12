import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { ProductBrowser } from "@/components/ProductBrowser";
import { getProducts, getCategories } from "@/lib/queries";
import { FinalCta } from "@/components/home/Sections";

export const revalidate = 300;
export const metadata: Metadata = { title: "Software Products", description: "Ready-to-use software for clinics, schools, stores, sales teams and more. Buy, request a demo or customise. By Altivox.", alternates: { canonical: "/products" } };

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const items = products.map((p) => ({ ...p, categorySlug: p.category.slug, faqs: undefined, createdAt: undefined, updatedAt: undefined })) as never;
  return (
    <>
      <PageHeader eyebrow="Products" title={<>Software you can start using <span className="text-gradient">this week.</span></>} intro="Purpose-built tools with transparent starter pricing. Buy online, request a demo, or ask us to tailor one to your business." />
      <Section className="!pt-12"><ProductBrowser products={items} categories={categories} />
        <p className="mt-10 text-xs text-muted">These are demonstration listings; prices are indicative starter prices in INR and USD and may change.</p></Section>
      <FinalCta />
    </>
  );
}
