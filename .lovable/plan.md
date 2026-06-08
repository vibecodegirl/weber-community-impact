## Goal

Produce a single, fully-documented developer handbook for the Weber Human Services Foundation site, delivered in three formats so devs can read it in-repo and hand the same content to stakeholders/auditors.

## Deliverables

1. `docs/PROJECT.md` — canonical source of truth, version-controlled with the code.
2. `/mnt/documents/WHSF-Build-Documentation.docx` — editable Word export.
3. `/mnt/documents/WHSF-Build-Documentation.pdf` — print/share export.

Both exports are generated from the Markdown so they stay in sync.

## Document outline

1. **Overview** — purpose, parent org (Weber Human Services), nonprofit status, service area, preview/published/custom-domain URLs.
2. **Tech stack** — TanStack Start v1 (React 19, Vite 7), Tailwind v4 via `src/styles.css`, shadcn/ui, TanStack Router (file-based), TanStack Query, deployment target (Cloudflare Worker / Edge), Bun, TypeScript strict.
3. **Repository layout** — `src/routes/`, `src/content/` (content-as-code pattern), `src/components/site/*`, `src/components/ui/*`, `src/lib/`, `scripts/export-static.ts`, `public/`.
4. **Content architecture** — explain the "all copy lives in `src/content/*.ts`" convention, per-page mapping, Wix migration notes (mirrors `src/content/README.md`).
5. **Routes & pages** — table of every route with file path, URL, purpose, and notable features:
   - `/` index, `/about`, `/board`, `/impact`, `/financials`, `/events` (+ `/events/golf-tournament`, `/events/sub-for-santa`), `/get-involved`, `/news`, `/contact`, `/donate`, `/causes` + `/causes/$slug`, `/faq`, `/privacy`, `/terms`, `/sitemap.xml`.
6. **Shared components** — `SiteLayout`, `SiteHeader`, `SiteFooter`, `UtilityBar` (988 crisis line + EN/ES translator), `HeroCarousel`, `LanguageTranslator`, `MountainDivider`, `SectionHeader`, `LegalArticle`.
7. **Forms & external integrations**
   - Contact form (`/contact`) — submits to `foundation@weberhs.org`.
   - Get Involved volunteer/inquiry form — same destination.
   - Donate CTA — external paywall `https://weberhsfoundation.org/donate/`.
   - 2025 Annual Report PDF link (Wix-hosted asset URL).
   - Crisis hotline `tel:988`; WHS 24/7 crisis line.
   - Google Translate widget (EN/ES).
8. **SEO & metadata** — per-route `head()` with title/description/og, canonical URLs, `sitemap[.]xml.ts`, `robots.txt`, `llms.txt`, JSON-LD opportunities.
9. **Design system** — `src/styles.css` tokens (oklch), Tailwind v4 theme, typography, semantic color usage rule, shadcn variants.
10. **Build, dev, deploy** — `bun install`, dev server, `scripts/export-static.ts`, Cloudflare Worker deploy via `wrangler.jsonc`, env vars (none required client-side today; `VITE_*` vs `process.env.*` convention documented).
11. **Routing rules & guards** — file-based naming conventions, `__root.tsx`, `<Outlet />` rule, error/not-found boundaries.
12. **Accessibility & i18n** — semantic HTML, alt text, focus styles, EN/ES translator pattern, contrast tokens.
13. **Compliance — 501(c)(3) + donor disclosures**
    - Nonprofit status statement (footer + about).
    - Public availability of Form 990s and annual reports on `/financials`.
    - Donation handling: donations processed off-site by parent foundation; site collects no card data.
    - Donor privacy policy linkage (`/privacy`).
    - Tax-deductibility disclosure language template.
    - Recordkeeping recommendations for donations and acknowledgements.
14. **Developer onboarding checklist** — clone, install, run, where to edit copy, how to add a route, how to add a new news/event item, how to update the annual report link, how to change contact destination email.
15. **Future work / TODOs** — server-backed contact form (Lovable Cloud), analytics, JSON-LD for events/articles, automated 990 metadata, og:image per route.
16. **Appendix** — full file inventory, key URLs, glossary.

## Generation approach (technical)

- Write `docs/PROJECT.md` by hand from the repo (read `src/content/*.ts`, `src/routes/*.tsx`, `src/components/site/*`, `vite.config.ts`, `wrangler.jsonc`, `package.json`).
- Generate DOCX with `docx` npm package per the docx skill (US Letter, Arial defaults, real headings, real lists, dual-width tables for the route table).
- Generate PDF with ReportLab Platypus from the same content (Letter, 1" margins, proper styles, no Unicode bullets — use `ListFlowable`).
- QA: convert DOCX→PDF→images and PDF→images, visually inspect every page for overflow/clipping/blank pages; iterate until clean.
- Emit a `<presentation-artifact>` for each export so the user can download.

## Out of scope

- No code changes to the app itself.
- No new pages, forms, or features.
- No HIPAA/PHI content (marketing site only).
- No infrastructure changes.
