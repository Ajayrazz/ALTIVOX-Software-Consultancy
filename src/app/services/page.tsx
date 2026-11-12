import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader, Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { getServices } from "@/lib/queries";
import { FinalCta } from "@/components/home/Sections";

export const revalidate = 300;
export const metadata: Metadata = { title: "Software Development Services", description: "Custom software, web and mobile apps, AI solutions, automation, SaaS, cloud and UI/UX from Altivox.", alternates: { canonical: "/services" } };

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHeader eyebrow="Services" title={<>Engineering that fits <span className="text-gradient">your business.</span></>} intro="Whether you need a website, a mobile app, an AI assistant or a full platform, we handle it end to end." />
      <Section className="!pt-12">
        <div className="divide-y divide-line border-y border-line">
          {services.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="group grid gap-4 py-8 transition hover:bg-surface/40 md:grid-cols-[3rem_1fr_1.2fr_auto] md:items-center md:gap-8 md:px-4">
              <span className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="flex items-center gap-3 text-xl font-semibold tracking-tight"><span className="text-cyan"><Icon name={s.icon} /></span>{s.name}</h2>
              <p className="text-muted">{s.summary}</p>
              <ArrowRight className="hidden text-muted transition group-hover:translate-x-1 group-hover:text-cyan md:block" />
            </Link>
          ))}
        </div>
      </Section>
      <FinalCta />
    </>
  );
}
