"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides public header/footer inside the admin area. */
export function HideOnAdmin({ children }: { children: ReactNode }) {
  return usePathname().startsWith("/admin") ? null : <>{children}</>;
}
