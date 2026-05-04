import { Link } from "@tanstack/react-router";
import { MountainDivider } from "./MountainDivider";
import { CAUSES } from "@/lib/causes";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 bg-primary text-primary-foreground">
      <MountainDivider className="absolute -top-px left-0 h-12 w-full -translate-y-full text-primary" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="font-serif text-2xl">
            {site.brandName} <em className="text-sky">{site.brandSuffix}</em>
          </div>
          <p className="mt-3 max-w-md text-sm text-primary-foreground/75">{site.tagline}</p>
          <Link
            to="/donate"
            className="mt-6 inline-flex rounded-full bg-ember px-6 py-3 text-sm font-semibold text-ember-foreground"
          >
            {site.footer.donateButton}
          </Link>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sky">{site.footer.causesHeading}</h4>
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
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-sky">{site.footer.foundationHeading}</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            {site.footer.foundationLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-sky">{l.label}</Link>
              </li>
            ))}
            <li>
              <a
                href={site.parentOrg.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky"
              >
                {site.parentOrg.name} ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-5 py-6 text-xs text-primary-foreground/60 md:flex-row md:items-center lg:px-8">
          <p>© {new Date().getFullYear()} {site.brandName} {site.brandSuffix}. {site.footer.copyrightSuffix}</p>
          <div className="flex flex-wrap items-center gap-4">
            {site.footer.legalLinks.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-sky">{l.label}</Link>
            ))}
            <span>{site.footer.serviceAreaLine}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
