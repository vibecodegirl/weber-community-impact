import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { HandHeart, Users, Building2, Heart } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { getInvolved } from "@/content/get-involved";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Get Involved — Weber Human Services Foundation" },
      { name: "description", content: "Volunteer, partner, or give. There are many ways to support the Foundation's mission across Morgan and Weber Counties." },
      { property: "og:title", content: "Get Involved" },
      { property: "og:description", content: "Volunteer, partner, or give to the Foundation." },
    ],
  }),
  component: GetInvolvedPage,
});

const WAY_ICONS = [Heart, HandHeart, Users, Building2];

function GetInvolvedPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">{getInvolved.hero.eyebrow}</div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{getInvolved.hero.title}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader eyebrow={getInvolved.waysHeading.eyebrow} title={getInvolved.waysHeading.title} />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {getInvolved.ways.map((w, i) => {
            const Icon = WAY_ICONS[i] ?? Heart;
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
        <div className="mt-8">
          <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 font-semibold text-ember-foreground">
            <Heart className="h-4 w-4" /> {getInvolved.donateLabel}
          </Link>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 lg:px-8">
          <div>
            <SectionHeader eyebrow={getInvolved.volunteerHeading.eyebrow} title={getInvolved.volunteerHeading.title} />
            <ul className="mt-6 space-y-3">
              {getInvolved.volunteerOptions.map((v) => (
                <li key={v} className="rounded-xl bg-card p-4 shadow-[var(--shadow-soft)]">
                  <span className="text-foreground/85">{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="rounded-2xl bg-card p-8 shadow-[var(--shadow-soft)]">
            <h3 className="font-serif text-2xl text-primary">{getInvolved.volunteerForm.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{getInvolved.volunteerForm.description}</p>
            <div className="mt-6 grid gap-4">
              <input required placeholder={getInvolved.volunteerForm.nameLabel} className="rounded-lg border border-border bg-background px-4 py-3" />
              <input required type="email" placeholder={getInvolved.volunteerForm.emailLabel} className="rounded-lg border border-border bg-background px-4 py-3" />
              <input placeholder={getInvolved.volunteerForm.phoneLabel} className="rounded-lg border border-border bg-background px-4 py-3" />
              <textarea required rows={4} placeholder={getInvolved.volunteerForm.messageLabel} className="rounded-lg border border-border bg-background px-4 py-3" />
              <button type="submit" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
                {submitted ? getInvolved.volunteerForm.successLabel : getInvolved.volunteerForm.submitLabel}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader
          eyebrow={getInvolved.partners.eyebrow}
          title={getInvolved.partners.title}
          description={getInvolved.partners.description}
        />
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: getInvolved.partners.placeholderCount }).map((_, i) => (
            <div key={i} className="flex aspect-[3/2] items-center justify-center rounded-xl border border-border bg-card text-xs text-muted-foreground shadow-[var(--shadow-soft)]">
              {getInvolved.partners.placeholderLabel}
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
