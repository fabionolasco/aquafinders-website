/* Generates public/sitemap.xml for all EN/ES routes with hreflang alternates.
   Run: node scripts/generate-sitemap.js  (also runnable via `yarn sitemap`). */
const fs = require("fs");
const path = require("path");

const SITE_URL = "https://aquafinders.site";

// { slug, priority, changefreq }. Empty slug = home. `success` is intentionally
// excluded (transient thank-you page).
const PAGES = [
  { slug: "", priority: "1.0", changefreq: "monthly" },
  { slug: "services", priority: "0.9", changefreq: "monthly" },
  { slug: "find-water", priority: "0.8", changefreq: "monthly" },
  { slug: "avoid-water", priority: "0.8", changefreq: "monthly" },
  { slug: "resistivity", priority: "0.8", changefreq: "monthly" },
  { slug: "studies", priority: "0.8", changefreq: "monthly" },
  { slug: "process", priority: "0.8", changefreq: "monthly" },
  { slug: "about", priority: "0.7", changefreq: "yearly" },
  { slug: "contact", priority: "0.7", changefreq: "yearly" },
  { slug: "faq", priority: "0.7", changefreq: "monthly" },
  { slug: "gallery", priority: "0.6", changefreq: "yearly" },
  { slug: "request", priority: "0.7", changefreq: "yearly" },
  { slug: "sitemap", priority: "0.3", changefreq: "yearly" },
];

const loc = (lang, slug) => {
  const base = lang === "en" ? "" : "/es";
  if (!slug) return `${SITE_URL}${base || "/"}`;
  return `${SITE_URL}${base}/${slug}`;
};

const today = new Date().toISOString().split("T")[0];

const urls = [];
["en", "es"].forEach((lang) => {
  PAGES.forEach((p) => {
    const enHref = loc("en", p.slug);
    const esHref = loc("es", p.slug);
    urls.push(
      [
        "  <url>",
        `    <loc>${loc(lang, p.slug)}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${p.changefreq}</changefreq>`,
        `    <priority>${p.priority}</priority>`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${enHref}"/>`,
        `    <xhtml:link rel="alternate" hreflang="es" href="${esHref}"/>`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${enHref}"/>`,
        "  </url>",
      ].join("\n")
    );
  });
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`;

const out = path.join(__dirname, "..", "public", "sitemap.xml");
fs.writeFileSync(out, xml);
console.log(`Wrote ${out} (${PAGES.length * 2} URLs)`);
