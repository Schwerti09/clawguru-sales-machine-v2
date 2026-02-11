# ClawGuru – Sales Machine (Next.js 14)

Deploy‑ready funnel:

Traffic → /check → Runbook → Pricing → Stripe Checkout → Thank‑You (auto‑activate) → Dashboard → Downloads → Share / Referral

## Pricing strategy (recommended)

- **Free**: Quick check + teaser steps on every runbook.
- **Day Pass (one‑time)**: **€29** — 24h “ship mode” access (perfect for impulse buyers).
- **Pro (subscription)**: **€59/mo** — deep fixes + new runbooks weekly.
- **Team (subscription)**: **€149/mo** — seats + shared playbooks (upgrade path).

You can change the display prices in `components/PricingTable.tsx`.
Actual billing is controlled by your Stripe **price IDs** in env vars.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Stripe setup

Create Stripe prices and set in `.env.local`:

- `STRIPE_PRICE_DAYPASS` (mode=payment)
- `STRIPE_PRICE_PRO` (mode=subscription)
- `STRIPE_PRICE_TEAM` (mode=subscription)
- optional: `STRIPE_PRICE_UPSELL_INCIDENT_KIT` (mode=payment)

Webhook (recommended for fulfillment/email later):

- Endpoint: `/api/stripe/webhook`
- Event: `checkout.session.completed`

## Access / fulfillment model

- After successful checkout, Stripe redirects to `/thank-you?session_id=...`
- The page calls `/api/access/activate?session_id=...`
- Server verifies the Stripe session is **paid**, extracts `metadata.plan`, then sets a signed cookie `claw_access`.
- `/dashboard`, full runbook steps, and `/downloads` are gated behind that cookie.

## Deploy

### Vercel
Import repo → set env vars → deploy.

### Netlify
New site from Git → set env vars → deploy.

## Where to put your product files

Put gated assets in `public/downloads/*` (pdf/zip/etc).
They are served via **signed links** at `/downloads` (not directly exposed).

