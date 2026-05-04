import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { site } from "@/content/site";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

function setTranslateCookie(lang: string) {
  const value = lang === "en" ? "/en/en" : `/en/${lang}`;
  document.cookie = `googtrans=${value};path=/`;
  const host = window.location.hostname;
  const parts = host.split(".");
  if (parts.length > 1) {
    const root = "." + parts.slice(-2).join(".");
    document.cookie = `googtrans=${value};path=/;domain=${root}`;
  }
}

function getCurrentLang(): string {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
  return match ? match[1] : "en";
}

export function LanguageTranslator() {
  const [active, setActive] = useState<string>("en");

  useEffect(() => {
    setActive(getCurrentLang());
    if (document.getElementById("google-translate-script")) return;

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: site.languages.map((l) => l.code).join(","),
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  function switchTo(lang: string) {
    setTranslateCookie(lang);
    setActive(lang);
    window.location.reload();
  }

  return (
    <div className="flex items-center gap-2 notranslate" translate="no">
      <Globe className="h-3.5 w-3.5 opacity-70" aria-hidden />
      <span className="sr-only">{site.utilityBar.languageLabel}</span>
      <div
        role="group"
        aria-label={site.utilityBar.languageLabel}
        className="flex overflow-hidden rounded-full border border-primary-foreground/25"
      >
        {site.languages.map((l) => {
          const isActive = active === l.code;
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => !isActive && switchTo(l.code)}
              aria-pressed={isActive}
              aria-label={l.name}
              className={
                "px-2.5 py-0.5 text-[11px] font-semibold tracking-wider transition-colors " +
                (isActive
                  ? "bg-primary-foreground text-primary"
                  : "text-primary-foreground/80 hover:bg-primary-foreground/10")
              }
            >
              {l.label}
            </button>
          );
        })}
      </div>
      <div id="google_translate_element" className="hidden" aria-hidden />
    </div>
  );
}
