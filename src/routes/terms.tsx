import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Weber Human Services Foundation" },
      {
        name: "description",
        content:
          "Terms governing your use of the Weber Human Services Foundation website and online services.",
      },
      { property: "og:title", content: "Terms of Use" },
      {
        property: "og:description",
        content: "The terms governing use of the Weber Human Services Foundation website.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">
            Legal
          </div>
          <h1 className="font-serif text-4xl md:text-5xl">Terms of Use</h1>
          <p className="mt-4 text-primary-foreground/70">Last updated: May 2026</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-5 py-16 lg:px-8 [&>h2]:mt-10 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:text-primary [&>p]:mt-4 [&>p]:text-muted-foreground [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 [&>ul]:text-muted-foreground">
        <p>
          By accessing or using the Weber Human Services Foundation website (the "Site"), you agree
          to these Terms of Use. If you do not agree, please do not use the Site.
        </p>

        <h2>Use of the Site</h2>
        <p>
          You may use the Site for lawful, personal, and informational purposes. You may not use the
          Site to transmit harmful content, attempt to gain unauthorized access, or interfere with
          its operation.
        </p>

        <h2>Donations</h2>
        <p>
          Donations are processed through a third-party payment provider on a separate page.
          Donations are non-refundable except where required by law. Tax receipts are issued in
          accordance with IRS guidelines for U.S. 501(c)(3) public charities.
        </p>

        <h2>Not professional advice</h2>
        <p>
          Information on this Site is provided for general awareness only and is not medical,
          mental-health, legal, or financial advice. If you or someone you know is in crisis, dial or
          text <strong>988</strong> for the Suicide & Crisis Lifeline.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The content, logo, and design of this Site are the property of the Weber Human Services
          Foundation or its licensors and are protected by applicable intellectual-property laws.
        </p>

        <h2>Third-party links</h2>
        <p>
          The Site may link to third-party websites. We are not responsible for the content or
          practices of those sites.
        </p>

        <h2>Disclaimer of warranties</h2>
        <p>
          The Site is provided "as is" without warranties of any kind, express or implied. We do not
          warrant that the Site will be uninterrupted or error free.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, the Foundation, its directors, and volunteers shall
          not be liable for any indirect, incidental, or consequential damages arising from your use
          of the Site.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these Terms from time to time. Continued use of the Site after changes are
          posted constitutes acceptance of the revised Terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these Terms? Please reach out via our Contact page.
        </p>
      </article>
    </SiteLayout>
  );
}
