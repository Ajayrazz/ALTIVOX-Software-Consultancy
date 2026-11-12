"use client";
import { useActionState, startTransition } from "react";
import { login } from "@/actions/auth";
import { LogoMark } from "@/components/Logo";
import { Field, Input } from "@/components/forms/fields";
import { btnPrimary } from "@/components/ui/Section";
import { TiltCard } from "@/components/admin/TiltCard";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, null);
  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden px-5"><div aria-hidden className="grid-bg pointer-events-none absolute inset-0" /><div aria-hidden className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-violet/20 blur-[120px]" />
      <TiltCard max={5} className="relative w-full max-w-sm"><form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); startTransition(() => action(fd)); }} className="space-y-5 rounded-2xl border border-line bg-surface/80 p-8 shadow-2xl shadow-black/60 backdrop-blur-xl">
        <div className="flex items-center gap-3"><LogoMark /><h1 className="text-xl font-semibold">Admin sign in</h1></div>
        <Field label="Email" name="email"><Input name="email" type="email" autoComplete="username" required /></Field>
        <Field label="Password" name="password"><Input name="password" type="password" autoComplete="current-password" required /></Field>
        {state?.error && <p role="alert" className="text-sm text-red-400">{state.error}</p>}
        <button disabled={pending} className={`${btnPrimary} w-full disabled:opacity-60`}>{pending ? "Signing in…" : "Sign in"}</button>
      </form></TiltCard>
    </div>
  );
}
