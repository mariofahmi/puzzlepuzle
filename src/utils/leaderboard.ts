/**
 * Leaderboard persistence and ranking utility for Mahasiswa Baru UNIROW
 */

export interface LeaderboardEntry {
  id: string;
  name: string;
  major: string;
  gridSize: 3 | 4 | 5;
  mode: 'slide' | 'swap';
  elapsedSeconds: number;
  moveCount: number;
  score: number;
  date: string;
  avatarColor: string;
}

const STORAGE_KEY = 'unirow_pmb_leaderboard_v1';

const INITIAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    id: 'lead-1',
    name: 'Ahmad Faiz Ronggo',
    major: 'Teknik Informatika',
    gridSize: 3,
    mode: 'slide',
    elapsedSeconds: 28,
    moveCount: 22,
    score: 2250,
    date: '03 Okt 2026',
    avatarColor: '#2563EB',
  },
  {
    id: 'lead-2',
    name: 'Dinda Ayu Maharani',
    major: 'Pendidikan Bahasa Inggris',
    gridSize: 3,
    mode: 'swap',
    elapsedSeconds: 34,
    moveCount: 16,
    score: 1820,
    date: '03 Okt 2026',
    avatarColor: '#EC4899',
  },
  {
    id: 'lead-3',
    name: 'Bima Satria Tuban',
    major: 'Teknik Industri',
    gridSize: 4,
    mode: 'slide',
    elapsedSeconds: 78,
    moveCount: 44,
    score: 5120,
    date: '02 Okt 2026',
    avatarColor: '#059669',
  },
  {
    id: 'lead-4',
    name: 'Nadia Putri Kusuma',
    major: 'Pendidikan Matematika',
    gridSize: 4,
    mode: 'swap',
    elapsedSeconds: 52,
    moveCount: 26,
    score: 4350,
    date: '02 Okt 2026',
    avatarColor: '#D97706',
  },
  {
    id: 'lead-5',
    name: 'Rezky Pratama',
    major: 'Ilmu Komunikasi',
    gridSize: 5,
    mode: 'slide',
    elapsedSeconds: 160,
    moveCount: 92,
    score: 8750,
    date: '01 Okt 2026',
    avatarColor: '#7C3AED',
  },
  {
    id: 'lead-6',
    name: 'Siti Nur Aini',
    major: 'Pendidikan Biologi',
    gridSize: 3,
    mode: 'slide',
    elapsedSeconds: 42,
    moveCount: 30,
    score: 1640,
    date: '01 Okt 2026',
    avatarColor: '#0284C7',
  },
  {
    id: 'lead-7',
    name: 'Ilham Wahyudi',
    major: 'Pendidikan Ekonomi',
    gridSize: 4,
    mode: 'slide',
    elapsedSeconds: 95,
    moveCount: 56,
    score: 4420,
    date: '30 Sep 2026',
    avatarColor: '#EA580C',
  },
];

export function getLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADERBOARD));
      return INITIAL_LEADERBOARD;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_LEADERBOARD;
  } catch {
    return INITIAL_LEADERBOARD;
  }
}

export function saveLeaderboardEntry(entry: Omit<LeaderboardEntry, 'id' | 'date'>): LeaderboardEntry {
  const current = getLeaderboard();
  const dateStr = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date());

  const newEntry: LeaderboardEntry = {
    ...entry,
    id: `entry-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    date: dateStr,
  };

  const updated = [newEntry, ...current];
  // Sort descending by score
  updated.sort((a, b) => b.score - a.score);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated.slice(0, 100)));
  return newEntry;
}

export function resetLeaderboardToDefault(): LeaderboardEntry[] {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADERBOARD));
  return INITIAL_LEADERBOARD;
}
