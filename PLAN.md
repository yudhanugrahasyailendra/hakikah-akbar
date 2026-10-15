# PLAN: Undangan Digital (hakikah-akbar.vercel.app)

Stack: Next.js (App Router) + Vercel + Supabase (Postgres)

Tujuan:
1. Menyimpan dan menampilkan **ucapan & doa** dari tamu.
2. Menampilkan **nama tamu** pada undangan lewat link personal.

---

## Fase 0: Persiapan

- [ ] Buat project di Supabase (region terdekat, mis. Singapore).
- [ ] Install dependency: `npm i @supabase/supabase-js`
- [ ] Tambahkan Environment Variables (lokal `.env.local` dan Vercel):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY` (server only, JANGAN pakai prefix `NEXT_PUBLIC_`)
- [ ] Pastikan versi Next.js (di 15+ `searchParams` berupa Promise).

## Fase 1: Database

- [ ] Jalankan SQL di Supabase SQL Editor:

```sql
create table wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 60),
  message text not null check (char_length(message) <= 500),
  attendance text check (attendance in ('hadir','tidak','ragu')),
  approved boolean default true,
  created_at timestamptz default now()
);

alter table wishes enable row level security;

create policy "read wishes" on wishes
  for select using (approved = true);
```

- [ ] (Opsional) Tabel `guests` untuk link dengan slug:

```sql
create table guests (
  slug text primary key,
  name text not null,
  group_label text
);
```

Catatan: insert dilakukan lewat Server Action memakai service role key, jadi tidak perlu policy insert publik.

## Fase 2: Ucapan & Doa

- [ ] Buat `lib/supabase.ts` (client server-side).
- [ ] Buat `app/actions.ts` dengan Server Action `sendWish`:
  - honeypot field (`website`) untuk anti-bot
  - trim + batasi panjang (nama 60, pesan 500)
  - validasi wajib isi
  - insert ke tabel `wishes`
  - `revalidatePath('/')`
- [ ] Buat komponen `WishForm` (client component, pakai `useActionState`/`useFormStatus`):
  - input nama, textarea ucapan, pilihan kehadiran
  - state loading, sukses, error
  - nama terisi otomatis kalau tamu dikenali dari link
- [ ] Buat komponen `WishList` (server component):
  - ambil 50 ucapan terbaru, urut `created_at desc`
  - tampilkan nama, pesan, waktu relatif
  - area scroll dengan tinggi tetap
- [ ] (Opsional) Realtime via Supabase Realtime, atau `router.refresh()` setelah submit.

## Fase 3: Nama Tamu di Undangan

- [ ] Baca query param di `app/page.tsx`:

```tsx
export default async function Page({
  searchParams,
}: { searchParams: Promise<{ to?: string }> }) {
  const { to } = await searchParams
  const guest = to ? decodeURIComponent(to).slice(0, 60) : 'Tamu Undangan'
  return <Cover guestName={guest} />
}
```

- [ ] Tampilkan nama tamu di cover ("Kepada Yth. ...").
- [ ] Jangan pakai `dangerouslySetInnerHTML` (React sudah escape otomatis).
- [ ] Generate link massal di Google Sheets:

```
="https://hakikah-akbar.vercel.app/?to="&SUBSTITUTE(A2," ","+")
```

- [ ] Kirim link per tamu lewat WhatsApp.
- [ ] (Opsional) Ganti `?to=` dengan slug dari tabel `guests` (`/?to=budi-santoso`).

## Fase 4: Pengamanan

- [ ] Rate limiting per IP (Upstash Ratelimit atau cek sederhana di Server Action).
- [ ] Filter kata kasar sederhana sebelum insert.
- [ ] Moderasi (opsional): set `approved` default `false`, tampilkan hanya yang `true`.
- [ ] Tambahkan `noindex`:

```tsx
export const metadata = { robots: { index: false, follow: false } }
```

## Fase 5: Testing & Deploy

- [ ] Tes submit ucapan (normal, kosong, terlalu panjang, spam cepat).
- [ ] Tes link `?to=` dengan spasi, karakter khusus, dan nama panjang.
- [ ] Tes tampilan di mobile (mayoritas tamu buka dari WhatsApp).
- [ ] Cek Environment Variables di Vercel, lalu redeploy.
- [ ] Tes ulang di URL produksi.

---

## Urutan Pengerjaan Disarankan

1. Fase 0 → 1 (fondasi)
2. Fase 3 (nama tamu, paling cepat terlihat hasilnya)
3. Fase 2 (ucapan & doa)
4. Fase 4 (pengamanan)
5. Fase 5 (testing & deploy)

## Keputusan yang Perlu Ditentukan

- Moderasi ucapan: langsung tampil atau disetujui dulu?
- Perlu RSVP/kehadiran di form, atau ucapan saja?
- Link tamu: cukup `?to=Nama` atau pakai slug + tabel `guests`?
