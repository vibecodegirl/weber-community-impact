// Privacy & Terms page content. Each "section" becomes an h2 with paragraphs/lists.

type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type LegalSection = {
  heading: string;
  blocks: Block[];
};

export const privacy = {
  title: "Privacy Policy",
  lastUpdated: "Last updated: May 2026",
  intro:
    "The Weber Human Services Foundation (\"we,\" \"our,\" or \"the Foundation\") respects your privacy. This policy explains what information we collect on this website, how we use it, and the choices you have.",
  sections: [
    {
      heading: "Information we collect",
      blocks: [
        { type: "p", text: "We collect the following kinds of information:" },
        {
          type: "ul",
          items: [
            "Information you provide directly — such as your name, email, phone number, or message — when you complete a form, sign up for our newsletter, or contact us.",
            "Donation information processed by our third-party payment provider. We do not store credit card or bank account details on our servers.",
            "Basic usage data — such as pages visited and approximate location — collected through standard web analytics.",
          ],
        },
      ],
    },
    {
      heading: "How we use your information",
      blocks: [
        {
          type: "ul",
          items: [
            "To respond to your inquiries and process donations.",
            "To send newsletters, event invitations, and impact updates if you've opted in.",
            "To improve our website and understand how visitors use it.",
            "To meet legal, accounting, and tax-reporting obligations.",
          ],
        },
      ],
    },
    {
      heading: "Sharing",
      blocks: [
        {
          type: "p",
          text: "We do not sell or rent your personal information. We share information only with trusted service providers (such as our email platform and payment processor) who help us operate, and only as required by law.",
        },
      ],
    },
    {
      heading: "Your choices",
      blocks: [
        {
          type: "p",
          text: "You may unsubscribe from our newsletter at any time using the link in any email, or contact us to update or delete your information.",
        },
      ],
    },
    {
      heading: "Cookies",
      blocks: [
        {
          type: "p",
          text: "We use a small number of cookies for site functionality and analytics. You can disable cookies in your browser settings.",
        },
      ],
    },
    {
      heading: "Children",
      blocks: [
        {
          type: "p",
          text: "This website is not directed to children under 13, and we do not knowingly collect personal information from children.",
        },
      ],
    },
    {
      heading: "Contact",
      blocks: [
        {
          type: "p",
          text: "Questions about this policy? Please reach out via our Contact page. We may update this policy from time to time; the \"Last updated\" date above will reflect any revisions.",
        },
      ],
    },
  ] satisfies LegalSection[],
};

export const terms = {
  title: "Terms of Use",
  lastUpdated: "Last updated: May 2026",
  intro:
    "By accessing or using the Weber Human Services Foundation website (the \"Site\"), you agree to these Terms of Use. If you do not agree, please do not use the Site.",
  sections: [
    {
      heading: "Use of the Site",
      blocks: [
        {
          type: "p",
          text: "You may use the Site for lawful, personal, and informational purposes. You may not use the Site to transmit harmful content, attempt to gain unauthorized access, or interfere with its operation.",
        },
      ],
    },
    {
      heading: "Donations",
      blocks: [
        {
          type: "p",
          text: "Donations are processed through a third-party payment provider on a separate page. Donations are non-refundable except where required by law. Tax receipts are issued in accordance with IRS guidelines for U.S. 501(c)(3) public charities.",
        },
      ],
    },
    {
      heading: "Not professional advice",
      blocks: [
        {
          type: "p",
          text: "Information on this Site is provided for general awareness only and is not medical, mental-health, legal, or financial advice. If you or someone you know is in crisis, dial or text 988 for the Suicide & Crisis Lifeline.",
        },
      ],
    },
    {
      heading: "Intellectual property",
      blocks: [
        {
          type: "p",
          text: "The content, logo, and design of this Site are the property of the Weber Human Services Foundation or its licensors and are protected by applicable intellectual-property laws.",
        },
      ],
    },
    {
      heading: "Third-party links",
      blocks: [
        {
          type: "p",
          text: "The Site may link to third-party websites. We are not responsible for the content or practices of those sites.",
        },
      ],
    },
    {
      heading: "Disclaimer of warranties",
      blocks: [
        {
          type: "p",
          text: "The Site is provided \"as is\" without warranties of any kind, express or implied. We do not warrant that the Site will be uninterrupted or error free.",
        },
      ],
    },
    {
      heading: "Limitation of liability",
      blocks: [
        {
          type: "p",
          text: "To the fullest extent permitted by law, the Foundation, its directors, and volunteers shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Site.",
        },
      ],
    },
    {
      heading: "Changes",
      blocks: [
        {
          type: "p",
          text: "We may update these Terms from time to time. Continued use of the Site after changes are posted constitutes acceptance of the revised Terms.",
        },
      ],
    },
    {
      heading: "Contact",
      blocks: [
        {
          type: "p",
          text: "Questions about these Terms? Please reach out via our Contact page.",
        },
      ],
    },
  ] satisfies LegalSection[],
};
