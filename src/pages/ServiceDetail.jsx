import React from "react";
import Seo from "../seo/Seo";
import LangLink from "../components/LangLink";
import Picture from "../components/Picture";
import InsuredCta from "../components/InsuredCta";
import { FindWaterIcon, AvoidWaterIcon, ResistivityIcon, StudiesIcon } from "../components/ServiceIcons";
import { useLang, useT } from "../i18n";

const ICONS = {
  findWater: <FindWaterIcon />,
  avoidWater: <AvoidWaterIcon />,
  resistivity: <ResistivityIcon />,
  studies: <StudiesIcon />,
};
const ICON_IDS = { findWater: "find-water-svg", avoidWater: "avoid-svg" };

// Shared layout for the four service detail pages (find-water, avoid-water,
// resistivity, studies). `pageKey` selects content + SEO.
export default function ServiceDetail({ pageKey }) {
  const lang = useLang();
  const t = useT();
  const content = t.servicePages[pageKey];
  const meta = t.meta[pageKey];

  return (
    <>
      <Seo lang={lang} pageKey={pageKey} title={meta.title} description={meta.description} />

      <section className="hero-container" aria-hidden="true">
        <div className="hero"></div>
      </section>

      <section className="request" id="request" aria-labelledby="service-title">
        <div className="box-left">
          <div className={`service-icon${ICON_IDS[pageKey] ? "" : ""}`} id={ICON_IDS[pageKey]}>
            {ICONS[pageKey]}
          </div>
          <h2 id="service-title">{content.heading}</h2>
          {content.body.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
          <p>
            <LangLink page="process" className="small block mb40">{t.common.infoProcess}</LangLink>
          </p>
        </div>
        <div className="box-right">
          <h3>{t.common.sampleResistivity}</h3>
          <div className="gallery">
            <Picture avif="/images/slide 1.avif" src="/images/slide 1.png" alt={t.gallery.imageAlts[9]} width="400" />
          </div>
          <p><LangLink page="gallery">{t.common.imageGallery}</LangLink></p>
        </div>
      </section>

      <InsuredCta />
    </>
  );
}
