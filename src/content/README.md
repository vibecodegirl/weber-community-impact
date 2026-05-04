# Content files — edit these

Every page on the site has a matching file in this folder. **All editable text,
links, lists, numbers, button labels, and form copy live here.** The route files
in `src/routes/` only handle layout — they do not contain hardcoded copy.

## How to edit

1. Find the page file (e.g. `home.ts`, `about.ts`, `donate.ts`).
2. Change the strings between the quotes. Don't change the keys (the words on the
   left of `:`).
3. Save. The preview updates automatically.

## Wix migration

When rebuilding this design in Wix, open each file in this folder and copy the
strings directly into the matching Wix text/list elements. The structure of each
file mirrors the structure of the page top-to-bottom (hero → sections → CTA).

## Global content

- `site.ts` — Nav, footer, contact info, donate URL, brand
- `causes.ts` — The 5 cause areas (also used by the home page and donate page)

## Page content

One file per route: `home.ts`, `about.ts`, `board.ts`, `impact.ts`, `events.ts`,
`news.ts`, `get-involved.ts`, `contact.ts`, `donate.ts`, `financials.ts`,
`faq.ts`, `privacy.ts`, `terms.ts`, `hero.ts` (homepage carousel slides).

## Utility bar (crisis hotline + translator) in Wix

The slim bar at the very top of every page has two pieces:

### 1. 24 Hour Crisis Hotline — 988
Add a Wix **Strip** above your header. Inside it, place a text element reading
`24 Hour Crisis Hotline: 988` and link the "988" portion to `tel:988` (Wix link
panel → Phone Number). Copy lives in `site.ts` under `utilityBar`.

### 2. EN / ES language toggle (Google Website Translator)
Drop a Wix **Embed Code → Custom Embeds → Embed HTML** element on the right
side of the same strip and paste this snippet:

```html
<div id="google_translate_element"></div>
<script type="text/javascript">
  function googleTranslateElementInit() {
    new google.translate.TranslateElement(
      { pageLanguage: 'en', includedLanguages: 'en,es', autoDisplay: false },
      'google_translate_element'
    );
  }
</script>
<script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
```

Wix will render Google's default dropdown. To switch to a true EN / ES button
toggle, use Wix Velo and replicate the cookie-set + reload pattern in
`src/components/site/LanguageTranslator.tsx`.
