import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Mail } from "lucide-react";
import { board } from "@/content/board";

export const Route = createFileRoute("/board")({
  head: () => ({
    meta: [
      { title: "Board & Leadership | Weber Human Services Foundation" },
      { name: "description", content: "Local leaders volunteering with the Weber Human Services Foundation to fund mental health, aging, and recovery programs across Morgan & Weber Counties, Utah.[...]
      { property: "og:title", content: "Board & Leadership | Weber Human Services Foundation" },
      { property: "og:description", content: "Meet the volunteer directors guiding the Foundation's work across Weber County, Utah." },
      { property: "og:url", content: "https://whsf.accessmypage.online/board" },
    ],
    links: [{ rel: "canonical", href: "https://whsf.accessmypage.online/board" }],
  }),
  component: BoardPage,
});

function BoardPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">{board.hero.eyebrow}</div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{board.hero.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">{board.hero.body}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader eyebrow={board.directorsHeading.eyebrow} title={board.directorsHeading.title} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {board.directors.map((d, i) => (
            <article key={i} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              {d.imageUrl ? (
                <img 
                  src={d.imageUrl} 
                  alt={d.name}
                  className="aspect-square rounded-xl object-cover"
                />
              ) : (
                <div className="aspect-square rounded-xl bg-gradient-to-br from-sky to-accent" />
              )}
              <div className="mt-4 font-serif text-xl">{d.name}</div>
              <div className="text-sm font-semibold text-ember">{d.role}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{d.affiliation}</div>
              <p className="mt-3 text-sm text-muted-foreground">{d.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2 md:items-center lg:px-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">{board.joinCta.eyebrow}</div>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">{board.joinCta.title}</h2>
            <p className="mt-4 text-muted-foreground">{board.joinCta.body}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
              <Mail className="h-4 w-4" /> {board.joinCta.buttonLabel}
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
