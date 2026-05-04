import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Quote } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { impact } from "@/content/impact";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact & Stories — Weber Human Services Foundation" },
      { name: "description", content: "Real stories of change from across Morgan and Weber Counties — and the numbers behind our annual impact." },
      { property: "og:title", content: "Impact & Stories" },
      { property: "og:description", content: "Stories and outcomes from the Foundation's work." },
    ],
  }),
  component: ImpactPage,
});

function ImpactPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">{impact.hero.eyebrow}</div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{impact.hero.title}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impact.numbers.map((n) => (
            <div key={n.label} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <div className="font-serif text-4xl text-primary">{n.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{n.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <SectionHeader eyebrow={impact.storiesHeading.eyebrow} title={impact.storiesHeading.title} />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {impact.stories.map((s, i) => (
            <article key={i} className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-soft)]">
              <Quote className="h-7 w-7 text-sky" />
              <p className="mt-4 flex-1 font-serif text-lg italic text-foreground/90">"{s.quote}"</p>
              <div className="mt-6 border-t border-border pt-4">
                <div className="font-semibold text-primary">{s.name}</div>
                <div className="text-xs uppercase tracking-wider text-ember">{s.cause}</div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted-foreground">{impact.storiesDisclaimer}</p>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="rounded-3xl bg-primary p-10 text-primary-foreground md:p-16">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl">{impact.annualReport.title}</h2>
              <p className="mt-4 max-w-xl text-primary-foreground/80">{impact.annualReport.body}</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a className="inline-flex items-center gap-2 rounded-full bg-sky px-6 py-3 font-semibold text-primary" href={impact.annualReport.downloadUrl}>
                <Download className="h-4 w-4" /> {impact.annualReport.downloadLabel}
              </a>
              <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 font-semibold text-ember-foreground">
                {impact.annualReport.donateLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
