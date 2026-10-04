# BAB 5: MEDIA PEMBELAJARAN VISUAL SPASIAL: BEDAH KASUS *PUZZLE PUZZLE*

---

### CAPAIAN PEMBELAJARAN BAB (CPMK-3 Sub-CPMK 1)
Setelah mempelajari bab ini, mahasiswa dan pembaca diharapkan mampu:
1. Memahami arsitektur teknis dan prinsip kerja aplikasi permainan puzzle gambar (*sliding picture puzzle*) berbasis web.
2. Menganalisis algoritma komputasi pemotongan citra kanvas (*HTML5 Canvas Slicing*) dan penjaminan konfigurasi matriks yang selalu dapat diselesaikan (*solvable sliding puzzle algorithm*).
3. Menguraikan implementasi mesin suara prosedural tanpa file eksternal berbasis *Web Audio API*.
4. Merancang skenario instruksional pemanfaatan *Puzzle Puzzle* dalam perkuliahan Pengenalan Kehidupan Kampus Mahasiswa Baru (PKKMB) atau pelatihan spasial kognitif.

---

### A. LATAR BELAKANG DAN TUJUAN INSTRUKSIONAL KARYA
Masa transisi dari bangku sekolah menengah menuju perguruan tinggi kerap kali diwarnai oleh gegar budaya (*academic culture shock*). Mahasiswa baru dihadapkan pada lingkungan kampus yang luas, struktur kelembagaan yang kompleks, serta atmosfer akademik yang menuntut kemandirian. Pengenalan lambang institusi, tata letak gedung rektorat, fakultas, laboratorium, serta fasilitas perpustakaan secara konvensional sering kali disajikan melalui presentasi salindia teks panjang yang pasif dan cepat terlupakan.

