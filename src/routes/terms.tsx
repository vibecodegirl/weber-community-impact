import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { LegalArticle } from "@/components/site/LegalArticle";
import { terms } from "@/content/legal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Use — Weber Human Services Foundation" },
      { name: "description", content: "Terms governing your use of the Weber Human Services Foundation website and online services." },
      { property: "og:title", content: "Terms of Use" },
      { property: "og:description", content: "The terms governing use of the Weber Human Services Foundation website." },
      { property: "og:url", content: "https://whsf.accessmypage.online/terms" },
    ],
    links: [{ rel: "canonical", href: "https://whsf.accessmypage.online/terms" }],
  }),
  component: () => (
    <SiteLayout>
      <LegalArticle doc={terms} />
    </SiteLayout>
  ),
});
