import React, { useState } from 'react';
import { Trophy, Medal, Search, Filter, RotateCcw, Clock, Move, ArrowUpDown, Sparkles } from 'lucide-react';
import { LeaderboardEntry, getLeaderboard, resetLeaderboardToDefault } from '../utils/leaderboard';
import { soundFx } from '../utils/sound';

interface LeaderboardViewProps {
  onPlayClick: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ onPlayClick }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(getLeaderboard());
  const [filterGrid, setFilterGrid] = useState<number | 'all'>('all');
  const [filterMode, setFilterMode] = useState<string | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleReset = () => {
    soundFx.playClick();
    if (confirm('Kembalikan papan peringkat ke daftar awal?')) {
      const reset = resetLeaderboardToDefault();
      setEntries([...reset]);
    }
  };

  const filtered = entries.filter((e) => {
    if (filterGrid !== 'all' && e.gridSize !== filterGrid) return false;
    if (filterMode !== 'all' && e.mode !== filterMode) return false;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return e.name.toLowerCase().includes(query) || e.major.toLowerCase().includes(query);
    }
    return true;
  });

  const top3 = filtered.slice(0, 3);

  return (
    <div className="w-full max-w-5xl mx-auto py-6 px-4 sm:px-6 flex flex-col gap-6">
      {/* Top Banner - Fresh Green Campus */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-linear-to-r from-emerald-800 via-teal-800 to-green-900 text-white p-6 sm:p-8 rounded-3xl shadow-md border border-emerald-700/50">
        <div>
          <span className="text-xs font-bold tracking-widest text-emerald-300 uppercase flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Papan Peringkat Pemain
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Juara Kecepatan Puzzle UNIROW
          </h2>
          <p className="text-sm text-emerald-100 mt-1 max-w-xl">
            Selesaikan puzzle kampus dengan waktu tercepat dan langkah paling efisien untuk memuncaki Hall of Fame UNIROW Tuban!
          </p>
        </div>
        <button
          onClick={() => {
            soundFx.playClick();
            onPlayClick();
          }}
          className="self-start sm:self-center px-5 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer"
        >
          Tantang Rekor Ini
        </button>
      </div>

      {/* Top 3 Podium Showcase */}
      {top3.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {top3.map((entry, index) => {
            const medalColor =
              index === 0
                ? 'from-amber-400 to-yellow-500 text-amber-950 border-amber-300'
                : index === 1
                ? 'from-slate-200 to-slate-400 text-slate-800 border-slate-300'
                : 'from-amber-600 to-orange-700 text-white border-amber-700';

            const podiumRank = index === 0 ? 'Juara 1 🥇' : index === 1 ? 'Juara 2 🥈' : 'Juara 3 🥉';

            return (
              <div
                key={entry.id}
                className="relative bg-white rounded-3xl p-5 border-2 border-emerald-100 shadow-xs flex flex-col items-center text-center overflow-hidden hover:shadow-md hover:border-emerald-300 transition-all"
              >
                {/* Ribbon Tag */}
                <div
                  className={`absolute top-0 right-0 px-3.5 py-1 text-[11px] font-bold rounded-bl-2xl border-b border-l bg-linear-to-r ${medalColor}`}
                >
                  {podiumRank}
                </div>

                {/* Avatar Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl shadow-md mb-3"
                  style={{ backgroundColor: entry.avatarColor }}
                >
                  {entry.name.charAt(0)}
                </div>

                <h3 className="text-base font-extrabold text-slate-900 line-clamp-1">
                  {entry.name}
                </h3>
                <p className="text-xs text-emerald-700 font-bold line-clamp-1 mt-0.5">
                  {entry.major}
                </p>

                <div className="mt-4 pt-3 border-t border-emerald-100 w-full flex items-center justify-around text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-medium">Waktu</span>
                    <span className="font-bold text-slate-700 font-mono">
                      {Math.floor(entry.elapsedSeconds / 60)}:{(entry.elapsedSeconds % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-medium">Langkah</span>
                    <span className="font-bold text-slate-700 font-mono">{entry.moveCount}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] font-medium">Skor</span>
                    <span className="font-extrabold text-emerald-700 font-mono">
                      {entry.score.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-emerald-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau prodi..."
            className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-emerald-50/50 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-800"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Grid selector */}
          <div className="flex items-center gap-1 bg-emerald-100/60 p-1 rounded-xl text-xs">
            {(['all', 3, 4, 5] as const).map((g) => (
              <button
                key={g}
                onClick={() => {
                  soundFx.playClick();
                  setFilterGrid(g);
                }}
                className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  filterGrid === g
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-emerald-900 hover:text-emerald-950'
                }`}
              >
                {g === 'all' ? 'Semua Grid' : `${g}×${g}`}
              </button>
            ))}
          </div>

          {/* Mode selector */}
          <div className="flex items-center gap-1 bg-emerald-100/60 p-1 rounded-xl text-xs">
            {[
              { val: 'all', label: 'Semua Mode' },
              { val: 'slide', label: 'Geser' },
              { val: 'swap', label: 'Tukar' },
            ].map((m) => (
              <button
                key={m.val}
                onClick={() => {
                  soundFx.playClick();
                  setFilterMode(m.val);
                }}
                className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer ${
                  filterMode === m.val
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'text-emerald-900 hover:text-emerald-950'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white rounded-3xl border border-emerald-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-emerald-50/70 border-b border-emerald-100 text-emerald-900 font-bold uppercase text-[11px] tracking-wider">
                <th className="py-3.5 px-4 text-center w-14">#</th>
                <th className="py-3.5 px-4">Nama Pemain</th>
                <th className="py-3.5 px-4">Program Studi</th>
                <th className="py-3.5 px-4 text-center">Format</th>
                <th className="py-3.5 px-4 text-center">Waktu</th>
                <th className="py-3.5 px-4 text-center">Langkah</th>
                <th className="py-3.5 px-4 text-right">Skor Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400">
                    Belum ada data skor yang cocok dengan filter.
                  </td>
                </tr>
              ) : (
                filtered.map((entry, idx) => {
                  const isTop1 = idx === 0;
                  const isTop2 = idx === 1;
                  const isTop3 = idx === 2;

                  return (
                    <tr
                      key={entry.id}
                      className="hover:bg-emerald-50/50 transition-colors"
                    >
                      <td className="py-3.5 px-4 text-center font-extrabold">
                        {isTop1 ? (
                          <span className="text-amber-500 font-bold text-base">🥇 1</span>
                        ) : isTop2 ? (
                          <span className="text-slate-400 font-bold text-base">🥈 2</span>
                        ) : isTop3 ? (
                          <span className="text-amber-700 font-bold text-base">🥉 3</span>
                        ) : (
                          <span className="text-slate-500">{idx + 1}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className="w-7 h-7 rounded-lg text-white font-bold flex items-center justify-center text-xs shrink-0"
                            style={{ backgroundColor: entry.avatarColor }}
                          >
                            {entry.name.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block line-clamp-1">
                              {entry.name}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {entry.date}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        {entry.major}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/60 font-semibold text-xs">
                          {entry.gridSize}×{entry.gridSize} · {entry.mode === 'slide' ? 'Geser' : 'Tukar'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-medium tabular-nums text-slate-700">
                        {Math.floor(entry.elapsedSeconds / 60)}:{(entry.elapsedSeconds % 60).toString().padStart(2, '0')}
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono font-medium tabular-nums text-slate-700">
                        {entry.moveCount}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-extrabold text-emerald-700 tabular-nums">
                        {entry.score.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-emerald-50/50 border-t border-emerald-100 flex items-center justify-between text-xs text-slate-500">
          <span>Menampilkan {filtered.length} pemain berprestasi</span>
          <button
            onClick={handleReset}
            className="text-slate-400 hover:text-emerald-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Data Awal
          </button>
        </div>
      </div>
    </div>
  );
};
