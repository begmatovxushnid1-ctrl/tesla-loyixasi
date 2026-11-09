export type Language = "uz" | "en";

export interface TrimOption {
  id: string;
  name: { uz: string; en: string };
  drive: { uz: string; en: string };
  price: number;
  rangeKm: number;
  topSpeedKmh: number;
  zeroToHundred: string;
  peakPowerHp: number;
}

export interface PaintOption {
  id: string;
  name: { uz: string; en: string };
  hex: string;
  secondaryHex: string;
  price: number;
}

export interface WheelOption {
  id: string;
  name: { uz: string; en: string };
  size: string;
  price: number;
  rangeDeltaKm: number;
  style: "aero" | "sport" | "uberturbine" | "arachnid" | "cyber";
}

export interface InteriorOption {
  id: string;
  name: { uz: string; en: string };
  hex: string;
  accentHex: string;
  price: number;
}

export interface VehicleModel {
  id: string;
  slug: string;
  name: string;
  category: "vehicle" | "energy" | "accessories";
  bodyStyle: "suv" | "sedan" | "cybertruck" | "solar" | "accessories";
  tagline: { uz: string; en: string };
  subTagline: { uz: string; en: string };
  startingPrice: number;
  leaseMonthly: number;
  heroBgImage: string;
  theme: "dark" | "light";
  cargoLiters?: number;
  seating?: string;
  trims: TrimOption[];
  paints: PaintOption[];
  wheels: WheelOption[];
  interiors: InteriorOption[];
}

export const PAINTS_STANDARD: PaintOption[] = [
  {
    id: "stealth-grey",
    name: { uz: "Stealth Grey (Kulrang metallik)", en: "Stealth Grey" },
    hex: "#3b3e45",
    secondaryHex: "#23252a",
    price: 0,
  },
  {
    id: "pearl-white",
    name: { uz: "Pearl White Multi-Coat (Marvarid oq)", en: "Pearl White Multi-Coat" },
    hex: "#f2f4f7",
    secondaryHex: "#cfd5de",
    price: 1000,
  },
  {
    id: "deep-blue",
    name: { uz: "Deep Blue Metallic (To'q ko'k)", en: "Deep Blue Metallic" },
    hex: "#1b356b",
    secondaryHex: "#0f2044",
    price: 1000,
  },
  {
    id: "solid-black",
    name: { uz: "Solid Black (Tim qora)", en: "Solid Black" },
    hex: "#141518",
    secondaryHex: "#08080a",
    price: 1500,
  },
  {
    id: "quicksilver",
    name: { uz: "Quicksilver (Kumushrang)", en: "Quicksilver" },
    hex: "#9ba2ae",
    secondaryHex: "#69707d",
    price: 2000,
  },
  {
    id: "ultra-red",
    name: { uz: "Ultra Red (Alvon qizil)", en: "Ultra Red" },
    hex: "#a81323",
    secondaryHex: "#680913",
    price: 2000,
  },
];

export const PAINTS_CYBERTRUCK: PaintOption[] = [
  {
    id: "stainless-steel",
    name: { uz: "Ultra-Hard Stainless Steel (Po'lat)", en: "Ultra-Hard Stainless Steel" },
    hex: "#b5bac2",
    secondaryHex: "#7b8089",
    price: 0,
  },
  {
    id: "satin-black",
    name: { uz: "Satin Stealth Black Wrap (Mat qora)", en: "Satin Stealth Black Wrap" },
    hex: "#1c1d21",
    secondaryHex: "#0e0f12",
    price: 6500,
  },
  {
    id: "satin-white",
    name: { uz: "Satin Ceramic White Wrap (Mat oq)", en: "Satin Ceramic White Wrap" },
    hex: "#e9ecf0",
    secondaryHex: "#b8bec7",
    price: 6000,
  },
  {
    id: "tactical-green",
    name: { uz: "Tactical Matte Green (Harbiy yashil)", en: "Tactical Matte Green" },
    hex: "#3a4639",
    secondaryHex: "#222921",
    price: 6500,
  },
];

