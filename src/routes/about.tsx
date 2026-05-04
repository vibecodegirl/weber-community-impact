import { Link, createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { ArrowRight, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Weber Human Services Foundation" },
      {
        name: "description",
        content:
          "Learn about the Weber Human Services Foundation board, mission, and our commitment to financial transparency in supporting Morgan and Weber Counties.",
      },
      { property: "og:title", content: "About the Foundation" },
      {
        property: "og:description",
        content: "A nonprofit board of local leaders supporting Weber Human Services.",
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { t: "Integrity", b: "Every dollar is stewarded with transparency and care." },
  { t: "Compassion", b: "We meet our neighbors where they are, without judgment." },
  { t: "Partnership", b: "We amplify the work of Weber Human Services and local partners." },
  { t: "Outcomes", b: "We measure success in lives changed, not dollars raised." },
];

const BOARD = [
  { name: "Board Member", role: "Chair" },
  { name: "Board Member", role: "Vice Chair" },
  { name: "Board Member", role: "Treasurer" },
  { name: "Board Member", role: "Secretary" },
  { name: "Board Member", role: "Director" },
  { name: "Board Member", role: "Director" },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">
            About the Foundation
          </div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            We exist so that no neighbor is turned away from the help they need.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">
            The Weber Human Services Foundation is a 501(c)(3) nonprofit comprised of a group of
            individuals from local organizations who are dedicated to supporting the clients and
            programs offered at Weber Human Services.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {[
            { e: "Who we are", t: "A local board of local people." , b: "Our directors live, work, and raise families in Morgan and Weber Counties. We know our neighbors because they are our neighbors."},
            { e: "What we do", t: "We bridge the funding gap.", b: "We raise charitable contributions and direct them to the programs and clients of Weber Human Services where the need is greatest." },
            { e: "Why we do it", t: "Because lives depend on it.", b: "Healthy, successful lives are built on access — to therapy, recovery, dignity, and connection. The Foundation makes that access possible." },
          ].map((c) => (
            <div key={c.e} className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">{c.e}</div>
              <h3 className="mt-2 font-serif text-2xl">{c.t}</h3>
              <p className="mt-3 text-muted-foreground">{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader
            eyebrow="Our values"
            title={<>How we <em>show up</em> for our community.</>}
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.t} className="rounded-2xl bg-card p-6 shadow-[var(--shadow-soft)]">
                <div className="font-serif text-xl text-primary">{v.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{v.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader eyebrow="Leadership" title="Our board of directors" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {BOARD.map((b, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-sky to-accent" />
              <div className="mt-4 font-serif text-xl">{b.name}</div>
              <div className="text-sm text-ember">{b.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
        <div className="rounded-3xl bg-primary p-10 text-primary-foreground md:p-16">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl">Financial transparency</h2>
              <p className="mt-4 max-w-xl text-primary-foreground/80">
                We are proud to publish our annual reports and IRS Form 990s. Every gift is tracked,
                stewarded, and reported on publicly.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/impact" className="inline-flex items-center gap-2 rounded-full bg-sky px-6 py-3 font-semibold text-primary">
                Annual report <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 font-semibold text-ember-foreground">
                <Heart className="h-4 w-4" /> Donate
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
