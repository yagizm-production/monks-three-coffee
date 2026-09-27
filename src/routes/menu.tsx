import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteFrame, Section } from "@/components/site-frame";
import { useI18n } from "@/lib/i18n";
import { useSite } from "@/lib/site-store";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menü | Monk’s Three Coffee Kuşadası" },
      { name: "description", content: "Monk’s Three Coffee menu in Kuşadası." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const site = useSite();
  const { t, lang } = useI18n();
  const categories = ["Tümü", ...new Set(site.menu.map((m) => m.category))];
  const [cat, setCat] = useState("Tümü");
  const items = site.menu.filter((m) => cat === "Tümü" || m.category === cat);
  return (
    <SiteFrame>
      <Section kicker={t.qrK} title={site.stance[lang].menuT}>
        <p className="max-w-2xl text-muted">{t.qrLead}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setCat(name)}
              className={name === cat ? "btn-dark text-sm" : "btn-ghost text-sm"}
            >
              {name === "Tümü" ? t.all : t.cats[name] ?? name}
            </button>
          ))}
        </div>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {items.map((m) => (
            <li key={m.id} className="overflow-hidden rounded-2xl border border-line bg-paper-deep">
              <img src={m.image} alt="" className="aspect-[4/3] w-full object-cover" />
              <div className="flex items-start justify-between gap-3 p-4">
                <span>
                  <span className="block text-lg">{t.names[m.id] ?? m.name}</span>
                  <span className="text-sm text-muted">{lang === "en" ? t.notes[m.id] ?? m.note : m.note}</span>
                </span>
                <span className="shrink-0 text-caramel">{m.price || t.atBar}</span>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </SiteFrame>
  );
}
