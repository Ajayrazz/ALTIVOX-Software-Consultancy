"use client";
import { useEffect, useMemo, useRef } from "react";

export type GlobeWord = { label: string; tone: 0 | 1 | 2 };
const TONES = ["border-blue/50 text-[#9db4ff]", "border-violet/50 text-[#c2b2ff]", "border-cyan/50 text-[#9be9f3]"];

/** A draggable, auto-rotating sphere of technology names. Positions are projected in JS (no heavy 3D layers). */
export function TechGlobe({ words, className = "" }: { words: GlobeWord[]; className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLSpanElement | null)[]>([]);
  const pts = useMemo(() => words.map((_, i) => { const k = i + 0.5, phi = Math.acos(1 - (2 * k) / words.length), th = Math.PI * (1 + Math.sqrt(5)) * k; return [Math.cos(th) * Math.sin(phi), Math.cos(phi), Math.sin(th) * Math.sin(phi)] as const; }), [words]);

  useEffect(() => {
    const el = host.current; if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rotY = 0.6, rotX = -0.25, vY = reduce ? 0 : 0.004, vX = 0, raf = 0, last = 0, visible = false, dragging = false, px = 0, py = 0;
    let R = el.clientWidth * 0.38;

    const render = () => {
      const cY = Math.cos(rotY), sY = Math.sin(rotY), cX = Math.cos(rotX), sX = Math.sin(rotX);
      pts.forEach(([x, y, z], i) => {
        const x1 = x * cY + z * sY, z1 = -x * sY + z * cY;
        const y1 = y * cX - z1 * sX, z2 = y * sX + z1 * cX;
        const depth = (z2 + 1) / 2;
        const node = els.current[i]; if (!node) return;
        node.style.transform = `translate3d(${x1 * R}px, ${y1 * R}px, 0) translate(-50%, -50%) scale(${0.62 + 0.5 * depth})`;
        node.style.opacity = String(0.22 + 0.78 * depth);
        node.style.zIndex = String(Math.round(depth * 100));
      });
    };
    const tick = (t: number) => {
      if (!visible) { raf = 0; return; }
      const dt = Math.min(48, t - last || 16) / 16; last = t;
      if (!dragging) { rotY += vY * dt; rotX += vX * dt; vX *= 0.95; if (Math.abs(vY) > 0.004) vY += (0.004 - vY) * 0.03 * dt; else vY = reduce ? 0 : 0.004; rotX += (-0.25 - rotX) * 0.01 * dt; }
      render(); raf = requestAnimationFrame(tick);
    };
    const start = () => { if (!reduce && !raf && visible && !document.hidden) { last = 0; raf = requestAnimationFrame(tick); } };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
    const ro = new ResizeObserver(() => { R = el.clientWidth * 0.38; render(); });
    const down = (e: PointerEvent) => { dragging = true; px = e.clientX; py = e.clientY; el.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => { if (!dragging) return; const dx = e.clientX - px, dy = e.clientY - py; px = e.clientX; py = e.clientY; vY = dx * 0.006; vX = -dy * 0.004; rotY += dx * 0.008; rotX = Math.max(-0.9, Math.min(0.9, rotX - dy * 0.006)); render(); };
    const up = () => { dragging = false; };
    el.addEventListener("pointerdown", down); el.addEventListener("pointermove", move); el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
    io.observe(el); ro.observe(el); render();
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); el.removeEventListener("pointerdown", down); el.removeEventListener("pointermove", move); el.removeEventListener("pointerup", up); el.removeEventListener("pointercancel", up); };
  }, [pts]);

  return (
    <div ref={host} aria-hidden="true" className={`relative aspect-square w-full cursor-grab select-none active:cursor-grabbing ${className}`} style={{ touchAction: "pan-y" }}>
      <div className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_35%_30%,rgb(124_92_255/0.28),rgb(59_108_255/0.08)_45%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-[6%] rounded-full border border-white/[0.07]" />
      <div className="pointer-events-none absolute inset-[6%] rounded-full border border-white/[0.05] [transform:rotateX(72deg)]" />
      <div className="pointer-events-none absolute inset-[6%] rounded-full border border-white/[0.05] [transform:rotateY(72deg)]" />
      {words.map((w, i) => (
        <span key={w.label} ref={(n) => { els.current[i] = n; }} className={`absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border bg-ink/70 px-3 py-1.5 text-xs font-medium backdrop-blur-sm will-change-transform sm:text-sm ${TONES[w.tone]}`}>{w.label}</span>
      ))}
    </div>
  );
}
