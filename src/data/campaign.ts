import { GridDimension, PuzzleMode } from '../utils/puzzle';

export interface CampaignLevel {
  levelNumber: number;
  id: string;
  title: string;
  subtitle: string;
  presetId: string;
  gridSize: GridDimension;
  mode: PuzzleMode;
  targetSeconds: number;
  targetMoves: number;
  story: string;
  trivia: string;
  badgeName: string;
}

export interface LevelProgress {
  levelNumber: number;
  unlocked: boolean;
  completed: boolean;
  bestTime: number; // in seconds
  bestMoves: number;
  bestScore: number;
  stars: number; // 0 to 3
}

export const CAMPAIGN_LEVELS: CampaignLevel[] = [
  {
    levelNumber: 1,
    id: 'stage-1',
    title: 'Gerbang & Fasad Rektorat',
    subtitle: 'Tahap 1: Pengenalan Kampus',
    presetId: 'gedung-rektorat',
    gridSize: 3,
    mode: 'swap',
    targetSeconds: 45,
    targetMoves: 25,
    story: 'Langkah pertama orientasi kampus dimulai dari Fasad Rektorat UNIROW yang megah dan penuh semangat!',
    trivia: 'Gedung Rektorat UNIROW memiliki perpaduan warna biru dan kuning cerah yang melambangkan integritas, kecerdasan, dan optimisme civitas akademika.',
    badgeName: 'Penjelajah Pemula UNIROW',
  },
  {
    levelNumber: 2,
    id: 'stage-2',
    title: 'Ruang Kuliah & Laboratorium',
    subtitle: 'Tahap 2: Fasilitas Akademik',
    presetId: 'gedung-kuliah',
    gridSize: 3,
    mode: 'slide',
    targetSeconds: 65,
    targetMoves: 40,
    story: 'Masuk lebih dalam menyusuri koridor lantai kuliah, ruang kelas interaktif, dan laboratorium sains & teknologi.',
    trivia: 'UNIROW memiliki laboratorium komputer mutakhir, lab biologi terpadu, serta perpustakaan digital untuk mendukung riset mahasiswa dan dosen.',
    badgeName: 'Akademisi Cekatan',
  },
  {
    levelNumber: 3,
    id: 'stage-3',
    title: 'Fasilitas & Koridor Kampus',
    subtitle: 'Tahap 3: Suasana Kampus Modern',
    presetId: 'gedung-kuliah',
    gridSize: 4,
    mode: 'swap',
    targetSeconds: 90,
    targetMoves: 50,
    story: 'Jelajahi kenyamanan fasilitas gedung dan koridor perkuliahan yang mendukung riset dan diskusi mahasiswa.',
    trivia: 'Kampus UNIROW Tuban dilengkapi ruang kuliah multimedia ber-AC, laboratorium praktikum, dan free WiFi cepat.',
    badgeName: 'Penjelajah Kampus Modern',
  },
  {
    levelNumber: 4,
    id: 'stage-4',
    title: 'Semangat Mahasiswa Baru',
    subtitle: 'Tahap 4: Kebersamaan & Sahabat Maba',
    presetId: 'maba-pmb',
    gridSize: 4,
    mode: 'slide',
    targetSeconds: 130,
    targetMoves: 75,
    story: 'Bertemu sahabat baru lintas program studi dari seluruh penjuru nusantara yang siap menyongsong masa depan cerah.',
    trivia: 'UNIROW memfasilitasi berbagai organisasi mahasiswa (BEM, DPM, UKM Seni, Pramuka, Olahraga, Mapala, Robotika) untuk mengasah soft skills.',
    badgeName: 'Sahabat Maba Teladan',
  },
  {
    levelNumber: 5,
    id: 'stage-5',
    title: 'Kuda Ronggolawe & Lambang Kebanggaan',
    subtitle: 'Tahap 5: Sang Juara Kampus Master',
    presetId: 'lambang-unirow',
    gridSize: 5,
    mode: 'slide',
    targetSeconds: 200,
    targetMoves: 120,
    story: 'Tantangan puncak! Buktikan ketangkasan dan dedikasi Anda merangkai lambang kebanggaan ksatria Ronggolawe Tuban.',
    trivia: 'Kuda Putih gagah Ronggolawe melambangkan kesetiaan, keberanian membela kebenaran, dan semangat juang tanpa gentar dalam mengarungi peradaban!',
    badgeName: 'Ksatria Sejati Ronggolawe',
  },
];

