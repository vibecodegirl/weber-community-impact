// Homepage content — every editable string on the home page.
// Sections are listed top-to-bottom in the order they appear.

export const home = {
  // 1. WHO / WHAT / WHY section
  intro: {
    eyebrow: "The Foundation",
    title: "Local people. Lasting impact.",
    description:
      "A nonprofit comprised of community members from local organizations, dedicated to supporting the clients and programs of Weber Human Services.",
    cards: [
      {
        eyebrow: "Who we are",
        title: "Neighbors helping neighbors",
        body: "A volunteer board of local leaders dedicated to the work of Weber Human Services and the people it serves.",
      },
      {
        eyebrow: "What we do",
        title: "We bridge the funding gap",
        body: "We raise and steward charitable contributions to fill the spaces Medicaid and Medicare leave behind.",
      },
      {
        eyebrow: "Why we do it",
        title: "So lives can be rebuilt",
        body: "We help clients and families access the services they need to lead healthy, successful, connected lives.",
      },
    ],
  },

  // 2. CAUSES section (cards pulled from src/content/causes.ts)
  causes: {
    eyebrow: "Five focus areas",
    title: "Where your gift goes to work.",
    description: "Every dollar funds a specific need within our community — directly tied to outcomes.",
    viewAllLabel: "View all causes",
  },

  // 3. IMPACT STORY quote
  story: {
    eyebrow: "An Impact Story",
    quote: "I didn't think anyone could help me. The Foundation paid for the therapy that gave me my life back.",
    attribution: "— Maria, mental health client, age 34",
    ctaLabel: "Read more stories",
    stats: [
      { value: "10,000+", label: "lives touched in 2025" },
      { value: "$1.4M", label: "stewarded for direct client care" },
      { value: "5", label: "focus areas of impact" },
      { value: "100%", label: "of your gift stays local" },
    ],
  },

  // 4. PARENT ORG band
  parentOrg: {
    title: "An extension of Weber Human Services",
    body: "The Foundation is an extension of Weber Human Services — the public agency providing mental health, substance use, and aging services across our two counties.",
    ctaLabel: "Visit weberhs.net",
  },

  // 5. CLOSING CTA
  cta: {
    title: "Be the bridge for someone who needs one.",
    body: "Your gift becomes therapy, recovery, dignity, hope — for a real person, in your community.",
    primaryLabel: "Donate",
    secondaryLabel: "Volunteer with us",
  },
};
