import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Star, CheckCircle, Sparkles, ListOrdered, ArrowRight } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  elapsedSeconds: number;
  moveCount: number;
  score: number;
  rankTitle: string;
  stars: number;
  gridSize: number;
  mode: string;
  playerName: string;
  playerMajor: string;
  isCampaignMode?: boolean;
  hasNextLevel?: boolean;
  onNextLevel?: () => void;
  onSaveScore: (name: string, major: string) => void;
  onViewLeaderboard: () => void;
  onPlayAgain: () => void;
}

export const UNIROW_MAJORS = [
  'Teknik Informatika (FST)',
  'Pendidikan Matematika (FKIP)',
  'Ilmu Komunikasi (FISIP)',
  'Teknik Industri (FST)',
  'Pendidikan Bahasa Inggris (FKIP)',
  'Manajemen (FE)',
  'Pendidikan Biologi (FKIP)',
  'Ilmu Politik (FISIP)',
  'Pendidikan Guru PAUD (FKIP)',
  'Teknik Perikanan & Kelautan (FST)',
  'Ilmu Hukum (FH)',
  'Akuntansi (FE)',
];

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onClose,
  elapsedSeconds,
  moveCount,
  score,
  rankTitle,
  stars,
  gridSize,
  mode,
  playerName,
  playerMajor,
  isCampaignMode = false,
  hasNextLevel = false,
  onNextLevel,
  onSaveScore,
  onViewLeaderboard,
  onPlayAgain,
}) => {
  const [name, setName] = useState(playerName || 'Pemain Ronggolawe');
  const [major, setMajor] = useState(playerMajor || UNIROW_MAJORS[0]);
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setHasSaved(false);
      // Confetti firework in fresh green & gold tones
      const duration = 2.5 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#10B981', '#34D399', '#F59E0B', '#FBBF24', '#059669'],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#10B981', '#34D399', '#F59E0B', '#FBBF24', '#059669'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSaveScore(name.trim(), major);
    setHasSaved(true);
    soundFx.playTileCorrect();
  };

  const mins = Math.floor(elapsedSeconds / 60);
  const secs = elapsedSeconds % 60;
  const timeFormatted = `${mins > 0 ? `${mins}m ` : ''}${secs}s`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-emerald-200 flex flex-col gap-5 text-center max-h-[90vh] overflow-y-auto">
        {/* Header Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-linear-to-tr from-emerald-500 to-green-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
          <Trophy className="w-8 h-8 stroke-[2.5]" />
        </div>

        {/* Title */}
        <div>
          <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Selamat Datang di Kampus UNIROW!
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Puzzle Berhasil Disusun!
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Luar biasa! Anda telah menuntaskan orientasi gambar kampus dengan predikat:
          </p>
          <div className="inline-block mt-2 px-3.5 py-1 bg-emerald-50 border border-emerald-300 rounded-full text-emerald-950 font-extrabold text-sm shadow-2xs">
            {rankTitle}
          </div>
          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mt-2 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < stars ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Score Breakdown Metrics */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100">
          <div className="text-center p-2">
            <span className="text-[11px] font-semibold text-slate-500 block">Waktu</span>
            <span className="text-base sm:text-lg font-extrabold text-slate-900 font-mono tabular-nums">
              {timeFormatted}
            </span>
          </div>
          <div className="text-center p-2 border-x border-emerald-200/60">
            <span className="text-[11px] font-semibold text-slate-500 block">Langkah</span>
            <span className="text-base sm:text-lg font-extrabold text-slate-900 font-mono tabular-nums">
              {moveCount}
            </span>
          </div>
          <div className="text-center p-2">
            <span className="text-[11px] font-semibold text-slate-500 block">Skor Akhir</span>
            <span className="text-base sm:text-lg font-extrabold text-emerald-700 font-mono tabular-nums">
              {score.toLocaleString('id-ID')}
            </span>
          </div>
        </div>

        {/* Save to Leaderboard Form */}
        {!hasSaved ? (
          <form onSubmit={handleSave} className="flex flex-col gap-3 text-left">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Pemain / Peserta
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap Anda..."
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Program Studi / Fakultas Impian
              </label>
              <select
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                {UNIROW_MAJORS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
              Simpan Skor ke Papan Peringkat
            </button>
          </form>
        ) : (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-center gap-2 text-emerald-800 font-semibold text-sm">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Skor Anda telah berhasil tercatat di Papan Peringkat!
          </div>
        )}

        {/* Campaign Mode: Next Level CTA */}
        {isCampaignMode && hasNextLevel && onNextLevel && (
          <button
            onClick={() => {
              soundFx.playLevelUp();
              onNextLevel();
            }}
            className="w-full py-3 px-4 bg-linear-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse"
          >
            Lanjut ke Level Berikutnya <ArrowRight className="w-4 h-4" />
          </button>
        )}

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
          <button
            onClick={() => {
              soundFx.playClick();
              onViewLeaderboard();
            }}
            className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ListOrdered className="w-4 h-4" />
            Lihat Peringkat
          </button>
          <button
            onClick={() => {
              soundFx.playShuffle();
              onPlayAgain();
            }}
            className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Main Lagi
          </button>
        </div>
      </div>
    </div>
  );
};

