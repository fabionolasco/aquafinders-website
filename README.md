# AquaFinders website (Hugo)

Static site built with Hugo (no JavaScript framework). Every page's content is in the generated HTML.

## Commands

| Task | Command |
|---|---|
| Local preview (shows NEEDS_OWNER_VERIFICATION placeholders, robots disallows all) | `hugo server` |
| Production build | `hugo --gc --minify` |
| Build and run the quality gates | `npm run check` (writes `reports/site-check.json`) |

Hugo version: 0.146.x extended (pinned in `netlify.toml`).

## Where things live

| What | Where |
|---|---|
| Facts: phone, email, states, GA4 ID, Web3Forms key, hero image | `config.toml` → `[params]` |
| Prices (single source for EN and ES) | `data/pricing.yaml` |
| Page copy | `content/en/<page>/_index.md` and `content/es/<page>/_index.md` (same folder name = translation pair) |
| Home page copy | front matter of `content/en/_index.md` / `content/es/_index.md` |
| UI strings (buttons, forms, price-card text) | `themes/aquafinders/i18n/en.yaml`, `es.yaml` |
| Templates and components | `themes/aquafinders/layouts/` (`partials/components/`, `shortcodes/`) |
| Styles | `themes/aquafinders/assets/css/style.css` |
| Redirects, headers, build | `netlify.toml` |

### Shortcodes for page content
`{{< steps >}}`, `{{< price-table >}}`, `{{< disclaimer >}}`, `{{< button url="/request/" label="..." >}}`,
`{{< picture src="..." avif="..." w="" h="" alt="" caption="" >}}`, `{{< callout title="..." >}}…{{< /callout >}}`,
`{{< cards >}}{{< card title="" url="" >}}…{{< /card >}}{{< /cards >}}`,
`{{< verify "unconfirmed claim" >}}`. In `hugo server` it shows highlighted; in production builds it is **omitted** and logs a warning.

### Front matter used by landing pages
`seoTitle`, `description`, `eyebrow`, `h1`, `lead`, `ctaLabel`, `ctaUrl`, `secondaryCta {label,url,track}`, `faqs [{q,a}]`,
`faqGroups`, `service {name,type,description}` (Service JSON-LD), `parent` (breadcrumb), `noindex`, `hideDisclaimer`, `hideCtaBand`, `trackView`.

## Replacing the hero image

The hero files are `themes/aquafinders/static/images/hero-bg-big-{mobile,tablet,medium,large,xlarge}.{avif,jpg}`.
To swap the image:

1. Export the new image as AVIF and JPEG at these sizes: mobile 414×797 (portrait crop), tablet 768 wide, medium 1280, large 1920, xlarge 3024.
2. Either overwrite the files with the same names, or use a new base name and change `params.hero.base` in `config.toml`.
3. If the sizes differ, update `width`/`height` for each entry under `params.hero.sources`.
4. Update `heroAlt` under `[languages.en.params]` and `[languages.es.params]` so it describes the new image.

The `<picture>` element and the LCP preload are generated from that config (`partials/hero-picture.html`, `partials/head.html`).

## Forms
Forms post to Web3Forms (`params.web3formsKey`, a public routing key, not a secret). The lead form (`/request/`) works without JS.
With JS it becomes two steps and adds a reference number (`AF-YYMMDD-XXXX`) plus first-touch UTM and landing-page fields.
Its success page fires the GA4 event `qualified_inquiry_submit` once per reference.

See `docs/operations.md` for the sales pipeline and analytics, and `docs/release-2026-11.md` for this release's change log.
