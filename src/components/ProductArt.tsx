import type { ReactNode } from "react";

/**
 * Custom illustrated scene per product (viewBox 320x200). Each one depicts what the product does.
 * Colours come from the product's accent pair so admin edits still theme correctly.
 */
type C = { f: string; t: string };

const P = "rgba(255,255,255,0.05)"; // panel
const L = "rgba(255,255,255,0.14)"; // text line
const S = "rgba(255,255,255,0.09)"; // stroke

function Win({ children, c, side = true }: { children: ReactNode; c: C; side?: boolean }) {
  return (
    <>
      <rect x="10" y="10" width="300" height="180" rx="10" fill="#0B0D14" stroke={S} />
      <circle cx="23" cy="22" r="2.5" fill={L} /><circle cx="32" cy="22" r="2.5" fill={L} /><circle cx="41" cy="22" r="2.5" fill={L} />
      <line x1="10" y1="32" x2="310" y2="32" stroke={S} />
      {side && (
        <>
          <rect x="16" y="38" width="38" height="146" rx="6" fill={P} />
          {[46, 60, 74, 88].map((y, i) => <rect key={y} x="22" y={y} width={i === 0 ? 26 : 20} height="5" rx="2.5" fill={i === 0 ? c.t : L} opacity={i === 0 ? 0.9 : 1} />)}
        </>
      )}
      {children}
    </>
  );
}
const Line = ({ x, y, w, o = 1 }: { x: number; y: number; w: number; o?: number }) => <rect x={x} y={y} width={w} height="4.5" rx="2.2" fill={L} opacity={o} />;
const Pill = ({ x, y, w, c, label }: { x: number; y: number; w: number; c: string; label?: string }) => (
  <g><rect x={x} y={y} width={w} height="12" rx="6" fill={c} opacity="0.2" /><rect x={x} y={y} width={w} height="12" rx="6" fill="none" stroke={c} opacity="0.5" />
    {label && <text x={x + w / 2} y={y + 8.6} textAnchor="middle" fontSize="6.5" fill={c} fontFamily="monospace">{label}</text>}</g>
);

