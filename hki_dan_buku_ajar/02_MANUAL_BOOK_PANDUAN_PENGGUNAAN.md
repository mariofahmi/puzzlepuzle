# BUKU PETUNJUK PENGGUNAAN (MANUAL BOOK)
# PROGRAM KOMPUTER: PUZZLE PUZZLE
### Game Kampus Ceria Interaktif Universitas PGRI Ronggolawe (UNIROW) Tuban

---

**Penyusun / Perancang:** Mario Fahmi Syahrial  
**Afiliasi:** Program Studi PPKn, FKIP, Universitas PGRI Ronggolawe Tuban  
**Versi Dokumen:** 1.0 (Oktober 2026)  
**Kategori Ciptaan:** Program Komputer (Software Media Pembelajaran Interaktif)

---

## DAFTAR ISI
1. [Deskripsi Umum Sistem](#1-deskripsi-umum-sistem)
2. [Kebutuhan Perangkat Keras dan Perangkat Lunak](#2-kebutuhan-perangkat-keras-dan-perangkat-lunak)
3. [Alamat Akses dan Prosedur Peluncuran](#3-alamat-akses-dan-prosedur-peluncuran)
4. [Panduan Antarmuka Pengguna (User Interface)](#4-panduan-antarmuka-pengguna-user-interface)
5. [Langkah Operasional Permainan](#5-langkah-operasional-permainan)
6. [Fitur-Fitur Unggulan](#6-fitur-fitur-unggulan)
7. [Penanganan Masalah (Troubleshooting)](#7-penanganan-masalah-troubleshooting)

---

## 1. DESKRIPSI UMUM SISTEM
*Puzzle Puzzle* adalah program aplikasi permainan puzzle gambar ceria interaktif berbasis web. Aplikasi ini dirancang untuk melatih kemampuan spasial, konsentrasi, dan daya ingat visual mahasiswa melalui penyusunan kepingan gambar yang teracak menjadi satu kesatuan gambar kampus yang utuh dan rapi.

Aplikasi dilengkapi dengan sistem pemotongan gambar berbasis kanvas komputasional, efek suara prosedural *Web Audio Synthesizer*, pengatur tingkat kesulitan ubin (Mudah 3x3, Sedang 4x4, Tantangan 5x5), serta pencatatan skor pada Papan Peringkat (Leaderboard).

---

## 2. KEBUTUHAN PERANGKAT KERAS DAN PERANGKAT LUNAK

### A. Kebutuhan Perangkat Keras (Hardware Minimal):
- **Perangkat**: Komputer PC, Laptop, Tablet, atau Smartphone Android/iOS.
- **Prosesor**: Dual Core 1.5 GHz atau lebih tinggi.
- **RAM**: Minimal 2 GB (Rekomendasi 4 GB untuk pengalaman visual mulus).
- **Resolusi Layar**: Minimal 360 x 640 piksel (Responsive Web Design adaptif hingga monitor 4K).
- **Keluaran Audio**: Speaker perangkat atau earphone untuk menikmati Web Audio Synthesizer.

### B. Kebutuhan Perangkat Lunak (Software):
- **Sistem Operasi**: Windows 10/11, macOS, Linux, Android 9+, atau iOS 13+.
- **Peramban Web (Browser)**:
  - Google Chrome versi 100+
  - Mozilla Firefox versi 100+
  - Microsoft Edge versi 100+
  - Safari versi 15+

---

## 3. ALAMAT AKSES DAN PROSEDUR PELUNCURAN
Aplikasi tidak memerlukan instalasi perangkat lunak tambahan (Zero-Installation Web App). 
Pengguna dapat langsung menjalankan program dengan langkah:
1. Hubungkan perangkat dengan jaringan internet.
2. Buka peramban web pilihan Anda.
3. Kunjungi URL resmi aplikasi:
   👉 **`https://mariofahmi.github.io/puzzlepuzle/`**
4. Aplikasi akan langsung dimuat dalam hitungan detik dan siap dimainkan.

---

## 4. PANDUAN ANTARMUKA PENGGUNA (USER INTERFACE)

Antarmuka *Puzzle Puzzle* dirancang dengan gaya visual institusional modern (*emerald green-campus*):

1. **Header / Bilah Navigasi Atas**:
   - **Logo Institusi & Judul**: Menampilkan lambang resmi kebanggaan dan nama perancang (*Mario Fahmi Syahrial*).
   - **Tombol Mode Audio**: Ikon kontrol BGM (Musik Latar) dan SFX (Efek Suara Geser/Klik).
   - **Menu Cepat**: Akses langsung ke Game, Papan Peringkat (Leaderboard), dan Petunjuk Permainan.

2. **Panel Status Pemain & Statistik**:
   - **Penghitung Waktu (Timer)**: Menghitung durasi permainan secara *real-time* hingga presisi detik.
   - **Penghitung Langkah (Moves Counter)**: Menghitung total pergeseran kepingan puzzle yang dilakukan.
   - **Kartu Identitas Pemain**: Menampilkan nama pemain aktif.

3. **Area Papan Permainan (Puzzle Board)**:
   - Menampilkan matriks grid ubin bergambar.
   - Ubin dapat diklik atau digeser menuju posisi ubin kosong (*sliding puzzle mechanics*).

4. **Panel Kontrol Samping (Control Panel)**:
   - **Tombol Acak Ulang (Shuffle)**: Mengacak ulang posisi kepingan puzzle.
   - **Pratinjau Gambar Lengkap (Hint/Preview)**: Menampilkan gambar referensi utuh saat pemain membutuhkan bantuan.
   - **Pemilih Tingkat Kesulitan**:
     - *Mudah*: Matriks 3 x 3 (8 keping ubin + 1 kosong)
     - *Sedang*: Matriks 4 x 4 (15 keping ubin + 1 kosong)
     - *Tantangan*: Matriks 5 x 5 (24 keping ubin + 1 kosong)
   - **Pemilih Gambar / Tema**: Pilihan tema Gedung Kampus, Lambang/Logo Resmi, Aktivitas Mahasiswa, dll.

---

## 5. LANGKAH OPERASIONAL PERMAINAN

1. **Memulai Permainan**:
   - Buka halaman aplikasi. Masukkan nama Anda pada kotak profil pemain.
   - Pilih tema gambar yang ingin diselesaikan pada galeri preset.
   - Pilih dimensi grid ubin (3x3 untuk pemula, 4x4 untuk standar).

2. **Menggeser Kepingan**:
   - Klik atau sentuh ubin yang bersebelahan langsung (atas, bawah, kiri, atau kanan) dengan slot kosong.
   - Kepingan akan meluncur ke posisi kosong diiringi efek suara klik interaktif.
   - Rangkai kembali gambar hingga membentuk gambar utuh sesuai pratinjau.

3. **Menyelesaikan Puzzle & Layar Kemenangan**:
   - Ketika seluruh ubin telah berada pada koordinat yang tepat, sistem mendeteksi kondisi menang secara instan.
   - Muncul jendela *Victory Modal* yang menampilkan:
     - Waktu akhir penyelesaian
     - Total pergerakan langkah
     - Skor peringkat dan bintang performa
   - Skor otomatis tersimpan ke dalam papan peringkat lokal.

---

## 6. FITUR-FITUR UNGGULAN
- **Zero Latency Audio**: Sintesis suara menggunakan Web Audio API tanpa perlu buffering file audio eksternal.
- **Matriks Acak Selalu Solvabel**: Algoritma pengacakan menjamin konfigurasi puzzle selalu dapat diselesaikan (*solvable sliding puzzle algorithm*).
- **Responsive Layout**: Tampilan menyesuaikan secara proporsional di layar gawai kecil (smartphone) maupun layar proyektor ruang kelas.

---

## 7. PENANGANAN MASALAH (TROUBLESHOOTING)

| Gejala | Kemungkinan Penyebab | Tindakan Solusi |
|---|---|---|
| Suara tidak terdengar | Kebijakan *Auto-Play Audio* di peramban membisukan suara | Klik salah satu tombol di layar terlebih dahulu, atau pastikan ikon suara di bilah atas tidak dalam mode *Mute*. |
| Gambar puzzle tampak buram | Koneksi internet lambat saat pertama kali memuat aset | Muat ulang halaman (*Ctrl + F5*) untuk memastikan seluruh aset kanvas termuat sempurna. |
| Ubin tidak bisa digeser | Ubin yang diklik tidak bersebelahan dengan ubin kosong | Geser hanya ubin yang berada tepat di samping ruang kosong (atas, bawah, kanan, kiri). |

---

*Manual book ini disusun sebagai lampiran resmi permohonan pencatatan Hak Cipta Program Komputer pada Direktorat Jenderal Kekayaan Intelektual, Kementerian Hukum dan HAM RI.*
