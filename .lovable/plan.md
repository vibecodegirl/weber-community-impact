## Crisis Hotline mini-header + EN/ES Language Translator

### 1. Content (`src/content/site.ts`)
Add two new blocks:
- `utilityBar`: `crisisLabel: "24 Hour Crisis Hotline"`, `crisisNumber: "988"`, `crisisHref: "tel:988"`, `languageLabel: "Language"`.
- `languages`: `[{ code: "en", label: "EN", name: "English" }, { code: "es", label: "ES", name: "Español" }]`.

### 2. New component: `src/components/site/UtilityBar.tsx`
A slim 36px-tall bar with primary background:
- **Left**: Phone icon + "24 Hour Crisis Hotline:" + bold "988" pill, wrapped in a `tel:988` link. Collapses to "Crisis: 988" under `sm`.
- **Right**: `<LanguageTranslator />`.
- Marked `notranslate` so the bar itself never gets re-translated.

### 3. New component: `src/components/site/LanguageTranslator.tsx`
Two-button **EN / ES** segmented toggle (rounded pill, tracks active state).
- Injects the official Google Website Translator script once on mount into a hidden `#google_translate_element` host.
- Switching languages writes the `googtrans` cookie (`/en/en` or `/en/es`) on the current host and the parent domain, then `window.location.reload()` so Google Translate re-applies — the simplest pattern that also works identically when the snippet is dropped into Wix.
- Reads current language from the cookie on mount to highlight the active button.

### 4. Header integration (`src/components/site/SiteHeader.tsx`)
Render `<UtilityBar />` as the first child of the `<header>`, above the existing nav row. No other header changes.

### 5. Style tweaks (`src/styles.css`)
Append small global overrides to suppress Google Translate's injected chrome:
- Hide `.skiptranslate` iframe banner, reset `body { top: 0 !important }`, hide `#goog-gt-tt` tooltip.

### 6. Wix migration notes (`src/content/README.md`)
Append a short section:
- Crisis bar = a Wix Strip with a text element + a phone-link button. Copy lives in `site.utilityBar`.
- Translator = paste Google's official Website Translator embed snippet into a Wix HTML/Embed element, configured with `pageLanguage: 'en'` and `includedLanguages: 'en,es'`. Include the exact snippet inline in the README so it's drop-in.

### Files
- **Edit**: `src/content/site.ts`, `src/components/site/SiteHeader.tsx`, `src/styles.css`, `src/content/README.md`
- **Create**: `src/components/site/UtilityBar.tsx`, `src/components/site/LanguageTranslator.tsx`
