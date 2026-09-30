import { AlertTriangle, ArrowUpRight, RotateCcw } from "lucide-react";
import { Component, type ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = { children: ReactNode };
type State = { hasError: boolean };
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(): State { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <main id="contenido" className="not-found" tabIndex={-1}><div>
      <AlertTriangle size={38} aria-hidden="true" />
      <h1>Se nos cruzaron los cables.</h1>
      <p>Probá recargar la página o volvé a elegir qué querés hacer.</p>
      <div className="not-found__actions"><button className="button button--dark" type="button" onClick={() => window.location.reload()}><RotateCcw size={16} aria-hidden="true" />Recargar</button><Link className="button button--outline-dark" to="/menu">Ver menú<ArrowUpRight size={16} aria-hidden="true" /></Link><Link className="button button--outline-dark" to="/reservas">Reservar mesa<ArrowUpRight size={16} aria-hidden="true" /></Link><Link className="text-link" to="/">Volver al inicio</Link></div>
    </div></main>;
    return this.props.children;
  }
}
