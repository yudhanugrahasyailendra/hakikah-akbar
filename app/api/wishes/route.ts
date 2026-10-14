import {
  LIMITS,
  WISH_STATUSES,
  addWish,
  listWishes,
  rateLimited,
  type WishStatus,
} from "@/lib/wishes";

export async function GET(request: Request) {
  void request.url; // route dinamis, jangan di-prerender
  return Response.json(await listWishes());
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "local";
  if (rateLimited(ip)) {
    return Response.json(
      { error: "Terlalu banyak kiriman, coba lagi sebentar." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Data tidak valid." }, { status: 400 });
  }

  const { name, status, message } = (body ?? {}) as Record<string, unknown>;
  if (
    typeof name !== "string" ||
    typeof message !== "string" ||
    !WISH_STATUSES.includes(status as WishStatus)
  ) {
    return Response.json({ error: "Data tidak valid." }, { status: 400 });
  }
  const cleanName = name.trim().slice(0, LIMITS.name);
  const cleanMsg = message.trim().slice(0, LIMITS.message);
  if (!cleanName || !cleanMsg) {
    return Response.json(
      { error: "Nama dan ucapan wajib diisi." },
      { status: 400 },
    );
  }

  const wish = await addWish({
    name: cleanName,
    status: status as WishStatus,
    message: cleanMsg,
  });
  return Response.json(wish, { status: 201 });
}
