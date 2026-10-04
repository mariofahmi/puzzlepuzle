import React, { useState } from 'react';
import { Check, Sparkles, Move, ArrowRightLeft, Eye, Maximize2, Lightbulb } from 'lucide-react';
import { PuzzleTile, GridDimension, PuzzleMode } from '../utils/puzzle';
import { soundFx } from '../utils/sound';
import { PauseOverlay } from './PauseOverlay';

interface PuzzleBoardProps {
  tiles: PuzzleTile[];
  gridSize: GridDimension;
  mode: PuzzleMode;
  imageUrl: string;
  isSolved: boolean;
  showNumbers: boolean;
  emptyIndex: number;
  previewOpacity: number;
  hintIndex: number | null;
  isPaused: boolean;
  onResume: () => void;
  onRestart: () => void;
  onOpenHelp: () => void;
  onTileClick: (index: number) => void;
  onTileSwap: (index1: number, index2: number) => void;
}

export const PuzzleBoard: React.FC<PuzzleBoardProps> = ({
  tiles,
  gridSize,
  mode,
  imageUrl,
  isSolved,
  showNumbers,
  emptyIndex,
  previewOpacity,
  hintIndex,
  isPaused,
  onResume,
  onRestart,
  onOpenHelp,
  onTileClick,
  onTileSwap,
}) => {
  const [selectedSwapIndex, setSelectedSwapIndex] = useState<number | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Map board positions (0 to N*N - 1) to their occupying tile
  const positionMap = new Map<number, PuzzleTile>();
  tiles.forEach((tile) => {
    positionMap.set(tile.currentIndex, tile);
  });

  const handleTileInteraction = (pos: number) => {
    if (isSolved || isPaused) return;

    if (mode === 'slide') {
      onTileClick(pos);
    } else {
      // Mode Swap
      if (selectedSwapIndex === null) {
        soundFx.playClick();
        setSelectedSwapIndex(pos);
      } else if (selectedSwapIndex === pos) {
        // Deselect
        setSelectedSwapIndex(null);
      } else {
        // Swap selected with this pos
        onTileSwap(selectedSwapIndex, pos);
        setSelectedSwapIndex(null);
      }
    }
  };

  // Drag and Drop handlers for Swap mode
  const handleDragStart = (e: React.DragEvent, pos: number) => {
    if (mode !== 'swap' || isSolved || isPaused) return;
    setDraggedIndex(pos);
    e.dataTransfer.setData('text/plain', String(pos));
  };

  const handleDragOver = (e: React.DragEvent) => {
    if (mode !== 'swap' || isPaused) return;
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetPos: number) => {
    if (mode !== 'swap' || isSolved || isPaused) return;
    e.preventDefault();
    const sourcePos = draggedIndex ?? Number(e.dataTransfer.getData('text/plain'));
    if (sourcePos !== null && sourcePos !== targetPos) {
      onTileSwap(sourcePos, targetPos);
    }
    setDraggedIndex(null);
  };

  // Compute CSS grid template
  const gridStyle = {
    gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
  };

  return (
    <div className="relative w-full max-w-[540px] aspect-square mx-auto p-2 sm:p-3 bg-emerald-900/5 rounded-3xl border-2 border-emerald-200/90 shadow-md">
      {/* Ghost preview guide underneath with controlled opacity */}
      {previewOpacity > 0 && !isPaused && (
        <div
          className="absolute inset-2 sm:inset-3 rounded-2xl pointer-events-none transition-opacity duration-200 z-0 overflow-hidden"
          style={{ opacity: previewOpacity }}
        >
          <img
            src={imageUrl}
            alt="Ghost Preview"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
      )}

      {/* Pause Screen Overlay */}
      <PauseOverlay
        isPaused={isPaused}
        onResume={onResume}
        onRestart={onRestart}
        onOpenHelp={onOpenHelp}
      />

      {/* Main Puzzle Grid */}
      <div
        className={`relative z-10 w-full h-full grid gap-1.5 sm:gap-2 rounded-2xl overflow-hidden transition-all duration-200 ${
          isPaused ? 'filter blur-md opacity-20 pointer-events-none' : ''
        }`}
        style={gridStyle}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, boardPosition) => {
          const tile = positionMap.get(boardPosition);

          if (!tile) {
            return (
              <div
                key={`empty-cell-${boardPosition}`}
                className="w-full h-full bg-emerald-100/40 rounded-xl border-2 border-dashed border-emerald-300"
              />
            );
          }

          // If in slide mode and this tile is empty and not solved yet
          if (mode === 'slide' && tile.isEmpty && !isSolved) {
            return (
              <div
                key={`empty-tile-${tile.originalIndex}`}
                className="w-full h-full rounded-xl bg-emerald-100/50 border-2 border-dashed border-emerald-400/80 flex items-center justify-center text-emerald-700 text-xs font-semibold select-none transition-colors"
                title="Kotak Kosong (Geser keping di sebelahnya ke sini)"
              >
                <span className="hidden sm:inline-block text-[11px] text-emerald-800 font-bold bg-emerald-200/80 px-2.5 py-1 rounded-md shadow-2xs">
                  Kotak Kosong
                </span>
              </div>
            );
          }

          const origCol = tile.originalIndex % gridSize;
          const origRow = Math.floor(tile.originalIndex / gridSize);

          const isSelectedForSwap = selectedSwapIndex === boardPosition;
          const isCorrect = tile.isCorrect;
          const isHinted = hintIndex === boardPosition;

          return (
            <div
              key={`tile-${tile.originalIndex}`}
              onClick={() => handleTileInteraction(boardPosition)}
              draggable={mode === 'swap' && !isSolved && !isPaused}
              onDragStart={(e) => handleDragStart(e, boardPosition)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, boardPosition)}
              className={`relative w-full h-full rounded-xl cursor-pointer select-none transition-all duration-150 overflow-hidden transform active:scale-98 shadow-xs ${
                isSelectedForSwap
                  ? 'ring-4 ring-amber-400 scale-102 z-20 shadow-lg'
                  : isHinted
                  ? 'ring-4 ring-cyan-400 scale-102 z-20 animate-pulse shadow-lg shadow-cyan-500/50'
                  : 'hover:brightness-95'
              } ${isCorrect && !isSolved ? 'ring-2 ring-emerald-500/70' : 'border border-emerald-200/60'}`}
            >
              {/* Sliced image */}
              <img
                src={imageUrl}
                alt={`Keping ${tile.originalIndex + 1}`}
                draggable={false}
                className="absolute max-w-none pointer-events-none select-none transition-none"
                style={{
                  width: `${gridSize * 100}%`,
                  height: `${gridSize * 100}%`,
                  left: `-${origCol * 100}%`,
                  top: `-${origRow * 100}%`,
                }}
              />

              {/* Number Indicator Overlay */}
              {showNumbers && (
                <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-slate-950/75 text-emerald-300 font-mono text-[10px] sm:text-xs font-extrabold leading-none backdrop-blur-xs shadow-sm">
                  {tile.originalIndex + 1}
                </div>
              )}

              {/* Hint badge indicator */}
              {isHinted && !isSolved && (
                <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-md bg-cyan-500 text-slate-950 font-bold text-[10px] shadow-md flex items-center gap-1 animate-bounce">
                  <Lightbulb className="w-3 h-3 fill-amber-300" /> Geser Ini
                </div>
              )}

              {/* Correct position subtle indicator */}
              {isCorrect && !isSolved && (
                <div
                  className="absolute bottom-1.5 right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md animate-in zoom-in-50 duration-200"
                  title="Posisi tepat!"
                >
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}

              {/* Selection pulse overlay for Swap mode */}
              {isSelectedForSwap && (
                <div className="absolute inset-0 bg-amber-400/25 flex items-center justify-center pointer-events-none">
                  <span className="text-[10px] sm:text-xs font-bold text-amber-950 bg-amber-200/95 px-2 py-0.5 rounded-full shadow-xs">
                    Pilih Pasangan
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

