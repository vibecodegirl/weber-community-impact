import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Weber Human Services Foundation" },
      {
        name: "description",
        content:
          "How the Weber Human Services Foundation collects, uses, and protects your personal information.",
      },
      { property: "og:title", content: "Privacy Policy" },
      {
        property: "og:description",
        content: "Our commitment to protecting your privacy and personal information.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <SiteLayout>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-5 py-20 lg:px-8">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-sky">
            Legal
          </div>
          <h1 className="font-serif text-4xl md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-primary-foreground/70">Last updated: May 2026</p>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-5 py-16 lg:px-8 [&>h2]:mt-10 [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:text-primary [&>p]:mt-4 [&>p]:text-muted-foreground [&>ul]:mt-4 [&>ul]:list-disc [&>ul]:space-y-2 [&>ul]:pl-6 [&>ul]:text-muted-foreground">
        <p>
          The Weber Human Services Foundation ("we," "our," or "the Foundation") respects your
          privacy. This policy explains what information we collect on this website, how we use it,
          and the choices you have.
        </p>

        <h2>Information we collect</h2>
        <p>We collect the following kinds of information:</p>
        <ul>
          <li>Information you provide directly — such as your name, email, phone number, or message — when you complete a form, sign up for our newsletter, or contact us.</li>
          <li>Donation information processed by our third-party payment provider. We do not store credit card or bank account details on our servers.</li>
          <li>Basic usage data — such as pages visited and approximate location — collected through standard web analytics.</li>
        </ul>

        <h2>How we use your information</h2>
        <ul>
          <li>To respond to your inquiries and process donations.</li>
          <li>To send newsletters, event invitations, and impact updates if you've opted in.</li>
          <li>To improve our website and understand how visitors use it.</li>
          <li>To meet legal, accounting, and tax-reporting obligations.</li>
        </ul>

        <h2>Sharing</h2>
        <p>
          We do not sell or rent your personal information. We share information only with trusted
          service providers (such as our email platform and payment processor) who help us operate,
          and only as required by law.
        </p>

        <h2>Your choices</h2>
        <p>
          You may unsubscribe from our newsletter at any time using the link in any email, or contact
          us to update or delete your information.
        </p>

        <h2>Cookies</h2>
        <p>
          We use a small number of cookies for site functionality and analytics. You can disable
          cookies in your browser settings.
        </p>

        <h2>Children</h2>
        <p>
          This website is not directed to children under 13, and we do not knowingly collect personal
          information from children.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Please reach out via our Contact page. We may update this
          policy from time to time; the "Last updated" date above will reflect any revisions.
        </p>
      </article>
    </SiteLayout>
  );
}
