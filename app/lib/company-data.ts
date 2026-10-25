export interface PromoItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  durationOrPrice: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export const COMPANY_INFO = {
  name: "Duta Jagat Wisata",
  shortName: "DJW",
  slogan: "Walking Together",
  foundedYear: 2023,
  founder: "Mrs. Tio Wijaya",
  // Primary potential client contacts requested by user
  email: "tiowijaya.djw@gmail.com",
  phoneDisplay: "+62 817-5107-024",
  whatsappNumber: "628175107024",
  // Additional info from Compro PDF
  officePhone: "087844583555",
  officeEmail: "admin@dutajagatwisata.com",
  website: "dutajagatwisata.com",
  instagramHandle: "@djw_walkingtogether",
  instagramUrl: "https://instagram.com/djw_walkingtogether",
};

/**
 * Generates a direct WhatsApp URL (https://wa.me/628175107024?text=...)
 * so potential clients immediately open a chat with DJW without typing any phone number.
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const defaultMsg =
    "Hello Duta Jagat Wisata (Mrs. Tio Wijaya), I would like to inquire about your travel packages and tour services.";
  const text = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`;
}

export const IDENTITY_CONTENT = {
  lead: 'Welcome to Duta Jagat Wisata, a dynamic Indonesian tour agency dedicated to creating exceptional travel experiences. Guided by our philosophy of "Walking Together," we partner with our clients and global counterparts to navigate the world, fostering connections and making every journey a seamless adventure.',
  body: 'Duta Jagat Wisata (DJW) is an emerging and vibrant Indonesian tour agency, founded in 2023 with a mission to connect travelers with exceptional experiences across the globe. Driven by a spirit of adventure and a commitment to professional service, DJW quickly established itself as a trusted partner in travel. Our core philosophy, "Walking Together," encapsulates our dedication to building strong relationships with our clients and global partners, ensuring every journey is memorable, seamless, and enriching.',
  featuredImage: "/images/compro/page2_img3_xref117_480x560.jpeg",
  featuredCaption: "Jiefangbei (Liberation Monument), Chongqing — Walking Together across the globe",
};

export const PHILOSOPHY_CONTENT = {
  headline:
    "At Duta Jagat Wisata, we believe that travel is more than just a destination, it’s a journey of partnership.",
  body: 'Our slogan, "Walking Together," is a promise to our clients and partners. We act as a trusted friend, ensuring every tour is thoughtfully planned, safe, and filled with joy. We blend a cheerful, adventurous spirit with a steadfast commitment to professionalism, offering services that are both reliable and personalized. We are here to guide, assist, and share the wonder of the world, one step at a time.',
  mosaicImages: [
    {
      src: "/images/compro/page3_img2_xref146_401x257.jpeg",
      alt: "Warm group dining experience",
      borderColor: "border-[#EC00A8]",
      span: "col-span-6 sm:col-span-6",
    },
    {
      src: "/images/compro/page3_img3_xref150_386x275.jpeg",
      alt: "Group tour memories and souvenirs",
      borderColor: "border-[#1542C8]",
      span: "col-span-6 sm:col-span-6",
    },
    {
      src: "/images/compro/page3_img4_xref154_252x275.jpeg",
      alt: "Cultural workshop together",
      borderColor: "border-[#EC00A8]",
      span: "col-span-4 sm:col-span-4",
    },
    {
      src: "/images/compro/page3_img5_xref158_296x263.jpeg",
      alt: "Night heritage exploration",
      borderColor: "border-[#21B2DD]",
      span: "col-span-4 sm:col-span-4",
    },
    {
      src: "/images/compro/page3_img6_xref162_282x251.jpeg",
      alt: "City skyline night tour",
      borderColor: "border-[#EC00A8]",
      span: "col-span-4 sm:col-span-4",
    },
    {
      src: "/images/compro/page3_img7_xref166_214x294.jpeg",
      alt: "DJW team and travelers in matching blue shirts",
      borderColor: "border-[#06B856]",
      span: "col-span-4 sm:col-span-4",
    },
    {
      src: "/images/compro/page3_img8_xref170_345x297.jpeg",
      alt: "4678km cultural encounter",
      borderColor: "border-[#EC00A8]",
      span: "col-span-4 sm:col-span-4",
    },
    {
      src: "/images/compro/page3_img9_xref174_232x288.jpeg",
      alt: "Landmark group celebration",
      borderColor: "border-[#7E756E]",
      span: "col-span-4 sm:col-span-4",
    },
  ],
};

export const LEADERSHIP_CONTENT = {
  headline: "DJW is led by its visionary founder and owner, Mrs. Tio Wijaya.",
  intro:
    "Mrs. Tio’s leadership is defined by a hands-on approach and a commitment to excellence. Her professional credentials include:",
  photo: "/images/compro/page4_img2_xref218_575x726.jpeg",
  credentials: [
    {
      title: "Owner and Tour Leader",
      badge: "Hands-On Leadership",
      description:
        "Directly overseeing all operations and personally leading tours to ensure client satisfaction.",
      accent: "from-[#1542C8] to-[#21B2DD]",
    },
    {
      title: "BNSP Certified",
      badge: "Official Certification",
      description:
        "Holding a certification from the Badan Nasional Sertifikasi Profesi (BNSP), a testament to her professional competence and skill as a tour leader.",
      accent: "from-[#06B856] to-[#21B2DD]",
    },
    {
      title: "Industry Affiliations",
      badge: "ITLA & ITMA Member",
      description:
        "An active and contributing member of the Indonesian Tour Leader Association (ITLA) and the Indonesian Tour Leader Moslem Association (ITMA), staying at the forefront of industry standards and practices.",
      accent: "from-[#EC00A8] to-[#1542C8]",
    },
  ],
};

export const TOUR_ARRANGEMENTS = [
  {
    title: "Private Tours",
    tag: "Exclusive & Personalized",
    description:
      "Exclusive trips designed for your comfort and specific interests, with flexible pacing for families, couples, and private groups.",
    color: "#1542C8",
    bgLight: "bg-blue-50/80",
    borderLight: "border-blue-200/80",
  },
  {
    title: "Open Trips",
    tag: "Social & Scheduled",
    description:
      "Join scheduled group tours to meet new people and explore iconic new destinations together with a joyful community.",
    color: "#EC00A8",
    bgLight: "bg-pink-50/80",
    borderLight: "border-pink-200/80",
  },
  {
    title: "Series Trips",
    tag: "Themed Curations",
    description:
      "Curated travel packages with special seasonal themes, cultural immersions, or multi-country ongoing journeys.",
    color: "#06B856",
    bgLight: "bg-emerald-50/80",
    borderLight: "border-emerald-200/80",
  },
  {
    title: "Incentive Tours",
    tag: "Corporate & Gatherings",
    description:
      "Tailored for corporate employee rewards or company gatherings designed to boost team spirit and collaboration.",
    color: "#21B2DD",
    bgLight: "bg-cyan-50/80",
    borderLight: "border-cyan-200/80",
  },
];

export const DESTINATIONS = {
  outbound: {
    title: "Outbound Tours (International)",
    subtitle: "Seamless global adventures with full visa & tour leader support",
    places: ["Europe", "Asia", "Australia", "USA", "Africa"],
  },
  inbound: {
    title: "Inbound Tours (Domestic)",
    subtitle: "Discover the breathtaking archipelago of Indonesia",
    places: [
      "Sumatera",
      "Java",
      "Bali",
      "Lombok",
      "Labuan Bajo",
      "Karimun Jawa",
      "Belitung Islands",
    ],
  },
};

export const OTHER_SERVICES = [
  {
    title: "Ticketing",
    description:
      "Providing tickets for flights, trains, and other forms of domestic and international transportation.",
    iconName: "ticket",
  },
  {
    title: "Visa Assistance",
    description:
      "Comprehensive assistance with the visa application process and documentation for international travel.",
    iconName: "passport",
  },
  {
    title: "Merchandise",
    description:
      "Providing exclusive, customized travel merchandise and apparel related to your group trip.",
    iconName: "gift",
  },
  {
    title: "Bike Park",
    description:
      "Specialized logistics, arrangements, and support services for biking community events or cycling tours.",
    iconName: "bike",
  },
];

export interface PortfolioPhoto {
  id: string;
  src: string;
  title: string;
  location: string;
  category: "Europe & Türkiye" | "East Asia" | "Southeast Asia" | "Domestic & Group";
  aspect: "landscape" | "portrait" | "wide";
}

export const PORTFOLIO_PHOTOS: PortfolioPhoto[] = [
  {
    id: "pf-1",
    src: "/images/compro/page6_img2_xref304_832x624.jpeg",
    title: "Mount Fuji 5th Station Group Tour",
    location: "Yamanashi, Japan",
    category: "East Asia",
    aspect: "landscape",
  },
  {
    id: "pf-2",
    src: "/images/compro/page8_img1_xref348_592x789.jpeg",
    title: "Cologne Cathedral (Kölner Dom)",
    location: "Cologne, Germany",
    category: "Europe & Türkiye",
    aspect: "portrait",
  },
  {
    id: "pf-3",
    src: "/images/compro/page8_img2_xref350_763x374.jpeg",
    title: "Alpine Lake Village Panorama",
    location: "Hallstatt, Austria",
    category: "Europe & Türkiye",
    aspect: "wide",
  },
  {
    id: "pf-4",
    src: "/images/compro/page6_img7_xref314_800x319.jpeg",
    title: "Traditional Kimono Cultural Walk",
    location: "Kyoto, Japan",
    category: "East Asia",
    aspect: "wide",
  },
  {
    id: "pf-5",
    src: "/images/compro/page7_img4_xref335_768x346.jpeg",
    title: "Schönbrunn Imperial Palace",
    location: "Vienna, Austria",
    category: "Europe & Türkiye",
    aspect: "wide",
  },
  {
    id: "pf-6",
    src: "/images/compro/page9_img1_xref367_616x717.jpeg",
    title: "Island Paradise Holiday",
    location: "Bali, Indonesia",
    category: "Domestic & Group",
    aspect: "portrait",
  },
  {
    id: "pf-7",
    src: "/images/compro/page6_img6_xref312_561x420.jpeg",
    title: "3-Countries New Year Holiday (SG • MY • TH)",
    location: "Batu Caves, Malaysia",
    category: "Southeast Asia",
    aspect: "landscape",
  },
  {
    id: "pf-8",
    src: "/images/compro/page7_img2_xref331_640x480.jpeg",
    title: "Mount Erciyes Winter Adventure",
    location: "Kayseri / Cappadocia, Türkiye",
    category: "Europe & Türkiye",
    aspect: "landscape",
  },
  {
    id: "pf-9",
    src: "/images/compro/page8_img4_xref354_462x640.jpeg",
    title: "Chiyou Jiuli City & Traditional Miao Attire",
    location: "Chongqing, China",
    category: "East Asia",
    aspect: "portrait",
  },
  {
    id: "pf-10",
    src: "/images/compro/page7_img1_xref329_540x960.jpeg",
    title: "Historic Ottoman Village Exploration",
    location: "Cumalıkızık, Bursa, Türkiye",
    category: "Europe & Türkiye",
    aspect: "portrait",
  },
  {
    id: "pf-11",
    src: "/images/compro/page9_img4_xref373_649x567.jpeg",
    title: "Rainbow Steps Highland Tour",
    location: "Vietnam Highlands",
    category: "Southeast Asia",
    aspect: "landscape",
  },
  {
    id: "pf-12",
    src: "/images/compro/page6_img1_xref302_635x475.jpeg",
    title: "Millennium City Park (Qingming Shanghe Yuan)",
    location: "Kaifeng, China",
    category: "East Asia",
    aspect: "landscape",
  },
  {
    id: "pf-13",
    src: "/images/compro/page8_img3_xref352_799x600.jpeg",
    title: "Bursa International Tourism Summit & B2B",
    location: "Bursa, Türkiye",
    category: "Europe & Türkiye",
    aspect: "landscape",
  },
  {
    id: "pf-14",
    src: "/images/compro/page9_img3_xref371_717x566.jpeg",
    title: "Historic Red Square Stadthuys Group Tour",
    location: "Melaka, Malaysia",
    category: "Southeast Asia",
    aspect: "landscape",
  },
  {
    id: "pf-15",
    src: "/images/compro/page7_img3_xref333_768x374.jpeg",
    title: "Winter Palace Courtyard Gathering",
    location: "Vienna, Austria",
    category: "Europe & Türkiye",
    aspect: "wide",
  },
  {
    id: "pf-16",
    src: "/images/compro/page7_img5_xref337_474x631.jpeg",
    title: "Manneken Pis Festive Winter Stroll",
    location: "Brussels, Belgium",
    category: "Europe & Türkiye",
    aspect: "portrait",
  },
  {
    id: "pf-17",
    src: "/images/compro/page8_img5_xref356_384x512.jpeg",
    title: "Casa Manila Heritage Quarter",
    location: "Intramuros, Manila, Philippines",
    category: "Southeast Asia",
    aspect: "portrait",
  },
  {
    id: "pf-18",
    src: "/images/compro/page6_img4_xref308_571x428.jpeg",
    title: "International Departure with DJW Flag",
    location: "Soekarno-Hatta International Airport",
    category: "Domestic & Group",
    aspect: "landscape",
  },
  {
    id: "pf-19",
    src: "/images/compro/page9_img2_xref369_524x699.jpeg",
    title: "Joyful Evening Group Outing",
    location: "Guided by Mrs. Tio Wijaya",
    category: "Domestic & Group",
    aspect: "portrait",
  },
  {
    id: "pf-20",
    src: "/images/compro/page6_img3_xref306_640x431.jpeg",
    title: "China Expedition Group Arrival",
    location: "Mainland China",
    category: "East Asia",
    aspect: "landscape",
  },
];

