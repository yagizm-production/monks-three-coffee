import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame, Section } from "@/components/site-frame";
import { useI18n } from "@/lib/i18n";
import { mapsUrl, useSite } from "@/lib/site-store";

const branchQueries = [
  "Monk's Three Coffee Atatürk Caddesi Kuşadası",
  "Monk's Three Coffee Kuşadası sahil",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kuşadası Cafe | Monk’s Three Coffee" },
      {
        name: "description",
        content: "Monk’s Three Coffee, Kuşadası. Specialty coffee, breakfast and a quiet table by the shore.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const site = useSite();
  const { t, lang } = useI18n();
  const stance = site.stance[lang];
  const categories = [...new Set(site.menu.map((m) => m.category))];
  const photos = site.gallery.slice(0, 6);
  return (
    <SiteFrame>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <div className="rise rounded-2xl border border-line bg-paper p-6 card-soft md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-caramel">{stance.kicker}</p>
          <h1 className="mt-3 font-display text-5xl leading-[1.05] text-ink md:text-6xl">{t.title}</h1>
          <p className="mt-4 max-w-md text-lg text-muted">{stance.lead}</p>
          <p className="mt-3 font-display text-2xl text-gold">{stance.motto}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/menu" className="btn">{t.menuCta}</Link>
            <Link to="/ulasim" className="btn-ghost">{t.maps}</Link>
          </div>
        </div>
        <img src="/cafe/01.jpg" alt="Monk’s Three Kuşadası" className="rise aspect-[4/5] w-full rounded-2xl object-cover ring-1 ring-line" />
      </section>

      <Section id="hakkimizda" kicker={t.aboutK} title={stance.aboutT}>
        <p className="max-w-3xl text-lg text-muted">{stance.about}</p>
        <Link to="/hikaye" className="mt-4 inline-block text-caramel">{t.storyLink}</Link>
      </Section>

      <Section id="menu" kicker={t.menuK} title={stance.menuT}>
        <div className="grid gap-8 md:grid-cols-2">
          {categories.map((cat) => (
            <div key={cat}>
              <h3 className="font-display text-2xl">{t.cats[cat] ?? cat}</h3>
              <ul className="mt-3 divide-y divide-line">
                {site.menu
                  .filter((m) => m.category === cat)
                  .slice(0, 3)
                  .map((m) => (
                    <li key={m.id} className="flex items-center gap-3 py-3">
                      <img src={m.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block">{t.names[m.id] ?? m.name}</span>
                        <span className="text-sm text-muted">{lang === "en" ? t.notes[m.id] ?? m.note : m.note}</span>
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <Link to="/menu" className="btn-ghost mt-6">{t.allMenu}</Link>
      </Section>

      <Section id="galeri" kicker={t.galleryK} title={stance.galleryT}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {photos.map((p) => (
            <Link key={p.id} to="/galeri" className="block overflow-hidden rounded-2xl">
              <img src={p.src} alt={p.alt} className="aspect-square w-full object-cover" />
            </Link>
          ))}
        </div>
      </Section>

      <Section id="yorumlar" kicker={t.guestsK} title={stance.guestsT}>
        <div className="grid gap-4 md:grid-cols-3">
          {site.reviews.map((r) => (
            <article key={r.id} className="rounded-2xl border border-line bg-paper-deep p-5">
              <p className="text-gold">★★★★★</p>
              <p className="mt-3">{r.text}</p>
              <p className="mt-4 text-sm text-muted">{r.name}</p>
            </article>
          ))}
        </div>
        <a href={mapsUrl(branchQueries[0])} target="_blank" rel="noreferrer" className="btn mt-6">
          {t.reviewCta}
        </a>
      </Section>

      <Section id="subeler" kicker={t.branchesK} title={t.branchesT}>
        <div className="grid gap-4 md:grid-cols-2">
          {t.branches.map((b, i) => (
            <article key={b.name} className="rounded-2xl border border-line p-5">
              <h3 className="font-display text-2xl">{b.name}</h3>
              <p className="mt-2 text-muted">{b.line}</p>
              <p className="mt-2">{site.hours}</p>
              <p className="mt-1">{site.phone}</p>
              <a href={mapsUrl(branchQueries[i])} target="_blank" rel="noreferrer" className="btn mt-4 text-sm">
                {t.mapOpen}
              </a>
            </article>
          ))}
        </div>
      </Section>
    </SiteFrame>
  );
}
