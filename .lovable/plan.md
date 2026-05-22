## Goal

Export a static HTML/CSS package of the live site that mirrors the React build closely enough to use as a design handoff or CMS reference, delivered as a downloadable zip.

## Deliverable

A single zip at `/mnt/documents/whsf-static-export.zip` containing:

```text
whsf-static-export/
  README.md                 how to use the files, where copy lives
  css/
    styles.css              full design system port (tokens, typography, components, utilities)
    fonts.css               Google Fonts @import for Fraunces + Figtree
  partials/
    utility-bar.html        crisis hotline + EN/ES toggle markup
    header.html             logo, nav, donate button
    footer.html             mountain divider + 4-column footer
    mountain-divider.svg    reusable wave SVG
  pages/
    home.html
    about.html
    board.html
    impact.html
    causes.html             (causes index)
    causes-employee-care.html
    causes-aging-services.html
    causes-mental-health.html
    causes-prevention.html
    causes-substance-use-recovery.html
    events.html             (events index)
    events-golf-tournament.html
    events-sub-for-santa.html
    news.html
    get-involved.html
    contact.html
    donate.html
    financials.html
    faq.html
    privacy.html
    terms.html
```

Each `pages/*.html` is a complete standalone document: `<head>` with per-page title/description/canonical, `<link rel="stylesheet" href="../css/styles.css">`, then `<body>` with the utility bar, header, page sections, and footer inlined (partials are duplicated into each page so files render standalone — `partials/` is kept as a clean reference copy for CMS paste-in).

## How it will be generated

A Node script reads the existing content modules (`src/content/*.ts`, `src/lib/causes.ts`) and the route components, then emits HTML for each page. Content stays driven by the same source of truth so the export matches the live site exactly (phone numbers, copy, link labels, cause descriptions, FAQ entries, board bios, etc.).

Steps:

1. Write `scripts/export-static.ts` that:
   - Imports every `src/content/*.ts` module and `CAUSES`.
   - Defines small render helpers (`renderUtilityBar`, `renderHeader`, `renderFooter`, plus one renderer per page that mirrors the JSX of the corresponding route file).
   - For dynamic pages (`causes/:slug`, the two event detail pages), iterates and writes one HTML file per item.
   - Writes `css/styles.css` by porting the design tokens from `src/styles.css` to plain CSS custom properties (oklch retained — supported in modern browsers), plus utility classes for the Tailwind patterns actually used in the components (grid layouts, container widths, rounded-3xl cards, ember/sky/primary buttons, mountain divider, hero gradient, shadows).
2. Run the script with `bun`, then zip the output directory into `/mnt/documents/whsf-static-export.zip`.
3. QA: open 3 sample pages (home, a cause detail, contact) in a headless renderer to confirm layout doesn't break, fix CSS gaps, regenerate.

## CSS porting approach

- Replace Tailwind utilities with hand-written classes scoped to the export. Where the React components use many ad-hoc utilities, the export consolidates them into semantic classes (e.g. `.cause-card`, `.hero`, `.section`, `.btn-ember`, `.utility-bar`) so the resulting HTML stays readable.
- Keep the brand tokens (navy `--primary`, sky, ember, cream) and Fraunces/Figtree typography exactly as defined in `src/styles.css`.
- Reuse the inline SVG from `MountainDivider.tsx` verbatim.
- Carousels (`HeroCarousel`) become a static stack of the first slide with the same styling — no JS in the export. A short note in the README explains this.
- Slide-out panels on Get Involved (Contact Us / Volunteer) become inline form sections with the same fields and styling.
- Images: reference the same image URLs already used in the React components (so the export shows real photos as long as it's viewed online). The README notes which paths are external vs project-bundled.

## Per-page metadata

Each page's `<head>` reuses the `head()` values currently set in the matching route file (title, description, og:title, og:description, og:url, canonical) so the export keeps the SEO work already done.

## Out of scope

- No JS interactivity (carousel autoplay, slide-out panels, accordion animation, language toggle). The README calls out where Wix/Velo or vanilla JS would need to be added.
- No build of a live server — pages are pure static HTML.
- Not bundling the Lovable React app itself; this is a parallel export.

## Acceptance

- Zip downloads and unzips cleanly.
- Opening `pages/home.html` in a browser shows the navy hero, mountain divider, cause grid, and footer with the same fonts/colors as the live site.
- Phone number `(801) 778-6834`, email, footer columns (Causes / Foundation / About), and FAQ entries match the current site content.
