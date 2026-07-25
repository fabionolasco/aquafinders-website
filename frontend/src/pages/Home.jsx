import React from "react";
import Seo from "../seo/Seo";
import LangLink from "../components/LangLink";
import InsuredCta from "../components/InsuredCta";
import { FindWaterIcon, AvoidWaterIcon, ResistivityIcon, StudiesIcon } from "../components/ServiceIcons";
import { useLang, useT } from "../i18n";

export default function Home() {
  const lang = useLang();
  const t = useT();

  return (
    <>
      <Seo lang={lang} pageKey="home" title={t.meta.home.title} description={t.meta.home.description} />

      <section className="hero-container" aria-labelledby="hero-title">
        <div className="hero">
          <h2 id="hero-title">{t.hero.title}</h2>
          <p>{t.hero.description}</p>
          <LangLink page="home" hash="#contact" className="cta-button" data-testid="hero-free-consultation">{t.common.freeConsultation}</LangLink>
          <LangLink page="request" className="cta-button cta-button-now" data-testid="hero-start-now">{t.common.startNow}</LangLink>
          <div style={{ width: "100%" }}>
            <audio controls aria-label={t.hero.audioLabel}>
              <source src={t.hero.audioSrc} type="audio/mp4" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </section>

      <section className="explanation">
        ✨ {t.explanationLead}
        {t.explanationStrong && <strong>{t.explanationStrong}</strong>}
        {t.explanationTail} ✨
      </section>

      <section id="services" className="services" aria-labelledby="services-title">
        <h2 id="services-title">{t.services.heading}</h2>
        <div className="service-grid">
          <div className="service-card">
            <LangLink page="findWater">
              <div className="service-icon" id="find-water-svg"><FindWaterIcon /></div>
              <h3>{t.services.cards.findWater.title}</h3>
              <p>{t.services.cards.findWater.description}</p>
            </LangLink>
          </div>
          <div className="service-card">
            <LangLink page="avoidWater">
              <div className="service-icon" id="avoid-svg"><AvoidWaterIcon /></div>
              <h3>{t.services.cards.avoidWater.title}</h3>
              <p>{t.services.cards.avoidWater.description}</p>
            </LangLink>
          </div>
          <div className="service-card service-card-soil">
            <LangLink page="resistivity">
              <div className="service-icon"><ResistivityIcon /></div>
              <h3>{t.services.cards.resistivity.title}</h3>
              <p>{t.services.cards.resistivity.description}</p>
            </LangLink>
          </div>
          <div className="service-card service-card-studies">
            <LangLink page="studies">
              <div className="service-icon"><StudiesIcon /></div>
              <h3>{t.services.cards.studies.title}</h3>
              <p>{t.services.cards.studies.description}</p>
            </LangLink>
          </div>
        </div>
      </section>

      <section className="why-us" aria-labelledby="why-us-title">
        <h2 id="why-us-title">{t.whoHires.heading}</h2>
        <div className="benefits-grid">
          {t.whoHires.items.map((item, i) => (
            <div className="benefit" key={i}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <div id="contact">
        <InsuredCta />
      </div>
    </>
  );
}
