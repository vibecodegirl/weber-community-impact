# Weber Human Services Foundation — Build Documentation

> Developer handbook for the WHSF marketing site. Source of truth for stack,
> routing, content model, forms, integrations, build/deploy, and 501(c)(3)
> compliance posture.

- **Project**: Weber Human Services Foundation (WHSF) public website
- **Parent org**: Weber Human Services — <https://www.weberhs.net/>
- **Status**: 501(c)(3) public charity
- **Service area**: Morgan & Weber Counties, Utah
- **Preview**: <https://id-preview--7f5bfbdb-6318-46c4-a30c-b3c108a334ac.lovable.app>
- **Published**: <https://whsf.lovable.app>
- **Custom domain**: <https://whsf.accessmypage.online>

---

## 1. Overview

WHSF is a fundraising and awareness site for a Utah-based public charity. The
site is marketing/informational only — it does **not** process donations
itself (donations are handled off-site by the parent foundation paywall) and
collects no PII beyond inbound contact-form messages via `mailto:`.

Primary goals:

1. Communicate mission, programs, and impact to donors and the community.
2. Surface the latest Annual Report, IRS Form 990s, board and leadership.
3. Drive traffic to the off-site donation processor.
4. Provide a low-friction way to contact the foundation.
5. Surface the 988 crisis hotline and translation (EN/ES) on every page.

---

## 2. Technology Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | TanStack Start v1 (React 19) | SSR-capable, file-based routes |
| Build tool | Vite 7 | Configured via `@lovable.dev/vite-tanstack-config` |
| Routing | TanStack Router (file-based) | `src/routes/*`, `routeTree.gen.ts` is auto-generated |
| Data | TanStack Query v5 | Available; site is mostly static content today |
| Styling | Tailwind CSS v4 | Configured in `src/styles.css` (no `tailwind.config.js`) |
| UI primitives | shadcn/ui + Radix | `src/components/ui/*` |
| Forms | react-hook-form + zod | Validation on contact / get-involved forms |
| Icons | lucide-react | |
| Runtime | Cloudflare Workers (Edge) | `wrangler.jsonc`, `nodejs_compat` enabled |
| Package manager | Bun | `bunfig.toml`, `bun install` / `bun add` |
| Language | TypeScript strict | `tsconfig.json` |

Key versions (see `package.json`): React 19.2, Vite 7.3, TanStack Router 1.168,
TanStack Start 1.167, Tailwind 4.2, Zod 3.24.

---

## 3. Repository Layout

```
src/
  routes/              # File-based routes (pages + API)
  content/             # All editable copy lives here (one file per page)
  components/
    site/              # SiteHeader, SiteFooter, UtilityBar, HeroCarousel, ...
    ui/                # shadcn primitives
  lib/                 # utils, causes helpers
  hooks/               # use-mobile, etc.
  styles.css           # Tailwind v4 theme tokens (oklch)
  router.tsx           # Router bootstrap
  routeTree.gen.ts     # AUTO-GENERATED — do not edit
public/                # robots.txt, llms.txt, static assets
scripts/
  export-static.ts     # Static export helper
wrangler.jsonc         # Cloudflare Worker config
vite.config.ts         # Thin wrapper around the Lovable preset
docs/PROJECT.md        # This document
```

---

## 4. Content Architecture

**All user-facing copy lives in `src/content/*.ts`.** Route files
(`src/routes/*.tsx`) only compose layout. To change a headline, button label,
list item, phone number, or email destination, edit the content file — never
the route.

| Content file | Owns |
|---|---|
| `site.ts` | Global nav, footer, brand, contact info, donate URL, utility bar (988, languages) |
| `home.ts` | Landing page sections |
| `hero.ts` | Homepage hero carousel slides |
| `about.ts` | About page |
| `board.ts` | Board of Directors data |
| `impact.ts` | Impact metrics + Annual Report card |
| `events.ts` | Events index + per-event content |
| `news.ts` | News articles |
| `get-involved.ts` | Volunteer / partner copy + form labels |
| `contact.ts` | Contact page copy + form labels |
| `donate.ts` | Donate page copy |
| `causes-page.ts` | Causes index + per-cause detail |
| `financials.ts` | Annual reports + 990s table |
| `faq.ts` | FAQ |
| `legal.ts` | Privacy + Terms |

