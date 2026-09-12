import { AppIcon } from './AppIcon';
import { FaDesktop } from 'react-icons/fa';
import { apps } from '../../data/apps';
import type { AppId, WindowState } from '../../types';
import { SystemTray } from './SystemTray';
export function Taskbar({ windows, startOpen, toggleStart, toggleWindow, openApp }: { windows: WindowState[]; startOpen: boolean; toggleStart: () => void; toggleWindow: (id: AppId) => void; openApp: (id: AppId) => void }) {
  const active = windows.filter(w => !w.minimized).at(-1)?.id;
  return <footer className="taskbar"><button className={`start-button ${startOpen ? 'pressed' : ''}`} aria-expanded={startOpen} aria-label="Abrir menú Inicio" onClick={toggleStart}><FaDesktop /> <span>inicio</span></button><div className="task-items">{windows.map(w => {
    const app = apps.find(a => a.id === w.id)!;
    return <button key={w.id} className={`task-item ${active === w.id ? 'current' : ''}`} onClick={() => toggleWindow(w.id)} aria-label={`${w.minimized ? 'Restaurar' : 'Mostrar o minimizar'} ${app.label}`}><AppIcon app={app} /><span>{app.label}</span></button>;
  })}</div><SystemTray openApp={openApp} startOpen={startOpen} /></footer>;
}
