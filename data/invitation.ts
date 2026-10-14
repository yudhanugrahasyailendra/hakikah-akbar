export const invitation = {
  couple: {
    bride: { full: "Hakikah Dg. Tinggong", nick: "Ikha" },
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
  hosts: ["Tabara Dg. Maling", "Sahariah Dg. Baji"],
  alsoInviting: [
    { name: "Hasdar Dg. Ta'le" },
    { name: "St. Zaenab Dg. Te'ne" },
    { name: "Jamaluddin H. Gaffar Dg. Lallo" },
    { name: "Pelda Syahrul Dg. Tika", note: "Zidam XIV/HSN" },
    { name: "Hasri, S.Kep.Ns Dg. Malengu" },
    { name: "Sirajuddin Dg. Bantang" },
    { name: "Sunardi, S.Kep Dg. Jarre" },
    { name: "Kamaruddin Dg. Sitakka", note: "Imdes Manjapai" },
    { name: "Ikrar Dg. Janji", note: "Kadus Kaluarrang" },
    { name: "Mukhtar Luthfi, S.E Dg. Gassing", note: "Imdus Kaluarrang" },
    { name: "Tallasa Dg. Rani" },
    { name: "Muh. Ali Dg. Rombo" },
    { name: "K. Dg. Sutte" },
    { name: "Romba Dg. Sakking" },
    { name: "Bahtiar Dg. Ngawing" },
  ],
  media: {
    video: "/media/opening.mp4",
    poster: "/media/opening-poster.jpg",
    music: "", // TODO: file audio dari client, mis. "/media/musik.mp3"
  },
  features: { loveStory: false, gift: false, gallery: false },
};

export type Invitation = typeof invitation;
