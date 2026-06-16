# 🎂 Website Ulang Tahun (Next.js)

Website ulang tahun manis dengan **layar pembuka + confetti perayaan + musik**, **landing page** beranimasi, dan halaman **Memories** berisi galeri foto. Dibuat dengan Next.js (App Router) + Tailwind CSS + Framer Motion.

## 🚀 Cara Menjalankan

Butuh **Node.js 18+** terpasang di komputer kamu. Lalu jalankan di terminal:

```bash
npm install
npm run dev
```

Buka http://localhost:3000 di browser. Selesai! 🎉

## 🎉 Tentang Layar Pembuka, Confetti & Musik

Saat website dibuka, akan muncul layar **"Ada kejutan untukmu..."** dengan tombol **"Buka Kejutan"**. Begitu tombol diketuk:
- 🎊 Confetti berhamburan seperti perayaan.
- 🎶 Musik mulai diputar.

> Kenapa harus diketuk dulu? Browser modern (Chrome, Safari, dll) **memblokir musik yang berbunyi otomatis** sebelum ada interaksi dari pengguna. Jadi satu ketukan ini diperlukan agar lagu bisa berbunyi. Ada juga tombol 🔊 / 🔇 di pojok kanan bawah untuk play/pause musik.

### Mengganti lagu
Website ini memakai **3 lagu terpisah** di folder `public/music/`:

- `opening.mp3` — lagu **layar pembuka** (berbunyi saat halaman utama dibuka)
- `greeting.mp3` — lagu **ucapan ulang tahun** (berbunyi setelah tombol "Buka Kejutan" diketuk)
- `memories.mp3` — lagu **halaman Memories**

Untuk mengganti, siapkan file `.mp3` lalu timpa file yang sesuai (pakai nama yang sama). Jika ingin memakai nama file lain, sesuaikan juga baris `src="/music/..."` di `components/Celebration.js` (pembuka & ucapan) atau `app/memories/page.js` (Memories).

### Lagu di halaman Memories
Halaman **Memories** memutar lagu terpisah dari file `public/music/memories.mp3`. Saat ini diisi instrumental lembut sebagai placeholder.

Untuk memakai lagu **Sal Priadi \u2013 \"I'd Like to Watch You Sleeping\"** (atau lagu lain milikmu): siapkan file `.mp3` lagunya, lalu ganti `public/music/memories.mp3` dengan file tersebut (pakai nama yang sama `memories.mp3`). Catatan: gunakan hanya file lagu yang kamu miliki/punya hak untuk memakainya.

## ✏️ Cara Mengubah Isi

### 1. Ganti nama yang berulang tahun
Buka `app/page.js`, cari baris:
```js
const NAMA = "Sayang";
```
Ganti `"Sayang"` dengan nama orang yang berulang tahun.

### 2. Ganti foto-foto
1. Taruh foto kalian di folder `public/photos/` (misalnya `foto1.jpg`, `foto2.jpg`, dst).
2. Buka `data/memories.js`, lalu ubah bagian `src`, `title`, `date`, dan `caption` untuk setiap kenangan. Contoh:
```js
{
  src: "/photos/foto1.jpg",
  title: "Pertama Kali Bertemu",
  date: "14 Februari 2023",
  caption: "Tulisan manis kamu di sini.",
},
```
Kamu bisa menambah atau mengurangi jumlah kenangan sesuai keinginan.

### 3. Ubah teks ucapan
- Teks layar pembuka ada di `components/Celebration.js`.
- Teks di landing page ada di `app/page.js`.
- Teks di halaman galeri ada di `app/memories/page.js`.

## 🌐 Cara Deploy (opsional)

Cara termudah lewat **Vercel**:
1. Buat akun gratis di https://vercel.com
2. Upload proyek ini (atau hubungkan ke GitHub).
3. Vercel akan otomatis build & memberi kamu link website.

## 📁 Struktur Folder

```
birthday-website/
├── app/
│   ├── layout.js        # Layout & font
│   ├── globals.css      # Style global
│   ├── page.js          # Landing page
│   └── memories/
│       └── page.js      # Halaman galeri foto
├── components/
│   ├── Balloons.js      # Dekorasi balon melayang
│   └── Celebration.js   # Layar pembuka + confetti + musik
├── data/
│   └── memories.js      # Daftar foto & caption (EDIT DI SINI)
├── public/
│   ├── photos/          # Taruh foto kalian di sini
│   └── music/
│       ├── opening.mp3  # Lagu layar pembuka
│       ├── greeting.mp3 # Lagu ucapan ulang tahun
│       └── memories.mp3 # Lagu halaman Memories (taruh lagu Sal Priadi di sini)
└── package.json
```

Dibuat dengan ❤️
