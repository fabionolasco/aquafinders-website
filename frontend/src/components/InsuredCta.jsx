import React from "react";
import LangLink from "./LangLink";
import { useT } from "../i18n";

// Shared "We are insured!" badge + Start now call-to-action block.
export default function InsuredCta() {
  const t = useT();
  return (
    <div className="text-center" role="region" aria-label={t.common.weAreInsured}>
      <div style={{ margin: "40px auto" }}>
        <p className="bonded-insured">✅ &nbsp; {t.common.weAreInsured}</p>
      </div>
      <div className="ready text-center">
        <LangLink page="request" className="cta-button cta-button-now" data-testid="cta-start-now">
          &nbsp; &nbsp; {t.common.startNow} &nbsp; &nbsp;
        </LangLink>
      </div>
    </div>
  );
}