const scenes: Record<string, (c: C) => ReactNode> = {
  clinicdesk: (c) => (
    <Win c={c}>
      {/* ECG */}
      <path d="M62 52 H100 l6 -12 l8 24 l7 -30 l7 24 l5 -6 H190" fill="none" stroke={c.f} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(62 ${78 + i * 26})`}>
          <rect width="128" height="21" rx="6" fill={P} />
          <circle cx="12" cy="10.5" r="6" fill={i % 2 ? c.f : c.t} opacity="0.75" />
          <Line x={24} y={6} w={44} /><Line x={24} y={13} w={28} o={0.6} />
          <Pill x={92} y={5} w={30} c={["#3DD9EB", "#7C5CFF", "#3DD9EB", "#8B91A3"][i]} label={["Now", "10:30", "Done", "Wait"][i]} />
        </g>
      ))}
      {/* mini calendar */}
      <rect x="200" y="40" width="102" height="136" rx="8" fill={P} />
      <text x="210" y="56" fontSize="8" fill="#F4F5F8" fontFamily="monospace">NOV 2026</text>
      {Array.from({ length: 28 }).map((_, i) => {
        const x = 210 + (i % 7) * 13, y = 66 + Math.floor(i / 7) * 14, on = i === 12;
        return <g key={i}>{on && <rect x={x - 3} y={y - 3} width="11" height="11" rx="3" fill={c.t} />}<circle cx={x + 2.5} cy={y + 2.5} r="1.6" fill={on ? "#fff" : L} /></g>;
      })}
      <rect x="210" y="128" width="82" height="18" rx="5" fill={c.f} opacity="0.2" /><Line x={216} y={135} w={46} />
      <rect x="210" y="150" width="82" height="18" rx="5" fill={c.t} opacity="0.2" /><Line x={216} y={157} w={36} />
    </Win>
  ),
  schoolsync: (c) => (
    <Win c={c}>
      <text x="62" y="50" fontSize="8" fill="#F4F5F8" fontFamily="monospace">ATTENDANCE · CLASS 8-B</text>
      {Array.from({ length: 6 }).map((_, r) => (
        <g key={r}>
          <circle cx="68" cy={70 + r * 18} r="5" fill={r % 2 ? c.f : c.t} opacity="0.7" />
          <Line x={78} y={67.5 + r * 18} w={30} />
          {Array.from({ length: 10 }).map((__, k) => {
            const absent = (r * 3 + k * 7) % 11 === 0;
            return <rect key={k} x={118 + k * 11} y={65 + r * 18} width="8" height="9" rx="2.5" fill={absent ? "#FF6B81" : c.t} opacity={absent ? 0.8 : 0.55} />;
          })}
        </g>
      ))}
      {/* report card */}
      <rect x="236" y="40" width="68" height="136" rx="8" fill={P} stroke={S} />
      <text x="246" y="56" fontSize="7" fill="#8B91A3" fontFamily="monospace">REPORT</text>
      <text x="246" y="80" fontSize="20" fontWeight="700" fill={c.t}>A+</text>
      {[0.9, 0.7, 0.85, 0.6].map((w, i) => <g key={i}><rect x="246" y={96 + i * 15} width="48" height="5" rx="2.5" fill={L} /><rect x="246" y={96 + i * 15} width={48 * w} height="5" rx="2.5" fill={i % 2 ? c.f : c.t} /></g>)}
      <rect x="246" y="156" width="48" height="12" rx="6" fill={c.f} /><text x="270" y="164.5" textAnchor="middle" fontSize="6.5" fill="#fff">Fees paid</text>
    </Win>
  ),
  shopkit: (c) => (
    <Win c={c}>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${62 + i * 62} 42)`}>
          <rect width="56" height="80" rx="7" fill={P} />
          <rect x="4" y="4" width="48" height="42" rx="5" fill={`url(#sk${i})`} />
          <defs><linearGradient id={`sk${i}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={i % 2 ? c.t : c.f} /><stop offset="1" stopColor={i % 2 ? c.f : c.t} stopOpacity="0.5" /></linearGradient></defs>
          <Line x={6} y={53} w={34} /><Line x={6} y={61} w={22} o={0.6} />
          <rect x="6" y="68" width="26" height="8" rx="4" fill={c.t} opacity="0.85" />
        </g>
      ))}
      {[0, 1, 2].map((i) => <g key={i} transform={`translate(${62 + i * 62} 130)`}><rect width="56" height="46" rx="7" fill={P} /><rect x="4" y="4" width="48" height="22" rx="5" fill={L} opacity="0.7" /><Line x={6} y={32} w={30} /></g>)}
      {/* cart */}
      <rect x="250" y="38" width="54" height="138" rx="8" fill={P} stroke={S} />
      <text x="258" y="53" fontSize="7" fill="#8B91A3" fontFamily="monospace">CART · 3</text>
      {[0, 1, 2].map((i) => <g key={i}><rect x="258" y={62 + i * 20} width="14" height="14" rx="3" fill={i % 2 ? c.t : c.f} opacity="0.7" /><Line x={277} y={65 + i * 20} w={20} /><Line x={277} y={72 + i * 20} w={12} o={0.5} /></g>)}
      <rect x="258" y="150" width="38" height="16" rx="8" fill={c.f} /><text x="277" y="160.5" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="600">Pay</text>
    </Win>
  ),
  invoiceflow: (c) => (
    <Win c={c} side={false}>
      <rect x="40" y="42" width="150" height="140" rx="8" fill="#F4F5F8" opacity="0.96" />
      <text x="52" y="60" fontSize="9" fontWeight="700" fill="#0B0D14">INVOICE</text><text x="52" y="70" fontSize="6" fill="#6b7280" fontFamily="monospace">#INV-0142 · GST</text>
      <rect x="140" y="50" width="40" height="14" rx="7" fill="none" stroke={c.t} strokeWidth="1.5" /><text x="160" y="60" textAnchor="middle" fontSize="7" fontWeight="700" fill={c.t}>PAID</text>
      {[0, 1, 2, 3].map((i) => <g key={i}><rect x="52" y={84 + i * 16} width={70 - i * 6} height="4.5" rx="2" fill="#cbd5e1" /><rect x="150" y={84 + i * 16} width="30" height="4.5" rx="2" fill="#cbd5e1" /></g>)}
      <line x1="52" y1="152" x2="180" y2="152" stroke="#cbd5e1" /><text x="52" y="168" fontSize="8" fontWeight="700" fill="#0B0D14">Total</text><text x="180" y="168" textAnchor="end" fontSize="9" fontWeight="700" fill={c.f}>₹ 12,480</text>
      {/* side stats */}
      <rect x="204" y="42" width="98" height="62" rx="8" fill={P} /><text x="212" y="56" fontSize="7" fill="#8B91A3" fontFamily="monospace">THIS MONTH</text>
      <path d="M212 94 L228 82 L242 88 L258 72 L274 78 L292 62" fill="none" stroke={c.t} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="204" y="112" width="98" height="30" rx="8" fill={P} /><circle cx="218" cy="127" r="6" fill={c.f} opacity="0.8" /><Line x={230} y={122} w={50} /><Line x={230} y={130} w={30} o={0.5} />
      <rect x="204" y="148" width="98" height="30" rx="8" fill={P} /><circle cx="218" cy="163" r="6" fill="#FFB84D" opacity="0.85" /><Line x={230} y={158} w={34} /><Pill x={270} y={157} w={26} c="#FFB84D" label="Due" />
    </Win>
  ),
  leadpilot: (c) => (
    <Win c={c}>
      {[["NEW", c.f], ["CONTACTED", c.t], ["WON", "#3DD9EB"]].map(([n, col], i) => (
        <g key={n} transform={`translate(${62 + i * 82} 40)`}>
          <rect width="76" height="138" rx="8" fill={P} />
          <circle cx="9" cy="11" r="3" fill={col} /><text x="16" y="14" fontSize="6.5" fill="#8B91A3" fontFamily="monospace">{n}</text>
          {Array.from({ length: i === 1 ? 2 : 3 }).map((_, k) => (
            <g key={k} transform={`translate(6 ${24 + k * 36})`}><rect width="64" height="30" rx="6" fill="#141824" stroke={S} />
              <Line x={6} y={7} w={36} /><Line x={6} y={15} w={24} o={0.5} /><circle cx="54" cy="21" r="4.5" fill={col} opacity="0.7" /></g>
          ))}
        </g>
      ))}
      {/* lifted card */}
      <g transform="translate(176 84) rotate(5)"><rect width="64" height="32" rx="6" fill="#1B2030" stroke={c.t} strokeWidth="1.2" /><Line x={6} y={8} w={38} /><Line x={6} y={17} w={24} o={0.5} /><circle cx="54" cy="22" r="4.5" fill={c.t} /></g>
    </Win>
  ),
  "chatdesk-ai": (c) => (
    <Win c={c} side={false}>
      <circle cx="32" cy="56" r="9" fill={c.t} opacity="0.9" /><rect x="28" y="52" width="8" height="7" rx="2" fill="#0B0D14" />
      <rect x="46" y="46" width="134" height="26" rx="10" fill={P} stroke={S} /><Line x={54} y={54} w={100} /><Line x={54} y={62} w={70} o={0.6} />
      <rect x="118" y="80" width="104" height="22" rx="10" fill={c.f} opacity="0.9" /><rect x="128" y="88" width="70" height="4.5" rx="2" fill="#fff" opacity="0.8" />
      <circle cx="32" cy="124" r="9" fill={c.t} opacity="0.9" /><rect x="28" y="120" width="8" height="7" rx="2" fill="#0B0D14" />
      <rect x="46" y="110" width="150" height="48" rx="10" fill={P} stroke={S} /><Line x={54} y={118} w={120} /><Line x={54} y={126} w={104} o={0.7} /><Line x={54} y={134} w={60} o={0.5} />
      <rect x="54" y="142" width="44" height="12" rx="6" fill={c.t} opacity="0.2" stroke={c.t} /><text x="76" y="150.5" textAnchor="middle" fontSize="6" fill={c.t}>Source: FAQ</text>
      <rect x="20" y="164" width="200" height="18" rx="9" fill={P} stroke={S} />
      <circle cx="32" cy="173" r="1.8" fill={c.t}><animate attributeName="opacity" values="1;.2;1" dur="1.2s" repeatCount="indefinite" /></circle><circle cx="40" cy="173" r="1.8" fill={c.t} opacity=".6" /><circle cx="48" cy="173" r="1.8" fill={c.t} opacity=".3" />
      <circle cx="205" cy="173" r="7" fill={c.f} /><path d="M202 173 h6 m-3 -3 l3 3 l-3 3" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <rect x="232" y="42" width="70" height="136" rx="8" fill={P} /><text x="240" y="56" fontSize="7" fill="#8B91A3" fontFamily="monospace">TOPICS</text>
      {[0.9, 0.65, 0.45, 0.3].map((w, i) => <g key={i}><Line x={240} y={66 + i * 20} w={36} /><rect x="240" y={74 + i * 20} width="54" height="5" rx="2.5" fill={L} opacity=".5" /><rect x="240" y={74 + i * 20} width={54 * w} height="5" rx="2.5" fill={i % 2 ? c.f : c.t} /></g>)}
    </Win>
  ),
  fleettrack: (c) => (
    <Win c={c} side={false}>
      <rect x="16" y="38" width="206" height="146" rx="8" fill="#0F1320" />
      {[0, 1, 2, 3, 4, 5].map((i) => <line key={`h${i}`} x1="16" y1={52 + i * 26} x2="222" y2={52 + i * 26} stroke={S} />)}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <line key={`v${i}`} x1={32 + i * 26} y1="38" x2={32 + i * 26} y2="184" stroke={S} />)}
      <path d="M38 160 L84 160 L84 118 L146 118 L146 78 L198 78" fill="none" stroke={c.f} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
      <path d="M38 160 L84 160 L84 118 L146 118" fill="none" stroke={c.t} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="38" cy="160" r="5" fill={c.t} />
      <g transform="translate(146 118)"><circle r="12" fill={c.t} opacity="0.2"><animate attributeName="r" values="8;16;8" dur="2s" repeatCount="indefinite" /></circle><circle r="6" fill={c.t} /><rect x="-3" y="-2" width="6" height="4" rx="1" fill="#0B0D14" /></g>
      <path d="M198 66 a8 8 0 1 1 0.1 0 l-0.1 0 l0 12" fill={c.f} stroke={c.f} /><circle cx="198" cy="64" r="3" fill="#0B0D14" />
      <rect x="232" y="42" width="70" height="136" rx="8" fill={P} /><text x="240" y="56" fontSize="7" fill="#8B91A3" fontFamily="monospace">TRIP #214</text>
      <text x="240" y="78" fontSize="15" fontWeight="700" fill="#F4F5F8">18 min</text><Line x={240} y={86} w={34} o={0.6} />
      {[0, 1, 2].map((i) => <g key={i}><circle cx="244" cy={108 + i * 20} r="3.5" fill={i === 0 ? c.t : i === 1 ? c.f : L} /><Line x={254} y={106 + i * 20} w={36} /></g>)}
      <rect x="240" y="160" width="54" height="12" rx="6" fill={c.t} opacity="0.2" stroke={c.t} /><text x="267" y="168.5" textAnchor="middle" fontSize="6.5" fill={c.t}>On time</text>
    </Win>
  ),
  estatehub: (c) => (
    <Win c={c} side={false}>
      <rect x="16" y="38" width="190" height="146" rx="8" fill="#0F1320" />
      <circle cx="170" cy="62" r="12" fill={c.t} opacity="0.35" />
      {[[26, 90, 28, 90], [58, 64, 34, 116], [96, 100, 26, 80], [126, 76, 32, 104], [162, 108, 30, 72]].map(([x, y, w, h], i) => (
        <g key={i}><rect x={x} y={y} width={w} height={h} rx="3" fill={i % 2 ? c.f : c.t} opacity={0.35 + i * 0.1} />
          {Array.from({ length: Math.floor(h / 16) }).map((_, r) => <g key={r}><rect x={x + 5} y={y + 8 + r * 16} width="6" height="7" rx="1.5" fill="#0B0D14" opacity=".7" /><rect x={x + w - 11} y={y + 8 + r * 16} width="6" height="7" rx="1.5" fill="#0B0D14" opacity=".7" /></g>)}</g>
      ))}
      <rect x="16" y="168" width="190" height="16" fill="#0B0D14" opacity=".6" />
      <rect x="216" y="42" width="88" height="136" rx="8" fill={P} stroke={S} />
      <rect x="222" y="48" width="76" height="46" rx="5" fill={`url(#eh)`} /><defs><linearGradient id="eh" x1="0" y1="0" x2="1" y2="1"><stop stopColor={c.f} /><stop offset="1" stopColor={c.t} stopOpacity=".6" /></linearGradient></defs>
      <text x="224" y="112" fontSize="12" fontWeight="700" fill="#F4F5F8">₹ 82 L</text><Line x={224} y={120} w={56} o={0.6} />
      <Pill x={224} y={130} w={22} c={c.t} label="3 BHK" /><Pill x={250} y={130} w={22} c={c.f} label="2 BA" />
      <rect x="224" y="152" width="72" height="16" rx="8" fill={c.f} /><text x="260" y="162.5" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="600">Enquire</text>
    </Win>
  ),
  booknest: (c) => (
    <Win c={c} side={false}>
      <text x="24" y="50" fontSize="8" fill="#F4F5F8" fontFamily="monospace">SELECT A SLOT</text>
      {["M", "T", "W", "T", "F", "S"].map((d, i) => <g key={i}><text x={48 + i * 28} y="68" textAnchor="middle" fontSize="7" fill="#8B91A3" fontFamily="monospace">{d}</text>
        <rect x={36 + i * 28} y="74" width="24" height="24" rx="7" fill={i === 2 ? c.t : P} /><text x={48 + i * 28} y="90" textAnchor="middle" fontSize="9" fill={i === 2 ? "#0B0D14" : "#F4F5F8"} fontWeight="600">{12 + i}</text></g>)}
      {Array.from({ length: 8 }).map((_, i) => { const x = 24 + (i % 4) * 46, y = 112 + Math.floor(i / 4) * 28, on = i === 5, off = i === 2;
        return <g key={i}><rect x={x} y={y} width="40" height="22" rx="7" fill={on ? c.f : P} stroke={on ? c.f : S} opacity={off ? 0.4 : 1} /><text x={x + 20} y={y + 14.5} textAnchor="middle" fontSize="7.5" fill={on ? "#fff" : "#F4F5F8"} fontFamily="monospace" textDecoration={off ? "line-through" : "none"}>{["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"][i]}</text></g>; })}
      <rect x="24" y="170" width="170" height="14" rx="7" fill={c.t} /><text x="109" y="180" textAnchor="middle" fontSize="7.5" fill="#0B0D14" fontWeight="700">Confirm booking</text>
      <rect x="214" y="42" width="90" height="136" rx="8" fill={P} stroke={S} /><circle cx="259" cy="68" r="14" fill={c.f} opacity="0.8" /><Line x={232} y={92} w={54} /><Line x={240} y={100} w={38} o={0.5} />
      <circle cx="259" cy="132" r="14" fill="none" stroke={c.t} strokeWidth="2.5" /><path d="M252 132 l5 5 l9 -10" fill="none" stroke={c.t} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /><Line x={234} y={158} w={50} />
    </Win>
  ),
  autoflow: (c) => (
    <Win c={c} side={false}>
      <defs><pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.8" fill={L} /></pattern></defs>
      <rect x="16" y="38" width="288" height="146" rx="8" fill="url(#dots)" />
      {[["M72 96 C100 96 96 78 124 78", ""], ["M72 96 C100 96 96 122 124 122", ""], ["M176 78 C204 78 200 96 228 96", ""], ["M176 122 C204 122 200 96 228 96", ""]].map(([d], i) => <g key={i}><path d={d} fill="none" stroke={S} strokeWidth="2" /><path d={d} fill="none" stroke={c.t} strokeWidth="2" strokeDasharray="4 8"><animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.4s" repeatCount="indefinite" /></path></g>)}
      {[[26, 78, "Form", c.f], [124, 58, "Filter", c.t], [124, 102, "Sheet", c.f], [228, 76, "WhatsApp", c.t]].map(([x, y, n, col], i) => (
        <g key={i} transform={`translate(${x} ${y})`}><rect width={i === 3 ? 62 : 52} height="40" rx="9" fill="#141824" stroke={col as string} strokeOpacity=".6" /><circle cx="12" cy="13" r="5" fill={col as string} opacity=".85" /><text x="8" y="31" fontSize="6.8" fill="#F4F5F8" fontFamily="monospace">{n}</text></g>
      ))}
      <rect x="26" y="150" width="268" height="24" rx="8" fill={P} /><circle cx="40" cy="162" r="4" fill={c.t} /><Line x={52} y={156} w={90} /><Line x={52} y={164} w={60} o={0.5} /><Pill x={246} y={156} w={40} c={c.t} label="Ran · 2s" />
    </Win>
  ),
  appstarter: (c) => (
    <>
      <rect x="10" y="10" width="300" height="180" rx="10" fill="#0B0D14" stroke={S} />
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${i === 0 ? 78 : 178} ${i === 0 ? 22 : 34})`}>
          <rect width="64" height="140" rx="12" fill="#10131D" stroke={i === 0 ? c.t : S} strokeWidth="1.5" />
          <rect x="22" y="5" width="20" height="4" rx="2" fill={L} />
          {i === 0 ? <>
            <rect x="8" y="18" width="48" height="30" rx="7" fill={`url(#as)`} /><defs><linearGradient id="as" x1="0" y1="0" x2="1" y2="1"><stop stopColor={c.f} /><stop offset="1" stopColor={c.t} /></linearGradient></defs>
            {[0, 1, 2].map((k) => <g key={k}><circle cx="16" cy={64 + k * 20} r="5" fill={k % 2 ? c.f : c.t} opacity=".7" /><Line x={26} y={60 + k * 20} w={26} /><Line x={26} y={67 + k * 20} w={16} o={0.5} /></g>)}
          </> : <>
            <circle cx="32" cy="38" r="12" fill={c.f} opacity=".8" /><Line x={12} y={60} w={40} /><rect x="8" y="74" width="48" height="12" rx="6" fill={P} stroke={S} /><rect x="8" y="92" width="48" height="12" rx="6" fill={P} stroke={S} /><rect x="8" y="110" width="48" height="12" rx="6" fill={c.t} />
          </>}
          <line x1="6" y1="128" x2="58" y2="128" stroke={S} />{[0, 1, 2].map((k) => <circle key={k} cx={16 + k * 16} cy="134" r="2.5" fill={k === 0 ? c.t : L} />)}
        </g>
      ))}
      <text x="24" y="44" fontSize="7.5" fill="#8B91A3" fontFamily="monospace">iOS</text><text x="24" y="56" fontSize="7.5" fill="#8B91A3" fontFamily="monospace">+ ANDROID</text>
      <rect x="254" y="150" width="44" height="14" rx="7" fill={c.t} opacity=".2" stroke={c.t} /><text x="276" y="160" textAnchor="middle" fontSize="6.5" fill={c.t} fontFamily="monospace">Expo</text>
    </>
  ),
  sitelaunch: (c) => (
    <>
      <rect x="10" y="10" width="300" height="180" rx="10" fill="#0B0D14" stroke={S} />
      <circle cx="23" cy="22" r="2.5" fill={L} /><circle cx="32" cy="22" r="2.5" fill={L} /><circle cx="41" cy="22" r="2.5" fill={L} />
      <rect x="60" y="15" width="180" height="14" rx="7" fill={P} /><text x="150" y="25" textAnchor="middle" fontSize="6.5" fill="#8B91A3" fontFamily="monospace">yourbusiness.com</text>
      <line x1="10" y1="34" x2="310" y2="34" stroke={S} />
      <rect x="24" y="42" width="30" height="8" rx="4" fill={c.t} /><Line x={190} y={44} w={22} /><Line x={218} y={44} w={22} /><Line x={246} y={44} w={22} /><rect x="274" y="41" width="28" height="10" rx="5" fill={c.f} />
      <rect x="24" y="60" width="272" height="62" rx="9" fill="url(#sl)" /><defs><linearGradient id="sl" x1="0" y1="0" x2="1" y2="1"><stop stopColor={c.f} stopOpacity=".55" /><stop offset="1" stopColor={c.t} stopOpacity=".3" /></linearGradient></defs>
      <rect x="38" y="74" width="120" height="8" rx="4" fill="#F4F5F8" opacity=".9" /><rect x="38" y="88" width="86" height="8" rx="4" fill="#F4F5F8" opacity=".7" />
      <rect x="38" y="104" width="52" height="12" rx="6" fill="#0B0D14" /><text x="64" y="112.5" textAnchor="middle" fontSize="6.5" fill="#F4F5F8">Get started</text>
      {[0, 1, 2].map((i) => <g key={i} transform={`translate(${24 + i * 93} 132)`}><rect width="86" height="48" rx="8" fill={P} /><circle cx="14" cy="14" r="6" fill={i % 2 ? c.t : c.f} opacity=".8" /><Line x={8} y={28} w={52} /><Line x={8} y={36} w={36} o={0.5} /></g>)}
      <g transform="translate(284 116)"><circle r="9" fill="#25D366" /><path d="M-4 -3 q0 6 6 7 l3 -2 l-2 -3 l-2 1 q-2 -1 -3 -3 l1 -2 l-2 -3 z" fill="#0B0D14" /></g>
    </>
  ),
};

export const hasProductArt = (slug?: string) => !!slug && slug in scenes;

export function ProductArt({ slug, from, to, name, className = "" }: { slug: string; from: string; to: string; name: string; className?: string }) {
  const scene = scenes[slug];
  if (!scene) return null;
  return (
    <div
      className={`relative aspect-[16/10] overflow-hidden rounded-xl border border-line ${className}`}
      style={{ background: `radial-gradient(110% 90% at 85% 0%, ${to}38, transparent 60%), radial-gradient(90% 80% at 0% 100%, ${from}30, transparent 60%), #0E1017` }}
    >
      <svg viewBox="0 0 320 200" className="h-full w-full" role="img" aria-label={`${name} product illustration`} preserveAspectRatio="xMidYMid slice">
        {scene({ f: from, t: to })}
      </svg>
    </div>
  );
}
