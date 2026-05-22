/**
 * Static HTML/CSS export of the Weber Human Services Foundation site.
 * Run with: bun scripts/export-static.ts
 * Output:   /mnt/documents/whsf-static-export/
 */
import { mkdirSync, writeFileSync, cpSync, rmSync } from "node:fs";
import { join } from "node:path";

const OUT = "/mnt/documents/whsf-static-export";
const SITE = "https://whsf.accessmypage.online";

// ---- helpers ----------------------------------------------------------------
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// ---- DATA (mirrors src/content/*.ts + src/lib/causes.ts) --------------------
const site = {
  brandName: "Weber Human Services",
  brandSuffix: "Foundation",
  tagline:
    "Bridging the gap between client needs and available funding — so every neighbor in Morgan and Weber Counties can lead a healthy, successful life.",
  donateUrl: "#",
  utilityBar: { crisisLabel: "24 Hour Crisis Hotline", crisisNumber: "988", crisisHref: "tel:988" },
  parentOrg: { name: "Weber Human Services", url: "https://www.weberhs.net/" },
  contact: {
    email: "foundation@weberhs.org",
    phone: "(801) 778-6834",
    phoneHref: "+18017786834",
    serviceArea: "Morgan & Weber Counties, Utah",
  },
  nav: [
    { to: "/", label: "Home", file: "home.html" },
    { to: "/about", label: "About", file: "about.html" },
    { to: "/impact", label: "Impact", file: "impact.html" },
    { to: "/events", label: "Events", file: "events.html" },
    { to: "/get-involved", label: "Get Involved", file: "get-involved.html" },
    { to: "/news", label: "News", file: "news.html" },
    { to: "/contact", label: "Contact", file: "contact.html" },
  ],
  causesLabel: "Causes",
  donateLabel: "Donate",
  footer: {
    causesHeading: "Causes",
    foundationHeading: "Foundation",
    aboutHeading: "About",
    donateButton: "Make a donation",
    copyrightSuffix: "A 501(c)(3) nonprofit.",
    serviceAreaLine: "Serving Morgan & Weber Counties, Utah",
    legalLinks: [
      { label: "Privacy", file: "privacy.html" },
      { label: "Terms", file: "terms.html" },
    ],
    foundationLinks: [
      { label: "Impact", file: "impact.html" },
      { label: "Events", file: "events.html" },
      { label: "Get Involved", file: "get-involved.html" },
      { label: "News", file: "news.html" },
    ],
    aboutLinks: [
      { label: "About", file: "about.html" },
      { label: "Board & Leadership", file: "board.html" },
      { label: "Financials & 990s", file: "financials.html" },
      { label: "FAQ", file: "faq.html" },
      { label: "Contact", file: "contact.html" },
    ],
  },
};

const CAUSES = [
  {
    slug: "employee-care",
    file: "causes-employee-care.html",
    title: "Employee Care Fund",
    tagline: "Caring for those who care for our community.",
    image: "assets/employee-care.jpg",
    description:
      "The people of Weber Human Services walk alongside our community in its hardest moments. The Employee Care Fund supports staff facing personal hardship — medical emergencies, housing instability, or unexpected loss — so they can keep showing up for the families that depend on them.",
    outcomes: [
      { label: "Staff supported in 2024", value: "62" },
      { label: "Average grant", value: "$1,250" },
      { label: "Requests funded within 7 days", value: "94%" },
    ],
    programs: ["Emergency hardship grants", "Mental wellness stipends for caregivers", "Continuing education scholarships"],
  },
  {
    slug: "aging-services",
    file: "causes-aging-services.html",
    title: "Aging Services",
    tagline: "Dignity, connection, and care for our elders.",
    image: "assets/aging.jpg",
    description:
      "We fund programs that help older adults remain independent, connected, and well — from in-home support and caregiver respite to social engagement programs that combat isolation.",
    outcomes: [
      { label: "Seniors served", value: "1,400+" },
      { label: "Caregiver respite hours funded", value: "8,200" },
      { label: "Home visits last year", value: "3,100" },
    ],
    programs: ["Caregiver respite & support", "In-home wellness checks", "Social engagement & meal programs"],
  },
  {
    slug: "mental-health",
    file: "causes-mental-health.html",
    title: "Mental Health",
    tagline: "Healing minds. Restoring hope.",
    image: "assets/mental-health.jpg",
    description:
      "We bridge the gaps Medicaid and Medicare leave behind — funding therapy, crisis stabilization, and supportive housing so no one in our community is turned away from the help they need.",
    outcomes: [
      { label: "Therapy sessions funded", value: "5,600" },
      { label: "Crisis interventions supported", value: "320" },
      { label: "Clients served", value: "2,100" },
    ],
    programs: ["Therapy access scholarships", "Crisis stabilization support", "Supportive housing assistance"],
  },
  {
    slug: "prevention",
    file: "causes-prevention.html",
    title: "Prevention",
    tagline: "Stopping harm before it starts.",
    image: "assets/prevention.jpg",
    description:
      "Prevention works. We fund youth education, family resilience programs, and community outreach that keep our neighbors — especially young people — out of crisis to begin with.",
    outcomes: [
      { label: "Youth reached", value: "4,800" },
      { label: "Schools partnered", value: "27" },
      { label: "Family workshops", value: "140" },
    ],
    programs: ["Youth resilience curriculum", "Parent education workshops", "Community awareness campaigns"],
  },
  {
    slug: "substance-abuse",
    file: "causes-substance-use-recovery.html",
    title: "Substance Use Recovery",
    tagline: "Recovery is possible. Together.",
    image: "assets/substance.jpg",
    description:
      "We support evidence-based recovery — peer support, sober living, and the wraparound services that help individuals and families rebuild lives free from addiction.",
    outcomes: [
      { label: "People in recovery supported", value: "780" },
      { label: "Peer-support hours funded", value: "12,400" },
      { label: "Sober-living scholarships", value: "95" },
    ],
    programs: ["Peer recovery coaching", "Sober-living scholarships", "Family recovery support"],
  },
];

const home = {
  intro: {
    eyebrow: "The Foundation",
    title: "Local people. Lasting impact.",
    description:
      "A nonprofit comprised of community members from local organizations, dedicated to supporting the clients and programs of Weber Human Services.",
    cards: [
      { eyebrow: "Who we are", title: "Neighbors helping neighbors", body: "A volunteer board of local leaders dedicated to the work of Weber Human Services and the people it serves." },
      { eyebrow: "What we do", title: "We bridge the funding gap", body: "We raise and steward charitable contributions to fill the spaces Medicaid and Medicare leave behind." },
      { eyebrow: "Why we do it", title: "So lives can be rebuilt", body: "We help clients and families access the services they need to lead healthy, successful, connected lives." },
    ],
  },
  causes: { eyebrow: "Five focus areas", title: "Where your gift goes to work.", description: "Every dollar funds a specific need within our community — directly tied to outcomes.", viewAllLabel: "View all causes" },
  story: {
    eyebrow: "An Impact Story",
    quote: "I didn't think anyone could help me. The Foundation paid for the therapy that gave me my life back.",
    attribution: "— Maria, mental health client, age 34",
    ctaLabel: "Read more stories",
    stats: [
      { value: "10,000+", label: "lives touched in 2024" },
      { value: "$1.4M", label: "stewarded for direct client care" },
      { value: "5", label: "focus areas of impact" },
      { value: "100%", label: "of your gift stays local" },
    ],
  },
  parentOrg: { title: "An extension of Weber Human Services", body: "The Foundation is an extension of Weber Human Services — the public agency providing mental health, substance use, and aging services across our two counties.", ctaLabel: "Visit weberhs.net" },
  cta: { title: "Be the bridge for someone who needs one.", body: "Your gift becomes therapy, recovery, dignity, hope — for a real person, in your community.", primaryLabel: "Donate", secondaryLabel: "Volunteer with us" },
};

const heroSlide = {
  image: "assets/hero.jpg",
  eyebrow: "Serving Morgan & Weber Counties",
  titleStart: "Bridging the gap,",
  titleHighlight: "one person",
  titleEnd: "at a time.",
  body: "We raise and steward funds that close the distance between what Medicaid and Medicare cover — and what our neighbors actually need.",
  primary: "Donate now",
  secondary: "Explore our causes",
};

const about = {
  hero: { eyebrow: "About the Foundation", title: "We exist so that no neighbor is turned away from the help they need.", body: "The Weber Human Services Foundation is a 501(c)(3) nonprofit comprised of a group of individuals from local organizations who are dedicated to supporting the clients and programs offered at Weber Human Services." },
  whoWhatWhy: [
    { eyebrow: "Who we are", title: "A local board of local people.", body: "Our directors live, work, and raise families in Morgan and Weber Counties. We know our neighbors because they are our neighbors." },
    { eyebrow: "What we do", title: "We bridge the funding gap.", body: "We raise charitable contributions and direct them to the programs and clients of Weber Human Services where the need is greatest." },
    { eyebrow: "Why we do it", title: "Because lives depend on it.", body: "Healthy, successful lives are built on access — to therapy, recovery, dignity, and connection. The Foundation makes that access possible." },
  ],
  values: { eyebrow: "Our values", title: "How we show up for our community.", items: [
    { title: "Integrity", body: "Every dollar is stewarded with transparency and care." },
    { title: "Compassion", body: "We meet our neighbors where they are, without judgment." },
    { title: "Extension", body: "We are an extension of Weber Human Services, working alongside local partners." },
    { title: "Outcomes", body: "We measure success in lives changed, not dollars raised." },
  ]},
  boardPreview: { eyebrow: "Leadership", title: "Our board of directors", members: [
    { name: "Board Member", role: "Chair" }, { name: "Board Member", role: "Vice Chair" }, { name: "Board Member", role: "Treasurer" },
    { name: "Board Member", role: "Secretary" }, { name: "Board Member", role: "Director" }, { name: "Board Member", role: "Director" },
  ]},
  transparency: { title: "Financial transparency", body: "We are proud to publish our annual reports and IRS Form 990s. Every gift is tracked, stewarded, and reported on publicly.", primaryLabel: "Annual report", secondaryLabel: "Donate" },
};

