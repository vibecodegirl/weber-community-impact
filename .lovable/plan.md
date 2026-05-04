# Weber Human Services Foundation — Website Plan

A modern, service-oriented marketing site that mirrors the visual DNA of the parent organization (weberhs.net) while feeling fresher, warmer, and more story-driven. Built as a static multi-page TanStack site (no CMS in v1).

## Visual Direction

- **Primary palette** (from logo): deep navy `#1B2C56`, light sky blue `#A8D8E8`, white. Accent hints of warm red `#C8412C` for CTAs and emphasis. Soft warm gray for backgrounds.
- **Typography**: clean, trustworthy sans-serif for body (Inter / Figtree); a refined serif italic accent for emotional pull-quotes and "Foundation" wordmark vibes (echoing the logo's italic "Foundation").
- **Mood**: mountain imagery motifs (subtle nods to the logo's peaks), generous whitespace, rounded cards, soft shadows, photography-forward sections featuring real people and community moments.
- **Tone**: warm, human, hopeful, professional. "One person at a time" as a recurring narrative thread.

## Site Map

```text
/                        Home
/about                   Who we are, mission, board, parent org connection
/causes                  Overview of 5 cause areas (with submenu nav)
  /causes/employee-care
  /causes/aging-services
  /causes/mental-health
  /causes/prevention
  /causes/substance-abuse
/impact                  Impact stories + Annual report highlights
/events                  Upcoming + past events calendar
/get-involved            Volunteer + Corporate/Community partners
/news                    News/blog list + newsletter signup
/contact                 Contact form, locations (Morgan & Weber counties)
/donate                  Donation landing (links out to paywall)
```

Top nav: **About · Causes ▾ · Impact · Events · Get Involved · News · Contact** with prominent red **Donate** button. Causes opens a dropdown listing all 5 areas.

## Page Breakdown

**Home**
- Hero with mission statement, mountain motif, primary photo, dual CTA (Donate / Learn About Our Causes)
- "Who We Are / What We Do / Why We Do It" trio (from your copy)
- 5 cause areas as visual cards linking to detail pages
- Featured impact story (one person, one outcome)
- Stats strip (clients served, dollars raised, programs funded — placeholders)
- Upcoming event teaser
- Parent org connection band linking to weberhs.net
- Newsletter signup + donate CTA

**About**
- Foundation story, relationship to Weber Human Services
- Mission / Vision / Values
- Board & leadership (placeholder bios + headshots)
- Financial transparency note (placeholder for 990s / annual report PDF)

**Causes (overview + 5 detail pages)**
- Overview: intro + grid of all 5
- Each detail page: who it serves, the gap the Foundation fills, outcomes/impact, related stories, "Fund this cause" CTA

**Impact**
- Story grid (anonymized client spotlights, 6–8 placeholders)
- Annual report highlights section with key numbers and a download placeholder
- Pull-quotes from clients/staff

**Events**
- Upcoming events list with date, location, description, RSVP/learn-more link
- Past events archive with photos
- Recurring annual events (gala, awareness walks)

**Get Involved**
- Volunteer opportunities + interest form
- Corporate & community partners showcase (logo wall, partnership tiers)
- Ways to give summary (one-time, monthly, memorial/honor, planned giving, employer match) — all routing to /donate

**News**
- Article list with categories
- Newsletter signup (email capture — stored locally / placeholder for v1)

**Contact**
- Contact form (name, email, message — placeholder submit)
- Locations & service area (Morgan & Weber counties)
- Phone, email, social links
- Crisis resources callout (988, parent org links)

**Donate**
- Explanatory page about impact of giving
- Buttons routing to external donation paywall (placeholder URLs swappable later)
- Other ways to give (mail check, stock, planned giving contact)

## Components Built

Reusable: `SiteHeader`, `SiteFooter`, `DonateButton`, `CauseCard`, `StoryCard`, `EventCard`, `StatBlock`, `SectionHeader`, `NewsletterSignup`, `MountainDivider` (subtle SVG echoing the logo).

## Out of Scope for v1

- Admin dashboard / CMS (content is hardcoded; easy to update via developer)
- Real donation processing (links out to existing paywall)
- Real form submissions (forms are UI-only with success states; can be wired later)
- Authentication

## Open Items (can finalize during build or after)

- Donation paywall URL(s) — placeholders used until provided
- Real photography — using high-quality stock placeholders that match the warm/community tone
- Final board bios, real impact story content, actual event listings — placeholder copy used

