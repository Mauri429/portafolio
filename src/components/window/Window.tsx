import { useRef, type PointerEvent, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import type { AppDefinition, WindowState } from '../../types';
import { useViewport } from '../../hooks/useViewport';
import { TitleBar } from './TitleBar';
interface Props { state: WindowState; app: AppDefinition; active: boolean; zIndex: number; children: ReactNode; focus: () => void; update: (patch: Partial<WindowState>) => void; close: () => void }
export function Window({ state, app, active, zIndex, children, focus, update, close }: Props) {
  const viewport = useViewport();
  const full = viewport.mobile || state.maximized;
  const width = full ? viewport.width : Math.min(state.width, viewport.width);
  const height = full ? viewport.height : Math.min(state.height, viewport.height);
  const x = full ? 0 : Math.max(0, Math.min(state.x, viewport.width - width));
  const y = full ? 0 : Math.max(0, Math.min(state.y, viewport.height - height));
  const gesture = useRef<{ px: number; py: number; x: number; y: number; width: number; height: number; resize: boolean } | null>(null);
  const start = (e: PointerEvent, resize = false) => { if (full || e.button !== 0) return; e.preventDefault(); focus(); gesture.current = { px: e.clientX, py: e.clientY, x, y, width, height, resize }; e.currentTarget.setPointerCapture(e.pointerId); };
  const move = (e: PointerEvent) => { const g = gesture.current; if (!g) return; const dx = e.clientX - g.px, dy = e.clientY - g.py; update(g.resize ? { width: Math.max(Math.min(340, viewport.width), Math.min(g.width + dx, viewport.width - x)), height: Math.max(Math.min(240, viewport.height), Math.min(g.height + dy, viewport.height - y)) } : { x: Math.max(0, Math.min(g.x + dx, viewport.width - width)), y: Math.max(0, Math.min(g.y + dy, viewport.height - height)) }); };
  return <motion.section role="dialog" aria-label={app.label} className={`os-window ${active ? 'active' : ''} ${full ? 'full' : ''}`} style={{ left: x, top: y, width, height, zIndex }} initial={{ opacity: 0, scale: .98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .14 }} onPointerDown={focus} onPointerMove={move} onPointerUp={() => { gesture.current = null; }} onPointerCancel={() => { gesture.current = null; }} onKeyDown={e => { if (e.altKey && e.key === 'F4') { e.preventDefault(); close(); } }}>
    <TitleBar app={app} maximized={state.maximized} onDrag={start} onMaximize={() => update({ maximized: !state.maximized })} onMinimize={() => update({ minimized: true })} onClose={close} />
    <div className="window-body">{children}</div><footer className="window-status"><span>{app.id === 'about' ? 'Bienvenue · Bienvenido · Welcome' : 'Mauricio Portfolio OS'}</span><span>Personal edition</span></footer>
    {!full && <div className="resize-handle" role="separator" aria-label="Redimensionar ventana con las flechas" tabIndex={0} onPointerDown={e => start(e, true)} onKeyDown={e => { if (e.key.startsWith('Arrow')) { e.preventDefault(); update({ width: Math.min(viewport.width - x, Math.max(340, width + (e.key === 'ArrowRight' ? 20 : e.key === 'ArrowLeft' ? -20 : 0))), height: Math.min(viewport.height - y, Math.max(240, height + (e.key === 'ArrowDown' ? 20 : e.key === 'ArrowUp' ? -20 : 0))) }); } }} />}
  </motion.section>;
}

