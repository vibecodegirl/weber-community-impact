import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Gift, HandHeart } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { getInvolved } from "@/content/get-involved";
import { site } from "@/content/site";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Volunteer or Donate | Weber Human Services Foundation" },
      { name: "description", content: "Three ways to support the Weber Human Services Foundation: donate, give in-kind, or volunteer your time across Morgan & Weber Counties, Utah." },
      { property: "og:title", content: "Get Involved — Volunteer or Donate" },
      { property: "og:description", content: "Donate, give in-kind, or volunteer with the Weber Human Services Foundation in Ogden, Utah." },
      { property: "og:url", content: "https://whsf.accessmypage.online/get-involved" },
    ],
    links: [{ rel: "canonical", href: "https://whsf.accessmypage.online/get-involved" }],
  }),
  component: GetInvolvedPage,
});

const WAY_ICONS = [Heart, Gift, HandHeart];

type PanelType = "contact" | "volunteer" | null;

function GetInvolvedPage() {
  const [panel, setPanel] = useState<PanelType>(null);
  const [sent, setSent] = useState(false);

  const openPanel = (type: Exclude<PanelType, null>) => {
    setSent(false);
    setPanel(type);
  };

  const closePanel = (open: boolean) => {
    if (!open) {
      setPanel(null);
      setSent(false);
    }
  };

  const isContact = panel === "contact";
  const panelTitle = isContact ? "Contact the Foundation" : "Volunteer inquiry";
  const panelDescription = isContact
    ? "Send us a note about in-kind donations or anything else — we'll reply within a few business days."
    : "Tell us a bit about yourself and we'll match you with a volunteer opportunity that fits.";

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

            // Open slide-out panels for contact/volunteer CTAs instead of routing/mailto.
            const opensContactPanel = w.ctaTo === "/contact";
            const opensVolunteerPanel = typeof w.ctaHref === "string" && w.ctaHref.startsWith("mailto:");

            return (
              <div key={w.title} className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-serif text-2xl text-primary">{w.title}</h3>
                <p className="mt-3 flex-1 text-foreground/90">{w.body}</p>
                {opensContactPanel ? (
                  <button type="button" onClick={() => openPanel("contact")} className={ctaClass}>
                    {w.ctaLabel}
                  </button>
                ) : opensVolunteerPanel ? (
                  <button type="button" onClick={() => openPanel("volunteer")} className={ctaClass}>
                    {w.ctaLabel}
                  </button>
                ) : w.ctaHref ? (
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

      <Sheet open={panel !== null} onOpenChange={closePanel}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="font-serif text-2xl text-primary">{panelTitle}</SheetTitle>
            <SheetDescription>{panelDescription}</SheetDescription>
          </SheetHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mt-6 grid gap-4"
          >
            <input
              required
              placeholder="Full name"
              className="rounded-lg border border-border bg-background px-4 py-3 text-foreground"
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="rounded-lg border border-border bg-background px-4 py-3 text-foreground"
            />
            <input
              type="tel"
              placeholder="Phone (optional)"
              className="rounded-lg border border-border bg-background px-4 py-3 text-foreground"
            />
            {isContact ? (
              <input
                placeholder="Subject"
                className="rounded-lg border border-border bg-background px-4 py-3 text-foreground"
              />
            ) : (
              <input
                placeholder="Availability / interests"
                className="rounded-lg border border-border bg-background px-4 py-3 text-foreground"
              />
            )}
            <textarea
              required
              rows={5}
              placeholder={isContact ? "Your message" : "Tell us about your skills and what you'd like to help with"}
              className="rounded-lg border border-border bg-background px-4 py-3 text-foreground"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {sent ? "Thank you — we'll be in touch!" : "Send message"}
            </button>
            <p className="text-xs text-muted-foreground">
              Or email us directly at{" "}
              <a className="underline" href={`mailto:${site.contact.email}`}>
                {site.contact.email}
              </a>
              .
            </p>
          </form>
        </SheetContent>
      </Sheet>
    </SiteLayout>
  );
}
