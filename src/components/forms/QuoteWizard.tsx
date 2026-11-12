"use client";

import { useActionState, useRef, useState, startTransition } from "react";
import { submitEnquiry, type EnquiryState } from "@/actions/enquiry";
import { Field, Input, Textarea, Select } from "./fields";
import { budgetOptions, timelineOptions, contactPrefs } from "@/lib/validation";
import { btnPrimary, btnGhost } from "@/components/ui/Section";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

const platforms = ["Website", "Web application", "Android / iOS app", "Desktop software", "AI / chatbot", "Automation / integration", "Not sure"];
const categories = ["Healthcare", "Education", "E-commerce", "Finance", "Logistics", "Real estate", "Retail", "Startup", "Professional services", "Other"];
const featureOpts = ["User login & roles", "Payments", "Admin dashboard", "Notifications (email/WhatsApp)", "Reports & analytics", "AI features", "Third-party integrations", "Multi-language"];
const steps = ["Your idea", "Platform & features", "Budget & timeline", "Your details"];

export function QuoteWizard({ productSlug }: { productSlug?: string }) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, null);
  const [step, setStep] = useState(0);
  const [ts] = useState(() => Date.now());
  const ref = useRef<HTMLFormElement>(null);
  const e = state?.errors ?? {};

  if (state?.ok) {
    return (
      <div role="status" className="rounded-2xl border border-cyan/30 bg-cyan/5 p-10 text-center">
        <CheckCircle2 className="mx-auto text-cyan" size={40} />
        <h2 className="mt-4 text-2xl font-semibold">Request received</h2>
        <p className="mt-2 text-muted">{state.message}</p>
      </div>
    );
  }

  const next = () => {
    const panel = ref.current?.querySelector<HTMLElement>(`[data-step="${step}"]`);
    const bad = [...(panel?.querySelectorAll<HTMLInputElement>("[required]") ?? [])].find((i) => !i.checkValidity());
    if (bad) { bad.reportValidity(); return; }
    setStep((s) => s + 1);
  };
  const panel = (i: number) => `space-y-5 ${step === i ? "" : "hidden"}`;

  return (
    <form ref={ref} onSubmit={(ev) => { ev.preventDefault(); const fd = new FormData(ev.currentTarget); startTransition(() => action(fd)); }} className="space-y-8">
      <input type="hidden" name="type" value="QUOTE" />
      <input type="hidden" name="ts" value={ts} />
      {productSlug && <input type="hidden" name="productSlug" value={productSlug} />}
      <div className="absolute -left-[9999px]" aria-hidden="true"><label>Website<input tabIndex={-1} autoComplete="off" name="website" /></label></div>

      <ol className="flex gap-2" aria-label="Progress">
        {steps.map((s, i) => (
          <li key={s} className="flex-1" aria-current={i === step ? "step" : undefined}>
            <div className={`h-1 rounded-full transition-colors ${i <= step ? "bg-gradient-to-r from-blue to-violet" : "bg-line"}`} />
            <p className={`mt-2 hidden text-xs sm:block ${i === step ? "text-fg" : "text-muted"}`}>{s}</p>
          </li>
        ))}
      </ol>
      <p className="eyebrow sm:hidden">Step {step + 1} of {steps.length}: {steps[step]}</p>

      <div data-step="0" className={panel(0)}>
        <Field label="What would you like to build? *" name="message" error={e.message} hint="A few sentences is plenty, covering the problem and who it's for.">
          <Textarea name="message" err={e.message} required minLength={10} placeholder="e.g. An app for my clinic to manage appointments and billing…" />
        </Field>
        <Field label="Business category" name="meta.category"><Select name="meta.category" options={categories} /></Field>
      </div>

      <div data-step="1" className={panel(1)}>
        <Field label="Platform needed" name="service"><Select name="service" options={platforms} /></Field>
        <fieldset>
          <legend className="mb-3 text-sm font-medium">Expected features</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {featureOpts.map((f, i) => (
              <label key={f} className="flex cursor-pointer items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-sm has-[:checked]:border-blue has-[:checked]:bg-blue/10">
                <input type="checkbox" name={`meta.feature${i}`} value={f} className="accent-[#3B6CFF]" /> {f}
              </label>
            ))}
          </div>
        </fieldset>
        <Field label="Additional requirements" name="meta.extra"><Textarea name="meta.extra" /></Field>
      </div>

      <div data-step="2" className={panel(2)}>
        <Field label="Budget range" name="budget"><Select name="budget" options={budgetOptions} /></Field>
        <Field label="Expected timeline" name="timeline"><Select name="timeline" options={timelineOptions} /></Field>
      </div>

      <div data-step="3" className={panel(3)}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name *" name="name" error={e.name}><Input name="name" autoComplete="name" err={e.name} required /></Field>
          <Field label="Email *" name="email" error={e.email}><Input name="email" type="email" autoComplete="email" err={e.email} required /></Field>
          <Field label="Company" name="company"><Input name="company" autoComplete="organization" /></Field>
          <Field label="Phone / WhatsApp" name="phone" error={e.phone}><Input name="phone" type="tel" autoComplete="tel" err={e.phone} /></Field>
          <Field label="Preferred contact method" name="contactPref"><Select name="contactPref" options={contactPrefs} /></Field>
        </div>
        {state && !state.ok && state.message && <p role="alert" className="text-sm text-red-400">{state.message}</p>}
      </div>

      <div className="flex items-center justify-between gap-4">
        {step > 0 ? <button type="button" onClick={() => setStep(step - 1)} className={btnGhost}>Back</button> : <span />}
        {step < steps.length - 1 ? (
          <button type="button" onClick={next} className={btnPrimary}>Continue <ArrowRight size={18} /></button>
        ) : (
          <button disabled={pending} className={`${btnPrimary} disabled:opacity-60`}>{pending ? <><Loader2 className="animate-spin" size={18} /> Sending…</> : "Submit request"}</button>
        )}
      </div>
    </form>
  );
}
