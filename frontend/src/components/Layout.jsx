import React from "react";
import { Outlet } from "react-router-dom";
import { LanguageProvider, dictionaries } from "../i18n";
import Header from "./Header";
import Footer from "./Footer";
import LanguageSwitcher from "./LanguageSwitcher";
import ScrollManager from "./ScrollManager";

// Language-aware page shell: skip link, language switcher, header, the routed
// page (Outlet) and footer. `lang` is supplied by the route definition.
export default function Layout({ lang }) {
  const t = dictionaries[lang] || dictionaries.en;
  return (
    <LanguageProvider lang={lang}>
      <ScrollManager />
      <a className="skip-link" href="#top">{t.common.skipToContent}</a>
      <LanguageSwitcher />
      <Header />
      <main id="top">
        <Outlet />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
