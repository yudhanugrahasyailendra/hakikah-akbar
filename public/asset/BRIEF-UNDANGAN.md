# Brief Project: Undangan Pernikahan Digital — Ikha & Akbar

> File brief untuk project **Next.js**. Dipakai sebagai acuan (oleh developer / Claude Code) untuk membangun website undangan digital dari mockup HTML dan konten undangan cetak milik client.

---

## 1. File Referensi

| File | Lokasi di project | Fungsi |
|---|---|---|
| `undangan-rifky-dian-mockup_2.html` | `reference/undangan-mockup.html` | **Acuan desain & struktur** (layout, warna, font, animasi, interaksi). Hanya referensi, bukan konten final. |
| `Undangan_Client.jpeg` | `reference/undangan-client.jpeg` (opsional salin ke `public/images/`) | **Sumber konten final** (nama, tanggal, lokasi, daftar turut mengundang). |

> ⚠️ **Penting:** mockup HTML berisi data contoh **Rifky & Dian, Sabtu 03 Oktober 2026** (plus banyak placeholder `[ ... ]`). Semua teks tersebut **harus diganti** dengan konten client di bagian 3. Jangan ada sisa "Rifky", "Dian", "03 Oktober", "ST. Saadiyah", dsb. di hasil akhir.

Catatan teknis file mockup:
- File berukuran ±1,9 MB karena **video opening (MP4) dan poster tersemat sebagai base64**. Jangan copy-paste base64 ke komponen; ekstrak menjadi `public/media/opening.mp4` dan `public/media/opening-poster.jpg`.
- Mockup memakai fallback `Opening_undangan.mp4` (file di sebelah HTML) → di Next.js cukup `src="/media/opening.mp4"`.

---

## 2. Ringkasan Project

- **Jenis:** Undangan pernikahan digital (single page, mobile-first, lebar maks. 480px seperti mockup).
- **Mempelai:** Ikha (Hakikah Dg. Tinggong) & Akbar (Akbar Pardamean Lumban Tobing, S.E Dg. Malik).
- **Acara:** Resepsi Pernikahan — Ahad, 25 Oktober 2026, 10.00 WITA – selesai.
- **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS (atau CSS Modules, mengikuti variabel warna mockup). Deploy ke Vercel.
- **Bahasa:** Indonesia (`lang="id"`).
- **Personalisasi tamu:** nama tamu dari query `?to=Nama+Tamu` (sudah ada di mockup).

---

## 3. Konten Undangan (Sumber: `Undangan_Client.jpeg`)

Teks ditranskrip persis dari undangan cetak. Ejaan asli dipertahankan (mis. "Ridho", "Wassalamu Alaikum" ditulis seperti di gambar bila perlu disesuaikan, konfirmasi ke client).

### 3.1 Pembuka
- **Basmalah:** *Bismillahirrahmanirrahim*
- **Teks:**
  > Maha suci Allah
  > yang telah menciptakan makhluk-Nya berpasang-pasangan,
  > Ya Allah, perkenankanlah kami menikahkan putra-putri kami

### 3.2 Mempelai
| Peran | Nama |
|---|---|
| Mempelai wanita | **Hakikah Dg. Tinggong** |
| (penghubung) | *dengan* |
| Mempelai pria | **Akbar Pardamean Lumban Tobing, S.E Dg. Malik** |

- Keterangan mempelai pria: *(Putra Pertama dari Marulam L. Tobing & Mardiana Malik)*
- Nama panggilan / monogram penutup: **Ikha & Akbar**
- Keterangan orang tua mempelai wanita: **tidak tercantum** di undangan → lihat bagian 8.

### 3.3 Kata Pengantar Acara
> *Assalamu Alaikum Warahmatullahi Wabarakatuh*
> Dengan memohon Ridho dan Rahmat Allah SWT,
> kami bermaksud menyelenggarakan Resepsi Pernikahan anak/kemanakan/cucu kami
> Yang Insya Allah akan dilaksanakan pada :

### 3.4 Waktu & Tempat
| Item | Isi |
|---|---|
| Hari / tanggal | **Ahad, 25 Oktober 2026** |
| Pukul | 10.00 WITA – Selesai (Acara Siang) |
| Tempat | Kaluarrang, Desa Manjapai |
| Wilayah | Kec. Bonto Nompo, Kab. Gowa |

- Countdown target: `2026-10-25T10:00:00+08:00`
- Hanya **satu acara (Resepsi)**. Tidak ada Akad Nikah terpisah di undangan.
- Link Google Maps: **belum ada** → minta ke client (lihat bagian 8).

