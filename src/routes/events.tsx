import { createFileRoute } from "@tanstack/react-router";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { events } from "@/content/events";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — Weber Human Services Foundation" },
      { name: "description", content: "Annual gala, awareness walks, and community gatherings that fuel the Foundation's mission." },
      { property: "og:title", content: "Events" },
      { property: "og:description", content: "Join us for events that bring our community together." },
    ],
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
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader eyebrow={events.upcomingHeading.eyebrow} title={events.upcomingHeading.title} />
        <div className="mt-12 space-y-5">
          {events.upcoming.map((e) => (
            <div key={e.name} className="grid gap-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] md:grid-cols-[160px_1fr_auto] md:items-center md:p-8">
              <div className="rounded-xl bg-cream p-4 text-center">
                <Calendar className="mx-auto h-5 w-5 text-ember" />
                <div className="mt-2 font-serif text-lg text-primary">{e.date}</div>
              </div>
              <div>
                <h3 className="font-serif text-2xl">{e.name}</h3>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" /> {e.location}
                </div>
                <p className="mt-3 text-foreground/80">{e.description}</p>
              </div>
              <a href={e.rsvpUrl} className="inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground md:self-auto">
                {events.rsvpLabel} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow={events.pastHeading.eyebrow} title={events.pastHeading.title} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {events.past.map((p) => (
              <div key={p} className="rounded-2xl bg-card p-6 shadow-[var(--shadow-soft)]">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-sky to-accent" />
                <div className="mt-4 font-serif text-lg">{p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
