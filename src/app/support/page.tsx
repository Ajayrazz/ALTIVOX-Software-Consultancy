import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section, btnPrimary } from "@/components/ui/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Product Support", description: "Get help with Altivox software products.", alternates: { canonical: "/support" } };

export default function SupportPage() {
  return (
    <>
      <PageHeader eyebrow="Support" title="Help with your Altivox product." intro="Existing customers can reach us by email or WhatsApp. Include your product name and a short description of the issue." />
      <Section className="!pt-12"><div className="flex flex-col gap-3 sm:flex-row">
        {site.contact.email && <a className={btnPrimary} href={`mailto:${site.contact.email}?subject=Product%20support`}>Email support</a>}
        <Link href="/contact" className="rounded-full border border-line px-6 py-3.5 font-medium hover:bg-white/[0.03]">Use the contact form</Link>
      </div></Section>
    </>
  );
}
