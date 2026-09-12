import { useEffect, useRef, useState } from 'react';
import { BOARD_SIZE, createSnake, opposite, stepSnake, type Direction } from './snakeEngine';
import { gameStorage } from '../../games/shared/storage';

export default function SnakeGame() {
  const [game, setGame] = useState(createSnake);
  const [best, setBest] = useState(() => gameStorage.get('best:snake', 0));
  const queued = useRef<Direction>('right');
  const changed = useRef(false);
  const board = useRef<HTMLDivElement>(null);
  const turn = (direction: Direction) => { if (!changed.current && direction !== opposite[game.direction]) { queued.current = direction; changed.current = true; } };
  const pause = () => setGame(state => ({ ...state, status: state.status === 'playing' ? 'paused' : state.status === 'paused' ? 'playing' : state.status }));
  const start = () => { queued.current = 'right'; changed.current = false; setGame({ ...createSnake(), status: 'playing' }); board.current?.focus(); };
  useEffect(() => {
    if (game.status !== 'playing') return;
    const timer = setInterval(() => { setGame(state => stepSnake(state, queued.current)); changed.current = false; }, Math.max(85, 155 - game.score / 5));
    return () => clearInterval(timer);
  }, [game.status, game.score]);
  useEffect(() => { if (game.score > best) { setBest(game.score); gameStorage.set('best:snake', game.score); } }, [game.score, best]);
  useEffect(() => {
    const pauseHidden = () => { if (document.hidden) setGame(state => state.status === 'playing' ? { ...state, status: 'paused' } : state); };
    const blur = () => setGame(state => state.status === 'playing' ? { ...state, status: 'paused' } : state);
    document.addEventListener('visibilitychange', pauseHidden); window.addEventListener('blur', blur);
    return () => { document.removeEventListener('visibilitychange', pauseHidden); window.removeEventListener('blur', blur); };
  }, []);
  const labels = { ready: 'Listo para jugar', playing: 'En juego', paused: 'En pausa', lost: 'Fin de la partida', won: '¡Completaste el tablero!' };
  return <div className="snake-game" onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setGame(state => state.status === 'playing' ? { ...state, status: 'paused' } : state); }}>
    <div className="game-score"><strong>SNAKE / 01</strong><span>Puntos: {game.score} · Récord: {best}</span></div>
    <div className="snake-board" ref={board} tabIndex={0} role="group" aria-label="Tablero de Snake. Usá las flechas o WASD; espacio para pausar." onKeyDown={e => {
      const keys: Record<string, Direction> = { ArrowUp: 'up', w: 'up', ArrowDown: 'down', s: 'down', ArrowLeft: 'left', a: 'left', ArrowRight: 'right', d: 'right' };
      if (keys[e.key]) { e.preventDefault(); turn(keys[e.key]); } else if (e.key === ' ') { e.preventDefault(); pause(); }
    }} style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)` }}>
      {Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => { const x = index % BOARD_SIZE, y = Math.floor(index / BOARD_SIZE); const segment = game.snake.findIndex(p => p.x === x && p.y === y); const food = game.food?.x === x && game.food?.y === y; return <span key={index} className={segment === 0 ? 'snake-head' : segment > 0 ? 'snake-segment' : food ? 'snake-food' : ''} />; })}
    </div><p role="status" className="game-status">{labels[game.status]}</p>
    <div className="action-row"><button className="primary" onClick={start}>{game.status === 'ready' ? 'Jugar' : 'Nueva partida'}</button><button className="classic" disabled={!['playing', 'paused'].includes(game.status)} onClick={() => { pause(); board.current?.focus(); }}>{game.status === 'paused' ? 'Continuar' : 'Pausar'}</button></div>
    <div className="direction-pad" aria-label="Controles táctiles">{(['up', 'left', 'down', 'right'] as const).map(direction => <button className={`classic direction-${direction}`} key={direction} aria-label={{ up: 'Arriba', left: 'Izquierda', down: 'Abajo', right: 'Derecha' }[direction]} onClick={() => turn(direction)}>{{ up: '↑', left: '←', down: '↓', right: '→' }[direction]}</button>)}</div>
    <p className="muted">Flechas o WASD para moverte. Espacio para pausar. Comé los cuadrados dorados y evitá las paredes y tu propia cola.</p>
  </div>;
}
