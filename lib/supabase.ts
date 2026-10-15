import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | undefined;

/** Client server-side (service role). Jangan diimpor dari client component. */
export function supabase(): SupabaseClient {
  if (client) return client;
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL (atau NEXT_PUBLIC_SUPABASE_URL) / SUPABASE_SERVICE_ROLE_KEY belum diatur.",
    );
  }
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}
