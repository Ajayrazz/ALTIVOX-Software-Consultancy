import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Refund Policy", description: "Refund and cancellation terms for Altivox software products and services.", alternates: { canonical: "/refund-policy" } };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Refund Policy" intro="Last updated: 13 November 2026." />
      <Section className="max-w-3xl !pt-12 space-y-8 text-fg/85 leading-relaxed">
        <div><h2 className="text-xl font-semibold text-fg">Software products</h2><p className="mt-2">Because digital products are delivered immediately, refunds are generally considered only if the product materially fails to work as described and we are unable to fix it within a reasonable time.</p></div>
        <div><h2 className="text-xl font-semibold text-fg">Subscriptions</h2><p className="mt-2">Monthly plans can be cancelled at any time and remain active until the end of the paid period.</p></div>
        <div><h2 className="text-xl font-semibold text-fg">Custom projects</h2><p className="mt-2">Payment milestones and cancellation terms are set out in the project agreement.</p></div>
        <p className="text-sm text-muted">This page is a general template and should be reviewed by a legal professional before commercial use. Questions: {site.contact.email || "see our contact page"}.</p>
      </Section>
    </>
  );
}
