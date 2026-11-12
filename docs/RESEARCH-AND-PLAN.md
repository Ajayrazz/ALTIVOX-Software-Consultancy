# ALTIVOX: Research Report & Implementation Plan

_Date: 2026-11-13. Status: Phase 1–4 complete, Phase 5 starting._

## 1. Research findings

### What I actually inspected (live fetches)
| Site | What it does well | Lesson for Altivox |
|---|---|---|
| Linear | One sharp headline, a **real product mockup** as hero visual, numbered "Fig 0.1" feature blocks, changelog as proof of life, closing pair of CTAs (self-serve + talk to sales) | Show interface previews, not stock art. Numbered editorial figures. Two-path CTA. |
| Vercel | Outcome headline, three bullets, three capability groups with 4 sub-features each, "recently shipped" cards, dual CTA (Deploy / Talk to sales) | Group capabilities in threes; keep copy terse. |
| Thoughtworks | Services framed as **business outcomes** (rebuild / rewire / reimagine), one-line benefit + one link; metric-led case studies; "Bring us your challenge" CTA | Consultancy tone: outcome-first, problem-oriented CTA. Never lead with tech lists. |
| Globant | Blocked automated fetch (403); not analysed. Only article-level knowledge, so not relied on. |

Not fetched this round (to be reviewed visually in-browser during Phase 8): Stripe, Framer, Raycast, Supabase, Resend, Clerk, Toptal, EPAM, Accenture.

### 2026 trend signals (vendor blogs, treated as opinion, not data)
- Dark-mode-first identities are standard for tech brands.
- Motion is trending **restrained and purposeful** (scroll reveals, hover feedback) after years of 3D excess.
- Bento layouts, bold type, accessibility are recurring themes.
- Unsourced stats in those posts (scroll depth, dark-mode usage %) are **not** used.

### Instagram integration (actual constraints)
- Basic Display API is discontinued. A site feed needs an Instagram **Business/Creator** account via the Instagram Graph API (`instagram_business_basic`), with Meta app setup; review requirements should be confirmed in Meta's official docs before launch (I found only vendor blogs).
- **Decision:** v1 ships Instagram *deep links* (profile, DM/product enquiry, share) + an admin-managed "featured posts" list. Live feed is a later, optional phase. No scraping.

## 2. Positioning & brand

- **Tagline (recommended):** "Elevating Ideas. Engineering Innovation." (kept; it is distinctive enough and matches the brief). Alt: "Software, engineered to ship."
- **Hero headline:** "Turning complex ideas into powerful digital solutions."
- **Voice:** confident, plain-English, outcome-first; technical depth shown via specifics, not jargon.
- **Visual direction: "Signal"**: ink-black base, a single electric-blue → violet accent gradient, cyan only for data/active states. Editorial grid, hairline borders, restrained glass on navigation and one or two cards. Not rounded-card soup.
- **Palette:** `ink #07080C`, `surface #0E1017`, `line #1E2230`, `text #F4F5F8`, `muted #8B91A3`, `blue #3B6CFF`, `violet #7C5CFF`, `cyan #3DD9EB`.
- **Type:** Geist Sans (UI/body) + Geist Mono (labels, figures) via `next/font` (self-hosted, no layout shift). Display headings tight-tracked.
- **Logo:** original wordmark "ALTIVOX" with an ascending-diagonal "A" mark; SVG, animated reveal.
- **Hero visual (one coherent idea):** an animated SVG/CSS "system blueprint": nodes (UI → API → DB → AI) connected by flowing signal lines that react to pointer, plus a floating product-interface mock. No Three.js (cost > value here). Static fallback under `prefers-reduced-motion`.

## 3. Sitemap

```
/                      Home
/services              Overview  → /services/[slug]  (8–10 detail pages)
/products              Showcase (search, category filter) → /products/[slug]
/industries            (anchored sections per industry)
/work                  Portfolio (filters) → /work/[slug]   (labelled SAMPLE until real)
/about
/blog                  → /blog/[slug]       (DB-backed, admin-published)
/contact
/quote                 Multi-step requirement wizard
/faq   /support
/privacy  /terms  /refund-policy
/admin                 (auth-gated) products, categories, services, projects, posts, enquiries, settings
/api/…                 enquiries, quote, admin CRUD (all validated + rate-limited)
404, sitemap.xml, robots.txt, opengraph images
```

