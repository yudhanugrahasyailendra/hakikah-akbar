import { invitation } from "@/data/invitation";
import Countdown from "./Countdown";
import CalendarButton from "./CalendarButton";
import Rsvp from "./Rsvp";

const { couple, event, opening, intro, closing, hosts, alsoInviting } =
  invitation;

export function Hero() {
  return (
    <section id="hero" className="sec">
      <div className="eyebrow">The Wedding Of</div>
      <h1>
        {couple.bride.nick}
        <span className="script">&amp;</span>
        {couple.groom.nick}
      </h1>
      <div className="date">{event.dateLabel}</div>
      <div className="scroll">SCROLL ↓</div>
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
        <h3>{couple.bride.full}</h3>
      </div>
      <div className="amp">dengan</div>
      <div className="person reveal">
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

      <h2 className="title" style={{ marginTop: 40 }}>
        Turut Mengundang
      </h2>
      <ol className="invite-grid">
        {alsoInviting.map((g) => (
          <li key={g.name}>
            {g.name}
            {"note" in g && <small>({g.note})</small>}
          </li>
        ))}
      </ol>
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
      <p style={{ margin: "10px 0 0" }}>
        Hormat kami yang mengundang:
        <br />
        {hosts.join(" & ")}
      </p>
    </footer>
  );
}
