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

export default function Services() {
  const lang = useLang();
  const t = useT();
  const s = t.servicesList;

  return (
    <>
      <Seo lang={lang} pageKey="services" title={t.meta.services.title} description={t.meta.services.description} />

      <section className="hero-container" aria-hidden="true">
        <div className="hero"></div>
      </section>

      <h2 id="services-title" style={{ margin: "40px auto 0", textAlign: "center" }}>{s.heading}</h2>

      <div className="all-services service-grid">
        {s.cards.map((card) => (
          <section className="services-section service-card" aria-label={card.title} key={card.key}>
            <LangLink page={card.key} style={{ textAlign: "center" }}>
              <div className="service-icon" id={ICON_IDS[card.key]}>{ICONS[card.key]}</div>
              <h3>{card.title}</h3>
              <h4>{card.subtitle}</h4>
            </LangLink>
            <LangLink page={card.key} style={{ textDecoration: "none" }}>
              <ul style={{ paddingLeft: "20px" }}>
                {card.items.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
            </LangLink>
          </section>
        ))}
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "0 1rem" }}>
        <h3 style={{ marginTop: "2rem" }}>{s.sampleHeading}</h3>
        <h5>{s.sampleDescription}</h5>
        <Picture avif="/images/slide 1.avif" src="/images/slide 1.png" alt={t.gallery.imageAlts[9]} width="680" imgStyle={{ width: "100%", height: "auto" }} />
      </div>

      <InsuredCta />
    </>
  );
}
