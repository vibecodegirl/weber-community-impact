import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Repeat, Gift, Building2, Mail } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CAUSES } from "@/lib/causes";
import { donate } from "@/content/donate";
import { site } from "@/content/site";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Weber Human Services Foundation" },
      { name: "description", content: "Make a tax-deductible donation to the Weber Human Services Foundation. 100% of your gift stays local." },
      { property: "og:title", content: "Donate to the Foundation" },
      { property: "og:description", content: "Your gift fuels real outcomes for our neighbors." },
      { property: "og:url", content: "https://whsf.accessmypage.online/donate" },
    ],
    links: [{ rel: "canonical", href: "https://whsf.accessmypage.online/donate" }],
  }),
  component: DonatePage,
});

const OTHER_ICONS = [Repeat, Gift, Building2, Mail];

function DonatePage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">{donate.hero.eyebrow}</div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{donate.hero.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/85">{donate.hero.body}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader eyebrow={donate.giveNowHeading.eyebrow} title={donate.giveNowHeading.title} align="center" />
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
          {donate.tiers.map((t) => (
            <a key={t.value} href={site.donateUrl} className="group rounded-2xl border border-border bg-card p-7 text-center shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-ember">
              <div className="font-serif text-4xl text-primary">{t.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{t.description}</div>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2 text-sm font-semibold text-ember-foreground">
                <Heart className="h-4 w-4" /> {donate.giveLabelPrefix} {t.value}
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href={site.donateUrl} className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground">
            <Heart className="h-4 w-4" /> {donate.customAmountLabel}
          </a>
          <p className="mt-3 text-xs text-muted-foreground">{donate.processedNote}</p>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow={donate.designatedHeading.eyebrow} title={donate.designatedHeading.title} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CAUSES.map((c) => (
              <Link key={c.slug} to="/causes/$slug" params={{ slug: c.slug }} className="rounded-xl bg-card p-5 text-center shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1">
                <div className="font-serif text-base text-primary">{c.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader eyebrow={donate.otherWaysHeading.eyebrow} title={donate.otherWaysHeading.title} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {donate.otherWays.map((w, i) => {
            const Icon = OTHER_ICONS[i] ?? Heart;
            return (
              <div key={w.title} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-sky text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-serif text-lg">{w.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{w.body}</p>
              </div>
            );
          })}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">{donate.taxNote}</p>
      </section>
    </SiteLayout>
  );
}
