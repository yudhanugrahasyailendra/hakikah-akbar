import Image from "next/image";
import { invitation } from "@/data/invitation";
import Countdown from "./Countdown";
import CalendarButton from "./CalendarButton";
import Rsvp from "./Rsvp";
import Gallery from "./Gallery";
import Gift from "./Gift";

const { couple, event, opening, intro, closing, hosts } =
  invitation;

export function Hero() {
  return (
    <section id="hero" className="sec">
      <video
        className="hero-video"
        src="/media/Ikha Akbar.mp4"
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        aria-hidden="true"
      />
      <div className="hero-content">
        <div className="hero-line" />
        <div className="date">{event.dateLabel}</div>
        <div className="scroll">SCROLL ↓</div>
      </div>
    </section>
  );
}

export function Couple() {
  return (
    <section id="mempelai" className="sec">
      <p className="basmalah reveal">{opening.basmalah}</p>
      <p className="quote reveal">{opening.lines.join(" ")}</p>
      <div className="divider" />
      <div className="eyebrow">Bride &amp; Groom</div>
      <h2 className="title">Mempelai</h2>

      <div className="person reveal">
        <div className="arch">
          <div className="arch-img">
            <Image
              src="/media/Hakikah 222.jpeg"
              alt={couple.bride.full}
              fill
              sizes="(max-width: 480px) 70vw, 280px"
              style={{ objectPosition: "50% 8%" }}
            />
          </div>
        </div>
        <h3>{couple.bride.full}</h3>
        <p>({couple.bride.parents})</p>
      </div>
      <div className="amp">dengan</div>
      <div className="person reveal">
        <div className="arch">
          <div className="arch-img">
            <Image
              src="/media/Akbar 111.jpeg"
              alt={couple.groom.full}
              fill
              sizes="(max-width: 480px) 70vw, 280px"
              style={{ objectPosition: "50% 0%" }}
            />
          </div>
        </div>
        <h3>{couple.groom.full}</h3>
        <p>({couple.groom.parents})</p>
      </div>
    </section>
  );
}

export function SaveTheDate() {
  return (
    <section id="date" className="sec alt">
      <p className="salam reveal">{intro.salam}</p>
      <p className="prose reveal">{intro.lines.join(" ")}</p>
      <div className="divider" />
      <div className="eyebrow">Save The Date</div>
      <h2 className="title">Menuju Hari Bahagia</h2>
      <Countdown />
      <CalendarButton />

      <div className="card reveal" style={{ marginTop: 34 }}>
        <h3>{event.name}</h3>
        <div className="big">{event.dateLabel}</div>
        <small>Pukul {event.timeLabel}</small>
        <p style={{ fontSize: 14 }}>
          {event.place}
          <br />
          {event.region}
        </p>
        {event.mapsUrl && (
          <a
            className="btn"
            style={{ marginTop: 16 }}
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            📍 Buka Peta
          </a>
        )}
      </div>
    </section>
  );
}

export function GallerySection() {
  return (
    <section id="gallery" className="sec alt">
      <div className="eyebrow">Our Moments</div>
      <h2 className="title">Potret Cerita Kami</h2>
      <div className="divider" />
      <p className="quote reveal" style={{ marginBottom: 28 }}>
        Setiap senyum, setiap tatap, dan setiap langkah menuju hari bahagia ini
        adalah doa yang Allah jawab dengan indah. Inilah sepotong kisah kami
        yang ingin kami bagikan kepada Anda.
      </p>
      <Gallery />
    </section>
  );
}

export function GiftSection() {
  return (
    <section id="gift" className="sec">
      <div className="eyebrow">Wedding Gift</div>
      <h2 className="title">Tanda Kasih</h2>
      <div className="divider" />
      <Gift />
    </section>
  );
}

export function RsvpSection() {
  return (
    <section id="rsvp" className="sec">
      <div className="eyebrow">RSVP</div>
      <h2 className="title">💌 Ucapan &amp; Doa</h2>
      <div className="divider" />
      <Rsvp />
    </section>
  );
}

export function InvitedBy() {
  return (
    <section id="invite" className="sec alt">
      <p className="prose reveal">{closing.lines[0]}</p>
      <p className="salam reveal">{closing.salam}</p>
      <div className="divider" />
      <div className="eyebrow">Hormat kami yang mengundang</div>
      <p className="hosts">{hosts.join(" & ")}</p>


    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="eyebrow" style={{ color: "#e6c9c4" }}>
        Terima Kasih
      </div>
      <div className="script">{couple.monogram}</div>
    </footer>
  );
}
