import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Heart, HandHeart, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { CAUSES } from "@/lib/causes";
import { home } from "@/content/home";
import { site } from "@/content/site";
import mountains from "@/assets/mountains.jpg";

const ICONS = [HandHeart, Heart, Sparkles];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Weber Human Services Foundation | Morgan & Weber Counties" },
      {
        name: "description",
        content:
          "A nonprofit foundation supporting clients and programs of Weber Human Services across Morgan and Weber Counties. Help us bridge the gap between need and funding.",
      },
      { property: "og:title", content: "Weber Human Services Foundation — Supporting Northern Utah" },
      { property: "og:description", content: site.tagline },
      { property: "og:url", content: "https://whsf.accessmypage.online/" },
    ],
    links: [
      { rel: "canonical", href: "https://whsf.accessmypage.online/" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <HeroCarousel />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <SectionHeader
          eyebrow={home.intro.eyebrow}
          title={home.intro.title}
          description={home.intro.description}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {home.intro.cards.map((card, i) => {
            const Icon = ICONS[i] ?? Sparkles;
            return (
              <div
                key={card.eyebrow}
                className="group rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-sky text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-ember">{card.eyebrow}</div>
                <h3 className="mt-2 font-serif text-2xl">{card.title}</h3>
                <p className="mt-3 text-muted-foreground">{card.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader
              eyebrow={home.causes.eyebrow}
              title={home.causes.title}
              description={home.causes.description}
            />
            <Link
              to="/causes"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-ember"
            >
              {home.causes.viewAllLabel} <ArrowRight className="h-4 w-4" />
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
                  <img src={cause.image} alt="" width={1280} height={960} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
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

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 rounded-3xl bg-primary p-8 text-primary-foreground md:grid-cols-2 md:p-14 lg:p-20">
          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-sky">{home.story.eyebrow}</div>
            <blockquote className="font-serif text-3xl leading-snug md:text-4xl">"{home.story.quote}"</blockquote>
            <p className="mt-6 text-primary-foreground/75">{home.story.attribution}</p>
            <Link to="/impact" className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-sm font-semibold transition-colors hover:bg-primary-foreground/10">
              {home.story.ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 self-center sm:gap-6">
            {home.story.stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-primary-foreground/5 p-6 backdrop-blur">
                <div className="font-serif text-3xl text-sky md:text-4xl">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-primary-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 -z-10 opacity-25">
          <img src={mountains} alt="" loading="lazy" width={1920} height={800} className="h-full w-full object-cover" />
        </div>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:grid-cols-[1.2fr_1fr] md:items-center lg:px-8">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl">{home.parentOrg.title}</h2>
            <p className="mt-4 max-w-xl text-primary-foreground/80">{home.parentOrg.body}</p>
          </div>
          <div className="flex md:justify-end">
            <a
              href={site.parentOrg.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-sky px-7 py-3.5 text-sm font-semibold text-primary transition-transform hover:scale-[1.03]"
            >
              {home.parentOrg.ctaLabel} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 text-center lg:px-8">
        <h2 className="mx-auto max-w-3xl text-balance font-serif text-3xl md:text-5xl">{home.cta.title}</h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground md:text-lg">{home.cta.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 rounded-full bg-ember px-8 py-4 font-semibold text-ember-foreground shadow-[var(--shadow-elevated)] transition-transform hover:scale-[1.03]"
          >
            <Heart className="h-4 w-4" /> {home.cta.primaryLabel}
          </Link>
          <Link
            to="/get-involved"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-4 font-semibold text-primary"
          >
            {home.cta.secondaryLabel}
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
