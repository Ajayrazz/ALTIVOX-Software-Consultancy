import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/queries";
import { Section } from "@/components/ui/Section";
import { Markdownish } from "@/components/Markdownish";
import { ShareLinks } from "@/components/ShareLinks";

export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((x) => ({ slug: x.slug }));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getPost((await params).slug);
  return p ? { title: p.title, description: p.excerpt, alternates: { canonical: `/blog/${p.slug}` }, openGraph: { type: "article", title: p.title, description: p.excerpt } } : {};
}

export default async function PostPage({ params }: Props) {
  const p = await getPost((await params).slug);
  if (!p) notFound();
  const ld = { "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.excerpt, datePublished: p.publishedAt?.toISOString(), author: { "@type": "Organization", name: "Altivox" } };
  return (
    <Section className="max-w-3xl !pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      <Link href="/blog" className="eyebrow hover:text-fg">← Insights</Link>
      <p className="eyebrow mt-8">{p.category} · {p.readMinutes} min read</p>
      <h1 className="mt-4 text-4xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">{p.title}</h1>
      <p className="mt-6 text-xl text-muted">{p.excerpt}</p>
      <div className="mt-12"><Markdownish text={p.content} /></div>
      <div className="mt-14 border-t border-line pt-6"><ShareLinks path={`/blog/${p.slug}`} title={p.title} /></div>
    </Section>
  );
}
