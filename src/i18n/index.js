import React, { createContext, useContext } from "react";
import en from "./en";
import es from "./es";

const dictionaries = { en, es };

const LanguageContext = createContext({ lang: "en", t: en });

export function LanguageProvider({ lang, children }) {
  const t = dictionaries[lang] || en;
  return (
    <LanguageContext.Provider value={{ lang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Returns the current language code ("en" | "es").
export function useLang() {
  return useContext(LanguageContext).lang;
}

// Returns the active translation dictionary.
export function useT() {
  return useContext(LanguageContext).t;
}

export { dictionaries };
