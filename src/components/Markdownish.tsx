/** Minimal safe renderer: "## " headings and paragraphs only; everything is rendered as text (no HTML injection). */
export function Markdownish({ text }: { text: string }) {
  return (
    <div className="space-y-5 text-lg leading-relaxed text-fg/85">
      {text.split(/\n{2,}/).map((b, i) => b.startsWith("## ")
        ? <h2 key={i} className="pt-4 text-2xl font-semibold tracking-tight text-fg">{b.slice(3)}</h2>
        : <p key={i}>{b}</p>)}
    </div>
  );
}
