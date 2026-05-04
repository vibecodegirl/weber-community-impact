import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/board")({
  head: () => ({
    meta: [
      { title: "Board & Leadership — Weber Human Services Foundation" },
      {
        name: "description",
        content:
          "Meet the volunteer board of directors leading the Weber Human Services Foundation — local leaders dedicated to Morgan and Weber Counties.",
      },
      { property: "og:title", content: "Board & Leadership" },
      {
        property: "og:description",
        content: "Local leaders volunteering their time to bridge the funding gap for human services.",
      },
    ],
  }),
  component: BoardPage,
});

const DIRECTORS = [
  {
    name: "Board Member",
    role: "Chair",
    affiliation: "Local Business Leader",
    bio: "Brings decades of community leadership and a passion for mental health advocacy to the Foundation's strategic direction.",
  },
  {
    name: "Board Member",
    role: "Vice Chair",
    affiliation: "Healthcare Executive",
    bio: "Champions integrated care and works to remove barriers between clinical services and the neighbors who need them.",
  },
  {
    name: "Board Member",
    role: "Treasurer",
    affiliation: "CPA, Local Firm",
    bio: "Stewards the Foundation's finances with transparency and ensures every donor dollar is accounted for.",
  },
  {
    name: "Board Member",
    role: "Secretary",
    affiliation: "Education Leader",
    bio: "Connects prevention programming with the schools and families across Morgan and Weber Counties.",
  },
  {
    name: "Board Member",
    role: "Director",
    affiliation: "Community Volunteer",
    bio: "A long-time volunteer focused on aging services and supporting our oldest neighbors with dignity.",
  },
  {
    name: "Board Member",
    role: "Director",
    affiliation: "Faith Community Leader",
    bio: "Bridges faith communities and recovery resources, helping reduce stigma around substance use treatment.",
  },
  {
    name: "Board Member",
    role: "Director",
    affiliation: "Weber Human Services Liaison",
    bio: "Ensures the Foundation's funding aligns directly with the most pressing needs identified by frontline staff.",
  },
  {
    name: "Board Member",
    role: "Director",
    affiliation: "Local Attorney",
    bio: "Provides governance and compliance guidance, keeping the Foundation accountable to its mission and donors.",
  },
];

function BoardPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">
            Board & Leadership
          </div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            Local leaders, volunteering their time for our neighbors.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">
            Our board of directors is made up of people who live, work, and serve in Morgan and Weber
            Counties. Every member volunteers their time and expertise — no board member is compensated.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader eyebrow="Directors" title="Meet the board" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DIRECTORS.map((d, i) => (
            <article
              key={i}
              className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
            >
              <div className="aspect-square rounded-xl bg-gradient-to-br from-sky to-accent" />
              <div className="mt-4 font-serif text-xl">{d.name}</div>
              <div className="text-sm font-semibold text-ember">{d.role}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {d.affiliation}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{d.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2 md:items-center lg:px-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
              Join the board
            </div>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">
              Interested in serving your community?
            </h2>
            <p className="mt-4 text-muted-foreground">
              We periodically welcome new directors who bring fresh perspective and a commitment to
              human services in our region. Reach out to learn about open seats and the nomination
              process.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
            >
              <Mail className="h-4 w-4" /> Contact the board
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
