import React from "react";
import Seo from "../seo/Seo";
import PriceRow from "../components/PriceRow";
import ProcessStep from "../components/ProcessStep";
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

            {p.prices.map((price) => (
              <PriceRow price={price} key={price.title} />
            ))}

            <p style={{ marginTop: "1rem" }}>{p.note1}</p>
            <p style={{ marginTop: "1rem" }}>{p.note2}</p>

            <h3 style={{ marginTop: "3rem" }}>{p.stepsHeading}</h3>
            <div className="steps-container" style={{ marginTop: "40px" }}>
              {p.steps.map((step, i) => (
                <ProcessStep step={step} number={i + 1} key={`${i + 1}-${step.actor}`} />
              ))}
            </div>
          </div>

          <div className="request-form-container" style={{ marginTop: "100px" }}>
            <h4>{p.notesTitle}</h4>
            <ul style={{ paddingLeft: "20px" }}>
              {p.notes.map((n) => <li key={n.slice(0, 40)}>{n}</li>)}
            </ul>
          </div>

          <h2 style={{ marginTop: "120px" }}>{p.otherPricing}</h2>
        </div>
      </section>
    </>
  );
}
