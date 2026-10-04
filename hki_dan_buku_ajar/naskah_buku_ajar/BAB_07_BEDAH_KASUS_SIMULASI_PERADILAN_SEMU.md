# BAB 7: MEDIA PEMBELAJARAN SIMULASI HUKUM: BEDAH KASUS *PERADILAN SEMU*

---

### CAPAIAN PEMBELAJARAN BAB (CPMK-3 Sub-CPMK 3)
Setelah mempelajari bab ini, mahasiswa dan pembaca diharapkan mampu:
1. Memahami urgensi metode simulasi peradilan semu (*moot court simulation*) dalam meningkatkan kemahiran hukum dan literasi peradilan mahasiswa.
2. Menganalisis arsitektur sistem perangkat lunak *Simulasi Peradilan Semu PPKn* yang mencakup 4 kasus persidangan nyata dan modul evaluasi 50 butir soal.
3. Menguraikan penjenjangan peran-peran peradilan (Majelis Hakim, Jaksa Penuntut Umum, Penasihat Hukum, Terdakwa, dan Saksi Ahli) dalam alur hukum acara pidana/perdata.
4. Merancang skenario pembelajaran praktik peradilan berbasis web di laboratorium hukum/PPKn untuk melatih keterampilan argumentasi yuridis mahasiswa.

---

### A. URGENSI METODE SIMULASI PERADILAN SEMU (*MOOT COURT*) DALAM PENDIDIKAN HUKUM
Mata kuliah Hukum Pidana, Hukum Perdata, dan Hukum Acara pada Program Studi Pendidikan Pancasila dan Kewarganegaraan (PPKn) sering kali menghadapi tantangan kesenjangan antara teori hukum di buku teks (*law in books*) dengan praktik penegakan hukum di pengadilan (*law in action*). Mahasiswa mungkin hafal bunyi pasal-pasal dalam Kitab Undang-Undang Hukum Pidana (KUHP) atau KUHAP, namun gagap ketika diminta memahami bagaimana sebuah surat dakwaan dibacakan, bagaimana eksepsi diajukan, atau bagaimana hakim memutus vonis berdasarkan alat-alat bukti yang sah (Marzuki, 2017).

Secara tradisional, praktik peradilan semu (*moot court*) membutuhkan ruang laboratorium fisik berbiaya tinggi yang menyerupai ruang sidang pengadilan negeri, lengkap dengan jubah toga hakim, palu sidang, dan pembagian naskah berkas perkara tebal. Bagi banyak perguruan tinggi dengan fasilitas fisik terbatas, pelaksanaan peradilan semu konvensional kerap kali terkendala waktu, ruang, dan kompleksitas logistik.