const board = {
  hero: { eyebrow: "Board & Leadership", title: "Local leaders, volunteering their time for our neighbors.", body: "Our board of directors is made up of people who live, work, and serve in Morgan and Weber Counties. Every member volunteers their time and expertise — no board member is compensated." },
  directorsHeading: { eyebrow: "Directors", title: "Meet the board" },
  directors: [
    { name: "Board Member", role: "Chair", affiliation: "Local Business Leader", bio: "Brings decades of community leadership and a passion for mental health advocacy to the Foundation's strategic direction." },
    { name: "Board Member", role: "Vice Chair", affiliation: "Healthcare Executive", bio: "Champions integrated care and works to remove barriers between clinical services and the neighbors who need them." },
    { name: "Board Member", role: "Treasurer", affiliation: "CPA, Local Firm", bio: "Stewards the Foundation's finances with transparency and ensures every donor dollar is accounted for." },
    { name: "Board Member", role: "Secretary", affiliation: "Education Leader", bio: "Connects prevention programming with the schools and families across Morgan and Weber Counties." },
    { name: "Board Member", role: "Director", affiliation: "Community Volunteer", bio: "A long-time volunteer focused on aging services and supporting our oldest neighbors with dignity." },
    { name: "Board Member", role: "Director", affiliation: "Faith Community Leader", bio: "Bridges faith communities and recovery resources, helping reduce stigma around substance use treatment." },
    { name: "Board Member", role: "Director", affiliation: "Weber Human Services Liaison", bio: "Ensures the Foundation's funding aligns directly with the most pressing needs identified by frontline staff." },
    { name: "Board Member", role: "Director", affiliation: "Local Attorney", bio: "Provides governance and compliance guidance, keeping the Foundation accountable to its mission and donors." },
  ],
  joinCta: { eyebrow: "Join the board", title: "Interested in serving your community?", body: "We periodically welcome new directors who bring fresh perspective and a commitment to human services in our region. Reach out to learn about open seats and the nomination process.", buttonLabel: "Contact the board" },
};

const impact = {
  hero: { eyebrow: "Impact & Stories", title: "One person at a time. Thousands of times over." },
  numbers: [
    { value: "10,000+", label: "lives touched" },
    { value: "$1.4M", label: "stewarded for direct client care" },
    { value: "62", label: "WHS staff supported by the Care Fund" },
    { value: "27", label: "school partners reached through prevention" },
  ],
  storiesHeading: { eyebrow: "Stories", title: "Real people. Real change." },
  stories: [
    { name: "Maria, 34", cause: "Mental Health", quote: "I didn't think anyone could help me. The Foundation paid for the therapy that gave me my life back." },
    { name: "James, 67", cause: "Aging Services", quote: "After my wife passed, the home visits kept me going. I'm not alone anymore." },
    { name: "Sofia, 16", cause: "Prevention", quote: "The school program helped me find words for what I was feeling — and people who listened." },
    { name: "Daniel, 41", cause: "Substance Use Recovery", quote: "Two years sober. My kids have their dad back. I owe a piece of that to the people who funded my recovery coach." },
    { name: "Renée, WHS staff", cause: "Employee Care", quote: "When my mom got sick, the Care Fund covered my rent so I could focus on being there for her." },
    { name: "The Lee Family", cause: "Aging Services", quote: "Respite care meant I could rest, and that meant I could keep caring for Dad at home." },
  ],
  storiesDisclaimer: "Names and details have been changed to protect client privacy.",
  annualReport: { title: "2024 Annual Report", body: "A full breakdown of programs funded, outcomes achieved, and how every dollar was spent.", downloadLabel: "Download (PDF)", downloadUrl: "#", donateLabel: "Donate" },
};

const events = {
  hero: { eyebrow: "Events", title: "Two signature events. One shared mission.", body: "Each year, the Foundation hosts two flagship events that fund services for our neighbors across Morgan and Weber Counties." },
  upcomingHeading: { eyebrow: "Our events", title: "Mark your calendar" },
  upcoming: [
    { date: "Summer", name: "Foundation Golf Tournament", location: "Northern Utah — course TBA", description: "A day on the green bringing together sponsors, foursomes, and community partners to fund year-round Foundation programs.", file: "events-golf-tournament.html", ctaLabel: "Tournament details" },
    { date: "December", name: "Sub for Santa", location: "Morgan & Weber Counties", description: "Sponsor a child or family for the holidays — providing gifts, warm clothing, and essentials for neighbors identified through Weber Human Services.", file: "events-sub-for-santa.html", ctaLabel: "Learn how to help" },
  ],
};

const getInvolved = {
  hero: { eyebrow: "Get Involved", title: "Three simple ways to be the bridge.", body: "Every contribution — financial, in-kind, or your time — directly supports our neighbors across Morgan and Weber Counties." },
  waysHeading: { eyebrow: "Ways to give", title: "Donate, give in-kind, or volunteer" },
  ways: [
    { title: "Monetary donations", body: "One-time or recurring gifts of any size fund Foundation programs year-round. 100% of your gift stays local.", ctaLabel: "Donate now", href: "donate.html" },
    { title: "In-kind donations", body: "Donate goods, supplies, or services — including gifts and essentials for Sub for Santa families and items for the Golf Tournament.", ctaLabel: "Contact us", href: "contact.html" },
    { title: "Volunteer with us", body: "Lend your time and talents at Foundation events and programs. Send us a quick note and we'll match you with an opportunity that fits.", ctaLabel: "Inquire to volunteer", href: "contact.html#volunteer" },
  ],
};

const donate = {
  hero: { eyebrow: "Donate", title: "Your gift becomes someone's turning point.", body: "Every dollar you give stays in Morgan and Weber Counties — funding therapy, recovery, dignity, and connection for your neighbors." },
  giveNowHeading: { eyebrow: "Give now", title: "Choose your gift" },
  tiers: [
    { value: "$50", description: "covers a therapy session" },
    { value: "$150", description: "funds a week of caregiver respite" },
    { value: "$500", description: "sponsors a recovery coach for a month" },
  ],
  giveLabelPrefix: "Give",
  customAmountLabel: "Choose a custom amount",
  processedNote: "Donations are processed securely through our giving partner.",
  designatedHeading: { eyebrow: "Designated giving", title: "Direct your gift to a cause" },
  otherWaysHeading: { eyebrow: "Other ways to give", title: "More than one way to make a difference" },
  otherWays: [
    { title: "Become a monthly donor", body: "Sustaining gifts let us plan further and serve more." },
    { title: "Honor or memorial gifts", body: "Celebrate or remember someone you love." },
    { title: "Stock & planned giving", body: "Tax-smart strategies for greater impact." },
    { title: "Mail a check", body: "Made out to Weber Human Services Foundation." },
  ],
  taxNote: "The Weber Human Services Foundation is a registered 501(c)(3) nonprofit. All donations are tax-deductible to the fullest extent allowed by law.",
};

const news = {
  hero: { eyebrow: "News", title: "What's happening at the Foundation." },
  posts: [
    { category: "Campaign", date: "Apr 28, 2026", title: "Spring Campaign exceeds $250K goal", excerpt: "Thanks to 1,800 donors across our two counties, we surpassed our spring fundraising goal in record time." },
    { category: "Story", date: "Apr 12, 2026", title: "How peer recovery coaches change lives", excerpt: "An inside look at the recovery model the Foundation funds — and why peer support works." },
    { category: "Announcement", date: "Mar 30, 2026", title: "New scholarship for caregiving education", excerpt: "We're proud to launch a new scholarship for WHS staff pursuing certifications in caregiving and clinical support." },
    { category: "Event", date: "Mar 15, 2026", title: "Save the date: Hope Gala 2026", excerpt: "Our signature evening returns September 14. Tables and sponsorships open soon." },
    { category: "Story", date: "Feb 22, 2026", title: "Aging in place, with dignity", excerpt: "How respite care funded by the Foundation helps families keep their loved ones at home." },
    { category: "Update", date: "Feb 4, 2026", title: "2025 Annual Report is here", excerpt: "Read the full breakdown of programs, outcomes, and stewardship from last year." },
  ],
  readMoreLabel: "Read more",
  newsletter: { eyebrow: "Newsletter", title: "Stay close to the work.", description: "Quarterly stories, campaign updates, and event invitations — straight to your inbox.", placeholder: "you@example.com", submitLabel: "Subscribe" },
};

const financials = {
  hero: { eyebrow: "Financial Transparency", title: "Every dollar accounted for. Every report public.", body: "The Weber Human Services Foundation is a 501(c)(3) nonprofit. We publish our annual reports and IRS Form 990s so donors can see exactly how their generosity is put to work." },
  allocationHeading: { eyebrow: "How funds are used", title: "Where your gift goes" },
  allocation: [
    { label: "Direct client programs", value: 82 },
    { label: "Fundraising", value: 11 },
    { label: "Administration", value: 7 },
  ],
  documentsHeading: { eyebrow: "Documents", title: "Annual reports & 990s" },
  documents: [
    { year: "2024", type: "Annual Report", note: "PDF · Coming soon" },
    { year: "2024", type: "IRS Form 990", note: "PDF · Coming soon" },
    { year: "2023", type: "Annual Report", note: "PDF · Coming soon" },
    { year: "2023", type: "IRS Form 990", note: "PDF · Coming soon" },
    { year: "2022", type: "Annual Report", note: "PDF · Coming soon" },
    { year: "2022", type: "IRS Form 990", note: "PDF · Coming soon" },
  ],
  downloadLabel: "Download",
  questionsCta: { badge: "501(c)(3) Public Charity", title: "Have a question about our finances?", body: "We welcome donor questions. Contact our treasurer for additional financial detail or to request a specific year's filing.", buttonLabel: "Contact us" },
};

const faq = {
  hero: { eyebrow: "Frequently Asked Questions", title: "Answers to the questions we hear most.", body: "Don't see your question? We'd love to hear from you — reach out anytime." },
  sections: [
    { heading: "About the Foundation", items: [
      { question: "What is the Weber Human Services Foundation?", answer: "We are a 501(c)(3) nonprofit comprised of local volunteers who raise charitable contributions in support of the clients and programs at Weber Human Services in Morgan and Weber Counties." },
      { question: "Are you the same as Weber Human Services?", answer: "No. Weber Human Services is the public agency that delivers programs. The Foundation is an independent nonprofit that raises private donations to fill gaps that public funding cannot cover." },
      { question: "What areas do you serve?", answer: "We serve neighbors in Morgan and Weber Counties, Utah." },
    ]},
    { heading: "Donations & giving", items: [
      { question: "Is my donation tax deductible?", answer: "Yes. We are a registered 501(c)(3) public charity, and donations are tax deductible to the extent allowed by law. You'll receive a receipt for your records." },
      { question: "How is my donation used?", answer: "Roughly 82% of every dollar goes directly to client programs across our five focus areas. The remainder supports fundraising and administration. See our Financials page for full details." },
      { question: "Can I designate my gift to a specific program?", answer: "Yes. You can direct your gift to Employee Care, Aging Services, Mental Health, Prevention, or Substance Use — or let the board allocate it where need is greatest." },
      { question: "Do you accept stock, IRA distributions, or planned gifts?", answer: "Yes. Please contact us to coordinate stock transfers, qualified charitable distributions from an IRA, or to discuss leaving a legacy gift." },
    ]},
    { heading: "Programs & impact", items: [
      { question: "What are the five cause areas?", answer: "Employee Care Fund, Aging Services, Mental Health, Prevention, and Substance Use. Each is detailed on our Causes page with specific programs and outcomes." },
      { question: "How do I or someone I know access services?", answer: "Programs are delivered by Weber Human Services. Visit weberhs.net or call them directly. In a crisis, dial or text 988 for the Suicide & Crisis Lifeline." },
    ]},
    { heading: "Volunteering & partnership", items: [
      { question: "How can I volunteer?", answer: "Visit our Get Involved page to share your interests. We welcome event volunteers, committee members, and skills-based volunteers." },
      { question: "How can my business partner with the Foundation?", answer: "We partner with local businesses through sponsorships, workplace giving, and in-kind support. Reach out via the Contact page to start a conversation." },
    ]},
  ],
  closingCta: { title: "Still have questions?", body: "We'd love to hear from you.", buttonLabel: "Contact us" },
};

