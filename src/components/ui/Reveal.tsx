"use client";
import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Scroll-triggered reveal. variant "tilt" swings the element in from a 3D angle. Reduced motion is handled by MotionConfig. */
export function Reveal({ children, delay = 0, className, variant = "up" }: { children: ReactNode; delay?: number; className?: string; variant?: "up" | "tilt" }) {
  const hidden = variant === "tilt" ? { opacity: 0, y: 40, rotateX: 38, scale: 0.94, transformPerspective: 900 } : { opacity: 0, y: 24 };
  const shown = variant === "tilt" ? { opacity: 1, y: 0, rotateX: 0, scale: 1, transformPerspective: 900 } : { opacity: 1, y: 0 };
  return (
    <motion.div className={className} initial={hidden} whileInView={shown} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
