import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { HandHeart, Users, Building2, Heart } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Get Involved — Weber Human Services Foundation" },
      {
        name: "description",
        content:
          "Volunteer, partner, or give. There are many ways to support the Foundation's mission across Morgan and Weber Counties.",
      },
      { property: "og:title", content: "Get Involved" },
      { property: "og:description", content: "Volunteer, partner, or give to the Foundation." },
    ],
  }),
  component: GetInvolvedPage,
});

const WAYS = [
  { icon: Heart, t: "One-time gift", b: "A single gift of any size makes an immediate impact." },
  { icon: HandHeart, t: "Monthly giving", b: "Sustaining donors fuel year-round programs." },
  { icon: Users, t: "Honor & memorial", b: "Honor a loved one with a gift in their name." },
  { icon: Building2, t: "Corporate sponsorship", b: "Partner with us at our signature events." },
];

const VOLUNTEER = [
  "Event volunteer (Hope Gala, walks, picnics)",
  "Committee service (finance, events, outreach)",
  "Skills-based volunteering (legal, marketing, design)",
  "Holiday drives & in-kind donation organizing",
];

function GetInvolvedPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">
            Get Involved
          </div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            There are many ways to be the <em className="text-sky">bridge</em>.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader eyebrow="Ways to give" title="Choose how you want to make a difference" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WAYS.map((w) => (
            <div key={w.t} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-sky text-primary">
                <w.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 font-serif text-lg">{w.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{w.b}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/donate" className="inline-flex items-center gap-2 rounded-full bg-ember px-7 py-3.5 font-semibold text-ember-foreground">
            <Heart className="h-4 w-4" /> Donate
          </Link>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2 lg:px-8">
          <div>
            <SectionHeader eyebrow="Volunteer" title="Give your time and talent" />
            <ul className="mt-6 space-y-3">
              {VOLUNTEER.map((v) => (
                <li key={v} className="rounded-xl bg-card p-4 shadow-[var(--shadow-soft)]">
                  <span className="text-foreground/85">{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="rounded-2xl bg-card p-8 shadow-[var(--shadow-soft)]"
          >
            <h3 className="font-serif text-2xl text-primary">Volunteer interest form</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us how you'd like to help — we'll be in touch.
            </p>
            <div className="mt-6 grid gap-4">
              <input required placeholder="Full name" className="rounded-lg border border-border bg-background px-4 py-3" />
              <input required type="email" placeholder="Email" className="rounded-lg border border-border bg-background px-4 py-3" />
              <input placeholder="Phone (optional)" className="rounded-lg border border-border bg-background px-4 py-3" />
              <textarea required rows={4} placeholder="How would you like to help?" className="rounded-lg border border-border bg-background px-4 py-3" />
              <button type="submit" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
                {submitted ? "Thank you — we'll be in touch!" : "Submit interest"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader
          eyebrow="Partners"
          title="Corporate & community partners"
          description="We're grateful for the businesses and organizations that walk alongside us."
        />
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex aspect-[3/2] items-center justify-center rounded-xl border border-border bg-card text-xs text-muted-foreground shadow-[var(--shadow-soft)]">
              Partner Logo
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
