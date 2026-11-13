import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getProduct, getProducts } from "@/lib/queries";
import { ProductCover } from "@/components/ProductCover";
import { ProductCard } from "@/components/ProductCard";
import { Section, SampleBadge, btnPrimary, btnGhost } from "@/components/ui/Section";
import { FaqList } from "@/components/home/Sections";
import { formatPrice, purchaseCta } from "@/lib/purchase";
import { site } from "@/lib/site";
import { ShareLinks } from "@/components/ShareLinks";

export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProducts()).map((x) => ({ slug: x.slug }));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProduct((await params).slug);
  if (!p) return {};
  return { title: `${p.name}: ${p.tagline}`, description: p.description, alternates: { canonical: `/products/${p.slug}` }, openGraph: { title: p.name, description: p.description } };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();
  const price = formatPrice(p);
  const cta = purchaseCta(p);
  const faqs = (p.faqs as { q: string; a: string }[]) ?? [];
  const related = (await getProducts()).filter((x) => x.slug !== p.slug && x.category.id === p.categoryId).slice(0, 3);
  const ld = { "@context": "https://schema.org", "@type": "SoftwareApplication", name: p.name, description: p.description, applicationCategory: "BusinessApplication", ...(p.priceUSD != null ? { offers: { "@type": "Offer", price: p.priceUSD, priceCurrency: "USD" } } : {}) };
  const support = site.contact.email ? `mailto:${site.contact.email}?subject=${encodeURIComponent(`Support: ${p.name}`)}` : "/contact";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <section className="relative overflow-hidden border-b border-line pt-28 sm:pt-36">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 sm:px-8 lg:grid-cols-2">
          <div>
            <nav aria-label="Breadcrumb" className="eyebrow"><Link href="/products" className="hover:text-fg">Products</Link> / {p.category.name}</nav>
            <div className="mt-5 flex items-center gap-3"><h1 className="text-4xl font-semibold tracking-[-0.035em] sm:text-6xl">{p.name}</h1>{p.isSample && <SampleBadge label="Demo" />}</div>
            <p className="mt-4 text-xl text-fg/90">{p.tagline}</p>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">{p.description}</p>
            <div className="mt-8 flex items-baseline gap-3"><span className="text-3xl font-semibold">{price.main}</span><span className="text-muted">{price.sub}</span></div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {cta && (cta.external ? <a href={cta.href} target="_blank" rel="noopener noreferrer" className={btnPrimary}>{cta.label}</a> : <Link href={cta.href} className={btnPrimary}>{cta.label}</Link>)}
              <Link href={`/quote?product=${p.slug}`} className={btnGhost}>Request customisation</Link>
            </div>
            <div className="mt-6"><ShareLinks path={`/products/${p.slug}`} title={p.name} /></div>
          </div>
          <ProductCover slug={p.slug} icon={p.icon} from={p.accentFrom} to={p.accentTo} name={p.name} className="shadow-2xl shadow-black/40" />
        </div>
      </section>

      <Section className="!py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div><p className="eyebrow">The problem</p><p className="mt-4 text-lg leading-relaxed">{p.problem}</p></div>
          <div><p className="eyebrow">Who it&apos;s for</p><p className="mt-4 text-lg leading-relaxed">{p.audience}</p></div>
          <div><p className="eyebrow">Benefits</p><ul className="mt-4 space-y-2">{p.benefits.map((b) => <li key={b} className="flex gap-3 text-lg"><Check className="mt-1 shrink-0 text-cyan" size={18} />{b}</li>)}</ul></div>
        </div>
      </Section>

      <Section className="!py-16">
        <h2 className="text-3xl font-semibold tracking-[-0.03em]">Features</h2>
        <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {p.features.map((f) => <li key={f} className="bg-ink p-6 text-[0.95rem]"><Check size={16} className="mb-3 text-violet" />{f}</li>)}
        </ul>
        <p className="mt-4 text-xs text-muted">Screenshots and demo video are shared during your demo. Interface preview above is illustrative.</p>
      </Section>

      {faqs.length > 0 && <Section className="!py-16"><h2 className="mb-8 text-3xl font-semibold tracking-[-0.03em]">{p.name} FAQ</h2><FaqList items={faqs} /></Section>}

      <Section className="!py-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-surface p-8 sm:flex-row sm:items-center">
          <div><h2 className="text-2xl font-semibold">Questions about {p.name}?</h2><p className="mt-1 text-muted">Talk to us before you decide. We&apos;re happy to help.</p></div>
          <div className="flex flex-wrap gap-3">{cta && (cta.external ? <a href={cta.href} target="_blank" rel="noopener noreferrer" className={btnPrimary}>{cta.label}</a> : <Link href={cta.href} className={btnPrimary}>{cta.label}</Link>)}<a href={support} className={btnGhost}>Contact support</a></div>
        </div>
      </Section>

      {related.length > 0 && <Section className="!pt-4"><h2 className="mb-8 text-2xl font-semibold">Related products</h2><div className="grid gap-5 md:grid-cols-3">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div></Section>}
    </>
  );
}
