"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { invitation } from "@/data/invitation";

const noopSubscribe = () => () => {};
const getGuest = () =>
  new URLSearchParams(window.location.search).get("to")?.trim().slice(0, 60) ?? "";

const NAV = [
  { href: "#top", icon: "🏠", label: "Awal" },
  { href: "#mempelai", icon: "👫", label: "Mempelai" },
  { href: "#date", icon: "📅", label: "Acara" },
  { href: "#gallery", icon: "📸", label: "Galeri" },
  { href: "#gift", icon: "🎁", label: "Hadiah" },
  { href: "#rsvp", icon: "💌", label: "Ucapan" },
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
            {n.icon}
          </a>
        ))}
      </nav>
    </>
  );
}
