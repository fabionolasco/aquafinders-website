import React, { useEffect } from "react";
import Seo from "../seo/Seo";
import InsuredCta from "../components/InsuredCta";
import { useLang, useT } from "../i18n";
import { CONTACT, WEB3FORMS_KEY, SITE_URL, localizedPath } from "../config/siteConfig";

export default function Contact() {
  const lang = useLang();
  const t = useT();
  const c = t.contact;
  const redirectUrl = `${SITE_URL}${localizedPath("success", lang)}`;

  // Load the Web3Forms client script (renders the hCaptcha widget).
  useEffect(() => {
    const existing = document.getElementById("web3forms-script");
    if (existing) return;
    const script = document.createElement("script");
    script.id = "web3forms-script";
    script.src = "https://web3forms.com/client/script.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Seo lang={lang} pageKey="contact" title={t.meta.contact.title} description={t.meta.contact.description} />

      <section className="hero-container" aria-hidden="true">
        <div className="hero"></div>
      </section>

      <div>
        <div id="contact" className="contact" aria-labelledby="request-title">
          <div className="contact-form">
            <h2>{c.formHeading}</h2>
            <form method="post" id="contact-form" name="contact-form" action="https://api.web3forms.com/submit" className="contact-form">
              <input type="hidden" name="from_name" value="AquaFinders Contact" />
              <input type="hidden" name="subject" value="AquaFinders Website Contact" />
              <input type="hidden" name="redirect" value={redirectUrl} />
              <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} tabIndex="-1" autoComplete="off" />

              <label htmlFor="name">{c.name}</label>
              <input type="text" id="name" name="name" placeholder={c.name} required data-testid="contact-name" />

              <label htmlFor="email">{c.email}</label>
              <input type="email" id="email" name="email" placeholder={c.email} required data-testid="contact-email" />

              <label htmlFor="phone">{c.phone}</label>
              <input type="tel" id="phone" name="phone" placeholder={c.phone} required data-testid="contact-phone" />

              <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                <legend style={{ padding: 0 }}>{c.preferred}</legend>
                <div>
                  <input type="checkbox" id="preferredEmail" name="preferred[]" value="email" />{" "}
                  <label htmlFor="preferredEmail" style={{ display: "inline" }}>{c.prefEmail}</label>
                </div>
                <div>
                  <input type="checkbox" id="preferredCall" name="preferred[]" value="phoneCall" />{" "}
                  <label htmlFor="preferredCall" style={{ display: "inline" }}>{c.prefCall}</label>
                </div>
                <div>
                  <input type="checkbox" id="preferredText" name="preferred[]" value="phoneText" />{" "}
                  <label htmlFor="preferredText" style={{ display: "inline" }}>{c.prefText}</label>
                </div>
              </fieldset>

              <label htmlFor="message">{c.message}</label>
              <textarea id="message" name="message" placeholder={c.message} required data-testid="contact-message"></textarea>

              <div className="h-captcha" data-captcha="true"></div>
              <button type="submit" className="cta-button" data-testid="contact-submit">{c.submit}</button>
            </form>
          </div>

          <div className="contact-data">
            <div className="contact-info">
              <h2 id="request-title">{c.readyTitle}</h2>
              <span>{c.weSpeak}</span>
              <span>{c.byAppointment}</span>
              <span>{c.phoneLabel}: <a title={c.phoneLabel} href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a> {c.phoneHours}</span>
              <span>{c.emailLabel}: <a title={c.emailLabel} href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></span>
            </div>
          </div>
        </div>
      </div>

      <InsuredCta />
    </>
  );
}
