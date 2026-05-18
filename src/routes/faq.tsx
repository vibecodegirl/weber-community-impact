import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { faq } from "@/content/faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Weber Human Services Foundation" },
      { name: "description", content: "Frequently asked questions about giving to, partnering with, and benefiting from the Weber Human Services Foundation." },
      { property: "og:title", content: "Frequently Asked Questions" },
      { property: "og:description", content: "Answers about donations, programs, and the Weber Human Services Foundation." },
      { property: "og:url", content: "https://whsf.accessmypage.online/faq" },
    ],
    links: [
      { rel: "canonical", href: "https://whsf.accessmypage.online/faq" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.sections.flatMap((s) =>
            s.items.map((it) => ({
              "@type": "Question",
              name: it.question,
              acceptedAnswer: { "@type": "Answer", text: it.answer },
            })),
          ),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">{faq.hero.eyebrow}</div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{faq.hero.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">{faq.hero.body}</p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
        {faq.sections.map((section) => (
          <div key={section.heading} className="mb-14 last:mb-0">
            <SectionHeader eyebrow="Topic" title={section.heading} />
            <div className="mt-8 space-y-3">
              {section.items.map((item, i) => (
                <details key={i} className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] open:bg-cream">
                  <summary className="cursor-pointer list-none font-serif text-lg text-primary marker:hidden">
                    <span className="mr-2 text-ember">+</span>
                    {item.question}
                  </summary>
                  <p className="mt-3 text-muted-foreground">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-16 rounded-3xl bg-cream p-10 text-center">
          <h2 className="font-serif text-3xl">{faq.closingCta.title}</h2>
          <p className="mt-3 text-muted-foreground">{faq.closingCta.body}</p>
          <Link to="/contact" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
            {faq.closingCta.buttonLabel}
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
