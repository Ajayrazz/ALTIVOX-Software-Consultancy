import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading, btnPrimary, btnGhost, SampleBadge } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { TiltCard } from "@/components/3d/TiltCard";
import { OrbitCarousel, type OrbitItem } from "@/components/3d/OrbitCarousel";
import { TechGlobe, type GlobeWord } from "@/components/3d/TechGlobe";
import { Constellation } from "@/components/3d/Constellation";
import { Cube3D, Rings3D } from "@/components/3d/Shapes3D";
import { getServices, getProducts, getIndustries, getProjects } from "@/lib/queries";
import { formatPrice } from "@/lib/purchase";
import { siteFaqs } from "@/data/content";

const glass = "border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.015] shadow-[0_24px_50px_-28px_rgb(0_0_0/1),inset_0_1px_0_rgb(255_255_255/0.07)]";

export function Capabilities() {
  const items = ["Custom Software", "Web Apps", "Mobile Apps", "AI & Automation", "SaaS Products", "Cloud & DevOps", "UI/UX Design", "Technology Consulting"];
  return (
    <div className="marquee overflow-hidden border-y border-line bg-surface/40 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
      <div className="marquee-track flex w-max items-center gap-12 py-6 pr-12">
        {[...items, ...items].map((t, i) => (
          <span key={i} aria-hidden={i >= items.length} className="eyebrow flex items-center gap-12 !text-[0.7rem]">{t}<span className="h-1 w-1 rounded-full bg-violet" /></span>
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
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.slice(0, 9).map((s, i) => (
          <li key={s.slug}>
            <Reveal variant="tilt" delay={(i % 3) * 0.07} className="h-full">
              <TiltCard className="h-full" max={8}>
                <Link href={`/services/${s.slug}`} className={`preserve-3d group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 transition-colors hover:border-violet/50 ${glass}`}>
                  <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-blue to-violet opacity-[0.12] blur-2xl transition group-hover:opacity-30" />
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-gradient-to-br from-blue/30 to-violet/25 text-cyan shadow-[0_14px_24px_-10px_rgb(59_108_255/0.7)]" style={{ transform: "translateZ(46px)" }}><Icon name={s.icon} size={22} /></span>
                    <span className="font-mono text-xs text-muted" style={{ transform: "translateZ(20px)" }}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-7 text-lg font-semibold tracking-tight" style={{ transform: "translateZ(26px)" }}>{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted" style={{ transform: "translateZ(12px)" }}>{s.tagline}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-fg/70 transition group-hover:text-cyan" style={{ transform: "translateZ(18px)" }}>Learn more <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span>
                </Link>
              </TiltCard>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export async function FeaturedProducts() {
  const products = (await getProducts({ take: 8 }));
  const items: OrbitItem[] = products.map((p) => {
    const price = formatPrice(p);
    return { slug: p.slug, name: p.name, tagline: p.tagline, icon: p.icon, accentFrom: p.accentFrom, accentTo: p.accentTo, categoryName: p.category.name, priceMain: price.main, priceSub: price.sub, isSample: p.isSample };
  });
  return (
    <Section className="overflow-hidden">
      <SectionHeading eyebrow="Software products" title={<>Products in <span className="text-gradient">orbit.</span></>} intro="Ready-to-use software for clinics, schools, stores and teams. Drag to spin the ring, then buy, demo or customise." action={{ label: "Browse all products", href: "/products" }} />
      <OrbitCarousel items={items} />
      <p className="mt-10 text-center text-xs text-muted">Product listings shown are demonstration entries and prices are indicative starter prices.</p>
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
          <Rings3D size={190} className="mt-12 hidden lg:block" />
        </div>
        <ol className="space-y-4">
          {why.map(([t, d], i) => (
            <li key={t}>
              <Reveal variant="tilt" delay={0.04}>
                <div className={`group flex gap-6 rounded-2xl p-6 transition-colors hover:border-violet/40 ${glass}`}>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue/30 to-violet/30 font-mono text-sm text-cyan">{String(i + 1).padStart(2, "0")}</span>
                  <div><h3 className="text-xl font-semibold tracking-tight">{t}</h3><p className="mt-1.5 text-muted">{d}</p></div>
                </div>
              </Reveal>
            </li>
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
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3" style={{ perspective: 1000 }}>
        {list.map((i) => (
          <Link key={i.slug} href={`/industries#${i.slug}`} className={`group flex items-center gap-3 rounded-xl p-4 transition duration-300 [transform-style:preserve-3d] hover:-translate-y-1.5 hover:[transform:rotateX(8deg)_translateY(-6px)] hover:border-blue/50 hover:shadow-[0_20px_30px_-16px_rgb(59_108_255/0.6)] sm:p-5 ${glass}`}>
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
      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s}>
            <Reveal variant="tilt" delay={(i % 4) * 0.07} className="h-full">
              <TiltCard className="h-full" max={9}>
                <div className={`preserve-3d relative h-full overflow-hidden rounded-2xl p-7 ${glass}`}>
                  <span aria-hidden className="pointer-events-none absolute -right-2 -top-6 select-none text-[7rem] font-semibold leading-none text-white/[0.04]">{i + 1}</span>
                  <span className="font-mono text-xs text-violet" style={{ transform: "translateZ(22px)" }}>Step {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-10 text-lg font-semibold tracking-tight" style={{ transform: "translateZ(34px)" }}>{s}</h3>
                  <div aria-hidden className="mt-5 h-1 w-10 rounded-full bg-gradient-to-r from-blue to-violet" style={{ transform: "translateZ(18px)" }} />
                </div>
              </TiltCard>
            </Reveal>
          </li>
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
  ["AI", ["LLM integrations", "RAG", "Automation"]],
  ["Infrastructure", ["Docker", "AWS", "Vercel", "CI/CD", "Monitoring"]],
];
const globeWords: GlobeWord[] = stack.flatMap(([, v], gi) => v.map((label) => ({ label, tone: (gi % 3) as 0 | 1 | 2 })));
export function StackSection() {
  return (
    <Section>
      <SectionHeading eyebrow="Technology" title="Modern tools, chosen for the job." intro="We pick the simplest stack that meets your needs, not the trendiest. Drag the globe to explore." />
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <TechGlobe words={globeWords} className="mx-auto max-w-[480px]" />
        <div className="grid gap-4 sm:grid-cols-2">
          {stack.map(([k, v], i) => (
            <Reveal key={k} delay={(i % 2) * 0.06}>
              <div className={`h-full rounded-2xl p-5 ${glass}`}>
                <h3 className="eyebrow">{k}</h3>
                <div className="mt-4 flex flex-wrap gap-2">{v.map((t) => <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm">{t}</span>)}</div>
              </div>
            </Reveal>
          ))}
        </div>
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
        {projects.map((p, i) => (
          <Reveal key={p.slug} variant="tilt" delay={i * 0.08} className="h-full">
            <TiltCard className="h-full" max={8}>
              <Link href={`/work/${p.slug}`} className={`preserve-3d group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-colors hover:border-violet/50 ${glass}`}>
                <div className="h-24 rounded-xl" style={{ transform: "translateZ(30px)", background: `radial-gradient(120% 120% at 80% 0%, ${p.accentTo}66, transparent 60%), radial-gradient(100% 100% at 0% 100%, ${p.accentFrom}55, transparent 60%), #0E1017` }} />
                <div className="mt-5 flex items-center justify-between" style={{ transform: "translateZ(14px)" }}><span className="eyebrow !text-[0.65rem]">{p.category}</span>{p.isSample && <SampleBadge />}</div>
                <h3 className="mt-3 text-xl font-semibold tracking-tight" style={{ transform: "translateZ(22px)" }}>{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.summary}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm group-hover:text-cyan">Read case study <ArrowRight size={14} /></span>
              </Link>
            </TiltCard>
          </Reveal>
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
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface p-10 text-center shadow-[0_40px_90px_-40px_rgb(0_0_0/1),inset_0_1px_0_rgb(255_255_255/0.08)] sm:p-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(124_92_255/0.3),transparent_60%),radial-gradient(ellipse_at_bottom,rgb(59_108_255/0.24),transparent_60%)]" aria-hidden="true" />
        <div className="absolute inset-0 opacity-80 [mask-image:radial-gradient(ellipse_at_center,transparent_25%,#000_85%)]"><Constellation density={11000} maxNodes={70} /></div>
        <Cube3D size={70} className="absolute left-[7%] top-[18%] hidden md:block" />
        <Cube3D size={44} className="absolute bottom-[14%] right-[9%] hidden md:block" />
        <Rings3D size={190} className="absolute -right-6 top-6 hidden opacity-80 lg:block" />
        <Rings3D size={130} className="absolute -left-4 bottom-4 hidden opacity-70 lg:block" />
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
