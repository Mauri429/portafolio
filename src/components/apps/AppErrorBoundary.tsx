import { Component, type ReactNode } from 'react';
export class AppErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="app-padding" role="alert"><h2>No se pudo abrir esta aplicación</h2><p>Cerrá la ventana y volvé a abrirla. Si el problema continúa, recargá el portafolio.</p><button className="classic" onClick={() => this.setState({ failed: false })}>Reintentar</button></div> : this.props.children; }
}
