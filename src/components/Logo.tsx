import Link from "next/link";
import { useId } from "react";

export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="2" y1="30" x2="30" y2="2">
          <stop stopColor="#3B6CFF" />
          <stop offset="1" stopColor="#7C5CFF" />
        </linearGradient>
      </defs>
      <path d="M3 28 16 4l13 24" stroke={`url(#${id})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 20h13" stroke="#3DD9EB" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Altivox home">
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-[0.22em]">ALTIVOX</span>
    </Link>
  );
}
