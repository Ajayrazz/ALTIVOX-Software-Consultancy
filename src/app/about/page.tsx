import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section, btnPrimary, btnGhost } from "@/components/ui/Section";

export const metadata: Metadata = { title: "About Altivox", description: "Altivox is a software consultancy building custom software, AI solutions and software products for growing businesses.", alternates: { canonical: "/about" } };

const values = [
  ["Clarity over jargon", "We explain technical decisions in plain language, so you stay in control."],
  ["Outcomes over output", "Features matter only if they move a business number you care about."],
  ["Craft and care", "Clean code, thoughtful design and careful testing are non-negotiable."],
  ["Honest partnership", "Realistic timelines, upfront trade-offs, no surprises."],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About" title={<>Elevating ideas. <span className="text-gradient">Engineering innovation.</span></>} intro="Altivox is a software consultancy and product studio. We help businesses turn operational problems and bold ideas into software that works." />
      <Section className="!py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div><h2 className="eyebrow">Mission</h2><p className="mt-4 text-2xl font-medium leading-snug tracking-tight">To make high-quality software accessible to businesses of every size, solving real problems with practical technology.</p></div>
          <div><h2 className="eyebrow">Vision</h2><p className="mt-4 text-2xl font-medium leading-snug tracking-tight">To be the technology partner businesses trust to build, automate and grow, with products and services that earn long-term relationships.</p></div>
        </div>
      </Section>
      <Section className="!py-16">
        <h2 className="eyebrow">What we stand for</h2>
        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {values.map(([t, d]) => <div key={t} className="bg-ink p-8"><h3 className="text-xl font-semibold tracking-tight">{t}</h3><p className="mt-2 text-muted">{d}</p></div>)}
        </div>
      </Section>
      <Section className="!py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div><h2 className="eyebrow">Our approach to technology</h2><p className="mt-4 leading-relaxed text-muted">We choose the simplest stack that meets your needs, favouring proven tools like React, Next.js, TypeScript, Node.js, Python and PostgreSQL. We keep architecture clean, costs predictable and systems easy to maintain.</p></div>
          <div><h2 className="eyebrow">Our commitment to clients</h2><p className="mt-4 leading-relaxed text-muted">You get a clear scope, regular demos, a single point of contact and support after launch. We build two ways, tailored projects for your business and ready-made products you can start using quickly.</p></div>
        </div>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row"><Link href="/quote" className={btnPrimary}>Start a project</Link><Link href="/products" className={btnGhost}>See our products</Link></div>
      </Section>
    </>
  );
}
