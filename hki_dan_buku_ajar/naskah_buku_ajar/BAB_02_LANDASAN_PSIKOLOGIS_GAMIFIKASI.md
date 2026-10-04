# BAB 2: LANDASAN PSIKOLOGIS DAN TEORI BELAJAR DALAM GAMIFIKASI

---

### CAPAIAN PEMBELAJARAN BAB (CPMK-1 Sub-CPMK 2)
Setelah mempelajari bab ini, mahasiswa dan pembaca diharapkan mampu:
1. Menguraikan pilar-pilar Teori Determinasi Diri (*Self-Determination Theory*) dan korelasinya dengan motivasi intrinsik dalam belajar.
2. Menganalisis kerangka kerja MDA (*Mechanics, Dynamics, Aesthetics*) sebagai fondasi rekayasa instruksional media interaktif.
3. Menghubungkan hierarki kognitif Taksonomi Bloom revisi dengan perancangan tantangan permainan edukasi.
4. Menerapkan pendekatan afektif *Value Clarification Technique (VCT)* dan Teori Dilema Moral Kohlberg ke dalam alur narasi gamifikasi pembelajaran nilai.

---

### A. TEORI DETERMINASI DIRI (SELF-DETERMINATION THEORY)
Kritik paling tajam terhadap gamifikasi yang dirancang secara dangkal (*bad gamifikasi / pointsification*) adalah ketergantungannya yang berlebihan pada imbalan ekstrinsik semata (hanya mengejar poin, stiker, atau hadiah fisik). Ketika hadiah dihentikan, motivasi peserta didik kerap kali langsung merosot drastis (*the overjustification effect*).

Untuk menciptakan gamifikasi yang berdampak jangka panjang, pengembang media wajib berpijak pada **Teori Determinasi Diri** (*Self-Determination Theory* / SDT) yang digagas oleh Edward L. Deci dan Richard M. Ryan (2000). SDT menyatakan bahwa manusia terdorong secara alami dari dalam dirinya (*intrinsic motivation*) apabila tiga kebutuhan psikologis dasarnya terpenuhi:

```text
               +-------------------------------------------------+
               |     TIGA PILAR TEORI DETERMINASI DIRI (SDT)    |
               +-------------------------------------------------+
                                      |
         +----------------------------+----------------------------+
         |                                                         |
         v                                                         v
   [ OTONOMI ]                  [ KOMPETENSI ]              [ KETERHUBUNGAN ]
  (Autonomy)                     (Competence)                 (Relatedness)
- Bebas memilih gambar        - Tantangan berjenjang       - Papan peringkat kelas
- Pilihan tingkat grid        - Indikator waktu & langkah  - Pengenalan budaya kampus
- Kebebasan acak ulang        - Umpan balik kemenangan     - Pembelajaran kolaboratif
```

1. **Otonomi (*Autonomy*)**: Perasaan memiliki kendali atas pilihannya sendiri. Dalam aplikasi *Puzzle Puzzle*, otonomi dihadirkan melalui kebebasan pemain memilih foto yang ingin diselesaikan, memilih tingkat kesulitan grid (3x3, 4x4, 5x5), serta menentukan kapan ingin mengacak ulang papan permainan.
2. **Kompetensi (*Competence*)**: Perasaan bertumbuh dan mampu menaklukkan tantangan yang relevan. Sistem permainan menghadirkan tantangan terukur yang tidak terlalu mudah (yang membosankan) dan tidak terlalu mustahil (yang membuat frustrasi), selaras dengan konsep *Flow Theory* dari Mihaly Csikszentmihalyi (1990).
3. **Keterhubungan (*Relatedness*)**: Kebutuhan untuk merasa terhubung dengan komunitas sosial yang lebih luas. Integrasi lambang institusi, sejarah gedung almamater, serta papan peringkat teman seangkatan menumbuhkan rasa kepemilikan (*sense of belonging*) terhadap lingkungan kampusnya.

---

### B. KERANGKA KERJA MDA (MECHANICS, DYNAMICS, AESTHETICS)
Dalam dunia rekayasa perangkat lunak permainan, kerangka kerja MDA (*Mechanics, Dynamics, Aesthetics*) yang dirumuskan oleh Hunicke, LeBlanc, dan Zubek (2004) merupakan metodologi dekonstruksi yang paling diakui:

```text
PERSPEKTIF PENGEMBANG (DESIGNER):
[MECHANICS] -----------> [DYNAMICS] -----------> [AESTHETICS]
 (Aturan & Kode)          (Perilaku Sistem)       (Emosi Pemain)
      ^                                                |
      |                                                v
PERSPEKTIF PENGGUNA (MAHASISWA):
[AESTHETICS] <----------- [DYNAMICS] <----------- [MECHANICS]
 (Kesenangan/Fokus)      (Tindakan Menggeser)     (Aturan Ubin Kosong)
```

1. **Mekanik (*Mechanics*)**: Komponen dasar, representasi data, dan aturan algoritma sistem. Contohnya: aturan pergeseran ubin ke slot kosong, penghitungan jumlah pergerakan (*moves*), dan deteksi koordinat kemenangan matriks $N \times N$.
2. **Dinamik (*Dynamics*)**: Perilaku sistem yang muncul saat pemain berinteraksi dengan mekanik secara langsung sepanjang waktu. Contohnya: ketegangan pemain saat melihat detik waktu berjalan cepat pada *timer*, atau strategi mengamankan baris pertama ubin terlebih dahulu.
3. **Estetika (*Aesthetics*)**: Respon emosional yang dialami oleh peserta didik saat memainkan media. Dalam konteks *Puzzle Puzzle UNIROW*, estetika yang dibidik adalah *Sense of Discovery* (menemukan kembali gambar kampus yang rapi) dan *Fellowship* (kebanggaan identitas kampus).

