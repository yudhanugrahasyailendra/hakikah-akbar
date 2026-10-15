"use client";

import { useState } from "react";
import { invitation } from "@/data/invitation";

const { note, accounts } = invitation.gift;

export default function Gift() {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(number: string) {
    try {
      await navigator.clipboard.writeText(number);
    } catch {
      const t = document.createElement("textarea");
      t.value = number;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(number);
    setTimeout(() => setCopied((c) => (c === number ? null : c)), 2000);
  }

  return (
    <>
      <p className="prose reveal">{note}</p>
      {accounts.map((a) => (
        <div className="bank reveal" key={a.number}>
          <div className="bank-name">{a.bank}</div>
          <div className="bank-chip" aria-hidden="true" />
          <div className="bank-number">{a.number}</div>
          <div className="bank-holder">a.n. {a.name}</div>
          <button type="button" className="btn" onClick={() => copy(a.number)}>
            {copied === a.number ? "✓ Tersalin" : "Salin No. Rekening"}
          </button>
        </div>
      ))}
    </>
  );
}
