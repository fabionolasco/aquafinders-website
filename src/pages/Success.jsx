import React from "react";
import Seo from "../seo/Seo";
import LangLink from "../components/LangLink";
import { useLang, useT } from "../i18n";

export default function Success() {
  const lang = useLang();
  const t = useT();

  return (
    <>
      <Seo lang={lang} pageKey="success" title={t.meta.success.title} description={t.meta.success.description} />

      <div className="success-main">
        <section className="success" aria-labelledby="success-title">
          <h2 id="success-title">{t.success.title}</h2>
          <p>{t.success.message}</p>
          <LangLink page="home" className="cta-button cta-button-now">{t.success.backHome}</LangLink>
        </section>
      </div>
    </>
  );
}
