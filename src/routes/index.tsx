import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Heart, HandHeart, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { CAUSES } from "@/lib/causes";
import mountains from "@/assets/mountains.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Weber Human Services Foundation — Bridging the gap, one person at a time" },
      {
        name: "description",
        content:
          "A nonprofit foundation supporting clients and programs of Weber Human Services across Morgan and Weber Counties. Help us bridge the gap between need and funding.",
      },
      { property: "og:title", content: "Weber Human Services Foundation" },
      {
        property: "og:description",
        content: "Bridging the gap between client needs and available funding — one person at a time.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <HeroCarousel />

      {/* WHO WHAT WHY */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow="The Foundation"
          title={<>Local people. <em className="font-serif">Lasting</em> impact.</>}
          description="A nonprofit comprised of community members from local organizations, dedicated to supporting the clients and programs of Weber Human Services."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              icon: HandHeart,
              eyebrow: "Who we are",
              title: "Neighbors helping neighbors",
              body: "A volunteer board of local leaders dedicated to the work of Weber Human Services and the people it serves.",
            },
            {
              icon: Heart,
              eyebrow: "What we do",
              title: "We bridge the funding gap",
              body: "We raise and steward charitable contributions to fill the spaces Medicaid and Medicare leave behind.",
            },
            {
              icon: Sparkles,
              eyebrow: "Why we do it",
              title: "So lives can be rebuilt",
              body: "We help clients and families access the services they need to lead healthy, successful, connected lives.",
            },
          ].map((card) => (
            <div
              key={card.eyebrow}
              className="group rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky text-primary">
                <card.icon className="h-6 w-6" />
              </div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">
                {card.eyebrow}
              </div>
              <h3 className="mt-2 font-serif text-2xl">{card.title}</h3>
              <p className="mt-3 text-muted-foreground">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CAUSES */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow="Five focus areas"
              title={<>Where your gift <em>goes to work</em>.</>}
              description="Every dollar funds a specific need within our community — directly tied to outcomes."
            />
            <Link
              to="/causes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-ember"
            >
              View all causes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CAUSES.map((cause, i) => (
              <Link
                key={cause.slug}
                to="/causes/$slug"
                params={{ slug: cause.slug }}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)] ${
                  i === 0 ? "lg:col-span-2 lg:row-span-1" : ""
                }`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={cause.image}
                    alt=""
                    width={1280}
                    height={960}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl">{cause.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{cause.tagline}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-ember">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT STORY */}
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 rounded-3xl bg-primary p-8 text-primary-foreground md:grid-cols-2 md:p-14 lg:p-20">
          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-sky">
              An Impact Story
            </div>
            <blockquote className="font-serif text-3xl leading-snug md:text-4xl">
              "I didn't think anyone could help me. The Foundation paid for the therapy that gave
              me my life back."
            </blockquote>
            <p className="mt-6 text-primary-foreground/75">
              — Maria, mental health client, age 34
            </p>
            <Link
              to="/impact"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-semibold transition-colors hover:bg-primary-foreground/10"
            >
              Read more stories <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 self-center sm:gap-6">
            {[
              { v: "10,000+", l: "lives touched in 2024" },
              { v: "$1.4M", l: "stewarded for direct client care" },
              { v: "5", l: "focus areas of impact" },
              { v: "100%", l: "of your gift stays local" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl bg-primary-foreground/5 p-6 backdrop-blur">
                <div className="font-serif text-3xl text-sky md:text-4xl">{s.v}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-primary-foreground/70">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARENT ORG */}
      <section
        className="relative isolate overflow-hidden bg-primary text-primary-foreground"
      >
        <div className="absolute inset-0 -z-10 opacity-25">
          <img src={mountains} alt="" loading="lazy" width={1920} height={800} className="h-full w-full object-cover" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:grid-cols-[1.2fr_1fr] md:items-center lg:px-8">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">
              Proudly partnered with <em className="text-sky">Weber Human Services</em>
            </h2>
            <p className="mt-4 max-w-xl text-primary-foreground/80">
              The Foundation exists to amplify the work of Weber Human Services — the public agency
              providing mental health, substance use, and aging services across our two counties.
            </p>
          </div>
          <div className="flex md:justify-end">
            <a
              href="https://www.weberhs.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-sky px-7 py-3.5 text-sm font-semibold text-primary transition-transform hover:scale-[1.03]"
            >
              Visit weberhs.net <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-8">
        <h2 className="mx-auto max-w-3xl text-balance font-serif text-3xl md:text-5xl">
          Be the bridge for someone who needs one.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground md:text-lg">
          Your gift becomes therapy, recovery, dignity, hope — for a real person, in your community.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 rounded-full bg-ember px-8 py-4 font-semibold text-ember-foreground shadow-[var(--shadow-elevated)] transition-transform hover:scale-[1.03]"
          >
            <Heart className="h-4 w-4" /> Donate
          </Link>
          <Link
            to="/get-involved"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-4 font-semibold text-primary"
          >
            Volunteer with us
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
