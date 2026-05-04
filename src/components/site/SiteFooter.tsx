import { Link } from "@tanstack/react-router";
import { MountainDivider } from "./MountainDivider";
import { CAUSES } from "@/lib/causes";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 bg-primary text-primary-foreground">
      <MountainDivider className="absolute -top-px left-0 h-12 w-full -translate-y-full text-primary" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="font-serif text-2xl">
            Weber Human Services <em className="text-sky">Foundation</em>
          </div>
          <p className="mt-3 max-w-md text-sm text-primary-foreground/75">
            Bridging the gap between client needs and available funding — so every neighbor in Morgan
            and Weber Counties can lead a healthy, successful life.
          </p>
          <Link
            to="/donate"
            className="mt-6 inline-flex rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ember-foreground"
          >
            Make a donation
          </Link>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sky">Causes</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {CAUSES.map((c) => (
              <li key={c.slug}>
                <Link to="/causes/$slug" params={{ slug: c.slug }} className="hover:text-sky">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sky">Foundation</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/about" className="hover:text-sky">About</Link></li>
            <li><Link to="/impact" className="hover:text-sky">Impact</Link></li>
            <li><Link to="/events" className="hover:text-sky">Events</Link></li>
            <li><Link to="/get-involved" className="hover:text-sky">Get Involved</Link></li>
            <li><Link to="/news" className="hover:text-sky">News</Link></li>
            <li><Link to="/contact" className="hover:text-sky">Contact</Link></li>
            <li>
              <a
                href="https://www.weberhs.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky"
              >
                Weber Human Services ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-5 py-6 text-xs text-primary-foreground/60 md:flex-row md:items-center lg:px-8">
          <p>© {new Date().getFullYear()} Weber Human Services Foundation. A 501(c)(3) nonprofit.</p>
          <p>Serving Morgan & Weber Counties, Utah</p>
        </div>
      </div>
    </footer>
  );
}
