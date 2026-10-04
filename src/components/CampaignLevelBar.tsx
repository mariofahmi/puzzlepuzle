import React from 'react';
import { Lock, Star, Sparkles, Map, Compass, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { CAMPAIGN_LEVELS, CampaignLevel, LevelProgress } from '../data/campaign';
import { soundFx } from '../utils/sound';

interface CampaignLevelBarProps {
  currentLevel: number;
  progress: Record<number, LevelProgress>;
  isCampaignMode: boolean;
  onSelectLevel: (levelNumber: number) => void;
  onToggleMode: (campaign: boolean) => void;
}

export const CampaignLevelBar: React.FC<CampaignLevelBarProps> = ({
  currentLevel,
  progress,
  isCampaignMode,
  onSelectLevel,
  onToggleMode,
}) => {
  const activeLevelData = CAMPAIGN_LEVELS.find((l) => l.levelNumber === currentLevel) || CAMPAIGN_LEVELS[0];
  const activeProgress = progress[currentLevel] || { stars: 0, completed: false };

  // Calculate total stars earned across all levels
  const totalStars = Object.values(progress).reduce((acc, p) => acc + (p.stars || 0), 0);
  const maxStars = CAMPAIGN_LEVELS.length * 3;

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-emerald-200/90 shadow-xs flex flex-col gap-4">
      {/* Mode Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              Petualangan Orientasi Kampus UNIROW
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                5 Tahapan
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              Jelajahi setiap sudut kampus, pecahkan puzzle bertahap, dan kumpulkan bintang prestasi!
            </p>
          </div>
        </div>

        {/* Stars Badge & Mode Switch */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-xs font-extrabold">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{totalStars} / {maxStars} Bintang</span>
          </div>

          <div className="flex items-center bg-emerald-100/60 p-0.5 rounded-xl text-xs font-bold">
            <button
              onClick={() => {
                soundFx.playClick();
                onToggleMode(true);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                isCampaignMode
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-900 hover:text-emerald-950'
              }`}
            >
              Mode Petualangan
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                onToggleMode(false);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                !isCampaignMode
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-900 hover:text-emerald-950'
              }`}
            >
              Mode Bebas
            </button>
          </div>
        </div>
      </div>

      {/* 5 Levels Step Progression Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {CAMPAIGN_LEVELS.map((level) => {
          const p = progress[level.levelNumber] || { unlocked: false, completed: false, stars: 0 };
          const isCurrent = isCampaignMode && currentLevel === level.levelNumber;
          const isUnlocked = p.unlocked;

          return (
            <button
              key={level.levelNumber}
              disabled={!isUnlocked}
              onClick={() => {
                if (isUnlocked) {
                  soundFx.playClick();
                  onSelectLevel(level.levelNumber);
                }
              }}
              className={`relative text-left p-3 rounded-2xl border-2 transition-all flex flex-col justify-between h-28 cursor-pointer ${
                isCurrent
                  ? 'border-emerald-600 bg-emerald-50/90 shadow-md ring-2 ring-emerald-500/30'
                  : isUnlocked
                  ? p.completed
                    ? 'border-emerald-300 bg-white hover:border-emerald-500 hover:bg-emerald-50/40'
                    : 'border-slate-200 bg-white hover:border-emerald-300'
                  : 'border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[10px] font-extrabold uppercase tracking-wider ${
                  isCurrent ? 'text-emerald-800' : 'text-slate-500'
                }`}>
                  Tahap {level.levelNumber}
                </span>

                {isUnlocked ? (
                  p.completed ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  )
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center">
                    <Lock className="w-3 h-3" />
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-xs font-extrabold text-slate-900 line-clamp-1">
                  {level.title}
                </h4>
                <span className="text-[10px] text-emerald-700 font-semibold block">
                  {level.gridSize}×{level.gridSize} · {level.mode === 'slide' ? 'Geser' : 'Tukar'}
                </span>
              </div>

              {/* Star Rating on this level */}
              <div className="flex items-center gap-0.5">
                {[1, 2, 3].map((starIdx) => (
                  <Star
                    key={starIdx}
                    className={`w-3.5 h-3.5 ${
                      starIdx <= (p.stars || 0)
                        ? 'fill-amber-400 text-amber-500'
                        : 'text-slate-200 fill-slate-100'
                    }`}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Stage Narration & Campus Trivia Callout */}
      {isCampaignMode && (
        <div className="bg-linear-to-r from-emerald-50 via-teal-50 to-green-50 rounded-2xl p-3.5 sm:p-4 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-emerald-900 uppercase tracking-wider">
                  Misi Level {activeLevelData.levelNumber}: {activeLevelData.title}
                </span>
                <span className="text-[10px] bg-emerald-200/80 text-emerald-950 font-bold px-2 py-0.5 rounded-full">
                  Target: &lt;{activeLevelData.targetSeconds}s · &lt;{activeLevelData.targetMoves} langkah
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                {activeLevelData.story}
              </p>
              <p className="text-[11px] text-emerald-800 font-medium mt-1 italic">
                💡 <strong>Tahukah Anda?</strong> {activeLevelData.trivia}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
