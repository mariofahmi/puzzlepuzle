/**
 * Puzzle engine supporting both Sliding (Geser Klasik) and Swap (Tukar Keping) mechanics.
 */

export type PuzzleMode = 'slide' | 'swap';
export type GridDimension = 3 | 4 | 5;

export interface PuzzleTile {
  /** Original position / image slice index (0 to N*N - 1) */
  originalIndex: number;
  /** Current position on the board (0 to N*N - 1) */
  currentIndex: number;
  /** Row and column on the board */
  row: number;
  col: number;
  /** Target row and column in the solved state */
  targetRow: number;
  targetCol: number;
  /** Whether this tile is in its solved position */
  isCorrect: boolean;
  /** In slide mode, the last tile (N*N - 1) is designated as the empty slot */
  isEmpty?: boolean;
}

export interface PuzzleState {
  tiles: PuzzleTile[];
  gridSize: GridDimension;
  mode: PuzzleMode;
  emptyIndex: number; // for slide mode
  moveCount: number;
  isSolved: boolean;
  startTime: number | null;
  elapsedSeconds: number;
  hasStarted: boolean;
}

/**
 * Creates an initially solved board for a given grid dimension and mode
 */
export function createSolvedBoard(gridSize: GridDimension, mode: PuzzleMode): PuzzleTile[] {
  const total = gridSize * gridSize;
  const tiles: PuzzleTile[] = [];

  for (let i = 0; i < total; i++) {
    const row = Math.floor(i / gridSize);
    const col = i % gridSize;
    const isEmpty = mode === 'slide' && i === total - 1;

    tiles.push({
      originalIndex: i,
      currentIndex: i,
      row,
      col,
      targetRow: row,
      targetCol: col,
      isCorrect: true,
      isEmpty,
    });
  }

  return tiles;
}

/**
 * Checks if two positions are adjacent horizontally or vertically
 */
export function isAdjacent(pos1: number, pos2: number, gridSize: number): boolean {
  const r1 = Math.floor(pos1 / gridSize);
  const c1 = pos1 % gridSize;
  const r2 = Math.floor(pos2 / gridSize);
  const c2 = pos2 % gridSize;

  const rowDiff = Math.abs(r1 - r2);
  const colDiff = Math.abs(c1 - c2);

  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

/**
 * Returns all valid board positions that can move into the empty spot in slide mode
 */
export function getValidSlideMoves(emptyPos: number, gridSize: number): number[] {
  const valid: number[] = [];
  const r = Math.floor(emptyPos / gridSize);
  const c = emptyPos % gridSize;

  if (r > 0) valid.push((r - 1) * gridSize + c); // Top
  if (r < gridSize - 1) valid.push((r + 1) * gridSize + c); // Bottom
  if (c > 0) valid.push(r * gridSize + (c - 1)); // Left
  if (c < gridSize - 1) valid.push(r * gridSize + (c + 1)); // Right

  return valid;
}

/**
 * Solvably shuffles the board.
 * For slide mode, it simulates random legal moves from the solved state,
 * guaranteeing 100% mathematical solvability!
 * For swap mode, it performs random swaps ensuring it does not immediately end up solved.
 */
export function shuffleBoard(
  tiles: PuzzleTile[],
  gridSize: GridDimension,
  mode: PuzzleMode
): { tiles: PuzzleTile[]; emptyIndex: number } {
  const total = gridSize * gridSize;
  const board = tiles.map(t => ({ ...t }));

  if (mode === 'slide') {
    let emptyPos = total - 1;
    // Number of random walks: 80 for 3x3, 150 for 4x4, 240 for 5x5
    const steps = gridSize === 3 ? 90 : gridSize === 4 ? 160 : 250;
    let lastPos = -1;

    for (let step = 0; step < steps; step++) {
      const neighbors = getValidSlideMoves(emptyPos, gridSize).filter(p => p !== lastPos);
      const chosenPos = neighbors.length > 0
        ? neighbors[Math.floor(Math.random() * neighbors.length)]
        : getValidSlideMoves(emptyPos, gridSize)[0];

      // Swap tile at chosenPos with emptyPos
      const tileA = board.find(t => t.currentIndex === chosenPos)!;
      const tileEmpty = board.find(t => t.currentIndex === emptyPos)!;

      tileA.currentIndex = emptyPos;
      tileA.row = Math.floor(emptyPos / gridSize);
      tileA.col = emptyPos % gridSize;
      tileA.isCorrect = tileA.originalIndex === emptyPos;

      tileEmpty.currentIndex = chosenPos;
      tileEmpty.row = Math.floor(chosenPos / gridSize);
      tileEmpty.col = chosenPos % gridSize;
      tileEmpty.isCorrect = tileEmpty.originalIndex === chosenPos;

      lastPos = emptyPos;
      emptyPos = chosenPos;
    }

    return { tiles: board, emptyIndex: emptyPos };
  } else {
    // Mode Swap: Shuffle positions with Fisher-Yates
    const positions = Array.from({ length: total }, (_, i) => i);
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    // Ensure it's not accidentally already solved
    let allSame = true;
    for (let i = 0; i < total; i++) {
      if (positions[i] !== i) {
        allSame = false;
        break;
      }
    }
    if (allSame && total > 1) {
      [positions[0], positions[1]] = [positions[1], positions[0]];
    }

    board.forEach((tile, index) => {
      const newPos = positions[index];
      tile.currentIndex = newPos;
      tile.row = Math.floor(newPos / gridSize);
      tile.col = newPos % gridSize;
      tile.isCorrect = tile.originalIndex === newPos;
    });

    return { tiles: board, emptyIndex: -1 };
  }
}

/**
 * Checks if the puzzle is completed
 */
export function checkIsSolved(tiles: PuzzleTile[], mode: PuzzleMode): boolean {
  if (mode === 'slide') {
    // In slide mode, all non-empty tiles must be in their original positions
    return tiles.every(tile => tile.isEmpty || tile.originalIndex === tile.currentIndex);
  }
  return tiles.every(tile => tile.originalIndex === tile.currentIndex);
}

/**
 * Calculates game score based on time, moves, and difficulty
 */
export function calculateGameScore(
  gridSize: GridDimension,
  mode: PuzzleMode,
  elapsedSeconds: number,
  moves: number
): { score: number; rankTitle: string; stars: number } {
  const baseScore = gridSize === 3 ? 2000 : gridSize === 4 ? 5000 : 9000;
  const modeMultiplier = mode === 'slide' ? 1.3 : 1.0;

  // Time penalty: decreases gently
  const timePenalty = Math.max(0, elapsedSeconds * 12);
  // Move penalty
  const movePenalty = Math.max(0, moves * 8);

  const rawScore = Math.max(500, Math.round((baseScore - timePenalty - movePenalty) * modeMultiplier));

  let rankTitle = 'Sahabat Maba UNIROW';
  let stars = 3;

  if (rawScore >= 4500) {
    rankTitle = 'Bintang Kecepatan Ronggolawe';
    stars = 5;
  } else if (rawScore >= 2500) {
    rankTitle = 'Penjelajah Kampus Unggul';
    stars = 4;
  } else if (rawScore >= 1200) {
    rankTitle = 'Mahasiswa Baru Cekatan';
    stars = 3;
  } else {
    rankTitle = 'Pejuang Kampus Tangguh';
    stars = 2;
  }

  return { score: rawScore, rankTitle, stars };
}

/**
 * Format seconds into mm:ss
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
