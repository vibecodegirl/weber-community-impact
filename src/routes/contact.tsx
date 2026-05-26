import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, AlertCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { contact } from "@/content/contact";
import { site } from "@/content/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact the Weber Human Services Foundation | Ogden, UT" },
      { name: "description", content: "Reach the Weber Human Services Foundation in Ogden, Utah. Email foundation@weberhs.org or call (801) 778-6834 to give, partner, or volunteer." },
      { property: "og:title", content: "Contact the Weber Human Services Foundation" },
      { property: "og:description", content: "Email foundation@weberhs.org or call (801) 778-6834 — serving Morgan & Weber Counties, Utah." },
      { property: "og:url", content: "https://whsf.accessmypage.online/contact" },
    ],
    links: [{ rel: "canonical", href: "https://whsf.accessmypage.online/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16 lg:px-8 lg:py-28">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">{contact.hero.eyebrow}</div>
            <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">{contact.hero.title}</h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">{contact.hero.body}</p>
          </div>

          {contact.hero.teamMember.enabled && (
            <div className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur-sm md:p-8">
              <div className="flex items-center gap-5">
                <img
                  src={contact.hero.teamMember.photo}
                  alt={contact.hero.teamMember.name}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-primary-foreground/20 md:h-24 md:w-24"
                />
                <div>
                  <div className="font-serif text-xl text-primary-foreground md:text-2xl">{contact.hero.teamMember.name}</div>
                  <div className="text-sm text-primary-foreground/70">{contact.hero.teamMember.title}</div>
                </div>
              </div>
              <div className="mt-6 space-y-3 border-t border-primary-foreground/15 pt-5">
                <a href={`mailto:${contact.hero.teamMember.email}`} className="flex items-center gap-3 text-sm text-primary-foreground/90 hover:text-sky">
                  <Mail className="h-4 w-4 text-sky" />
                  {contact.hero.teamMember.email}
                </a>
                <a href={`tel:${contact.hero.teamMember.phoneHref}`} className="flex items-center gap-3 text-sm text-primary-foreground/90 hover:text-sky">
                  <Phone className="h-4 w-4 text-sky" />
                  {contact.hero.teamMember.phone}
                </a>
              </div>
            </div>
          )}
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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const inputs = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea");
              const [name, email, subject, message] = Array.from(inputs).map((el) => el.value);
              const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
              const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject || "Website inquiry")}&body=${encodeURIComponent(body)}`;
              window.location.href = mailto;
              setSent(true);
            }}
            className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] md:p-10"
          >
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
