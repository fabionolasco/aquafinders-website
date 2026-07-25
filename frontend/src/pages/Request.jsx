import React from "react";
import Seo from "../seo/Seo";
import { useLang, useT } from "../i18n";
import { GOOGLE_FORM_URL } from "../config/siteConfig";

export default function Request() {
  const lang = useLang();
  const t = useT();

  return (
    <>
      <Seo lang={lang} pageKey="request" title={t.meta.request.title} description={t.meta.request.description} />

      <section className="hero-container" aria-hidden="true">
        <div className="hero"></div>
      </section>

      <section className="request" id="request" aria-labelledby="request-title">
        <h2 id="request-title" style={{ margin: 0 }}>{t.request.title}</h2>
        <p style={{ maxWidth: "800px", margin: "1rem auto 2rem" }}>{t.request.intro}</p>
        <div style={{ width: "100%" }}>
          <iframe
            title={t.request.iframeTitle}
            style={{ display: "block", margin: "0 auto", width: "100%" }}
            src={GOOGLE_FORM_URL}
            height="3010"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
          >
            {t.request.loading}
          </iframe>
        </div>
      </section>
    </>
  );
}
