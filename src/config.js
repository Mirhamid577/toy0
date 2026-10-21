/*
 * Barcha ma'lumotlar bitta joyda — faqat shu faylni o'zgartirsangiz, butun
 * sayt yangilanadi (ism, sana, manzil, aloqa, rasmlar va h.k.).
 */

export const config = {
  groom: "Muhammad",
  bride: "Xadicha",
  family: "Abdurahmonovlar",

  // Sana
  date: { year: 2026, month: 12, day: 16 },
  weekday: "CHORSHANBA",
  monthUz: "DEKABR",
  monthLatin: "December",
  timeLabel: "18:00",
  endTimeLabel: "20:00",

  // Joy
  venueName: "Navro'z To'yxonasi",
  venueAddress: "Toshkent viloyati, Chirchiq shahri",
  mapEmbed:
    "https://yandex.uz/map-widget/v1/geo/toshkent/771288885/?ll=69.279737%2C41.311151&z=12",

  /*
   * FON RASMI (foni orqasidagi foto).
   * Ixtiyoriy ravishda o'zgartiring:
   *   1) Rasmni `public/images/` ichiga soling (masalan background.jpg)
   *   2) `src` maydoniga o'z yo'lingizni yozing: "/images/background.jpg"
   * Agar `src` bo'sh bo'lsa — sayt avtomatik ravishda quyidagilarni tekshiradi:
   * /images/background.jpg, /images/background.webp, /images/background.png
   * va topilgan birinchi fonni ishlatadi (oxirida — shablonning o'z foni).
   */
  background: {
    src: "", // masalan: "/images/background.jpg"
    autoDetect: true, // config bo'sh bo'lsa avtomatik qidiradi
    mode: "auto", // "auto" | "cover" (butun ekran) | "stretch" (sahifa bo'ylab)
    opacity: 0.32, // rasmning shaffofligi (0 - 1)
    veil: "rgba(255,255,255,0.66)", // ustidan yopiladigan oq parvoz
    blur: 0, // px, ixtiyoriy xira qilish
    position: "center top", // CSS object-position
  },

  // Rasmlar ("Bizning hikoyamiz" galereyasi)
  gallery: [
    "/images/templates/orchid-amplop/gallery-2.webp",
    "/images/templates/orchid-amplop/gallery-1.webp",
    "/images/templates/orchid-amplop/gallery-3.webp",
    "/images/templates/orchid-amplop/gallery-6.webp",
    "/images/templates/orchid-amplop/gallery-4.webp",
  ],

  // Taklifnoma matni va footer
  invitationText: "Sizni hayotimizdagi eng baxtli kun — to'yimizga taklif qilamiz",
  footerText: "Tashrifingiz biz uchun katta baxt.",

  // To'y kuni dasturi
  program: [
    { time: "17:00", label: "Mehmonlarni kutib olish" },
    { time: "18:00", label: "Nikoh marosimi" },
    { time: "19:00", label: "Bazm va tantana" },
  ],

  // Tilaklar
  wishes: [
    { name: "Azizbek", text: "Baxtingiz abadiy, oilangiz doimo mehr va quvonchga to'la bo'lsin!", date: "10/15/2026" },
    { name: "Madina", text: "Nikoh to'yingiz muborak! Bir umr ahil va baxtli yashanglar.", date: "10/16/2026" },
    { name: "Shahzoda", text: "Yangi hayotingiz sevgi, hurmat va unutilmas lahzalarga boy bo'lsin!", date: "10/17/2026" },
    { name: "Javohir", text: "Sizlarga uzoq umr, mustahkam oila va cheksiz baxt tilayman!", date: "10/18/2026" },
    { name: "Dilnoza", text: "Muhabbatingiz yillar o'tgan sayin yanada mustahkam bo'lsin!", date: "10/18/2026" },
    { name: "Sardor", text: "To'yingiz muborak! Xonadoningizdan fayz, baraka va quvonch arimasin.", date: "10/18/2026" },
  ],

  // Sovg'a va aloqa (bisnes1 dagi ma'lumotlar)
  cardNumber: "5614681814533729",
  contactPhone: "+998 99 030 05 05",
  contactPhoneHref: "tel:+998990300505",
  telegram: "@Miragzamovm99",
  telegramHref: "https://t.me/Miragzamovm99",
  instagram: "@octa.weddinguz",
  instagramHref: "https://instagram.com/octa.weddinguz",

  music: "/music/Patrick Watson - Je te laisserai des mots.mp3",
};

export default config;
