import { site } from "@/lib/site";

type P = { slug: string; name: string; purchaseAction: string; buyUrl: string | null };

export type PurchaseCta = { label: string; href: string; external: boolean } | null;

const igHandle = () => site.social.instagram.replace(/\/+$/, "").split("/").pop() ?? "";

/**
 * Configurable purchase action per product. BUY_NOW uses `buyUrl` (a payment-link / checkout)
 * when set — this is the seam where a payment gateway plugs in later — and otherwise falls back
 * to an enquiry so a sale is never lost.
 */
export function purchaseCta(p: P): PurchaseCta {
  const msg = encodeURIComponent(`Hi Altivox, I'm interested in ${p.name}.`);
  switch (p.purchaseAction) {
    case "BUY_NOW":
      return p.buyUrl
        ? { label: "Buy now", href: p.buyUrl, external: true }
        : { label: "Buy now", href: `/contact?product=${p.slug}&type=PRODUCT`, external: false };
    case "DEMO":
      return { label: "Request a demo", href: `/contact?product=${p.slug}&type=DEMO`, external: false };
    case "CUSTOMIZATION":
      return { label: "Request customisation", href: `/quote?product=${p.slug}`, external: false };
    case "WHATSAPP":
      return site.contact.whatsapp ? { label: "Contact on WhatsApp", href: `https://wa.me/${site.contact.whatsapp}?text=${msg}`, external: true } : { label: "Enquire now", href: `/contact?product=${p.slug}&type=PRODUCT`, external: false };
    case "INSTAGRAM":
      return igHandle() ? { label: "Enquire on Instagram", href: `https://ig.me/m/${igHandle()}`, external: true } : { label: "Enquire now", href: `/contact?product=${p.slug}&type=PRODUCT`, external: false };
    default:
      return null;
  }
}

export function formatPrice(p: { priceINR: number | null; priceUSD: number | null; pricingModel: string; pricingNote: string | null }) {
  if (p.priceINR == null && p.priceUSD == null) return { main: "Custom pricing", sub: "Tailored to your needs" };
  const inr = p.priceINR != null ? `₹${p.priceINR.toLocaleString("en-IN")}` : "";
  const usd = p.priceUSD != null ? `$${p.priceUSD.toLocaleString("en-US")}` : "";
  const unit = p.pricingModel === "MONTHLY" ? "/mo" : "";
  return { main: `${inr}${unit}`, sub: `${usd}${unit}${p.pricingNote && p.pricingModel !== "MONTHLY" ? ` · ${p.pricingNote}` : ""}` };
}
