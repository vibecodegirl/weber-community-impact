import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CAUSES } from "@/lib/causes";

const BASE_URL = "https://whsf.accessmypage.online";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/board", changefreq: "monthly", priority: "0.6" },
          { path: "/causes", changefreq: "monthly", priority: "0.8" },
          { path: "/impact", changefreq: "monthly", priority: "0.8" },
          { path: "/events", changefreq: "monthly", priority: "0.8" },
          { path: "/events/golf-tournament", changefreq: "monthly", priority: "0.7" },
          { path: "/events/sub-for-santa", changefreq: "monthly", priority: "0.7" },
          { path: "/get-involved", changefreq: "monthly", priority: "0.8" },
          { path: "/donate", changefreq: "monthly", priority: "0.9" },
          { path: "/news", changefreq: "weekly", priority: "0.7" },
          { path: "/financials", changefreq: "yearly", priority: "0.5" },
          { path: "/faq", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "yearly", priority: "0.6" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          ...CAUSES.map((c) => ({
            path: `/causes/${c.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
