// Penyimpanan ucapan di Supabase (tabel `wishes`: id, name, status, message, created_at).
import { supabase } from "@/lib/supabase";

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
  __wishHits?: Map<string, number[]>;
};
const hits: Map<string, number[]> = (store.__wishHits ??= new Map());

type WishRow = {
  id: string;
  name: string;
  status: WishStatus;
  message: string;
  created_at: string;
};

const toWish = (r: WishRow): Wish => ({
  id: r.id,
  name: r.name,
  status: r.status,
  message: r.message,
  createdAt: r.created_at,
});

export async function listWishes(): Promise<Wish[]> {
  const { data, error } = await supabase()
    .from("wishes")
    .select("id,name,status,message,created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) throw error;
  return (data as WishRow[]).map(toWish);
}

export async function addWish(
  input: Pick<Wish, "name" | "status" | "message">,
): Promise<Wish> {
  const { data, error } = await supabase()
    .from("wishes")
    .insert(input)
    .select("id,name,status,message,created_at")
    .single();
  if (error) throw error;
  return toWish(data as WishRow);
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
