# Altivox Software Consultancy: website

Next.js 16 · TypeScript · Tailwind 4 · Prisma 7 + PostgreSQL · motion. See `docs/RESEARCH-AND-PLAN.md`.

## Run locally
```bash
npm install
npm run db:dev        # terminal 1: embedded Postgres on :54329 (no Docker)
npm run db:push       # terminal 2: create tables
npm run db:seed       # demo products/services/etc + admin user
npm run dev           # http://localhost:3000   · admin: /admin/login
```
Config lives in `.env.local` (see `.env.example`). Admin credentials come from `ADMIN_EMAIL` / `ADMIN_PASSWORD` at seed time. **Change them before deploying.**

## Deploy (all free tiers)
1. **Neon**: create a project, copy the *pooled* connection string into `DATABASE_URL`; run `npx prisma db push` and `npm run db:seed` against it.
2. **Resend**: create an API key (free tier); set `RESEND_API_KEY`, `EMAIL_TO`. Until you verify a domain, Resend only sends from `onboarding@resend.dev` to your own account email.
3. **Vercel**: import the repo, add all env vars from `.env.example` (`AUTH_SECRET`: `openssl rand -base64 48`), deploy.

## Notes
- Demo products/projects carry a "Demo/Sample" badge; edit or replace them in `/admin`.
- `BUY_NOW` products use their `buyUrl` (payment link) if set, otherwise fall back to an enquiry, which is where Razorpay/Stripe plugs in later.
- Rate limiting is in-memory (per serverless instance); move to Upstash Redis free tier if abuse appears.
