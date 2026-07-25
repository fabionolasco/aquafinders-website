import React from "react";
import { Helmet } from "react-helmet-async";
import { SITE_URL, BUSINESS_JSONLD, localizedPath } from "../config/siteConfig";

// Centralised SEO component: title, description, canonical, hreflang
// alternates, Open Graph / Twitter cards and JSON-LD structured data.
export default function Seo({ lang, pageKey, title, description }) {
  const path = localizedPath(pageKey, lang);
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
  const enHref = `${SITE_URL}${localizedPath(pageKey, "en") === "/" ? "" : localizedPath(pageKey, "en")}`;
  const esHref = `${SITE_URL}${localizedPath(pageKey, "es")}`;
  const ogLocale = lang === "es" ? "es_ES" : "en_US";
  const ogImage = `${SITE_URL}/images/hero-bg-big-medium.png`;

  return (
    <Helmet htmlAttributes={{ lang: lang === "es" ? "es-ES" : "en-US" }}>
      <title>{`${title} - AquaFinders`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <link rel="alternate" hrefLang="en" href={enHref} />
      <link rel="alternate" hrefLang="es" href={esHref} />
      <link rel="alternate" hrefLang="x-default" href={enHref} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="AquaFinders" />
      <meta property="og:title" content={`${title} - AquaFinders`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} - AquaFinders`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">
        {JSON.stringify(BUSINESS_JSONLD)}
      </script>
    </Helmet>
  );
}
