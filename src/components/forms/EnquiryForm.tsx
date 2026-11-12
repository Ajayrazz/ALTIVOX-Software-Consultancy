"use client";

import { useActionState, useState, startTransition } from "react";
import { submitEnquiry, type EnquiryState } from "@/actions/enquiry";
import { Field, Input, Textarea, Select } from "./fields";
import { budgetOptions, contactPrefs } from "@/lib/validation";
import { btnPrimary } from "@/components/ui/Section";
import { CheckCircle2, Loader2 } from "lucide-react";

export function EnquiryForm({ type = "CONTACT", productSlug, productName, services = [] }: { type?: "CONTACT" | "PRODUCT" | "DEMO"; productSlug?: string; productName?: string; services?: string[] }) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, null);
  const [ts] = useState(() => Date.now());
  const e = state?.errors ?? {};

  if (state?.ok) {
    return (
      <div role="status" className="rounded-2xl border border-cyan/30 bg-cyan/5 p-8 text-center">
        <CheckCircle2 className="mx-auto text-cyan" size={36} />
        <p className="mt-4 text-lg font-medium">{state.message}</p>
      </div>
    );
  }
  return (
    <form onSubmit={(ev) => { ev.preventDefault(); const fd = new FormData(ev.currentTarget); startTransition(() => action(fd)); }} className="space-y-5" noValidate>
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="ts" value={ts} />
      {productSlug && <input type="hidden" name="productSlug" value={productSlug} />}
      <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" name="website" /></label></div>
      {productName && <p className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted">Enquiring about: <span className="font-medium text-fg">{productName}</span></p>}
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name *" name="name" error={e.name}><Input name="name" autoComplete="name" err={e.name} required /></Field>
        <Field label="Email *" name="email" error={e.email}><Input name="email" type="email" autoComplete="email" err={e.email} required /></Field>
        <Field label="Company" name="company"><Input name="company" autoComplete="organization" /></Field>
        <Field label="Phone / WhatsApp" name="phone" error={e.phone}><Input name="phone" type="tel" autoComplete="tel" err={e.phone} placeholder="+91…" /></Field>
        {services.length > 0 && <Field label="Service required" name="service"><Select name="service" options={services} /></Field>}
        <Field label="Project budget" name="budget"><Select name="budget" options={budgetOptions} /></Field>
        <Field label="Preferred contact method" name="contactPref"><Select name="contactPref" options={contactPrefs} /></Field>
      </div>
      <Field label="How can we help? *" name="message" error={e.message}><Textarea name="message" err={e.message} required /></Field>
      {state && !state.ok && state.message && <p role="alert" className="text-sm text-red-400">{state.message}</p>}
      <button disabled={pending} className={`${btnPrimary} w-full sm:w-auto disabled:opacity-60`}>
        {pending ? <><Loader2 className="animate-spin" size={18} /> Sending…</> : "Send message"}
      </button>
      <p className="text-xs text-muted">We only use your details to respond to this enquiry.</p>
    </form>
  );
}
