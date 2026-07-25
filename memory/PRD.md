# AquaFinders — React Recreation (PRD)

## Original Problem Statement
Re-create the static website https://aquafinders.site/ using ReactJS (source: Hugo repo,
branch `hugo`, present at repo root `/app`). Two language versions (EN/ES). Reuse all
original images. Improve only SEO and A11y; everything else should look the same.
Static frontend only. Organize the code to be easy to maintain.

## Architecture
- **Stack**: React 18 + react-router-dom 6 + react-helmet-async, built with CRACO (CRA). No backend (static site).
- **App location**: `/app/frontend` (the original Hugo source remains at `/app` for reference).
- **Routing**: EN at `/`, ES under `/es`. Slugs defined once in `config/siteConfig.js` (`PAGES`) and rendered for both languages via `routes/pageRoutes.jsx`.
- **i18n**: `src/i18n/en.js` + `es.js` hold all copy; `LanguageProvider` / `useLang` / `useT` expose the active dictionary. ES sections that were English on the original site intentionally reuse EN copy.
- **SEO**: `src/seo/Seo.jsx` sets per-page title/description, canonical, hreflang (en/es/x-default), Open Graph, Twitter, and JSON-LD LocalBusiness.
- **A11y**: skip link, visible focus states, real `<button>` accordions with aria-expanded/aria-controls, aria-labelled sections, descriptive image alts, reduced-motion support, dynamic `<html lang>`.
- **Assets**: all images/favicons/podcast audio copied to `/app/frontend/public` (reused verbatim).
- **Integrations (client-side, same as original)**: Contact form → Web3Forms; Request page → embedded Google Form iframe.

## Pages (EN + ES)
Home, Services, Find Water, Avoid Water, Resistivity, Studies, Process & Pricing, About,
Contact, FAQ (nested accordion), Gallery, Request (Google Form), Success, Sitemap, 404.

## Status — Implemented (2026-06)
- Full EN/ES recreation, pixel-faithful to the original, reusing all original assets.
- Improvements delivered: on-page SEO (meta, canonical, hreflang, OG, JSON-LD) and A11y upgrades.
- Verified end-to-end by the testing agent: 17/17 frontend scenarios passed, 100%, no console errors, 0 broken images.

## Next / Backlog
- **P1 SEO**: For crawler-grade SEO parity with the original static Hugo site, add pre-rendering/SSG (e.g. react-snap or migrate to Next.js) so meta/content are in the initial HTML. Current SPA sets tags client-side via Helmet.
- **P2**: Fully translate the few ES service-detail/FAQ bodies that remain in English (matches original today).
- **P2**: Generate a static `sitemap.xml` for all EN/ES routes; re-add analytics (GA/GTM) if desired.
- **P2**: Optionally wire the contact form to the user's own Web3Forms key confirmation / success routing.
