import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CAUSES } from "@/lib/causes";

export const Route = createFileRoute("/causes/")({
  head: () => ({
    meta: [
      { title: "Our Causes — Weber Human Services Foundation" },
      {
        name: "description",
        content:
          "Five focus areas where your gift becomes outcomes: Employee Care, Aging Services, Mental Health, Prevention, and Substance Use Recovery.",
      },
      { property: "og:title", content: "Our Causes" },
      { property: "og:description", content: "Where your gift goes to work — five focus areas." },
    ],
  }),
  component: CausesIndex,
});

function CausesIndex() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">
            Five focus areas
          </div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            Where your generosity <em className="text-sky">becomes outcomes</em>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">
            Each cause we fund is tied to specific programs at Weber Human Services and to real,
            measurable change in people's lives.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {CAUSES.map((c) => (
            <Link
              key={c.slug}
              to="/causes/$slug"
              params={{ slug: c.slug }}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={c.image}
                  alt=""
                  width={1280}
                  height={800}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <h2 className="font-serif text-3xl">{c.title}</h2>
                <p className="mt-2 text-ember">{c.tagline}</p>
                <p className="mt-4 text-muted-foreground">{c.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 font-semibold text-primary group-hover:text-ember">
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
