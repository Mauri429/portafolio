import { AnimatePresence } from 'framer-motion';
import { apps } from '../../data/apps';
import { Window } from './Window';
import type { useWindows } from '../../store/windows';
import type { AppId } from '../../types';
import { AppContent } from '../apps/AppContent';
export function WindowManager({ manager, open, dark, setDark }: { manager: ReturnType<typeof useWindows>; open: (id: AppId) => void; dark: boolean; setDark: (value: boolean) => void }) {
  const visible = manager.windows.filter(w => !w.minimized);
  return <AnimatePresence>{visible.map((state, index) => <Window key={state.id} state={state} app={apps.find(a => a.id === state.id)!} active={index === visible.length - 1} zIndex={10 + index} focus={() => manager.focus(state.id)} update={patch => manager.update(state.id, patch)} close={() => manager.close(state.id)}><AppContent id={state.id} open={open} explore={() => manager.close(state.id)} dark={dark} setDark={setDark} /></Window>)}</AnimatePresence>;
}
