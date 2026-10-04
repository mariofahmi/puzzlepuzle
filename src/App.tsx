/**
 * Mahasiswa Baru UNIROW - Game Puzzle Kampus Ceria
 * Main Application Component with Campaign Levels, Sound Synthesizer & Rich Visuals
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Clock,
  Move,
  Trophy,
  CheckCircle2,
} from 'lucide-react';
import { Navbar, ActiveTab } from './components/Navbar';
import logoUrl from './assets/logo.png';
import { PuzzleBoard } from './components/PuzzleBoard';
import { ControlPanel } from './components/ControlPanel';
import { VictoryModal } from './components/VictoryModal';
import { LeaderboardView } from './components/LeaderboardView';
import { HowToPlayModal } from './components/HowToPlayModal';
import { CampaignLevelBar } from './components/CampaignLevelBar';
import {
  GridDimension,
  PuzzleMode,
  PuzzleTile,
  createSolvedBoard,
  shuffleBoard,
  checkIsSolved,
  calculateGameScore,
  formatTime,
  getValidSlideMoves,
} from './utils/puzzle';
import { CampusPreset, CAMPUS_PRESETS } from './data/presets';
import {
  CAMPAIGN_LEVELS,
  CampaignLevel,
  getCampaignProgress,
  updateLevelCompletion,
  LevelProgress,
} from './data/campaign';
import { soundFx } from './utils/sound';
import { saveLeaderboardEntry } from './utils/leaderboard';

export default function App() {
  // Navigation & UI state
  const [activeTab, setActiveTab] = useState<ActiveTab>('puzzle');
  const [isBgmMuted, setIsBgmMuted] = useState<boolean>(soundFx.getBgmMuted());
  const [isSfxMuted, setIsSfxMuted] = useState<boolean>(soundFx.getSfxMuted());
  const [isVictoryModalOpen, setIsVictoryModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Player details
  const [playerName, setPlayerName] = useState(() => {
    return localStorage.getItem('unirow_pmb_player_name') || 'Pemain Ronggolawe';
  });
  const [playerMajor, setPlayerMajor] = useState(() => {
    return localStorage.getItem('unirow_pmb_player_major') || 'Teknik Informatika (FST)';
  });

  // Campaign / Stage mode state
  const [isCampaignMode, setIsCampaignMode] = useState<boolean>(true);
  const [currentLevelNumber, setCurrentLevelNumber] = useState<number>(1);
  const [campaignProgress, setCampaignProgress] = useState<Record<number, LevelProgress>>(() => getCampaignProgress());

  // Puzzle settings - default to level 1 config
  const currentLevelConfig = CAMPAIGN_LEVELS.find((l) => l.levelNumber === currentLevelNumber) || CAMPAIGN_LEVELS[0];
  const initialPreset = CAMPUS_PRESETS.find((p) => p.id === currentLevelConfig.presetId) || CAMPUS_PRESETS[0];

  const [gridSize, setGridSize] = useState<GridDimension>(currentLevelConfig.gridSize);
  const [mode, setMode] = useState<PuzzleMode>(currentLevelConfig.mode);
  const [selectedPreset, setSelectedPreset] = useState<CampusPreset>(initialPreset);
  const [showNumbers, setShowNumbers] = useState(true);
  const [previewOpacity, setPreviewOpacity] = useState(0);

  // Hints
  const [hintsRemaining, setHintsRemaining] = useState<number>(3);
  const [hintTileIndex, setHintTileIndex] = useState<number | null>(null);
  const hintTimeoutRef = useRef<number | null>(null);

  // Puzzle game state
  const [tiles, setTiles] = useState<PuzzleTile[]>(() => createSolvedBoard(currentLevelConfig.gridSize, currentLevelConfig.mode));
  const [emptyIndex, setEmptyIndex] = useState<number>(-1);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Timer interval ref
  const timerRef = useRef<number | null>(null);

  // Initialize or re-setup board
  const setupNewBoard = useCallback(
    (newSize: GridDimension = gridSize, newMode: PuzzleMode = mode) => {
      const initial = createSolvedBoard(newSize, newMode);
      const shuffled = shuffleBoard(initial, newSize, newMode);
      setTiles(shuffled.tiles);
      setEmptyIndex(shuffled.emptyIndex);
      setMoveCount(0);
      setIsSolved(false);
      setHasStarted(true);
      setElapsedSeconds(0);
      setIsPaused(false);
      setHintsRemaining(3);
      setHintTileIndex(null);
    },
    [gridSize, mode]
  );

  // Initial mount: setup board
  useEffect(() => {
    setupNewBoard(gridSize, mode);
  }, []);

  // Timer tick (handles pause state)
  useEffect(() => {
    if (hasStarted && !isSolved && !isPaused) {
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [hasStarted, isSolved, isPaused]);

  // Handle victory check
  const checkVictory = useCallback(
    (currentTiles: PuzzleTile[], currentMode: PuzzleMode) => {
      if (checkIsSolved(currentTiles, currentMode)) {
        setIsSolved(true);
        setHasStarted(false);

        // If in Campaign mode, record stage achievement
        if (isCampaignMode) {
          const { score } = calculateGameScore(gridSize, mode, elapsedSeconds, moveCount);
          const { progress } = updateLevelCompletion(currentLevelNumber, elapsedSeconds, moveCount, score);
          setCampaignProgress({ ...progress });
          soundFx.playLevelUp();
        } else {
          soundFx.playVictory();
        }

        setIsVictoryModalOpen(true);
      }
    },
    [isCampaignMode, currentLevelNumber, gridSize, mode, elapsedSeconds, moveCount]
  );

  // Tile movement in Slide mode
  const handleTileClick = useCallback(
    (boardPos: number) => {
      if (isSolved || isPaused || mode !== 'slide') return;

      const validMoves = getValidSlideMoves(emptyIndex, gridSize);
      if (!validMoves.includes(boardPos)) {
        return; // Not an adjacent tile
      }

      soundFx.playTileMove();
      const updatedTiles = tiles.map((t) => {
        if (t.currentIndex === boardPos) {
          const isNowCorrect = t.originalIndex === emptyIndex;
          if (isNowCorrect) soundFx.playTileCorrect();
          return {
            ...t,
            currentIndex: emptyIndex,
            row: Math.floor(emptyIndex / gridSize),
            col: emptyIndex % gridSize,
            isCorrect: isNowCorrect,
          };
        }
        if (t.currentIndex === emptyIndex) {
          return {
            ...t,
            currentIndex: boardPos,
            row: Math.floor(boardPos / gridSize),
            col: boardPos % gridSize,
            isCorrect: t.originalIndex === boardPos,
          };
        }
        return t;
      });

      setTiles(updatedTiles);
      setEmptyIndex(boardPos);
      setMoveCount((prev) => prev + 1);
      checkVictory(updatedTiles, mode);
    },
    [isSolved, isPaused, mode, emptyIndex, gridSize, tiles, checkVictory]
  );

  // Tile swap in Swap mode
  const handleTileSwap = useCallback(
    (pos1: number, pos2: number) => {
      if (isSolved || isPaused || mode !== 'swap' || pos1 === pos2) return;

      soundFx.playTileMove();
      const updatedTiles = tiles.map((t) => {
        if (t.currentIndex === pos1) {
          const isNowCorrect = t.originalIndex === pos2;
          if (isNowCorrect) soundFx.playTileCorrect();
          return {
            ...t,
            currentIndex: pos2,
            row: Math.floor(pos2 / gridSize),
            col: pos2 % gridSize,
            isCorrect: isNowCorrect,
          };
        }
        if (t.currentIndex === pos2) {
          const isNowCorrect = t.originalIndex === pos1;
          if (isNowCorrect) soundFx.playTileCorrect();
          return {
            ...t,
            currentIndex: pos1,
            row: Math.floor(pos1 / gridSize),
            col: pos1 % gridSize,
            isCorrect: isNowCorrect,
          };
        }
        return t;
      });

      setTiles(updatedTiles);
      setMoveCount((prev) => prev + 1);
      checkVictory(updatedTiles, mode);
    },
    [isSolved, isPaused, mode, gridSize, tiles, checkVictory]
  );

  // Keyboard navigation for Slide mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mode !== 'slide' || isSolved || isPaused || activeTab !== 'puzzle') return;

      const r = Math.floor(emptyIndex / gridSize);
      const c = emptyIndex % gridSize;
      let targetPos = -1;

      if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && r < gridSize - 1) {
        targetPos = (r + 1) * gridSize + c;
      } else if ((e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') && r > 0) {
        targetPos = (r - 1) * gridSize + c;
      } else if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && c < gridSize - 1) {
        targetPos = r * gridSize + (c + 1);
      } else if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && c > 0) {
        targetPos = r * gridSize + (c - 1);
      }

      if (targetPos !== -1) {
        e.preventDefault();
        handleTileClick(targetPos);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, isSolved, isPaused, activeTab, emptyIndex, gridSize, handleTileClick]);

  // Campaign Level Selection
  const handleSelectLevel = (levelNumber: number) => {
    const levelConfig = CAMPAIGN_LEVELS.find((l) => l.levelNumber === levelNumber);
    if (!levelConfig) return;

    setCurrentLevelNumber(levelNumber);
    setGridSize(levelConfig.gridSize);
    setMode(levelConfig.mode);

    const preset = CAMPUS_PRESETS.find((p) => p.id === levelConfig.presetId) || CAMPUS_PRESETS[0];
    setSelectedPreset(preset);

    setupNewBoard(levelConfig.gridSize, levelConfig.mode);
  };

  // Toggle Campaign mode vs Free Sandbox
  const handleToggleCampaignMode = (campaign: boolean) => {
    setIsCampaignMode(campaign);
    if (campaign) {
      handleSelectLevel(currentLevelNumber);
    }
  };

  // Move to next level after victory
  const handleNextLevel = () => {
    setIsVictoryModalOpen(false);
    const nextLvl = currentLevelNumber + 1;
    if (CAMPAIGN_LEVELS.some((l) => l.levelNumber === nextLvl)) {
      handleSelectLevel(nextLvl);
    } else {
      // Reached the end of campaign! Kembali ke level 1
      handleSelectLevel(1);
    }
  };

  // Mode or Grid Size changes (Free Play mode)
  const handleGridSizeChange = (newSize: GridDimension) => {
    setGridSize(newSize);
    setupNewBoard(newSize, mode);
  };

  const handleModeChange = (newMode: PuzzleMode) => {
    setMode(newMode);
    setupNewBoard(gridSize, newMode);
  };

  // Image preset change
  const handleSelectPreset = (preset: CampusPreset) => {
    setSelectedPreset(preset);
    setupNewBoard(gridSize, mode);
  };

  // Custom user image upload
  const handleCustomImageUpload = (dataUrl: string, title: string) => {
    const customPreset: CampusPreset = {
      id: `custom-${Date.now()}`,
      title: title || 'Foto Unggahan Saya',
      category: 'Koleksi Foto Maba',
      description: 'Foto kenangan kampus yang diunggah secara mandiri.',
      imageUrl: dataUrl,
      thumbnailUrl: dataUrl,
      accentColor: '#10B981',
    };
    setSelectedPreset(customPreset);
    setIsCampaignMode(false); // Switch to free sandbox for custom photo
    setupNewBoard(gridSize, mode);
    soundFx.playShuffle();
  };

  // Reshuffle current image
  const handleShuffle = () => {
    setupNewBoard(gridSize, mode);
  };

  // Reset to solved state
  const handleResetToSolved = () => {
    const solved = createSolvedBoard(gridSize, mode);
    setTiles(solved);
    setEmptyIndex(mode === 'slide' ? gridSize * gridSize - 1 : -1);
    setIsSolved(true);
    setHasStarted(false);
  };

  // Smart Hint feature
  const handleUseHint = () => {
    if (hintsRemaining <= 0 || isSolved || isPaused) return;

    if (mode === 'slide') {
      // Find a valid movable adjacent tile that is not yet correct, or any valid move
      const validMoves = getValidSlideMoves(emptyIndex, gridSize);
      const targetMove = validMoves.find((pos) => {
        const tile = tiles.find((t) => t.currentIndex === pos);
        return tile && !tile.isCorrect;
      }) || validMoves[0];

      setHintTileIndex(targetMove);
    } else {
      // Swap mode: find first misplaced tile
      const misplaced = tiles.find((t) => !t.isCorrect);
      if (misplaced) {
        setHintTileIndex(misplaced.currentIndex);
      }
    }

    setHintsRemaining((prev) => prev - 1);

    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    hintTimeoutRef.current = window.setTimeout(() => {
      setHintTileIndex(null);
    }, 3500);
  };

  // Toggle Pause
  const handleTogglePause = () => {
    setIsPaused((prev) => !prev);
  };

  // Audio toggles
  const handleToggleBgm = () => {
    const muted = soundFx.toggleBgm();
    setIsBgmMuted(muted);
  };

  const handleToggleSfx = () => {
    const muted = soundFx.toggleSfx();
    setIsSfxMuted(muted);
  };

  // Saving score from Victory Modal
  const handleSaveScore = (name: string, major: string) => {
    setPlayerName(name);
    setPlayerMajor(major);
    localStorage.setItem('unirow_pmb_player_name', name);
    localStorage.setItem('unirow_pmb_player_major', major);

    const { score } = calculateGameScore(gridSize, mode, elapsedSeconds, moveCount);

    saveLeaderboardEntry({
      name,
      major,
      gridSize,
      mode,
      elapsedSeconds,
      moveCount,
      score,
      avatarColor: selectedPreset.accentColor || '#10B981',
    });
  };

  // Current calculated score
  const { score: currentScore, rankTitle, stars } = calculateGameScore(
    gridSize,
    mode,
    elapsedSeconds,
    moveCount
  );

  const correctTilesCount = tiles.filter((t) => t.isCorrect).length;
  const totalTilesCount = gridSize * gridSize;

  const hasNextLevel = currentLevelNumber < CAMPAIGN_LEVELS.length;

  return (
    <div className="min-h-screen bg-emerald-50/30 flex flex-col text-slate-800">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'help') {
            setIsHelpModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        playerName={playerName}
        isBgmMuted={isBgmMuted}
        onToggleBgm={handleToggleBgm}
        isSfxMuted={isSfxMuted}
        onToggleSfx={handleToggleSfx}
      />

      {/* Main App Content Router */}
      <main className="flex-1">
        {activeTab === 'puzzle' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
            {/* Campus Greeting Subheader with Green Accent */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Tantangan Puzzle
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Kenali gambar dengan menyusun kembali kepingan gambar hingga rapi dan sempurna!
                </p>
              </div>

              {/* HUD Status Counters */}
              <div className="flex items-center gap-2 sm:gap-3 bg-white p-2 sm:p-2.5 rounded-2xl border-2 border-emerald-200/80 shadow-xs self-start sm:self-auto">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50/70 rounded-xl border border-emerald-100">
                  <Clock className="w-4 h-4 text-emerald-700" />
                  <div className="text-left">
                    <span className="text-[10px] text-emerald-800 block leading-tight font-bold">
                      Waktu
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 font-mono tabular-nums leading-tight">
                      {formatTime(elapsedSeconds)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50/70 rounded-xl border border-emerald-100">
                  <Move className="w-4 h-4 text-amber-500" />
                  <div className="text-left">
                    <span className="text-[10px] text-emerald-800 block leading-tight font-bold">
                      Langkah
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 font-mono tabular-nums leading-tight">
                      {moveCount}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-xl shadow-xs">
                  <Trophy className="w-4 h-4 text-amber-300" />
                  <div className="text-left">
                    <span className="text-[10px] text-emerald-100 block leading-tight font-bold">
                      Skor
                    </span>
                    <span className="text-sm font-extrabold text-white font-mono tabular-nums leading-tight">
                      {currentScore.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign 5-Stage Progression Bar */}
            <CampaignLevelBar
              currentLevel={currentLevelNumber}
              progress={campaignProgress}
              isCampaignMode={isCampaignMode}
              onSelectLevel={handleSelectLevel}
              onToggleMode={handleToggleCampaignMode}
            />

            {/* Core Two-Column Game View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Interactive Puzzle Board */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="bg-white p-4 sm:p-6 rounded-3xl border-2 border-emerald-200/80 shadow-xs flex flex-col items-center">
                  {/* Current Active Image Title & Badges */}
                  <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-emerald-100">
                    <div className="text-left">
                      <span className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider block">
                        {isCampaignMode ? `Tahap ${currentLevelNumber}: ${selectedPreset.category}` : selectedPreset.category}
                      </span>
                      <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                        {selectedPreset.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                        {mode === 'slide' ? 'Mode Geser' : 'Mode Tukar'}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-emerald-600 text-white shadow-xs">
                        {gridSize}×{gridSize}
                      </span>
                    </div>
                  </div>

                  {/* Puzzle Canvas Grid with Hints and Pause */}
                  <PuzzleBoard
                    tiles={tiles}
                    gridSize={gridSize}
                    mode={mode}
                    imageUrl={selectedPreset.imageUrl}
                    isSolved={isSolved}
                    showNumbers={showNumbers}
                    emptyIndex={emptyIndex}
                    previewOpacity={previewOpacity}
                    hintIndex={hintTileIndex}
                    isPaused={isPaused}
                    onResume={() => setIsPaused(false)}
                    onRestart={handleShuffle}
                    onOpenHelp={() => setIsHelpModalOpen(true)}
                    onTileClick={handleTileClick}
                    onTileSwap={handleTileSwap}
                  />

                  {/* Keyboard Shortcuts Hint for Slide mode */}
                  {mode === 'slide' && !isSolved && (
                    <p className="text-xs text-emerald-700 mt-4 text-center font-medium">
                      Tips: Anda dapat mengklik keping atau menggunakan tombol panah keyboard (↑, ↓, ←, → / W, A, S, D) untuk menggeser.
                    </p>
                  )}

                  {/* When Solved Notice */}
                  {isSolved && (
                    <div className="w-full mt-4 p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-emerald-950">
                            Puzzle Berhasil Diselesaikan!
                          </h4>
                          <p className="text-xs text-emerald-800 font-medium">
                            Waktu: {formatTime(elapsedSeconds)} · {moveCount} Langkah · {currentScore.toLocaleString('id-ID')} Poin
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            soundFx.playShuffle();
                            handleShuffle();
                          }}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                        >
                          Main Lagi
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Game Controls, Helpers & Presets */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <ControlPanel
                  gridSize={gridSize}
                  setGridSize={handleGridSizeChange}
                  mode={mode}
                  setMode={handleModeChange}
                  selectedPresetId={selectedPreset.id}
                  selectedPreset={selectedPreset}
                  onSelectPreset={handleSelectPreset}
                  onCustomImageUpload={handleCustomImageUpload}
                  onShuffle={handleShuffle}
                  onReset={handleResetToSolved}
                  showNumbers={showNumbers}
                  setShowNumbers={setShowNumbers}
                  previewOpacity={previewOpacity}
                  setPreviewOpacity={setPreviewOpacity}
                  isSolved={isSolved}
                  isPaused={isPaused}
                  onTogglePause={handleTogglePause}
                  onUseHint={handleUseHint}
                  hintsRemaining={hintsRemaining}
                  isCampaignMode={isCampaignMode}
                  elapsedSeconds={elapsedSeconds}
                  moveCount={moveCount}
                  correctCount={correctTilesCount}
                  totalTiles={totalTilesCount}
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Papan Peringkat (Leaderboard) */}
        {activeTab === 'leaderboard' && (
          <LeaderboardView onPlayClick={() => setActiveTab('puzzle')} />
        )}
      </main>

      {/* Victory Celebration Modal */}
      <VictoryModal
        isOpen={isVictoryModalOpen}
        onClose={() => setIsVictoryModalOpen(false)}
        elapsedSeconds={elapsedSeconds}
        moveCount={moveCount}
        score={currentScore}
        rankTitle={rankTitle}
        stars={stars}
        gridSize={gridSize}
        mode={mode === 'slide' ? 'Geser Klasik' : 'Tukar Keping'}
        playerName={playerName}
        playerMajor={playerMajor}
        isCampaignMode={isCampaignMode}
        hasNextLevel={hasNextLevel}
        onNextLevel={handleNextLevel}
        onSaveScore={handleSaveScore}
        onViewLeaderboard={() => {
          setIsVictoryModalOpen(false);
          setActiveTab('leaderboard');
        }}
        onPlayAgain={() => {
          setIsVictoryModalOpen(false);
          handleShuffle();
        }}
      />

      {/* How To Play Modal */}
      <HowToPlayModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      {/* Clean Institutional Footer */}
      <footer className="mt-16 bg-white border-t border-emerald-200/80 py-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="Logo" className="w-7 h-7 object-contain" />
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-emerald-950 text-xs">Universitas PGRI Ronggolawe (UNIROW) Tuban</span>
              <span className="text-[11px] text-slate-500 font-medium">
                Perancang: <span className="font-bold text-emerald-800">Mario Fahmi Syahrial</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Petunjuk Permainan
            </button>
            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Bantuan
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className="hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Papan Peringkat
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
