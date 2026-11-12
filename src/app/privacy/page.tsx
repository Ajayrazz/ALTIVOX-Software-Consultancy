import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", description: "How Altivox collects, uses and protects your personal information.", alternates: { canonical: "/privacy" } };

export default function Page() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" intro="Last updated: 13 November 2026." />
      <Section className="max-w-3xl !pt-12 space-y-8 text-fg/85 leading-relaxed">
        <div><h2 className="text-xl font-semibold text-fg">Information we collect</h2><p className="mt-2">When you submit a contact, quote or product enquiry we collect the details you provide, such as your name, email, phone number, company and message.</p></div>
        <div><h2 className="text-xl font-semibold text-fg">How we use it</h2><p className="mt-2">We use your information only to respond to your enquiry, provide quotes, deliver services and support, and improve our website. We do not sell your personal data.</p></div>
        <div><h2 className="text-xl font-semibold text-fg">Storage and security</h2><p className="mt-2">Enquiries are stored in a secured database with restricted administrator access. Email notifications are sent through a transactional email provider.</p></div>
        <div><h2 className="text-xl font-semibold text-fg">Your rights</h2><p className="mt-2">You may request access to, correction of, or deletion of your data by contacting us.</p></div>
        <p className="text-sm text-muted">This page is a general template and should be reviewed by a legal professional before commercial use. Questions: {site.contact.email || "see our contact page"}.</p>
      </Section>
    </>
  );
}
