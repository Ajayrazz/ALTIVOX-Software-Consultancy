import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section, btnPrimary } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { getIndustries } from "@/lib/queries";

export const revalidate = 300;
export const metadata: Metadata = { title: "Industries We Serve", description: "Software solutions for healthcare, education, e-commerce, finance, logistics, real estate, retail, startups and professional services.", alternates: { canonical: "/industries" } };

const List = ({ title, items }: { title: string; items: string[] }) => (
  <div><h3 className="eyebrow">{title}</h3><ul className="mt-3 space-y-1.5 text-[0.95rem] text-fg/90">{items.map((i) => <li key={i} className="flex gap-2"><span className="text-violet">›</span>{i}</li>)}</ul></div>
);

export default async function IndustriesPage() {
  const list = await getIndustries();
  return (
    <>
      <PageHeader eyebrow="Industries" title={<>Software shaped by <span className="text-gradient">your industry.</span></>} intro="Every sector has its own challenges. Here is where we can help." />
      <Section className="!pt-12">
        <div className="space-y-6">
          {list.map((i) => (
            <article key={i.slug} id={i.slug} className="scroll-mt-28 rounded-2xl border border-line bg-surface/40 p-7 sm:p-10">
              <div className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-xl border border-line text-cyan"><Icon name={i.icon} size={22} /></span><div><h2 className="text-2xl font-semibold tracking-tight">{i.name}</h2><p className="text-muted">{i.summary}</p></div></div>
              <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <List title="Common challenges" items={i.challenges} />
                <List title="Solutions we build" items={i.solutions} />
                <List title="Automation" items={i.automation} />
                <List title="Business benefits" items={i.benefits} />
              </div>
              <p className="mt-8 flex flex-wrap items-center gap-2 text-sm text-muted">Technologies: {i.tech.map((t) => <span key={t} className="rounded-full border border-line px-3 py-1 text-fg">{t}</span>)}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center"><p className="text-muted">Don&apos;t see your industry? We work across sectors.</p><Link href="/contact" className={`${btnPrimary} mt-5`}>Tell us about your business</Link></div>
      </Section>
    </>
  );
}
