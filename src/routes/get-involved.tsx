import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Gift, HandHeart } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { getInvolved } from "@/content/get-involved";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Get Involved — Weber Human Services Foundation" },
      { name: "description", content: "Support the Foundation through monetary donations, in-kind gifts, or by volunteering your time." },
      { property: "og:title", content: "Get Involved" },
      { property: "og:description", content: "Donate, give in-kind, or volunteer with the Foundation." },
    ],
  }),
  component: GetInvolvedPage,
});

const WAY_ICONS = [Heart, Gift, HandHeart];

function GetInvolvedPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">{getInvolved.hero.eyebrow}</div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{getInvolved.hero.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/90">{getInvolved.hero.body}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader eyebrow={getInvolved.waysHeading.eyebrow} title={getInvolved.waysHeading.title} />
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {getInvolved.ways.map((w, i) => {
            const Icon = WAY_ICONS[i] ?? Heart;
            const ctaClass =
              "mt-6 inline-flex items-center gap-2 self-start rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ember-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";
            return (
              <div key={w.title} className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-primary">{w.title}</h3>
                <p className="mt-3 flex-1 text-foreground/90">{w.body}</p>
                {w.ctaHref ? (
                  <a href={w.ctaHref} className={ctaClass}>
                    {w.ctaLabel}
                  </a>
                ) : w.ctaTo ? (
                  <Link to={w.ctaTo} className={ctaClass}>
                    {w.ctaLabel}
                  </Link>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
