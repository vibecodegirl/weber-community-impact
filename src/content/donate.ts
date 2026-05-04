// Donate page content. The actual giving link lives in `site.ts` (donateUrl).

export const donate = {
  hero: {
    eyebrow: "Donate",
    title: "Your gift becomes someone's turning point.",
    body: "Every dollar you give stays in Morgan and Weber Counties — funding therapy, recovery, dignity, and connection for your neighbors.",
  },

  giveNowHeading: {
    eyebrow: "Give now",
    title: "Choose your gift",
  },

  tiers: [
    { value: "$50", description: "covers a therapy session" },
    { value: "$150", description: "funds a week of caregiver respite" },
    { value: "$500", description: "sponsors a recovery coach for a month" },
  ],

  giveLabelPrefix: "Give", // shown as "Give $50"
  customAmountLabel: "Choose a custom amount",
  processedNote: "Donations are processed securely through our giving partner.",

  designatedHeading: {
    eyebrow: "Designated giving",
    title: "Direct your gift to a cause",
  },

  otherWaysHeading: {
    eyebrow: "Other ways to give",
    title: "More than one way to make a difference",
  },

  otherWays: [
    { title: "Become a monthly donor", body: "Sustaining gifts let us plan further and serve more." },
    { title: "Honor or memorial gifts", body: "Celebrate or remember someone you love." },
    { title: "Stock & planned giving", body: "Tax-smart strategies for greater impact." },
    { title: "Mail a check", body: "Made out to Weber Human Services Foundation." },
  ],

  taxNote:
    "The Weber Human Services Foundation is a registered 501(c)(3) nonprofit. All donations are tax-deductible to the fullest extent allowed by law.",
};
