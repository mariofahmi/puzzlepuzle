# Puzzle Puzzle - Game Kampus Ceria Mahasiswa Baru UNIROW 🧩🎓

Game puzzle gambar interaktif Mahasiswa Baru **Universitas PGRI Ronggolawe (UNIROW) Tuban**. Didesain dengan estetika modern kampus hijau, responsif, dan kaya fitur edukatif.

---

## 🌟 Fitur Utama Permainan

### 1. 🧭 Mode Petualangan Orientasi Kampus (5 Tahapan)
Jelajahi setiap sudut kampus UNIROW dari gerbang utama hingga lambang kebanggaan:
- **Tahap 1:** Gerbang & Fasad Rektorat UNIROW *(3×3 Tukar Keping - Pengenalan)*
- **Tahap 2:** Ruang Kuliah & Laboratorium Terpadu *(3×3 Geser Klasik - Fasilitas)*
- **Tahap 3:** Taman Hijau & Asri Kampus *(4×4 Tukar Keping - Suasana Kampus)*
- **Tahap 4:** Semangat Mahasiswa Baru *(4×4 Geser Klasik - Kehidupan Mahasiswa)*
- **Tahap 5:** Ksatria Ronggolawe & Lambang Resmi *(5×5 Master Slide - Puncak Tantangan)*
- Sistem **Bintang Prestasi (1-3 Bintang)** dan Trivia Kampus edukatif di setiap tahap!

### 2. 🎮 Mode Bebas (Sandbox Mode)
- Pilihan bebas 5 preset visual kampus UNIROW atau **Unggah Foto Mandiri** (upload foto orientasi sendiri).
- Pilihan mode: **Tukar Keping (Swap)** dengan drag-and-drop santai atau **Geser Klasik (Sliding Puzzle 15-Puzzle)** dengan algoritma solvabilitas 100%.
- Pilihan ukuran papan: 3×3 (Mudah), 4×4 (Standar), 5×5 (Master).

### 3. 🎵 Audio Synthesizer & BGM (Zero-Dependency)
- **Musik Latar (BGM) Ceria Prosedural**: Melodi pentatonis lembut marimba menggunakan Web Audio API tanpa perlu aset MP3 berat.
- Efek suara interaktif: geser keping, snap posisi tepat, petunjuk hint, level up fanfare, dan tepuk tangan kemenangan.
- Kontrol independen: tombol on/off Musik BGM dan tombol on/off Efek Suara.

### 4. 💡 Bantuan Pintar & Kontrol Fleksibel
- **Petunjuk Cerdas (Hint)**: Menyoroti keping yang belum pada posisinya dengan animasi pulse neon.
- **Jeda (Pause)**: Hentikan waktu permainan kapan saja dengan layar jeda yang rapi.
- **Intip Bayangan (Ghost Overlay)**: Tingkat transparansi gambar asli (Mati, Samar 25%, Jelas 55%).
- **Nomor Petunjuk**: Tampilkan/sembunyikan angka indeks pada setiap keping.
- **Dukungan Keyboard Penuh**: Tombol panah (↑, ↓, ←, →) atau W, A, S, D untuk menggeser keping pada mode Slide.

### 5. 📜 Sertifikat Kelulusan Orientasi Mahasiswa Baru
- Menghasilkan sertifikat penghargaan digital resmi ber-kop **Universitas PGRI Ronggolawe Tuban**.
- Mencantumkan nama pemain, prodi impian, predikat ketangkasan, skor akhir, stempel emas PMB, dan tanda tangan digital.
- Fitur **Cetak Langsung / Simpan ke PDF**.

### 6. 🏆 Papan Peringkat (Leaderboard) & Info Fakultas
- Hall of fame dengan podium Juara 1, 2, 3 beserta rekor waktu dan langkah.
- Profil 5 Fakultas dan seluruh program studi unggulan UNIROW Tuban:
  - Fakultas Keguruan & Ilmu Pendidikan (FKIP)
  - Fakultas Sains & Teknologi (FST)
  - Fakultas Ilmu Sosial & Ilmu Politik (FISIP)
  - Fakultas Ekonomi & Bisnis (FEB)
  - Fakultas Hukum (FH)
- Hotline pendaftaran PMB langsung via WhatsApp dan link portal kampus.

---

## 🚀 Cara Menjalankan Secara Lokal

**Prasyarat:** Node.js (v18+)

```bash
# 1. Masuk ke folder proyek
cd "d:/ANTY GRAVITY/PUZZLE"

# 2. Instalasi dependensi (jika belum)
npm install

# 3. Jalankan server lokal
npm run dev
```

Buka peramban (browser) di: **`http://localhost:3000`**

---

## 🛠️ Teknologi yang Digunakan
- **React 19** + **TypeScript**
- **Vite 8**
- **Tailwind CSS v4**
- **Lucide React** (Modern Icons)
- **Canvas Confetti** (Efek perayaan kemenangan)
- **Web Audio API** (Sintesis audio & musik ceria instan)