export const INTERIORS_STANDARD: InteriorOption[] = [
  {
    id: "all-black",
    name: { uz: "To'liq qora salon (All Black)", en: "All Black Interior" },
    hex: "#18191c",
    accentHex: "#2e3138",
    price: 0,
  },
  {
    id: "black-white",
    name: { uz: "Qora va Oq premium salon", en: "Black and White Interior" },
    hex: "#eef0f4",
    accentHex: "#1c1e24",
    price: 1000,
  },
  {
    id: "cream",
    name: { uz: "Krem rangli salon (Cream)", en: "Cream Interior" },
    hex: "#dfd3be",
    accentHex: "#3a342b",
    price: 2000,
  },
];

export const VEHICLES: VehicleModel[] = [
  {
    id: "modely",
    slug: "modely",
    name: "Model Y",
    category: "vehicle",
    bodyStyle: "suv",
    tagline: {
      uz: "Oyiga $399 dan lizing yoki $37,490 dan boshlab",
      en: "Lease starting at $399/mo or $37,490",
    },
    subTagline: {
      uz: "Dunyodagi eng ko'p sotilgan elektr krossover",
      en: "The world's best-selling electric SUV",
    },
    startingPrice: 37490,
    leaseMonthly: 399,
    heroBgImage:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=2000&q=85",
    theme: "dark",
    cargoLiters: 2158,
    seating: "5 / 7",
    trims: [
      {
        id: "rwd",
        name: { uz: "Orqa tortish (Rear-Wheel Drive)", en: "Rear-Wheel Drive" },
        drive: { uz: "RWD • Orqa g'ildirak", en: "RWD" },
        price: 37490,
        rangeKm: 515,
        topSpeedKmh: 217,
        zeroToHundred: "6.6",
        peakPowerHp: 340,
      },
      {
        id: "awd",
        name: { uz: "Long Range All-Wheel Drive", en: "Long Range All-Wheel Drive" },
        drive: { uz: "Dual Motor AWD • To'liq tortish", en: "Dual Motor All-Wheel Drive" },
        price: 44990,
        rangeKm: 565,
        topSpeedKmh: 217,
        zeroToHundred: "4.8",
        peakPowerHp: 450,
      },
      {
        id: "performance",
        name: { uz: "Model Y Performance", en: "Model Y Performance" },
        drive: { uz: "Dual Motor AWD • Yuqori quvvat", en: "Performance All-Wheel Drive" },
        price: 51490,
        rangeKm: 514,
        topSpeedKmh: 250,
        zeroToHundred: "3.5",
        peakPowerHp: 534,
      },
    ],
    paints: PAINTS_STANDARD,
    wheels: [
      {
        id: "19-gemini",
        name: { uz: "19'' Gemini Dark disklar", en: "19'' Gemini Dark Wheels" },
        size: "19\"",
        price: 0,
        rangeDeltaKm: 0,
        style: "aero",
      },
      {
        id: "20-induction",
        name: { uz: "20'' Induction Qora disklar", en: "20'' Induction Wheels" },
        size: "20\"",
        price: 2000,
        rangeDeltaKm: -28,
        style: "sport",
      },
      {
        id: "21-uberturbine",
        name: { uz: "21'' Überturbine sport disklar", en: "21'' Überturbine Wheels" },
        size: "21\"",
        price: 3000,
        rangeDeltaKm: -42,
        style: "uberturbine",
      },
    ],
    interiors: INTERIORS_STANDARD.slice(0, 2),
  },
  {
    id: "model3",
    slug: "model3",
    name: "Model 3",
    category: "vehicle",
    bodyStyle: "sedan",
    tagline: {
      uz: "Yangilangan Highland dizayni • $34,990 dan boshlab",
      en: "Upgraded Highland Design • Starting at $34,990",
    },
    subTagline: {
      uz: "Maksimal aerodinamika, akustik oynalar va orqa ekran",
      en: "Maximum aerodynamics, acoustic glass & rear touchscreen",
    },
    startingPrice: 34990,
    leaseMonthly: 349,
    heroBgImage:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=2000&q=85",
    theme: "dark",
    cargoLiters: 682,
    seating: "5",
    trims: [
      {
        id: "rwd",
        name: { uz: "Orqa tortish (Rear-Wheel Drive)", en: "Rear-Wheel Drive" },
        drive: { uz: "RWD • Orqa g'ildirak", en: "RWD" },
        price: 34990,
        rangeKm: 549,
        topSpeedKmh: 201,
        zeroToHundred: "5.8",
        peakPowerHp: 325,
      },
      {
        id: "awd",
        name: { uz: "Long Range All-Wheel Drive", en: "Long Range All-Wheel Drive" },
        drive: { uz: "Dual Motor AWD • To'liq tortish", en: "Dual Motor All-Wheel Drive" },
        price: 42490,
        rangeKm: 629,
        topSpeedKmh: 201,
        zeroToHundred: "4.2",
        peakPowerHp: 440,
      },
      {
        id: "performance",
        name: { uz: "Model 3 Performance", en: "Model 3 Performance" },
        drive: { uz: "Dual Motor AWD • Track Mode V3", en: "Performance All-Wheel Drive" },
        price: 54990,
        rangeKm: 528,
        topSpeedKmh: 262,
        zeroToHundred: "2.9",
        peakPowerHp: 510,
      },
    ],
    paints: PAINTS_STANDARD,
    wheels: [
      {
        id: "18-photon",
        name: { uz: "18'' Photon Aero disklar", en: "18'' Photon Wheels" },
        size: "18\"",
        price: 0,
        rangeDeltaKm: 0,
        style: "aero",
      },
      {
        id: "19-nova",
        name: { uz: "19'' Nova Sport disklar", en: "19'' Nova Wheels" },
        size: "19\"",
        price: 1500,
        rangeDeltaKm: -35,
        style: "sport",
      },
      {
        id: "20-warped",
        name: { uz: "20'' Warp Forged disklar", en: "20'' Warp Forged Wheels" },
        size: "20\"",
        price: 2500,
        rangeDeltaKm: -48,
        style: "uberturbine",
      },
    ],
    interiors: INTERIORS_STANDARD.slice(0, 2),
  },
  {
    id: "modelx",
    slug: "modelx",
    name: "Model X",
    category: "vehicle",
    bodyStyle: "suv",
    tagline: {
      uz: "Falcon Wing eshiklar va 1,020 ot kuchi • $79,990 dan",
      en: "Falcon Wing Doors & 1,020 hp • From $79,990",
    },
    subTagline: {
      uz: "Eng tez va keng sig'imli premium elektr SUV",
      en: "The fastest and most spacious luxury electric SUV",
    },
    startingPrice: 79990,
    leaseMonthly: 949,
    heroBgImage:
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=2000&q=85",
    theme: "dark",
    cargoLiters: 2614,
    seating: "5 / 6 / 7",
    trims: [
      {
        id: "awd",
        name: { uz: "Model X All-Wheel Drive", en: "Model X All-Wheel Drive" },
        drive: { uz: "Dual Motor AWD • Pnevmatik podveska", en: "Dual Motor All-Wheel Drive" },
        price: 79990,
        rangeKm: 560,
        topSpeedKmh: 250,
        zeroToHundred: "3.8",
        peakPowerHp: 670,
      },
      {
        id: "plaid",
        name: { uz: "Model X Plaid (3 ta motor)", en: "Model X Plaid (Tri Motor)" },
        drive: { uz: "Tri Motor AWD • 1,020 ot kuchi", en: "Tri Motor All-Wheel Drive" },
        price: 94990,
        rangeKm: 539,
        topSpeedKmh: 262,
        zeroToHundred: "2.5",
        peakPowerHp: 1020,
      },
    ],
    paints: PAINTS_STANDARD,
    wheels: [
      {
        id: "20-cyberstream",
        name: { uz: "20'' Cyberstream disklar", en: "20'' Cyberstream Wheels" },
        size: "20\"",
        price: 0,
        rangeDeltaKm: 0,
        style: "sport",
      },
      {
        id: "22-turbine",
        name: { uz: "22'' Turbine Onyx Black disklar", en: "22'' Turbine Wheels" },
        size: "22\"",
        price: 5500,
        rangeDeltaKm: -38,
        style: "arachnid",
      },
    ],
    interiors: INTERIORS_STANDARD,
  },
  {
    id: "models",
    slug: "models",
    name: "Model S",
    category: "vehicle",
    bodyStyle: "sedan",
    tagline: {
      uz: "Plaid: 0–100 km/s atigi 1.99 soniyada • $74,990 dan",
      en: "Plaid: 0–100 km/h in 1.99s • Starting at $74,990",
    },
    subTagline: {
      uz: "Seriyali ishlab chiqariladigan eng tezkor sedan",
      en: "Highest acceleration of any vehicle in production",
    },
    startingPrice: 74990,
    leaseMonthly: 899,
    heroBgImage:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=2000&q=85",
    theme: "dark",
    cargoLiters: 793,
    seating: "5",
    trims: [
      {
        id: "awd",
        name: { uz: "Model S All-Wheel Drive", en: "Model S All-Wheel Drive" },
        drive: { uz: "Dual Motor AWD • 647 km masofa", en: "Dual Motor All-Wheel Drive" },
        price: 74990,
        rangeKm: 647,
        topSpeedKmh: 250,
        zeroToHundred: "3.1",
        peakPowerHp: 670,
      },
      {
        id: "plaid",
        name: { uz: "Model S Plaid (Tri Motor)", en: "Model S Plaid (Tri Motor)" },
        drive: { uz: "Tri Motor AWD • Karbon rotorlar", en: "Tri Motor All-Wheel Drive" },
        price: 89990,
        rangeKm: 600,
        topSpeedKmh: 322,
        zeroToHundred: "1.99",
        peakPowerHp: 1020,
      },
    ],
    paints: PAINTS_STANDARD,
    wheels: [
      {
        id: "19-tempest",
        name: { uz: "19'' Tempest Aero disklar", en: "19'' Tempest Wheels" },
        size: "19\"",
        price: 0,
        rangeDeltaKm: 0,
        style: "aero",
      },
      {
        id: "21-arachnid",
        name: { uz: "21'' Arachnid Forged disklar", en: "21'' Arachnid Wheels" },
        size: "21\"",
        price: 4500,
        rangeDeltaKm: -42,
        style: "arachnid",
      },
    ],
    interiors: INTERIORS_STANDARD,
  },
  {
    id: "cybertruck",
    slug: "cybertruck",
    name: "CYBERTRUCK",
    category: "vehicle",
    bodyStyle: "cybertruck",
    tagline: {
      uz: "O'q o'tmas ekzoskelet va Steer-by-Wire boshqaruvi",
      en: "Bulletproof Exoskeleton & Steer-by-Wire Control",
    },
    subTagline: {
      uz: "Pikapdan ko'ra foydaliroq, sportkardan ko'ra tezroq",
      en: "More utility than a truck with more performance than a sports car",
    },
    startingPrice: 79990,
    leaseMonthly: 899,
    heroBgImage:
      "https://images.unsplash.com/photo-1575090536203-2a6193126514?auto=format&fit=crop&w=2000&q=85",
    theme: "dark",
    cargoLiters: 3423,
    seating: "5",
    trims: [
      {
        id: "awd",
        name: { uz: "All-Wheel Drive (Ikki motorli)", en: "All-Wheel Drive" },
        drive: { uz: "Dual Motor AWD • 4,990 kg tortish kuchi", en: "Dual Motor AWD • 11,000 lbs towing" },
        price: 79990,
        rangeKm: 547,
        topSpeedKmh: 180,
        zeroToHundred: "4.1",
        peakPowerHp: 600,
      },
      {
        id: "cyberbeast",
        name: { uz: "CYBERBEAST (Uch motorli)", en: "CYBERBEAST (Tri Motor)" },
        drive: { uz: "Tri MotorBeast Mode • 845 ot kuchi", en: "Tri Motor AWD • 845 hp" },
        price: 99990,
        rangeKm: 515,
        topSpeedKmh: 209,
        zeroToHundred: "2.6",
        peakPowerHp: 845,
      },
    ],
    paints: PAINTS_CYBERTRUCK,
    wheels: [
      {
        id: "20-core",
        name: { uz: "20'' Core All-Season (35'' shina)", en: "20'' Core Wheels with 35'' Tires" },
        size: "20\"",
        price: 0,
        rangeDeltaKm: 0,
        style: "cyber",
      },
      {
        id: "20-cyber",
        name: { uz: "20'' Cyber All-Terrain disklar", en: "20'' Cyber Wheels with All-Terrain Tires" },
        size: "20\"",
        price: 3500,
        rangeDeltaKm: -30,
        style: "cyber",
      },
    ],
    interiors: [
      {
        id: "tactical-grey",
        name: { uz: "Tactical Grey (Oq dekor bilan)", en: "Tactical Grey Decor" },
        hex: "#2a2d33",
        accentHex: "#d5dae2",
        price: 0,
      },
      {
        id: "cyber-white",
        name: { uz: "Foundation White Alcantara", en: "Foundation Series White" },
        hex: "#e5e8ee",
        accentHex: "#1b1d22",
        price: 2000,
      },
    ],
  },
];

