import React from 'react';
import { X, HelpCircle, ArrowRightLeft, Move, Hash, Eye, Trophy, Compass, Lightbulb, Music } from 'lucide-react';
import { soundFx } from '../utils/sound';
import logoUrl from '../assets/logo.png';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-emerald-200 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Panduan Lengkap Game Puzzle Mahasiswa Baru UNIROW
              </h3>
              <p className="text-xs text-slate-500">
                Universitas PGRI Ronggolawe Tuban - Kampus Ceria Berdaya Saing
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {/* Mode Petualangan */}
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
            <h4 className="font-extrabold text-emerald-950 flex items-center gap-2 text-sm sm:text-base mb-1.5">
              <Compass className="w-4 h-4 text-emerald-700" />
              1. Mode Petualangan Orientasi Kampus (5 Tahapan)
            </h4>
            <p className="text-slate-600 mb-2">
              Susuri keindahan dan sejarah kampus UNIROW Tuban level demi level:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>Tahap 1:</strong> Gerbang & Fasad Rektorat UNIROW (3×3 Tukar)</li>
              <li><strong>Tahap 2:</strong> Ruang Kuliah & Laboratorium Sains (3×3 Geser)</li>
              <li><strong>Tahap 3:</strong> Taman Hijau & Asri Kampus (4×4 Tukar)</li>
              <li><strong>Tahap 4:</strong> Semangat Mahasiswa Baru (4×4 Geser)</li>
              <li><strong>Tahap 5:</strong> Ksatria Ronggolawe & Lambang Resmi (5×5 Master)</li>
              <li>Kumpulkan hingga <strong>3 Bintang</strong> per tahap untuk performa waktu tercepat!</li>
            </ul>
          </div>

          {/* Gameplay Mechanics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-white rounded-2xl border border-emerald-200 shadow-2xs">
              <h5 className="font-bold text-emerald-950 flex items-center gap-1.5 mb-1">
                <ArrowRightLeft className="w-4 h-4 text-emerald-600" />
                Mode Tukar (Swap)
              </h5>
              <p className="text-slate-600 text-xs">
                Klik keping pertama, lalu klik keping kedua untuk menukarnya. Atau seret langsung keping (drag-and-drop) ke posisi sasaran!
              </p>
            </div>

            <div className="p-3.5 bg-white rounded-2xl border border-emerald-200 shadow-2xs">
              <h5 className="font-bold text-emerald-950 flex items-center gap-1.5 mb-1">
                <Move className="w-4 h-4 text-emerald-600" />
                Mode Geser (Slide)
              </h5>
              <p className="text-slate-600 text-xs">
                Geser keping ke kotak kosong menggunakan klik mouse atau <strong>tombol panah / W,A,S,D keyboard</strong>.
              </p>
            </div>
          </div>

          {/* Tools & Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-white rounded-2xl border border-emerald-200 shadow-2xs">
              <span className="font-bold text-emerald-900 block mb-1 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 fill-amber-300" /> Bantuan Pintar (Hint)
              </span>
              <p className="text-[11px] text-slate-500">
                Gunakan tombol petunjuk untuk menyorot keping yang harus dipindahkan selanjutnya.
              </p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-emerald-200 shadow-2xs">
              <span className="font-bold text-emerald-900 block mb-1 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-emerald-600" /> Audio & BGM
              </span>
              <p className="text-[11px] text-slate-500">
                Nikmati musik latar ceria sintetis tanpa kuota unduhan dengan tombol Musik di bilah navigasi.
              </p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-emerald-200 shadow-2xs">
              <span className="font-bold text-emerald-900 block mb-1 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-600" /> Papan Peringkat
              </span>
              <p className="text-[11px] text-slate-500">
                Selesaikan puzzle secepat dan setepat mungkin untuk mencetak skor tertinggi di peringkat!
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl transition-colors cursor-pointer shadow-xs"
        >
          Siap Bermain, Mulai Petualangan!
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
          <img src={logoUrl} alt="Logo" className="w-4 h-4 object-contain" />
          <span>Perancang: <strong className="text-emerald-900 font-bold">Mario Fahmi Syahrial</strong></span>
        </div>
      </div>
    </div>
  );
};

