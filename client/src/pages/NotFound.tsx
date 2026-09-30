import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return <main id="contenido" className="not-found"><div><p>404 · JALISCO MEXICAN GRILL</p><h1>Esta mesa todavía no la encontramos.</h1><nav aria-label="Opciones para continuar"><Link to="/menu">Ver menú<ArrowUpRight size={17} aria-hidden="true" /></Link><Link to="/reservas">Reservar mesa<ArrowUpRight size={17} aria-hidden="true" /></Link></nav></div></main>;
}
