import React from "react";
import Seo from "../seo/Seo";
import LangLink from "../components/LangLink";
import { useLang, useT } from "../i18n";

export default function Process() {
  const lang = useLang();
  const t = useT();
  const p = t.process;

  return (
    <>
      <Seo lang={lang} pageKey="process" title={t.meta.process.title} description={t.meta.process.description} />

      <section className="hero-container" aria-hidden="true">
        <div className="hero"></div>
      </section>

      <section className="request" id="request" aria-labelledby="process-title">
        <h2 id="process-title" style={{ margin: 0 }}>{p.title}</h2>
        <h3 style={{ textAlign: "center", marginBottom: "35px" }}>{p.subtitle}</h3>

        <div>
          <div className="steps-infographic">
            <p>{p.intro}</p>

            {p.prices.map((price, i) => (
              <div className="price" key={i}>
                <div style={price.muted ? { backgroundColor: "#eee" } : undefined}>
                  {price.amount}
                  {price.amountExtra && (<><br />{price.amountExtra}</>)}
                </div>
                <div>
                  <h5 style={{ marginTop: "1rem" }}>{price.title}</h5>
                  <p>{price.description}</p>
                </div>
              </div>
            ))}

            <p style={{ marginTop: "1rem" }}>{p.note1}</p>
            <p style={{ marginTop: "1rem" }}>{p.note2}</p>

            <h3 style={{ marginTop: "3rem" }}>{p.stepsHeading}</h3>
            <div className="steps-container" style={{ marginTop: "40px" }}>
              {p.steps.map((step, i) => (
                <div className="step-item" key={i}>
                  <div className={`step-marker${step.final ? " step-marker-final" : ""}`} aria-hidden="true">{i + 1}</div>
                  <div className="step-line"></div>
                  <div className="step-content">
                    <span className="actor">{step.actor}</span> {step.text}
                    {step.link && (
                      <> (<LangLink page="request">{t.common.startNow}</LangLink>)</>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="request-form-container" style={{ marginTop: "100px" }}>
            <h4>{p.notesTitle}</h4>
            <ul style={{ paddingLeft: "20px" }}>
              {p.notes.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </div>

          <h2 style={{ marginTop: "120px" }}>{p.otherPricing}</h2>
        </div>
      </section>
    </>
  );
}
