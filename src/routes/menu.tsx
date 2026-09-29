import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteFrame } from "@/components/site-frame";
import { useI18n } from "@/lib/i18n";
import { useSite, type MenuItem } from "@/lib/site-store";

const PICKS = [
  "sicak-v60",
  "sicak-cold-brew",
  "milk-monks-latte",
  "espresso-single-espresso",
  "kokteyl-kuzu-kulagi",
  "iced-iced-latte-affogato",
  "tatli-san-sebastian",
];

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menü | Monk’s Three Coffee Kuşadası" },
      { name: "description", content: "Monk’s Three Coffee QR menü, Kuşadası." },
    ],
  }),
  component: MenuPage,
});

function dayIndex() {
  const now = new Date();
  return Math.floor(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) / 86_400_000);
}

function MenuPage() {
  const site = useSite();
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("");
  const [open, setOpen] = useState("");
  const q = query.trim().toLocaleLowerCase("tr");
  const categories = useMemo(() => [...new Set(site.menu.map((m) => m.category))], [site.menu]);
  const today = useMemo(() => {
    const pool = PICKS.map((id) => site.menu.find((m) => m.id === id)).filter((m): m is MenuItem => Boolean(m));
    const list = pool.length ? pool : site.menu.slice(0, 1);
    return list[dayIndex() % list.length];
  }, [site.menu]);

  const cover = (name: string) => {
    const rows = site.menu.filter((m) => m.category === name);
    return rows.find((m) => !m.image.includes("logo"))?.image ?? rows[0]?.image ?? "/cafe/logo.jpg";
  };

  const matches = q
    ? site.menu.filter((m) => `${m.name} ${m.note} ${m.category}`.toLocaleLowerCase("tr").includes(q))
    : [];
  const groups = q
    ? categories
        .map((name) => ({ name, items: matches.filter((m) => m.category === name) }))
        .filter((g) => g.items.length)
    : [];
  const inCat = !q && cat ? site.menu.filter((m) => m.category === cat) : [];

  return (
    <SiteFrame>
      <div className="mx-auto max-w-lg px-4 pt-4">
        <label className="sticky top-2 z-20 block">
          <span className="sr-only">{t.search}</span>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen("");
            }}
            placeholder={t.searchPh}
            className="field w-full bg-paper text-base"
            enterKeyHint="search"
          />
        </label>

        {q ? (
          <div className="mt-4">
            {groups.length === 0 ? <p className="text-muted">{t.empty}</p> : null}
            {groups.map((g) => (
              <section key={g.name} className="mt-5">
                <h2 className="text-xs uppercase tracking-[0.16em] text-caramel">{g.name}</h2>
                <ul className="mt-2 overflow-hidden rounded-2xl border border-line bg-paper-deep">
                  {g.items.map((m) => (
                    <Row key={m.id} item={m} open={open === m.id} onToggle={() => setOpen(open === m.id ? "" : m.id)} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : cat ? (
          <div className="mt-4">
            <button type="button" className="btn-ghost text-sm" onClick={() => { setCat(""); setOpen(""); }}>
              ← {t.back}
            </button>
            <h1 className="mt-3 font-display text-3xl">{cat}</h1>
            <ul className="mt-3 overflow-hidden rounded-2xl border border-line bg-paper-deep">
              {inCat.map((m) => (
                <Row key={m.id} item={m} open={open === m.id} onToggle={() => setOpen(open === m.id ? "" : m.id)} />
              ))}
            </ul>
          </div>
        ) : (
          <>
            {today ? (
              <button type="button" onClick={() => setCat(today.category)} className="mt-4 flex w-full items-center gap-3 rounded-2xl border border-line bg-paper p-3 text-left">
                <img src={today.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-[0.16em] text-caramel">{t.today}</span>
                  <span className="block truncate text-lg">{today.name}</span>
                </span>
              </button>
            ) : null}
            <h1 className="mt-6 text-xs uppercase tracking-[0.16em] text-caramel">{t.pick}</h1>
            <ul className="mt-3 grid grid-cols-2 gap-3">
              {categories.map((name) => (
                <li key={name}>
                  <button type="button" onClick={() => setCat(name)} className="w-full overflow-hidden rounded-2xl border border-line bg-paper-deep text-left">
                    <img src={cover(name)} alt="" className="aspect-[4/3] w-full object-cover" />
                    <span className="block px-3 py-2 text-sm">{name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </SiteFrame>
  );
}

function Row({ item, open, onToggle }: { item: MenuItem; open: boolean; onToggle: () => void }) {
  return (
    <li className="border-b border-line last:border-0">
      <button type="button" onClick={onToggle} className="flex w-full items-center gap-3 px-3 py-3 text-left">
        <img src={item.image} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
        <span className="min-w-0 flex-1">
          <span className="block leading-tight">{item.name}</span>
          {item.note && open ? <span className="mt-1 block text-sm text-muted">{item.note}</span> : null}
        </span>
      </button>
    </li>
  );
}
