import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading, btnPrimary, btnGhost, SampleBadge } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ProductCard } from "@/components/ProductCard";
import { getServices, getProducts, getIndustries, getProjects } from "@/lib/queries";
import { siteFaqs } from "@/data/content";

export async function Capabilities() {
  const items = ["Custom Software", "Web Apps", "Mobile Apps", "AI & Automation", "SaaS", "Cloud & DevOps", "UI/UX", "Consulting"];
  return (
    <div className="border-y border-line bg-surface/40">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-6 sm:px-8">
        {items.map((i) => (
          <span key={i} className="eyebrow !text-[0.68rem]">{i}</span>
        ))}
      </div>
    </div>
  );
}

export async function ServicesSection() {
  const services = await getServices();
  return (
    <Section>
      <SectionHeading eyebrow="What we do" title="Everything you need to take an idea live." intro="From the first sketch to a running, supported product: strategy, design, engineering and delivery under one roof." action={{ label: "All services", href: "/services" }} />
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, 9).map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 0.06} className="bg-ink">
            <Link href={`/services/${s.slug}`} className="group flex h-full flex-col p-7 transition hover:bg-surface">
              <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="mt-6 grid h-10 w-10 place-items-center rounded-lg border border-line text-cyan transition group-hover:border-cyan/40"><Icon name={s.icon} /></span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.tagline}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-fg/70 transition group-hover:text-cyan">Learn more <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export async function FeaturedProducts() {
  const products = await getProducts({ featured: true, take: 6 });
  return (
    <Section>
      <SectionHeading eyebrow="Software products" title={<>Ready-to-use software. <span className="text-gradient">Launch faster.</span></>} intro="Proven tools for clinics, schools, stores and teams, available to buy, demo or customise." action={{ label: "Browse all products", href: "/products" }} />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 0.07}><ProductCard p={p} /></Reveal>)}
      </div>
      <p className="mt-6 text-xs text-muted">Product listings shown are demonstration entries and prices are indicative starter prices.</p>
    </Section>
  );
}

const why = [
  ["Business-focused engineering", "We begin with your goals and numbers, not our favourite tools."],
  ["Scalable architecture", "Clean foundations so version two doesn't mean a rewrite."],
  ["Modern technology", "React, Next.js, TypeScript, Python and proven cloud services."],
  ["Quality-driven delivery", "Reviews, automated tests and staged releases before anything goes live."],
  ["Transparent communication", "Clear scope, regular demos and one point of contact."],
  ["End-to-end ownership", "Design, build, deploy and support from a single team."],
];
export function WhySection() {
  return (
    <Section>
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Why Altivox</p>
          <h2 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl">A technology partner, not just a vendor.</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">We turn business problems into practical software, explained in plain language and delivered on a clear plan.</p>
          <Link href="/about" className={`${btnGhost} mt-8`}>About Altivox</Link>
        </div>
        <ol className="divide-y divide-line border-y border-line">
          {why.map(([t, d], i) => (
            <Reveal key={t}><li className="flex gap-6 py-7"><span className="font-mono text-sm text-violet">{String(i + 1).padStart(2, "0")}</span><div><h3 className="text-xl font-semibold tracking-tight">{t}</h3><p className="mt-1.5 text-muted">{d}</p></div></li></Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}

export async function IndustriesSection() {
  const list = await getIndustries();
  return (
    <Section>
      <SectionHeading eyebrow="Industries" title="Built for the way your industry works." action={{ label: "Explore industries", href: "/industries" }} />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {list.map((i) => (
          <Link key={i.slug} href={`/industries#${i.slug}`} className="group flex items-center gap-3 rounded-xl border border-line bg-surface/50 p-4 transition hover:border-blue/50 sm:p-5">
            <span className="text-blue transition group-hover:text-cyan"><Icon name={i.icon} size={22} /></span>
            <span className="text-sm font-medium sm:text-base">{i.name}</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

const steps = ["Discovery", "Requirement analysis", "Planning & architecture", "UI/UX design", "Development", "Testing & QA", "Deployment", "Maintenance & support"];
export function ProcessSection() {
  return (
    <Section>
      <SectionHeading eyebrow="How we work" title="A clear path from idea to launch." intro="Eight stages, each with a defined outcome, so you always know where your project stands." />
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s} delay={(i % 4) * 0.05} className="bg-ink"><li className="p-7"><span className="font-mono text-xs text-violet">Step {String(i + 1).padStart(2, "0")}</span><h3 className="mt-8 text-lg font-semibold tracking-tight">{s}</h3></li></Reveal>
        ))}
      </ol>
    </Section>
  );
}

const stack: [string, string[]][] = [
  ["Frontend", ["React", "Next.js", "TypeScript", "Tailwind CSS"]],
  ["Backend", ["Node.js", "Express", "NestJS", "Python", "Java"]],
  ["Mobile", ["React Native", "Expo"]],
  ["Data", ["PostgreSQL", "MySQL", "MongoDB", "Redis"]],
  ["AI", ["LLM integrations", "Python", "RAG", "Automation"]],
  ["Infrastructure", ["Docker", "AWS", "Vercel", "CI/CD", "Monitoring"]],
];
export function StackSection() {
  return (
    <Section>
      <SectionHeading eyebrow="Technology" title="Modern tools, chosen for the job." intro="We pick the simplest stack that meets your needs, not the trendiest." />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {stack.map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-line bg-surface/50 p-6">
            <h3 className="eyebrow">{k}</h3>
            <div className="mt-5 flex flex-wrap gap-2">{v.map((t) => <span key={t} className="rounded-full border border-line px-3 py-1.5 text-sm">{t}</span>)}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export async function WorkSection() {
  const projects = (await getProjects()).slice(0, 3);
  return (
    <Section>
      <SectionHeading eyebrow="Selected work" title="Problems we solve, in practice." intro="Illustrative case studies showing how we approach real business problems." action={{ label: "All case studies", href: "/work" }} />
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="group rounded-2xl border border-line bg-surface/50 p-6 transition hover:border-violet/50">
            <div className="h-1 w-12 rounded" style={{ background: `linear-gradient(90deg, ${p.accentFrom}, ${p.accentTo})` }} />
            <div className="mt-6 flex items-center justify-between"><span className="eyebrow !text-[0.65rem]">{p.category}</span>{p.isSample && <SampleBadge />}</div>
            <h3 className="mt-3 text-xl font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.summary}</p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm group-hover:text-cyan">Read case study <ArrowRight size={14} /></span>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function FaqList({ items = siteFaqs }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium">
            {f.q}<span className="text-2xl text-muted transition group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FaqSection() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div><p className="eyebrow">FAQ</p><h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">Questions, answered.</h2><Link href="/faq" className="mt-6 inline-block text-sm text-cyan hover:underline">See all FAQs</Link></div>
        <FaqList items={siteFaqs.slice(0, 6)} />
      </div>
    </Section>
  );
}

export function FinalCta() {
  return (
    <Section className="!py-16 sm:!py-24">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-10 text-center sm:p-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(124_92_255/0.28),transparent_60%),radial-gradient(ellipse_at_bottom,rgb(59_108_255/0.22),transparent_60%)]" aria-hidden="true" />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.035em] sm:text-6xl">Have an idea or a problem worth solving?</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">Tell us what you need. We&apos;ll reply with a clear plan, timeline and quote.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/quote" className={btnPrimary}>Get a Quote <ArrowRight size={18} /></Link>
            <Link href="/products" className={btnGhost}>Explore products</Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
