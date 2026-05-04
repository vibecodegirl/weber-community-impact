import { Link } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import { Menu, X, ChevronDown, Heart } from "lucide-react";
import logo from "@/assets/logo.png";
import { CAUSES } from "@/lib/causes";
import { site } from "@/content/site";
import { UtilityBar } from "./UtilityBar";

const EVENT_SUBNAV = [
  { to: "/events/golf-tournament" as const, title: "Golf Tournament", tagline: "Our annual benefit on the green" },
  { to: "/events/sub-for-santa" as const, title: "Sub for Santa", tagline: "Holiday giving for local families" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [causesOpen, setCausesOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
      <UtilityBar />
      <div className="mx-auto flex h-32 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt={`${site.brandName} ${site.brandSuffix}`} className="h-24 w-auto md:h-28" width={400} height={240} />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {site.nav.items.map((item) => (
            <Fragment key={item.to}>
              {item.to === "/events" ? (
                <div
                  className="relative"
                  onMouseEnter={() => setEventsOpen(true)}
                  onMouseLeave={() => setEventsOpen(false)}
                >
                  <Link
                    to="/events"
                    className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                    activeProps={{ className: "text-primary" }}
                  >
                    {item.label} <ChevronDown className="h-4 w-4" />
                  </Link>
                  {eventsOpen && (
                    <div className="absolute left-0 top-full w-72 pt-2">
                      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-elevated)]">
                        {EVENT_SUBNAV.map((e) => (
                          <Link
                            key={e.to}
                            to={e.to}
                            className="block border-b border-border/60 px-4 py-3 text-sm transition-colors last:border-b-0 hover:bg-muted"
                          >
                            <div className="font-medium text-foreground">{e.title}</div>
                            <div className="text-xs text-muted-foreground">{e.tagline}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.to}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                  activeProps={{ className: "text-primary" }}
                >
                  {item.label}
                </Link>
              )}
              {item.to === "/about" && (
                <div
                  key="causes-menu"
                  className="relative"
                  onMouseEnter={() => setCausesOpen(true)}
                  onMouseLeave={() => setCausesOpen(false)}
                >
                  <Link
                    to="/causes"
                    className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                    activeProps={{ className: "text-primary" }}
                  >
                    {site.nav.causesLabel} <ChevronDown className="h-4 w-4" />
                  </Link>
                  {causesOpen && (
                    <div className="absolute left-0 top-full w-72 pt-2">
                      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-elevated)]">
                        {CAUSES.map((c) => (
                          <Link
                            key={c.slug}
                            to="/causes/$slug"
                            params={{ slug: c.slug }}
                            className="block border-b border-border/60 px-4 py-3 text-sm transition-colors last:border-b-0 hover:bg-muted"
                          >
                            <div className="font-medium text-foreground">{c.title}</div>
                            <div className="text-xs text-muted-foreground">{c.tagline}</div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Fragment>
          ))}

          <Link
            to="/donate"
            className="ml-3 inline-flex items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-ember-foreground shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.03]"
          >
            <Heart className="h-4 w-4" /> {site.nav.donateLabel}
          </Link>
        </nav>

        <button
          className="lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="space-y-1 px-5 py-4">
            <Link to="/causes" className="block py-2 font-medium" onClick={() => setOpen(false)}>
              {site.nav.causesLabel}
            </Link>
            <div className="ml-3 space-y-1 border-l border-border pl-3">
              {CAUSES.map((c) => (
                <Link
                  key={c.slug}
                  to="/causes/$slug"
                  params={{ slug: c.slug }}
                  className="block py-1.5 text-sm text-muted-foreground"
                  onClick={() => setOpen(false)}
                >
                  {c.title}
                </Link>
              ))}
            </div>
            {site.nav.items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block py-2 font-medium"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/donate"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ember px-5 py-3 font-semibold text-ember-foreground"
              onClick={() => setOpen(false)}
            >
              <Heart className="h-4 w-4" /> {site.nav.donateLabel}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
