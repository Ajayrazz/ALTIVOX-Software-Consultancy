import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getProject, getProjects } from "@/lib/queries";
import { PageHeader, Section, SampleBadge, btnPrimary } from "@/components/ui/Section";

export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProjects()).map((x) => ({ slug: x.slug }));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProject((await params).slug);
  return p ? { title: p.title, description: p.summary, alternates: { canonical: `/work/${p.slug}` } } : {};
}

export default async function CaseStudy({ params }: Props) {
  const p = await getProject((await params).slug);
  if (!p) notFound();
  return (
    <>
      <PageHeader eyebrow={`Case study · ${p.client}`} title={p.title} intro={p.summary}>{p.isSample && <div className="mt-6 flex items-center gap-3"><SampleBadge /><span className="text-sm text-muted">Illustrative demonstration, not a real client engagement.</span></div>}</PageHeader>
      <Section className="!py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div><h2 className="eyebrow">The problem</h2><p className="mt-4 text-xl leading-relaxed">{p.problem}</p></div>
          <div><h2 className="eyebrow">Our solution</h2><p className="mt-4 text-xl leading-relaxed">{p.solution}</p></div>
        </div>
        <div className="mt-14 grid gap-12 md:grid-cols-2">
          <div><h2 className="eyebrow">Major features</h2><ul className="mt-4 space-y-3">{p.features.map((f) => <li key={f} className="flex gap-3"><Check size={18} className="mt-1 text-cyan" />{f}</li>)}</ul></div>
          <div><h2 className="eyebrow">Technologies</h2><div className="mt-4 flex flex-wrap gap-2">{p.tech.map((t) => <span key={t} className="rounded-full border border-line px-3 py-1.5 text-sm">{t}</span>)}</div>
            {p.results ? <><h2 className="eyebrow mt-10">Results</h2><p className="mt-4">{p.results}</p></> : <p className="mt-10 text-sm text-muted">Verified results will be added when available.</p>}</div>
        </div>
        <div className="mt-16"><Link href="/quote" className={btnPrimary}>Start a similar project</Link></div>
      </Section>
    </>
  );
}
