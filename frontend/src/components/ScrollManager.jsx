import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to top on navigation, or to the hash target when a hash is present
// (accounts for the fixed header via CSS scroll-padding-top).
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.replace("#", ""));
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
