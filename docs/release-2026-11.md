# Release notes: Hugo rebuild, SEO and conversion (November 2026)

## Production diagnosis (before)
Checked with `curl` on 2026-11-19:

```
$ curl -sI https://aquafinders.site/            → 200, Server: Apache, Content-Length: 1307
$ curl -s  https://aquafinders.site/ | head     → <body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div>
$ /find-water/  /es/  /services/                → identical 1307-byte shell, HTTP 200
$ /nonexistent-xyz/                             → HTTP 200 (soft 404)
```

The live site is a client-rendered React build on Apache with a catch-all fallback. Its React source was deleted from this repo in `f83c2c7`.
Every URL serves the same empty shell, missing pages return 200, and no page contains its content without JavaScript.
**This release must replace that deployment.**

## After (local production build)
```
$ hugo --gc --minify                      → 41 HTML pages (35 indexable), 0 errors
$ python3 scripts/check_site.py           → 0 failures, 0 warnings, 2 owner placeholders
$ curl -s localhost/find-water/ | grep    → <title>Where to Drill a Water Well | Well Siting Surveys | AquaFinders  <h1>Where Should You Drill Your Water Well?
```
A real 404 status relies on Netlify serving `404.html` / `es/404.html`. Verify it on the deploy preview with `curl -I`.

## Change log
- **Hosting/build:**
  - `netlify.toml` now has the build command, publish dir, Hugo 0.146.2, 301s, a Spanish 404 rule and cache/security headers.
  - Removed the broken rewrites for `/images/*`, `/promo-request` and `/success`.
  - `public/` and `.hugo_build.lock` are no longer tracked. The committed `public/` was a dev-server build containing livereload and localhost URLs.
- **SEO head** (`partials/seo.html`):
  - unique titles and descriptions
  - absolute self-canonicals
  - reciprocal hreflang (en/es/x-default) between indexable translations only
  - Open Graph/Twitter tags, a robots meta tag, and `lang` set to `en-US`/`es`
- **Structured data** (`partials/jsonld.html`):
  - `ProfessionalService` with York, SC, the 6 served states, phone, email and hours
  - `Service` on service pages and `BreadcrumbList` on inner pages
  - Removed the invalid `Schedule` key and the "pinpoint… high-yield" description
  - No ratings or reviews
- **One visible H1 per page.** The hidden site-wide H1 is gone.
- **robots.txt template** with a Sitemap line; it disallows crawling outside production builds. Taxonomy pages (empty categories/tags) are disabled.
- **Home page rebuilt per brief §3, keeping the hero image.** The hero is now a responsive `<picture>` with real width/height and a matching preload; the old preload said `2000w` for a 3024 px file. The podcast loads with `preload="none"`.
- **New pages (EN and ES):** `/how-it-works/`, `/pricing/`, `/groundwater-survey/`, `/low-yield-well/`, `/privacy/`. `/case-studies/` exists as a draft until there's real proof.
- **Rewritten pages:** `/find-water/`, `/services/`, `/avoid-water/`, `/resistivity/`, `/studies/`, `/faq/`, `/about/`, `/contact/`, `/gallery/`, `/sitemap/`, `/success/`, and both home pages. Spanish copy is fully Spanish and needs native review.
- **Pricing reconciled:**
  - $500 Phase 1 and $700 Phase 2, from a single source, `data/pricing.yaml`
  - travel fee beyond 20 miles of York, SC, and brush clearing, both quoted in advance
  - **removed:** the $725 SEV add-on, the "$1200 ERT" claims, "nationwide", "five geologists" and "hundreds of homeowners"
- **Claims cleaned up:** removed "pinpoint", "cutting-edge", "dramatically reduces", "up to 600 feet", "highest probability of strong water flow" and "Tranquilidad garantizada". Added a consistent limits box: we don't drill, no guarantee of water/GPM/depth, no water-quality testing, drilling confirms.
- **Lead form** `/request/`:
  - replaces the Google Form iframe with a native Web3Forms form that works without JS
  - JS makes it two steps; it requires an email or a phone; hCaptcha plus honeypot
  - adds a reference number, first-touch UTM/landing/referrer fields and a language-aware success page
- **Other forms:** the contact and promo forms redirect to the success page in the visitor's language.
  - The promo form no longer marks optional existing-well fields as required.
  - "I agree" is now a required checkbox with its own name.
- **Analytics:**
  - GA4 loads on first interaction or idle time instead of a fixed 4 s delay, so events are no longer lost.
  - Removed the dead GTM noscript iframes (the GTM loader was never installed).
  - Events are listed in `docs/operations.md`.
- **Design system:**
  - new CSS (navy/teal/off-white/earth), a sticky header with phone and CTA, and a sticky mobile CTA bar
  - skip link, focus styles and accessible `<details>` FAQs
  - CSS is fingerprinted and minified through Hugo Pipes
- **Language switcher** now links to the same page in the other language.
- **Images:** `slide 1.*` renamed to `sample-cross-section.*` because the space broke `srcset`; the old URL 301s. All `<img>` elements have alt text and width/height.
- **Quality gates:** `scripts/check_site.py` and `npm run check`.

