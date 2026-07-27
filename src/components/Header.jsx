import React, { useState } from "react";
import { Link } from "react-router-dom";
import LangLink from "./LangLink";
import { localizedPath } from "../config/siteConfig";
import { useLang, useT } from "../i18n";

export default function Header() {
  const lang = useLang();
  const t = useT();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const otherLangHome = lang === "en" ? "/es/" : "/";

  return (
    <header role="banner">
      <nav aria-label="Primary">
        <div className="logo">
          <Link to={localizedPath("home", lang)} data-testid="header-logo" aria-label="AquaFinders - Find water and well drilling solutions">
            <picture>
              <source srcSet="/images/logo-horizontal.avif" type="image/avif" />
              <img src="/images/logo-horizontal.png" alt="AquaFinders" width="200" height="43" />
            </picture>
          </Link>
        </div>
        <h1 className="sr-only">AquaFinders - Find water and well drilling solutions</h1>
        <button
          className={`mobile-menu-toggle${open ? " active" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="primary-navigation"
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
        </button>
        <div id="primary-navigation" className={`nav-container${open ? " active" : ""}`}>
          <ul className="nav-links">
            <li><LangLink page="services" onClick={close} data-testid="nav-services">{t.nav.services}</LangLink></li>
            <li><LangLink page="process" onClick={close} data-testid="nav-pricing">{t.nav.pricing}</LangLink></li>
            <li><LangLink page="about" onClick={close} data-testid="nav-about">{t.nav.about}</LangLink></li>
            <li><LangLink page="request" onClick={close} data-testid="nav-start">{t.nav.start}</LangLink></li>
            <li><LangLink page="faq" onClick={close} data-testid="nav-faq">{t.nav.faq}</LangLink></li>
            <li><LangLink page="contact" onClick={close} data-testid="nav-contact">{t.nav.contact}</LangLink></li>
            <li className="show-on-mobile">
              <Link to={otherLangHome} onClick={close} data-testid="nav-lang-toggle">{t.nav.otherLanguage}</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
