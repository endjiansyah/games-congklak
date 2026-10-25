# Progress

## Status saat ini

Milestone 1 — gameplay playable

- [x] Menentukan pendekatan vanilla HTML/CSS/JavaScript.
- [x] Menentukan struktur folder proyek.
- [x] Menulis aturan kerja di `AGENTS.md`.
- [x] Menyiapkan dokumentasi acuan.
- [x] Menyiapkan halaman prototipe awal.
- [x] Membuat model data papan congklak.
- [x] Mengimplementasikan penyebaran biji searah jarum jam.
- [x] Menambahkan mode solo dan level kesulitan.
- [x] Menambahkan mode duel desktop/mobile.
- [x] Menambahkan visual low-poly ringan dan logo `endprojects`.

## Checkpoint

- `chore: initialize congklak project foundation` — fondasi vanilla, dokumentasi, dan halaman awal.
- `feat: add playable congklak game loop` — papan playable, AI solo, duel, capture, extra turn, dan rotasi mobile.
- `feat: polish low-poly board and duel POV` — indikator POV, tampilan biji, dan polish papan responsif.

## Audit animasi

- [x] Ring permainan memakai langkah mundur secara visual agar geraknya searah jarum jam.
- [x] Biji disebarkan satu per satu dengan jeda 260 ms.
- [x] Status giliran menampilkan nomor biji yang sedang dijatuhkan.

## Berikutnya

Lakukan pemeriksaan manual lintas ukuran layar dan penyempurnaan aturan varian congklak. Deploy tetap ditunda sampai diminta.
## Aturan lanjutan dan highlight

- [x] Jika biji terakhir jatuh di lubang berisi, isi lubang diambil dan permainan lanjut.
- [x] Slot yang sedang dilewati mendapat highlight/glow.
- [x] Lubang yang dapat dipilih mendapat hover glow.
- [x] Lumbung lawan tetap dilewati sebagai lumbung penyimpanan.
## Audio, speed, dan duel POV

- [x] Efek suara offline untuk jatuh, mengambil, klik, dan menang.
- [x] Kontrol kecepatan `0.5×`, `1×`, `2×`, `4×`, dan `Skip`.
- [x] Dua papan POV berdampingan pada duel desktop.
- [x] Split duel disembunyikan pada mobile; mobile memakai satu papan dan rotasi.
- [x] Efek visual kemenangan.
## Hasil, aturan, dan layout duel

- [x] Modal hasil dengan skor, statistik, akurasi heuristik, dan saran.
- [x] Tombol `Cara bermain` dengan aturan lengkap dalam modal.
- [x] Pilihan pemain pertama: Pemain 1, Pemain 2, atau Acak.
- [x] Duel desktop memakai dua papan atas-bawah dengan separator dan latar berbeda.
- [x] Tampilan split disembunyikan di mobile.
## Turn highlight duel

- [x] Papan aktif mendapat glow sesuai giliran.
- [x] Papan nonaktif diredupkan dan disabled.
- [x] Highlight jalur tidak tampil pada papan nonaktif.
## AI, bahasa, trivia, dan dekorasi

- [x] Papan nonaktif diredupkan ringan namun tetap menunjukkan glow jalur.
- [x] Lumbung yang menerima biji mendapat glow putih.
- [x] AI Sepuh memakai pencarian beberapa langkah.
- [x] Akurasi hasil memakai skala relatif terhadap opsi langkah yang tersedia.
- [x] Dropdown bahasa placeholder di kiri bawah.
- [x] Trivia Congklak dan dekorasi low-poly ringan ditambahkan.
- [x] Pergantian bahasa Indonesia/English diterapkan pada UI dan status dinamis.
- [x] Pilihan pemain pertama diterapkan pada Solo dan Duel.
- [x] Permainan baru membatalkan timer AI dan animasi ronde sebelumnya.
- [x] Tombol akhiri permainan muncul saat satu lumbung melewati mayoritas 50% biji.
- [x] AI Sepuh diberi handicap pembukaan ringan saat komputer mulai lebih dulu.
- [x] Logo EndProjects lokal dan kredit Endjiansyah ditambahkan.
- [x] Pembukaan AI Sepuh dipaksa memilih hasil lumbung paling kecil.
- [x] Tema coklat last boss untuk difficulty Sepuh.
- [x] Layout mobile dipusatkan pada papan dengan arahan landscape.
- [x] Tombol permintaan orientation lock ditambahkan dengan fallback instruksi manual.
- [x] Difficulty disembunyikan pada Duel.
- [x] Background Duel dipastikan kembali ke tema default.
- [x] Logo diganti ke `public/assets/logo.png` milik project Endjiansyah.
- [x] Tampilan utama dibersihkan dari copy pengantar dan footer teknis yang tidak penting.
- [x] Logo diperbesar tanpa background dan kredit Endjiansyah dibuat menonjol.
- [x] Status awal yang tidak berguna dikosongkan.
- [x] Kredit Endjiansyah dipindahkan ke footer bawah.
- [x] Logo EndProjects dapat diklik menuju portfolio.
- [x] Status Ready/placeholder awal dihapus.
- [x] Footer dan dropdown bahasa dipindahkan ke alur normal agar tidak menutupi konten.