const contact = {
  hero: { eyebrow: "Contact", title: "Let's talk.", body: "Whether you'd like to give, partner, volunteer, or just learn more — we'd love to hear from you.", teamMember: { photo: "assets/contact-team-member.jpg", name: "Madeline McDonald", title: "Foundation Director", email: "madelinemc@weberhs.org", phone: "(801) 778-6834", phoneHref: "+18017786834" } },
  cards: { emailLabel: "Email", phoneLabel: "Phone", serviceAreaLabel: "Service area" },
  crisis: { title: "In crisis? Get help now.", body: "If you or someone you love is in crisis, you don't have to wait." },
  form: { title: "Send us a message", nameLabel: "Full name", emailLabel: "Email", subjectLabel: "Subject", messageLabel: "Your message", submitLabel: "Send message" },
};

const legal = {
  privacy: {
    title: "Privacy Policy", lastUpdated: "Last updated: May 2026",
    intro: 'The Weber Human Services Foundation ("we," "our," or "the Foundation") respects your privacy. This policy explains what information we collect on this website, how we use it, and the choices you have.',
    sections: [
      { heading: "Information we collect", blocks: [{ type: "p", text: "We collect the following kinds of information:" }, { type: "ul", items: ["Information you provide directly — such as your name, email, phone number, or message — when you complete a form, sign up for our newsletter, or contact us.", "Donation information processed by our third-party payment provider. We do not store credit card or bank account details on our servers.", "Basic usage data — such as pages visited and approximate location — collected through standard web analytics."] }] },
      { heading: "How we use your information", blocks: [{ type: "ul", items: ["To respond to your inquiries and process donations.", "To send newsletters, event invitations, and impact updates if you've opted in.", "To improve our website and understand how visitors use it.", "To meet legal, accounting, and tax-reporting obligations."] }] },
      { heading: "Sharing", blocks: [{ type: "p", text: "We do not sell or rent your personal information. We share information only with trusted service providers (such as our email platform and payment processor) who help us operate, and only as required by law." }] },
      { heading: "Your choices", blocks: [{ type: "p", text: "You may unsubscribe from our newsletter at any time using the link in any email, or contact us to update or delete your information." }] },
      { heading: "Cookies", blocks: [{ type: "p", text: "We use a small number of cookies for site functionality and analytics. You can disable cookies in your browser settings." }] },
      { heading: "Children", blocks: [{ type: "p", text: "This website is not directed to children under 13, and we do not knowingly collect personal information from children." }] },
      { heading: "Contact", blocks: [{ type: "p", text: 'Questions about this policy? Please reach out via our Contact page. We may update this policy from time to time; the "Last updated" date above will reflect any revisions.' }] },
    ],
  },
  terms: {
    title: "Terms of Use", lastUpdated: "Last updated: May 2026",
    intro: 'By accessing or using the Weber Human Services Foundation website (the "Site"), you agree to these Terms of Use. If you do not agree, please do not use the Site.',
    sections: [
      { heading: "Use of the Site", blocks: [{ type: "p", text: "You may use the Site for lawful, personal, and informational purposes. You may not use the Site to transmit harmful content, attempt to gain unauthorized access, or interfere with its operation." }] },
      { heading: "Donations", blocks: [{ type: "p", text: "Donations are processed through a third-party payment provider on a separate page. Donations are non-refundable except where required by law. Tax receipts are issued in accordance with IRS guidelines for U.S. 501(c)(3) public charities." }] },
      { heading: "Not professional advice", blocks: [{ type: "p", text: "Information on this Site is provided for general awareness only and is not medical, mental-health, legal, or financial advice. If you or someone you know is in crisis, dial or text 988 for the Suicide & Crisis Lifeline." }] },
      { heading: "Intellectual property", blocks: [{ type: "p", text: "The content, logo, and design of this Site are the property of the Weber Human Services Foundation or its licensors and are protected by applicable intellectual-property laws." }] },
      { heading: "Third-party links", blocks: [{ type: "p", text: "The Site may link to third-party websites. We are not responsible for the content or practices of those sites." }] },
      { heading: "Disclaimer of warranties", blocks: [{ type: "p", text: 'The Site is provided "as is" without warranties of any kind, express or implied. We do not warrant that the Site will be uninterrupted or error free.' }] },
      { heading: "Limitation of liability", blocks: [{ type: "p", text: "To the fullest extent permitted by law, the Foundation, its directors, and volunteers shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Site." }] },
      { heading: "Changes", blocks: [{ type: "p", text: "We may update these Terms from time to time. Continued use of the Site after changes are posted constitutes acceptance of the revised Terms." }] },
      { heading: "Contact", blocks: [{ type: "p", text: "Questions about these Terms? Please reach out via our Contact page." }] },
    ],
  },
};

const causesPage = {
  hero: { eyebrow: "Five focus areas", title: "Where your generosity becomes outcomes.", body: "Each cause we fund is tied to specific programs at Weber Human Services and to real, measurable change in people's lives." },
  detail: { backLabel: "← All causes", programsHeading: "Programs we fund", outcomesHeading: "Outcomes", fundCard: { title: "Fund this cause", body: "Your gift goes directly to the programs above.", buttonLabel: "Donate" }, relatedHeading: "Other causes we support" },
  learnMoreLabel: "Learn more",
};

// ---- partials ---------------------------------------------------------------
const MOUNTAIN_SVG = `<svg viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" class="mountain"><path d="M0,80 L0,55 L180,20 L320,50 L470,8 L620,42 L780,18 L940,46 L1110,12 L1280,38 L1440,18 L1440,80 Z" fill="currentColor"/></svg>`;

const utilityBar = `
<div class="utility-bar">
  <div class="utility-bar__inner">
    <a class="utility-bar__crisis" href="${site.utilityBar.crisisHref}">
      <span class="icon"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.13 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg></span>
      <span class="hide-sm">${site.utilityBar.crisisLabel}:</span>
      <span class="show-sm">Crisis:</span>
      <span class="utility-bar__num">${site.utilityBar.crisisNumber}</span>
    </a>
    <div class="utility-bar__lang">EN / ES</div>
  </div>
</div>`;

const renderHeader = (active?: string) => `
<header class="site-header">
  ${utilityBar}
  <div class="site-header__inner">
    <a class="site-header__logo" href="home.html">
      <img src="assets/logo.png" alt="${esc(site.brandName + " " + site.brandSuffix)}" width="240" height="144" />
    </a>
    <nav class="site-nav" aria-label="Primary">
      <a href="home.html" class="${active === "home.html" ? "is-active" : ""}">Home</a>
      <a href="about.html" class="${active === "about.html" ? "is-active" : ""}">About</a>
      <a href="causes.html" class="${active === "causes.html" ? "is-active" : ""}">Causes ▾</a>
      <a href="impact.html" class="${active === "impact.html" ? "is-active" : ""}">Impact</a>
      <a href="events.html" class="${active === "events.html" ? "is-active" : ""}">Events ▾</a>
      <a href="get-involved.html" class="${active === "get-involved.html" ? "is-active" : ""}">Get Involved</a>
      <a href="news.html" class="${active === "news.html" ? "is-active" : ""}">News</a>
      <a href="contact.html" class="${active === "contact.html" ? "is-active" : ""}">Contact</a>
      <a href="donate.html" class="btn btn--ember btn--sm"><span class="heart">♥</span> Donate</a>
    </nav>
  </div>
</header>`;

const renderFooter = () => `
<footer class="site-footer">
  <div class="site-footer__divider">${MOUNTAIN_SVG}</div>
  <div class="site-footer__inner">
    <div class="site-footer__brand">
      <div class="site-footer__name">${site.brandName} <em>${site.brandSuffix}</em></div>
      <p>${esc(site.tagline)}</p>
      <a href="donate.html" class="btn btn--ember">${site.footer.donateButton}</a>
    </div>
    <div>
      <h4>${site.footer.causesHeading}</h4>
      <ul>${CAUSES.map((c) => `<li><a href="${c.file}">${esc(c.title)}</a></li>`).join("")}</ul>
    </div>
    <div>
      <h4>${site.footer.foundationHeading}</h4>
      <ul>
        ${site.footer.foundationLinks.map((l) => `<li><a href="${l.file}">${esc(l.label)}</a></li>`).join("")}
        <li><a href="${site.parentOrg.url}" target="_blank" rel="noopener">${esc(site.parentOrg.name)} ↗</a></li>
      </ul>
    </div>
    <div>
      <h4>${site.footer.aboutHeading}</h4>
      <ul>${site.footer.aboutLinks.map((l) => `<li><a href="${l.file}">${esc(l.label)}</a></li>`).join("")}</ul>
    </div>
  </div>
  <div class="site-footer__legal">
    <div class="site-footer__legal-inner">
      <p>© ${new Date().getFullYear()} ${site.brandName} ${site.brandSuffix}. ${site.footer.copyrightSuffix}</p>
      <div class="site-footer__legal-links">
        ${site.footer.legalLinks.map((l) => `<a href="${l.file}">${esc(l.label)}</a>`).join("")}
        <span>${site.footer.serviceAreaLine}</span>
      </div>
    </div>
  </div>
</footer>`;

// ---- page shell -------------------------------------------------------------
const pageShell = (opts: {
  file: string; title: string; description: string; ogUrl: string; canonical: string; body: string;
}) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(opts.title)}</title>
  <meta name="description" content="${esc(opts.description)}" />
  <meta property="og:title" content="${esc(opts.title)}" />
  <meta property="og:description" content="${esc(opts.description)}" />
  <meta property="og:url" content="${opts.ogUrl}" />
  <meta property="og:type" content="website" />
  <link rel="canonical" href="${opts.canonical}" />
  <link rel="stylesheet" href="../css/styles.css" />
