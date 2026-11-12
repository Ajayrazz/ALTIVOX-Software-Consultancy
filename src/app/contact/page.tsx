import type { Metadata } from "next";
import { Mail, MessageCircle, AtSign, Briefcase } from "lucide-react";
import { PageHeader, Section } from "@/components/ui/Section";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { getServices, getProduct } from "@/lib/queries";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact Us", description: "Contact Altivox about a software project, a product demo or support. Email, WhatsApp, Instagram or use the form.", alternates: { canonical: "/contact" } };

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string; type?: string }> }) {
  const sp = await searchParams;
  const [services, product] = await Promise.all([getServices(), sp.product ? getProduct(sp.product) : null]);
  const type = product ? (sp.type === "DEMO" ? "DEMO" : "PRODUCT") : "CONTACT";
  const channels = [
    site.contact.email && { icon: Mail, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
    site.contact.whatsapp && { icon: MessageCircle, label: "WhatsApp", value: `+${site.contact.whatsapp.replace(/^(\d{2})(\d+)/, "$1 $2")}`, href: `https://wa.me/${site.contact.whatsapp}` },
    site.social.instagram && { icon: AtSign, label: "Instagram", value: "@" + site.social.instagram.replace(/\/+$/, "").split("/").pop(), href: site.social.instagram },
    site.social.linkedin && { icon: Briefcase, label: "LinkedIn", value: "Altivox", href: site.social.linkedin },
  ].filter(Boolean) as { icon: typeof Mail; label: string; value: string; href: string }[];
  return (
    <>
      <PageHeader eyebrow="Contact" title={product ? `Enquire about ${product.name}` : <>Let&apos;s talk about <span className="text-gradient">your project.</span></>} intro="Tell us what you need. We reply within one business day." />
      <Section className="!pt-12">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <EnquiryForm type={type} productSlug={product?.slug} productName={product?.name} services={services.map((s) => s.name)} />
          <aside className="space-y-3 lg:pt-1">
            <h2 className="eyebrow mb-4">Reach us directly</h2>
            {channels.map((c) => (
              <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl border border-line bg-surface/50 p-4 transition hover:border-blue/50">
                <c.icon size={20} className="text-cyan" /><span><span className="block text-xs text-muted">{c.label}</span><span className="break-all">{c.value}</span></span>
              </a>
            ))}
          </aside>
        </div>
      </Section>
    </>
  );
}
