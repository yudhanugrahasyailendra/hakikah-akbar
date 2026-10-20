# PLAN: Backup & Migrasi Database Supabase

Konteks: project Supabase lama akan dihapus, data dipindah ke akun Supabase baru.
Aplikasi: Next.js di Vercel (`hakikah-akbar.vercel.app`).

## 1. Inventaris yang perlu diselamatkan

Dari kode (`lib/supabase.ts`, `lib/wishes.ts`) dan `PLAN.md`:

| Item | Keterangan |
|---|---|
| Tabel `wishes` | Kolom yang dipakai kode: `id, name, status, message, created_at`. **Data utama.** |
| Tabel `guests` (jika sempat dibuat) | `slug, name, group_label`. Cek di dashboard apakah ada. |
| Skema aktual | Kode memakai kolom `status` (Hadir/Ragu/Tidak Hadir), sedangkan `PLAN.md` menulis `attendance` + `approved`. **Skema asli di DB bisa berbeda dari PLAN.md**, jadi ekspor skema dari DB, jangan dari PLAN.md. |
| RLS & policy | Policy `read wishes` dan pengaturan RLS. |
| Env vars | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (di `.env.local` dan Vercel). Semuanya berubah setelah migrasi. |
| Storage / Auth / Edge Functions | Dari kode tidak terlihat dipakai. Verifikasi di dashboard; kalau kosong, abaikan. |

## 2. Prasyarat

- [ ] Akses login ke akun Supabase lama (masih aktif, **jangan hapus dulu**).
- [ ] Akun Supabase baru + project baru (region Singapore, sama seperti sebelumnya).
- [ ] Akses dashboard Vercel project ini.
- [ ] Tool: Supabase CLI (`npx supabase`) dan/atau `pg_dump`/`psql` (PostgreSQL client). Docker tidak wajib kalau pakai `pg_dump`.
- [ ] Connection string DB lama: Dashboard lama → Project Settings → Database → Connection string (pakai mode *Session pooler* bila IPv6 tidak tersedia).

## 3. Langkah backup (akun lama)

Lakukan **minimal dua metode** agar ada cadangan berlapis.

### 3.1 Dump SQL penuh (utama)

```bash
# Skema + RLS policy
pg_dump "$OLD_DB_URL" --schema=public --schema-only --no-owner --no-privileges -f backup/schema.sql

# Data saja
pg_dump "$OLD_DB_URL" --schema=public --data-only --no-owner --no-privileges --column-inserts -f backup/data.sql
```

Alternatif dengan Supabase CLI:

```bash
npx supabase db dump --db-url "$OLD_DB_URL" -f backup/schema.sql
npx supabase db dump --db-url "$OLD_DB_URL" --data-only -f backup/data.sql
```

### 3.2 Ekspor CSV (cadangan yang mudah dibaca)

- Dashboard → Table Editor → pilih tabel `wishes` (dan `guests`) → **Export to CSV**.
- Simpan sebagai `backup/wishes.csv`, `backup/guests.csv`.

### 3.3 Catat konfigurasi

- Salin SQL policy/RLS dari Dashboard → Authentication → Policies (atau sudah ada di `schema.sql`).
- Simpan nilai env vars lama ke password manager (bukan ke git).

### 3.4 Aturan penyimpanan backup

- Folder `backup/` **jangan di-commit** (berisi nama & pesan tamu = data pribadi). Tambahkan `backup/` ke `.gitignore`.
- Simpan salinan di 2 tempat (mis. disk lokal + Google Drive pribadi).
- Jangan taruh service role key di file backup atau repo.

## 4. Verifikasi backup (sebelum lanjut)

- [ ] Hitung baris di DB lama: `select count(*) from wishes;`
- [ ] Jumlah baris di `wishes.csv` sama (dikurangi header).
- [ ] `data.sql` berisi jumlah `INSERT` yang sama: `grep -c "INSERT INTO" backup/data.sql`
- [ ] Buka sampel beberapa baris, pastikan karakter non-ASCII (emoji, aksara) tidak rusak (encoding UTF-8).
- [ ] Catat `max(created_at)` untuk pembanding setelah restore.

## 5. Restore ke akun baru

1. Buat project baru di akun baru. Simpan DB password.
2. Restore skema: SQL Editor atau
   ```bash
   psql "$NEW_DB_URL" -f backup/schema.sql
   ```
3. Restore data:
   ```bash
   psql "$NEW_DB_URL" -f backup/data.sql
   ```
   Cadangan: Table Editor → Import data from CSV.
4. Pastikan RLS aktif dan policy sama (`alter table wishes enable row level security;`).
5. Verifikasi: `count(*)` dan `max(created_at)` sama dengan DB lama. Cek `status` hanya berisi `Hadir` / `Ragu` / `Tidak Hadir`.

## 6. Cutover aplikasi

1. Ambil dari project baru: Project URL, publishable (anon) key, service role key.
2. Update `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```
3. Update Environment Variables di Vercel (Production + Preview) dengan nilai yang sama, lalu **Redeploy** (env baru hanya terbaca setelah deploy ulang).
4. Uji lokal dulu (`npm run dev`): daftar ucapan tampil, kirim ucapan baru berhasil.
5. Uji di production: buka undangan, cek ucapan lama muncul, kirim ucapan uji lalu hapus lewat Table Editor.
6. Opsional: untuk meminimalkan kehilangan data, lakukan cutover di jam sepi. Ucapan yang masuk antara dump dan cutover harus diekspor ulang (jalankan ulang 3.1 data-only, lalu import hanya baris dengan `created_at` setelah `max(created_at)` backup pertama).

## 7. Penghapusan project lama

Jangan hapus sebelum semua ini terpenuhi:

- [ ] Backup terverifikasi (bagian 4) dan tersimpan di 2 tempat.
- [ ] Data di project baru terverifikasi (bagian 5).
- [ ] Production berjalan normal di project baru minimal 3-7 hari tanpa error.
- [ ] Tidak ada ucapan baru yang tertinggal di DB lama (cek `count(*)` lama vs baru).
- [ ] Rotasi kunci lama tidak diperlukan karena project dihapus, tetapi pastikan tidak ada env lama tersisa di Vercel/.env.

Setelah itu: Dashboard lama → Project Settings → General → **Delete project**.

## 8. Rollback

Selama project lama belum dihapus: kembalikan env vars Vercel ke nilai lama dan redeploy. Setelah dihapus, rollback hanya bisa lewat file backup (bagian 3).

## 9. Checklist ringkas

- [ ] Project lama masih aktif
- [ ] Dump skema + data + CSV selesai
- [ ] Backup terverifikasi dan disimpan 2 tempat, `backup/` masuk `.gitignore`
- [ ] Project baru dibuat, skema & data direstore
- [ ] Jumlah baris dan `max(created_at)` cocok
- [ ] `.env.local` dan Vercel env diganti, redeploy
- [ ] Uji kirim & tampil ucapan di production
- [ ] Masa observasi selesai
- [ ] Hapus project lama

## 10. Tindak lanjut

- Perbarui `PLAN.md` Fase 1 agar SQL sesuai skema aktual (`status` bukan `attendance`), supaya migrasi berikutnya bisa dibuat ulang dari repo.
- Pertimbangkan menyimpan skema sebagai file `supabase/schema.sql` di repo (tanpa data).
- Jadwalkan backup berkala (ekspor CSV manual tiap beberapa hari menjelang/sesudah hari acara).
