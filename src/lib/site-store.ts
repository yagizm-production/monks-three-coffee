import { useEffect, useState } from "react";
import { qrMenu } from "./qr-menu";

export type MenuItem = {
  id: string;
  category: string;
  name: string;
  note: string;
  price: string;
  image: string;
};

export type Review = {
  id: string;
  name: string;
  text: string;
  stars: number;
  source: string;
};

export type GalleryShot = {
  id: string;
  src: string;
  alt: string;
};

export type Stance = {
  kicker: string;
  lead: string;
  motto: string;
  aboutT: string;
  about: string;
  menuT: string;
  galleryT: string;
  guestsT: string;
};

export type SiteContent = {
  tagline: string;
  lead: string;
  about: string;
  vision: string;
  address: string;
  phone: string;
  hours: string;
  mapsQuery: string;
  instagram: string;
  menu: MenuItem[];
  reviews: Review[];
  gallery: GalleryShot[];
  stance: { tr: Stance; en: Stance };
};

export const defaults: SiteContent = {
  tagline: "Neither cheap nor expensive. Just quality.",
  lead: "Kuşadası’nda nitelikli kahve, uzun kahvaltı ve sahil yürüyüşünden sonra ferah bir mola.",
  about:
    "Monk’s Three Coffee, Kuşadası’nda kahveyi aceleye getirmeyen bir durak. Espresso, V60, Türk kahvesi, soğuk demleme ve mevsim içecekleri aynı tezgahta; yanında San Sebastian, dondurma ve kahvaltı tabağı. Mekânın vaadi kısa: kötü kahveyi bırak, sohbeti uzat.",
  vision:
    "Dijital vitrin, tezgâhtaki özenle aynı olsun. Masadaki QR menü karar süresini kısaltsın, Google Haritalar’da adres, saat ve site görünsün, memnun misafir tek dokunuşla yorum bırakabilsin. Hedef: “Kuşadası cafe” aramasında Monk’s Three’nin adı, menüsü ve konumu ilk bakışta net olsun.",
  address: "Atatürk Caddesi 64/A, 09400 Kuşadası / Aydın",
  phone: "+90 53X XXX XX XX",
  hours: "Her gün 09:00 – 23:59",
  mapsQuery: "Monk's Three Coffee Atatürk Caddesi Kuşadası",
  instagram: "https://www.instagram.com/monksthreekusadasi/",
  menu: qrMenu,
  reviews: [
    { id: "r1", name: "A. Y.", text: "Kuşadası'nda gerçek nitelikli kahve içebileceğiniz nadir yerlerden. Özellikle Cold Brew'ları yaz sıcaklarında hayat kurtarıyor. Çalışmak için de harika bir ortam.", stars: 5, source: "misafir" },
    { id: "r2", name: "D. E.", text: "San Sebastian cheesecake ve V60 ikilisi inanılmazdı. Baristalar kahve konusunda çok bilgili ve güler yüzlü. Artık favori mekanım.", stars: 5, source: "misafir" },
    { id: "r3", name: "S. K.", text: "Hem merkezde olup hem de bu kadar sakin kalabilen bir mekan tasarımı. Sabah kahvaltısı ve ardından içtiğim espresso günümü güzelleştirdi.", stars: 5, source: "misafir" },
  ],
  gallery: [
    { id: "g1", src: "/cafe/01.jpg", alt: "Sahil molası" },
    { id: "g2", src: "/cafe/02.jpg", alt: "Soğuk kahve" },
    { id: "g3", src: "/cafe/03.jpg", alt: "Tezgah" },
    { id: "g4", src: "/cafe/04.jpg", alt: "Renkli içecek" },
    { id: "g5", src: "/cafe/05.jpg", alt: "Tatlı" },
    { id: "g6", src: "/cafe/06.jpg", alt: "Servis" },
    { id: "g7", src: "/cafe/07.jpg", alt: "Detay" },
    { id: "g8", src: "/cafe/08.jpg", alt: "Lezzet" },
    { id: "g9", src: "/cafe/09.jpg", alt: "Kahve anı" },
  ],
  stance: {
    tr: {
      kicker: "Kuşadası · Nitelikli Kahve Kavurucusu",
      lead: "Sahilin ritminde, iyi kahvenin izinde. Gerçek kahve çekirdeklerinin özenle demlendiği, zamanın yavaş aktığı o yer.",
      motto: "Crafted for the moment. Brewed for the soul.",
      aboutT: "Kahve aceleye, sohbet yarıda kesilmeye gelmez.",
      about: "Bizim için kahve sadece bir içecek değil, güne atılan güzel bir imza. Özenle seçilmiş çekirdekler, doğru kavurma profilleri ve baristalarımızın el becerisiyle her fincanda aynı kaliteyi sunuyoruz. Kuşadası'nın telaşından uzaklaşıp kendine bir es vermek isteyenlerin buluşma noktasıyız. Acele etmeyin, kötü kahve içmek için hayat çok kısa.",
      menuT: "Tezgahımızdan Fincanınıza",
      galleryT: "Monks'tan Kareler",
      guestsT: "Masamızda İz Bırakanlar",
    },
    en: {
      kicker: "Kuşadası · Specialty coffee roaster",
      lead: "In the rhythm of the shore, on the trail of good coffee. Where real beans are brewed with care, and time moves slowly.",
      motto: "Crafted for the moment. Brewed for the soul.",
      aboutT: "Coffee should not be rushed, and a conversation should not be cut short.",
      about: "For us coffee is not just a drink. It is a small signature on the day. Selected beans, the right roast, and our baristas’ hands keep every cup at the same standard. We are the meeting point for anyone who wants a pause from the rush of Kuşadası. Do not hurry. Life is too short for bad coffee.",
      menuT: "From our bar to your cup",
      galleryT: "Frames from Monks",
      guestsT: "What stayed at the table",
    },
  },
};

