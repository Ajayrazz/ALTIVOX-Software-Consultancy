"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

const nodes = [
  { id: "ui", label: "Interface", x: 70, y: 70, c: "#3B6CFF" },
  { id: "api", label: "API", x: 250, y: 150, c: "#7C5CFF" },
  { id: "ai", label: "AI Layer", x: 430, y: 70, c: "#3DD9EB" },
  { id: "db", label: "Data", x: 250, y: 300, c: "#7C5CFF" },
  { id: "cloud", label: "Cloud", x: 430, y: 280, c: "#3B6CFF" },
];
const edges: [string, string][] = [
  ["ui", "api"], ["api", "ai"], ["api", "db"], ["db", "cloud"], ["ai", "cloud"],
];
const pos = Object.fromEntries(nodes.map((n) => [n.id, n]));

/** Animated "system blueprint": nodes joined by flowing signal lines, tilting with the pointer. */
export function HeroVisual() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18 });
  const sy = useSpring(my, { stiffness: 90, damping: 18 });
  const rotY = useTransform(sx, [-1, 1], [-7, 7]);
  const rotX = useTransform(sy, [-1, 1], [6, -6]);

  return (
    <div
      className="relative mx-auto w-full max-w-[560px]"
      style={{ perspective: 1200 }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <div className="absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgb(124_92_255/0.28),transparent_60%)] blur-2xl" />
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-line bg-surface/70 p-3 shadow-2xl shadow-black/50 backdrop-blur"
      >
        <div className="flex items-center gap-1.5 px-2 pb-3 pt-1">
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
          <span className="h-2 w-2 rounded-full bg-line" />
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
            <motion.g
              key={n.id}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.12, type: "spring", stiffness: 160, damping: 16 }}
              style={{ transformOrigin: `${n.x}px ${n.y}px` }}
            >
              <circle cx={n.x} cy={n.y} r="30" fill="#0E1017" stroke={n.c} strokeOpacity="0.55" />
              <circle cx={n.x} cy={n.y} r="5" fill={n.c} />
              <text x={n.x} y={n.y + 50} textAnchor="middle" fill="#8B91A3" fontSize="12" fontFamily="var(--font-geist-mono)" stroke="#0E1017" strokeWidth="6" paintOrder="stroke">
                {n.label}
              </text>
            </motion.g>
          ))}
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="float-slow absolute -bottom-6 -left-2 hidden rounded-xl border border-line bg-raised/90 px-4 py-3 backdrop-blur sm:block"
      >
        <p className="eyebrow !text-[0.6rem]">Deploy</p>
        <p className="mt-1 flex items-center gap-2 text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan" /> Pipeline healthy
        </p>
      </motion.div>
    </div>
  );
}