### 3.5 Penutup
> Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara(i)
> berkenan hadir untuk memberikan doa restu kepada kedua mempelai
> *Wassalamu Alaikum Warahmatullahi Wabarakatuh*

### 3.6 Yang Mengundang
- **Hormat kami yang mengundang:** TABARA DG. MALING & SAHARIAH DG. BAJI

### 3.7 Turut Mengundang
Urutan mengikuti undangan cetak (kolom kiri lalu kolom kanan). Simpan sebagai array agar mudah diedit.

**Kolom kiri**
1. Hasdar Dg. Ta'le
2. St. Zaenab Dg. Te'ne
3. Jamaluddin H. Gaffar Dg. Lallo
4. Pelda Syahrul Dg. Tika — *(Zidam XIV/HSN)*
5. Hasri, S.Kep.Ns Dg. Malengu
6. Sirajuddin Dg. Bantang
7. Sunardi, S.Kep Dg. Jarre

**Kolom kanan**
8. Kamaruddin Dg. Sitakka — *(Imdes Manjapai)*
9. Ikrar Dg. Janji — *(Kadus Kaluarrang)*
10. Mukhtar Luthfi, S.E Dg. Gassing — *(Imdus Kaluarrang)*
11. Tallasa Dg. Rani
12. Muh. Ali Dg. Rombo
13. K. Dg. Sutte
14. Romba Dg. Sakking
15. Bahtiar Dg. Ngawing

---

## 4. Pemetaan Mockup → Konten Final

Struktur section mengikuti mockup. Kolom "Aksi" menjelaskan apa yang dilakukan pada tiap section.

| Section (id di mockup) | Isi di mockup | Aksi untuk versi client |
|---|---|---|
| **Cover** (`#cover`) | Video latar, "The Wedding Of Rifky & Dian", tanggal Sabtu 03 Okt 2026, nama tamu, tombol Buka Undangan, tombol suara | Ganti nama → **Ikha & Akbar**, tanggal → **Ahad, 25 Oktober 2026**. Default nama tamu "Abang Akbar" di JS mockup → ganti ke **"Tamu Undangan"**. |
| **Hero** (`#hero`) | Nama + tanggal | Ganti nama & tanggal. |
| **Mempelai** (`#mempelai`) | Quote, foto & nama pria/wanita, orang tua | Pakai data 3.2. Orang tua pria: Marulam L. Tobing & Mardiana Malik. Orang tua wanita: **kosong / kirim ke client**. Foto: placeholder dulu. Quote mockup ("Dan Kami bersyukur…") **opsional**; undangan client memakai teks Maha suci Allah (3.1). |
| **Save The Date** (`#date`) | Countdown + 2 kartu (Akad & Resepsi) | Countdown ke 25 Okt 2026 10:00 WITA. **Hapus kartu Akad**, sisakan **satu kartu Resepsi** (data 3.4). Tombol "Simpan ke Kalender" (file `.ics`) dan "Buka Peta". |
| **Love Story** (`#story`) | Timeline 4 titik | **Tidak ada di undangan client** → sembunyikan (feature flag) sampai client memberi cerita. |
| **Wedding Gift** (`#gift`) | Rekening / e-wallet / alamat | **Tidak ada di undangan client** → sembunyikan (feature flag) sampai ada data. |
| **RSVP & Ucapan** (`#rsvp`) | Form nama, status hadir, ucapan; daftar ucapan | Pertahankan. Simpan data ke backend (lihat bagian 6). Hapus 3 ucapan dummy. |
| **Turut Mengundang** (`#invite`) | Chip nama | Isi dengan daftar 3.7 (15 nama + keterangan jabatan). Tampilkan 2 kolom seperti cetak, atau chip bila layar sempit. |
| **Galeri** (`#gallery`) | Video + 6 foto + lightbox | Placeholder sampai foto client diterima; boleh disembunyikan dulu. |
| **Footer** | Terima kasih, kalimat penutup | Pakai 3.5 + "Ikha & Akbar" + "Hormat kami yang mengundang: Tabara Dg. Maling & Sahariah Dg. Baji". Hapus `[Credit / Brand Footer]` atau isi brand sendiri. |
| **Navbar bawah & tombol musik** | 7 ikon, toggle musik | Sesuaikan ikon dengan section yang aktif. Musik: file audio dari client (belum ada). |

---

## 5. Desain (dari Mockup)

**Token warna** (`:root` di mockup — pindahkan ke Tailwind theme / CSS variables):