</head>
<body>
${renderHeader(opts.file)}
<main>
${opts.body}
</main>
${renderFooter()}
</body>
</html>
`;

// ---- page bodies ------------------------------------------------------------
const heroSection = `
<section class="hero">
  <img class="hero__bg" src="${heroSlide.image}" alt="" />
  <div class="hero__overlay"></div>
  <div class="container hero__content">
    <div class="eyebrow eyebrow--sky">${esc(heroSlide.eyebrow)}</div>
    <h1 class="hero__title">
      ${esc(heroSlide.titleStart)} <span class="text-ember">${esc(heroSlide.titleHighlight)}</span> ${esc(heroSlide.titleEnd)}
    </h1>
    <p class="hero__body">${esc(heroSlide.body)}</p>
    <div class="hero__buttons">
      <a href="donate.html" class="btn btn--ember"><span class="heart">♥</span> ${heroSlide.primary}</a>
      <a href="causes.html" class="btn btn--ghost">${heroSlide.secondary} →</a>
    </div>
  </div>
  <div class="hero__divider">${MOUNTAIN_SVG}</div>
</section>`;

const homeBody = `
${heroSection}

<section class="section container">
  <div class="section-header">
    <div class="eyebrow eyebrow--ember">${esc(home.intro.eyebrow)}</div>
    <h2>${esc(home.intro.title)}</h2>
    <p class="lede">${esc(home.intro.description)}</p>
  </div>
  <div class="grid grid--3 mt-14">
    ${home.intro.cards.map((c) => `
      <article class="card card--lift">
        <div class="card__icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9.3-9A5.7 5.7 0 0 1 12 6a5.7 5.7 0 0 1 9.3 6c-2.3 4.5-9.3 9-9.3 9Z"/></svg></div>
        <div class="eyebrow eyebrow--ember">${esc(c.eyebrow)}</div>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.body)}</p>
      </article>`).join("")}
  </div>
</section>

<section class="band band--cream">
  <div class="container">
    <div class="section-header section-header--inline">
      <div>
        <div class="eyebrow eyebrow--ember">${esc(home.causes.eyebrow)}</div>
        <h2>${esc(home.causes.title)}</h2>
        <p class="lede">${esc(home.causes.description)}</p>
      </div>
      <a href="causes.html" class="link-strong">${home.causes.viewAllLabel} →</a>
    </div>
    <div class="grid grid--3 mt-12">
      ${CAUSES.map((c, i) => `
        <a href="${c.file}" class="cause-card ${i === 0 ? "cause-card--wide" : ""}">
          <div class="cause-card__media"><img src="${c.image}" alt="" loading="lazy"/></div>
          <div class="cause-card__body">
            <h3>${esc(c.title)}</h3>
            <p class="muted">${esc(c.tagline)}</p>
            <span class="link-strong">Learn more →</span>
          </div>
        </a>`).join("")}
    </div>
  </div>
</section>

<section class="section container">
  <div class="story">
    <div>
      <div class="eyebrow eyebrow--sky">${esc(home.story.eyebrow)}</div>
      <blockquote>"${esc(home.story.quote)}"</blockquote>
      <p class="story__cite">${esc(home.story.attribution)}</p>
      <a href="impact.html" class="btn btn--ghost-light">${home.story.ctaLabel} →</a>
    </div>
    <div class="stat-grid">
      ${home.story.stats.map((s) => `<div class="stat"><div class="stat__value">${esc(s.value)}</div><div class="stat__label">${esc(s.label)}</div></div>`).join("")}
    </div>
  </div>
</section>

<section class="parent-band">
  <img class="parent-band__bg" src="assets/mountains.jpg" alt="" />
  <div class="container parent-band__inner">
    <div>
      <h2>${esc(home.parentOrg.title)}</h2>
      <p>${esc(home.parentOrg.body)}</p>
    </div>
    <div class="parent-band__cta">
      <a href="${site.parentOrg.url}" target="_blank" rel="noopener" class="btn btn--sky">${home.parentOrg.ctaLabel} →</a>
    </div>
  </div>
</section>

<section class="section container center">
  <h2 class="display">${esc(home.cta.title)}</h2>
  <p class="lede">${esc(home.cta.body)}</p>
  <div class="cta-row">
    <a href="donate.html" class="btn btn--ember btn--lg"><span class="heart">♥</span> ${home.cta.primaryLabel}</a>
    <a href="get-involved.html" class="btn btn--outline btn--lg">${home.cta.secondaryLabel}</a>
  </div>
</section>
`;

const heroBlock = (eyebrow: string, title: string, body?: string) => `
<section class="page-hero">
  <div class="container">
    <div class="eyebrow eyebrow--sky">${esc(eyebrow)}</div>
    <h1>${esc(title)}</h1>
    ${body ? `<p class="page-hero__body">${esc(body)}</p>` : ""}
  </div>
</section>`;

const aboutBody = `
${heroBlock(about.hero.eyebrow, about.hero.title, about.hero.body)}
<section class="section container">
  <div class="grid grid--3">
    ${about.whoWhatWhy.map((c) => `
      <div class="card">
        <div class="eyebrow eyebrow--ember">${esc(c.eyebrow)}</div>
        <h3 class="card__title">${esc(c.title)}</h3>
        <p>${esc(c.body)}</p>
      </div>`).join("")}
  </div>
</section>
<section class="band band--cream">
  <div class="container">
    <div class="section-header"><div class="eyebrow eyebrow--ember">${esc(about.values.eyebrow)}</div><h2>${esc(about.values.title)}</h2></div>
    <div class="grid grid--4 mt-12">
      ${about.values.items.map((v) => `<div class="card card--sm"><div class="card__title-serif">${esc(v.title)}</div><p class="muted">${esc(v.body)}</p></div>`).join("")}
    </div>
  </div>
</section>
<section class="section container">
  <div class="section-header"><div class="eyebrow eyebrow--ember">${esc(about.boardPreview.eyebrow)}</div><h2>${esc(about.boardPreview.title)}</h2></div>
  <div class="grid grid--3 mt-12">
    ${about.boardPreview.members.map((b) => `<div class="card"><div class="avatar-block"></div><div class="card__title-serif">${esc(b.name)}</div><div class="text-ember">${esc(b.role)}</div></div>`).join("")}
  </div>
</section>
<section class="section container">
  <div class="callout">
    <div>
      <h2>${esc(about.transparency.title)}</h2>
      <p>${esc(about.transparency.body)}</p>
    </div>
    <div class="callout__buttons">
      <a class="btn btn--sky" href="impact.html">${about.transparency.primaryLabel} →</a>
      <a class="btn btn--ember" href="donate.html"><span class="heart">♥</span> ${about.transparency.secondaryLabel}</a>
    </div>
  </div>
</section>
`;

const boardBody = `
${heroBlock(board.hero.eyebrow, board.hero.title, board.hero.body)}
<section class="section container">
  <div class="section-header"><div class="eyebrow eyebrow--ember">${esc(board.directorsHeading.eyebrow)}</div><h2>${esc(board.directorsHeading.title)}</h2></div>
  <div class="grid grid--3 mt-12">
    ${board.directors.map((d) => `
      <article class="card">
        <div class="avatar-block"></div>
        <div class="card__title-serif">${esc(d.name)}</div>
        <div class="text-ember bold">${esc(d.role)}</div>
        <div class="uppercase muted tiny">${esc(d.affiliation)}</div>
        <p class="muted small">${esc(d.bio)}</p>
      </article>`).join("")}
  </div>
</section>
<section class="band band--cream">
  <div class="container grid grid--2-align">
    <div>
      <div class="eyebrow eyebrow--ember">${esc(board.joinCta.eyebrow)}</div>
      <h2>${esc(board.joinCta.title)}</h2>
      <p class="muted">${esc(board.joinCta.body)}</p>
    </div>
    <div class="callout__buttons"><a class="btn btn--primary" href="contact.html">✉ ${board.joinCta.buttonLabel}</a></div>
  </div>
</section>`;

const impactBody = `
${heroBlock(impact.hero.eyebrow, impact.hero.title)}
<section class="section container">
  <div class="grid grid--4">
    ${impact.numbers.map((n) => `<div class="card"><div class="stat__value">${esc(n.value)}</div><div class="muted small mt-1">${esc(n.label)}</div></div>`).join("")}
  </div>
</section>
<section class="section container">
  <div class="section-header"><div class="eyebrow eyebrow--ember">${esc(impact.storiesHeading.eyebrow)}</div><h2>${esc(impact.storiesHeading.title)}</h2></div>
  <div class="grid grid--3 mt-12">
    ${impact.stories.map((s) => `
      <article class="card story-card">
        <div class="quote-mark">“</div>
        <p class="story-card__quote">"${esc(s.quote)}"</p>
        <div class="story-card__meta"><strong>${esc(s.name)}</strong><span class="text-ember">${esc(s.cause)}</span></div>
      </article>`).join("")}
  </div>
  <p class="muted small mt-6 center">${esc(impact.storiesDisclaimer)}</p>
</section>
<section class="section container">
  <div class="callout">
    <div>
      <h2>${esc(impact.annualReport.title)}</h2>
      <p>${esc(impact.annualReport.body)}</p>
    </div>
    <div class="callout__buttons">
      <a class="btn btn--sky" href="${impact.annualReport.downloadUrl}">⬇ ${impact.annualReport.downloadLabel}</a>
      <a class="btn btn--ember" href="donate.html"><span class="heart">♥</span> ${impact.annualReport.donateLabel}</a>
    </div>
  </div>
</section>`;

const causesIndexBody = `
${heroBlock(causesPage.hero.eyebrow, causesPage.hero.title, causesPage.hero.body)}
<section class="section container">
  <div class="grid grid--2">
    ${CAUSES.map((c) => `
      <a href="${c.file}" class="cause-card cause-card--lg">
        <div class="cause-card__media"><img src="${c.image}" alt="" loading="lazy" /></div>
        <div class="cause-card__body">
          <h2>${esc(c.title)}</h2>
          <p class="text-ember">${esc(c.tagline)}</p>
          <p class="muted">${esc(c.description)}</p>
          <span class="link-strong">${causesPage.learnMoreLabel} →</span>
        </div>
      </a>`).join("")}
  </div>
</section>`;

const causeDetailBody = (c: typeof CAUSES[number]) => {
  const others = CAUSES.filter((x) => x.slug !== c.slug).slice(0, 3);
  return `
<section class="page-hero page-hero--image">
  <img class="page-hero__bg" src="${c.image}" alt="" />
  <div class="container">
    <a href="causes.html" class="back-link">${causesPage.detail.backLabel}</a>
    <h1>${esc(c.title)}</h1>
    <p class="page-hero__body">${esc(c.tagline)}</p>
  </div>
</section>
<section class="section container">
  <div class="cause-detail">
    <div>
      <p class="lede">${esc(c.description)}</p>
      <h2 class="mt-12">${causesPage.detail.programsHeading}</h2>
      <ul class="program-list">
        ${c.programs.map((p) => `<li><span class="check">✓</span>${esc(p)}</li>`).join("")}
      </ul>
    </div>
    <aside class="stack">
      <div class="card">
        <h3>${causesPage.detail.outcomesHeading}</h3>
        <dl class="outcomes">
          ${c.outcomes.map((o) => `<div><dt>${esc(o.label)}</dt><dd>${esc(o.value)}</dd></div>`).join("")}
        </dl>
      </div>
      <div class="card card--primary">
        <h3>${causesPage.detail.fundCard.title}</h3>
        <p>${esc(causesPage.detail.fundCard.body)}</p>
        <a class="btn btn--ember btn--block" href="donate.html"><span class="heart">♥</span> ${causesPage.detail.fundCard.buttonLabel}</a>
      </div>
    </aside>
  </div>
