"use client";
import { motion } from "motion/react";

export function ActivityChart({ data }: { data: { label: string; count: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.count));
  return (
    <div>
      <div className="flex h-44 items-end gap-1.5 sm:gap-2.5" role="img" aria-label="Enquiries per day, last 14 days">
        {data.map((d, i) => (
          <div key={d.label} className="group relative flex h-full flex-1 flex-col justify-end" title={`${d.label}: ${d.count}`}>
            <span className="mb-1 text-center font-mono text-[0.62rem] text-muted opacity-0 transition group-hover:opacity-100">{d.count}</span>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${Math.max(d.count === 0 ? 3 : 8, (d.count / max) * 100)}%` }}
              transition={{ duration: 0.8, delay: 0.25 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-md ${d.count === 0 ? "bg-line" : "bg-gradient-to-t from-blue to-violet shadow-[0_0_18px_-4px_rgb(124_92_255/0.8)]"}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-1.5 sm:gap-2.5">
        {data.map((d, i) => <span key={d.label} className="flex-1 text-center font-mono text-[0.58rem] text-muted">{i % 2 === 0 ? d.label : ""}</span>)}
      </div>
    </div>
  );
}