export const AUTOPILOT_PACKAGES = [
  {
    id: "basic",
    name: { uz: "Bazaviy Avtopilot (Standart)", en: "Basic Autopilot (Included)" },
    price: 0,
    features: {
      uz: [
        "Yo'lakda avtomatik rul boshqaruvi (Autosteer)",
        "Trafikka moslashuvchi kruiz-kontrol (Traffic-Aware Cruise Control)",
        "Avtomatik favqulodda tormozlash va ko'rinmas zona ogohlantirishi",
      ],
      en: [
        "Traffic-Aware Cruise Control",
        "Autosteer in your lane",
        "Automatic Emergency Braking & Blind Spot Monitoring",
      ],
    },
  },
  {
    id: "eap",
    name: { uz: "Kengaytirilgan Avtopilot (Enhanced Autopilot)", en: "Enhanced Autopilot" },
    price: 4000,
    features: {
      uz: [
        "Avtomatik yo'lak almashtirish (Auto Lane Change)",
        "Avtoparkovka: parallel va perpendikulyar joylashish (Autopark)",
        "Dumb Summon va Actually Smart Summon (Masofadan chaqirish)",
      ],
      en: [
        "Auto Lane Change on highway",
        "Autopark (parallel and perpendicular spaces)",
        "Actually Smart Summon — car comes to you in parking lots",
      ],
    },
  },
  {
    id: "fsd",
    name: {
      uz: "To'liq Avtonom Boshqaruv — Full Self-Driving (Supervised)",
      en: "Full Self-Driving (Supervised)",
    },
    price: 8000,
    features: {
      uz: [
        "Svetofor va 'STOP' belgilarini avtomatik tanish va to'xtash",
        "Shahar ko'chalarida avtomatik burilish va navigatsiya",
        "Enhanced Autopilot barcha imkoniyatlari + Neural Net V13 yangilanishlari",
      ],
      en: [
        "Traffic Light and Stop Sign Control",
        "Autosteer on City Streets with automatic turns",
        "All Enhanced Autopilot features + Neural Net V13 OTA updates",
      ],
    },
  },
];

