"use client";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Honors the visitor's reduced-motion setting for every motion animation (transforms/layout are skipped). */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
