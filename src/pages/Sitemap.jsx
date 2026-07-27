import React from "react";
import { Link } from "react-router-dom";
import Seo from "../seo/Seo";
import LangLink from "../components/LangLink";
import { useLang, useT } from "../i18n";

export default function Sitemap() {
  const lang = useLang();
  const t = useT();
  const l = t.sitemap.links;
  const otherLangHome = lang === "en" ? "/es/" : "/";

  return (
    <>
      <Seo lang={lang} pageKey="sitemap" title={t.meta.sitemap.title} description={t.meta.sitemap.description} />

      <section className="hero-container" aria-hidden="true">
        <div className="hero"></div>
      </section>

      <section className="sitemap-content site-map" aria-labelledby="sitemap-title">
        <h2 id="sitemap-title">{t.sitemap.title}</h2>
        <ul className="sitemap-list">
          <li>
            <LangLink page="home">{l.home}</LangLink>
            <ul>
              <li><LangLink page="home" hash="#services">{l.ourServices}</LangLink></li>
              <li><LangLink page="about">{l.aboutUs}</LangLink></li>
              <li><LangLink page="contact">{l.contactUs}</LangLink></li>
            </ul>
          </li>
          <li><LangLink page="services">{t.nav.services}</LangLink></li>
          <li><LangLink page="request">{l.startNow}</LangLink></li>
          <li><LangLink page="process">{l.pricing}</LangLink></li>
          <li><LangLink page="faq">{l.faq}</LangLink></li>
          <li><Link to={otherLangHome}>{l.otherLanguage}</Link></li>
          <li><LangLink page="success">{l.formSubmission}</LangLink></li>
          <li><LangLink page="sitemap">{l.siteMap}</LangLink></li>
        </ul>
      </section>
    </>
  );
}
