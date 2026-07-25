import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { renderPageRoutes } from "./routes/pageRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout lang="en" />}>
        {renderPageRoutes("en")}
      </Route>
      <Route path="/es" element={<Layout lang="es" />}>
        {renderPageRoutes("es")}
      </Route>
    </Routes>
  );
}
