import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Repeat, Gift, Building2, Mail } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { CAUSES } from "@/lib/causes";

// TODO: replace with real donation paywall URLs
const DONATE_URL = "#";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — Weber Human Services Foundation" },
      {
        name: "description",
        content:
          "Make a tax-deductible donation to the Weber Human Services Foundation. 100% of your gift stays local.",
      },
      { property: "og:title", content: "Donate to the Foundation" },
      { property: "og:description", content: "Your gift fuels real outcomes for our neighbors." },
    ],
  }),
  component: DonatePage,
});

function DonatePage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">Donate</div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            Your gift becomes <em className="text-sky">someone's turning point</em>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/85">
            Every dollar you give stays in Morgan and Weber Counties — funding therapy, recovery,
            dignity, and connection for your neighbors.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader eyebrow="Give now" title="Choose your gift" align="center" />
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-3">
          {[
            { v: "$50", l: "covers a therapy session" },
            { v: "$150", l: "funds a week of caregiver respite" },
            { v: "$500", l: "sponsors a recovery coach for a month" },
          ].map((t) => (
            <a
              key={t.v}
              href={DONATE_URL}
              className="group rounded-2xl border border-border bg-card p-7 text-center shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-ember"
            >
              <div className="font-serif text-4xl text-primary">{t.v}</div>
              <div className="mt-2 text-sm text-muted-foreground">{t.l}</div>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2 text-sm font-semibold text-ember-foreground">
                <Heart className="h-4 w-4" /> Give {t.v}
              </div>
            </a>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href={DONATE_URL} className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground">
            <Heart className="h-4 w-4" /> Choose a custom amount
          </a>
          <p className="mt-3 text-xs text-muted-foreground">
            Donations are processed securely through our giving partner.
          </p>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="Designated giving" title="Direct your gift to a cause" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CAUSES.map((c) => (
              <Link
                key={c.slug}
                to="/causes/$slug"
                params={{ slug: c.slug }}
                className="rounded-xl bg-card p-5 text-center shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1"
              >
                <div className="font-serif text-base text-primary">{c.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader eyebrow="Other ways to give" title="More than one way to make a difference" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Repeat, t: "Become a monthly donor", b: "Sustaining gifts let us plan further and serve more." },
            { icon: Gift, t: "Honor or memorial gifts", b: "Celebrate or remember someone you love." },
            { icon: Building2, t: "Stock & planned giving", b: "Tax-smart strategies for greater impact." },
            { icon: Mail, t: "Mail a check", b: "Made out to Weber Human Services Foundation." },
          ].map((w) => (
            <div key={w.t} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-sky text-primary">
                <w.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-serif text-lg">{w.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{w.b}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-muted-foreground">
          The Weber Human Services Foundation is a registered 501(c)(3) nonprofit. All donations are
          tax-deductible to the fullest extent allowed by law.
        </p>
      </section>
    </SiteLayout>
  );
}
