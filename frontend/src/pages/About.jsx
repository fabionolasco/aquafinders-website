import React from "react";
import Seo from "../seo/Seo";
import Picture from "../components/Picture";
import InsuredCta from "../components/InsuredCta";
import { useLang, useT } from "../i18n";

export default function About() {
  const lang = useLang();
  const t = useT();
  const a = t.about;

  return (
    <>
      <Seo lang={lang} pageKey="about" title={t.meta.about.title} description={t.meta.about.description} />

      <section className="hero-container" aria-hidden="true">
        <div className="hero"></div>
      </section>

      <section id="about-us" className="about-us" aria-labelledby="about-us-title">
        <h2 id="about-us-title">{a.heading}</h2>
        <div className="about-content">
          <div className="about-text">
            {a.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            {a.closing.map((c, i) => <p key={`c${i}`}>{c}</p>)}
            <InsuredCta />
          </div>
          <div className="about-image">
            <Picture
              avif="/images/field-work-medium.avif"
              src="/images/field-work-xlarge.png"
              alt={a.imageAlt}
              width="448"
              height="672"
            />
          </div>
        </div>
      </section>
    </>
  );
}
