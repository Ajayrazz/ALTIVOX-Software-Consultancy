import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const cols = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Insights", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Custom Software", href: "/services" },
      { label: "Web & Mobile Apps", href: "/services" },
      { label: "AI & Automation", href: "/services" },
      { label: "Cloud & DevOps", href: "/services" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Products", href: "/products" },
      { label: "Industries", href: "/industries" },
      { label: "Get a Quote", href: "/quote" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

export function Footer() {
  const socials = [
    { label: "Instagram", href: site.social.instagram },
    { label: "LinkedIn", href: site.social.linkedin },
    { label: "GitHub", href: site.social.github },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-5 text-sm leading-relaxed text-muted">{site.description}</p>
          {(site.contact.email || socials.length > 0) && (
            <ul className="mt-6 space-y-2 text-sm">
              {site.contact.email && (
                <li>
                  <a href={`mailto:${site.contact.email}`} className="text-fg hover:text-cyan">
                    {site.contact.email}
                  </a>
                </li>
              )}
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="eyebrow">{c.title}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {c.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-muted transition-colors hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 {site.legalName}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-fg">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-fg">Terms</Link>
            <Link href="/refund-policy" className="hover:text-fg">Refunds</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
