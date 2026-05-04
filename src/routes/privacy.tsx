import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LegalArticle } from "@/components/site/LegalArticle";
import { privacy } from "@/content/legal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Weber Human Services Foundation" },
      { name: "description", content: "How the Weber Human Services Foundation collects, uses, and protects your personal information." },
      { property: "og:title", content: "Privacy Policy" },
      { property: "og:description", content: "Our commitment to protecting your privacy and personal information." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <LegalArticle doc={privacy} />
    </SiteLayout>
  ),
});
