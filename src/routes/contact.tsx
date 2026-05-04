import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, AlertCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { contact } from "@/content/contact";
import { site } from "@/content/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Weber Human Services Foundation" },
      { name: "description", content: "Get in touch with the Weber Human Services Foundation. Serving Morgan and Weber Counties, Utah." },
      { property: "og:title", content: "Contact the Foundation" },
      { property: "og:description", content: "Reach out to the Weber Human Services Foundation." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">{contact.hero.eyebrow}</div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{contact.hero.title}</h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">{contact.hero.body}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <Mail className="h-5 w-5 text-ember" />
              <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{contact.cards.emailLabel}</div>
              <a href={`mailto:${site.contact.email}`} className="mt-1 block font-serif text-xl text-primary">{site.contact.email}</a>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <Phone className="h-5 w-5 text-ember" />
              <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{contact.cards.phoneLabel}</div>
              <a href={`tel:${site.contact.phoneHref}`} className="mt-1 block font-serif text-xl text-primary">{site.contact.phone}</a>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <MapPin className="h-5 w-5 text-ember" />
              <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">{contact.cards.serviceAreaLabel}</div>
              <div className="mt-1 font-serif text-xl text-primary">{site.contact.serviceArea}</div>
            </div>

            <div className="rounded-2xl bg-ember p-6 text-ember-foreground">
              <AlertCircle className="h-5 w-5" />
              <h3 className="mt-3 font-serif text-xl">{contact.crisis.title}</h3>
              <p className="mt-2 text-sm opacity-90">{contact.crisis.body}</p>
              <ul className="mt-4 space-y-2 text-sm">
                <li>{site.crisis.line988}</li>
                <li>
                  <a className="underline" href={site.crisis.whsCrisis.url} target="_blank" rel="noopener noreferrer">
                    {site.crisis.whsCrisis.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] md:p-10">
            <h2 className="font-serif text-3xl text-primary">{contact.form.title}</h2>
            <div className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder={contact.form.nameLabel} className="rounded-lg border border-border bg-background px-4 py-3" />
                <input required type="email" placeholder={contact.form.emailLabel} className="rounded-lg border border-border bg-background px-4 py-3" />
              </div>
              <input placeholder={contact.form.subjectLabel} className="rounded-lg border border-border bg-background px-4 py-3" />
              <textarea required rows={6} placeholder={contact.form.messageLabel} className="rounded-lg border border-border bg-background px-4 py-3" />
              <button className="rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground">
                {sent ? contact.form.successLabel : contact.form.submitLabel}
              </button>
            </div>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
