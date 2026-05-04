import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Weber Human Services Foundation" },
      {
        name: "description",
        content:
          "Frequently asked questions about giving to, partnering with, and benefiting from the Weber Human Services Foundation.",
      },
      { property: "og:title", content: "Frequently Asked Questions" },
      {
        property: "og:description",
        content: "Answers about donations, programs, and the Weber Human Services Foundation.",
      },
    ],
  }),
  component: FaqPage,
});

const SECTIONS: { heading: string; items: { q: string; a: string }[] }[] = [
  {
    heading: "About the Foundation",
    items: [
      {
        q: "What is the Weber Human Services Foundation?",
        a: "We are a 501(c)(3) nonprofit comprised of local volunteers who raise charitable contributions in support of the clients and programs at Weber Human Services in Morgan and Weber Counties.",
      },
      {
        q: "Are you the same as Weber Human Services?",
        a: "No. Weber Human Services is the public agency that delivers programs. The Foundation is an independent nonprofit that raises private donations to fill gaps that public funding cannot cover.",
      },
      {
        q: "What areas do you serve?",
        a: "We serve neighbors in Morgan and Weber Counties, Utah.",
      },
    ],
  },
  {
    heading: "Donations & giving",
    items: [
      {
        q: "Is my donation tax deductible?",
        a: "Yes. We are a registered 501(c)(3) public charity, and donations are tax deductible to the extent allowed by law. You'll receive a receipt for your records.",
      },
      {
        q: "How is my donation used?",
        a: "Roughly 82% of every dollar goes directly to client programs across our five focus areas. The remainder supports fundraising and administration. See our Financials page for full details.",
      },
      {
        q: "Can I designate my gift to a specific program?",
        a: "Yes. You can direct your gift to Employee Care, Aging Services, Mental Health, Prevention, or Substance Use — or let the board allocate it where need is greatest.",
      },
      {
        q: "Do you accept stock, IRA distributions, or planned gifts?",
        a: "Yes. Please contact us to coordinate stock transfers, qualified charitable distributions from an IRA, or to discuss leaving a legacy gift.",
      },
    ],
  },
  {
    heading: "Programs & impact",
    items: [
      {
        q: "What are the five cause areas?",
        a: "Employee Care Fund, Aging Services, Mental Health, Prevention, and Substance Use. Each is detailed on our Causes page with specific programs and outcomes.",
      },
      {
        q: "How do I or someone I know access services?",
        a: "Programs are delivered by Weber Human Services. Visit weberhs.net or call them directly. In a crisis, dial or text 988 for the Suicide & Crisis Lifeline.",
      },
    ],
  },
  {
    heading: "Volunteering & partnership",
    items: [
      {
        q: "How can I volunteer?",
        a: "Visit our Get Involved page to share your interests. We welcome event volunteers, committee members, and skills-based volunteers.",
      },
      {
        q: "How can my business partner with the Foundation?",
        a: "We partner with local businesses through sponsorships, workplace giving, and in-kind support. Reach out via the Contact page to start a conversation.",
      },
    ],
  },
];

function FaqPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">
            Frequently Asked Questions
          </div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            Answers to the questions we hear most.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">
            Don't see your question? We'd love to hear from you — reach out anytime.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
        {SECTIONS.map((section) => (
          <div key={section.heading} className="mb-14 last:mb-0">
            <SectionHeader eyebrow="Topic" title={section.heading} />
            <div className="mt-8 space-y-3">
              {section.items.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] open:bg-cream"
                >
                  <summary className="cursor-pointer list-none font-serif text-lg text-primary marker:hidden">
                    <span className="mr-2 text-ember">+</span>
                    {item.q}
                  </summary>
                  <p className="mt-3 text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-16 rounded-3xl bg-cream p-10 text-center">
          <h2 className="font-serif text-3xl">Still have questions?</h2>
          <p className="mt-3 text-muted-foreground">We'd love to hear from you.</p>
          <Link
            to="/contact"
            className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
          >
            Contact us
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
