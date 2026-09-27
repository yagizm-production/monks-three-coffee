import { createFileRoute } from "@tanstack/react-router";
import { SiteFrame, Section } from "@/components/site-frame";
import { useI18n } from "@/lib/i18n";
import { useSite } from "@/lib/site-store";

export const Route = createFileRoute("/hikaye")({
  head: () => ({ meta: [{ title: "Monk’s Three Coffee" }] }),
  component: Story,
});

function Story() {
  const { t, lang } = useI18n();
  const stance = useSite().stance[lang];
  return (
    <SiteFrame>
      <Section kicker={t.aboutK} title={stance.aboutT}>
        <p className="max-w-3xl text-lg text-muted">{stance.about}</p>
      </Section>
    </SiteFrame>
  );
}
