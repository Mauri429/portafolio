export type Point = { x: number; y: number };
export type Direction = 'up' | 'down' | 'left' | 'right';
export interface SnakeState { snake: Point[]; direction: Direction; food: Point | null; score: number; status: 'ready' | 'playing' | 'paused' | 'lost' | 'won' }
export const BOARD_SIZE = 18;
const delta: Record<Direction, Point> = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
export const opposite: Record<Direction, Direction> = { up: 'down', down: 'up', left: 'right', right: 'left' };
export function spawnFood(snake: Point[], random = Math.random): Point | null {
  const empty: Point[] = [];
  for (let y = 0; y < BOARD_SIZE; y++) for (let x = 0; x < BOARD_SIZE; x++) if (!snake.some(p => p.x === x && p.y === y)) empty.push({ x, y });
  return empty[Math.floor(random() * empty.length)] ?? null;
}
export function createSnake(): SnakeState { const snake = [{ x: 7, y: 9 }, { x: 6, y: 9 }, { x: 5, y: 9 }]; return { snake, direction: 'right', food: spawnFood(snake), score: 0, status: 'ready' }; }
export function stepSnake(state: SnakeState, requested: Direction): SnakeState {
  if (state.status !== 'playing') return state;
  const direction = requested === opposite[state.direction] ? state.direction : requested;
  const head = { x: state.snake[0].x + delta[direction].x, y: state.snake[0].y + delta[direction].y };
  const eats = head.x === state.food?.x && head.y === state.food?.y;
  const body = eats ? state.snake : state.snake.slice(0, -1);
  if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE || body.some(p => p.x === head.x && p.y === head.y)) return { ...state, direction, status: 'lost' };
  const snake = [head, ...state.snake];
  if (!eats) snake.pop();
  const food = eats ? spawnFood(snake) : state.food;
  return { snake, direction, food, score: state.score + (eats ? 10 : 0), status: food ? 'playing' : 'won' };
}
