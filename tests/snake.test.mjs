import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const source = fs.readFileSync(new URL('../src/components/games/snakeEngine.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { createSnake, stepSnake, spawnFood, BOARD_SIZE } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const playing = () => ({ ...createSnake(), status: 'playing', food: { x: 17, y: 17 } });
test('moving advances the head and preserves length', () => {
  const result = stepSnake(playing(), 'right');
  assert.deepEqual(result.snake[0], { x: 8, y: 9 }); assert.equal(result.snake.length, 3);
});
test('reversing direction is rejected', () => { assert.equal(stepSnake(playing(), 'left').direction, 'right'); });
test('food grows the snake and increases score', () => {
  const result = stepSnake({ ...playing(), food: { x: 8, y: 9 } }, 'right');
  assert.equal(result.score, 10); assert.equal(result.snake.length, 4);
  assert.ok(!result.snake.some(p => p.x === result.food?.x && p.y === result.food?.y));
});
test('walls and body end a game', () => {
  assert.equal(stepSnake({ ...playing(), snake: [{ x: 17, y: 0 }] }, 'right').status, 'lost');
  assert.equal(stepSnake({ ...playing(), snake: [{ x: 3, y: 3 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 }] }, 'right').status, 'lost');
});
test('moving into the departing tail is legal', () => {
  const result = stepSnake({ ...playing(), snake: [{ x: 3, y: 3 }, { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 4, y: 3 }] }, 'right');
  assert.equal(result.status, 'playing');
});
test('paused games do not advance', () => { const state = { ...playing(), status: 'paused' }; assert.equal(stepSnake(state, 'right'), state); });
test('a full board has no available food cell', () => {
  const full = Array.from({ length: BOARD_SIZE ** 2 }, (_, i) => ({ x: i % BOARD_SIZE, y: Math.floor(i / BOARD_SIZE) }));
  assert.equal(spawnFood(full), null);
});