Aplikasi **Puzzle Puzzle: Game Kampus Ceria** (*URL: https://mariofahmi.github.io/puzzlepuzle/*) diciptakan untuk mentransformasikan masa orientasi tersebut menjadi petualangan visual spasial yang menyenangkan (*spatially engaging orientation*). Melalui permainan ini, mahasiswa baru tidak hanya diajak mengenali landmark fisik dan logo kebanggaan kampus UNIROW Tuban, namun secara simultan melatih:
1. **Persepsi Spasial**: Kemampuan mental memproyeksikan hubungan letak koordinat antar-kepingan gambar.
2. **Keterampilan Problem Solving**: Menyusun strategi langkah terarah guna memindahkan kepingan ubin menuju konfigurasi akhir yang tepat.
3. **Regulasi Emosi & Ketahanan Mental**: Menjaga ketenangan dan konsentrasi ketika waktu berjalan cepat dan langkah gerak terus terhitung.

---

### B. REKAYASA TEKNIS: ALGORITMA PEMOTONGAN KANVAS CITRA
Salah satu tantangan teknis dalam pengembangan puzzle gambar digital adalah bagaimana memotong sebuah gambar utuh menjadi $N \times N$ kepingan ubin tanpa mengalami penurunan resolusi atau distorsi rasio aspek.

Aplikasi *Puzzle Puzzle* memanfaatkan teknologi *HTML5 2D Canvas Context*. Secara matematis, proses pemotongan dan rendering ubin ubin ke-$i$ dihitung dengan rumus koordinat:

$$\text{row} = \lfloor i / N \rfloor, \quad \text{col} = i \pmod N$$

$$\text{sourceX} = \text{col} \times \left(\frac{W_{\text{asli}}}{N}\right), \quad \text{sourceY} = \text{row} \times \left(\frac{H_{\text{asli}}}{N}\right)$$

```typescript
// Cuplikan Logika Pemotongan Citra Kanvas pada PuzzleBoard
const drawTile = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, tileIndex: number, gridDim: number, tileSize: number) => {
  const origRow = Math.floor(tileIndex / gridDim);
  const origCol = tileIndex % gridDim;
  const srcTileW = img.naturalWidth / gridDim;
  const srcTileH = img.naturalHeight / gridDim;

  ctx.drawImage(
    img,
    origCol * srcTileW, origRow * srcTileH, srcTileW, srcTileH, // Koordinat asal gambar
    0, 0, tileSize, tileSize                                     // Koordinat tujuan di kanvas ubin
  );
};
```

Pendekatan ini menjamin bahwa aset gambar vektor SVG (seperti Gedung Rektorat UNIROW) maupun citra raster resolusi tinggi (seperti Logo Resmi MF) dapat dirender secara tajam pada layar *Retina Display* maupun perangkat beresolusi rendah tanpa membebani kapasitas RAM browser.

---

### C. MATEMATIKA PENGACAKAN: MENJAMIN PUZZLE SELALU DAPAT DISELESAIKAN (*SOLVABILITY*)
Dalam teori matematika kombinatorika, sebuah permainan *sliding puzzle* $N \times N$ yang diacak secara acak total memiliki probabilitas 50% **mustahil diselesaikan** (*unsolvable configuration*). Hal ini ditentukan oleh **Jumlah Inversi (*Inversion Count*)** dari urutan ubin.

Apabila sebuah sistem pembelajaran menyajikan puzzle yang mustahil diselesaikan, mahasiswa akan mengalami frustrasi kognitif ekstrem dan kehilangan kepercayaan terhadap sistem pembelajaran. Oleh karena itu, *Puzzle Puzzle* menerapkan algoritma pengacakan berbasis **Simulasi Langkah Acak Terbalik (*Reverse Valid Moves Shuffle*)**:

```text
[Kondisi Awal: Matriks Terselesaikan Sempurna (Solved Board)]
                          |
                          v
         [Looping Pengacakan sebanyak K langkah]
                          |
                          +--> Deteksi Ubin Tetangga dari Ruang Kosong
                          |    (Hanya tetangga valid: Atas, Bawah, Kiri, Kanan)
                          |
                          +--> Pilih 1 Tetangga secara Acak (Math.random)
                          |
                          +--> Lakukan Pertukaran Posisi (Swap Tile)
                          |
                          v
    [Hasil Akhir: Matriks Teracak 100% Dijamin Selalu Solvabel!]
```

Dengan memulai dari kondisi selesai lalu melakukan $K$ kali pergeseran acak yang sah, sistem menjamin $100\%$ bahwa selalu ada jalan mundur (*reverse path*) bagi pemain untuk mencapai konfigurasi kemenangan kembali.

---

### D. MESIN SUARA PROSEDURAL BERBASIS WEB AUDIO API
Umpan balik audio (*auditory feedback*) memiliki kontribusi krusial dalam memperkuat keterlibatan psikologis pemain (*sensory immersion*). Alih-alih memuat berkas suara eksternal format `.mp3` atau `.wav` yang lambat dimuat dan boros kuota, *Puzzle Puzzle* mengimplementasikan **Synthesizer Prosedural** menggunakan *Web Audio API* bawaan peramban:

```typescript
// Implementasi Efek Suara Prosedural Berbasis OscillatorNode
class SoundSynthesizer {
  private ctx: AudioContext;

  playSlideTone() {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    // Nada geser lembut (Frekuensi meluncur dari 320 Hz ke 440 Hz)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.08);

    // Fade out amplitudo seketika agar tidak terdengar letupan (popping)
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }
}
```

Keuntungan pendekatan ini:
1. **Latensi Nol (*Zero Latency*)**: Suara berbunyi tepat pada milidetik sentuhan jari pengguna.
2. **Nir-Beban Bandwidth (*Zero Bandwidth Consumption*)**: Kode synthesizer hanya berukuran beberapa baris teks JavaScript murni.
3. **Dinamika Akord**: Akord kemenangan (*victory fanfare*) dirangkai secara algoritmik dari nada C mayor (C5, E5, G5, C6) yang memberikan rasa kepuasan kognitif mendalam saat gambar tersusun rapi.

---

### E. SKENARIO IMPLEMENTASI PEMBELAJARAN DI KELAS KAMPUS
Berikut adalah model sintaks 3 fase implementasi *Puzzle Puzzle* dalam perkuliahan atau masa orientasi mahasiswa baru:

```text
[FASE 1: PRA-PERMAINAN / ORIENTASI (10 Menit)]
- Dosen/Fasilitator membagikan tautan web ke grup kelas.
- Mahasiswa membuka gawai masing-masing dan memasukkan nama lengkap.
- Pengenalan sekilas mengenai sejarah lambang kebanggaan dan nilai institusi.

[FASE 2: INTI PERMAINAN & KOMPETISI (25 Menit)]
- Mahasiswa memilih tingkat kesulitan (dimulai dari grid 3x3 menuju 4x4).
- Mahasiswa berlomba menyusun gambar secara taktis dengan waktu tercepat.
- Papan peringkat real-time memicu atmosfer kompetisi yang sehat dan antusias.

[FASE 3: REFLEKSI KOGNITIF & DEBRIEFING (15 Menit)]
- Peninjauan kembali gambar utuh: Apa makna filosofis warna marun dan emas pada logo?
- Refleksi strategi: Mengapa mahasiswa yang mengamankan baris pertama terlebih dahulu
  mampu menyelesaikan puzzle dengan jumlah langkah 40% lebih efisien?
- Penghargaan verbal bagi mahasiswa pencatat waktu terbaik.
```

---

### RANGKUMAN BAB 5
1. *Puzzle Puzzle* merupakan media gamifikasi visual spasial nir-instalasi yang dirancang khusus untuk memadukan pengenalan identitas institusi kampus dengan stimulasi persepsi spasial mahasiswa.
2. Pemanfaatan *HTML5 2D Canvas* memungkinkan pemotongan citra SVG dan raster resolusi tinggi secara presisi tanpa penurunan ketajaman grafis.
3. Algoritma pengacakan berbasis langkah terbalik (*reverse valid moves*) secara matematis menjamin bahwa setiap konfigurasi papan permainan $100\%$ dapat diselesaikan (*solvable*).
4. Pemanfaatan *Web Audio API* menghasilkan umpan balik suara prosedural tanpa jeda latensi dan tanpa beban kuota internet eksternal.
5. Penerapan sintaks pembelajaran 3 fase (Pra, Inti, dan Refleksi/Debriefing) mengunci keberhasilan media menjadi pengalaman belajar nilai yang bermakna.

---

### SOAL LATIHAN & TUGAS PRAKTIKUM
1. **Analisis Algoritma**: Mengapa pengacakan posisi ubin secara acak buta (*pure random swap*) dapat mengakibatkan konfigurasi papan permainan tidak dapat diselesaikan? Jelaskan konsep *Inversion Count* dalam sliding puzzle!
2. **Evaluasi Desain UX**: Menurut Anda, mengapa keberadaan fitur *Pratinjau Gambar Lengkap (Hint)* penting dalam menjaga *Flow State* pemain agar tidak menyerah di tengah jalan?
3. **Praktikum Instruksional**: Susunlah rubrik penilaian autentik yang mengukur tiga aspek: kecepatan waktu (*time efficiency*), ketepatan langkah (*move optimization*), dan pemahaman makna filosofis gambar kampus!
