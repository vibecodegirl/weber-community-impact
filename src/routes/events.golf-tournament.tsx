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
      { property: "og:url", content: "https://whsf.accessmypage.online/events/golf-tournament" },
    ],
    links: [{ rel: "canonical", href: "https://whsf.accessmypage.online/events/golf-tournament" }],
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
      </section>

      <SponsorsSection />

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="rounded-2xl bg-cream p-8">
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

// ============================================================
// Sponsors — three tiers
// To add a logo: drop a file in src/assets/sponsors/ and add
//   { name: "Company", logo: "/src/assets/sponsors/file.png", url: "https://…" }
// to the appropriate array. Use `null` for logo to render a name-only card.
// ============================================================

type Sponsor = { name: string; logo?: string | null; url?: string };

import afcuTitleLogo from "@/assets/sponsors/afcu-title.png.asset.json";

const titleSponsor: Sponsor | null = {
  name: "America First Credit Union",
  logo: afcuTitleLogo.url,
  url: "https://www.americafirst.com",
};

const premierSponsors: Sponsor[] = [
  // { name: "Premier Sponsor", logo: null, url: "" },
];

const holeSponsors: Sponsor[] = [
  // { name: "Hole Sponsor", logo: null, url: "" },
];

function SponsorCard({ sponsor, size = "md" }: { sponsor: Sponsor; size?: "lg" | "md" | "sm" }) {
  const dims =
    size === "lg" ? "h-40 md:h-56 p-8" : size === "md" ? "h-28 md:h-32 p-5" : "h-20 md:h-24 p-4";
  const text =
    size === "lg" ? "text-2xl md:text-3xl font-serif" : size === "md" ? "text-base font-semibold" : "text-sm font-medium";
  const inner = (
    <div className={`flex w-full items-center justify-center rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition hover:shadow-md ${dims}`}>
      {sponsor.logo ? (
        <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="max-h-full max-w-full object-contain" loading="lazy" />
      ) : (
        <span className={`text-center text-primary ${text}`}>{sponsor.name}</span>
      )}
    </div>
  );
  return sponsor.url ? (
    <a href={sponsor.url} target="_blank" rel="noopener noreferrer" aria-label={sponsor.name}>{inner}</a>
  ) : (
    inner
  );
}

function SponsorsSection() {
  const hasAny = titleSponsor || premierSponsors.length > 0 || holeSponsors.length > 0;

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        <div className="mb-10 text-center">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-ember">Thank you</div>
          <h2 className="font-serif text-3xl text-primary md:text-4xl">Our Sponsors</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            The generosity of these partners makes the Foundation Golf Tournament — and the services it funds — possible.
          </p>
        </div>

        {!hasAny && (
          <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            Sponsor lineup coming soon. Interested in becoming a sponsor?{" "}
            <Link to="/contact" className="font-semibold text-primary underline">Get in touch</Link>.
          </div>
        )}

        {titleSponsor && (
          <div className="mb-14">
            <div className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Title Sponsor</div>
            <div className="mx-auto max-w-3xl">
              <SponsorCard sponsor={titleSponsor} size="lg" />
            </div>
          </div>
        )}

        {premierSponsors.length > 0 && (
          <div className="mb-14">
            <div className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Premier Sponsors</div>
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {premierSponsors.map((s) => (
                <SponsorCard key={s.name} sponsor={s} size="md" />
              ))}
            </div>
          </div>
        )}

        {holeSponsors.length > 0 && (
          <div>
            <div className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Hole Sponsors</div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {holeSponsors.map((s) => (
                <SponsorCard key={s.name} sponsor={s} size="sm" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
