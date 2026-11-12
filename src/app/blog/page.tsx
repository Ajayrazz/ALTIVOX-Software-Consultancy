import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Section } from "@/components/ui/Section";
import { getPosts } from "@/lib/queries";

export const revalidate = 300;
export const metadata: Metadata = { title: "Insights", description: "Articles on software development, AI, automation and business technology from Altivox.", alternates: { canonical: "/blog" } };

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHeader eyebrow="Insights" title="Practical thinking on software, AI and business." />
      <Section className="!pt-12">
        <div className="grid gap-5 md:grid-cols-2">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group rounded-2xl border border-line bg-surface/50 p-7 transition hover:border-violet/50">
              <p className="eyebrow !text-[0.65rem]">{p.category} · {p.readMinutes} min read</p>
              <h2 className="mt-4 text-2xl font-semibold leading-snug tracking-tight">{p.title}</h2>
              <p className="mt-3 text-muted">{p.excerpt}</p>
            </Link>
          ))}
        </div>
        {posts.length === 0 && <p className="text-muted">Articles are coming soon.</p>}
      </Section>
    </>
  );
}
