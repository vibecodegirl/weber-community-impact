import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, AlertCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Weber Human Services Foundation" },
      {
        name: "description",
        content:
          "Get in touch with the Weber Human Services Foundation. Serving Morgan and Weber Counties, Utah.",
      },
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
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">Contact</div>
          <h1 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
            Let's <em className="text-sky">talk</em>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
            Whether you'd like to give, partner, volunteer, or just learn more — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <Mail className="h-5 w-5 text-ember" />
              <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Email</div>
              <a href="mailto:foundation@weberhs.net" className="mt-1 block font-serif text-xl text-primary">
                foundation@weberhs.net
              </a>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <Phone className="h-5 w-5 text-ember" />
              <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Phone</div>
              <a href="tel:+18016260700" className="mt-1 block font-serif text-xl text-primary">
                (801) 626-0700
              </a>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <MapPin className="h-5 w-5 text-ember" />
              <div className="mt-3 text-xs uppercase tracking-wider text-muted-foreground">Service area</div>
              <div className="mt-1 font-serif text-xl text-primary">Morgan & Weber Counties, Utah</div>
            </div>

            <div className="rounded-2xl bg-ember p-6 text-ember-foreground">
              <AlertCircle className="h-5 w-5" />
              <h3 className="mt-3 font-serif text-xl">In crisis? Get help now.</h3>
              <p className="mt-2 text-sm opacity-90">
                If you or someone you love is in crisis, you don't have to wait.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                <li><strong>988</strong> — Suicide & Crisis Lifeline (call or text)</li>
                <li>
                  <a className="underline" href="https://www.weberhs.net/" target="_blank" rel="noopener noreferrer">
                    Weber Human Services 24/7 crisis line ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-soft)] md:p-10"
          >
            <h2 className="font-serif text-3xl text-primary">Send us a message</h2>
            <div className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Full name" className="rounded-lg border border-border bg-background px-4 py-3" />
                <input required type="email" placeholder="Email" className="rounded-lg border border-border bg-background px-4 py-3" />
              </div>
              <input placeholder="Subject" className="rounded-lg border border-border bg-background px-4 py-3" />
              <textarea required rows={6} placeholder="Your message" className="rounded-lg border border-border bg-background px-4 py-3" />
              <button className="rounded-full bg-primary px-6 py-3.5 font-semibold text-primary-foreground">
                {sent ? "Thank you — we'll respond soon!" : "Send message"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