---

### C. PENYELARASAN DENGAN TAKSONOMI BLOOM
Gamifikasi edukasi yang efektif harus menstimulasi dimensi proses kognitif sesuai Taksonomi Bloom yang direvisi oleh Anderson & Krathwohl (2001):

| Tingkat Kognitif Bloom | Manifestasi dalam Media Pembelajaran Gamifikasi |
|---|---|
| **C1: Mengingat (*Remembering*)** | Mengingat letak posisi awal kepingan gambar atau simbol lambang institusi. |
| **C2: Memahami (*Understanding*)** | Memahami relasi spasial antara sudut, tepi, dan pusat gambar visual. |
| **C3: Menerapkan (*Applying*)** | Menerapkan algoritma perputaran ubin untuk memindahkan bidak ke posisi yang diinginkan secara efisien. |
| **C4: Menganalisis (*Analyzing*)** | Menganalisis posisi ubin yang memblokade jalur ubin lain pada grid kompleks 4x4 dan 5x5. |
| **C5: Mengevaluasi (*Evaluating*)** | Mengevaluasi efektivitas strategi langkah: apakah langkah mundur diperlukan demi membuka ruang kosong strategis? |
| **C6: Menciptakan (*Creating*)** | Menyusun kembali kekacauan matriks ubin yang teracak menjadi harmoni gambar utuh yang sempurna. |

---

### D. PENDEKATAN AFEKTIF: VALUE CLARIFICATION TECHNIQUE (VCT) & MORAL DILEMMA
Bagi rumpun mata kuliah sosial humaniora dan kewarganegaraan (PPKn/IPS), ranah kognitif harus berpadu dengan ranah afektif. Pendekatan **Value Clarification Technique (VCT)** yang dipelopori oleh Raths, Harmin, dan Simon (1966) bertujuan membantu peserta didik menyadari, menimbang, dan menentukan pilihan nilai hidupnya secara mandiri dan bertanggung jawab.

VCT memiliki tiga tahapan utama yang dapat dimodelkan secara sempurna ke dalam media gamifikasi (seperti dalam proyek *TTS VCT PPKn* dan *CivicQUEST*):
1. **Memilih (*Choosing*)**: Pemain dihadapkan pada persimpangan pilihan moral tanpa paksaan, menimbang konsekuensi alternatif.
2. **Menghargai (*Prizing*)**: Pemain merasa bangga dengan keputusannya yang berorientasi pada kebajikan publik (*civic virtue*).
3. **Bertindak (*Acting*)**: Pemain mengulangi tindakan berintegritas tersebut secara konsisten di sepanjang alur permainan.

Selaras dengan itu, **Teori Perkembangan Moral Lawrence Kohlberg** (1981) menunjukkan bahwa penalaran moral seseorang berkembang melalui dilema etika nyata. Media gamifikasi menyediakan simulasi laboratorium sosial yang aman (*safe social simulation*) di mana mahasiswa dapat belajar bahwa setiap keputusan hukum dan etika selalu memiliki implikasi bagi keadilan bersama.

---

### RANGKUMAN BAB 2
1. Motivasi belajar yang langgeng lahir dari pemenuhan tiga kebutuhan dasar psikologis Teori Determinasi Diri: Otonomi (*Autonomy*), Kompetensi (*Competence*), dan Keterhubungan (*Relatedness*).
2. Kerangka kerja MDA (*Mechanics, Dynamics, Aesthetics*) menuntut perancang media untuk menyusun kode dan aturan sistem (mekanik) yang memicu dinamika aksi pemain, guna melahirkan pengalaman emosional belajar yang bermakna (estetika).
3. Permainan puzzle gambar dan kuis interaktif menstimulasi spektrum Taksonomi Bloom dari mengingat letak visual (C1) hingga mengevaluasi dan merangkai kembali keutuhan gambar (C5–C6).
4. Integrasi pendekatan afektif VCT dan Dilema Moral Kohlberg menjadikan media gamifikasi bukan sekadar penguji hafalan, melainkan wahana penempaan karakter dan kecerdasan kewarganegaraan (*civic intelligence*).

---

### SOAL LATIHAN DAN EVALUASI KOGNITIF
1. **Analisis Konsep**: Mengapa penambahan fitur papan peringkat (*leaderboard*) tanpa diimbangi rasa kompetensi dan otonomi dapat berpotensi menurunkan motivasi intrinsik sebagian mahasiswa?
2. **Kajian Model MDA**: Uraikan komponen *Mechanics*, *Dynamics*, dan *Aesthetics* dari fitur *Timer* dan *Shuffle* pada aplikasi media puzzle!
3. **Penerapan Ranah Afektif**: Bagaimana langkah konkret seorang pendidik memanfaatkan hasil permainan simulasi dilema etika untuk memantik sesi refleksi kritis (*debriefing*) di akhir perkuliahan?

---

### TUGAS PROYEK INDIVIDUAL
> **Rancangan Matriks Pembelajaran Nilai:**
> Pilihlah salah satu topik nilai kewarganegaraan (misalnya: *Kejujuran Akademik*, *Ketaatan Hukum Lalu Lintas*, atau *Toleransi Keberagaman*). Susunlah matriks perancangan media pembelajaran yang memadukan:
> 1. Capaian Pembelajaran Afektif yang dituju;
> 2. Pilihan mekanik permainan yang sesuai;
> 3. Skenario umpan balik (*feedback loop*) yang diberikan sistem ketika mahasiswa membuat keputusan benar maupun keliru.
