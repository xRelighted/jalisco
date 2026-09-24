import { m } from "framer-motion";
import { Beer, Citrus, CookingPot, CupSoda, GlassWater, Popcorn, Sandwich, Snowflake, UtensilsCrossed, UsersRound, Wine, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { menu } from "@/data/menu";
import { business, copy, formatPrice, menuFacts, menuAccents, menuIcons, orderLink, photos, safeExternalLink } from "@/data/site";
import { ScrollReveal } from "@/components/SiteLayout";

const icons = [UsersRound, Popcorn, Sandwich, UtensilsCrossed, CookingPot, Wine, Snowflake, Citrus, GlassWater, Beer, CupSoda];
const menuCategoryId = (index: number) => `menu-category-${index}`;
export default function MenuPage() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const targets = menu.map((_, index) => document.getElementById(menuCategoryId(index))).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver((entries) => { const current = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (current) setActive(Number(current.target.getAttribute("data-index"))); }, { rootMargin: "-22% 0px -66% 0px", threshold: [0, .2, .55] });
    targets.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  const jumpTo = (index: number) => { setActive(index); document.getElementById(menuCategoryId(index))?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  return <main id="contenido" className="menu-page">
    <header className="menu-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(25,21,18,.91), rgba(25,21,18,.54)), url("${photos[1].src}")` }}><div className="section-wrap"><ScrollReveal><h1>{copy.menuTitle}</h1><p>{menuFacts}</p></ScrollReveal></div></header>
    <div className="menu-tabs-wrap menu-page__tabs"><nav className="menu-tabs section-wrap" aria-label="Categorías del menú">{menu.map((category, index) => <button className={`menu-tab ${active === index ? "menu-tab--active" : ""}`} type="button" key={category.categoria} onClick={() => jumpTo(index)} aria-current={active === index ? "true" : undefined}>{category.categoria}</button>)}</nav></div>
    <div className="section-wrap menu-page__content">{menu.map((category, index) => { const Icon = icons[index % icons.length]; return <section id={menuCategoryId(index)} data-index={index} key={category.categoria} className={`menu-page__category menu-accent--${menuAccents[index % menuAccents.length]}`} aria-labelledby={`category-title-${index}`}><ScrollReveal><div className="menu-page__category-title"><span>{String(index + 1).padStart(2, "0")}</span><h2 id={`category-title-${index}`}>{category.categoria}</h2><span>{category.items.length}</span></div></ScrollReveal><div className="menu-page__grid">{category.items.map((item, itemIndex) => <m.a className="menu-page__item" href={orderLink(item.nombre)} {...safeExternalLink} key={`${item.nombre}-${itemIndex}`} aria-label={`Pedir ${item.nombre} por WhatsApp, ${formatPrice(item.precio)}`} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .35, delay: (itemIndex % 6) * .035 }}><Icon size={20} aria-hidden="true" /><span className="menu-page__dish">{item.nombre}</span><span className="menu-page__price">{formatPrice(item.precio)}</span></m.a>)}</div></section>; })}</div>
    <section className="menu-page__actions section-pad"><div className="section-wrap"><a className="button button--terracotta" href={business.whatsapp} {...safeExternalLink}>Pedir por WhatsApp<ArrowUpRight size={17} /></a><Link className="button button--outline-dark" to="/reservas">Reservar mesa<ArrowUpRight size={17} /></Link></div></section>
  </main>;
}
