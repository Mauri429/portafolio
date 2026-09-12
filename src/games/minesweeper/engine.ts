export type Cell = { mine: boolean; open: boolean; flagged: boolean; nearby: number };
export type Board = { cells: Cell[]; width: number; height: number; mines: number; state: 'playing' | 'won' | 'lost' };
export function createBoard(width = 12, height = 10, mines = 18, random = Math.random): Board {
  const cells = Array.from({ length: width * height }, () => ({ mine: false, open: false, flagged: false, nearby: 0 }));
  const spots = cells.map((_, i) => i);
  for (let i = 0; i < mines; i++) { const pick = Math.floor(random() * spots.length); cells[spots.splice(pick, 1)[0]].mine = true; }
  cells.forEach((cell, index) => { const x=index%width,y=Math.floor(index/width);cell.nearby=neighbors(index,width,height).filter(i=>cells[i].mine).length; });
  return { cells, width, height, mines, state: 'playing' };
}
export function neighbors(index:number,width:number,height:number){const x=index%width,y=Math.floor(index/width),out:number[]=[];for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const nx=x+dx,ny=y+dy;if((dx||dy)&&nx>=0&&nx<width&&ny>=0&&ny<height)out.push(ny*width+nx);}return out;}
export function reveal(board: Board, index: number): Board {
  if (board.state !== 'playing' || board.cells[index].flagged || board.cells[index].open) return board;
  const cells=board.cells.map(cell=>({...cell}));
  if(cells[index].mine){cells.forEach(cell=>{if(cell.mine)cell.open=true;});return {...board,cells,state:'lost'};}
  const queue=[index],seen=new Set<number>();while(queue.length){const current=queue.pop()!;if(seen.has(current)||cells[current].flagged)continue;seen.add(current);cells[current].open=true;if(cells[current].nearby===0)queue.push(...neighbors(current,board.width,board.height).filter(i=>!cells[i].mine));}
  const won=cells.every(cell=>cell.mine||cell.open);return {...board,cells,state:won?'won':'playing'};
}
export function flag(board: Board,index:number){if(board.state!=='playing'||board.cells[index].open)return board;const cells=board.cells.map((cell,i)=>i===index?{...cell,flagged:!cell.flagged}:cell);return {...board,cells};}
