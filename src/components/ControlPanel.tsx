import React, { useRef, useState } from 'react';
import {
  Shuffle,
  Eye,
  Hash,
  RotateCcw,
  Upload,
  CheckCircle2,
  HelpCircle,
  Maximize2,
  X,
  Sparkles,
  Lightbulb,
  Pause,
  Play,
} from 'lucide-react';
import { GridDimension, PuzzleMode } from '../utils/puzzle';
import { CampusPreset, CAMPUS_PRESETS } from '../data/presets';
import { soundFx } from '../utils/sound';

interface ControlPanelProps {
  gridSize: GridDimension;
  setGridSize: (size: GridDimension) => void;
  mode: PuzzleMode;
  setMode: (mode: PuzzleMode) => void;
  selectedPresetId: string;
  selectedPreset: CampusPreset;
  onSelectPreset: (preset: CampusPreset) => void;
  onCustomImageUpload: (dataUrl: string, title: string) => void;
  onShuffle: () => void;
  onReset: () => void;
  showNumbers: boolean;
  setShowNumbers: (show: boolean) => void;
  previewOpacity: number;
  setPreviewOpacity: (opacity: number) => void;
  isSolved: boolean;
  isPaused: boolean;
  onTogglePause: () => void;
  onUseHint: () => void;
  hintsRemaining: number;
  isCampaignMode: boolean;
  elapsedSeconds: number;
  moveCount: number;
  correctCount: number;
  totalTiles: number;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  gridSize,
  setGridSize,
  mode,
  setMode,
  selectedPresetId,
  selectedPreset,
  onSelectPreset,
  onCustomImageUpload,
  onShuffle,
  onReset,
  showNumbers,
  setShowNumbers,
  previewOpacity,
  setPreviewOpacity,
  isSolved,
  isPaused,
  onTogglePause,
  onUseHint,
  hintsRemaining,
  isCampaignMode,
  elapsedSeconds,
  moveCount,
  correctCount,
  totalTiles,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [showImagePicker, setShowImagePicker] = useState(true);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onCustomImageUpload(result, file.name.replace(/\.[^/.]+$/, ''));
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const progressPercent = Math.round((correctCount / totalTiles) * 100);

