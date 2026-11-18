"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform, type AnimationPlaybackControls, type MotionValue } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCover } from "@/components/ProductCover";
import { Constellation } from "./Constellation";

export type OrbitItem = {
  slug: string; name: string; tagline: string; icon: string; accentFrom: string; accentTo: string;
  categoryName: string; priceMain: string; priceSub: string; isSample: boolean;
};

const AUTO_DEG_PER_MS = 0.006; // ~6°/s: a full turn in a minute

function OrbitCard({ item, i, step, R, w, angle, active, onSelect, moved }: {
  item: OrbitItem; i: number; step: number; R: number; w: number; angle: MotionValue<number>; active: boolean; onSelect: () => void; moved: React.RefObject<boolean>;
}) {
  const opacity = useTransform(angle, (a) => { const f = Math.cos(((a + i * step) * Math.PI) / 180); return 0.12 + 0.88 * Math.pow(Math.max(0, (f + 0.2) / 1.2), 1.7); });
  const body = (
    <>
      <ProductCover slug={item.slug} icon={item.icon} from={item.accentFrom} to={item.accentTo} name={item.name} />
      <div className="px-1 pb-1 pt-4">
        <div className="flex items-center justify-between gap-2"><span className="eyebrow !text-[0.6rem]">{item.categoryName}</span>{item.isSample && <span className="rounded-full border border-cyan/30 bg-cyan/10 px-2 py-0.5 font-mono text-[0.55rem] uppercase tracking-wider text-cyan">Demo</span>}</div>
        <h3 className="mt-2 text-lg font-semibold tracking-tight">{item.name}</h3>
        <p className="mt-1 line-clamp-2 text-[0.8rem] leading-snug text-muted">{item.tagline}</p>
        <p className="mt-3 flex items-baseline gap-2 border-t border-white/10 pt-3 text-sm"><span className="font-semibold">{item.priceMain}</span><span className="text-xs text-muted">{item.priceSub}</span></p>
      </div>
    </>
  );
  const shell = "block rounded-[22px] border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.025] p-2.5 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.9),inset_0_1px_0_rgb(255_255_255/0.12)] backdrop-blur-md";
  return (
    <div className="absolute left-1/2 top-1/2" style={{ width: w, transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${R}px)` }}>
      <motion.div style={{ opacity }}>
        {active ? (
          <Link href={`/products/${item.slug}`} onClick={(e) => { if (moved.current) e.preventDefault(); }} className={`${shell} transition-shadow hover:shadow-[0_30px_70px_-18px_rgb(124_92_255/0.55),inset_0_1px_0_rgb(255_255_255/0.16)]`} draggable={false}>{body}</Link>
        ) : (
          <button type="button" onClick={() => { if (!moved.current) onSelect(); }} tabIndex={-1} className={`${shell} w-full cursor-pointer text-left`}>{body}<span className="sr-only"> (bring to front)</span></button>
        )}
      </motion.div>
    </div>
  );
}

export function OrbitCarousel({ items }: { items: OrbitItem[] }) {
  const n = items.length;
  const step = 360 / n;
  const reduce = useReducedMotion();
  const angle = useMotionValue(0);
  const [active, setActive] = useState(0);
  const [dims, setDims] = useState({ w: 270, R: 340 });
  const stage = useRef<HTMLDivElement>(null);
  const ctrl = useRef<AnimationPlaybackControls | null>(null);
  const moved = useRef(false);
  const dragging = useRef(false);
  const hover = useRef(false);
  const visible = useRef(false);
  const pausedUntil = useRef(0);

  // size the ring to the container
  useEffect(() => {
    const el = stage.current; if (!el) return;
    const fit = () => { const cw = el.clientWidth; const w = Math.max(215, Math.min(290, Math.round(cw * 0.56))); setDims({ w, R: Math.round(w / 2 / Math.tan(Math.PI / n)) + 40 }); };
    fit(); const ro = new ResizeObserver(fit); ro.observe(el); return () => ro.disconnect();
  }, [n]);

  useMotionValueEvent(angle, "change", (a) => { const idx = ((Math.round(-a / step) % n) + n) % n; setActive((p) => (p === idx ? p : idx)); });

  const goTo = useCallback((target: number) => {
    ctrl.current?.stop();
    pausedUntil.current = performance.now() + 4500;
    if (reduce) { angle.set(target); return; }
    ctrl.current = animate(angle, target, { type: "spring", stiffness: 70, damping: 18, mass: 0.9 });
  }, [angle, reduce]);
  const goIndex = (i: number) => { const cur = angle.get(); const m = Math.round((cur + i * step) / 360); goTo(-i * step + 360 * m); };
  const nudge = (dir: 1 | -1) => goTo(Math.round(angle.get() / step) * step - dir * step);

  // gentle auto-rotation while visible and idle
  useEffect(() => {
    if (reduce) return;
    let raf = 0, last = 0;
    const tick = (t: number) => {
      const dt = Math.min(48, t - (last || t)); last = t;
      if (visible.current && !dragging.current && !hover.current && t > pausedUntil.current && !document.hidden) angle.set(angle.get() - AUTO_DEG_PER_MS * dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; });
    if (stage.current) io.observe(stage.current);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [angle, reduce]);

  // drag to spin
  const drag = useRef({ x: 0, a: 0, lastX: 0, lastT: 0, v: 0 });
  const onDown = (e: React.PointerEvent) => {
    ctrl.current?.stop(); dragging.current = true; moved.current = false;
    drag.current = { x: e.clientX, a: angle.get(), lastX: e.clientX, lastT: performance.now(), v: 0 };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const d = drag.current, dx = e.clientX - d.x;
    if (Math.abs(dx) > 6) moved.current = true;
    const now = performance.now();
    d.v = (e.clientX - d.lastX) / Math.max(1, now - d.lastT); d.lastX = e.clientX; d.lastT = now;
    angle.set(d.a + dx * 0.34);
  };
  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    const target = Math.round((angle.get() + drag.current.v * 0.34 * 220) / step) * step;
    goTo(target);
    setTimeout(() => { moved.current = false; }, 60);
  };
  const onKey = (e: React.KeyboardEvent) => { if (e.key === "ArrowRight") { e.preventDefault(); nudge(1); } else if (e.key === "ArrowLeft") { e.preventDefault(); nudge(-1); } };

  const cur = items[active];
  const stageH = Math.round(dims.w * 1.32) + 70;

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Featured software products in a 3D carousel. Use the arrow buttons or drag to rotate." onKeyDown={onKey} className="relative">
      <div className="pointer-events-none absolute -inset-x-6 -inset-y-10 overflow-hidden [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_30%,transparent_80%)]"><Constellation density={16000} maxNodes={55} /></div>

      <div
        ref={stage}
        className="relative cursor-grab select-none overflow-hidden [mask-image:radial-gradient(ellipse_75%_92%_at_50%_46%,#000_58%,transparent_100%)] active:cursor-grabbing"
        style={{ height: stageH, touchAction: "pan-y", perspective: 1300 }}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}
        onMouseEnter={() => { hover.current = true; }} onMouseLeave={() => { hover.current = false; }}
        onFocusCapture={() => { hover.current = true; }} onBlurCapture={() => { hover.current = false; }}
      >
        {/* glowing orbit floor */}
        <div aria-hidden className="orbit-floor pointer-events-none absolute left-1/2 rounded-full border-2 border-violet/40 bg-[radial-gradient(ellipse_at_center,rgb(124_92_255/0.28),rgb(59_108_255/0.1)_50%,transparent_72%)]" style={{ top: "82%", width: dims.R * 2.9, height: dims.R * 2.9, transform: "translate(-50%, -50%) rotateX(76deg)", boxShadow: "0 0 90px rgb(59 108 255 / 0.35), inset 0 0 70px rgb(124 92 255 / 0.3)" }} />
        <div aria-hidden className="pointer-events-none absolute left-1/2 rounded-full border border-dashed border-cyan/20" style={{ top: "82%", width: dims.R * 3.6, height: dims.R * 3.6, transform: "translate(-50%, -50%) rotateX(76deg)" }} />

        <div className="preserve-3d absolute inset-0" style={{ transform: `translateY(34px) translateZ(-${dims.R}px) rotateX(11deg)` }}>
          <motion.div className="preserve-3d absolute left-1/2 top-1/2 h-0 w-0" style={{ rotateY: angle }}>
            {items.map((item, i) => (
              <OrbitCard key={item.slug} item={item} i={i} step={step} R={dims.R} w={dims.w} angle={angle} active={i === active} onSelect={() => goIndex(i)} moved={moved} />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative mt-2 flex flex-col items-center gap-5 text-center">
        <div aria-live="polite" className="min-h-[3.25rem]">
          <p className="text-xl font-semibold tracking-tight">{cur.name} <span className="ml-1 text-base font-normal text-muted">· {cur.priceMain} <span className="text-sm">({cur.priceSub})</span></span></p>
          <p className="mt-1 text-sm text-muted">{cur.tagline}</p>
        </div>
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => nudge(-1)} aria-label="Previous product" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition hover:border-violet/60 hover:bg-white/[0.09]"><ChevronLeft size={18} /></button>
          <div className="flex items-center" role="group" aria-label="Choose product">
            {items.map((it, i) => <button key={it.slug} type="button" onClick={() => goIndex(i)} aria-label={`Show ${it.name}`} aria-current={i === active} className="group grid h-7 place-items-center px-2"><span className={`block h-2 rounded-full transition-all ${i === active ? "w-7 bg-gradient-to-r from-blue to-violet" : "w-2 bg-white/20 group-hover:bg-white/40"}`} /></button>)}
          </div>
          <button type="button" onClick={() => nudge(1)} aria-label="Next product" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] transition hover:border-violet/60 hover:bg-white/[0.09]"><ChevronRight size={18} /></button>
        </div>
        <Link href={`/products/${cur.slug}`} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue to-violet px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue/20 transition hover:shadow-violet/30">View {cur.name}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
      </div>
    </div>
  );
}
