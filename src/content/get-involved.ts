// Get Involved page content.

export const getInvolved = {
  hero: {
    eyebrow: "Get Involved",
    title: "Two simple ways to be the bridge.",
    body: "Every contribution — financial or in-kind — directly supports our neighbors across Morgan and Weber Counties.",
  },

  waysHeading: {
    eyebrow: "Ways to give",
    title: "Monetary and in-kind donations",
  },

  ways: [
    {
      title: "Monetary donations",
      body: "One-time or recurring gifts of any size fund Foundation programs year-round. 100% of your gift stays local.",
      ctaLabel: "Donate now",
      ctaTo: "/donate" as const,
    },
    {
      title: "In-kind donations",
      body: "Donate goods, supplies, or services — including gifts and essentials for Sub for Santa families and items for the Golf Tournament.",
      ctaLabel: "Contact us",
      ctaTo: "/contact" as const,
    },
  ],
};
