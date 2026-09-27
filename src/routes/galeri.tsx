import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame, Section } from "@/components/site-frame";
import { useI18n } from "@/lib/i18n";
import { useSite } from "@/lib/site-store";

export const Route = createFileRoute("/galeri")({
  head: () => ({ meta: [{ title: "Atmosfer | Monk’s Three Coffee Kuşadası" }] }),
  component: Gallery,
});

function Gallery() {
  const { t, lang } = useI18n();
  const site = useSite();
  return (
    <SiteFrame>
      <Section kicker={t.galleryK} title={site.stance[lang].galleryT}>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {site.gallery.map((shot) => (
            <figure key={shot.id} className="overflow-hidden rounded-xl">
              <img src={shot.src} alt={shot.alt} className="aspect-[4/5] w-full object-cover" />
              <figcaption className="px-1 py-2 text-sm text-muted">{shot.alt}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </SiteFrame>
  );
}