  return (
    <div className="flex flex-col gap-4">
      {/* 0. Target Image Preview Box */}
      <div className="bg-white p-4 rounded-3xl border-2 border-emerald-200/80 shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
              Preview Gambar Sasaran
            </h3>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              setIsPreviewModalOpen(true);
            }}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer bg-emerald-50 hover:bg-emerald-100 px-2.5 py-1 rounded-lg transition-colors border border-emerald-200"
          >
            <Maximize2 className="w-3.5 h-3.5" /> Perbesar
          </button>
        </div>

        <div className="flex items-center gap-3.5 bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100">
          <div
            onClick={() => setIsPreviewModalOpen(true)}
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 border-emerald-500 shadow-sm shrink-0 bg-white cursor-pointer group"
          >
            <img
              src={selectedPreset.imageUrl}
              alt={selectedPreset.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Eye className="w-5 h-5 drop-shadow-sm" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-bold text-emerald-700 block truncate">
              {selectedPreset.category}
            </span>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 line-clamp-2 leading-snug">
              {selectedPreset.title}
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
              {selectedPreset.description}
            </p>
            <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-800 bg-emerald-200/70 px-2 py-0.5 rounded-full">
              Target Susunan Selesai
            </span>
          </div>
        </div>
      </div>

      {/* 1. Mode & Difficulty Selectors */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-emerald-200/80 shadow-xs flex flex-col gap-4">
        {/* Game Mode Tab Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
              Mode Permainan
            </label>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-lg">
              {mode === 'swap' ? 'Mode Santai' : 'Mode Geser'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 p-1 bg-emerald-100/60 rounded-2xl">
            <button
              onClick={() => {
                soundFx.playClick();
                setMode('swap');
              }}
              className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'swap'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-900 hover:text-emerald-950 hover:bg-emerald-200/50'
              }`}
            >
              Tukar Keping (Santai)
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                setMode('slide');
              }}
              className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'slide'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-900 hover:text-emerald-950 hover:bg-emerald-200/50'
              }`}
            >
              Geser Klasik (Tantangan)
            </button>
          </div>
        </div>

        {/* Grid Size Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
              Tingkat Kesulitan
            </label>
            <span className="text-xs font-bold text-emerald-700">
              {gridSize === 3 ? '9 Keping · Pemula' : gridSize === 4 ? '16 Keping · Sedang' : '25 Keping · Master'}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {([3, 4, 5] as GridDimension[]).map((size) => (
              <button
                key={size}
                onClick={() => {
                  soundFx.playClick();
                  setGridSize(size);
                }}
                className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-xl border transition-all text-center cursor-pointer ${
                  gridSize === size
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-500/25 shadow-2xs font-extrabold'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/50'
                }`}
              >
                {size} × {size}
                <span className="block text-[11px] font-normal text-slate-500">
                  {size === 3 ? 'Mudah' : size === 4 ? 'Standar' : 'Master'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Primary In-Game Control Actions: Shuffle, Pause, Reset */}
        <div className="pt-2 flex flex-wrap gap-2">
          <button
            onClick={() => {
              soundFx.playShuffle();
              onShuffle();
            }}
            className="flex-1 min-w-[130px] py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-emerald-600"
          >
            <Shuffle className="w-4 h-4" />
            Acak Ulang
          </button>

          {!isSolved && (
            <button
              onClick={() => {
                soundFx.playClick();
                onTogglePause();
              }}
              title={isPaused ? 'Lanjutkan permainan' : 'Jeda waktu permainan'}
              className="py-2.5 px-3.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm rounded-xl border border-amber-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isPaused ? <Play className="w-4 h-4 fill-amber-700" /> : <Pause className="w-4 h-4" />}
              {isPaused ? 'Lanjut' : 'Jeda'}
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playClick();
              onReset();
            }}
            title="Reset puzzle ke susunan terpecahkan"
            className="py-2.5 px-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs sm:text-sm rounded-xl border border-emerald-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {/* 2. Helper & Assistance Tools */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-emerald-200/80 shadow-xs flex flex-col gap-3">
        <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
          Alat Bantu & Petunjuk Pintar
        </h3>

        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Numbers Toggle */}
          <button
            onClick={() => {
              soundFx.playClick();
              setShowNumbers(!showNumbers);
            }}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
              showNumbers
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Hash className="w-3.5 h-3.5 text-emerald-600" />
            {showNumbers ? 'Nomor Aktif' : 'Tampilkan Nomor'}
          </button>

          {/* Smart Hint Button */}
          {!isSolved && (
            <button
              onClick={() => {
                soundFx.playHint();
                onUseHint();
              }}
              title="Sorot satu keping yang perlu dipindahkan"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 transition-all cursor-pointer shadow-2xs"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600 fill-amber-300" />
              Petunjuk ({hintsRemaining})
            </button>
          )}

          {/* Translucent Ghost Overlay Toggle */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-600 font-medium flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-emerald-600" /> Intip Bayangan:
            </span>
            <div className="flex items-center gap-1 bg-emerald-100/50 p-0.5 rounded-lg text-xs">
              {[0, 0.25, 0.55].map((op) => (
                <button
                  key={op}
                  onClick={() => {
                    soundFx.playClick();
                    setPreviewOpacity(op);
                  }}
                  className={`px-2 py-1 rounded font-medium transition-all ${
                    previewOpacity === op
                      ? 'bg-white text-emerald-800 shadow-2xs font-bold'
                      : 'text-emerald-900 hover:text-emerald-950'
                  }`}
                >
                  {op === 0 ? 'Mati' : op === 0.25 ? 'Samar' : 'Jelas'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Progress Bar */}
        <div className="mt-2 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 font-medium">Progres Keping Tepat:</span>
            <span className="font-extrabold text-emerald-800 tabular-nums">
              {correctCount} / {totalTiles} keping ({progressPercent}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-linear-to-r from-emerald-500 via-teal-500 to-green-500 transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Image Selection / Upload (In Sandbox / Free Play Mode) */}
      {!isCampaignMode && (
        showImagePicker ? (
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-emerald-200/80 shadow-xs flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                Pilihan Gambar Kampus UNIROW
              </h3>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
                >
                  <Upload className="w-3.5 h-3.5" /> Unggah Foto
                </button>
                <button
                  onClick={() => setShowImagePicker(false)}
                  title="Sembunyikan bagian ini"
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {CAMPUS_PRESETS.map((preset) => {
                const isSelected = selectedPresetId === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      soundFx.playClick();
                      onSelectPreset(preset);
                    }}
                    className={`group relative text-left p-2 rounded-2xl border transition-all cursor-pointer overflow-hidden ${
                      isSelected
                        ? 'border-emerald-600 ring-2 ring-emerald-500/25 bg-emerald-50/70 shadow-xs'
                        : 'border-slate-200 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-100 mb-1.5 border border-slate-200/70">
                      <img
                        src={preset.thumbnailUrl}
                        alt={preset.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-700">
                      {preset.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {preset.category}
                    </p>
                    {isSelected && (
                      <div className="absolute top-3 right-3 bg-emerald-600 text-white rounded-full p-0.5 shadow-sm">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="text-[11px] text-slate-500 bg-emerald-50/50 p-2.5 rounded-2xl border border-emerald-200/60 flex items-start gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Anda juga dapat mengunggah foto kiriman Anda atau berkas foto orientasi menggunakan tombol <strong>Unggah Foto</strong> di atas.
              </span>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowImagePicker(true)}
            className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs rounded-2xl border border-emerald-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <Upload className="w-4 h-4 text-emerald-700" />
            Tampilkan Pilihan Gambar Kampus
          </button>
        )
      )}

      {/* Full Image Preview Modal */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-5 shadow-2xl border border-emerald-100 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-emerald-600 uppercase">
                  {selectedPreset.category}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedPreset.title}
                </h3>
              </div>
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-square w-full rounded-2xl overflow-hidden border-2 border-emerald-200 bg-slate-100 shadow-inner">
              <img
                src={selectedPreset.imageUrl}
                alt={selectedPreset.title}
                className="w-full h-full object-cover"
              />
            </div>

            <button
              onClick={() => setIsPreviewModalOpen(false)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl cursor-pointer transition-colors"
            >
              Lanjutkan Menyusun Puzzle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

