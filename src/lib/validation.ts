import { z } from "zod";

const clean = (max: number) => z.string().trim().max(max);

export const enquirySchema = z.object({
  type: z.enum(["CONTACT", "QUOTE", "PRODUCT", "DEMO"]),
  name: clean(100).min(2, "Please enter your name"),
  email: clean(160).email("Enter a valid email address"),
  company: clean(120).optional(),
  phone: clean(30).regex(/^[+\d][\d\s\-()]{6,}$/, "Enter a valid phone number").optional().or(z.literal("")),
  service: clean(120).optional(),
  budget: clean(60).optional(),
  timeline: clean(60).optional(),
  contactPref: clean(30).optional(),
  productSlug: clean(80).optional(),
  message: clean(4000).min(10, "Please tell us a little more (at least 10 characters)"),
  meta: z.record(z.string(), z.string().max(500)).optional(),
});
export type EnquiryInput = z.infer<typeof enquirySchema>;

export const budgetOptions = ["Under ₹25,000 / $300", "₹25,000 – ₹1,00,000 / $300 – $1,200", "₹1,00,000 – ₹5,00,000 / $1,200 – $6,000", "₹5,00,000+ / $6,000+", "Not sure yet"];
export const timelineOptions = ["As soon as possible", "Within 1 month", "1 – 3 months", "3+ months", "Flexible"];
export const contactPrefs = ["Email", "WhatsApp", "Phone call", "Instagram"];
