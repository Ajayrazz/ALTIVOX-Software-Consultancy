import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { FaqList } from "@/components/home/Sections";
import { siteFaqs } from "@/data/content";

export const metadata: Metadata = { title: "FAQ", description: "Answers about Altivox services, timelines, pricing, support and software products.", alternates: { canonical: "/faq" } };

export default function FaqPage() {
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: siteFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHeader eyebrow="FAQ" title="Frequently asked questions." />
      <Section className="max-w-4xl !pt-12"><FaqList /></Section>
    </>
  );
}
