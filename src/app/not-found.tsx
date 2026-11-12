import Link from "next/link";
import { btnPrimary } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70dvh] max-w-3xl flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-[-0.035em] sm:text-7xl"><span className="text-gradient">Lost in the stack.</span></h1>
      <p className="mt-5 text-lg text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className={`${btnPrimary} mt-8`}>Back to home</Link>
    </section>
  );
}
