import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Weber Human Services Foundation" },
      { name: "description", content: "A 501(c)(3) nonprofit funding mental health, aging, recovery, and prevention services for Weber Human Services across Morgan and Weber Counties, Utah." },
      { name: "author", content: "Weber Human Services Foundation" },
      { property: "og:site_name", content: "Weber Human Services Foundation" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "geo.region", content: "US-UT" },
      { name: "geo.placename", content: "Ogden, Utah" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "NGO",
          name: "Weber Human Services Foundation",
          alternateName: ["WHS Foundation", "Weber Human Services Foundation Inc."],
          url: "https://whsf.accessmypage.online",
          logo: "https://whsf.accessmypage.online/favicon.ico",
          description:
            "A 501(c)(3) nonprofit raising charitable contributions to fund mental health, aging, substance use recovery, prevention, and employee care programs at Weber Human Services in Morgan and Weber Counties, Utah.",
          areaServed: [
            { "@type": "AdministrativeArea", name: "Weber County, Utah" },
            { "@type": "AdministrativeArea", name: "Morgan County, Utah" },
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Ogden",
            addressRegion: "UT",
            addressCountry: "US",
          },
          email: "foundation@weberhs.org",
          telephone: "+1-801-778-6834",
          nonprofitStatus: "Nonprofit501c3",
          knowsAbout: [
            "Mental health services",
            "Aging services",
            "Substance use recovery",
            "Prevention programs",
            "Employee care",
          ],
          sameAs: ["https://www.weberhs.net/"],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Weber Human Services Foundation",
          url: "https://whsf.accessmypage.online",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {/* UserWay Accessibility Widget (WCAG) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(d){var s=d.createElement("script");s.setAttribute("data-account","REPLACE_WITH_USERWAY_ACCOUNT_ID");s.setAttribute("src","https://cdn.userway.org/widget.js");(d.body||d.head).appendChild(s);})(document);`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