See `src/content/README.md` for the Wix migration mapping (this site is
content-parallel to a Wix rebuild path).

---

## 5. Routes & Pages

| URL | File | Purpose |
|---|---|---|
| `/` | `routes/index.tsx` | Landing page, hero carousel, causes preview |
| `/about` | `routes/about.tsx` | Mission, history, board preview |
| `/board` | `routes/board.tsx` | Full board roster with photos |
| `/impact` | `routes/impact.tsx` | Impact metrics, 2025 Annual Report card |
| `/financials` | `routes/financials.tsx` | Allocation chart + 990s/Annual Reports table |
| `/events` | `routes/events.tsx` + `events.index.tsx` | Events index |
| `/events/golf-tournament` | `routes/events.golf-tournament.tsx` | Annual golf tournament |
| `/events/sub-for-santa` | `routes/events.sub-for-santa.tsx` | Sub for Santa program |
| `/get-involved` | `routes/get-involved.tsx` | Volunteer/partner inquiry + form |
| `/news` | `routes/news.tsx` | News articles |
| `/contact` | `routes/contact.tsx` | Contact info + message form |
| `/donate` | `routes/donate.tsx` | Donate landing; CTA links off-site |
| `/causes` | `routes/causes.index.tsx` | Five cause areas |
| `/causes/$slug` | `routes/causes.$slug.tsx` | Per-cause detail |
| `/faq` | `routes/faq.tsx` | FAQ |
| `/privacy` | `routes/privacy.tsx` | Privacy policy |
| `/terms` | `routes/terms.tsx` | Terms of use |
| `/sitemap.xml` | `routes/sitemap[.]xml.ts` | XML sitemap |

The single root layout is `src/routes/__root.tsx`. Layout routes (`events.tsx`)
render `<Outlet />` for their children.

---

## 6. Shared Components

- **`SiteLayout`** — page shell (header + main + footer).
- **`SiteHeader`** — main nav (desktop + mobile sheet).
- **`SiteFooter`** — links, donate CTA, copyright, 501(c)(3) line.
- **`UtilityBar`** — slim top strip: "24 Hour Crisis Hotline: 988" + EN/ES translator.
- **`LanguageTranslator`** — Google Translate widget (EN/ES) controlled via cookie.
- **`HeroCarousel`** — homepage hero (embla-carousel).
- **`MountainDivider`** — branded SVG section divider.
- **`SectionHeader`** — eyebrow + title pattern used across pages.
- **`LegalArticle`** — renders Privacy/Terms from `legal.ts`.

---

## 7. Forms & External Integrations

### Contact form (`/contact`)
- Client-only, react-hook-form + zod validation.
- Submission destination: **`foundation@weberhs.org`** (via `mailto:`).
- No backend writes today; messages route to the foundation inbox.

### Get Involved form (`/get-involved`)
- Same pattern as contact. Volunteer/partner inquiries.
- Destination: **`foundation@weberhs.org`**.

### Donate
- The Donate CTA in the header/footer/donate page links out to
  **`https://weberhsfoundation.org/donate/`** (parent paywall).
- The site never sees card data — PCI scope = none.

### 2025 Annual Report download
- Hosted Wix asset:
  `https://d4eb6aeb-726d-4b4e-946a-5a45757ea5a0.usrfiles.com/ugd/d4eb6a_0d2fcff2aff14494922c928a1fa5ca3a.pdf`
- Linked from `/impact` (hero card) and `/financials` (documents table). Opens
  in a new tab (`target="_blank" rel="noopener noreferrer"`).

