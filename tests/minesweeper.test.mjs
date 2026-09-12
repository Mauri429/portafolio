import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import ts from 'typescript';
const source=fs.readFileSync(new URL('../src/games/minesweeper/engine.ts',import.meta.url),'utf8');const {outputText}=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext}});const api=await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
test('creates requested number of mines',()=>assert.equal(api.createBoard(8,8,10,()=>.5).cells.filter(c=>c.mine).length,10));
test('a mine loses and exposes mines',()=>{const b=api.createBoard(4,4,1,()=>0);const i=b.cells.findIndex(c=>c.mine);const n=api.reveal(b,i);assert.equal(n.state,'lost');assert.ok(n.cells[i].open);});
test('flagged cells are not revealed',()=>{const b=api.createBoard(4,4,1,()=>0);const f=api.flag(b,1);assert.equal(api.reveal(f,1),f);});
