import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ArrowRight, Heart } from "lucide-react";
import { about } from "@/content/about";
import { board } from "@/content/board";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Weber Human Services Foundation" },
      { name: "description", content: "Learn about the Weber Human Services Foundation board, mission, and our commitment to financial transparency in supporting Morgan and Weber Counties." },
      { property: "og:title", content: "About the Foundation" },
      { property: "og:description", content: "A nonprofit board of local leaders supporting Weber Human Services." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">{about.hero.eyebrow}</div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{about.hero.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">{about.hero.body}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {about.whoWhatWhy.map((c) => (
            <div key={c.eyebrow} className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">{c.eyebrow}</div>
              <h3 className="mt-2 font-serif text-2xl">{c.title}</h3>
              <p className="mt-3 text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow={about.values.eyebrow} title={about.values.title} />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.items.map((v) => (
              <div key={v.title} className="rounded-2xl bg-card p-6 shadow-[var(--shadow-soft)]">
                <div className="font-serif text-xl text-primary">{v.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader eyebrow={about.boardPreview.eyebrow} title={about.boardPreview.title} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {board.directors.slice(0, 6).map((d, i) => (
            <article key={i} className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={d.photo}
                  alt={`Portrait of ${d.name}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="font-serif text-xl">{d.name}</div>
                <div className="mt-1 text-sm font-semibold text-ember">{d.role}</div>
                {d.affiliation && (
                  <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{d.affiliation}</div>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/board" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
            View full board <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="rounded-3xl bg-primary p-10 text-primary-foreground md:p-16">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl">{about.transparency.title}</h2>
              <p className="mt-4 max-w-xl text-primary-foreground/80">{about.transparency.body}</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/impact" className="inline-flex items-center gap-2 rounded-full bg-sky px-6 py-3 font-semibold text-primary">
                {about.transparency.primaryLabel} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 font-semibold text-ember-foreground">
                <Heart className="h-4 w-4" /> {about.transparency.secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
