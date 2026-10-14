import { invitation } from "@/data/invitation";

const fmt = (iso: string) =>
  new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function buildIcs(): string {
  const { event, couple } = invitation;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Undangan Ikha & Akbar//ID",
    "BEGIN:VEVENT",
    `UID:${fmt(event.startISO)}@undangan-ikha-akbar`,
    `DTSTAMP:${fmt(new Date().toISOString())}`,
    `DTSTART:${fmt(event.startISO)}`,
    `DTEND:${fmt(event.endISO)}`,
    `SUMMARY:${event.name} ${couple.monogram}`,
    `LOCATION:${event.place}\\, ${event.region}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
