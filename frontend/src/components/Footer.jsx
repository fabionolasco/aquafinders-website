import React from "react";
import LangLink from "./LangLink";
import { useT } from "../i18n";
import { CONTACT } from "../config/siteConfig";

export default function Footer() {
  const t = useT();
  const year = new Date().getFullYear();
  return (
    <footer role="contentinfo">
      <div className="footer-content">
        <div className="footer-info">
          <h2>AquaFinders</h2>
          <p>
            <span className="lean">
              {t.footer.expertServices} {t.footer.serviceArea}{" "}
              <span className="bold">{t.footer.nationwide}</span>
            </span>
          </p>
        </div>
        <div className="footer-contact">
          <p><LangLink page="contact">{t.footer.contactForm}</LangLink></p>
          <p>
            {t.footer.contactUs}: <a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a>
          </p>
          <p>
            <a href={`https://wa.me/${CONTACT.phoneDigits}`}>
              <img src="/images/WhatsApp-icon.avif" alt="" width="30" height="30" style={{ verticalAlign: "middle" }} />{" "}
              {t.footer.whatsapp}
            </a>
          </p>
          <p>
            {t.footer.email}: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
          <p>
            <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer">
              <img src="/images/facebook.avif" style={{ filter: "grayscale(100%) contrast(4)", verticalAlign: "middle" }} alt="" width="30" height="30" />{" "}
              Facebook
            </a>
          </p>
        </div>
        <div className="footer-legal">
          <p>{t.footer.trademark}</p>
          <p>&copy; {year} AquaFinders. {t.footer.allRights}</p>
          <p>{t.footer.resultsVary}</p>
          <p><LangLink page="sitemap">{t.footer.siteMap}</LangLink></p>
        </div>
      </div>
    </footer>
  );
}
