## Goal
Convert the Contact page hero into a two-column layout. Left column keeps the existing eyebrow/title/body. Right column renders an optional team member contact card (photo, name, title, email, phone).

## Changes

**1. `src/content/contact.ts`**
Add an optional `teamMember` block to the hero content:
```ts
hero: {
  eyebrow, title, body,
  teamMember: {
    enabled: true,
    photo: "/placeholder-avatar.jpg", // or imported asset
    name: "Jane Doe",
    title: "Director of Community Outreach",
    email: "jane@whsfoundation.org",
    phone: "(801) 555-0123",
  }
}
```
Marking it optional (or `enabled: false`) lets the column be hidden later.

**2. `src/routes/contact.tsx`**
- Restructure the hero `<section>` into a responsive grid: `grid gap-10 lg:grid-cols-[1.2fr_1fr] items-center`.
- Left column: existing eyebrow + h1 + body paragraph (unchanged copy).
- Right column (only renders when `teamMember.enabled`): a card with circular photo, name (serif), title (sky/muted), and Mail/Phone rows linking to `mailto:` / `tel:`.
- Card styled to read on the navy hero: `bg-card/10 backdrop-blur border border-primary-foreground/15 rounded-2xl p-6` with light text tokens.
- On mobile: single column, hero text first, team card below (default DOM order, no `order-` overrides needed).

**3. Placeholder asset**
Use a generated avatar saved to `src/assets/contact-team-member.jpg` and import it in `contact.ts` (or accept a string URL). Provide friendly placeholder values so the user can swap in real info later.

## Notes
- No changes to backend, routing, or other pages.
- Existing contact info cards and form below the hero remain untouched.
- All colors via design tokens (`primary`, `primary-foreground`, `sky`, `ember`).