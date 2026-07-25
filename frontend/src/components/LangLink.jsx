import React from "react";
import { Link } from "react-router-dom";
import { localizedPath } from "../config/siteConfig";
import { useLang } from "../i18n";

// Internal link that automatically resolves a page key to the correct
// language-prefixed path. Accepts an optional hash (e.g. "#contact").
export default function LangLink({ page, hash, children, ...rest }) {
  const lang = useLang();
  const base = localizedPath(page, lang);
  const to = hash ? `${base}${base === "/" ? "" : ""}${hash}` : base;
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
}
