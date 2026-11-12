/**
 * Central, editable site configuration.
 * Contact/social values are intentionally empty until the owner supplies real
 * ones (later these move to the admin-editable SiteSetting table). Components
 * must hide any link whose value is empty — never show fake details.
 */
export const site = {
  name: "Altivox",
  legalName: "Altivox Software Consultancy",
  tagline: "Elevating Ideas. Engineering Innovation.",
  description:
    "Altivox designs, builds and delivers custom software, AI solutions and software products for businesses that want to innovate, automate and grow.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "", // digits only, e.g. 919876543210
  },
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "",
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "",
  },
} as const;

export const nav = {
  main: [
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Industries", href: "/industries" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/blog" },
  ],
  cta: { label: "Get a Quote", href: "/quote" },
} as const;
