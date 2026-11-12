import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { QuoteWizard } from "@/components/forms/QuoteWizard";

export const metadata: Metadata = { title: "Get a Quote", description: "Describe your software project in four quick steps and get a clear plan, timeline and quote from Altivox.", alternates: { canonical: "/quote" } };

export default async function QuotePage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams;
  return (
    <>
      <PageHeader eyebrow="Get a quote" title={<>Tell us what to <span className="text-gradient">build.</span></>} intro="Four short steps. No commitment, and you'll get a clear plan and quote." />
      <Section className="max-w-3xl !pt-12"><QuoteWizard productSlug={product} /></Section>
    </>
  );
}
