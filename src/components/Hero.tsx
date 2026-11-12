"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { HeroVisual } from "./HeroVisual";

const ease = [0.22, 1, 0.36, 1] as const;
const line = (d: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay: d, ease },
});

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgb(59_108_255/0.22),transparent_65%)]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 pb-24 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:pb-32">
        <div>
          <motion.p {...line(0.05)} className="eyebrow flex items-center gap-2">
            <span className="h-px w-8 bg-gradient-to-r from-blue to-violet" />
            Software consultancy &amp; products
          </motion.p>
          <h1 className="mt-6 text-[2.05rem] min-[420px]:text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]">
            <motion.span {...line(0.15)} className="block">Turning complex ideas</motion.span>
            <motion.span {...line(0.25)} className="text-gradient block">into powerful digital</motion.span>
            <motion.span {...line(0.35)} className="block">solutions.</motion.span>
          </h1>
          <motion.p {...line(0.5)} className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            We design, develop and deliver intelligent software that helps businesses innovate, automate and grow.
          </motion.p>
          <motion.div {...line(0.65)} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue to-violet px-6 py-3.5 font-medium text-white shadow-lg shadow-blue/20 transition hover:shadow-violet/30"
            >
              Explore Our Solutions
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3.5 font-medium transition hover:border-muted/50 hover:bg-white/[0.03]"
            >
              Let&apos;s Discuss Your Project
            </Link>
          </motion.div>
        </div>
        <HeroVisual />
      </div>
    </section>
  );
}
