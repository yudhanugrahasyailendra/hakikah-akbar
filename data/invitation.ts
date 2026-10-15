export const invitation = {
  couple: {
    bride: { full: "Hakikah Dg. Tinggong", nick: "Ikha", 
      parents: "Putri Pertama dari Tabara Dg Maling & Sahariah Dg. Baji",
    },
    groom: {
      full: "Akbar Pardamean Lumban Tobing, S.E Dg. Malik",
      nick: "Akbar",
      parents: "Putra Pertama dari Marulam L. Tobing & Mardiana Malik",
    },
    monogram: "Ikha & Akbar",
  },
  opening: {
    basmalah: "Bismillahirrahmanirrahim",
    lines: [
      "Maha suci Allah",
      "yang telah menciptakan makhluk-Nya berpasang-pasangan,",
      "Ya Allah, perkenankanlah kami menikahkan putra-putri kami",
    ],
  },
  intro: {
    salam: "Assalamu Alaikum Warahmatullahi Wabarakatuh",
    lines: [
      "Dengan memohon Ridho dan Rahmat Allah SWT,",
      "kami bermaksud menyelenggarakan Resepsi Pernikahan anak/kemanakan/cucu kami",
      "Yang Insya Allah akan dilaksanakan pada :",
    ],
  },
  event: {
    name: "Resepsi Pernikahan",
    dateLabel: "Ahad, 25 Oktober 2026",
    startISO: "2026-10-25T10:00:00+08:00",
    endISO: "2026-10-25T14:00:00+08:00",
    timeLabel: "10.00 WITA - Selesai (Acara Siang)",
    place: "Kaluarrang, Desa Manjapai",
    region: "Kec. Bonto Nompo, Kab. Gowa",
    mapsUrl: "", // TODO dari client
  },
  closing: {
    lines: [
      "Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara(i) berkenan hadir untuk memberikan doa restu kepada kedua mempelai",
    ],
    salam: "Wassalamu Alaikum Warahmatullahi Wabarakatuh",
  },
  hosts: ["Marulam L. Tobing", "Mardiana Malik"],
  alsoInviting: [],
  media: {
    video: "/media/opening.mp4",
    poster: "/media/opening-poster.jpg",
    music: "/media/Sheila On 7 - Hingga Ujung Waktu.mp3",
  },
  // Semua foto dari public/media/gallery. `pos` = titik fokus crop.
  gallery: [
    {
      src: "/media/gallery/g3.jpeg",
      alt: "Foto prewedding Ikha & Akbar 3",
      pos: "50% 30%",
    },
    {
      src: "/media/gallery/g2.jpeg",
      alt: "Foto prewedding Ikha & Akbar 2",
      pos: "50% 30%",
    },

    {
      src: "/media/gallery/g8.jpeg",
      alt: "Foto prewedding Ikha & Akbar 8",
      pos: "50% 30%",
    },
    {
      src: "/media/gallery/g9.jpeg",
      alt: "Foto prewedding Ikha & Akbar 9",
      pos: "50% 30%",
    },
    {
      src: "/media/gallery/g10.jpeg",
      alt: "Foto prewedding Ikha & Akbar 10",
      pos: "50% 30%",
    },
    {
      src: "/media/gallery/g11.jpeg",
      alt: "Foto prewedding Ikha & Akbar 11",
      pos: "50% 30%",
    },
    {
      src: "/media/gallery/g12.jpeg",
      alt: "Foto prewedding Ikha & Akbar 12",
      pos: "50% 30%",
    },
    {
      src: "/media/gallery/g13.jpeg",
      alt: "Foto prewedding Ikha & Akbar 13",
      pos: "50% 30%",
    },
    {
      src: "/media/gallery/g14.jpeg",
      alt: "Foto prewedding Ikha & Akbar 14",
      pos: "50% 30%",
    },

    {
      src: "/media/gallery/g7.jpeg",
      alt: "Foto prewedding Ikha & Akbar 7",
      pos: "50% 30%",
    },
    {
      src: "/media/gallery/g1.jpeg",
      alt: "Foto prewedding Ikha & Akbar 1",
      pos: "50% 30%",
    },
  ],
  gift: {
    note: "Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, dapat melalui rekening berikut:",
    // TODO: ganti dengan data rekening asli dari client
    accounts: [
      { bank: "BCA", number: "8735065391", name: "Akbar Pardamean L T SE" },
    ],
  },
  features: { loveStory: false, gift: false, gallery: false },
};

export type Invitation = typeof invitation;
