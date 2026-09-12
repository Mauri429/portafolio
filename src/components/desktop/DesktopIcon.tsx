import { AppIcon } from './AppIcon';
import type { AppDefinition } from '../../types';
export function DesktopIcon({ app, selected, select, open }: { app: AppDefinition; selected: boolean; select: () => void; open: () => void }) {
  return <button className={`desktop-icon ${selected ? 'selected' : ''}`} onClick={e => { e.stopPropagation(); select(); if (matchMedia('(max-width: 640px), (pointer: coarse)').matches || e.detail === 0) open(); }} onDoubleClick={() => { if (!matchMedia('(max-width: 640px), (pointer: coarse)').matches) open(); }} aria-label={`Abrir ${app.label}`}><span className={`app-icon ${app.color}`}><AppIcon app={app} /></span><span>{app.label}</span></button>;
}