const KEY = "monks-three-site-v4";

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function isOpenNow(hours: string, now = new Date()) {
  const match = hours.match(/(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/);
  if (!match) return null;
  const start = Number(match[1]) * 60 + Number(match[2]);
  const end = Number(match[3]) * 60 + Number(match[4]);
  const cur = now.getHours() * 60 + now.getMinutes();
  if (end === start) return true;
  if (end > start) return cur >= start && cur < end;
  return cur >= start || cur < end;
}

function mergeMenu(saved?: MenuItem[]) {
  if (!saved?.length) return defaults.menu;
  const known = new Map(defaults.menu.map((item) => [item.id, item]));
  return saved.map((item) => {
    const base = known.get(item.id);
    return { ...(base ?? { image: "/cafe/m-esp.jpg" }), ...item, image: base?.image || item.image || "/cafe/m-esp.jpg", note: item.note || base?.note || "" };
  });
}

export function loadContent(): SiteContent {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw) as Partial<SiteContent>;
    return {
      ...defaults,
      ...parsed,
      phone: parsed.phone || defaults.phone,
      menu: mergeMenu(parsed.menu),
      reviews: parsed.reviews?.length ? parsed.reviews : defaults.reviews,
      gallery: parsed.gallery?.length ? parsed.gallery : defaults.gallery,
      stance: {
        tr: { ...defaults.stance.tr, ...parsed.stance?.tr },
        en: { ...defaults.stance.en, ...parsed.stance?.en },
      },
    };
  } catch {
    return defaults;
  }
}

export function saveContent(next: SiteContent) {
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("monks-site"));
}

export function useSite() {
  const [content, setContent] = useState<SiteContent>(defaults);
  useEffect(() => {
    const sync = () => setContent(loadContent());
    sync();
    window.addEventListener("monks-site", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("monks-site", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return content;
}
