import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/dal";
import { saveProduct, deleteProduct } from "@/actions/admin";
import { Field, Input, Textarea, Select } from "@/components/forms/fields";

export const dynamic = "force-dynamic";

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin();
  const { id } = await params;
  const isNew = id === "new";
  const [p, cats] = await Promise.all([isNew ? null : db.product.findUnique({ where: { id } }), db.productCategory.findMany()]);
  if (!isNew && !p) notFound();
  const save = saveProduct.bind(null, isNew ? null : id);
  const t = (n: string, l: string, v?: string | number | null) => <Field label={l} name={n}><Input name={n} defaultValue={v ?? ""} /></Field>;
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-semibold tracking-tight">{isNew ? "New product" : `Edit ${p!.name}`}</h1>
      <form action={save} className="mt-8 space-y-5 rounded-2xl border border-line bg-gradient-to-b from-white/[0.045] to-white/[0.015] p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.05)] sm:p-8">
        {t("name", "Name", p?.name)}{t("tagline", "Tagline", p?.tagline)}
        <Field label="Description" name="description"><Textarea name="description" defaultValue={p?.description} required /></Field>
        <Field label="Problem it solves" name="problem"><Textarea name="problem" defaultValue={p?.problem} /></Field>
        {t("audience", "Target audience", p?.audience)}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Category" name="categoryId"><select name="categoryId" id="categoryId" defaultValue={p?.categoryId} className="w-full rounded-xl border border-line bg-surface px-4 py-3">{cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></Field>
          <Field label="Purchase action" name="purchaseAction"><Select name="purchaseAction" defaultValue={p?.purchaseAction ?? "WHATSAPP"} options={["BUY_NOW", "DEMO", "WHATSAPP", "INSTAGRAM", "CUSTOMIZATION"]} /></Field>
          <Field label="Pricing model" name="pricingModel"><Select name="pricingModel" defaultValue={p?.pricingModel ?? "ONE_TIME"} options={["ONE_TIME", "MONTHLY", "CUSTOM"]} /></Field>
          {t("pricingNote", "Pricing note", p?.pricingNote)}{t("priceINR", "Price (₹ INR)", p?.priceINR)}{t("priceUSD", "Price ($ USD)", p?.priceUSD)}
        </div>
        {t("buyUrl", "Checkout / payment link (https://, used by Buy now)", p?.buyUrl)}{t("icon", "Icon name", p?.icon ?? "box")}{t("demoVideoUrl", "Demo video URL (https://)", p?.demoVideoUrl)}
        <Field label="Features (one per line)" name="features"><Textarea name="features" defaultValue={p?.features.join("\n")} /></Field>
        <Field label="Benefits (one per line)" name="benefits"><Textarea name="benefits" defaultValue={p?.benefits.join("\n")} /></Field>
        <Field label="Screenshot URLs (https://, one per line)" name="screenshots"><Textarea name="screenshots" defaultValue={p?.screenshots.join("\n")} /></Field>
        <div className="flex flex-wrap gap-6 text-sm">
          {([["featured", "Featured"], ["published", "Published"], ["isSample", "Mark as demo/sample"]] as const).map(([n, l]) => (
            <label key={n} className="flex items-center gap-2"><input type="checkbox" name={n} defaultChecked={p ? p[n] : n === "published"} /> {l}</label>
          ))}
        </div>
        <button className="rounded-full bg-gradient-to-r from-blue to-violet px-6 py-3 font-medium text-white">Save product</button>
      </form>
      {!isNew && <form action={deleteProduct.bind(null, id)} className="mt-10 border-t border-line pt-6"><button className="text-sm text-red-400 hover:underline">Delete this product</button></form>}
    </div>
  );
}