export const CHARGING_ACCESSORIES = [
  {
    id: "wall-connector",
    name: { uz: "Uy uchun Wall Connector (11.5 kW)", en: "Wall Connector (Home Fast Charger)" },
    desc: {
      uz: "Soatiga 71 km gacha masofa qo'shadi. Wi-Fi orqali Tesla ilovasiga ulanadi.",
      en: "Up to 44 mi of range added per hour. Wi-Fi enabled for OTA updates.",
    },
    price: 450,
  },
  {
    id: "mobile-connector",
    name: { uz: "Ko'chma quvvatlagich (Mobile Connector)", en: "Mobile Connector Bundle" },
    desc: {
      uz: "Oddiy 220V va sanoat rozetkalaridan istalgan joyda quvvatlash uchun.",
      en: "Plug into standard household or 240V outlets anywhere you travel.",
    },
    price: 250,
  },
];

export const TRANSLATIONS = {
  uz: {
    nav: {
      vehicles: "Avtomobillar",
      energy: "Energiya",
      charging: "Quvvatlash",
      discover: "Kashf eting",
      shop: "Do'kon",
      configure: "Konfigurator",
      compare: "Solishtirish",
      demoDrive: "Test Drayv",
      orderNow: "Buyurtma berish",
      learnMore: "Batafsil ma'lumot",
      designYours: "Konfiguratorda yig'ish",
    },
    hero: {
      range: "Masofa (WLTP)",
      zeroToHundred: "0-100 km/s",
      topSpeed: "Maks. tezlik",
      peakPower: "Quvvat",
      orderNow: "Buyurtma berish",
      demoDrive: "Test Drayvga yozilish",
      compareModels: "Modellarni solishtirish",
      solarTitle: "Quyosh Panellari va Powerwall",
      solarSubtitle: "Uyingiz uchun 24/7 toza quyosh energiyasi va zaxira batareya tizimi",
      solarCtaPrimary: "Quvvatni hisoblash",
      solarCtaSecondary: "Batafsil ko'rish",
      accessoriesTitle: "Tesla Aksessuarlari va Wall Connector",
      accessoriesSubtitle: "Avtomobilingiz uchun original quvvatlagichlar va jihozlar",
      shopNow: "Konfiguratorga o'tish",
    },
    configurator: {
      backHome: "Asosiy sahifaga",
      selectModel: "Modelni tanlang",
      cash: "Naqd",
      lease: "Lizing",
      finance: "Kredit",
      perMonth: "/ oyiga",
      estRange: "Masofa (km)",
      topSpeed: "Maks. tezlik",
      zeroToHundred: "0–100 km/s",
      viewAngles: {
        front: "Old ko'rinish",
        side: "Yon profil",
        rear: "Orqa ko'rinish",
        interior: "Salon va Ekran",
        autopilot: "Avtopilot (FSD)",
      },
      selectTrim: "Komplektatsiya va Tortish tizimi",
      paintTitle: "Tashqi rang (Bo'yoq)",
      included: "Bepul (Bazaviy)",
      wheelsTitle: "Disklar va Shinalar",
      interiorTitle: "Salon rangi va bezagi",
      autopilotTitle: "Avtopilot va Avtonom Boshqaruv",
      chargingTitle: "Quvvatlash uskunalari",
      orderSummary: "Buyurtma xulosasi",
      estimatedDelivery: "Taxminiy yetkazib berish: 2–4 hafta (Toshkent / Rasmiy markaz)",
      continueToOrder: "Buyurtmani rasmiylashtirish",
      orderModalTitle: "Tesla Buyurtmangiz Tayyor!",
      orderModalSubtitle: "Ma'lumotlaringizni qoldiring — shaxsiy Tesla maslahatchimiz siz bilan bog'lanadi.",
      fullName: "Ism va familiyangiz",
      phone: "Telefon raqamingiz",
      city: "Shaharni tanlang",
      confirmOrder: "Buyurtmani tasdiqlash",
      orderSuccessTitle: "Tabriklaymiz! Buyurtmangiz qabul qilindi",
      orderSuccessDesc: "Sizning konfiguratsiya kodingiz saqlandi. Tez orada mutaxassisimiz siz bilan bog'lanadi.",
      close: "Yopish",
    },
    demoModal: {
      title: "Tesla Test Drayvga Yozilish",
      subtitle: "Elektr tezlanish va Full Self-Driving texnologiyasini shaxsan his qilib ko'ring.",
      selectVehicle: "Modelni tanlang",
      selectLocation: "Markazni tanlang",
      selectDate: "Sana va vaqt",
      yourName: "Ism-sharifingiz",
      yourPhone: "Telefon raqamingiz",
      submit: "Test Drayvni Band Qilish",
      successTitle: "Test Drayv Muvaffaqiyatli Band Qilindi!",
      successDesc: "Belgilangan vaqtda haydovchilik guvohnomangiz bilan tashrif buyurishingizni so'raymiz.",
    },
    compare: {
      title: "Tesla Modellarini Solishtirish",
      subtitle: "O'zingizga eng mos keladigan elektr avtomobilni tanlang",
      startingPrice: "Boshlang'ich narx",
      maxRange: "Maksimal masofa",
      acceleration: "0–100 km/s tezlanish",
      topSpeed: "Maksimal tezlik",
      peakPower: "Maksimal quvvat",
      cargo: "Yukxona hajmi",
      seating: "O'rindiqlar soni",
      configureModel: "Yig'ish",
    },
  },
  en: {
    nav: {
      vehicles: "Vehicles",
      energy: "Energy",
      charging: "Charging",
      discover: "Discover",
      shop: "Shop",
      configure: "Configurator",
      compare: "Compare",
      demoDrive: "Demo Drive",
      orderNow: "Order Now",
      learnMore: "Learn More",
      designYours: "Design Yours",
    },
    hero: {
      range: "Range (WLTP)",
      zeroToHundred: "0-100 km/h",
      topSpeed: "Top Speed",
      peakPower: "Peak Power",
      orderNow: "Custom Order",
      demoDrive: "Demo Drive",
      compareModels: "Compare Models",
      solarTitle: "Solar Panels & Powerwall",
      solarSubtitle: "Clean 24/7 solar energy and whole-home battery backup",
      solarCtaPrimary: "Calculate Savings",
      solarCtaSecondary: "Learn More",
      accessoriesTitle: "Tesla Accessories & Wall Connector",
      accessoriesSubtitle: "Official home charging solutions and vehicle gear",
      shopNow: "Open Configurator",
    },
    configurator: {
      backHome: "Back to Home",
      selectModel: "Select Model",
      cash: "Cash",
      lease: "Lease",
      finance: "Finance",
      perMonth: "/ mo",
      estRange: "Range (km)",
      topSpeed: "Top Speed",
      zeroToHundred: "0–100 km/h",
      viewAngles: {
        front: "Front 3/4 View",
        side: "Side Profile",
        rear: "Rear View",
        interior: "Interior Cockpit",
        autopilot: "Autopilot (FSD)",
      },
      selectTrim: "Select Trim & Drivetrain",
      paintTitle: "Exterior Paint",
      included: "Included",
      wheelsTitle: "Wheels & Tires",
      interiorTitle: "Interior Theme",
      autopilotTitle: "Autopilot & Full Self-Driving",
      chargingTitle: "Charging Equipment",
      orderSummary: "Order Summary",
      estimatedDelivery: "Est. Delivery: 2–4 Weeks",
      continueToOrder: "Continue to Payment",
      orderModalTitle: "Your Custom Tesla is Ready!",
      orderModalSubtitle: "Enter your details below to lock in your configuration and reservation.",
      fullName: "Full Name",
      phone: "Phone Number",
      city: "Select City / Showroom",
      confirmOrder: "Place Reservation",
      orderSuccessTitle: "Congratulations! Order Confirmed",
      orderSuccessDesc: "Your custom configuration ID has been generated. Our Tesla Advisor will contact you shortly.",
      close: "Close",
    },
    demoModal: {
      title: "Schedule a Demo Drive",
      subtitle: "Experience instant electric torque and Full Self-Driving technology firsthand.",
      selectVehicle: "Select Vehicle",
      selectLocation: "Select Showroom Location",
      selectDate: "Preferred Date & Time",
      yourName: "Full Name",
      yourPhone: "Phone Number",
      submit: "Schedule Demo Drive",
      successTitle: "Demo Drive Scheduled!",
      successDesc: "Please bring your valid driver's license to your appointment.",
    },
    compare: {
      title: "Compare Tesla Models",
      subtitle: "Find the right electric vehicle for your lifestyle",
      startingPrice: "Starting Price",
      maxRange: "Max Range (WLTP)",
      acceleration: "0–100 km/h",
      topSpeed: "Top Speed",
      peakPower: "Peak Power",
      cargo: "Max Cargo Volume",
      seating: "Seating Capacity",
      configureModel: "Configure",
    },
  },
};
