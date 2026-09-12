import { useEffect, useState } from 'react';
import { FaBomb, FaTableTennis, FaThLarge, FaRocket, FaNetworkWired, FaGamepad, FaFileCode, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import type { AppId } from '../../types';
import { gameAudio } from '../../games/shared/audio';
import { gameStorage } from '../../games/shared/storage';

const catalog: { id: AppId; name: string; description: string; icon: typeof FaGamepad; status?: string }[] = [
  { id: 'snake', name: 'Snake', description: 'Crece, suma puntos y no choques con tu cola.', icon: FaGamepad },
  { id: 'minesweeper', name: 'Minesweeper', description: 'Descubre el tablero y marca las minas.', icon: FaBomb },
  { id: 'pong', name: 'Pong', description: 'Partida contra la CPU, a cinco puntos.', icon: FaTableTennis },
  { id: 'breakout', name: 'Breakout', description: 'Rompe todos los bloques sin perder la pelota.', icon: FaThLarge },
  { id: 'asteroids', name: 'Asteroids', description: 'Pilota, dispara y sobrevive en el vacío.', icon: FaRocket },
  { id: 'platformer', name: 'SCL Network Adventure', description: 'Conecta Network, Server Room e Internet.', icon: FaNetworkWired, status: 'Juego principal' },
];

export function GamesApp({ open }: { open: (id: AppId) => void }) {
  const [muted, setMuted] = useState(gameAudio.muted());
  const [completed, setCompleted] = useState(gameStorage.completed());
  useEffect(() => { const refresh = () => { setMuted(gameAudio.muted()); setCompleted(gameStorage.completed()); }; window.addEventListener('game-storage', refresh); return () => window.removeEventListener('game-storage', refresh); }, []);
  const toggleMute = () => { gameAudio.setMuted(!muted); setMuted(!muted); if (muted) setTimeout(() => gameAudio.tone(620, .08), 0); };
  return <div className="game-library app-padding"><header className="game-library-header"><div><span className="eyebrow">MAURICIO ARCADE</span><h2>Games</h2><p>Juegos originales que se abren en ventanas independientes.</p></div><button className="classic" aria-pressed={muted} onClick={toggleMute}>{muted ? <FaVolumeMute /> : <FaVolumeUp />} {muted ? 'Activar audio' : 'Silenciar juegos'}</button></header>
    <div className="game-grid">{catalog.map(game => <button className="game-tile" key={game.id} onClick={() => open(game.id)}><span className="game-tile-icon"><game.icon /></span><span><strong>{game.name}</strong><small>{game.description}</small>{game.status && <em>{game.status}</em>}</span></button>)}</div>
    {completed && <button className="achievement-link" onClick={() => open('achievement')}><FaFileCode /> achievement.txt desbloqueado</button>}
  </div>;
}
