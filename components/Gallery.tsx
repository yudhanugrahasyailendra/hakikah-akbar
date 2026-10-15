"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { invitation } from "@/data/invitation";

const photos = invitation.gallery;

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight")
        setActive((i) => ((i ?? 0) + 1) % photos.length);
      if (e.key === "ArrowLeft")
        setActive((i) => ((i ?? 0) - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <div className="gallery">
        {photos.map((p, i) => (
          <button
            key={i}
            type="button"
            className="shot reveal"
            onClick={() => setActive(i)}
            aria-label={`Perbesar foto ${i + 1}`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 480px) 45vw, 220px"
              style={{ objectPosition: p.pos }}
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="lb-close"
            aria-label="Tutup"
            onClick={() => setActive(null)}
          >
            ✕
          </button>
          {photos.length > 1 && (
            <button
              type="button"
              className="lb-nav prev"
              aria-label="Sebelumnya"
              onClick={(e) => {
                e.stopPropagation();
                setActive((active - 1 + photos.length) % photos.length);
              }}
            >
              ‹
            </button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos[active].src}
            alt={photos[active].alt}
            onClick={(e) => e.stopPropagation()}
          />
          {photos.length > 1 && (
            <button
              type="button"
              className="lb-nav next"
              aria-label="Berikutnya"
              onClick={(e) => {
                e.stopPropagation();
                setActive((active + 1) % photos.length);
              }}
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
