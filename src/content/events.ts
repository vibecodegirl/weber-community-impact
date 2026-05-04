// Events page content.

export const events = {
  hero: {
    eyebrow: "Events",
    title: "Two signature events. One shared mission.",
    body: "Each year, the Foundation hosts two flagship events that fund services for our neighbors across Morgan and Weber Counties.",
  },

  upcomingHeading: {
    eyebrow: "Our events",
    title: "Mark your calendar",
  },

  upcoming: [
    {
      date: "Summer",
      name: "Foundation Golf Tournament",
      location: "Northern Utah — course TBA",
      description:
        "A day on the green bringing together sponsors, foursomes, and community partners to fund year-round Foundation programs.",
      href: "/events/golf-tournament" as const,
      ctaLabel: "Tournament details",
    },
    {
      date: "December",
      name: "Sub for Santa",
      location: "Morgan & Weber Counties",
      description:
        "Sponsor a child or family for the holidays — providing gifts, warm clothing, and essentials for neighbors identified through Weber Human Services.",
      href: "/events/sub-for-santa" as const,
      ctaLabel: "Learn how to help",
    },
  ],

  rsvpLabel: "Learn more",
};