</section>
<section class="band band--cream">
  <div class="container">
    <h2>${causesPage.detail.relatedHeading}</h2>
    <div class="grid grid--3 mt-8">
      ${others.map((o) => `
        <a href="${o.file}" class="cause-card">
          <div class="cause-card__media"><img src="${o.image}" alt="" loading="lazy"/></div>
          <div class="cause-card__body"><h3>${esc(o.title)}</h3><p class="muted">${esc(o.tagline)}</p></div>
        </a>`).join("")}
    </div>
  </div>
</section>`;
};

const eventsIndexBody = `
${heroBlock(events.hero.eyebrow, events.hero.title, events.hero.body)}
<section class="section container">
  <div class="section-header"><div class="eyebrow eyebrow--ember">${esc(events.upcomingHeading.eyebrow)}</div><h2>${esc(events.upcomingHeading.title)}</h2></div>
  <div class="grid grid--2 mt-12">
    ${events.upcoming.map((e) => `
      <a href="${e.file}" class="card card--lift">
        <span class="pill">📅 ${esc(e.date)}</span>
        <h3 class="mt-5">${esc(e.name)}</h3>
        <div class="muted small">📍 ${esc(e.location)}</div>
        <p>${esc(e.description)}</p>
        <span class="btn btn--primary btn--sm mt-6">${e.ctaLabel} →</span>
      </a>`).join("")}
  </div>
</section>`;

const golfBody = `
<section class="page-hero">
  <div class="container">
    <a href="events.html" class="back-link">← All events</a>
    <div class="eyebrow eyebrow--sky">Signature Event</div>
    <h1>Foundation Golf Tournament</h1>
    <p class="page-hero__body">A day on the green that fuels year-round services for our neighbors in Morgan and Weber Counties.</p>
  </div>
</section>
<section class="section container">
  <div class="grid grid--2">
    <div class="card"><div class="icon-lg">📅</div><div class="card__title-serif mt-3">Date TBA</div><p class="muted">Watch this page for the next tournament date and registration details.</p></div>
    <div class="card"><div class="icon-lg">📍</div><div class="card__title-serif mt-3">Location TBA</div><p class="muted">A premier Northern Utah course — details coming soon.</p></div>
  </div>
  <div class="panel-cream mt-12">
    <h2>Sponsorship & registration</h2>
    <p>Foursomes, hole sponsorships, and corporate packages will be announced ahead of the event. Reach out to the Foundation team to be added to the early-notice list.</p>
    <a class="btn btn--primary mt-6" href="contact.html">Contact the Foundation</a>
  </div>
</section>`;

const santaBody = `
<section class="page-hero">
  <div class="container">
    <a href="events.html" class="back-link">← All events</a>
    <div class="eyebrow eyebrow--sky">Holiday Program</div>
    <h1>Sub for Santa</h1>
    <p class="page-hero__body">Helping local families experience the joy and dignity of the holidays — one sponsored child at a time.</p>
  </div>
</section>
<section class="section container">
  <div class="grid grid--2">
    <div class="card"><div class="icon-lg">🎁</div><div class="card__title-serif mt-3">Sponsor a family</div><p class="muted">Provide gifts, warm clothing, and essentials for a child or family identified through Weber Human Services case workers.</p></div>
    <div class="card"><div class="icon-lg">📅</div><div class="card__title-serif mt-3">Holiday season</div><p class="muted">Sign-ups open each fall. Drop-offs and deliveries happen in early December.</p></div>
  </div>
  <div class="panel-cream mt-12">
    <h2>Get involved</h2>
    <p>Individuals, families, and businesses are all welcome to participate. Contact the Foundation to receive a family profile or to make a monetary contribution toward the program.</p>
    <div class="cta-row mt-6">
      <a class="btn btn--primary" href="contact.html">Contact us</a>
      <a class="btn btn--ember" href="donate.html">Donate</a>
    </div>
  </div>
</section>`;

const getInvolvedBody = `
${heroBlock(getInvolved.hero.eyebrow, getInvolved.hero.title, getInvolved.hero.body)}
<section class="section container">
  <div class="section-header"><div class="eyebrow eyebrow--ember">${esc(getInvolved.waysHeading.eyebrow)}</div><h2>${esc(getInvolved.waysHeading.title)}</h2></div>
  <div class="grid grid--3 mt-12">
    ${getInvolved.ways.map((w) => `
      <div class="card">
        <div class="card__icon card__icon--primary">♥</div>
        <h3 class="mt-5">${esc(w.title)}</h3>
        <p>${esc(w.body)}</p>
        <a class="btn btn--ember mt-6" href="${w.href}">${esc(w.ctaLabel)}</a>
      </div>`).join("")}
  </div>
</section>`;

const newsBody = `
${heroBlock(news.hero.eyebrow, news.hero.title)}
<section class="section container">
  <div class="grid grid--3">
    ${news.posts.map((p) => `
      <article class="card card--lift">
        <div class="news-thumb"></div>
        <div class="news-meta"><span class="text-ember">${esc(p.category)}</span><span class="muted">${esc(p.date)}</span></div>
        <h3 class="card__title-serif">${esc(p.title)}</h3>
        <p class="muted small">${esc(p.excerpt)}</p>
        <a href="#" class="link-strong mt-4">${news.readMoreLabel} →</a>
      </article>`).join("")}
  </div>
</section>
<section class="section container">
  <div class="callout">
    <div>
      <div class="eyebrow eyebrow--sky">${esc(news.newsletter.eyebrow)}</div>
      <h2>${esc(news.newsletter.title)}</h2>
      <p>${esc(news.newsletter.description)}</p>
    </div>
    <form class="newsletter">
      <input type="email" placeholder="${esc(news.newsletter.placeholder)}" required />
      <button class="btn btn--ember" type="submit">${news.newsletter.submitLabel}</button>
    </form>
  </div>
</section>`;

const donateBody = `
${heroBlock(donate.hero.eyebrow, donate.hero.title, donate.hero.body)}
<section class="section container">
  <div class="section-header center"><div class="eyebrow eyebrow--ember">${esc(donate.giveNowHeading.eyebrow)}</div><h2>${esc(donate.giveNowHeading.title)}</h2></div>
  <div class="grid grid--3 mt-12 narrow">
    ${donate.tiers.map((t) => `
      <a class="card center card--lift" href="${site.donateUrl}">
        <div class="stat__value">${esc(t.value)}</div>
        <div class="muted small mt-2">${esc(t.description)}</div>
        <span class="btn btn--ember btn--sm mt-5"><span class="heart">♥</span> ${donate.giveLabelPrefix} ${esc(t.value)}</span>
      </a>`).join("")}
  </div>
  <div class="center mt-8">
    <a class="btn btn--primary btn--lg" href="${site.donateUrl}"><span class="heart">♥</span> ${donate.customAmountLabel}</a>
    <p class="muted tiny mt-3">${esc(donate.processedNote)}</p>
  </div>
</section>
<section class="band band--cream">
  <div class="container">
    <div class="section-header"><div class="eyebrow eyebrow--ember">${esc(donate.designatedHeading.eyebrow)}</div><h2>${esc(donate.designatedHeading.title)}</h2></div>
    <div class="grid grid--5 mt-10">
      ${CAUSES.map((c) => `<a href="${c.file}" class="card center card--lift card--sm"><div class="card__title-serif">${esc(c.title)}</div></a>`).join("")}
    </div>
  </div>
</section>
<section class="section container">
  <div class="section-header"><div class="eyebrow eyebrow--ember">${esc(donate.otherWaysHeading.eyebrow)}</div><h2>${esc(donate.otherWaysHeading.title)}</h2></div>
  <div class="grid grid--4 mt-10">
    ${donate.otherWays.map((w) => `<div class="card"><div class="card__icon">★</div><div class="card__title-serif mt-4">${esc(w.title)}</div><p class="muted small">${esc(w.body)}</p></div>`).join("")}
  </div>
  <p class="muted small center mt-10">${esc(donate.taxNote)}</p>
</section>`;

const financialsBody = `
${heroBlock(financials.hero.eyebrow, financials.hero.title, financials.hero.body)}
<section class="section container">
  <div class="section-header"><div class="eyebrow eyebrow--ember">${esc(financials.allocationHeading.eyebrow)}</div><h2>${esc(financials.allocationHeading.title)}</h2></div>
  <div class="grid grid--3 mt-12">
    ${financials.allocation.map((a) => `
      <div class="card">
        <div class="stat__value stat__value--xl">${a.value}%</div>
        <div class="eyebrow eyebrow--ember mt-2">${esc(a.label)}</div>
        <div class="bar mt-4"><div class="bar__fill" style="width:${a.value}%"></div></div>
      </div>`).join("")}
  </div>
</section>
<section class="band band--cream">
  <div class="container">
    <div class="section-header"><div class="eyebrow eyebrow--ember">${esc(financials.documentsHeading.eyebrow)}</div><h2>${esc(financials.documentsHeading.title)}</h2></div>
    <ul class="doc-list mt-12">
      ${financials.documents.map((d) => `
        <li>
          <div class="doc-list__left">
            <div class="doc-list__icon">📄</div>
            <div>
              <div class="card__title-serif">${esc(d.year)} ${esc(d.type)}</div>
              <div class="muted tiny">${esc(d.note)}</div>
            </div>
          </div>
          <a class="btn btn--outline btn--sm" href="#">⬇ ${financials.downloadLabel}</a>
        </li>`).join("")}
    </ul>
  </div>
</section>
<section class="section container">
  <div class="callout">
    <div>
      <span class="pill pill--sky">🛡 ${esc(financials.questionsCta.badge)}</span>
      <h2 class="mt-4">${esc(financials.questionsCta.title)}</h2>
      <p>${esc(financials.questionsCta.body)}</p>
    </div>
    <div class="callout__buttons"><a class="btn btn--sky" href="contact.html">${financials.questionsCta.buttonLabel}</a></div>
  </div>
</section>`;

const faqBody = `
${heroBlock(faq.hero.eyebrow, faq.hero.title, faq.hero.body)}
<section class="section container narrow">
  ${faq.sections.map((s) => `
    <div class="faq-section">
      <h2>${esc(s.heading)}</h2>
      ${s.items.map((it) => `
        <details class="faq-item">
          <summary>${esc(it.question)}</summary>
          <p>${esc(it.answer)}</p>
        </details>`).join("")}
    </div>`).join("")}
  <div class="callout center mt-12">
    <div>
      <h2>${esc(faq.closingCta.title)}</h2>
      <p>${esc(faq.closingCta.body)}</p>
    </div>
    <div class="callout__buttons"><a class="btn btn--ember" href="contact.html">${faq.closingCta.buttonLabel}</a></div>
  </div>
