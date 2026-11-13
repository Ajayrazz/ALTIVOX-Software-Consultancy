"use server";

import { headers } from "next/headers";
import { db } from "@/lib/db";
import { enquirySchema } from "@/lib/validation";
import { rateLimit } from "@/lib/ratelimit";
import { sendEnquiryEmail } from "@/lib/email";
import { site } from "@/lib/site";

export type EnquiryState = { ok: boolean; message?: string; errors?: Record<string, string> } | null;

export async function submitEnquiry(_prev: EnquiryState, fd: FormData): Promise<EnquiryState> {
  // Spam traps: honeypot field + minimum fill time
  if (String(fd.get("website") ?? "") !== "") return { ok: true, message: "Thanks!" }; // silently drop bots
  const started = Number(fd.get("ts") ?? 0);
  if (!started || Date.now() - started < 2500) return { ok: false, message: "That was a bit quick. Please try again." };

  const raw = Object.fromEntries([...fd.entries()].filter(([k]) => !["website", "ts"].includes(k) && !k.startsWith("meta.") && !k.startsWith("$ACTION")));
  const meta = Object.fromEntries([...fd.entries()].filter(([k]) => k.startsWith("meta.")).map(([k, v]) => [k.slice(5), String(v)]));
  const parsed = enquirySchema.safeParse({ ...raw, meta: Object.keys(meta).length ? meta : undefined });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const i of parsed.error.issues) errors[String(i.path[0])] ??= i.message;
    return { ok: false, errors, message: "Please fix the highlighted fields." };
  }
  // Rate-limit only submissions that pass validation, so honest typos never lock a visitor out.
  const ip = ((await headers()).get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (!rateLimit(`enq:${ip}`, 5, 10 * 60_000)) return { ok: false, message: "Too many submissions. Please try again in a few minutes." };
  const d = parsed.data;
  try {
    await db.enquiry.create({ data: { ...d, phone: d.phone || null, meta: d.meta ?? undefined } });
  } catch (err) {
    console.error("enquiry save failed", err);
    return { ok: false, message: `Something went wrong on our side. Please try again shortly${site.contact.email ? ` or email us at ${site.contact.email}` : ""}.` };
  }
  // Email is best-effort: the enquiry is already safely stored.
  sendEnquiryEmail({ type: d.type, name: d.name, email: d.email, company: d.company, phone: d.phone, service: d.service, budget: d.budget, timeline: d.timeline, contact: d.contactPref, product: d.productSlug, message: d.message, ...(d.meta ?? {}) }).catch((e) => console.error("email failed", e));
  return { ok: true, message: "Thank you! We've received your message and will reply within one business day." };
}
