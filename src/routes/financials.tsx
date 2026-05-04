import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { FileText, Download, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/financials")({
  head: () => ({
    meta: [
      { title: "Financials & 990s — Weber Human Services Foundation" },
      {
        name: "description",
        content:
          "Annual reports, IRS Form 990s, and financial statements for the Weber Human Services Foundation. We believe in full transparency.",
      },
      { property: "og:title", content: "Financial Transparency" },
      {
        property: "og:description",
        content: "Annual reports and IRS Form 990s for the Weber Human Services Foundation.",
      },
    ],
  }),
  component: FinancialsPage,
});

const DOCUMENTS = [
  { year: "2024", type: "Annual Report", size: "PDF · Coming soon" },
  { year: "2024", type: "IRS Form 990", size: "PDF · Coming soon" },
  { year: "2023", type: "Annual Report", size: "PDF · Coming soon" },
  { year: "2023", type: "IRS Form 990", size: "PDF · Coming soon" },
  { year: "2022", type: "Annual Report", size: "PDF · Coming soon" },
  { year: "2022", type: "IRS Form 990", size: "PDF · Coming soon" },
];

const ALLOCATION = [
  { label: "Direct client programs", value: 82 },
  { label: "Fundraising", value: 11 },
  { label: "Administration", value: 7 },
];

function FinancialsPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">
            Financial Transparency
          </div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            Every dollar accounted for. Every report public.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-primary-foreground/80">
            The Weber Human Services Foundation is a 501(c)(3) nonprofit. We publish our annual
            reports and IRS Form 990s so donors can see exactly how their generosity is put to work.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <SectionHeader eyebrow="How funds are used" title="Where your gift goes" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {ALLOCATION.map((a) => (
            <div key={a.label} className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
              <div className="font-serif text-5xl text-primary">{a.value}%</div>
              <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-ember">
                {a.label}
              </div>
              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-ember" style={{ width: `${a.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader eyebrow="Documents" title="Annual reports & 990s" />
          <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
            <ul className="divide-y divide-border">
              {DOCUMENTS.map((doc, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-4 px-6 py-5 hover:bg-muted/40"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky/30 text-primary">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-serif text-lg">
                        {doc.year} {doc.type}
                      </div>
                      <div className="text-xs text-muted-foreground">{doc.size}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Download className="h-4 w-4" /> Download
                  </button>
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
                <ShieldCheck className="h-4 w-4" /> 501(c)(3) Public Charity
              </div>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl">
                Have a question about our finances?
              </h2>
              <p className="mt-4 max-w-xl text-primary-foreground/80">
                We welcome donor questions. Contact our treasurer for additional financial detail or
                to request a specific year's filing.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-sky px-6 py-3 font-semibold text-primary"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
