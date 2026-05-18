import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { news } from "@/content/news";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Updates | Weber Human Services Foundation" },
      { name: "description", content: "Latest news, campaigns, and impact stories from the Weber Human Services Foundation in Ogden, Utah — funding mental health, aging, and recovery programs." },
      { property: "og:title", content: "News & Updates | Weber Human Services Foundation" },
      { property: "og:description", content: "Campaign announcements and stories from the Foundation across Weber County, Utah." },
      { property: "og:url", content: "https://whsf.accessmypage.online/news" },
    ],
    links: [{ rel: "canonical", href: "https://whsf.accessmypage.online/news" }],
  }),
  component: NewsPage,
});

function NewsPage() {
  const [email, setEmail] = useState("");
  const [signed, setSigned] = useState(false);

  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">{news.hero.eyebrow}</div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{news.hero.title}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.posts.map((p, i) => (
            <article key={i} className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1">
              <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-sky via-accent to-cream" />
              <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-wider">
                <span className="text-ember">{p.category}</span>
                <span className="text-muted-foreground">{p.date}</span>
              </div>
              <h3 className="mt-3 font-serif text-xl">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
              <a href={p.url} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-ember">
                {news.readMoreLabel} <ArrowRight className="h-4 w-4" />
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
                eyebrow={news.newsletter.eyebrow}
                title={news.newsletter.title}
                description={news.newsletter.description}
              />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setSigned(true); }} className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={news.newsletter.placeholder}
                  className="w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-3 pl-11 text-sm text-primary-foreground placeholder:text-primary-foreground/50"
                />
              </div>
              <button className="rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ember-foreground">
                {signed ? news.newsletter.successLabel : news.newsletter.submitLabel}
              </button>
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
