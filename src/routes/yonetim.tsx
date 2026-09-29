import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { SiteFrame, Section } from "@/components/site-frame";
import { defaults, loadContent, saveContent, type GalleryShot, type SiteContent, type Stance } from "@/lib/site-store";

export const Route = createFileRoute("/yonetim")({
  head: () => ({ meta: [{ title: "Yönetim | Monk’s Three" }] }),
  component: Admin,
});

const PASS = "monks2026";
const shots = ["/cafe/01.jpg", "/cafe/02.jpg", "/cafe/03.jpg", "/cafe/04.jpg", "/cafe/05.jpg", "/cafe/06.jpg", "/cafe/07.jpg", "/cafe/08.jpg", "/cafe/09.jpg"];
const tabs = ["Duruş", "Galeri", "Menü", "Yorumlar", "İletişim"] as const;

const stanceFields: [keyof Stance, string][] = [
  ["kicker", "Üst başlık"],
  ["lead", "Karşılama"],
  ["motto", "Motto"],
  ["aboutT", "Hikâye başlığı"],
  ["about", "Hikâye"],
  ["menuT", "Menü başlığı"],
  ["galleryT", "Atmosfer başlığı"],
  ["guestsT", "Misafir başlığı"],
];

function Admin() {
  const [ok, setOk] = useState(false);
  const [pin, setPin] = useState("");
  const [draft, setDraft] = useState<SiteContent>(defaults);
  const [note, setNote] = useState("");
  const [tab, setTab] = useState<(typeof tabs)[number]>("Duruş");
  const [lang, setLang] = useState<"tr" | "en">("tr");

  useEffect(() => {
    setDraft(loadContent());
    if (sessionStorage.getItem("monks-admin") === "1") setOk(true);
  }, []);

  function save(e?: FormEvent) {
    e?.preventDefault();
    saveContent(draft);
    setNote("Kaydedildi. Bu tarayıcıda site güncellendi.");
  }

  if (!ok) {
    return (
      <SiteFrame>
        <Section kicker="Yönetim" title="Kapı">
          <form
            className="max-w-sm space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (pin === PASS) {
                sessionStorage.setItem("monks-admin", "1");
                setOk(true);
              } else setNote("Kod uyuşmadı.");
            }}
          >
            <input value={pin} onChange={(e) => setPin(e.target.value)} type="password" className="field w-full" placeholder="Yönetim kodu" />
            <button className="btn" type="submit">Giriş</button>
            {note ? <p className="text-sm text-gold">{note}</p> : null}
          </form>
        </Section>
      </SiteFrame>
    );
  }

  function setStance(key: keyof Stance, value: string) {
    setDraft((d) => ({ ...d, stance: { ...d.stance, [lang]: { ...d.stance[lang], [key]: value } } }));
  }

  function setGallery(next: GalleryShot[]) {
    setDraft((d) => ({ ...d, gallery: next }));
  }

  return (
    <SiteFrame>
      <Section kicker="Yönetim" title="Vitrin">
        <div className="grid gap-6 lg:grid-cols-[180px_1fr]">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {tabs.map((name) => (
              <button key={name} type="button" onClick={() => setTab(name)} className={tab === name ? "btn-dark text-left text-sm" : "btn-ghost text-left text-sm"}>
                {name}
              </button>
            ))}
          </nav>
          <form className="grid gap-4" onSubmit={save}>
            {tab === "Duruş" ? (
              <>
                <div className="flex gap-2">
                  <button type="button" className={lang === "tr" ? "btn-dark text-sm" : "btn-ghost text-sm"} onClick={() => setLang("tr")}>TR</button>
                  <button type="button" className={lang === "en" ? "btn-dark text-sm" : "btn-ghost text-sm"} onClick={() => setLang("en")}>EN</button>
                </div>
                {stanceFields.map(([key, label]) => (
                  <label key={key} className="grid gap-1 text-sm text-muted">
                    {label}
                    {key === "lead" || key === "about" ? (
                      <textarea className="field min-h-28" value={draft.stance[lang][key]} onChange={(e) => setStance(key, e.target.value)} />
                    ) : (
                      <input className="field" value={draft.stance[lang][key]} onChange={(e) => setStance(key, e.target.value)} />
                    )}
                  </label>
                ))}
              </>
            ) : null}

            {tab === "Galeri" ? (
              <div className="grid gap-4">
                {draft.gallery.map((shot, i) => (
                  <div key={shot.id} className="grid items-center gap-3 rounded-xl border border-line bg-paper-deep p-3 sm:grid-cols-[96px_1fr]">
                    <img src={shot.src} alt="" className="h-24 w-full rounded-lg object-cover" />
                    <div className="grid gap-2">
                      <input className="field" value={shot.alt} onChange={(e) => {
                        const gallery = draft.gallery.slice();
                        gallery[i] = { ...shot, alt: e.target.value };
                        setGallery(gallery);
                      }} />
                      <select className="field" value={shot.src} onChange={(e) => {
                        const gallery = draft.gallery.slice();
                        gallery[i] = { ...shot, src: e.target.value };
                        setGallery(gallery);
                      }}>
                        {shots.map((src) => <option key={src} value={src}>{src}</option>)}
                      </select>
                      <div className="flex gap-2 text-sm">
                        <button type="button" className="rounded-lg border border-line px-3 py-1" onClick={() => {
                          if (i === 0) return;
                          const gallery = draft.gallery.slice();
                          [gallery[i - 1], gallery[i]] = [gallery[i], gallery[i - 1]];
                          setGallery(gallery);
                        }}>Yukarı</button>
                        <button type="button" className="rounded-lg border border-line px-3 py-1" onClick={() => setGallery(draft.gallery.filter((g) => g.id !== shot.id))}>Kaldır</button>
                      </div>
                    </div>
                  </div>
                ))}
                <button type="button" className="w-fit rounded-xl border border-line px-4 py-2 text-sm" onClick={() => setGallery([...draft.gallery, { id: `g${Date.now()}`, src: shots[0], alt: "Yeni kare" }])}>
                  Kare ekle
                </button>
              </div>
            ) : null}

            {tab === "Menü" ? draft.menu.map((item, i) => (
              <div key={item.id} className="grid gap-2 rounded-xl border border-line p-3 md:grid-cols-3">
                <input className="field" value={item.category} onChange={(e) => {
                  const menu = draft.menu.slice();
                  menu[i] = { ...item, category: e.target.value };
                  setDraft({ ...draft, menu });
                }} />
                <input className="field" value={item.name} onChange={(e) => {
                  const menu = draft.menu.slice();
                  menu[i] = { ...item, name: e.target.value };
                  setDraft({ ...draft, menu });
                }} />
                <input className="field" value={item.note} onChange={(e) => {
                  const menu = draft.menu.slice();
                  menu[i] = { ...item, note: e.target.value };
                  setDraft({ ...draft, menu });
                }} />
              </div>
            )) : null}

            {tab === "Yorumlar" ? draft.reviews.map((item, i) => (
              <div key={item.id} className="grid gap-2">
                <input className="field" value={item.name} onChange={(e) => {
                  const reviews = draft.reviews.slice();
                  reviews[i] = { ...item, name: e.target.value };
                  setDraft({ ...draft, reviews });
                }} />
                <textarea className="field min-h-20" value={item.text} onChange={(e) => {
                  const reviews = draft.reviews.slice();
                  reviews[i] = { ...item, text: e.target.value };
                  setDraft({ ...draft, reviews });
                }} />
              </div>
            )) : null}

            {tab === "İletişim" ? (
              <>
                {([["address", "Adres"], ["phone", "Telefon"], ["hours", "Saatler"], ["mapsQuery", "Harita araması"], ["instagram", "Instagram"]] as const).map(([key, label]) => (
                  <label key={key} className="grid gap-1 text-sm text-muted">
                    {label}
                    <input className="field" value={draft[key]} onChange={(e) => setDraft({ ...draft, [key]: e.target.value })} />
                  </label>
                ))}
              </>
            ) : null}

            <div className="sticky bottom-20 flex items-center gap-3">
              <button type="submit" className="btn">Kaydet</button>
              {note ? <p className="text-sm text-gold">{note}</p> : null}
            </div>
          </form>
        </div>
      </Section>
    </SiteFrame>
  );
}
