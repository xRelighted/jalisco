import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main id="contenido" className="not-found"><div><p>404</p><h1>Página no encontrada</h1><Link to="/"><ArrowLeft size={17} />Volver al inicio</Link></div></main>;
}
