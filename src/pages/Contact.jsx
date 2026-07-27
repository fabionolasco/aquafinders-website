import React from "react";
import Seo from "../seo/Seo";
import InsuredCta from "../components/InsuredCta";
import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";
import { useLang, useT } from "../i18n";

export default function Contact() {
  const lang = useLang();
  const t = useT();

  return (
    <>
      <Seo lang={lang} pageKey="contact" title={t.meta.contact.title} description={t.meta.contact.description} />

      <section className="hero-container" aria-hidden="true">
        <div className="hero"></div>
      </section>

      <div>
        <div id="contact" className="contact" aria-labelledby="request-title">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>

      <InsuredCta />
    </>
  );
}