</section>`;

const contactBody = `
<section class="page-hero">
  <div class="container contact-hero">
    <div>
      <div class="eyebrow eyebrow--sky">${esc(contact.hero.eyebrow)}</div>
      <h1>${esc(contact.hero.title)}</h1>
      <p class="page-hero__body">${esc(contact.hero.body)}</p>
    </div>
    <div class="team-card">
      <div class="team-card__top">
        <img src="${contact.hero.teamMember.photo}" alt="${esc(contact.hero.teamMember.name)}" />
        <div>
          <div class="card__title-serif light">${esc(contact.hero.teamMember.name)}</div>
          <div class="muted-light small">${esc(contact.hero.teamMember.title)}</div>
        </div>
      </div>
      <div class="team-card__lines">
        <a href="mailto:${contact.hero.teamMember.email}">✉ ${contact.hero.teamMember.email}</a>
        <a href="tel:${contact.hero.teamMember.phoneHref}">☎ ${contact.hero.teamMember.phone}</a>
      </div>
    </div>
  </div>
</section>
<section class="section container">
  <div class="contact-grid">
    <div class="stack">
      <div class="card"><div class="card__icon">✉</div><div class="eyebrow muted mt-3">${esc(contact.cards.emailLabel)}</div><a class="card__title-serif" href="mailto:${site.contact.email}">${site.contact.email}</a></div>
      <div class="card"><div class="card__icon">☎</div><div class="eyebrow muted mt-3">${esc(contact.cards.phoneLabel)}</div><a class="card__title-serif" href="tel:${site.contact.phoneHref}">${esc(site.contact.phone)}</a></div>
      <div class="card"><div class="card__icon">📍</div><div class="eyebrow muted mt-3">${esc(contact.cards.serviceAreaLabel)}</div><div class="card__title-serif">${esc(site.contact.serviceArea)}</div></div>
      <div class="card card--ember">
        <div class="card__icon">!</div>
        <h3>${esc(contact.crisis.title)}</h3>
        <p>${esc(contact.crisis.body)}</p>
        <ul>
          <li>988 — Suicide & Crisis Lifeline (call or text)</li>
          <li><a href="${site.parentOrg.url}">Weber Human Services 24/7 crisis line ↗</a></li>
        </ul>
      </div>
    </div>
    <form class="contact-form card" id="volunteer">
      <h2>${esc(contact.form.title)}</h2>
      <label>${esc(contact.form.nameLabel)}<input type="text" required /></label>
      <label>${esc(contact.form.emailLabel)}<input type="email" required /></label>
      <label>${esc(contact.form.subjectLabel)}<input type="text" /></label>
      <label>${esc(contact.form.messageLabel)}<textarea rows="6" required></textarea></label>
      <button class="btn btn--primary" type="submit">${contact.form.submitLabel}</button>
    </form>
  </div>
</section>`;

const legalBody = (doc: typeof legal.privacy) => `
<section class="page-hero">
  <div class="container">
    <h1>${esc(doc.title)}</h1>
    <p class="muted-light small">${esc(doc.lastUpdated)}</p>
  </div>
</section>
<section class="section container narrow">
  <article class="legal">
    <p class="lede">${esc(doc.intro)}</p>
    ${doc.sections.map((s) => `
      <h2>${esc(s.heading)}</h2>
      ${s.blocks.map((b: any) => b.type === "p"
        ? `<p>${esc(b.text)}</p>`
        : `<ul>${b.items.map((i: string) => `<li>${esc(i)}</li>`).join("")}</ul>`).join("")}
    `).join("")}
  </article>
</section>`;

// ---- styles.css -------------------------------------------------------------
const CSS = `/* Weber Human Services Foundation — static export
   Brand: navy + sky + ember + cream. Fonts: Fraunces (serif), Figtree (sans). */
@import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;1,400&family=Figtree:wght@300;400;500;600;700&display=swap");

:root {
  --bg: oklch(0.985 0.005 80);
  --fg: oklch(0.22 0.06 265);
  --card: #ffffff;
  --muted: oklch(0.45 0.04 265);
  --muted-soft: oklch(0.95 0.012 80);
  --border: oklch(0.9 0.015 240);
  --primary: oklch(0.27 0.09 265);
  --primary-fg: oklch(0.985 0.005 80);
  --sky: oklch(0.86 0.06 230);
  --sky-strong: oklch(0.7 0.08 230);
  --ember: oklch(0.58 0.18 30);
  --ember-fg: #fff;
  --cream: oklch(0.97 0.018 80);
  --shadow-soft: 0 10px 30px -12px oklch(0.27 0.09 265 / .18);
  --shadow-elev: 0 20px 50px -20px oklch(0.27 0.09 265 / .28);
  --radius: 1rem;
  --radius-lg: 1.5rem;
}

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: "Figtree", system-ui, sans-serif;
  color: var(--fg);
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
  line-height: 1.55;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }

h1, h2, h3, h4 {
  font-family: "Fraunces", Georgia, serif;
  font-weight: 500;
  letter-spacing: -0.02em;
  margin: 0;
  line-height: 1.15;
}
h1 { font-size: clamp(2.25rem, 4vw, 3.75rem); }
h2 { font-size: clamp(1.75rem, 2.6vw, 2.5rem); }
h3 { font-size: 1.5rem; }
p { margin: 0 0 1em; }

.container { max-width: 80rem; margin: 0 auto; padding: 0 1.25rem; }
@media (min-width: 1024px) { .container { padding: 0 2rem; } }

.section { padding: 5rem 0; }
.band { padding: 5rem 0; }
.band--cream { background: var(--cream); }
.center { text-align: center; }
.mt-1 { margin-top: .25rem; } .mt-2 { margin-top: .5rem; } .mt-3 { margin-top: .75rem; }
.mt-4 { margin-top: 1rem; } .mt-5 { margin-top: 1.25rem; } .mt-6 { margin-top: 1.5rem; }
.mt-8 { margin-top: 2rem; } .mt-10 { margin-top: 2.5rem; } .mt-12 { margin-top: 3rem; } .mt-14 { margin-top: 3.5rem; }
.narrow { max-width: 64rem; margin-left: auto; margin-right: auto; }
.muted { color: var(--muted); }
.muted-light { color: rgba(255,255,255,.7); }
.small { font-size: .9rem; }
.tiny { font-size: .78rem; }
.bold { font-weight: 600; }
.uppercase { text-transform: uppercase; letter-spacing: .12em; font-size: .72rem; }
.light { color: var(--primary-fg); }
.lede { font-size: 1.05rem; color: var(--muted); }
.display { font-size: clamp(2rem, 4vw, 3rem); max-width: 48rem; margin-inline: auto; }

.eyebrow {
  font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .2em;
  margin-bottom: .6rem;
}
.eyebrow--ember { color: var(--ember); }
.eyebrow--sky { color: var(--sky); }
.text-ember { color: var(--ember); }
.heart { color: currentColor; }

/* Buttons */
.btn {
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .85rem 1.5rem; font-weight: 600; font-size: .9rem;
  border-radius: 999px; border: 1px solid transparent; cursor: pointer;
  transition: transform .15s ease, background .15s ease, color .15s ease;
}
.btn:hover { transform: translateY(-1px); }
.btn--lg { padding: 1rem 2rem; font-size: 1rem; }
.btn--sm { padding: .55rem 1.15rem; font-size: .85rem; }
.btn--block { display: flex; justify-content: center; width: 100%; }
.btn--ember { background: var(--ember); color: var(--ember-fg); box-shadow: var(--shadow-soft); }
.btn--primary { background: var(--primary); color: var(--primary-fg); }
.btn--sky { background: var(--sky); color: var(--primary); }
.btn--outline { background: var(--card); color: var(--primary); border-color: var(--border); }
.btn--ghost { background: rgba(255,255,255,.12); color: #fff; border-color: rgba(255,255,255,.3); backdrop-filter: blur(4px); }
.btn--ghost-light { background: transparent; color: var(--primary-fg); border-color: rgba(255,255,255,.3); }

.link-strong { color: var(--primary); font-weight: 600; }
.link-strong:hover { color: var(--ember); }
.back-link { color: var(--sky); text-transform: uppercase; letter-spacing: .2em; font-size: .78rem; display: inline-block; margin-bottom: 1rem; }

/* Utility bar */
.utility-bar { background: var(--primary); color: var(--primary-fg); }
.utility-bar__inner { max-width: 80rem; margin: 0 auto; padding: 0 1.25rem; height: 2.25rem; display: flex; align-items: center; justify-content: space-between; font-size: .78rem; }
@media (min-width: 1024px) { .utility-bar__inner { padding: 0 2rem; } }
.utility-bar__crisis { display: inline-flex; align-items: center; gap: .5rem; }
.utility-bar__crisis .icon { color: var(--ember); display: inline-flex; }
.utility-bar__num { background: var(--ember); color: var(--ember-fg); padding: .1rem .55rem; border-radius: 999px; font-weight: 700; }
.utility-bar__lang { font-weight: 600; opacity: .85; }
.hide-sm { display: none; } .show-sm { display: inline; }
@media (min-width: 640px) { .hide-sm { display: inline; } .show-sm { display: none; } }

/* Header */
.site-header { position: sticky; top: 0; z-index: 50; background: rgba(252,251,247,.9); backdrop-filter: blur(8px); border-bottom: 1px solid color-mix(in oklab, var(--border) 60%, transparent); }
.site-header__inner { max-width: 80rem; margin: 0 auto; padding: 0 1.25rem; height: 8rem; display: flex; align-items: center; justify-content: space-between; }
@media (min-width: 1024px) { .site-header__inner { padding: 0 2rem; } }
.site-header__logo img { height: 6rem; width: auto; }
@media (min-width: 768px) { .site-header__logo img { height: 7rem; } }
.site-nav { display: none; align-items: center; gap: .25rem; }
@media (min-width: 1024px) { .site-nav { display: flex; } }
.site-nav a { padding: .5rem .75rem; border-radius: .5rem; font-size: .9rem; font-weight: 500; color: color-mix(in oklab, var(--fg) 85%, transparent); }
.site-nav a:hover, .site-nav a.is-active { color: var(--primary); }
.site-nav .btn { margin-left: .75rem; }

/* Hero (homepage) */
.hero { position: relative; isolation: isolate; overflow: hidden; min-height: 38rem; display: flex; align-items: center; color: #fff; }
.hero__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -2; transform: scale(1.05); animation: kenBurns 12s ease-out forwards; }
@keyframes kenBurns { from { transform: scale(1.05); } to { transform: scale(1.12); } }
.hero__overlay { position: absolute; inset: 0; z-index: -1; background: linear-gradient(135deg, oklch(0.27 0.09 265 / 0.92), oklch(0.35 0.08 250 / 0.55)); }
.hero__content { padding: 6rem 1.25rem 7rem; max-width: 80rem; }
.hero__title { max-width: 50rem; font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: 1.05; }
.hero__body { max-width: 36rem; margin-top: 1.5rem; font-size: 1.1rem; color: rgba(255,255,255,.85); }
.hero__buttons { display: flex; gap: .75rem; flex-wrap: wrap; margin-top: 2rem; }
.hero__divider { position: absolute; left: 0; right: 0; bottom: -1px; height: 4rem; color: var(--bg); }
.mountain { width: 100%; height: 100%; display: block; }

/* Page hero (other pages) */
.page-hero { background: var(--primary); color: var(--primary-fg); padding: 5rem 0 5rem; }
.page-hero h1 { max-width: 56rem; font-size: clamp(2.25rem, 4.5vw, 3.75rem); }
.page-hero__body { max-width: 40rem; margin-top: 1.25rem; font-size: 1.1rem; color: rgba(255,255,255,.8); }
.page-hero--image { position: relative; isolation: isolate; overflow: hidden; }
.page-hero__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; opacity: .3; }

