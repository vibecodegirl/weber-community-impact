import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { site } from "@/content/site";

declare global {
  interface Window {
    google?: any;
    googleTranslateElementInit?: () => void;
  }
}

function clearTranslateCookies() {
  const expire = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = ["", host];
  if (parts.length > 1) domains.push("." + parts.slice(-2).join("."));
  for (const d of domains) {
    const dom = d ? `;domain=${d}` : "";
    document.cookie = `googtrans=;path=/${dom};${expire}`;
  }
}

function setTranslateCookie(lang: string) {
  clearTranslateCookies();
  if (lang === "en") return;
  const value = `/en/${lang}`;
  document.cookie = `googtrans=${value};path=/`;
  const host = window.location.hostname;
  const parts = host.split(".");
  if (parts.length > 2) {
    const root = "." + parts.slice(-2).join(".");
    document.cookie = `googtrans=${value};path=/;domain=${root}`;
  }
}

function getCurrentLang(): string {
  if (typeof document === "undefined") return "en";
  const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/);
  return match ? match[1] : "en";
}

/**
 * Force Google Translate to re-scan the DOM.
 * The widget exposes a hidden <select class="goog-te-combo"> — dispatching
 * a "change" event on it causes the engine to re-translate visible text,
 * including content rendered by SPA route changes.
 */
function retranslate(lang: string) {
  if (lang === "en") return;
  const select = document.querySelector<HTMLSelectElement>("select.goog-te-combo");
  if (!select) return;
  if (select.value !== lang) select.value = lang;
  select.dispatchEvent(new Event("change"));
}

export function LanguageTranslator() {
  const [active, setActive] = useState<string>("en");

  useEffect(() => {
    const initialLang = getCurrentLang();
    setActive(initialLang);

    if (!document.getElementById("google-translate-script")) {
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
    }

    // Re-apply translation after SPA route changes only. We intentionally
    // do NOT use a MutationObserver here — Google Translate itself mutates
    // the DOM as it translates, which causes a feedback loop (flicker /
    // text rapidly toggling between EN and ES).
    let retryTimer: number | undefined;
    const scheduleRetranslate = () => {
      const lang = getCurrentLang();
      if (lang === "en") return;
      window.clearTimeout(retryTimer);
      retryTimer = window.setTimeout(() => retranslate(lang), 250);
    };

    const origPush = history.pushState;
    const origReplace = history.replaceState;
    history.pushState = function (...args) {
      const r = origPush.apply(this, args as any);
      scheduleRetranslate();
      return r;
    };
    history.replaceState = function (...args) {
      const r = origReplace.apply(this, args as any);
      scheduleRetranslate();
      return r;
    };
    window.addEventListener("popstate", scheduleRetranslate);

    return () => {
      window.clearTimeout(retryTimer);
      window.removeEventListener("popstate", scheduleRetranslate);
      history.pushState = origPush;
      history.replaceState = origReplace;
    };
  }, []);

  function switchTo(lang: string) {
    setTranslateCookie(lang);
    setActive(lang);
    // Full reload ensures the widget picks up the new cookie cleanly;
    // subsequent SPA navigation is handled by the observer above.
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
