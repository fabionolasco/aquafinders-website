import React from "react";
import Seo from "../seo/Seo";
import Picture from "../components/Picture";
import { useLang, useT } from "../i18n";

// Gallery photo order matches the original site.
const PHOTOS = ["001", "004", "005", "006", "002", "003", "007", "008", "009"];

export default function Gallery() {
  const lang = useLang();
  const t = useT();

  return (
    <>
      <Seo lang={lang} pageKey="gallery" title={t.meta.gallery.title} description={t.meta.gallery.description} />

      <section className="hero-container" aria-hidden="true">
        <div className="hero"></div>
      </section>

      <section className="request" id="request" aria-labelledby="gallery-title">
        <h2 id="gallery-title" style={{ margin: "0 0 40px" }}>{t.gallery.title}</h2>
        <div className="gallery">
          {PHOTOS.map((n, i) => (
            <Picture key={n} avif={`/images/photo${n}.avif`} src={`/images/photo${n}.avif`} alt={t.gallery.imageAlts[i]} width="400" />
          ))}
          <Picture avif="/images/slide 1.avif" src="/images/slide 1.png" alt={t.gallery.imageAlts[9]} width="400" />
        </div>
      </section>
    </>
  );
}
