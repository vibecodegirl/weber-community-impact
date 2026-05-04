import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, Heart, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { CAUSES, getCause } from "@/lib/causes";
import { causesPage } from "@/content/causes-page";

export const Route = createFileRoute("/causes/$slug")({
  loader: ({ params }) => {
    const cause = getCause(params.slug);
    if (!cause) throw notFound();
    return { cause };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.cause.title} — Weber Human Services Foundation` },
          { name: "description", content: loaderData.cause.description },
          { property: "og:title", content: loaderData.cause.title },
          { property: "og:description", content: loaderData.cause.tagline },
          { property: "og:image", content: loaderData.cause.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="font-serif text-4xl">Cause not found</h1>
        <Link to="/causes" className="mt-6 inline-flex text-primary underline">View all causes</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="font-serif text-3xl">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
      </div>
    </SiteLayout>
  ),
  component: CauseDetail,
});

function CauseDetail() {
  const { cause } = Route.useLoaderData();
  const others = CAUSES.filter((c) => c.slug !== cause.slug).slice(0, 3);
  const c = causesPage.detail;

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 -z-10 opacity-30">
          <img src={cause.image} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <Link to="/causes" className="text-sm uppercase tracking-[0.2em] text-sky hover:underline">{c.backLabel}</Link>
          <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{cause.title}</h1>
          <p className="mt-4 max-w-xl text-lg text-primary-foreground/85">{cause.tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-pretty text-lg text-foreground/80 md:text-xl">{cause.description}</p>
            <h2 className="mt-12 font-serif text-2xl text-primary">{c.programsHeading}</h2>
            <ul className="mt-5 space-y-3">
              {cause.programs.map((p) => (
                <li key={p} className="flex items-start gap-3 rounded-xl bg-cream p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ember" />
                  <span className="text-foreground/85">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <h3 className="font-serif text-xl">{c.outcomesHeading}</h3>
              <dl className="mt-4 space-y-4">
                {cause.outcomes.map((o) => (
                  <div key={o.label} className="border-b border-border pb-3 last:border-0 last:pb-0">
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">{o.label}</dt>
                    <dd className="font-serif text-3xl text-primary">{o.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
              <h3 className="font-serif text-xl">{c.fundCard.title}</h3>
              <p className="mt-2 text-sm text-primary-foreground/80">{c.fundCard.body}</p>
              <Link to="/donate" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ember px-5 py-3 font-semibold text-ember-foreground">
                <Heart className="h-4 w-4" /> {c.fundCard.buttonLabel}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="font-serif text-3xl text-primary">{c.relatedHeading}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} to="/causes/$slug" params={{ slug: o.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={o.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="font-serif text-lg">{o.title}</div>
                  <div className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-ember">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
