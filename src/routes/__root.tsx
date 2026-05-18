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
      { name: "description", content: "A 501(c)(3) nonprofit raising charitable contributions for human and health services in Morgan and Weber Counties, Utah." },
      { name: "author", content: "Weber Human Services Foundation" },
      { property: "og:site_name", content: "Weber Human Services Foundation" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
          "@type": "Organization",
          name: "Weber Human Services Foundation",
          url: "https://whsf.accessmypage.online",
          description:
            "A 501(c)(3) nonprofit bridging the gap between client needs and available funding for human and health services in Morgan and Weber Counties, Utah.",
          areaServed: "Morgan & Weber Counties, Utah",
          email: "foundation@weberhs.org",
          telephone: "+1-801-778-6834",
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
