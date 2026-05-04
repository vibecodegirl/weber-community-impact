# Content files — edit these

Every page on the site has a matching file in this folder. **All editable text,
links, lists, numbers, button labels, and form copy live here.** The route files
in `src/routes/` only handle layout — they do not contain hardcoded copy.

## How to edit

1. Find the page file (e.g. `home.ts`, `about.ts`, `donate.ts`).
2. Change the strings between the quotes. Don't change the keys (the words on the
   left of `:`).
3. Save. The preview updates automatically.

## Wix migration

When rebuilding this design in Wix, open each file in this folder and copy the
strings directly into the matching Wix text/list elements. The structure of each
file mirrors the structure of the page top-to-bottom (hero → sections → CTA).

## Global content

- `site.ts` — Nav, footer, contact info, donate URL, brand
- `causes.ts` — The 5 cause areas (also used by the home page and donate page)

## Page content

One file per route: `home.ts`, `about.ts`, `board.ts`, `impact.ts`, `events.ts`,
`news.ts`, `get-involved.ts`, `contact.ts`, `donate.ts`, `financials.ts`,
`faq.ts`, `privacy.ts`, `terms.ts`, `hero.ts` (homepage carousel slides).
