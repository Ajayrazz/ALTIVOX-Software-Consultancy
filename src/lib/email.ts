import "server-only";
import { Resend } from "resend";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendEnquiryEmail(e: Record<string, string | null | undefined>) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.EMAIL_TO;
  if (!key || !to) return { sent: false as const, reason: "email not configured" };
  const resend = new Resend(key);
  const rows = Object.entries(e).filter(([, v]) => v).map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#666">${esc(k)}</td><td>${esc(String(v)).replace(/\n/g, "<br>")}</td></tr>`).join("");
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Altivox <onboarding@resend.dev>",
    to: [to],
    replyTo: e.email ?? undefined,
    subject: `New ${e.type ?? ""} enquiry from ${e.name ?? "website"}`,
    html: `<table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
  });
  return error ? { sent: false as const, reason: error.message } : { sent: true as const };
}
