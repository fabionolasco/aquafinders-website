import { useEffect } from "react";
import { ANALYTICS, analyticsEnabled } from "../config/siteConfig";

// Loads Google Analytics (GA4) and Google Tag Manager, deferred so they never
// block first paint. No-op unless running on the production domain.
export default function Analytics() {
  useEffect(() => {
    if (!analyticsEnabled()) return undefined;

    const timer = setTimeout(() => {
      // Google Analytics (gtag.js)
      const gtag = document.createElement("script");
      gtag.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.gaId}`;
      gtag.async = true;
      document.body.appendChild(gtag);

      window.dataLayer = window.dataLayer || [];
      function track() {
        window.dataLayer.push(arguments);
      }
      track("js", new Date());
      track("config", ANALYTICS.gaId);

      // Google Tag Manager
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const gtm = document.createElement("script");
      gtm.async = true;
      gtm.src = `https://www.googletagmanager.com/gtm.js?id=${ANALYTICS.gtmId}`;
      document.body.appendChild(gtm);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
