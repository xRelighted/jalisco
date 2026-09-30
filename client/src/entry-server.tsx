import React from "react";
import { Suspense } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import MenuPage from "./pages/Menu";
import NotFound from "./pages/NotFound";
import Reservations from "./pages/Reservations";
import RouteTree from "./RouteTree";

export { metadataForPath, photos, siteUrl } from "./data/site";

export function render(location: string) {
  return renderToString(
    <ErrorBoundary>
      <StaticRouter location={location}>
        <Suspense fallback={<div className="page-loading" role="status" aria-label="Cargando"><span /></div>}>
          <RouteTree home={<Home />} menu={<MenuPage />} reservations={<Reservations />} notFound={<NotFound />} />
        </Suspense>
      </StaticRouter>
    </ErrorBoundary>,
  );
}
