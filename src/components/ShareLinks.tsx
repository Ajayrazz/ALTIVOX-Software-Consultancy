import { site } from "@/lib/site";

export function ShareLinks({ path, title }: { path: string; title: string }) {
  const url = encodeURIComponent(`${site.url}${path}`);
  const t = encodeURIComponent(title);
  const links = [
    ["WhatsApp", `https://wa.me/?text=${t}%20${url}`],
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${url}`],
    ["X", `https://twitter.com/intent/tweet?text=${t}&url=${url}`],
  ];
  return (
    <p className="flex flex-wrap items-center gap-4 text-sm text-muted">
      <span className="eyebrow">Share</span>
      {links.map(([l, h]) => <a key={l} href={h} target="_blank" rel="noopener noreferrer" className="hover:text-fg">{l}</a>)}
    </p>
  );
}
