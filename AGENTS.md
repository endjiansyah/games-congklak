# AGENTS.md

## Tujuan proyek

Repositori ini digunakan untuk membuat game web ringan dan mudah dipasang di GitHub Pages atau portfolio pribadi. Proyek utama saat ini adalah game congklak bertema Nusantara di `projects/congklak/`.

## Prinsip teknis

- Gunakan vanilla HTML, CSS, dan JavaScript selama framework atau dependensi tidak benar-benar diperlukan.
- Game harus dapat berjalan offline setelah folder proyek dibuka melalui web server statis.
- Hindari build step yang berat agar mudah dipublikasikan ke GitHub Pages.
- Pisahkan logika permainan, tampilan, dan data konfigurasi agar mudah dirawat.
- Utamakan aksesibilitas dasar: tombol dapat difokuskan, instruksi jelas, dan tampilan responsif.
- Pertahankan tema low-poly 3D Nusantara dengan aset yang ringan.

## Aturan gameplay

- Penyebaran biji bergerak searah jarum jam.
- Lumbung pemain berada di sisi kiri dari perspektif pemain.
- Mode solo memiliki level Easy, Medium, Hard, dan Sepuh.
- Mode duel mendukung split-screen pada desktop.
- Pada perangkat mobile, pemain kedua menggunakan orientasi tampilan terbalik 180 derajat.
- Permainan bersifat offline dan tidak memerlukan backend.
- Label/logo `endprojects` harus tetap terlihat sebagai identitas proyek.

## Checkpoint Git

Checkpoint adalah bagian wajib dari workflow.

- Buat commit kecil dan terarah setelah setiap milestone yang selesai.
- Gunakan pesan commit yang jelas, contoh: `feat: add clockwise seed distribution`.
- Jangan mencampur perubahan gameplay, visual, dan dokumentasi dalam satu commit jika dapat dipisahkan.
- Sebelum checkpoint, periksa file yang berubah dan jalankan validasi yang relevan.
- Dokumentasikan checkpoint dan status berikutnya di `docs/PROGRESS.md`.

## Dokumentasi

- `docs/README.md`: acuan arsitektur dan cara menjalankan proyek.
- `docs/PROGRESS.md`: catatan milestone, checkpoint, dan pekerjaan berikutnya.
- Perbarui dokumentasi bila keputusan desain atau struktur teknis berubah.

## Struktur proyek

```text
projects/
  congklak/
    index.html
    styles.css
    game.js
docs/
  README.md
  PROGRESS.md
```
