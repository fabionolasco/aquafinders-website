import React, { useState } from "react";
import Seo from "../seo/Seo";
import LangLink from "../components/LangLink";
import Picture from "../components/Picture";
import Accordion from "../components/Accordion";
import InsuredCta from "../components/InsuredCta";
import { useLang, useT } from "../i18n";

// Renders a single answer fragment (paragraph or a special block).
function AnswerPart({ part, t }) {
  if (typeof part === "string") return <p>{part}</p>;
  if (part.type === "process-link") {
    return (
      <p>
        {t.faq.costLinkPrefix}
        <LangLink page="process">{t.faq.costLinkText}</LangLink>
        {t.faq.costLinkSuffix}
      </p>
    );
  }
  if (part.type === "usgs") {
    return (
      <p>
        {t.faq.usgsPrefix}
        <a href="https://www.usgs.gov/about/about-us" target="_blank" rel="noopener noreferrer" title="USGS">{t.faq.usgsText}</a>
        {t.faq.usgsSuffix}
      </p>
    );
  }
  if (part.type === "ert-image") {
    return <Picture avif="/images/ert.avif" src="/images/ert.jpeg" alt={t.faq.ertAlt} width="600" height="400" />;
  }
  return null;
}

// Collapsible question inside an accordion section.
function FaqItem({ item, t }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-${item.q.replace(/\W+/g, "-")}`;
  return (
    <div className={`faq-item${open ? "" : " faq-content-hidden"}`}>
      <button
        type="button"
        className="faq-trigger"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {item.q}
      </button>
      <div className="faq-content" id={panelId} hidden={!open}>
        {item.a.map((part, i) => <AnswerPart key={i} part={part} t={t} />)}
      </div>
    </div>
  );
}

export default function Faq() {
  const lang = useLang();
  const t = useT();

  const accordionItems = t.faq.sections.map((section) => ({
    title: section.title,
    content: (
      <div className="faq-list">
        {section.intro && <div className="faq-item">{section.intro}</div>}
        {section.items.map((item, i) => <FaqItem key={i} item={item} t={t} />)}
      </div>
    ),
  }));

  return (
    <>
      <Seo lang={lang} pageKey="faq" title={t.meta.faq.title} description={t.meta.faq.description} />

      <section className="faq hero-container" aria-hidden="true">
        <div className="hero"></div>
      </section>

      <section className="faq" id="faq" aria-labelledby="faq-title">
        <h2 id="faq-title">{t.faq.title}</h2>
        <Accordion items={accordionItems} defaultOpen={0} />
        <div style={{ maxWidth: "650px", margin: "0 auto" }}>
          <h4 style={{ color: "red" }}>{t.faq.importantTitle}</h4>
          <p>{t.faq.importantText}</p>
        </div>
      </section>

      <InsuredCta />
    </>
  );
}
