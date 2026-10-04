import React from 'react';
import { Volume2, VolumeX, Sparkles, Trophy, HelpCircle, Music } from 'lucide-react';
import { soundFx } from '../utils/sound';
import logoUrl from '../assets/logo.png';

export type ActiveTab = 'puzzle' | 'leaderboard' | 'help';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  playerName: string;
  isBgmMuted: boolean;
  onToggleBgm: () => void;
  isSfxMuted: boolean;
  onToggleSfx: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  playerName,
  isBgmMuted,
  onToggleBgm,
  isSfxMuted,
  onToggleSfx,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('puzzle');
              }}
              className="text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-600 rounded-lg"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-emerald-200/90 p-1 flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:border-emerald-500 transition-all overflow-hidden shrink-0">
                  <img
                    src={logoUrl}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-base sm:text-lg font-extrabold tracking-tight text-emerald-950 group-hover:text-emerald-700 transition-colors leading-tight">
                    Puzzle Puzzle
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-tight leading-tight">
                    Perancang: <span className="font-semibold text-emerald-800">Mario Fahmi Syahrial</span>
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Zone 2: 4 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-slate-600">
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('puzzle');
              }}
              className={`hover:text-emerald-800 transition-colors cursor-pointer py-1 border-b-2 ${
                activeTab === 'puzzle' ? 'text-emerald-800 border-emerald-600 font-bold' : 'border-transparent'
              }`}
            >
              Arena Puzzle
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('leaderboard');
              }}
              className={`hover:text-emerald-800 transition-colors cursor-pointer py-1 border-b-2 ${
                activeTab === 'leaderboard' ? 'text-emerald-800 border-emerald-600 font-bold' : 'border-transparent'
              }`}
            >
              Papan Peringkat
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setActiveTab('help');
              }}
              className={`hover:text-emerald-800 transition-colors cursor-pointer py-1 border-b-2 ${
                activeTab === 'help' ? 'text-emerald-800 border-emerald-600 font-bold' : 'border-transparent'
              }`}
            >
              Petunjuk
            </button>
          </nav>

          {/* Zone 3: Audio controls & primary action */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* BGM Toggle Button */}
            <button
              onClick={onToggleBgm}
              title={isBgmMuted ? 'Nyalakan Musik Latar' : 'Matikan Musik Latar'}
              className={`p-2 rounded-xl transition-all cursor-pointer flex items-center gap-1 text-xs font-bold ${
                !isBgmMuted
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
              aria-label="Toggle BGM music"
            >
              <Music className={`w-4 h-4 ${!isBgmMuted ? 'animate-bounce text-emerald-700' : ''}`} />
              <span className="hidden lg:inline text-[11px]">{!isBgmMuted ? 'Musik On' : 'Musik Off'}</span>
            </button>

            {/* SFX Sound Toggle Button */}
            <button
              onClick={onToggleSfx}
              title={isSfxMuted ? 'Nyalakan Efek Suara' : 'Matikan Efek Suara'}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                !isSfxMuted
                  ? 'text-emerald-800 hover:bg-emerald-50'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
              aria-label="Toggle SFX sound"
            >
              {isSfxMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>

            {/* Quick Action Button */}
            {activeTab !== 'puzzle' ? (
              <button
                onClick={() => {
                  soundFx.playClick();
                  setActiveTab('puzzle');
                }}
                className="px-3.5 py-2 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-600"
              >
                Main Puzzle
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200/70 rounded-xl text-xs font-medium text-emerald-900">
                <span className="text-emerald-600 font-bold">Pemain:</span>
                <span className="font-extrabold text-emerald-950 truncate max-w-[130px]">{playerName || 'Pemain'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile secondary tab strip */}
        <div className="flex md:hidden items-center justify-between border-t border-emerald-100 py-2 overflow-x-auto gap-2 text-xs">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('puzzle');
            }}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
              activeTab === 'puzzle' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600'
            }`}
          >
            Arena Puzzle
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('leaderboard');
            }}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1 font-medium ${
              activeTab === 'leaderboard' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" /> Peringkat
          </button>
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('help');
            }}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap flex items-center gap-1 font-medium ${
              activeTab === 'help' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-600'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" /> Petunjuk
          </button>
        </div>
      </div>
    </header>
  );
};
