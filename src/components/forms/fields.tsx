import type { ReactNode } from "react";

const base = "w-full rounded-xl border border-line bg-surface px-4 py-3 text-base text-fg placeholder:text-muted/60 outline-none transition focus:border-blue focus:ring-2 focus:ring-blue/30 aria-[invalid=true]:border-red-400";

export function Field({ label, name, error, children, hint }: { label: string; name: string; error?: string; children: ReactNode; hint?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">{label}</label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
      {error && <p id={`${name}-err`} role="alert" className="mt-1.5 text-sm text-red-400">{error}</p>}
    </div>
  );
}
export const Input = (p: React.InputHTMLAttributes<HTMLInputElement> & { err?: string }) => { const { err, ...r } = p; return <input {...r} id={r.name} aria-invalid={!!err} aria-describedby={err ? `${r.name}-err` : undefined} className={base} />; };
export const Textarea = (p: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { err?: string }) => { const { err, ...r } = p; return <textarea {...r} id={r.name} rows={5} aria-invalid={!!err} aria-describedby={err ? `${r.name}-err` : undefined} className={base} />; };
export const Select = ({ options, err, ...r }: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[]; err?: string }) => (
  <select {...r} id={r.name} aria-invalid={!!err} className={base}>
    <option value="">Select…</option>
    {options.map((o) => <option key={o} value={o}>{o}</option>)}
  </select>
);
