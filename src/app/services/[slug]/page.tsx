import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getService, getServices, getProjects } from "@/lib/queries";
import { PageHeader, Section, btnPrimary, btnGhost, SampleBadge } from "@/components/ui/Section";

export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getServices()).map((x) => ({ slug: x.slug }));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = await getService((await params).slug);
  return s ? { title: s.name, description: s.summary, alternates: { canonical: `/services/${s.slug}` } } : {};
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = await getService(slug);
  if (!s) notFound();
  const related = (await getProjects()).slice(0, 2);
  return (
    <>
      <PageHeader eyebrow="Service" title={s.name} intro={s.summary}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href={`/quote?service=${s.slug}`} className={btnPrimary}>Get a quote</Link><Link href="/contact" className={btnGhost}>Talk to us</Link></div>
      </PageHeader>
      <Section className="!py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div><h2 className="eyebrow">Problems it solves</h2><ul className="mt-5 space-y-3">{s.problems.map((x) => <li key={x} className="flex gap-3 text-lg"><Check className="mt-1 shrink-0 text-violet" size={18} />{x}</li>)}</ul></div>
          <div><h2 className="eyebrow">What we deliver</h2><ul className="mt-5 space-y-3">{s.deliverables.map((x) => <li key={x} className="flex gap-3 text-lg"><Check className="mt-1 shrink-0 text-cyan" size={18} />{x}</li>)}</ul></div>
        </div>
      </Section>
      <Section className="!py-8">
        <div className="grid gap-8 rounded-2xl border border-line bg-surface/50 p-8 md:grid-cols-2">
          <div><h2 className="eyebrow">Our approach</h2><p className="mt-4 text-lg leading-relaxed">{s.approach}</p></div>
          <div><h2 className="eyebrow">Technologies</h2><div className="mt-4 flex flex-wrap gap-2">{s.technologies.map((t) => <span key={t} className="rounded-full border border-line px-3 py-1.5 text-sm">{t}</span>)}</div></div>
        </div>
      </Section>
      <Section className="!py-16">
        <h2 className="mb-6 text-2xl font-semibold">Related work</h2>
        <div className="grid gap-5 md:grid-cols-2">{related.map((p) => <Link key={p.slug} href={`/work/${p.slug}`} className="rounded-2xl border border-line p-6 transition hover:border-violet/50"><SampleBadge /><h3 className="mt-3 text-lg font-semibold">{p.title}</h3><p className="mt-1 text-sm text-muted">{p.summary}</p></Link>)}</div>
      </Section>
    </>
  );
}
