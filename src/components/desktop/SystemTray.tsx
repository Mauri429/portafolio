import { useEffect, useRef, useState } from 'react';
import { FaChevronUp, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { apps } from '../../data/apps';
import { usePreferences } from '../../store/preferences';
import type { AppId } from '../../types';
import { AppIcon } from './AppIcon';
import { Clock } from './Clock';

export function SystemTray({ openApp, startOpen }: { openApp: (id: AppId) => void; startOpen: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const { preferences, update } = usePreferences();
  const tray = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => { if (startOpen) setExpanded(false); }, [startOpen]);
  useEffect(() => {
    if (!expanded) return;
    panel.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const outside = (event: PointerEvent) => { if (!tray.current?.contains(event.target as Node)) setExpanded(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setExpanded(false); trigger.current?.focus(); } };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape); };
  }, [expanded]);

  return <div className="system-tray" ref={tray} onBlur={event => {
    if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false);
  }}>
    {expanded && <nav className="tray-popover" id="tray-shortcuts" aria-label="Accesos de la bandeja" ref={panel}>
      {apps.filter(app => app.id === 'github' || app.id === 'linkedin').map(app => <button key={app.id} onClick={() => {
        setExpanded(false); trigger.current?.focus(); openApp(app.id);
      }}><AppIcon app={app} /><span>{app.label}</span></button>)}
    </nav>}
    <button className="tray-expand" ref={trigger} aria-label={expanded ? 'Ocultar iconos de la bandeja' : 'Mostrar iconos de la bandeja'} aria-expanded={expanded} aria-controls="tray-shortcuts" onClick={() => setExpanded(value => !value)}><FaChevronUp aria-hidden="true" /></button>
    <button className="tray-sound" aria-label={preferences.sounds ? 'Desactivar sonidos' : 'Activar sonidos'} aria-pressed={preferences.sounds} onClick={() => update({ sounds: !preferences.sounds })}>{preferences.sounds ? <FaVolumeUp /> : <FaVolumeMute />}</button>
    <Clock />
  </div>;
}