| Token | Nilai |
|---|---|
| `--bg` | `#faf6ef` |
| `--bg2` | `#f1eadc` |
| `--ink` | `#3b3a35` |
| `--muted` | `#7b776c` |
| `--sage` | `#7d8f77` |
| `--sage-d` | `#566650` |
| `--gold` | `#b8935a` |
| `--line` | `#e2d8c3` |
| `--card` | `#fffdf8` |

**Font (Google Fonts, pakai `next/font/google`):** Cormorant Garamond (judul), Great Vibes (script), Jost (body).

**Catatan arah visual:** undangan cetak client bertema **merah marun/burgundy + bunga mawar, aksen krem/putih**, sedangkan mockup bernuansa **sage hijau + emas**. Perlu keputusan:
- (A) Pakai palet mockup apa adanya (cepat), atau
- (B) Ganti palet ke burgundy (mis. `#8c1c2c` / `#6e1423`) agar senada dengan undangan cetak, dan pakai aset bunga dari desain cetak sebagai ornamen sudut. **← disarankan, konfirmasi ke client.**

**Perilaku & animasi yang dipertahankan:**
- Cover fullscreen yang meluncur ke atas saat "Buka Undangan" (`translateY(-100%)`, 1s), body scroll terkunci sebelum dibuka.
- Video latar cover (muted, loop, autoplay, playsInline), tombol suara, video di-pause 1,1 dtk setelah cover terbuka.
- Efek `reveal` saat scroll (IntersectionObserver).
- Countdown (hari/jam/menit/detik), tombol salin, lightbox galeri, nav melayang bawah, tombol musik.

---

## 6. Arsitektur Next.js yang Disarankan

```
undangan-ikha-akbar/
├─ BRIEF-UNDANGAN.md
├─ reference/
│  ├─ undangan-mockup.html
│  └─ undangan-client.jpeg
├─ public/
│  ├─ media/            # opening.mp4, opening-poster.jpg, musik.mp3
│  └─ images/           # foto mempelai, galeri, ornamen bunga
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx     # font, metadata, lang="id"
│  │  ├─ page.tsx       # baca ?to=, render semua section
│  │  ├─ globals.css
│  │  └─ api/
│  │     └─ wishes/route.ts   # GET/POST ucapan (jika pakai backend)
│  ├─ data/
│  │  └─ invitation.ts  # SEMUA konten (bagian 3) di satu file
│  └─ components/
│     ├─ Cover.tsx
│     ├─ Hero.tsx
│     ├─ Couple.tsx
│     ├─ SaveTheDate.tsx   # countdown + kartu resepsi
│     ├─ Rsvp.tsx          # form + daftar ucapan
│     ├─ InvitedBy.tsx     # yang mengundang + turut mengundang
│     ├─ Gallery.tsx
│     ├─ Footer.tsx
│     ├─ BottomNav.tsx
│     └─ MusicButton.tsx
```

**Contoh `src/data/invitation.ts`:**

```ts
export const invitation = {
  couple: {
    bride: { full: "Hakikah Dg. Tinggong", nick: "Ikha" },
    groom: {
      full: "Akbar Pardamean Lumban Tobing, S.E Dg. Malik",
      nick: "Akbar",
      parents: "Putra Pertama dari Marulam L. Tobing & Mardiana Malik",
    },
    monogram: "Ikha & Akbar",
  },
  event: {
    name: "Resepsi Pernikahan",
    dateLabel: "Ahad, 25 Oktober 2026",
    startISO: "2026-10-25T10:00:00+08:00",
    timeLabel: "10.00 WITA - Selesai (Acara Siang)",
    place: "Kaluarrang, Desa Manjapai",
    region: "Kec. Bonto Nompo, Kab. Gowa",
    mapsUrl: "", // TODO dari client
  },
  hosts: ["Tabara Dg. Maling", "Sahariah Dg. Baji"],
  alsoInviting: [
    { name: "Hasdar Dg. Ta'le" },
    { name: "St. Zaenab Dg. Te'ne" },
    { name: "Jamaluddin H. Gaffar Dg. Lallo" },
    { name: "Pelda Syahrul Dg. Tika", note: "Zidam XIV/HSN" },
    { name: "Hasri, S.Kep.Ns Dg. Malengu" },
    { name: "Sirajuddin Dg. Bantang" },
    { name: "Sunardi, S.Kep Dg. Jarre" },
    { name: "Kamaruddin Dg. Sitakka", note: "Imdes Manjapai" },
    { name: "Ikrar Dg. Janji", note: "Kadus Kaluarrang" },
    { name: "Mukhtar Luthfi, S.E Dg. Gassing", note: "Imdus Kaluarrang" },
    { name: "Tallasa Dg. Rani" },
    { name: "Muh. Ali Dg. Rombo" },
    { name: "K. Dg. Sutte" },
    { name: "Romba Dg. Sakking" },
    { name: "Bahtiar Dg. Ngawing" },
  ],
  features: { loveStory: false, gift: false, gallery: false },
};
```

