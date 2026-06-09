## Golf tournament page — Option A + gallery

### 1. Restructure the hero into two columns

Replace the current single-column hero with a two-column layout (stacks on mobile, side-by-side on `lg:`):

**Left column** — what's there today, slightly tightened:
- "All events" back link
- "Signature Event" eyebrow
- H1: "Foundation Golf Tournament"
- Lead paragraph about funding year-round services

**Right column** — a single glass/translucent card containing:
- **Date** row (Calendar icon) — Thursday, June 25, 2026
- **Location** row (MapPin icon) — Wolf Creek · Eden, Utah
- **Schedule** row (Clock icon) — 8:00 a.m. check-in · 9:00 a.m. shotgun start
- Divider
- **Contact** block — Madeline McDonald, Foundation Director, with tap-to-call phone and mailto email

Card style: `bg-primary-foreground/10` with `backdrop-blur`, subtle border, rounded-2xl — sits on the dark primary hero background so it reads as part of the hero, not a body card.

### 2. Remove the standalone body sections that moved into the hero

Delete the existing event details grid (Date / Location cards) and the contact strip below them. That whole `<section>` between the hero and `<SponsorsSection />` goes away.

### 3. Add a gallery section between hero and sponsors

Upload the 9 photos via `lovable-assets` (CDN pointers under `src/assets/gallery/`), then render a new `GallerySection` on the page.

**Layout — mixed-aspect masonry, not a carousel:**
- Use a CSS `columns-2 md:columns-3 lg:columns-4` masonry with `gap-3`
- Each image preserves its native aspect ratio (`w-full h-auto`) so the two portrait shots (hug, golf cart waver, Insurance Center) interleave naturally with the landscape shots
- Rounded corners, soft shadow, subtle hover zoom (`transition-transform hover:scale-[1.02]`)
- Lazy-load all images (`loading="lazy"`)
- Click opens a lightweight lightbox (shadcn `Dialog`) showing the full image — no extra deps

**Why masonry over carousel:** carousels hide content and auto-rotate (distracting near a CTA). A masonry grid is calm, scannable, naturally varied, and lets visitors absorb the vibe at their own pace before reaching sponsors. Section gets a small eyebrow + heading ("Moments from past tournaments") so it reads as a deliberate showcase, not a dump.

### 4. Final page flow

```
Hero (two columns: pitch | details+contact card)
   ↓
Gallery (masonry, "Moments from past tournaments")
   ↓
Sponsors (unchanged — title / premier / team-hole / team / hole / raffle)
   ↓
Sponsorship & registration CTA (unchanged)
```

### Technical notes

- New files: `src/assets/gallery/*.asset.json` (9 pointers), `src/components/site/GolfGallery.tsx`
- Edit: `src/routes/events.golf-tournament.tsx` — new hero JSX, delete old details section, mount `<GolfGallery />` between hero and `<SponsorsSection />`
- No new npm deps; reuse existing shadcn `Dialog` for lightbox
- Alt text per image (golfer teeing off, raffle table, cart line, registration, etc.) for a11y/SEO

Sound good — or want a carousel instead of masonry, or a different gallery heading?
