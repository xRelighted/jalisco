import { ArrowUpRight, Instagram, MapPin } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import ResponsiveImage from "@/components/ResponsiveImage";
import OpeningHours from "@/components/OpeningHours";
import TrackedLink from "@/components/TrackedLink";
import { brandLogo, business, copy, instagramHandle, locations, pedidosYaIcon, restaurantSchema, safeExternalLink } from "@/data/site";
import { Analytics } from "@vercel/analytics/react";

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
  return <TrackedLink className="nav-instagram" href={business.instagram} event="instagram" aria-label={`Instagram ${instagramHandle}, se abre en una pestaña nueva`} {...safeExternalLink}><Instagram size={18} aria-hidden="true" /><span>{instagramHandle}</span></TrackedLink>;
}

function MobileActionBar() {
  const location = locations[0];
  return <nav className="mobile-action-bar" aria-label="Acciones rápidas">
    <TrackedLink className="mobile-action-bar__order" href={business.whatsapp} event="order_whatsapp" eventData={{ location: "barra" }} {...safeExternalLink}><WhatsappMark size={18} /><span>Pedir</span></TrackedLink>
    <TrackedLink className="mobile-action-bar__reserve" href={business.reservations} event="reserve" aria-label="Reservar mesa en línea, se abre en una pestaña nueva" {...safeExternalLink}><span>Reservar</span><ArrowUpRight size={15} aria-hidden="true" /></TrackedLink>
    <TrackedLink className="mobile-action-bar__directions" href={location.directions} event="directions" aria-label="Cómo llegar a Jalisco Mexican Grill en Paseo Deltoto, se abre en una pestaña nueva" {...safeExternalLink}><MapPin size={18} /><span>Cómo llegar</span></TrackedLink>
  </nav>;
}

function CopyrightYear() {
  return <span>© {import.meta.env.VITE_PARAGUAY_YEAR} Jalisco Mexican Grill</span>;
}

function ProductionAnalytics({ route }: { route: string }) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => setEnabled(window.location.hostname === "jaliscopy.vercel.app"), []);
  return enabled ? <Analytics route={route} /> : null;
}

export default function SiteLayout() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (previousPath.current === location.pathname) return;
    previousPath.current = location.pathname;
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>("#contenido h1") ?? document.getElementById("contenido");
      target?.focus({ preventScroll: true });
    });
  }, [location.pathname]);

  return <div className="site-shell">
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema).replace(/</g, "\\u003c") }} />
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}><div className="nav-inner">
      <Link className="brand" to="/" aria-current={location.pathname === "/" ? "page" : undefined}><BrandLogo /><span className="brand__wordmark"><span>Jalisco</span><small>Mexican grill</small></span></Link>
      <nav className="desktop-nav" aria-label="Navegación principal">
        <NavLink to="/menu" className={({ isActive }) => isActive ? "is-active" : undefined} aria-label="Menú">Menú</NavLink>
        <NavLink to="/reservas" className={({ isActive }) => isActive ? "is-active" : undefined} aria-label="Reservas">Reservas</NavLink>
        <InstagramLink />
      </nav>
      <TrackedLink className="nav-order" href={business.whatsapp} event="order_whatsapp" eventData={{ location: "header" }} aria-label="Pedir por WhatsApp, se abre en una pestaña nueva" {...safeExternalLink}><WhatsappMark size={17} />Pedir por WhatsApp</TrackedLink>
      <TrackedLink className="mobile-instagram" href={business.instagram} event="instagram" aria-label={`Instagram ${instagramHandle}, se abre en una pestaña nueva`} {...safeExternalLink}><Instagram size={19} aria-hidden="true" /></TrackedLink>
      <nav className="mobile-inline-nav" aria-label="Navegación principal móvil">
        <NavLink to="/menu" className={({ isActive }) => isActive ? "is-active" : undefined}>Menú</NavLink>
        <NavLink to="/reservas" className={({ isActive }) => isActive ? "is-active" : undefined}>Reservas</NavLink>
      </nav>
    </div></header>
    <div key={location.pathname} className="route-transition"><Outlet /></div>
    <footer className="footer">
      <div className="footer__diamond-strip" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /></div>
      <div className="section-wrap footer__main">
        <Link className="brand brand--footer" to="/" aria-current={location.pathname === "/" ? "page" : undefined}><BrandLogo /><span className="brand__wordmark"><span>Jalisco</span><small>Mexican grill</small></span></Link>
        <div className="footer__location"><strong>Encontranos en</strong><p>{copy.footer}</p><OpeningHours variant="compact" /></div>
        <nav className="footer__links" aria-label="Redes y contacto">
          <TrackedLink className="footer__instagram" href={business.instagram} event="instagram" aria-label="Instagram @jaliscopy, se abre en una pestaña nueva" {...safeExternalLink}><Instagram size={19} aria-hidden="true" />{instagramHandle}</TrackedLink>
          <TrackedLink className="footer__whatsapp" href={business.whatsapp} event="order_whatsapp" eventData={{ location: "footer" }} aria-label="Pedir por WhatsApp, se abre en una pestaña nueva" {...safeExternalLink}><WhatsappMark size={18} />WhatsApp</TrackedLink>
          <TrackedLink className="footer__pedidosya" href={business.pedidosYa} event="order_pedidosya" aria-label="Pedir por PedidosYa, se abre en una pestaña nueva" {...safeExternalLink}><img src={pedidosYaIcon} width="24" height="24" alt="" />PedidosYa</TrackedLink>
        </nav>
      </div>
      <div className="section-wrap footer__bottom"><CopyrightYear /></div>
    </footer>
    <TrackedLink className="whatsapp-float" href={business.whatsapp} event="order_whatsapp" eventData={{ location: "flotante" }} aria-label="Pedir por WhatsApp, se abre en una pestaña nueva" {...safeExternalLink}><span className="whatsapp-float__pulse" aria-hidden="true" /><WhatsappMark size={26} /></TrackedLink>
    <MobileActionBar />
    <ProductionAnalytics route={location.pathname} />
  </div>;
}
