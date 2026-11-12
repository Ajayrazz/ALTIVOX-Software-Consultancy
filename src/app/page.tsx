import { Hero } from "@/components/Hero";
import { Capabilities, ServicesSection, FeaturedProducts, WhySection, IndustriesSection, ProcessSection, StackSection, WorkSection, FaqSection, FinalCta } from "@/components/home/Sections";

export const revalidate = 300;

export default function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <ServicesSection />
      <FeaturedProducts />
      <WhySection />
      <IndustriesSection />
      <ProcessSection />
      <StackSection />
      <WorkSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
