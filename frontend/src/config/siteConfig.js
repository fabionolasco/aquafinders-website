// Central configuration for AquaFinders (single source of truth for contact
// details, third-party keys, structured data, routing slugs and languages).

export const SITE_URL = "https://aquafinders.site";

export const CONTACT = {
  phone: "+1-732-221-1202",
  phoneDigits: "17322211202",
  email: "support@aquafinders.site",
  facebook:
    "https://www.facebook.com/people/AquaFinders-Find-the-best-place-to-drill-a-water-well/61577105078190/",
};

// Web3Forms public access key (client-side form submission) & Google Form embed.
export const WEB3FORMS_KEY = "38605c7d-f8ee-4232-bf07-d8a8f4b639fa";
export const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdcVDVTBY8Al98-JAYwQ4vDkJWr8eEbbfBhGN0dkeZxECTO_A/viewform?embedded=true";

export const LANGUAGES = ["en", "es"];
export const DEFAULT_LANG = "en";

// Route keys map to a slug per language. EN lives at the root, ES under /es.
export const PAGES = {
  home: { slug: "" },
  services: { slug: "services" },
  findWater: { slug: "find-water" },
  avoidWater: { slug: "avoid-water" },
  resistivity: { slug: "resistivity" },
  studies: { slug: "studies" },
  process: { slug: "process" },
  about: { slug: "about" },
  contact: { slug: "contact" },
  faq: { slug: "faq" },
  gallery: { slug: "gallery" },
  request: { slug: "request" },
  success: { slug: "success" },
  sitemap: { slug: "sitemap" },
};

// Build an absolute-in-app path for a given page + language.
export function localizedPath(pageKey, lang) {
  const slug = PAGES[pageKey] ? PAGES[pageKey].slug : "";
  const base = lang === "en" ? "" : "/es";
  if (!slug) return base || "/";
  return `${base}/${slug}`;
}

// JSON-LD LocalBusiness structured data (SEO).
export const BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "AquaFinders",
  description:
    "Unsure where to drill a water well? AquaFinders uses advanced technology to pinpoint optimal, high-yield locations on your site.",
  image: `${SITE_URL}/images/logo-h.png`,
  "@id": SITE_URL,
  url: SITE_URL,
  telephone: CONTACT.phone,
  email: CONTACT.email,
  areaServed: [
    "North Carolina",
    "South Carolina",
    "Georgia",
    "Tennessee",
    "Kentucky",
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.015171,
    longitude: -81.185071,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  sameAs: [CONTACT.facebook],
};
