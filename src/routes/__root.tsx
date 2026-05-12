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
      { name: "description", content: "Website for human and health services foundation showcasing programs and impact." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Weber Human Services Foundation" },
      { property: "og:description", content: "Website for human and health services foundation showcasing programs and impact." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Weber Human Services Foundation" },
      { name: "twitter:description", content: "Website for human and health services foundation showcasing programs and impact." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8214c165-d7cb-4c1f-a374-a859469adfae/id-preview-9a60a543--7f5bfbdb-6318-46c4-a30c-b3c108a334ac.lovable.app-1777929671571.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8214c165-d7cb-4c1f-a374-a859469adfae/id-preview-9a60a543--7f5bfbdb-6318-46c4-a30c-b3c108a334ac.lovable.app-1777929671571.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
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
