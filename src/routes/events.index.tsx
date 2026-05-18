import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { events } from "@/content/events";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "Events — Weber Human Services Foundation" },
      { name: "description", content: "The Foundation's two signature events: the annual Golf Tournament and Sub for Santa." },
      { property: "og:title", content: "Events" },
      { property: "og:description", content: "Golf Tournament and Sub for Santa — our two signature events." },
      { property: "og:url", content: "https://whsf.accessmypage.online/events" },
    ],
    links: [{ rel: "canonical", href: "https://whsf.accessmypage.online/events" }],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">{events.hero.eyebrow}</div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{events.hero.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">{events.hero.body}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader eyebrow={events.upcomingHeading.eyebrow} title={events.upcomingHeading.title} />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {events.upcoming.map((e) => (
            <Link
              key={e.name}
              to={e.href}
              className="group flex flex-col rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-1.5 text-sm font-semibold text-primary">
                <Calendar className="h-4 w-4 text-ember" /> {e.date}
              </div>
              <h3 className="mt-5 font-serif text-3xl text-primary">{e.name}</h3>
              <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" /> {e.location}
              </div>
              <p className="mt-4 flex-1 text-foreground/80">{e.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform group-hover:translate-x-0.5">
                {e.ctaLabel} <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
