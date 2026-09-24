import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { Instagram, Menu as MenuIcon, X } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { business, copy, instagramHandle } from "@/data/site";

export function WhatsappMark({ size = 21 }: { size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M20.1 11.9a8.05 8.05 0 0 1-11.9 7.05L4 20l1.1-4.05A8.05 8.05 0 1 1 20.1 11.9Z" stroke="currentColor" strokeWidth="1.7"/><path d="M9 8.1c.2-.45.42-.46.65-.46h.55c.18 0 .4.07.5.4l.72 1.76c.08.2.05.39-.08.57l-.52.63c-.14.17-.16.34-.05.52.35.62.94 1.33 1.68 1.9.61.48 1.23.78 1.68.93.2.07.37.03.5-.14l.71-.86c.15-.18.34-.22.56-.13l1.68.79c.27.13.34.29.31.5-.08.54-.35 1.14-.78 1.5-.53.45-1.2.62-1.9.53-1.04-.13-2.38-.74-3.7-1.88-1.57-1.35-2.55-2.95-2.83-4-.23-.87-.06-1.58.32-2.15Z" fill="currentColor"/></svg>;
}
export function ScrollReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <m.div className={className} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .48, delay, ease: [.22, 1, .36, 1] }}>{children}</m.div>;
}
function InstagramLink() { return <a className="nav-instagram" href={business.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${instagramHandle}`}><Instagram size={18} aria-hidden="true" /><span>{instagramHandle}</span></a>; }
export default function SiteLayout() {
  const [scrolled, setScrolled] = useState(false); const [mobileOpen, setMobileOpen] = useState(false); const location = useLocation();
  useEffect(() => { const update = () => setScrolled(window.scrollY > 24); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  useEffect(() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }, [location.pathname]);
  return <LazyMotion features={domAnimation}><div className="site-shell">
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}><div className="nav-inner">
      <Link className="brand" to="/" aria-label={`${business.name}, inicio`}><span className="brand__seal" aria-hidden="true">J</span><span className="brand__wordmark"><span>Jalisco</span><small>Mexican grill</small></span></Link>
      <nav className="desktop-nav" aria-label="Navegación principal"><Link to="/menu">Menú</Link><Link to="/reservas">Reservas</Link><InstagramLink /></nav>
      <a className="mobile-instagram" href={business.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${instagramHandle}`}><Instagram size={19} aria-hidden="true" /></a>
      <button className="mobile-nav-toggle" type="button" aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}>{mobileOpen ? <X size={21} /> : <MenuIcon size={21} />}</button>
    </div><AnimatePresence>{mobileOpen && <m.nav className="mobile-nav" aria-label="Navegación móvil" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .18 }}><Link to="/menu" onClick={() => setMobileOpen(false)}>Menú</Link><Link to="/reservas" onClick={() => setMobileOpen(false)}>Reservas</Link><InstagramLink /></m.nav>}</AnimatePresence></header>
    <AnimatePresence mode="wait"><m.div key={location.pathname} className="route-transition" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: .22 }}><Outlet /></m.div></AnimatePresence>
    <footer className="footer"><div className="section-wrap footer__main"><Link className="brand brand--footer" to="/" aria-label={`${business.name}, inicio`}><span className="brand__seal" aria-hidden="true">J</span><span className="brand__wordmark"><span>Jalisco</span><small>Mexican grill</small></span></Link><p>{copy.footer}</p><a className="footer__instagram" href={business.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={19} aria-hidden="true" />{instagramHandle}</a></div></footer>
    <a className="whatsapp-float" href={business.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Pedir por WhatsApp"><span className="whatsapp-float__pulse" aria-hidden="true" /><WhatsappMark size={26} /></a>
  </div></LazyMotion>;
}
