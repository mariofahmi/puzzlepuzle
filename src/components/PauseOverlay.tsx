import React from 'react';
import { Play, RotateCcw, HelpCircle, Pause } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface PauseOverlayProps {
  isPaused: boolean;
  onResume: () => void;
  onRestart: () => void;
  onOpenHelp: () => void;
}

export const PauseOverlay: React.FC<PauseOverlayProps> = ({
  isPaused,
  onResume,
  onRestart,
  onOpenHelp,
}) => {
  if (!isPaused) return null;

  return (
    <div className="absolute inset-0 z-30 rounded-3xl bg-slate-950/75 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
      <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mb-3 shadow-lg">
        <Pause className="w-7 h-7 fill-slate-950" />
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
        Permainan Dijeda
      </h3>
      <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xs">
        Waktu dihentikan sementara. Tarik napas sejenak dan lanjutkan saat Anda siap!
      </p>

      <div className="flex flex-col gap-2.5 w-full max-w-xs mt-6">
        <button
          onClick={() => {
            soundFx.playClick();
            onResume();
          }}
          className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-white" />
          Lanjutkan Permainan
        </button>

        <button
          onClick={() => {
            soundFx.playShuffle();
            onRestart();
          }}
          className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Mulai Ulang Susunan
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onOpenHelp();
          }}
          className="w-full py-2 px-4 text-emerald-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          Lihat Petunjuk Aturan Main
        </button>
      </div>
    </div>
  );
};
