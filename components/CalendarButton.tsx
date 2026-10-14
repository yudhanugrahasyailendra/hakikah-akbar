"use client";

import { buildIcs } from "@/lib/ics";

export default function CalendarButton() {
  function download() {
    const url = URL.createObjectURL(
      new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "undangan-ikha-akbar.ics";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <button
      className="btn ghost"
      type="button"
      style={{ marginTop: 14 }}
      onClick={download}
    >
      ＋ Simpan ke Kalender
    </button>
  );
}