## Redirect map (301, in `netlify.toml`)
| From | To |
|---|---|
| `/process/`, `/process/*` | `/how-it-works/` |
| `/es/process/`, `/es/process/*` | `/es/how-it-works/` |
| `/index.html` | `/` |
| `/spanish.html` | `/es/` |
| `/faq.html` | `/faq/` |
| `/faq-es.html` | `/es/faq/` |
| `/success.html` | `/success/` |
| `/sitemap.html` | `/sitemap/` |
| `/en`, `/en/*` (except `/en/sitemap.xml`) | `/` and `/:splat` |
| `/images/slide%201.png` / `.avif` | `/images/sample-cross-section.png` / `.avif` |

All other legacy URLs (`/services/`, `/find-water/`, `/avoid-water/`, `/resistivity/`, `/studies/`, `/about/`, `/contact/`, `/faq/`, `/gallery/`, `/request/`, `/sitemap/`, `/success/`, `/promo-request/` and their `/es/` versions) are kept at the same URL. Netlify's pretty-URL handling adds the trailing slash for the React-era links without one.

## Page-level meta map
| URL | Title | H1 |
|---|---|---|
| `/` | Groundwater Surveys & Water Well Siting \| AquaFinders | Before You Drill a Water Well, Know Where to Look. |
| `/find-water/` | Where to Drill a Water Well \| Well Siting Surveys \| AquaFinders | Where Should You Drill Your Water Well? |
| `/low-yield-well/` | Low-Yield or Dry Well? Explore Next Steps \| AquaFinders | Low-Yield or Dry Well? Check These Things Before You Drill Again |
| `/groundwater-survey/` | Groundwater Survey for Water Wells: How It Works \| AquaFinders | What a Groundwater Survey Does for Your Well, in Plain Terms |
| `/how-it-works/` | How a Water Well Siting Study Works \| AquaFinders | How a Water Well Siting Study Works |
| `/pricing/` | Groundwater Survey Pricing & Process \| AquaFinders | Groundwater Study Pricing |
| `/services/` | Groundwater & Subsurface Study Services \| AquaFinders | Our Services |
| `/faq/` | Water Well Siting FAQ: Cost, Process & Limits \| AquaFinders | Frequently Asked Questions |
| `/about/` | About AquaFinders \| Independent Groundwater Studies, York SC | About AquaFinders |
| `/request/` | Request a Property Review \| AquaFinders | Check My Property |
| `/avoid-water/`, `/resistivity/`, `/studies/` | secondary services | see `reports/site-check.json` |

Spanish pages mirror these with Spanish titles; the full list is printed by the check script's build. The target queries are working hypotheses ("where to drill a water well", "groundwater survey", "dry well / low yield well", "water well siting"). **Keyword volumes have not been measured.** Validate them in Search Console after launch.

## Not done in this release (and why)
- No Lighthouse/PageSpeed numbers: they need the deployed URL. Run PageSpeed Insights on the deploy preview and record a baseline.
- No real 404/301 test yet: this needs Netlify (deploy preview).
- No end-to-end form submission test: this would send real email to the business inbox. Do it once on the deploy preview.
- P1 pages (`/for-well-drillers/`, `/before-buying-land/`, `/agricultural-wells/`, state pages, `/insights/`) were not built.
- The ES promo page still has English content, so it is `noindex` and excluded from the sitemap and hreflang.

## Owner approval checklist
1. **Insurance:** provide the current proof. "Insured" appears on the home page and the About page.
2. **Turnaround time:** confirm "about five weeks" and the rush option. The text is hidden in production until confirmed (`{{< verify >}}` in `how-it-works`).
3. **Business hours:** confirm Mon–Fri 9–5 ET. It's shown on Contact and in the structured data.
4. **Standard limits:** confirm "up to 50 acres" for the standard study and the "several hundred feet" depth wording.
5. **Sample image** (`sample-cross-section.png`): confirm it comes from your own or a partner project and may be shown publicly. It is labeled as an example. Also note `ert.jpeg`: it looks like a figure from a published paper. It is no longer used; don't reuse it without a license.
6. **Gallery photos:** confirm they are from your or your partners' fieldwork and that the people shown agreed to it.
7. **Hero image:** it shows water gushing and a celebrating family, which implies a promised outcome and looks AI-generated. Replace it when you can (see README, "Replacing the hero image").
8. **Podcast audio** (EN/ES): listen for claims that conflict with the new wording (guarantees, "pinpoint", 600 ft).
9. **Partner geologists:** names and credentials, if you want them shown.
10. **Real proof:** the first permissioned case study and an anonymized sample report. That unblocks `/case-studies/` and the "See a Sample Report" CTA.
11. **Spanish review** by a native speaker, covering all `content/es/*` and `i18n/es.yaml`.
12. **Promo page:** keep it indexable? Translate the ES version?
13. **Netlify:** create the site from this repo/branch, review the deploy preview, then switch DNS. Afterwards submit the sitemap in Search Console (`docs/operations.md`).
14. **Repo cleanup candidates** (not deleted):
    - `_old/`
    - the root `images/`, `favicon/` and `robots.txt` (unused duplicates)
    - the 16 MB `.docx` report in `images/` (committed twice). It may contain client data; consider removing it from git history.
    - `memory/`, `test_reports/`, `.emergent/` (React-era artifacts)
    - `themes/aquafinders/static/podcast.wav` (14.5 MB, unused)
15. **Follow-up cadence and CRM:** confirm the steps in `docs/operations.md`.
