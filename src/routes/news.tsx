import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — Weber Human Services Foundation" },
      {
        name: "description",
        content: "Updates, campaign announcements, and stories from the Foundation.",
      },
      { property: "og:title", content: "News" },
      { property: "og:description", content: "Updates and stories from the Foundation." },
    ],
  }),
  component: NewsPage,
});

const POSTS = [
  { cat: "Campaign", date: "Apr 28, 2026", title: "Spring Campaign exceeds $250K goal", excerpt: "Thanks to 1,800 donors across our two counties, we surpassed our spring fundraising goal in record time." },
  { cat: "Story", date: "Apr 12, 2026", title: "How peer recovery coaches change lives", excerpt: "An inside look at the recovery model the Foundation funds — and why peer support works." },
  { cat: "Announcement", date: "Mar 30, 2026", title: "New scholarship for caregiving education", excerpt: "We're proud to launch a new scholarship for WHS staff pursuing certifications in caregiving and clinical support." },
  { cat: "Event", date: "Mar 15, 2026", title: "Save the date: Hope Gala 2026", excerpt: "Our signature evening returns September 14. Tables and sponsorships open soon." },
  { cat: "Story", date: "Feb 22, 2026", title: "Aging in place, with dignity", excerpt: "How respite care funded by the Foundation helps families keep their loved ones at home." },
  { cat: "Update", date: "Feb 4, 2026", title: "2025 Annual Report is here", excerpt: "Read the full breakdown of programs, outcomes, and stewardship from last year." },
];

function NewsPage() {
  const [email, setEmail] = useState("");
  const [signed, setSigned] = useState(false);

  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">News</div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            What's happening at the <em className="text-sky">Foundation</em>.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((p, i) => (
            <article key={i} className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1">
              <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-sky via-accent to-cream" />
              <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-wider">
                <span className="text-ember">{p.cat}</span>
                <span className="text-muted-foreground">{p.date}</span>
              </div>
              <h3 className="mt-3 font-serif text-xl">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
              <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-ember">
                Read more <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="rounded-3xl bg-primary p-10 text-primary-foreground md:p-16">
          <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
            <div>
              <SectionHeader
                eyebrow="Newsletter"
                title={<>Stay close to the <em>work</em>.</>}
                description="Quarterly stories, campaign updates, and event invitations — straight to your inbox."
              />
            </div>
            <form
              onSubmit={(e) => { e.preventDefault(); setSigned(true); }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-3 pl-11 text-sm text-primary-foreground placeholder:text-primary-foreground/50"
                />
              </div>
              <button className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ember-foreground">
                {signed ? "Subscribed ✓" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
