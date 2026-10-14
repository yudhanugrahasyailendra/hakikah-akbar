"use client";

import { useSyncExternalStore } from "react";
import { invitation } from "@/data/invitation";

const target = new Date(invitation.event.startISO).getTime();

function subscribe(cb: () => void) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}
const getNow = () => Math.floor(Date.now() / 1000);

export default function Countdown() {
  const nowSec = useSyncExternalStore(subscribe, getNow, () => 0);
  const ready = nowSec > 0;
  const left = ready ? Math.max(0, Math.floor(target / 1000) - nowSec) : 0;
  const over = ready && left === 0;
  const cells = [
    ["Hari", Math.floor(left / 86400)],
    ["Jam", Math.floor((left % 86400) / 3600)],
    ["Menit", Math.floor((left % 3600) / 60)],
    ["Detik", left % 60],
  ] as const;

  return (
    <>
      <div className="count reveal">
        {cells.map(([label, v]) => (
          <div key={label}>
            <b>{ready ? v : "–"}</b>
            <span>{label}</span>
          </div>
        ))}
      </div>
      {over && (
        <p style={{ fontSize: 13, color: "var(--muted)" }}>
          Hari bahagia telah tiba 🤍 Terima kasih atas doa dan restunya.
        </p>
      )}
    </>
  );
}
