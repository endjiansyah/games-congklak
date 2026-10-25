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

Pada duel mobile, tombol `Putar untuk Pemain 2` memutar papan 180 derajat sehingga dua pemain dapat duduk berhadapan. Pada desktop, papan tetap satu area bersama dengan kartu status kedua pemain.
