/** Decorative, purely-CSS 3D shapes. Hidden from assistive tech. Animations stop for reduced motion (see globals.css). */
export function Cube3D({ size = 80, className = "" }: { size?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none ${className}`} style={{ perspective: 800 }}>
      <div className="cube3d" style={{ ["--s" as string]: `${size}px` }}>
        <i /><i /><i /><i /><i /><i />
      </div>
    </div>
  );
}

export function Rings3D({ size = 220, className = "" }: { size?: number; className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none relative ${className}`} style={{ width: size, height: size, perspective: 900 }}>
      <div className="preserve-3d absolute inset-0">
        <span className="ring3d r1" /><span className="ring3d r2" /><span className="ring3d r3" />
        <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue to-cyan shadow-[0_0_30px_8px_rgb(59_108_255/0.55)]" />
      </div>
    </div>
  );
}
