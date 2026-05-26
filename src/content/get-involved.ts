// Get Involved page content.

export const getInvolved = {
  hero: {
    eyebrow: "Get Involved",
    title: "Three simple ways to be the bridge.",
    body: "Every contribution — financial, in-kind, or your time — directly supports our neighbors across Morgan and Weber Counties.",
  },

  waysHeading: {
    eyebrow: "Ways to give",
    title: "Donate, give in-kind, or volunteer",
  },

  ways: [
    {
      title: "Monetary donations",
      body: "One-time or recurring gifts of any size fund Foundation programs year-round. 100% of your gift stays local.",
      ctaLabel: "Donate now",
      ctaTo: undefined as "/donate" | "/contact" | undefined,
      ctaHref: "https://weberhsfoundation.org/donate/" as string | undefined,
    },
    {
      title: "In-kind donations",
      body: "Donate goods, supplies, or services — including gifts and essentials for Sub for Santa families and items for the Golf Tournament.",
      ctaLabel: "Contact us",
      ctaTo: "/contact" as const,
      ctaHref: undefined as string | undefined,
    },
    {
      title: "Volunteer with us",
      body: "Lend your time and talents at Foundation events and programs. Send us a quick note and we'll match you with an opportunity that fits.",
      ctaLabel: "Inquire to volunteer",
      ctaTo: undefined as "/donate" | "/contact" | undefined,
      ctaHref:
        "mailto:foundation@weberhs.org?subject=Volunteer%20inquiry&body=Hi%20Weber%20Human%20Services%20Foundation%2C%0A%0AI'd%20like%20to%20volunteer.%20Here's%20a%20bit%20about%20me%3A%0A%0AName%3A%0APhone%3A%0AAvailability%3A%0AInterests%2Fskills%3A%0A%0AThanks!" as string | undefined,
    },
  ],
};