/* Section header */
.section-header { max-width: 48rem; }
.section-header.center { margin-inline: auto; text-align: center; }
.section-header--inline { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 1.5rem; max-width: none; }

/* Grids */
.grid { display: grid; gap: 1.5rem; }
.grid--2 { grid-template-columns: repeat(1, 1fr); }
.grid--3 { grid-template-columns: repeat(1, 1fr); }
.grid--4 { grid-template-columns: repeat(1, 1fr); }
.grid--5 { grid-template-columns: repeat(2, 1fr); }
.grid--2-align { display: grid; grid-template-columns: 1fr; gap: 2.5rem; align-items: center; }
@media (min-width: 640px) { .grid--3 { grid-template-columns: repeat(2, 1fr); } .grid--4 { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 768px) { .grid--2 { grid-template-columns: repeat(2, 1fr); } .grid--2-align { grid-template-columns: 1.4fr 1fr; } }
@media (min-width: 1024px) { .grid--3 { grid-template-columns: repeat(3, 1fr); } .grid--4 { grid-template-columns: repeat(4, 1fr); } .grid--5 { grid-template-columns: repeat(5, 1fr); } }

/* Cards */
.card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 2rem; box-shadow: var(--shadow-soft); display: flex; flex-direction: column; }
.card--sm { padding: 1.25rem; }
.card--lift { transition: transform .2s ease, box-shadow .2s ease; }
.card--lift:hover { transform: translateY(-3px); box-shadow: var(--shadow-elev); }
.card--primary { background: var(--primary); color: var(--primary-fg); border-color: transparent; }
.card--primary h3, .card--primary p { color: var(--primary-fg); }
.card--ember { background: var(--ember); color: var(--ember-fg); border-color: transparent; }
.card--ember a { color: #fff; text-decoration: underline; }
.card__icon { display: inline-flex; height: 3rem; width: 3rem; align-items: center; justify-content: center; border-radius: .75rem; background: var(--sky); color: var(--primary); font-size: 1.2rem; margin-bottom: 1rem; }
.card__icon--primary { background: var(--primary); color: var(--primary-fg); }
.card__title { font-family: "Fraunces", serif; font-size: 1.4rem; margin-top: .5rem; }
.card__title-serif { font-family: "Fraunces", serif; font-size: 1.25rem; font-weight: 500; }

/* Stats */
.stat__value { font-family: "Fraunces", serif; font-size: 2.25rem; color: var(--primary); line-height: 1; }
.stat__value--xl { font-size: 3rem; }
.stat__label { font-size: .75rem; text-transform: uppercase; letter-spacing: .12em; color: var(--muted); margin-top: .25rem; }

/* Story band */
.story { background: var(--primary); color: var(--primary-fg); border-radius: var(--radius-lg); padding: 3rem; display: grid; gap: 2.5rem; grid-template-columns: 1fr; }
@media (min-width: 768px) { .story { grid-template-columns: 1fr 1fr; padding: 4rem; } }
.story blockquote { font-family: "Fraunces", serif; font-size: clamp(1.5rem, 2.5vw, 2.25rem); line-height: 1.25; margin: 0; }
.story__cite { color: rgba(255,255,255,.75); margin-top: 1.25rem; }
.stat-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
.stat-grid .stat { background: rgba(255,255,255,.06); border-radius: 1rem; padding: 1.5rem; }
.stat-grid .stat__value { color: var(--sky); font-size: 2rem; }
.stat-grid .stat__label { color: rgba(255,255,255,.75); }

/* Parent org band */
.parent-band { position: relative; isolation: isolate; overflow: hidden; background: var(--primary); color: var(--primary-fg); padding: 5rem 0; }
.parent-band__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .25; z-index: -1; }
.parent-band__inner { display: grid; gap: 2rem; grid-template-columns: 1fr; align-items: center; }
@media (min-width: 768px) { .parent-band__inner { grid-template-columns: 1.2fr 1fr; } }
.parent-band__cta { display: flex; }
@media (min-width: 768px) { .parent-band__cta { justify-content: flex-end; } }

/* CTA row */
.cta-row { display: flex; gap: .75rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem; }

/* Cause cards */
.cause-card { display: flex; flex-direction: column; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-soft); transition: transform .2s ease, box-shadow .2s ease; }
.cause-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-elev); }
.cause-card__media { aspect-ratio: 4 / 3; overflow: hidden; }
.cause-card__media img { width: 100%; height: 100%; object-fit: cover; transition: transform .7s ease; }
.cause-card:hover .cause-card__media img { transform: scale(1.05); }
.cause-card__body { padding: 1.5rem; }
.cause-card__body h2, .cause-card__body h3 { font-family: "Fraunces", serif; }
.cause-card--lg .cause-card__media { aspect-ratio: 16 / 10; }
.cause-card--lg .cause-card__body { padding: 2rem; }
@media (min-width: 1024px) {
  .cause-card--wide { grid-column: span 2; }
}

/* Cause detail */
.cause-detail { display: grid; gap: 3rem; grid-template-columns: 1fr; }
@media (min-width: 768px) { .cause-detail { grid-template-columns: 1.4fr 1fr; } }
.program-list { list-style: none; padding: 0; margin: 1.25rem 0; display: grid; gap: .75rem; }
.program-list li { background: var(--cream); border-radius: .75rem; padding: 1rem; display: flex; align-items: flex-start; gap: .75rem; }
.program-list .check { color: var(--ember); font-weight: 700; }
.outcomes { display: grid; gap: 1rem; margin: 1rem 0 0; }
.outcomes > div { border-bottom: 1px solid var(--border); padding-bottom: .75rem; }
.outcomes > div:last-child { border: 0; padding-bottom: 0; }
.outcomes dt { font-size: .72rem; text-transform: uppercase; letter-spacing: .12em; color: var(--muted); }
.outcomes dd { margin: 0; font-family: "Fraunces", serif; font-size: 1.75rem; color: var(--primary); }
.stack { display: flex; flex-direction: column; gap: 1.5rem; }

/* Footer */
.site-footer { position: relative; margin-top: 6rem; background: var(--primary); color: var(--primary-fg); }
.site-footer__divider { position: absolute; left: 0; right: 0; top: -1px; height: 3rem; transform: translateY(-100%); color: var(--primary); }
.site-footer__inner { max-width: 80rem; margin: 0 auto; padding: 4rem 1.25rem; display: grid; gap: 3rem; grid-template-columns: 1fr; }
@media (min-width: 768px) { .site-footer__inner { grid-template-columns: 2fr 1fr 1fr 1fr; padding: 4rem 2rem; } }
.site-footer__name { font-family: "Fraunces", serif; font-size: 1.5rem; }
.site-footer__name em { color: var(--sky); font-style: italic; }
.site-footer__brand p { max-width: 28rem; color: rgba(255,255,255,.75); font-size: .9rem; margin-top: .75rem; }
.site-footer__brand .btn { margin-top: 1.5rem; }
.site-footer h4 { font-family: "Figtree", sans-serif; font-size: .8rem; font-weight: 700; text-transform: uppercase; letter-spacing: .14em; color: var(--sky); margin-bottom: 1rem; }
.site-footer ul { list-style: none; padding: 0; margin: 0; display: grid; gap: .5rem; }
.site-footer a { color: rgba(255,255,255,.85); font-size: .9rem; }
.site-footer a:hover { color: var(--sky); }
.site-footer__legal { border-top: 1px solid rgba(255,255,255,.15); }
.site-footer__legal-inner { max-width: 80rem; margin: 0 auto; padding: 1.5rem 1.25rem; display: flex; flex-direction: column; gap: .5rem; font-size: .75rem; color: rgba(255,255,255,.6); }
@media (min-width: 768px) { .site-footer__legal-inner { flex-direction: row; align-items: center; justify-content: space-between; padding: 1.5rem 2rem; } }
.site-footer__legal-links { display: flex; flex-wrap: wrap; gap: 1rem; }

/* Callout (large CTA block) */
.callout { background: var(--primary); color: var(--primary-fg); border-radius: var(--radius-lg); padding: 2.5rem; display: grid; gap: 2rem; grid-template-columns: 1fr; align-items: center; }
@media (min-width: 768px) { .callout { grid-template-columns: 1.5fr 1fr; padding: 4rem; } }
.callout h2 { color: var(--primary-fg); }
.callout p { color: rgba(255,255,255,.8); }
.callout__buttons { display: flex; gap: .75rem; flex-wrap: wrap; }
@media (min-width: 768px) { .callout__buttons { justify-content: flex-end; } }

/* Story card */
.story-card .quote-mark { font-family: "Fraunces", serif; font-size: 3rem; color: var(--sky-strong); line-height: 1; }
.story-card__quote { font-family: "Fraunces", serif; font-style: italic; font-size: 1.05rem; flex: 1; }
.story-card__meta { display: flex; justify-content: space-between; align-items: center; padding-top: 1rem; border-top: 1px solid var(--border); margin-top: 1rem; font-size: .85rem; }

/* Avatar placeholder */
.avatar-block { aspect-ratio: 1; border-radius: .75rem; background: linear-gradient(135deg, var(--sky), var(--sky-strong)); margin-bottom: 1rem; }
.news-thumb { aspect-ratio: 16/9; border-radius: .75rem; background: linear-gradient(135deg, var(--sky), var(--cream)); margin-bottom: 1.25rem; }
.news-meta { display: flex; gap: .75rem; font-size: .7rem; text-transform: uppercase; letter-spacing: .12em; margin-bottom: .5rem; }

