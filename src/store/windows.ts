import { useState } from 'react';
import type { AppId, WindowState } from '../types';
export function useWindows() {
  const [windows, setWindows] = useState<WindowState[]>([{ id: 'about', x: Math.max(120, (window.innerWidth - 740) / 2), y: 75, width: 740, height: 510, minimized: false, maximized: false }]);
  const focus = (id: AppId) => setWindows(old => { const item = old.find(w => w.id === id); return item ? [...old.filter(w => w.id !== id), item] : old; });
  const update = (id: AppId, patch: Partial<WindowState>) => setWindows(old => old.map(w => w.id === id ? { ...w, ...patch } : w));
  const open = (id: AppId) => setWindows(old => { const existing = old.find(w => w.id === id); const game = ['snake','minesweeper','pong','breakout','asteroids','platformer'].includes(id); return [...old.filter(w => w.id !== id), existing ? { ...existing, minimized: false } : { id, x: 90 + old.length * 18, y: 38 + old.length * 18, width: game ? 820 : 700, height: game ? 610 : 490, minimized: false, maximized: false }]; });
  const close = (id: AppId) => setWindows(old => old.filter(w => w.id !== id));
  return { windows, focus, update, open, close };
}
