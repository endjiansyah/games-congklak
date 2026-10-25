# Congklak Web Game

Game congklak offline bertema Nusantara dengan gaya low-poly 3D, dibuat tanpa framework.

## Menjalankan

Untuk prototipe statis, buka `projects/congklak/index.html` di browser. Jika browser membatasi fitur tertentu saat memakai `file://`, jalankan server statis sederhana dari root repository, misalnya:

```bash
python -m http.server
```

Kemudian buka `http://localhost:8000/projects/congklak/`.

## Arsitektur awal

- `index.html`: struktur halaman dan elemen UI.
- `styles.css`: tema visual, layout responsif, dan orientasi duel.
- `script.js`: entry point JavaScript; logika permainan akan ditambahkan bertahap.

Tidak ada dependency eksternal dan tidak ada backend.

## Arah desain

Papan dibuat dari elemen HTML/CSS ringan terlebih dahulu. Efek low-poly, ornamen Nusantara, dan aset tambahan akan ditambahkan secara bertahap setelah aturan permainan tervalidasi.