## 4. Technology decisions (simplest thing that meets the brief)

| Concern | Choice | Why / rejected |
|---|---|---|
| Framework | **Next.js 16 App Router, React 19, TypeScript** | SSR/SSG for SEO, Metadata API, server actions. |
| Styling | **Tailwind v4** + small in-house component set | shadcn/ui only for admin primitives if needed; avoids "template look" on the public site. |
| Motion | **`motion` (Framer Motion) + CSS**; Lenis optional | GSAP/Three/Lottie skipped unless a specific need arises (bundle cost). |
| DB | **PostgreSQL** (Neon in prod; Docker locally) | Relational fits products/enquiries. |
| ORM | **Prisma** | Mature migrations/typing. |
| Auth | **Auth.js (credentials + admin allow-list), argon2/bcrypt, httpOnly sessions** | Admin-only; no public signup. |
| CMS | **Custom `/admin` over Prisma** | Brief needs product/blog/enquiry CRUD; a headless CMS is extra cost/complexity. Content-type models are CMS-shaped so one can be swapped in later. |
| Storage | **Cloudflare R2 or Vercel Blob** (decide at deploy); local disk in dev | Signed uploads, MIME/size checks. |
| Forms | React Hook Form + **Zod** (shared client/server schema) | |
| Email | **Resend** | Enquiry notification + autoresponse. |
| Spam/rate limit | Honeypot + time-trap + Upstash-style rate limiter (in-memory fallback in dev); Turnstile optional | |
| Payments | `PurchaseAction` abstraction per product (`BUY_NOW`, `DEMO`, `WHATSAPP`, `INSTAGRAM`, `CUSTOM`); `BUY_NOW` provider interface left for Razorpay/Stripe later | Not every product is paid online. |
| Analytics | Plausible/Umami (cookieless), env-gated | |
| Deploy | Vercel + Neon | |

### Core data model (Prisma)
`User(admin)`, `Product`, `ProductImage`, `ProductCategory`, `Service`, `Industry`, `Project`, `Post`, `Enquiry` (type: CONTACT / QUOTE / PRODUCT / DEMO, status), `SiteSetting` (social links, contact details, WhatsApp number: all admin-editable).

## 5. Content integrity rules
- No invented clients, testimonials, stats, awards, partners, team, or history.
- Sample products/projects/testimonials carry a visible **"Sample"** badge and live in seed data, replaceable via admin.
- Contact email / phone / WhatsApp / Instagram handle / LinkedIn come from `SiteSetting`; sections hide when unset. **No fake details.**

## 6. Roadmap

| Phase | Scope | Exit check |
|---|---|---|
| A. Foundation | Design tokens, fonts, layout, nav, footer, logo, motion primitives, config | Builds; shell renders on mobile/desktop |
| B. Home | Hero, capabilities, services, products, why, industries, process, stack, sample work, testimonials placeholder, FAQ, CTA | Visual review in browser |
| C. Data layer | Prisma schema, seed, Postgres via Docker compose | Migrations + seed run |
| D. Public pages | Services (+detail), Products (+detail, search/filter), Industries, Work (+detail), About, Blog, legal | All routes 200, SEO metadata |
| E. Conversion | Contact, Quote wizard, product enquiry, WhatsApp/Instagram actions, email, spam/rate-limit | Submissions persist + email |
| F. Admin | Auth, CRUD for all content, enquiry inbox, uploads, settings | AuthZ tests; public cannot reach |
| G. SEO/perf/a11y | Sitemap, robots, JSON-LD, OG, CWV pass, reduced motion, keyboard/contrast | Lighthouse ≥ 90 on key pages |
| H. QA & polish | Click every CTA, form, route; responsive sweep at 375/768/1280/1536; prod build | Clean `next build`, browser screenshots reviewed |

## 7. Information needed from the owner (non-blocking: placeholders used meanwhile)
1. Contact email, WhatsApp number, Instagram handle, LinkedIn URL.
2. Real products (name, price/purchase method, screenshots) and any real case studies.
3. Preferred currency/pricing display and domain name.
4. Whether to host DB on Neon (recommended) and email on Resend.
