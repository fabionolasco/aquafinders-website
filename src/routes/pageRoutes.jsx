import React from "react";
import { Route } from "react-router-dom";
import { PAGES } from "../config/siteConfig";

import Home from "../pages/Home";
import Services from "../pages/Services";
import ServiceDetail from "../pages/ServiceDetail";
import Process from "../pages/Process";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Faq from "../pages/Faq";
import Gallery from "../pages/Gallery";
import Request from "../pages/Request";
import Success from "../pages/Success";
import Sitemap from "../pages/Sitemap";
import NotFound from "../pages/NotFound";

// Page routes shared by both languages. Rendered relative to the language
// layout (root for EN, "/es" for ES), so slugs are defined once.
export function renderPageRoutes(keyPrefix) {
  return [
    <Route index key={`${keyPrefix}-home`} element={<Home />} />,
    <Route path={PAGES.services.slug} key={`${keyPrefix}-services`} element={<Services />} />,
    <Route path={PAGES.findWater.slug} key={`${keyPrefix}-find`} element={<ServiceDetail pageKey="findWater" />} />,
    <Route path={PAGES.avoidWater.slug} key={`${keyPrefix}-avoid`} element={<ServiceDetail pageKey="avoidWater" />} />,
    <Route path={PAGES.resistivity.slug} key={`${keyPrefix}-res`} element={<ServiceDetail pageKey="resistivity" />} />,
    <Route path={PAGES.studies.slug} key={`${keyPrefix}-studies`} element={<ServiceDetail pageKey="studies" />} />,
    <Route path={PAGES.process.slug} key={`${keyPrefix}-process`} element={<Process />} />,
    <Route path={PAGES.about.slug} key={`${keyPrefix}-about`} element={<About />} />,
    <Route path={PAGES.contact.slug} key={`${keyPrefix}-contact`} element={<Contact />} />,
    <Route path={PAGES.faq.slug} key={`${keyPrefix}-faq`} element={<Faq />} />,
    <Route path={PAGES.gallery.slug} key={`${keyPrefix}-gallery`} element={<Gallery />} />,
    <Route path={PAGES.request.slug} key={`${keyPrefix}-request`} element={<Request />} />,
    <Route path={PAGES.success.slug} key={`${keyPrefix}-success`} element={<Success />} />,
    <Route path={PAGES.sitemap.slug} key={`${keyPrefix}-sitemap`} element={<Sitemap />} />,
    <Route path="*" key={`${keyPrefix}-404`} element={<NotFound />} />,
  ];
}