const CAMPAIGN_STORAGE_KEY = 'unirow_pmb_campaign_progress_v1';

export function getCampaignProgress(): Record<number, LevelProgress> {
  try {
    const raw = localStorage.getItem(CAMPAIGN_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }

  // Default initial progress: Level 1 is unlocked, others locked
  const initial: Record<number, LevelProgress> = {
    1: { levelNumber: 1, unlocked: true, completed: false, bestTime: 0, bestMoves: 0, bestScore: 0, stars: 0 },
    2: { levelNumber: 2, unlocked: false, completed: false, bestTime: 0, bestMoves: 0, bestScore: 0, stars: 0 },
    3: { levelNumber: 3, unlocked: false, completed: false, bestTime: 0, bestMoves: 0, bestScore: 0, stars: 0 },
    4: { levelNumber: 4, unlocked: false, completed: false, bestTime: 0, bestMoves: 0, bestScore: 0, stars: 0 },
    5: { levelNumber: 5, unlocked: false, completed: false, bestTime: 0, bestMoves: 0, bestScore: 0, stars: 0 },
  };
  saveCampaignProgress(initial);
  return initial;
}

export function saveCampaignProgress(progress: Record<number, LevelProgress>): void {
  try {
    localStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save campaign progress', err);
  }
}

export function updateLevelCompletion(
  levelNumber: number,
  elapsedSeconds: number,
  moveCount: number,
  score: number
): { progress: Record<number, LevelProgress>; starsEarned: number; newlyUnlockedLevel: number | null } {
  const current = getCampaignProgress();
  const levelInfo = CAMPAIGN_LEVELS.find((l) => l.levelNumber === levelNumber);

  // Calculate stars earned (1 to 3 stars)
  let starsEarned = 1; // Completed = at least 1 star
  if (levelInfo) {
    if (elapsedSeconds <= levelInfo.targetSeconds && moveCount <= levelInfo.targetMoves) {
      starsEarned = 3;
    } else if (elapsedSeconds <= levelInfo.targetSeconds * 1.4 || moveCount <= levelInfo.targetMoves * 1.4) {
      starsEarned = 2;
    }
  }

  const existing = current[levelNumber] || {
    levelNumber,
    unlocked: true,
    completed: false,
    bestTime: 0,
    bestMoves: 0,
    bestScore: 0,
    stars: 0,
  };

  const bestStars = Math.max(existing.stars || 0, starsEarned);
  const bestTime = existing.bestTime > 0 ? Math.min(existing.bestTime, elapsedSeconds) : elapsedSeconds;
  const bestMoves = existing.bestMoves > 0 ? Math.min(existing.bestMoves, moveCount) : moveCount;
  const bestScore = Math.max(existing.bestScore || 0, score);

  current[levelNumber] = {
    ...existing,
    completed: true,
    stars: bestStars,
    bestTime,
    bestMoves,
    bestScore,
  };

  // Unlock next level if available
  let newlyUnlockedLevel: number | null = null;
  const nextLevelNumber = levelNumber + 1;
  if (CAMPAIGN_LEVELS.some((l) => l.levelNumber === nextLevelNumber)) {
    if (!current[nextLevelNumber] || !current[nextLevelNumber].unlocked) {
      current[nextLevelNumber] = {
        levelNumber: nextLevelNumber,
        unlocked: true,
        completed: false,
        bestTime: 0,
        bestMoves: 0,
        bestScore: 0,
        stars: 0,
      };
      newlyUnlockedLevel = nextLevelNumber;
    }
  }

  saveCampaignProgress(current);
  return { progress: current, starsEarned, newlyUnlockedLevel };
}
