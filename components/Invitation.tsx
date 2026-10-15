"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { invitation } from "@/data/invitation";

const noopSubscribe = () => () => {};
const getGuest = () =>
  new URLSearchParams(window.location.search).get("to")?.trim().slice(0, 60) ?? "";

// Ikon garis (stroke) bergaya emas; path 24x24.
const NAV = [
  {
    href: "#top",
    label: "Awal",
    icon: (
      <>
        <path d="M3.5 11 12 4l8.5 7" />
        <path d="M5.5 9.8V20h13V9.8" />
        <path d="M10 20v-5.5h4V20" />
      </>
    ),
  },
  {
    href: "#mempelai",
    label: "Mempelai",
    icon: (
      <>
        <circle cx="9" cy="12" r="5.5" />
        <circle cx="15" cy="12" r="5.5" />
      </>
    ),
  },
  {
    href: "#date",
    label: "Acara",
    icon: (
      <>
        <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
        <path d="m12 12.6.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3z" />
      </>
    ),
  },
  {
    href: "#gallery",
    label: "Galeri",
    icon: (
      <>
        <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.3l1.3-2h5.8l1.3 2h1.3A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5z" />
        <circle cx="12" cy="12.5" r="3.4" />
      </>
    ),
  },
  {
    href: "#gift",
    label: "Hadiah",
    icon: (
      <>
        <rect x="3.5" y="9" width="17" height="4" rx="1" />
        <path d="M5 13v7h14v-7M12 9v11" />
        <path d="M12 9C9 9 7.5 7.8 7.5 6.4S9 4.3 10.3 5 12 9 12 9zm0 0c3 0 4.5-1.2 4.5-2.6S15 4.3 13.7 5 12 9 12 9z" />
      </>
    ),
  },
  {
    href: "#rsvp",
    label: "Ucapan",
    icon: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
        <path d="m3.5 7.5 8.5 6 8.5-6" />
      </>
    ),
  },
];

export default function Invitation({ children }: { children: React.ReactNode }) {
  const { couple, event, media } = invitation;
  const guest =
    useSyncExternalStore(noopSubscribe, getGuest, () => "") || "Tamu Undangan";

  const [open, setOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Kunci scroll sebelum undangan dibuka
  useEffect(() => {
    document.body.style.overflow = open ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Hormati prefers-reduced-motion: jangan autoplay video
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoRef.current?.pause();
    }
  }, []);

  // Efek reveal saat scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  function handleOpen() {
    setOpen(true);
    if (media.music && audioRef.current) {
      audioRef.current.play().then(
        () => setMusicOn(true),
        () => {},
      );
    }
    setTimeout(() => videoRef.current?.pause(), 1100);
  }

  function toggleMusic() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().then(
        () => setMusicOn(true),
        () => {},
      );
    } else {
      a.pause();
      setMusicOn(false);
    }
  }

  return (
    <>
      <div id="cover" className={open ? "open" : ""} aria-hidden={open}>
        <video
          ref={videoRef}
          className="bgvid"
          src={media.video}
          poster={media.poster}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
        />
        <div className="shade" />
        <div className="frame" />
        <div className="content">
          <div className="lower">
            <div className="top">
              <div className="eyebrow">The Wedding Of</div>
              <div className="date">{event.dateLabel}</div>
            </div>
            <div className="bottom">
              <p className="to">Kepada Yth. Bapak/Ibu/Saudara/i</p>
              <p className="guest">{guest}</p>
              <button className="btn" type="button" onClick={handleOpen}>
                ✉ Buka Undangan
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="app" id="top">
        {children}
      </div>

      {media.music && (
        <>
          <audio ref={audioRef} src={media.music} loop preload="none" />
          <button
            className={`music${musicOn ? " on" : ""}`}
            type="button"
            onClick={toggleMusic}
            aria-label={musicOn ? "Matikan musik" : "Putar musik"}
          >
            🎵
          </button>
        </>
      )}

      <nav className="bottom-nav" aria-label="Navigasi bagian">
        {NAV.map((n) => (
          <a key={n.href} href={n.href} aria-label={n.label}>
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {n.icon}
            </svg>
          </a>
        ))}
      </nav>
    </>
  );
}
