import React from "react";
import { Helmet } from "react-helmet-async";
import LangLink from "../components/LangLink";
import { useT } from "../i18n";

export default function NotFound() {
  const t = useT();
  return (
    <div className="notfound">
      <Helmet>
        <title>{`${t.notFound.title} - AquaFinders`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <h2>404 — {t.notFound.title}</h2>
      <p>{t.notFound.text}</p>
      <LangLink page="home" className="cta-button cta-button-now">{t.notFound.backHome}</LangLink>
    </div>
  );
}
