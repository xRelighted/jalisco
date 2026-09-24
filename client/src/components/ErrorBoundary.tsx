import { AlertTriangle, RotateCcw } from "lucide-react";
import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(): State { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <main className="not-found"><div><AlertTriangle size={38} aria-hidden="true" /><h1>No fue posible mostrar la página.</h1><button className="button button--dark" type="button" onClick={() => window.location.reload()}><RotateCcw size={16} />Volver a cargar</button></div></main>;
    return this.props.children;
  }
}
