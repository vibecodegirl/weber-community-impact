// Global site content — nav, footer, contact info, donate URL.
// Edit anything here to update the header/footer/contact details across the whole site.

export const site = {
  brandName: "Weber Human Services",
  brandSuffix: "Foundation",
  tagline:
    "Bridging the gap between client needs and available funding — so every neighbor in Morgan and Weber Counties can lead a healthy, successful life.",

  // External donation paywall — replace with your real giving link.
  donateUrl: "#",

  // Slim utility bar shown above the main header.
  utilityBar: {
    crisisLabel: "24 Hour Crisis Hotline",
    crisisNumber: "988",
    crisisHref: "tel:988",
    languageLabel: "Language",
  },

  // Languages offered by the translator toggle. Codes are Google Translate codes.
  languages: [
    { code: "en", label: "EN", name: "English" },
    { code: "es", label: "ES", name: "Español" },
  ],

  nav: {
    causesLabel: "Causes",
    donateLabel: "Donate",
    items: [
      { to: "/" as const, label: "Home" },
      { to: "/about" as const, label: "About" },
      { to: "/impact" as const, label: "Impact" },
      { to: "/events" as const, label: "Events" },
      { to: "/get-involved" as const, label: "Get Involved" },
      { to: "/news" as const, label: "News" },
      { to: "/contact" as const, label: "Contact" },
    ],
  },


  // Parent organization
  parentOrg: {
    name: "Weber Human Services",
    url: "https://www.weberhs.net/",
  },

  contact: {
    email: "foundation@weberhs.org",
    phone: "(801) 626-0700",
    phoneHref: "+18016260700",
    serviceArea: "Morgan & Weber Counties, Utah",
  },

  crisis: {
    line988: "988 — Suicide & Crisis Lifeline (call or text)",
    whsCrisis: {
      label: "Weber Human Services 24/7 crisis line ↗",
      url: "https://www.weberhs.net/",
    },
  },

  footer: {
    causesHeading: "Causes",
    foundationHeading: "Foundation",
    aboutHeading: "About",
    donateButton: "Make a donation",
    copyrightSuffix: "A 501(c)(3) nonprofit.",
    serviceAreaLine: "Serving Morgan & Weber Counties, Utah",
    legalLinks: [
      { label: "Privacy", to: "/privacy" as const },
      { label: "Terms", to: "/terms" as const },
    ],
    foundationLinks: [
      { label: "Impact", to: "/impact" as const },
      { label: "Events", to: "/events" as const },
      { label: "Get Involved", to: "/get-involved" as const },
      { label: "News", to: "/news" as const },
    ],
    aboutLinks: [
      { label: "About", to: "/about" as const },
      { label: "Board & Leadership", to: "/board" as const },
      { label: "Financials & 990s", to: "/financials" as const },
      { label: "FAQ", to: "/faq" as const },
      { label: "Contact", to: "/contact" as const },
    ],
  },
};
