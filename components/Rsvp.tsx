"use client";

import { useEffect, useState } from "react";
import type { Wish } from "@/lib/wishes";

const MAX_NAME = 60;
const MAX_MSG = 500;

export default function Rsvp() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    fetch("/api/wishes")
      .then((r) => (r.ok ? r.json() : []))
      .then((d: Wish[]) => {
        if (alive) setWishes(d);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          status: fd.get("status"),
          message: fd.get("message"),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Gagal mengirim.");
      setWishes((w) => [data as Wish, ...w]);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengirim.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <form onSubmit={submit}>
        <label htmlFor="fName">Nama Anda</label>
        <input
          id="fName"
          name="name"
          required
          maxLength={MAX_NAME}
          placeholder="Tulis nama Anda"
        />
        <label htmlFor="fStatus">Konfirmasi Kehadiran</label>
        <select id="fStatus" name="status" defaultValue="Hadir">
          <option>Hadir</option>
          <option>Ragu</option>
          <option>Tidak Hadir</option>
        </select>
        <label htmlFor="fMsg">Ucapan / Doa</label>
        <textarea
          id="fMsg"
          name="message"
          required
          maxLength={MAX_MSG}
          placeholder="Tulis ucapan & doa untuk kedua mempelai"
        />
        <button className="btn" type="submit" disabled={busy}>
          {busy ? "Mengirim…" : "Kirim Ucapan & Doa"}
        </button>
        {error && (
          <p className="form-msg" role="alert">
            {error}
          </p>
        )}
      </form>

      <div className="wishes">
        <h4>Daftar Ucapan Tamu ({wishes.length})</h4>
        {wishes.map((w) => (
          <div className="wish" key={w.id}>
            <b>{w.name}</b>
            <span className="tag">{w.status}</span>
            <p>{w.message}</p>
          </div>
        ))}
      </div>
    </>
  );
}