**Penyimpanan ucapan & RSVP:** mockup hanya menyimpan di memori (hilang saat refresh). Untuk versi produksi butuh database sederhana (mis. **Supabase** atau Vercel Postgres/KV) dengan tabel `wishes`: `id`, `name`, `status` (`Hadir | Ragu | Tidak Hadir`), `message`, `created_at`. Escape/sanitasi input (mockup sudah punya fungsi `esc`), batasi panjang teks, dan tambahkan rate-limit sederhana.

**Metadata / SEO / share:** `title` "Undangan Pernikahan Ikha & Akbar", `description` berisi tanggal & lokasi, OG image (cover/foto mempelai), `robots: noindex` agar undangan tidak terindeks.

**Fitur tambahan yang disarankan:**
- Generator link tamu: `https://domain/?to=Nama%20Tamu` (halaman admin sederhana atau spreadsheet).
- File `.ics` untuk "Simpan ke Kalender".
- `prefers-reduced-motion` untuk mematikan animasi & autoplay video.
- Autoplay musik hanya setelah klik "Buka Undangan" (aturan browser).

---

## 7. Kriteria Selesai (Acceptance Criteria)

- [ ] Tidak ada teks "Rifky", "Dian", "Sabtu 03 Oktober", atau placeholder `[ ... ]` tersisa.
- [ ] Semua teks dan nama di bagian 3 tampil persis (termasuk gelar S.E, S.Kep, S.Kep.Ns dan keterangan jabatan).
- [ ] Countdown menghitung ke 25 Okt 2026 10:00 WITA dan menampilkan pesan khusus bila sudah lewat.
- [ ] `?to=` mengisi nama tamu di cover; tanpa parameter tampil "Tamu Undangan".
- [ ] Hanya satu kartu acara (Resepsi); section Love Story & Gift tersembunyi sampai data tersedia.
- [ ] Tampilan nyaman di mobile 360–430px dan tetap terpusat (maks. 480px) di desktop.
- [ ] Ucapan & RSVP tersimpan dan tetap ada setelah refresh.
- [ ] Skor Lighthouse mobile baik (video dikompres, gambar via `next/image`, font via `next/font`).
- [ ] Deploy Vercel berhasil dan link `?to=` bekerja di produksi.

---

## 8. Hal yang Perlu Dikonfirmasi ke Client

1. **Tanda hijau di gambar** — garis hijau di bawah baris *"(Putra Pertama dari Marulam L. Tobing & Mardiana Malik)"* kemungkinan coretan/penanda revisi. Apakah baris itu perlu **diubah, ditambah, atau dihapus**?
2. **Orang tua mempelai wanita** tidak tercantum. Apakah Tabara Dg. Maling & Sahariah Dg. Baji adalah orang tua Hakikah, atau keluarga yang mengundang saja? (Kalimat "anak/kemanakan/cucu kami" menyiratkan keluarga besar.)
3. **Nama panggilan**: "Ikha" untuk Hakikah dan "Akbar" — sudah benar?
4. **Link Google Maps** lokasi Kaluarrang, Desa Manjapai.
5. **Akad Nikah**: apakah ada acara akad terpisah yang ingin ditampilkan? (Di undangan hanya resepsi.)
6. **Aset**: foto mempelai, foto galeri, video opening final (mockup memakai video contoh), musik latar, ornamen bunga burgundy dari desain cetak.
7. **Love Story & Hadiah (rekening/e-wallet)**: dipakai atau tidak.
8. **Palet warna**: burgundy (senada undangan cetak) atau sage-emas (mockup)?
9. **Domain** yang dipakai (subdomain Vercel atau domain khusus).

---

## 9. Perintah Awal Project

```bash
npx create-next-app@latest undangan-ikha-akbar --typescript --tailwind --eslint --app --src-dir
cd undangan-ikha-akbar
mkdir -p reference public/media public/images src/data src/components
# salin undangan-rifky-dian-mockup_2.html -> reference/undangan-mockup.html
# salin Undangan_Client.jpeg              -> reference/undangan-client.jpeg
npm run dev
```
