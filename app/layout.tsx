import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan Ikha & Akbar",
  description:
    "Resepsi Pernikahan Ikha & Akbar — Ahad, 25 Oktober 2026, pukul 10.00 WITA di Kaluarrang, Desa Manjapai, Kec. Bonto Nompo, Kab. Gowa.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Undangan Pernikahan Ikha & Akbar",
    description: "Ahad, 25 Oktober 2026 · Kaluarrang, Desa Manjapai, Kab. Gowa",
    images: ["/media/opening-poster.jpg"],
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${greatVibes.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
