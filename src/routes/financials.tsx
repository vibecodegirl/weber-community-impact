import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FileText, Download, ShieldCheck } from "lucide-react";
import { financials } from "@/content/financials";

export const Route = createFileRoute("/financials")({
  head: () => ({
    meta: [
      { title: "Financials & IRS 990s | Weber Human Services Foundation" },
      { name: "description", content: "Annual reports, IRS Form 990s, and financial transparency for the Weber Human Services Foundation — a 501(c)(3) serving Morgan & Weber Counties, Utah." },
      { property: "og:title", content: "Financials & IRS 990s | Weber Human Services Foundation" },
      { property: "og:description", content: "Annual reports and IRS Form 990s from the Foundation. Full financial transparency." },
      { property: "og:url", content: "https://whsf.accessmypage.online/financials" },
    ],
    links: [{ rel: "canonical", href: "https://whsf.accessmypage.online/financials" }],
  }),
  component: FinancialsPage,
});

function FinancialsPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">{financials.hero.eyebrow}</div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{financials.hero.title}</h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">{financials.hero.body}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader eyebrow={financials.allocationHeading.eyebrow} title={financials.allocationHeading.title} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {financials.allocation.map((a) => (
            <div key={a.label} className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
              <div className="font-serif text-5xl text-primary">{a.value}%</div>
              <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-ember">{a.label}</div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-ember" style={{ width: `${a.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow={financials.documentsHeading.eyebrow} title={financials.documentsHeading.title} />
          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
            <ul className="divide-y divide-border">
              {financials.documents.map((doc, i) => (
                <li key={i} className="flex items-center justify-between gap-4 px-6 py-5 hover:bg-muted/40">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky/30 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-serif text-lg">{doc.year} {doc.type}</div>
                      <div className="text-xs text-muted-foreground">{doc.note}</div>
                    </div>
                  </div>
                  <a href={doc.url} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground">
                    <Download className="h-4 w-4" /> {financials.downloadLabel}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="rounded-3xl bg-primary p-10 text-primary-foreground md:p-16">
          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-sky/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky">
                <ShieldCheck className="h-4 w-4" /> {financials.questionsCta.badge}
              </div>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl">{financials.questionsCta.title}</h2>
              <p className="mt-4 max-w-xl text-primary-foreground/80">{financials.questionsCta.body}</p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-sky px-6 py-3 font-semibold text-primary">
                {financials.questionsCta.buttonLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
