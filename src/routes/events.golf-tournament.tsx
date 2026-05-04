import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/events/golf-tournament")({
  head: () => ({
    meta: [
      { title: "Golf Tournament — Weber Human Services Foundation" },
      { name: "description", content: "Join the Weber Human Services Foundation Golf Tournament — a day on the course supporting mental health, recovery, and aging programs." },
      { property: "og:title", content: "Golf Tournament" },
      { property: "og:description", content: "A day on the course supporting our community." },
    ],
  }),
  component: GolfTournamentPage,
});

function GolfTournamentPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <Link to="/events" className="mb-6 inline-flex items-center gap-2 text-sm text-sky">
            <ArrowLeft className="h-4 w-4" /> All events
          </Link>
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">Signature Event</div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">Foundation Golf Tournament</h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">
            A day on the green that fuels year-round services for our neighbors in Morgan and Weber Counties.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
            <Calendar className="h-6 w-6 text-ember" />
            <div className="mt-3 font-serif text-2xl text-primary">Date TBA</div>
            <p className="mt-2 text-muted-foreground">Watch this page for the next tournament date and registration details.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
            <MapPin className="h-6 w-6 text-ember" />
            <div className="mt-3 font-serif text-2xl text-primary">Location TBA</div>
            <p className="mt-2 text-muted-foreground">A premier Northern Utah course — details coming soon.</p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-cream p-8">
          <h2 className="font-serif text-2xl text-primary">Sponsorship & registration</h2>
          <p className="mt-3 text-foreground/80">
            Foursomes, hole sponsorships, and corporate packages will be announced ahead of the event. Reach out to the Foundation team to be added to the early-notice list.
          </p>
          <Link to="/contact" className="mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
            Contact the Foundation
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
