// Financials & 990s page content.

export const financials = {
  hero: {
    eyebrow: "Financial Transparency",
    title: "Every dollar accounted for. Every report public.",
    body: "The Weber Human Services Foundation is a 501(c)(3) nonprofit. We publish our annual reports and IRS Form 990s so donors can see exactly how their generosity is put to work.",
  },

  allocationHeading: {
    eyebrow: "How funds are used",
    title: "Where your gift goes",
  },

  allocation: [
    { label: "Direct client programs", value: 82 },
    { label: "Fundraising", value: 11 },
    { label: "Administration", value: 7 },
  ],

  documentsHeading: {
    eyebrow: "Documents",
    title: "Annual reports & 990s",
  },

  documents: [
    { year: "2025", type: "Annual Report", note: "PDF · Coming soon", url: "chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://weberhsfoundation.org/wp-content/uploads/2025/09/AnnualReport-2025.pdf" },
    { year: "2025", type: "IRS Form 990", note: "PDF · Coming soon", url: "#" },
    { year: "2024", type: "Annual Report", note: "PDF", url: "#" },
    { year: "2024", type: "IRS Form 990", note: "PDF", url: "https://apps.irs.gov/pub/epostcard/cor/870528187_202412_990_2026030223965667.pdf" },
    { year: "2023", type: "Annual Report", note: "PDF", url: "#" },
    { year: "2023", type: "IRS Form 990", note: "PDF", url: "https://apps.irs.gov/pub/epostcard/cor/870528187_202312_990_2025030323149079.pdf" },
  ],

  downloadLabel: "Download",

  questionsCta: {
    badge: "501(c)(3) Public Charity",
    title: "Have a question about our finances?",
    body: "We welcome donor questions. Contact our treasurer for additional financial detail or to request a specific year's filing.",
    buttonLabel: "Contact us",
  },
};
