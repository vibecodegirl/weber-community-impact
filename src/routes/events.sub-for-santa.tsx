import { createFileRoute, Link } from "@tanstack/react-router";
import { Gift, Calendar, ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { site } from "@/content/site";

export const Route = createFileRoute("/events/sub-for-santa")({
  head: () => ({
    meta: [
      { title: "Sub for Santa — Weber Human Services Foundation" },
      { name: "description", content: "Sponsor a family or donate gifts through the Weber Human Services Foundation Sub for Santa program." },
      { property: "og:title", content: "Sub for Santa" },
      { property: "og:description", content: "Bring holiday hope to local families." },
      { property: "og:url", content: "https://whsf.accessmypage.online/events/sub-for-santa" },
    ],
    links: [{ rel: "canonical", href: "https://whsf.accessmypage.online/events/sub-for-santa" }],
  }),
  component: SubForSantaPage,
});

function SubForSantaPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <Link to="/events" className="mb-6 inline-flex items-center gap-2 text-sm text-sky">
            <ArrowLeft className="h-4 w-4" /> All events
          </Link>
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">Holiday Program</div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">Sub for Santa</h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">
            Helping local families experience the joy and dignity of the holidays — one sponsored child at a time.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
            <Gift className="h-6 w-6 text-ember" />
            <div className="mt-3 font-serif text-2xl text-primary">Sponsor a family</div>
            <p className="mt-2 text-muted-foreground">
              Provide gifts, warm clothing, and essentials for a child or family identified through Weber Human Services case workers.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
            <Calendar className="h-6 w-6 text-ember" />
            <div className="mt-3 font-serif text-2xl text-primary">Holiday season</div>
            <p className="mt-2 text-muted-foreground">
              Sign-ups open each fall. Drop-offs and deliveries happen in early December.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-cream p-8">
          <h2 className="font-serif text-2xl text-primary">Get involved</h2>
          <p className="mt-3 text-foreground/80">
            Individuals, families, and businesses are all welcome to participate. Contact the Foundation to receive a family profile or to make a monetary contribution toward the program.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground">
              Contact us
            </Link>
            <a href={site.donateUrl} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ember-foreground">
              Donate
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