Aplikasi **Simulasi Peradilan Semu PPKn** (*URL: https://mariofahmi.github.io/Simulasi-Peradilan-Semu-PPKn-/*) dikembangkan sebagai solusi digital inovatif. Aplikasi ini mentransformasikan seluruh tata kelola persidangan, berkas perkara, dan naskah pembuktian menjadi platform web interaktif yang dapat diakses dari mana saja. Media ini memungkinkan mahasiswa mempraktikkan proses peradilan secara virtual sebelum atau berdampingan dengan praktik langsung di ruang sidang.

---

### B. EMPAT KASUS PERSIDANGAN KONTEKSTUAL
Aplikasi ini menyajikan **4 kasus perkara hukum nyata** yang mewakili spektrum dinamika hukum di Indonesia:

```text
+---------------------------------------------------------------------------------+
|                   EMPAT KASUS UTAMA DALAM APLIKASI PERADILAN SEMU               |
+---------------------------------------------------------------------------------+
                                         |
     +-----------------+-----------------+-----------------+-----------------+
     |                 |                 |                 |                 |
     v                 v                 v                 v                 v
[ KASUS 1: TIPIKOR ] [ KASUS 2: KDRT ] [ KASUS 3: UU ITE ] [ KASUS 4: AGRARIA]
- Suap & Gratifikasi - Kekerasan Psikis - Pencemaran Nama  - Sengketa Hak Milik
  Proyek Pengadaan     & Fisik Rumah     Baik & Ujaran       vs Sertifikat
  Barang/Jasa Desa     Tangga (UU 23/04) Kebencian Digital   Ganda Pertanahan
```

1. **Kasus 1: Tindak Pidana Korupsi (Tipikor)**:
   Perkara penyalahgunaan wewenang dan gratifikasi dana desa dalam proyek pembangunan infrastruktur publik. Kasus ini melatih mahasiswa meneliti pembuktian aliran dana, audit kerugian negara, dan asas kepatutan penyelenggara negara.
2. **Kasus 2: Kekerasan Dalam Rumah Tangga (KDRT)**:
   Perkara pidana khusus berbasis UU No. 23 Tahun 2004. Melatih kepekaan mahasiswa terhadap perlindungan korban rentan, pembuktian visum et repertum, dan keterangan saksi psikolog.
3. **Kasus 3: Tindak Pidana Siber & Pencemaran Nama Baik (UU ITE)**:
   Perkara distribusi informasi elektronik yang memuat konten fitnah dan ujaran kebencian di media sosial. Melatih analisis forensik digital, jejak tangkapan layar, dan batasan kebebasan berpendapat konstitusional.
4. **Kasus 4: Sengketa Tanah & Hukum Agraria**:
   Perkara perdata sengketa kepemilikan tanah adat melawan sertifikat korporasi swasta. Melatih pembuktian hierarki hak atas tanah berdasarkan UUPA No. 5 Tahun 1960.

---

### C. STRUKTUR PERAN DAN TAHAPAN HUKUM ACARA PERSIDANGAN
Di dalam aplikasi, mahasiswa dapat mengeksplorasi tata urutan persidangan pidana sesuai dengan Undang-Undang No. 8 Tahun 1981 (KUHAP):

```text
[ TAHAP 1: PEMBUKAAN SIDANG ]
Majelis Hakim membuka sidang, menyatakan sidang terbuka untuk umum, dan memeriksa identitas Terdakwa.
                         |
                         v
[ TAHAP 2: PEMBACAAN SURAT DAKWAAN ]
Jaksa Penuntut Umum (JPU) membacakan pasal-pasal yang didakwakan kepada Terdakwa.
                         |
                         v
[ TAHAP 3: EKSEPSI / KEBERATAN ]
Penasihat Hukum mengajukan nota keberatan formal terhadap kompetensi pengadilan atau dakwaan kabur.
                         |
                         v
[ TAHAP 4: PEMBUKTIAN & SAKSI AHLI ]
Pemeriksaan alat-alat bukti surat, saksi mahkota, saksi ahli, dan barang bukti forensik.
                         |
                         v
[ TAHAP 5: TUNTUTAN (REQUISITOIR) & PLEDOI ]
JPU menuntut hukuman pidana, dilanjutkan nota pembelaan komprehensif dari Penasihat Hukum.
                         |
                         v
[ TAHAP 6: PUTUSAN MAJELIS HAKIM (VONIS) ]
Hakim mengetukkan palu sidang membacakan amar putusan berdasarkan keyakinan dan minimal 2 alat bukti sah.
```

Pada setiap tahap persidangan, sistem menyajikan dialog interaktif, kutipan undang-undang yang relevan, serta opsi pilihan argumen hukum yang menguji ketajaman logika peserta didik.

---

### D. MODUL ASESMEN KOMPREHENSIF: UJIAN 50 BUTIR SOAL HUKUM
Selain modul simulasi naratif, aplikasi dilengkapi dengan modul asesmen terintegrasi berisi **50 butir soal uji kompetensi kemahiran hukum**.

Karakteristik modul ujian:
1. **Representasi Taksonomi Bloom Tingkat Tinggi (C3–C5)**:
   Soal tidak menanyakan hafalan nomor pasal, melainkan berbentuk analisis kasus (*case study questions*), misalnya: menentukan jenis alat bukti yang paling sah untuk membantah alibi terdakwa korupsi.
2. **Analisis Jawaban dan Pembahasan Otomatis**:
   Setelah menyelesaikan ujian, mahasiswa langsung menerima kartu laporan (*scorecard*) yang merinci:
   - Nilai akhir persentase akurasi;
   - Kecepatan rata-rata menjawab per soal;
   - Analisis kekuatan dan kelemahan pemahaman hukum per kategori (Hukum Acara, Hukum Pembuktian, Etika Profesi Hukum).

---

### E. MODEL SINTAKS PERKULIAHAN "BLENDED MOOT COURT"
Penerapan *Simulasi Peradilan Semu PPKn* paling optimal dijalankan dengan model *blended learning*:

1. **Fase Asinkronus Mandiri (Pra-Sidang)**:
   Mahasiswa secara mandiri mempelajari kasus yang ditugaskan melalui portal web, membaca berkas perkara digital, dan menyelesaikan kuis pemahaman 50 butir soal.
2. **Fase Sinkronus Terbimbing (Simulasi Kelas)**:
   Di laboratorium kelas, mahasiswa dibagi ke dalam kelompok peran (Majelis Hakim, JPU, Advokat, Saksi). Menggunakan panduan digital aplikasi sebagai kompas alur, mahasiswa mempraktikkan orasi hukum, tanya-jawab silang (*cross-examination*), dan pengetukan palu sidang secara khidmat.
3. **Fase Debriefing & Penilaian Otentik**:
   Dosen bersama mahasiswa menganalisis putusan vonis: apakah pertimbangan hukum (*ratio decidendi*) majelis hakim telah mencerminkan keadilan substansial atau sekadar kepatuhan formalitas belaka?

---

### RANGKUMAN BAB 7
1. Media *Simulasi Peradilan Semu PPKn* menjembatani kesenjangan antara teori hukum tekstual dengan praktik hukum acara peradilan nyata secara terjangkau dan fleksibel.
2. Keberadaan 4 kasus nyata (Tipikor, KDRT, UU ITE, dan Sengketa Tanah) membekali mahasiswa dengan pemahaman multidimensi atas spektrum hukum pidana dan perdata di Indonesia.
3. Alur persidangan virtual yang taat asas KUHAP melatih penalaran prosedural dan etika profesi penegak hukum (Hakim, Jaksa, dan Advokat).
4. Modul evaluasi 50 butir soal studi kasus memberikan dasar pengukuran capaian pembelajaran yang akuntabel dan berbasis data (*data-driven assessment*).

---

### SOAL LATIHAN & EVALUASI KOGNITIF
1. **Analisis Hukum Acara**: Jelaskan perbedaan mendasar antara eksepsi formil (misal: *ne bis in idem* atau kadaluwarsa) dengan pembelaan materiil (*pledoi*) dalam tahapan persidangan pidana!
2. **Kajian Pembuktian**: Dalam perkara tindak pidana siber (UU ITE), mengapa bukti tangkapan layar digital (*screenshot*) memerlukan pengesahan forensik digital (*digital chain of custody*) agar diakui sebagai alat bukti yang sah menurut hukum acara?
3. **Simulasi Peran**: Pilihlah salah satu dari 4 kasus di aplikasi. Tuliskan naskah nota pembelaan (*pledoi*) singkat sebanyak 2 halaman dari sudut pandang Penasihat Hukum yang mengedepankan asas praduga tak bersalah (*presumption of innocence*)!
