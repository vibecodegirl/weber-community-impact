import { Phone } from "lucide-react";
import { site } from "@/content/site";
import { LanguageTranslator } from "./LanguageTranslator";

export function UtilityBar() {
  const { crisisLabel, crisisNumber, crisisHref } = site.utilityBar;
  return (
    <div className="bg-primary text-primary-foreground notranslate" translate="no">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-5 text-xs lg:px-8">
        <a
          href={crisisHref}
          className="group inline-flex items-center gap-2 font-medium transition-opacity hover:opacity-90"
        >
          <Phone className="h-3.5 w-3.5 text-ember" aria-hidden />
          <span className="hidden sm:inline">{crisisLabel}:</span>
          <span className="sm:hidden">Crisis:</span>
          <span className="rounded-full bg-ember px-2 py-0.5 font-bold text-ember-foreground">
            {crisisNumber}
          </span>
        </a>
        <LanguageTranslator />
      </div>
    </div>
  );
}
