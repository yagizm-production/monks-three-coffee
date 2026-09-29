import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Hearth } from "@/components/hearth";
import { useI18n } from "@/lib/i18n";
import { isOpenNow, mapsUrl, useSite } from "@/lib/site-store";

const paths = ["/", "/menu", "/hikaye", "/galeri", "/ulasim"] as const;

export function SiteFrame({ children }: { children: ReactNode }) {
  const site = useSite();
  const { t, lang, choose } = useI18n();
  const open = isOpenNow(site.hours);
  return (
    <div className="min-h-screen pb-24">
      <div className="wallpaper" aria-hidden />
      <div className="veil" aria-hidden />
      <header className="sticky top-0 z-30 border-b border-line bg-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-3 text-ink">
            <img src="/cafe/logo.jpg" alt="Monk's Three" className="h-12 w-12 rounded-full bg-paper object-contain" />
            <span className="font-display text-xl tracking-tight">Monk’s Three</span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-muted md:flex">
            {paths.map((to, i) => (
              <Link key={to} to={to} className="hover:text-ink" activeProps={{ className: "text-ink" }}>
                {t.nav[i]}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <div className="flex rounded-full border border-line bg-paper p-1 text-xs">
              <button type="button" className={lang === "tr" ? "rounded-full bg-btn px-2 py-1 text-foam" : "px-2 py-1"} onClick={() => choose("tr")}>TR</button>
              <button type="button" className={lang === "en" ? "rounded-full bg-btn px-2 py-1 text-foam" : "px-2 py-1"} onClick={() => choose("en")}>EN</button>
            </div>
            <a href={mapsUrl(site.mapsQuery)} target="_blank" rel="noreferrer" className="btn hidden text-sm sm:inline-flex">
              {t.directions}
            </a>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-1 px-4 pb-2 text-sm text-muted md:hidden">
          {paths.map((to, i) => (
            <Link key={to} to={to} className="py-1.5" activeProps={{ className: "text-ink" }}>
              {t.nav[i]}
            </Link>
          ))}
        </nav>
      </header>
      {open !== null ? (
        <p className="mx-auto mt-4 w-fit rounded-full border border-line bg-paper px-4 py-1 text-sm text-ink">
          {open ? t.open : t.closed} · {site.hours}
        </p>
      ) : null}
      {children}
      <footer className="mt-8 border-t border-line bg-paper">
        <div className="mx-auto grid max-w-6xl gap-3 px-4 py-10 text-sm text-muted md:grid-cols-2">
          <div>
            <p className="text-ink">{t.footer}</p>
            <p className="mt-2">{t.branches[0].name} · {t.branches[0].line}</p>
            <p>{t.branches[1].name} · {t.branches[1].line}</p>
            <p className="mt-2">{site.hours}</p>
            <p className="mt-1 text-ink">{site.phone}</p>
          </div>
          <div className="flex flex-wrap content-start gap-4">
            <a href={site.instagram} target="_blank" rel="noreferrer" className="hover:text-ink">{t.instagram}</a>
            <a href={mapsUrl("Monk's Three Coffee Atatürk Caddesi Kuşadası")} target="_blank" rel="noreferrer" className="hover:text-ink">{t.branches[0].name}</a>
            <a href={mapsUrl("Monk's Three Coffee Kuşadası çarşı")} target="_blank" rel="noreferrer" className="hover:text-ink">{t.branches[1].name}</a>
            <Link to="/yonetim" className="hover:text-ink">Yönetim</Link>
          </div>
        </div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center gap-2 border-t border-line bg-paper px-3 py-3 text-sm">
        <a className="btn-dark" href={mapsUrl(site.mapsQuery)} target="_blank" rel="noreferrer">{t.dockMap}</a>
        <a className="btn-ghost" href={site.instagram} target="_blank" rel="noreferrer">{t.instagram}</a>
        <Link to="/menu" className="btn">{t.dockMenu}</Link>
      </div>
      <Hearth onLabel={t.fireOn} offLabel={t.fireOff} />
      <Link to="/menu" aria-label={t.dockMenu} className="fixed right-4 bottom-20 z-40">
        <img src="/cafe/logo.jpg" alt="" className="h-16 w-16 rounded-full border border-line bg-paper object-contain shadow-lg" />
      </Link>
    </div>
  );
}

export function Section({
  id,
  kicker,
  title,
  children,
}: {
  id?: string;
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="rise mx-auto max-w-6xl px-4 py-8">
      <div className="rounded-2xl border border-line bg-paper p-6 card-soft md:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-caramel">{kicker}</p>
        <h2 className="mt-2 font-display text-4xl text-ink">{title}</h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}
