import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, Clock, ArrowLeft, Phone, Mail, FileText, ExternalLink } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { GolfGallery } from "@/components/site/GolfGallery";
import tournamentPacket from "@/assets/Golf-Tournament-Letter-and-Registration-2026.pdf.asset.json";


export const Route = createFileRoute("/events/golf-tournament")({
  head: () => ({
    meta: [
      { title: "Golf Tournament — Weber Human Services Foundation" },
      { name: "description", content: "Join the Weber Human Services Foundation Golf Tournament — June 25, 2026 at Wolf Creek. A day on the course supporting mental health, recovery, and aging programs." },
      { property: "og:title", content: "Golf Tournament" },
      { property: "og:description", content: "June 25, 2026 at Wolf Creek — a day on the course supporting our community." },
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
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
          <Link to="/events" className="mb-4 inline-flex items-center gap-2 text-sm text-sky">
            <ArrowLeft className="h-4 w-4" /> All events
          </Link>
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-10">
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky">Signature Event</div>
              <h1 className="font-serif text-4xl leading-tight md:text-6xl">Foundation Golf Tournament</h1>
              <p className="mt-4 max-w-xl text-lg text-primary-foreground/80">
                A day on the green that fuels year-round services for our neighbors in Morgan and Weber Counties.
              </p>
            </div>

            <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-6 backdrop-blur md:p-8">
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <Calendar className="mt-0.5 h-6 w-6 flex-none text-sky" />
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">Date</div>
                    <div className="font-serif text-xl text-primary-foreground">Thursday, June 25, 2026</div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <MapPin className="mt-0.5 h-6 w-6 flex-none text-sky" />
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">Location</div>
                    <div className="font-serif text-xl text-primary-foreground">Wolf Creek</div>
                    <div className="text-base text-primary-foreground/70">Eden, Utah</div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Clock className="mt-0.5 h-6 w-6 flex-none text-sky" />
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">Schedule</div>
                    <div className="text-base text-primary-foreground/90">8:00 a.m. — Check in and report to carts</div>
                    <div className="text-base text-primary-foreground/90">9:00 a.m. — Shotgun start</div>
                  </div>
                </li>
              </ul>

              <div className="my-6 h-px bg-primary-foreground/15" />

              <div className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/60">Contact</div>
              <div className="mt-1 font-serif text-lg text-primary-foreground">Madeline McDonald</div>
              <div className="text-base text-primary-foreground/70">Foundation Director</div>
              <div className="mt-3 flex flex-col gap-2 text-base">
                <a href="tel:+18017786834" className="inline-flex items-center gap-2 text-sky hover:underline">
                  <Phone className="h-5 w-5" /> (801) 778-6834
                </a>
                <a href="mailto:madelinemc@weberhs.org" className="inline-flex items-center gap-2 text-sky hover:underline">
                  <Mail className="h-5 w-5" /> madelinemc@weberhs.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <div className="rounded-2xl bg-background p-6 shadow-[var(--shadow-soft)] md:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
              <div className="lg:flex-1">
                <h2 className="font-serif text-2xl text-primary md:text-3xl">Tournament Packet & Registration</h2>
                <p className="mt-2 text-muted-foreground">
                  Everything you need to join us on the course.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
                <a
                  href={tournamentPacket.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <FileText className="h-4 w-4" /> Tournament Packet (PDF)
                </a>
                <a
                  href="https://wl.donorperfect.net/weblink/weblink.aspx?name=E333149&id=16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary/5"
                >
                  <ExternalLink className="h-4 w-4" /> Register Online
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SponsorsSection />

      <GolfGallery />

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

type Sponsor = { name: string; logo?: string | null; url?: string; tight?: boolean; type?: string };

import afcuTitleLogo from "@/assets/sponsors/afcu-title.png.asset.json";

const titleSponsor: Sponsor | null = {
  name: "America First Credit Union",
  logo: afcuTitleLogo.url,
  url: "https://www.americafirst.com",
};

import firstCommunityBankLogo from "@/assets/sponsors/first-community-bank.jpg.asset.json";
import goldenwestLogo from "@/assets/sponsors/goldenwest.jpg.asset.json";
import hoganConstructionLogo from "@/assets/sponsors/hogan-construction.png.asset.json";
import wasatchPeaksLogo from "@/assets/sponsors/wasatch-peaks.jpg.asset.json";
import hallFoundationLogo from "@/assets/sponsors/hall-foundation.jpg.asset.json";
import mountainAmericaLogo from "@/assets/sponsors/mountain-america.png.asset.json";
import grantTruckingLogo from "@/assets/sponsors/grant-trucking.png.asset.json";
import overlandWestLogo from "@/assets/sponsors/overland-west.png.asset.json";
import ogdenSchoolFoundationLogo from "@/assets/sponsors/ogden-school-foundation.png.asset.json";
import friendsCjcLogo from "@/assets/sponsors/friends-cjc.png.asset.json";
import edwardJonesLogo from "@/assets/sponsors/edward-jones.png.asset.json";
import alphiaLogo from "@/assets/sponsors/alphia.png.asset.json";
import gmreLogo from "@/assets/sponsors/gmre.png.asset.json";
import hansenAssociatesLogo from "@/assets/sponsors/hansen-associates.jpg.asset.json";
import weberSchoolFoundationLogo from "@/assets/sponsors/weber-school-foundation.jpeg.asset.json";
import swansonFamilyFoundationLogo from "@/assets/sponsors/swanson-family-foundation.jpeg.asset.json";
import elliottHallLogo from "@/assets/sponsors/elliott-hall.jpeg.asset.json";
import ascentLogo from "@/assets/sponsors/ascent-credit-union.png.asset.json";
import grainCraftLogo from "@/assets/sponsors/grain-craft.png.asset.json";

const premierSponsors: Sponsor[] = [
  { name: "The Alan & Jeanne Hall Foundation", type: "Clubhouse Sponsor", logo: hallFoundationLogo.url },
  { name: "First Community Bank", type: "Executive Sponsor", logo: firstCommunityBankLogo.url },
  { name: "Goldenwest Credit Union", type: "Putting Green Sponsor", logo: goldenwestLogo.url },
  { name: "Hogan & Associates Construction", type: "Breakfast Sponsor", logo: hoganConstructionLogo.url, tight: true },
  { name: "O-Tech", type: "Swag Bag / Golf Ball Sponsor", logo: null },
  { name: "Ascent Credit Union", type: "Cart & Lucky Day Sponsor", logo: ascentLogo.url, tight: true },
  { name: "Weber School Foundation", type: "Hole-in-One Sponsor", logo: weberSchoolFoundationLogo.url },
  { name: "Wasatch Peaks Credit Union", type: "Lunch Sponsor", logo: wasatchPeaksLogo.url },
];

const teamHoleSponsors: Sponsor[] = [
  { name: "Alphia", logo: alphiaLogo.url },
  { name: "Elliott Hall Companies", logo: elliottHallLogo.url },
  { name: "George E. Wahlen Ogden Veterans Home" },
  { name: "GMRE", logo: gmreLogo.url },
  { name: "Grant Trucking", logo: grantTruckingLogo.url },
  { name: "Kihomac" },
  { name: "Mountain America Credit Union", logo: mountainAmericaLogo.url },
  { name: "Overland West", logo: overlandWestLogo.url },
];

const teamSponsors: Sponsor[] = [
  { name: "Advanced Research Institute" },
  { name: "Bank of Utah" },
  { name: "GMRE", logo: gmreLogo.url },
  { name: "Hogan & Associates Construction", logo: hoganConstructionLogo.url, tight: true },
  { name: "PowerQuip" },
  { name: "Progressive Clinical Research" },
  { name: "Reaveley Engineers" },
  { name: "Richards Sheet Metal Works" },
  { name: "Staker Parson Materials & Construction" },
  { name: "Tukios Tribute Videos" },
  { name: "Utah Hospital Association" },
  { name: "Weber County Commissioner's Office" },
  { name: "Weber County Sheriff's Office Foundation" },
  { name: "Weber Human Services" },
];

const holeSponsors: Sponsor[] = [
  { name: "Grizzly Graphics" },
  { name: "Ogden School Foundation", logo: ogdenSchoolFoundationLogo.url },
  { name: "Friends of the Weber-Morgan Children's Justice Center", logo: friendsCjcLogo.url },
  { name: "Edward Jones Investments", logo: edwardJonesLogo.url },
  { name: "Hansen & Associates — American Family Insurance", logo: hansenAssociatesLogo.url },
  { name: "Dr. W. C. Swanson Family Foundation", logo: swansonFamilyFoundationLogo.url },
  { name: "Grain Craft", logo: grainCraftLogo.url },
];

const raffleSponsors: Sponsor[] = [
  { name: "George S. Eccles Dinosaur Park" },
  { name: "Hilton Garden Inn" },
  { name: "Ogden Pizzeria" },
  { name: "Weber County Commissioners Office" },
  { name: "Wolf Creek Golf Course" },
];


function SponsorCard({ sponsor, size = "md" }: { sponsor: Sponsor; size?: "lg" | "md" | "sm" }) {
  const baseDims =
    size === "lg"
      ? "h-40 md:h-56"
      : size === "md"
        ? "h-36 md:h-44"
        : "h-20 md:h-24";
  const pad = sponsor.tight
    ? "p-1"
    : size === "lg" ? "p-8" : size === "md" ? "p-6" : "p-4";

  const text =
    size === "lg" ? "text-2xl md:text-3xl font-serif" : size === "md" ? "text-base font-semibold" : "text-sm font-medium";
  const inner = (
    <div className={`flex w-full items-center justify-center rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition hover:shadow-md ${baseDims} ${pad}`}>
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
            <div className="mx-auto grid max-w-5xl grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {premierSponsors.map((s) => (
                <div key={s.name} className="flex w-full flex-col items-center">
                  {s.type && (
                    <div className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-ember">{s.type}</div>
                  )}
                  <SponsorCard sponsor={s} size="md" />
                </div>
              ))}
            </div>
          </div>
        )}

        {teamHoleSponsors.length > 0 && (
          <div className="mb-14">
            <div className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Team / Hole Sponsors</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {teamHoleSponsors.map((s) => (
                <SponsorCard key={s.name} sponsor={s} size="sm" />
              ))}
            </div>
          </div>
        )}

        {teamSponsors.length > 0 && (
          <div className="mb-14">
            <div className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Team Sponsors</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {teamSponsors.map((s) => (
                <SponsorCard key={s.name} sponsor={s} size="sm" />
              ))}
            </div>
          </div>
        )}

        {holeSponsors.length > 0 && (
          <div className="mb-14">
            <div className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Hole Sponsors</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {holeSponsors.map((s) => (
                <SponsorCard key={s.name} sponsor={s} size="sm" />
              ))}
            </div>
          </div>
        )}

        {raffleSponsors.length > 0 && (
          <div>
            <div className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Raffle Sponsors</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {raffleSponsors.map((s) => (
                <SponsorCard key={s.name} sponsor={s} size="sm" />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
