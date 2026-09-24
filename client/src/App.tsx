import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import SiteLayout from "./components/SiteLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
const Home = lazy(() => import("./pages/Home"));
const MenuPage = lazy(() => import("./pages/Menu"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Reservations = lazy(() => import("./pages/Reservations"));
import { metadataForPath, siteUrl } from "@/data/site";

function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = metadataForPath(pathname);
    document.title = page.title;
    const setMeta = (selector: string, attribute: string, value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      if (!element) { element = document.createElement("meta"); document.head.appendChild(element); }
      element.setAttribute(attribute, value);
    };
    setMeta('meta[name="description"]', "content", page.description);
    setMeta('meta[property="og:title"]', "content", page.title);
    setMeta('meta[property="og:description"]', "content", page.description);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:site_name"]', "content", "Jalisco Mexican Grill");
    setMeta('meta[property="og:image"]', "content", new URL(page.image, window.location.origin).toString());
    setMeta('meta[property="og:url"]', "content", `${siteUrl}${pathname}`);
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", page.title);
    setMeta('meta[name="twitter:description"]', "content", page.description);
    setMeta('meta[name="twitter:image"]', "content", new URL(page.image, window.location.origin).toString());
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `${siteUrl}${pathname}`;
  }, [pathname]);
  return null;
}

export default function App() {
  return <ErrorBoundary><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster /><BrowserRouter><PageMetadata /><Suspense fallback={<div className="page-loading" role="status" aria-label="Cargando"><span /></div>}><Routes><Route element={<SiteLayout />}><Route index element={<Home />} /><Route path="menu" element={<MenuPage />} /><Route path="reservas" element={<Reservations />} /><Route path="*" element={<NotFound />} /></Route></Routes></Suspense></BrowserRouter></TooltipProvider></ThemeProvider></ErrorBoundary>;
}