/* Pills */
.pill { display: inline-flex; align-items: center; gap: .5rem; padding: .35rem 1rem; border-radius: 999px; background: var(--cream); color: var(--primary); font-size: .85rem; font-weight: 600; }
.pill--sky { background: rgba(135,206,235,.2); color: var(--sky); }

/* Newsletter */
.newsletter { display: flex; gap: .75rem; flex-direction: column; }
@media (min-width: 640px) { .newsletter { flex-direction: row; } }
.newsletter input { flex: 1; padding: .85rem 1.25rem; border-radius: 999px; border: 1px solid rgba(255,255,255,.2); background: rgba(255,255,255,.05); color: #fff; font-size: .9rem; }
.newsletter input::placeholder { color: rgba(255,255,255,.5); }

/* Financials */
.bar { height: .5rem; background: var(--muted-soft); border-radius: 999px; overflow: hidden; }
.bar__fill { height: 100%; background: var(--ember); }
.doc-list { list-style: none; padding: 0; margin: 0; background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
.doc-list li { display: flex; align-items: center; justify-content: space-between; padding: 1.25rem 1.5rem; border-bottom: 1px solid var(--border); gap: 1rem; }
.doc-list li:last-child { border-bottom: 0; }
.doc-list__left { display: flex; align-items: center; gap: 1rem; }
.doc-list__icon { width: 3rem; height: 3rem; border-radius: .75rem; background: rgba(135,206,235,.3); color: var(--primary); display: inline-flex; align-items: center; justify-content: center; }

/* FAQ */
.faq-section { margin-bottom: 3rem; }
.faq-section h2 { margin-bottom: 1rem; }
.faq-item { border-bottom: 1px solid var(--border); padding: 1.25rem 0; }
.faq-item > summary { font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
.faq-item > summary::after { content: "+"; color: var(--ember); font-size: 1.5rem; }
.faq-item[open] > summary::after { content: "−"; }
.faq-item p { color: var(--muted); margin: .75rem 0 0; }

/* Contact */
.contact-hero { display: grid; gap: 2.5rem; grid-template-columns: 1fr; align-items: center; }
@media (min-width: 1024px) { .contact-hero { grid-template-columns: 1.2fr 1fr; gap: 4rem; } }
.team-card { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.15); border-radius: var(--radius); padding: 1.5rem; }
.team-card__top { display: flex; align-items: center; gap: 1.25rem; }
.team-card__top img { width: 5rem; height: 5rem; border-radius: 50%; object-fit: cover; box-shadow: 0 0 0 2px rgba(255,255,255,.2); }
.team-card__lines { border-top: 1px solid rgba(255,255,255,.15); margin-top: 1.25rem; padding-top: 1.25rem; display: grid; gap: .75rem; font-size: .9rem; }
.team-card__lines a { color: rgba(255,255,255,.9); display: inline-flex; gap: .5rem; align-items: center; }
.contact-grid { display: grid; gap: 3rem; grid-template-columns: 1fr; }
@media (min-width: 1024px) { .contact-grid { grid-template-columns: 1fr 1.2fr; } }
.contact-form label { display: grid; gap: .35rem; font-weight: 500; font-size: .9rem; margin-bottom: 1rem; }
.contact-form input, .contact-form textarea { border: 1px solid var(--border); border-radius: .65rem; padding: .85rem 1rem; font: inherit; font-size: .95rem; background: var(--bg); }
.contact-form button { margin-top: .5rem; align-self: flex-start; }

/* Panels */
.panel-cream { background: var(--cream); border-radius: var(--radius); padding: 2rem; }

/* Legal */
.legal h2 { margin-top: 2.5rem; margin-bottom: .75rem; }
.legal ul { padding-left: 1.25rem; color: var(--muted); }
.legal li { margin-bottom: .5rem; }

/* Icon helpers */
.icon-lg { font-size: 1.5rem; color: var(--ember); }
`;

// ---- write everything -------------------------------------------------------
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
mkdirSync(join(OUT, "css"), { recursive: true });
mkdirSync(join(OUT, "pages"), { recursive: true });
mkdirSync(join(OUT, "partials"), { recursive: true });
mkdirSync(join(OUT, "assets"), { recursive: true });

// Copy assets
cpSync("src/assets", join(OUT, "assets"), { recursive: true });

// CSS
writeFileSync(join(OUT, "css/styles.css"), CSS);

// Partials (reference copies)
writeFileSync(join(OUT, "partials/utility-bar.html"), utilityBar.trim());
writeFileSync(join(OUT, "partials/header.html"), renderHeader().trim());
writeFileSync(join(OUT, "partials/footer.html"), renderFooter().trim());
writeFileSync(join(OUT, "partials/mountain-divider.svg"), MOUNTAIN_SVG);

// Pages
type PageDef = { file: string; title: string; description: string; body: string };
const pages: PageDef[] = [
  { file: "home.html", title: "Weber Human Services Foundation | Ogden, Utah Nonprofit", description: "Donate or volunteer with the Weber Human Services Foundation — a 501(c)(3) funding mental health, aging, recovery, and prevention programs in Weber County, Utah.", body: homeBody },
  { file: "about.html", title: "About the Weber Human Services Foundation | Ogden, UT", description: "Meet the volunteer board behind the Weber Human Services Foundation — bridging the funding gap for mental health, aging, and recovery services in Weber County, Utah.", body: aboutBody },
  { file: "board.html", title: "Board & Leadership | Weber Human Services Foundation", description: "Local leaders volunteering with the Weber Human Services Foundation to fund mental health, aging, and recovery programs across Morgan & Weber Counties, Utah.", body: boardBody },
  { file: "impact.html", title: "Impact & Stories | Weber Human Services Foundation", description: "Real outcomes from the Weber Human Services Foundation: lives changed across mental health, aging, recovery, and prevention services in Weber County, Utah.", body: impactBody },
  { file: "causes.html", title: "Our Causes — Weber Human Services Foundation", description: "Five focus areas where your gift becomes outcomes: Employee Care, Aging Services, Mental Health, Prevention, and Substance Use Recovery.", body: causesIndexBody },
  { file: "events.html", title: "Events: Golf Tournament & Sub for Santa | WHS Foundation", description: "Join the Weber Human Services Foundation's annual Golf Tournament and Sub for Santa events in Ogden, Utah. Sponsor, play, or give to fund local programs.", body: eventsIndexBody },
  { file: "events-golf-tournament.html", title: "Golf Tournament — Weber Human Services Foundation", description: "Join the Weber Human Services Foundation Golf Tournament — a day on the course supporting mental health, recovery, and aging programs.", body: golfBody },
  { file: "events-sub-for-santa.html", title: "Sub for Santa — Weber Human Services Foundation", description: "Sponsor a family or donate gifts through the Weber Human Services Foundation Sub for Santa program.", body: santaBody },
  { file: "get-involved.html", title: "Volunteer or Donate | Weber Human Services Foundation", description: "Three ways to support the Weber Human Services Foundation: donate, give in-kind, or volunteer your time across Morgan & Weber Counties, Utah.", body: getInvolvedBody },
  { file: "news.html", title: "News & Updates | Weber Human Services Foundation", description: "Latest news, campaigns, and impact stories from the Weber Human Services Foundation in Ogden, Utah.", body: newsBody },
  { file: "donate.html", title: "Donate to the Weber Human Services Foundation | Ogden, UT", description: "Make a tax-deductible donation to the Weber Human Services Foundation. 100% local — funds mental health, aging, prevention, and addiction recovery in Utah.", body: donateBody },
  { file: "financials.html", title: "Financials & IRS 990s | Weber Human Services Foundation", description: "Annual reports, IRS Form 990s, and financial transparency for the Weber Human Services Foundation — a 501(c)(3) serving Morgan & Weber Counties, Utah.", body: financialsBody },
  { file: "faq.html", title: "FAQ — Weber Human Services Foundation", description: "Frequently asked questions about giving to, partnering with, and benefiting from the Weber Human Services Foundation.", body: faqBody },
  { file: "contact.html", title: "Contact the Weber Human Services Foundation | Ogden, UT", description: "Reach the Weber Human Services Foundation in Ogden, Utah. Email foundation@weberhs.org or call (801) 778-6834 to give, partner, or volunteer.", body: contactBody },
  { file: "privacy.html", title: "Privacy Policy — Weber Human Services Foundation", description: "How the Weber Human Services Foundation collects, uses, and protects your information.", body: legalBody(legal.privacy) },
  { file: "terms.html", title: "Terms of Use — Weber Human Services Foundation", description: "Terms governing use of the Weber Human Services Foundation website.", body: legalBody(legal.terms) },
];

// Cause detail pages
for (const c of CAUSES) {
  pages.push({
    file: c.file,
    title: `${c.title} — Weber Human Services Foundation`,
    description: c.description.slice(0, 155),
    body: causeDetailBody(c),
  });
}

for (const p of pages) {
  const slug = p.file.replace(/\.html$/, "");
  const urlPath = slug === "home" ? "/" : `/${slug.replace(/^causes-/, "causes/")}`;
  const canonical = SITE + (urlPath === "/" ? "/" : urlPath);
  writeFileSync(join(OUT, "pages", p.file), pageShell({
    file: p.file, title: p.title, description: p.description,
    ogUrl: canonical, canonical, body: p.body,
  }));
}

// README
writeFileSync(join(OUT, "README.md"), `# Weber Human Services Foundation — static export

Pixel-close static HTML/CSS port of the live React site. Use as a design handoff,
CMS reference, or for archival.

## Structure
- \`css/styles.css\` — full design system (tokens, typography, components, utilities)
- \`partials/\` — reusable header, footer, utility bar, mountain divider SVG (already inlined in each page)
- \`pages/\` — one self-contained HTML file per route
- \`assets/\` — images copied from \`src/assets/\` (logo, hero photos, cause photos)

## How to view
Open any file in \`pages/\` directly in a browser. The stylesheet path is relative
(\`../css/styles.css\`), and images use relative paths (\`assets/...\`).

## Pages included
${pages.map((p) => `- ${p.file} — ${p.title}`).join("\n")}

## What's not included (out of scope for the static export)
- Hero carousel autoplay — pages show the first slide as a static hero
- Slide-out panels on Get Involved — the "Contact us" / "Inquire to volunteer"
  buttons link to \`contact.html\` (with a \`#volunteer\` anchor) instead
- Mobile nav drawer — the header collapses gracefully but no hamburger menu
- Google Translate EN/ES toggle — utility bar shows the label only
- Live form submissions — forms are markup-only

To re-enable any of the above in a CMS like Wix, see \`src/components/site/\`
in the React project for the original behavior.

## Editing copy
All text was taken from \`src/content/*.ts\`. To update a string, edit the
matching HTML in \`pages/\` (or regenerate from the script at
\`scripts/export-static.ts\` in the React project).

Phone: (801) 778-6834 · Email: foundation@weberhs.org
`);

console.log(`Wrote ${pages.length} pages to ${OUT}`);
