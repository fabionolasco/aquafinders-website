import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Analytics from "./components/Analytics";
import { renderPageRoutes } from "./routes/pageRoutes";

export default function App() {
  return (
    <>
      <Analytics />
      <Routes>
        <Route path="/" element={<Layout lang="en" />}>
          {renderPageRoutes("en")}
        </Route>
        <Route path="/es" element={<Layout lang="es" />}>
          {renderPageRoutes("es")}
        </Route>
      </Routes>
    </>
  );
}
