// Penyimpanan ucapan sementara (in-memory, hilang saat server restart / cold start).
// TODO produksi: ganti dengan Supabase / Vercel Postgres / KV (tabel `wishes`:
// id, name, status, message, created_at). Cukup ubah isi `listWishes` & `addWish`.

export const WISH_STATUSES = ["Hadir", "Ragu", "Tidak Hadir"] as const;
export type WishStatus = (typeof WISH_STATUSES)[number];

export type Wish = {
  id: string;
  name: string;
  status: WishStatus;
  message: string;
  createdAt: string;
};

export const LIMITS = { name: 60, message: 500 } as const;

const store = globalThis as unknown as {
  __wishes?: Wish[];
  __wishHits?: Map<string, number[]>;
};
const wishes = (store.__wishes ??= []);
const hits: Map<string, number[]> = (store.__wishHits ??= new Map());

export async function listWishes(): Promise<Wish[]> {
  return wishes.slice(0, 200);
}

export async function addWish(
  input: Pick<Wish, "name" | "status" | "message">,
): Promise<Wish> {
  const wish: Wish = {
    id: crypto.randomUUID(),
    ...input,
    createdAt: new Date().toISOString(),
  };
  wishes.unshift(wish);
  return wish;
}

/** Maks. 5 kiriman per menit per IP. */
export function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (recent.length >= 5) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}
