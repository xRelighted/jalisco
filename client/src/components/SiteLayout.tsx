import { ArrowUpRight, Instagram, MapPin, Menu as MenuIcon, X } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import ResponsiveImage from "@/components/ResponsiveImage";
import OpeningHours from "@/components/OpeningHours";
import { brandLogo, business, copy, instagramHandle, locations, pedidosYaIcon, safeExternalLink } from "@/data/site";

function BrandLogo() {
  return <picture className="brand__seal" aria-hidden="true"><source type="image/webp" srcSet={brandLogo.webp} /><img src={brandLogo.fallback} width={40} height={40} alt="" /></picture>;
}

export function WhatsappMark({ size = 21 }: { size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M20.1 11.9a8.05 8.05 0 0 1-11.9 7.05L4 20l1.1-4.05A8.05 8.05 0 1 1 20.1 11.9Z" stroke="currentColor" strokeWidth="1.7"/><path d="M9 8.1c.2-.45.42-.46.65-.46h.55c.18 0 .4.07.5.4l.72 1.76c.08.2.05.39-.08.57l-.52.63c-.14.17-.16.34-.05.52.35.62.94 1.33 1.68 1.9.61.48 1.23.78 1.68.93.2.07.37.03.5-.14l.71-.86c.15-.18.34-.22.56-.13l1.68.79c.27.13.34.29.31.5-.08.54-.35 1.14-.78 1.5-.53.45-1.2.62-1.9.53-1.04-.13-2.38-.74-3.7-1.88-1.57-1.35-2.55-2.95-2.83-4-.23-.87-.06-1.58.32-2.15Z" fill="currentColor"/></svg>;
}

export function ScrollReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      node.classList.add("scroll-reveal--ready");
      if (entry.isIntersecting) {
        node.classList.add("scroll-reveal--visible");
        observer.unobserve(node);
      }
    }, { threshold: .15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  const style = { "--scroll-reveal-delay": `${delay}s` } as CSSProperties;
  return <div ref={ref} className={`scroll-reveal${className ? ` ${className}` : ""}`} style={style}>{children}</div>;
}

function InstagramLink() {
  return <a className="nav-instagram" href={business.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${instagramHandle}`}><Instagram size={18} aria-hidden="true" /><span>{instagramHandle}</span></a>;
}

function MobileActionBar() {
  const location = locations[0];
  return <nav className="mobile-action-bar" aria-label="Acciones rápidas">
    <a className="mobile-action-bar__order" href={business.whatsapp} {...safeExternalLink}><WhatsappMark size={18} /><span>Pedir</span></a>
    <a className="mobile-action-bar__reserve" href={business.reservations} {...safeExternalLink}><span>Reservar</span><ArrowUpRight size={15} aria-hidden="true" /></a>
    <a className="mobile-action-bar__directions" href={location.directions} {...safeExternalLink}><MapPin size={18} /><span>Cómo llegar</span></a>
  </nav>;
}

export default function SiteLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  useEffect(() => { const update = () => setScrolled(window.scrollY > 24); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  useEffect(() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }, [location.pathname]);

  return <div className="site-shell">
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}><div className="nav-inner">
      <Link className="brand" to="/" aria-label={`${business.name}, inicio`}><BrandLogo /><span className="brand__wordmark"><span>Jalisco</span><small>Mexican grill</small></span></Link>
      <nav className="desktop-nav" aria-label="Navegación principal"><Link to="/menu">Menú</Link><Link to="/reservas">Reservas</Link><InstagramLink /></nav>
      <a className="mobile-instagram" href={business.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${instagramHandle}`}><Instagram size={19} aria-hidden="true" /></a>
      <button className="mobile-nav-toggle" type="button" aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((value) => !value)}>{mobileOpen ? <X size={21} /> : <MenuIcon size={21} />}</button>
    </div>{mobileOpen && <nav className="mobile-nav" aria-label="Navegación móvil"><Link to="/menu" onClick={() => setMobileOpen(false)}>Menú</Link><Link to="/reservas" onClick={() => setMobileOpen(false)}>Reservas</Link><InstagramLink /></nav>}</header>
    <div key={location.pathname} className="route-transition"><Outlet /></div>
    <footer className="footer">
      <div className="footer__diamond-strip" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
      <div className="section-wrap footer__main">
        <Link className="brand brand--footer" to="/" aria-label={`${business.name}, inicio`}><BrandLogo /><span className="brand__wordmark"><span>Jalisco</span><small>Mexican grill</small></span></Link>
        <p>{copy.footer}</p>
        <div className="footer__hours"><strong>Horarios</strong><OpeningHours variant="schedule" /></div>
        <div className="footer__links"><a className="footer__instagram" href={business.instagram} {...safeExternalLink}><Instagram size={19} aria-hidden="true" />{instagramHandle}</a><a className="footer__whatsapp" href={business.whatsapp} {...safeExternalLink}><WhatsappMark size={18} />WhatsApp</a><a className="footer__pedidosya" href={business.pedidosYa} {...safeExternalLink}><img src={pedidosYaIcon} width="24" height="24" alt="" />PedidosYa</a></div>
      </div>
      <div className="section-wrap footer__bottom"><span>Jalisco Mexican Grill</span><span>{locations[0].address}</span></div>
    </footer>
    <a className="whatsapp-float" href={business.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Pedir por WhatsApp"><span className="whatsapp-float__pulse" aria-hidden="true" /><WhatsappMark size={26} /></a>
    <MobileActionBar />
  </div>;
}
