"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { Check, Sparkles } from "lucide-react";

const nodes = [
  { id: "ui", label: "Interface", x: 70, y: 70, c: "#3B6CFF" },
  { id: "api", label: "API", x: 250, y: 150, c: "#7C5CFF" },
  { id: "ai", label: "AI Layer", x: 430, y: 70, c: "#3DD9EB" },
  { id: "db", label: "Data", x: 250, y: 300, c: "#7C5CFF" },
  { id: "cloud", label: "Cloud", x: 430, y: 280, c: "#3B6CFF" },
];
const edges: [string, string][] = [["ui", "api"], ["api", "ai"], ["api", "db"], ["db", "cloud"], ["ai", "cloud"]];
const pos = Object.fromEntries(nodes.map((n) => [n.id, n]));

/** Layered 3D scene: a system blueprint with glass panels floating at different depths, tilting with the pointer. */
export function HeroVisual() {
  const reduce = useRef(false);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 16 }), sy = useSpring(my, { stiffness: 80, damping: 16 });
  const rotY = useTransform(sx, [-1, 1], [-14, 14]);
  const rotX = useTransform(sy, [-1, 1], [11, -11]);
  // Read the preference after mount (never during render) so server and client markup match; reduced motion gets a fixed, gentle pose.
  useEffect(() => { reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches; if (reduce.current) { mx.set(0.35); my.set(-0.25); } }, [mx, my]);

  return (
    <div
      className="relative mx-auto w-full max-w-[580px] py-6"
      style={{ perspective: 1300 }}
      onPointerMove={(e) => { if (reduce.current) return; const r = e.currentTarget.getBoundingClientRect(); mx.set(((e.clientX - r.left) / r.width) * 2 - 1); my.set(((e.clientY - r.top) / r.height) * 2 - 1); }}
      onPointerLeave={() => { mx.set(0); my.set(0); }}
    >
      <div className="absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgb(124_92_255/0.3),transparent_60%)] blur-2xl" />
      <motion.div
        className="preserve-3d relative"
        style={{ rotateX: rotX, rotateY: rotY }}
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* glowing floor grid, far below */}
        <div aria-hidden className="absolute inset-x-[-8%] bottom-[-14%] h-[46%] rounded-[40%] bg-[linear-gradient(rgb(124_92_255/0.35)_1px,transparent_1px),linear-gradient(90deg,rgb(124_92_255/0.35)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_72%)]" style={{ transform: "translateZ(-90px) rotateX(78deg)" }} />

        {/* main blueprint panel */}
        <div className="rounded-2xl border border-white/10 bg-surface/75 p-3 shadow-2xl shadow-black/60 backdrop-blur" style={{ transform: "translateZ(0)" }}>
          <div className="flex items-center gap-1.5 px-2 pb-3 pt-1">
            <span className="h-2 w-2 rounded-full bg-line" /><span className="h-2 w-2 rounded-full bg-line" /><span className="h-2 w-2 rounded-full bg-line" />
            <span className="eyebrow ml-3 !text-[0.62rem]">system / blueprint</span>
          </div>
          <svg viewBox="0 0 500 370" className="w-full" role="img" aria-label="Diagram of an interface, API, AI, data and cloud layers connected together">
            {edges.map(([a, b]) => (
              <g key={a + b}>
                <line x1={pos[a].x} y1={pos[a].y} x2={pos[b].x} y2={pos[b].y} stroke="#1E2230" strokeWidth="1.5" />
                <line className="flow-line" x1={pos[a].x} y1={pos[a].y} x2={pos[b].x} y2={pos[b].y} stroke="#6F8BFF" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            ))}
            {nodes.map((n, i) => (
              <motion.g key={n.id} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 + i * 0.12, type: "spring", stiffness: 160, damping: 16 }} style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
                <circle cx={n.x} cy={n.y} r="30" fill="#0E1017" stroke={n.c} strokeOpacity="0.55" />
                <circle cx={n.x} cy={n.y} r="5" fill={n.c} />
                <text x={n.x} y={n.y + 50} textAnchor="middle" fill="#8B91A3" fontSize="12" fontFamily="var(--font-geist-mono)" stroke="#0E1017" strokeWidth="6" paintOrder="stroke">{n.label}</text>
              </motion.g>
            ))}
          </svg>
        </div>

        {/* floating glass panels at increasing depth (illustrative UI, not real data) */}
        <Float z={95} className="-right-3 -top-6 sm:-right-10" delay="0s">
          <div className="w-44 rounded-xl border border-white/10 bg-ink/80 p-3 font-mono text-[0.68rem] leading-relaxed shadow-xl shadow-black/50 backdrop-blur sm:w-52">
            <p><span className="text-violet">const</span> app = <span className="text-cyan">build</span>(idea)</p>
            <p><span className="text-cyan">await</span> test(app)</p>
            <p><span className="text-cyan">deploy</span>(app) <span className="text-muted">{"// ship"}</span></p>
          </div>
        </Float>
        <Float z={140} className="-right-2 bottom-10 sm:-right-12" delay="1.2s">
          <div className="w-44 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.1] to-white/[0.03] p-3 shadow-xl shadow-black/50 backdrop-blur sm:w-52">
            <p className="flex items-center gap-1.5 text-[0.62rem] font-medium uppercase tracking-wider text-cyan"><Sparkles size={11} /> AI assistant</p>
            <p className="mt-2 rounded-lg rounded-bl-none bg-white/[0.07] px-2.5 py-1.5 text-xs">How can I help your business today?</p>
            <p className="ml-auto mt-1.5 w-fit rounded-lg rounded-br-none bg-gradient-to-r from-blue to-violet px-2.5 py-1.5 text-xs">Automate my invoices</p>
          </div>
        </Float>
        <Float z={80} className="-bottom-4 -left-3 sm:-left-8" delay="2.4s">
          <div className="rounded-xl border border-white/10 bg-raised/90 px-4 py-3 shadow-xl shadow-black/50 backdrop-blur">
            <p className="eyebrow !text-[0.6rem]">Deploy</p>
            <p className="mt-1 flex items-center gap-2 text-sm"><span className="grid h-4 w-4 place-items-center rounded-full bg-cyan/20 text-cyan"><Check size={10} /></span> Pipeline healthy</p>
          </div>
        </Float>
        <Float z={55} className="-left-4 top-8 hidden sm:block sm:-left-10" delay="3.2s">
          <div className="flex items-end gap-1 rounded-xl border border-white/10 bg-ink/80 p-3 shadow-xl shadow-black/50 backdrop-blur">
            {[40, 62, 48, 78, 58, 88].map((h, i) => <span key={i} className="w-2 rounded-sm bg-gradient-to-t from-blue to-violet" style={{ height: h * 0.5 }} />)}
          </div>
        </Float>
      </motion.div>
    </div>
  );
}

function Float({ z, className, delay, children }: { z: number; className: string; delay: string; children: React.ReactNode }) {
  return (
    <div className={`absolute ${className}`} style={{ transform: `translateZ(${z}px)` }}>
      <div className="float-slow" style={{ animationDelay: delay }}>{children}</div>
    </div>
  );
}
