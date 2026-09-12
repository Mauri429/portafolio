import { lazy, Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { SettingsApp } from './SettingsApp';
import type { AppId } from '../../types';
import { AboutApp } from './AboutApp';
import { CVApp } from './CVApp';
import { ProjectsApp } from './ProjectsApp';
import { ContactApp } from './ContactApp';
import { DocumentsApp } from './DocumentsApp';
import { GamesApp } from './GamesApp';
import { AppErrorBoundary } from './AppErrorBoundary';

const gameComponents: Partial<Record<AppId, LazyExoticComponent<ComponentType>>> = {
  snake: lazy(() => import('../games/SnakeGame')),
  minesweeper: lazy(() => import('../../games/minesweeper/MinesweeperGame')),
  pong: lazy(() => import('../../games/pong/PongGame')),
  breakout: lazy(() => import('../../games/breakout/BreakoutGame')),
  asteroids: lazy(() => import('../../games/asteroids/AsteroidsGame')),
  platformer: lazy(() => import('../../games/scl-platformer/SCLPlatformer')),
  achievement: lazy(() => import('../../games/scl-platformer/Achievement')),
};

export function AppContent({ id, open, explore, dark, setDark }: { id: AppId; open: (id: AppId) => void; explore: () => void; dark: boolean; setDark: (value: boolean) => void }) {
  let content;
  const Game = gameComponents[id];
  if (Game) content = <Suspense fallback={<div className="game-loading" role="status">Cargando juego…</div>}><Game /></Suspense>;
  else switch (id) {
    case 'about': content = <AboutApp open={open} explore={explore} />; break;
    case 'cv': content = <CVApp />; break;
    case 'projects': content = <ProjectsApp />; break;
    case 'contact': content = <ContactApp />; break;
    case 'documents': content = <DocumentsApp />; break;
    case 'games': content = <GamesApp open={open} />; break;
    case 'settings': content = <SettingsApp dark={dark} setDark={setDark} />; break;
    default: content = <div className="app-padding"><h2>LinkedIn</h2><p>El enlace al perfil estará disponible próximamente.</p><button className="classic" onClick={() => open('contact')}>Ver contacto</button></div>;
  }
  return <AppErrorBoundary>{content}</AppErrorBoundary>;
}
