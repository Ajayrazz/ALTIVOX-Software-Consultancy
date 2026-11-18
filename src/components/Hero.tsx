import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroVisual } from "./HeroVisual";
import { Constellation } from "./3d/Constellation";

const d = (s: number) => ({ animationDelay: `${s}s` });

/** Server-rendered so the headline is in the very first paint; entrance is a CSS animation, not a JS one. */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]"><Constellation density={13000} maxNodes={85} /></div>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgb(59_108_255/0.22),transparent_65%)]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 pb-24 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:pb-32">
        <div>
          <p className="eyebrow fade-up flex items-center gap-2" style={d(0)}>
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            Software consultancy &amp; products
          </p>
          <h1 className="mt-6 text-[2.05rem] min-[420px]:text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]">
            <span className="fade-up block" style={d(0.05)}>Turning complex ideas</span>
            <span className="fade-up text-gradient block" style={d(0.12)}>into powerful digital</span>
            <span className="fade-up block" style={d(0.19)}>solutions.</span>
          </h1>
          <p className="fade-up mt-7 max-w-xl text-lg leading-relaxed text-muted" style={d(0.25)}>
            We design, develop and deliver intelligent software that helps businesses innovate, automate and grow.
          </p>
          <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row" style={d(0.32)}>
            <Link href="/products" className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue to-violet px-6 py-3.5 font-medium text-white shadow-lg shadow-blue/20 transition hover:shadow-violet/30">
              Explore Our Solutions
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 font-medium transition hover:border-muted/50 hover:bg-white/[0.03]">
              Let&apos;s Discuss Your Project
            </Link>
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
