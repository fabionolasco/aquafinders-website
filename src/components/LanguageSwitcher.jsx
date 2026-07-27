import React from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";

// Fixed EN/ES language switcher (top-right). Links to the other language home.
export default function LanguageSwitcher() {
  const lang = useLang();
  return (
    <div className="language">
      <Link to="/" data-testid="lang-en" aria-label="English Language" className={lang === "en" ? "active" : ""}>
        EN
      </Link>
      <Link to="/es/" data-testid="lang-es" aria-label="Spanish Language" className={lang === "es" ? "active" : ""}>
        ES
      </Link>
    </div>
  );
}
