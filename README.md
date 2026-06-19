# Framont & Partners Management — Platform

A modular, premium web platform for **Framont & Partners Management Ltd**, the
MFSA-authorised AIFM (AIFMD II) based in Malta. Visitors discover Framont's
regulated EU investment vehicles, download product documentation, and choose
between two onboarding flows: investor access via InvestGlass, or an advisory
consultation request.

## Tech stack

- **Next.js 14** (App Router, RSC)
- **Tailwind CSS** with a custom navy / gold / cream design system
- **shadcn/ui-style** primitives (Button, Badge, Card, Input) built on Radix
- **Framer Motion** for scroll and modal transitions
- **MDX** (`next-mdx-remote/rsc`) for the news section
- **Vercel**-ready

## Design system

| Token | Value |
| --- | --- |
| Navy | `#0D1B2A` |
| Gold | `#C9A84C` |
| Cream | `#F5F0E8` |
| Slate | `#4A6080` |
| Display font | Playfair Display |
| Body font | Inter |
| Mono / tags | JetBrains Mono |

Module accent colours (ETI green, AMC gold, Fund teal, VC violet, Alternatives
red) mirror the platform architecture schema.

## Routes

| Path | Description |
| --- | --- |
| `/` | Homepage — product overview, investor flow, InvestGlass gateway, governance |
| `/products/eti` | ETI — Exchange Traded Instruments |
| `/products/amc` | AMC — Actively Managed Certificates |
| `/products/fund-platform` | Fund Platform — ready-made & bespoke funds |
| `/products/alternatives` | Alternative Funds — PE, real assets, hedge |
| `/products/vc` | Venture Capital Funds |
| `/onboarding` | Pre-onboarding checklist → InvestGlass redirect |
| `/advisory` | Consultation form + Calendly slot |
| `/news` & `/news/[slug]` | MDX-powered updates per product category |
| `/documents` | Unified, filterable document library |

Product landing pages are generated from a single dynamic route
(`/products/[slug]`) driven by `src/lib/products.ts`.

## Two CTA flows

1. **Accedi come Investitore** → opens a pre-onboarding checklist modal, then
   redirects to the InvestGlass portal (configurable in `src/lib/utils.ts`).
2. **Richiedi Consulenza** → internal contact form posting to
   `/api/contact`.

## Document system

Documents are defined per product in `src/lib/products.ts` with a type
(Term Sheet, IM, Subscription Form, KIID, Factsheet, Risk Report, LP Agreement)
and a status badge (Available / Draft / Coming Soon). Gated documents require a
quick email verification before download. Placeholder PDFs live in
`public/documents/` — replace them with the approved files (keep the same
filenames, or update the `file` paths in the data).

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Configuration

- **InvestGlass URL, Calendly URL, contact details** — `src/lib/utils.ts`
- **Lead delivery** — copy `.env.example` to `.env.local` and set either
  `CONTACT_WEBHOOK_URL` or `RESEND_API_KEY` + `CONTACT_TO`. Until configured,
  leads are logged server-side.
- **Brand assets** — official Framont logos are in `public/brand/`.

## Compliance note

All copy is marketing communication only and is not investment advice. Capital
is at risk. Official documentation for regulated instruments (KID/KIID,
prospectus, ISIN, subscription materials) is provided exclusively by Framont &
Partners Management Ltd.
