## Plan

Move the `<GolfGallery />` component so it renders after the `<SponsorsSection />` instead of before it.

### Change
In `src/routes/events.golf-tournament.tsx`, move `<GolfGallery />` from between the hero section and `<SponsorsSection />` to after `</SponsorsSection>` and before the final CTA section.

### Page flow after change
1. Hero (event title + details card)
2. Sponsors
3. Golf Gallery
4. CTA (Sponsorship & registration)

That's it — no other changes needed.