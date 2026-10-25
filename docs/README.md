# Congklak Web Game

Game congklak offline bertema Nusantara dengan gaya low-poly 3D, dibuat tanpa framework.

## Menjalankan

Untuk prototipe statis, buka `projects/congklak/index.html` di browser. Jika browser membatasi fitur tertentu saat memakai `file://`, jalankan server statis sederhana dari root repository, misalnya:

```bash
python -m http.server
```

Kemudian buka `http://localhost:8000/projects/congklak/`.

## Arsitektur

- `index.html`: struktur halaman dan elemen UI.
- `game.js`: entry point dan logika permainan vanilla.
- `styles.css`: tema visual, papan, layout responsif, dan orientasi duel.

Tidak ada dependency eksternal dan tidak ada backend.

## Arah desain

Papan dibuat dari elemen HTML/CSS ringan agar tidak membutuhkan aset besar atau runtime 3D. Efek low-poly, ornamen Nusantara, dan aset tambahan dapat ditambahkan bertahap setelah aturan permainan tervalidasi.

## Aturan implementasi

Ring permainan memakai 16 slot: 14 lubang dan 2 lumbung. Slot 0 adalah lumbung kiri Pemain 1, slot 8 lumbung Pemain 2. Penyebaran berjalan berlawanan arah indeks visual (mengitari papan searah jarum jam) dan selalu melewati lumbung lawan.

Penyebaran aktual dianimasikan satu biji setiap 260 ms agar arah, lumbung, capture, dan giliran tambahan bisa diperiksa secara visual.

Jika biji terakhir jatuh di lubang mana pun yang masih berisi biji, seluruh isi lubang itu diambil dan penyebaran berlanjut. Jika berhenti di lubang kosong milik sendiri, aturan capture dijalankan. Lumbung lawan tetap dilewati dan tidak dapat diambil kembali sebagai skor.

Pada duel mobile, tombol `Putar untuk Pemain 2` memutar papan 180 derajat sehingga dua pemain dapat duduk berhadapan. Pada desktop, papan tetap satu area bersama dengan kartu status kedua pemain.

Pada duel desktop, area permainan menampilkan dua papan POV berdampingan: papan kiri untuk Pemain 1 dan papan kanan terbalik untuk Pemain 2. Split ini otomatis disembunyikan pada layar mobile.

Kontrol kecepatan menyediakan `0.5×`, `1×`, `2×`, `4×`, dan `Skip`. Efek suara dibuat dengan Web Audio API sehingga tidak membutuhkan file audio eksternal dan tetap offline.

Tombol `Cara bermain` membuka aturan lengkap dalam modal. Sebelum permainan baru, pemain dapat memilih Pemain 1, Pemain 2, atau Acak sebagai pemulai. Setelah permainan selesai, modal hasil menampilkan skor, langkah, capture, giliran tambahan, akurasi strategi berbasis heuristik, dan saran.

Dalam duel, hanya papan pemain yang sedang mendapat giliran yang menyala dan dapat diklik. Papan pemain lain dibuat redup dan seluruh lubangnya dinonaktifkan.

Jika salah satu lumbung memiliki lebih dari 49 dari total 98 biji, tombol `Akhiri permainan & lihat hasil` muncul karena pemenang sudah dipastikan secara matematis. Tombol ini membatalkan ronde aktif dan membuka result.

AI `Sepuh` memakai pencarian lebih dalam setelah permainan berjalan. Jika komputer menjadi pemain pertama, pembukaan diberi handicap ringan: pencarian lebih dangkal dan menghindari langkah pembukaan yang langsung menghasilkan rantai ekstrem.

Papan nonaktif sengaja hanya diredupkan ringan agar jejak biji tetap dapat diamati. Glow putih menandai lumbung yang sedang menerima biji. Dropdown bahasa di kiri bawah menerjemahkan UI ke Indonesia atau English, termasuk status permainan, aturan, trivia, dan modal hasil.
