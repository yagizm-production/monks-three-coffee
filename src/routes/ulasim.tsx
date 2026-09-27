import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame, Section } from "@/components/site-frame";
import { useI18n } from "@/lib/i18n";
import { mapsUrl, useSite } from "@/lib/site-store";

const queries = [
  "Monk's Three Coffee Atatürk Caddesi Kuşadası",
  "Monk's Three Coffee Kuşadası çarşı",
];

export const Route = createFileRoute("/ulasim")({
  head: () => ({ meta: [{ title: "Şubeler | Monk’s Three Coffee Kuşadası" }] }),
  component: Visit,
});

function Visit() {
  const site = useSite();
  const { t } = useI18n();
  return (
    <SiteFrame>
      <Section kicker={t.branchesK} title={t.branchesT}>
        <div className="grid gap-6">
          {t.branches.map((b, i) => (
            <article key={b.name}>
              <h3 className="font-display text-3xl">{b.name}</h3>
              <p className="mt-2 text-lg">{b.line}</p>
              <p className="mt-1 text-muted">{site.hours}</p>
              <p className="mt-1">{site.phone}</p>
              <a href={mapsUrl(queries[i])} target="_blank" rel="noreferrer" className="btn mt-4">
                {t.mapOpen}
              </a>
              <iframe
                title={b.name}
                className="mt-6 h-64 w-full rounded-2xl border border-line"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(queries[i])}&z=15&output=embed`}
              />
            </article>
          ))}
        </div>
      </Section>
    </SiteFrame>
  );
}
