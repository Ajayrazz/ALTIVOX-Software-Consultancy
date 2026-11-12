import type { Metadata } from "next";
import { PageHeader, Section } from "@/components/ui/Section";
import { WorkBrowser } from "@/components/WorkBrowser";
import { getProjects } from "@/lib/queries";
import { FinalCta } from "@/components/home/Sections";

export const revalidate = 300;
export const metadata: Metadata = { title: "Case Studies & Portfolio", description: "Case studies showing how Altivox solves business problems with web, mobile, AI, SaaS and automation solutions.", alternates: { canonical: "/work" } };

export default async function WorkPage() {
  const projects = await getProjects();
  return (
    <>
      <PageHeader eyebrow="Work" title={<>How we solve <span className="text-gradient">real problems.</span></>} intro="Case studies marked “Sample” are illustrative demonstrations of our approach. Verified client work will replace them as projects are published." />
      <Section className="!pt-12"><WorkBrowser projects={projects} /></Section>
      <FinalCta />
    </>
  );
}
