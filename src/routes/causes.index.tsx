import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CAUSES } from "@/lib/causes";
import { causesPage } from "@/content/causes-page";

export const Route = createFileRoute("/causes/")({
  head: () => ({
    meta: [
      { title: "Our Causes — Weber Human Services Foundation" },
      { name: "description", content: "Five focus areas where your gift becomes outcomes: Employee Care, Aging Services, Mental Health, Prevention, and Substance Use Recovery." },
      { property: "og:title", content: "Our Causes" },
      { property: "og:description", content: "Where your gift goes to work — five focus areas." },
    ],
  }),
  component: CausesIndex,
});

function CausesIndex() {
  const c = causesPage.index;
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">{c.hero.eyebrow}</div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{c.hero.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">{c.hero.body}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {CAUSES.map((cause) => (
            <Link
              key={cause.slug}
              to="/causes/$slug"
              params={{ slug: cause.slug }}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={cause.image} alt="" width={1280} height={800} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-8">
                <h2 className="font-serif text-3xl">{cause.title}</h2>
                <p className="mt-2 text-ember">{cause.tagline}</p>
                <p className="mt-4 text-muted-foreground">{cause.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 font-semibold text-primary group-hover:text-ember">
                  {c.learnMoreLabel} <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
