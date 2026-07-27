import React from "react";
import LangLink from "./LangLink";
import { useT } from "../i18n";

// A single numbered step in the Process infographic.
export default function ProcessStep({ step, number }) {
  const t = useT();
  return (
    <div className="step-item">
      <div className={`step-marker${step.final ? " step-marker-final" : ""}`} aria-hidden="true">{number}</div>
      <div className="step-line"></div>
      <div className="step-content">
        <span className="actor">{step.actor}</span> {step.text}
        {step.link && (
          <> (<LangLink page="request">{t.common.startNow}</LangLink>)</>
        )}
      </div>
    </div>
  );
}