### Crisis hotline
- Utility bar: `tel:988` (Suicide & Crisis Lifeline).
- Footer/contact: WHS 24/7 crisis line via `https://www.weberhs.net/`.

### Translator
- Google Website Translator embedded by `LanguageTranslator.tsx`.
- Persists selection via Google's `googtrans` cookie; reloads to apply.

---

## 8. SEO & Metadata

- Per-route `head()` returns `<title>`, meta description, og:title,
  og:description, og:url, and canonical link.
- Canonical hostname: `https://whsf.accessmypage.online`.
- `public/robots.txt` allows all and points to `/sitemap.xml`.
- `routes/sitemap[.]xml.ts` emits a fresh sitemap.
- `public/llms.txt` advertises content to AI crawlers.
- **Add og:image at leaf routes only** — never at `__root.tsx`, which would
  override every page's share image.
- Future: JSON-LD `Event` for `/events/*`, `NewsArticle` for `/news`,
  `NGO`/`Organization` on `/about`.

---

## 9. Design System

Tokens live in `src/styles.css` as oklch CSS variables. Components consume
semantic tokens (`bg-primary`, `text-foreground`, etc.) — **never raw colors**
like `bg-blue-500`. shadcn variants are defined per-component in
`src/components/ui/*`.

Brand accents include `primary`, `sky`, `ember`, plus surface tokens and
shadow tokens (`--shadow-soft`). Typography pairs a serif display face with a
sans body face.

---

## 10. Build, Dev, Deploy

```bash
bun install           # install deps
bun run dev           # local dev server (Vite)
bun run build         # production build → Cloudflare Worker bundle
bun run build:dev     # build with dev-mode SSR prerender (used by previews)
bun run preview       # preview the built bundle locally
bun run lint          # ESLint
```

- **Deploy target**: Cloudflare Workers. Config in `wrangler.jsonc`:
  `compatibility_date: 2025-09-24`, `compatibility_flags: ["nodejs_compat"]`,
  `main: @tanstack/react-start/server-entry`.
- **Env vars**: none required client-side today.
  - `import.meta.env.VITE_*` → bundled at build time, browser-safe.
  - `process.env.*` → server-only, never imported in client modules.
- **Dev server**: do not run `npm run build` / `tsc` manually — the platform
  runs builds automatically.

---

## 11. Routing Rules & Guards

- Filenames map URLs via dot-separation: `events.golf-tournament.tsx` →
  `/events/golf-tournament`. `$param` is dynamic; `index` is the leaf.
- `createFileRoute("...")` string MUST match the generated route ID.
- Every parent route must render `<Outlet />`.
- Every route with a loader sets `errorComponent` + `notFoundComponent`.
- Root route sets `notFoundComponent`; router config sets
  `defaultErrorComponent` (in `src/router.tsx`).
- **Never edit `src/routeTree.gen.ts`** — it is regenerated on every build.

---

## 12. Accessibility & i18n

- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<footer>`, single
  `<h1>` per page).
- All `<img>` elements have descriptive `alt` text.
- Focus styles from Tailwind defaults preserved; shadcn primitives are
  keyboard-accessible by default.
- EN/ES language toggle via Google Translate; persists via cookie.
- Color tokens are tuned for AA contrast in both light and dark modes.
- Outstanding: a full WCAG 2.1 AA audit is **recommended** before any future
  marketing push.

---

## 13. Compliance — 501(c)(3) + Donor Disclosures

WHSF is a public charity. The site's compliance posture:

1. **Nonprofit status statement**
   - Displayed in the footer (`site.ts → footer.copyrightSuffix`,
     `"A 501(c)(3) nonprofit."`) and the financials hero.
   - EIN/Form 990 lookup: `apps.irs.gov` (linked from the 990 rows).

2. **Public availability of 990s and Annual Reports**
   - The `/financials` page lists Annual Reports and IRS Form 990s by year
     with direct PDF links.
   - 990s link to the IRS public exempt-org filings (authoritative source).
   - Annual reports are hosted on the parent Wix asset host.
   - When a new report is published, update `src/content/financials.ts` (and
     `src/content/impact.ts` for the hero card link).

3. **Donation handling**
   - The site does **not** process payments. The Donate button links to the
     parent foundation paywall (`weberhsfoundation.org/donate/`).
   - PCI-DSS scope on this site = **none** (no card data collected).
   - Acknowledgement letters and tax receipts are issued by the parent
     foundation through its payment processor of record.

4. **Tax-deductibility disclosure (recommended language)**
   > "The Weber Human Services Foundation is a 501(c)(3) public charity.
   > Contributions are tax-deductible to the fullest extent allowed by law.
   > No goods or services were provided in exchange for this contribution."
   - Include on receipts ≥ $250 and any quid-pro-quo gift ≥ $75 per IRS Pub
     1771.

5. **Donor privacy**
   - `/privacy` (sourced from `src/content/legal.ts`) documents data handling.
   - Donor lists are not sold, traded, or rented.
   - Inbound contact-form messages flow only to `foundation@weberhs.org`.

6. **State charitable-solicitation registration**
   - Utah charitable solicitation registration is administered by the Utah
     Division of Consumer Protection. The parent foundation maintains
     registration; verify annually.

7. **Recordkeeping**
   - Keep board minutes, 990s, and annual reports for at least 7 years.
   - Donation records are maintained by the payment processor; periodic
     export to foundation records is recommended.

---

## 14. Developer Onboarding Checklist

1. Clone, then `bun install`.
2. `bun run dev` → open the printed URL.
3. To change copy: edit the matching `src/content/<page>.ts` file.
4. To add a route: create `src/routes/<name>.tsx` with `createFileRoute`,
   a `head()` block, and a component; add nav entry in `src/content/site.ts`
   if it should appear in the header.
5. To add a news item or event: append to `src/content/news.ts` or
   `src/content/events.ts`.
6. To update the Annual Report PDF link: change the `url` field on the
   matching row in `src/content/financials.ts` AND the hero card link in
   `src/content/impact.ts`.
7. To change the contact destination email: update `site.contact.email` in
   `src/content/site.ts` (it is used by `/contact` and `/get-involved`).
8. To deploy: push — the platform builds and deploys automatically.

---

## 15. Future Work / Recommendations

- Move contact + volunteer forms to a server-backed inbox (Lovable Cloud +
  `createServerFn`), with reCAPTCHA/Turnstile to deter spam.
- Add JSON-LD: `NGO` on `/about`, `Event` on `/events/*`, `NewsArticle` on
  `/news` items.
- Add per-route `og:image` (leaf routes only).
- Add analytics (privacy-preserving, e.g. Plausible).
- Automate 990 metadata fetch from IRS EO endpoint.
- Schedule a WCAG 2.1 AA accessibility audit.
- Document the Wix-mirror migration path in a runbook (the structure already
  exists in `src/content/README.md`).

---

## 16. Appendix — Key URLs

- Donate (off-site): <https://weberhsfoundation.org/donate/>
- Parent org: <https://www.weberhs.net/>
- 2025 Annual Report: <https://d4eb6aeb-726d-4b4e-946a-5a45757ea5a0.usrfiles.com/ugd/d4eb6a_0d2fcff2aff14494922c928a1fa5ca3a.pdf>
- 2024 Annual Report: <https://d4eb6aeb-726d-4b4e-946a-5a45757ea5a0.usrfiles.com/ugd/d4eb6a_cc952b0030cf46aa8c8bdc2d3d30c489.pdf>
- 2024 IRS Form 990: <https://apps.irs.gov/pub/epostcard/cor/870528187_202412_990_2026030223965667.pdf>
- 2023 IRS Form 990: <https://apps.irs.gov/pub/epostcard/cor/870528187_202312_990_2025030323149079.pdf>
- Crisis: 988 (call or text)
- Foundation email: foundation@weberhs.org
- Foundation phone: (801) 778-6834
