"use client";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * 3D tilt card: rotates toward the pointer with a moving light glare. Inner layers can use translateZ for depth.
 * The reduced-motion preference is read only when the pointer moves (never during render), so server and
 * client markup always match; MotionConfig (see Providers) already disables the hover scale.
 */
export function TiltCard({ children, className = "", max = 9 }: { children: ReactNode; className?: string; max?: number }) {
  const reduce = useRef(false);
  useEffect(() => { reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches; }, []);
  const x = useMotionValue(0.5), y = useMotionValue(0.5);
  const sx = useSpring(x, { stiffness: 160, damping: 18 }), sy = useSpring(y, { stiffness: 160, damping: 18 });
  const rotY = useTransform(sx, [0, 1], [-max, max]);
  const rotX = useTransform(sy, [0, 1], [max, -max]);
  const glare = useTransform([sx, sy], ([a, b]) => `radial-gradient(260px circle at ${(a as number) * 100}% ${(b as number) * 100}%, rgb(255 255 255 / 0.10), transparent 60%)`);
  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div
        className="relative h-full rounded-2xl"
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.02, z: 20 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        onPointerMove={(e) => { if (reduce.current) return; const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width); y.set((e.clientY - r.top) / r.height); }}
        onPointerLeave={() => { x.set(0.5); y.set(0.5); }}
      >
        {children}
        <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl motion-reduce:hidden" style={{ background: glare }} />
      </motion.div>
    </div>
  );
}
