import { usePreferences } from '../../store/preferences';
import { useEffect, useRef, useState } from 'react';
import { apps } from '../../data/apps';
import { profile } from '../../config/profile';
import { useWindows } from '../../store/windows';
import type { AppId } from '../../types';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from './Taskbar';
import { StartMenu } from './StartMenu';
import { WindowManager } from '../window/WindowManager';
export function Desktop() {
  const manager = useWindows();
  const { preferences, play } = usePreferences();
  const [selected, setSelected] = useState<AppId | null>(null), [startOpen, setStartOpen] = useState(false), [off, setOff] = useState<'on' | 'closing' | 'off'>('on');
  const [achievement, setAchievement] = useState(() => { try { return localStorage.getItem('sclPlatformerCompleted') === 'true'; } catch { return false; } });
  const [dark, setDark] = useState(() => { try { return localStorage.getItem('portfolio-theme') === 'dark'; } catch { return false; } });
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => { try { localStorage.setItem('portfolio-theme', dark ? 'dark' : 'blue'); } catch { /* Preferences remain usable without storage. */ } }, [dark]);
  useEffect(() => { if (off !== 'closing') return; const timer = setTimeout(() => setOff('off'), 2000); return () => clearTimeout(timer); }, [off]);
  useEffect(() => { const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setStartOpen(false); }; window.addEventListener('keydown', handler); return () => window.removeEventListener('keydown', handler); }, []);
  useEffect(() => { if (startOpen) menuRef.current?.querySelector<HTMLButtonElement>('button')?.focus(); }, [startOpen]);
  useEffect(() => { const refresh = () => { try { setAchievement(localStorage.getItem('sclPlatformerCompleted') === 'true'); } catch { setAchievement(false); } }; window.addEventListener('game-storage', refresh); return () => window.removeEventListener('game-storage', refresh); }, []);
  const active = manager.windows.filter(w => !w.minimized).at(-1)?.id;
  useEffect(() => { document.title = `${apps.find(a => a.id === active)?.label || 'Escritorio'} · ${profile.name}`; }, [active]);
  const open = (id: AppId) => { play(); setStartOpen(false); const app = apps.find(a => a.id === id)!; if (app.external) window.open(app.external, '_blank', 'noopener,noreferrer'); else manager.open(id); };
  if (off !== 'on') return <div className="shutdown"><div className="shutdown-mark">M<span>portfolio os</span></div><h1>{off === 'closing' ? 'Cerrando el escritorio…' : 'Gracias por visitar mi portafolio'}</h1>{off === 'off' && <button className="classic" onClick={() => { setOff('on'); manager.open('about'); }}>Volver a iniciar</button>}</div>;
  return <div data-background={preferences.background} className={`desktop ${dark ? 'dark' : ''}`} onClick={() => { setSelected(null); }}><div className="desktop-brand"><strong>mauricio<span> / </span>portfolio os</strong><span>Un escritorio. Muchas posibilidades.</span></div><div className="desktop-icons">{apps.filter(app => app.desktop !== false || (app.id === 'achievement' && achievement)).map(app => <DesktopIcon key={app.id} app={app} selected={selected === app.id} select={() => setSelected(app.id)} open={() => open(app.id)} />)}</div><div className="desktop-hint">Tu próxima conexión empieza acá.<span>Doble clic para explorar · Enter para abrir</span></div><WindowManager manager={manager} open={open} dark={dark} setDark={setDark} />{startOpen && <><button className="menu-backdrop" aria-label="Cerrar menú Inicio" onClick={() => setStartOpen(false)} /><div ref={menuRef}><StartMenu open={open} shutdown={() => { setStartOpen(false); setOff('closing'); }} /></div></>}<Taskbar openApp={open} windows={manager.windows} startOpen={startOpen} toggleStart={() => setStartOpen(value => !value)} toggleWindow={id => { if (active === id) manager.update(id, { minimized: true }); else manager.open(id); }} /></div>;
}


