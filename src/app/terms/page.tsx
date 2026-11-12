import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms and Conditions", description: "Terms governing use of the Altivox website and services.", alternates: { canonical: "/terms" } };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms and Conditions" intro="Last updated: 13 November 2026." />
      <Section className="max-w-3xl !pt-12 space-y-8 text-fg/85 leading-relaxed">
        <div><h2 className="text-xl font-semibold text-fg">Use of this website</h2><p className="mt-2">Content on this site is provided for general information. Demonstration products and case studies are labelled and are illustrative.</p></div>
        <div><h2 className="text-xl font-semibold text-fg">Services and products</h2><p className="mt-2">Project scope, timelines and fees are agreed in writing before work begins. Product purchases are subject to the terms agreed at the time of sale.</p></div>
        <div><h2 className="text-xl font-semibold text-fg">Intellectual property</h2><p className="mt-2">Unless agreed otherwise in writing, Altivox retains rights to its pre-existing products, code and branding.</p></div>
        <div><h2 className="text-xl font-semibold text-fg">Liability</h2><p className="mt-2">To the extent permitted by law, Altivox is not liable for indirect or consequential losses arising from use of the site.</p></div>
        <p className="text-sm text-muted">This page is a general template and should be reviewed by a legal professional before commercial use. Questions: {site.contact.email || "see our contact page"}.</p>
      </Section>
    </>
  );
}
