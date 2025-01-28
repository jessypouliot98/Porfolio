import { CvTranslation } from "../../../translations/types.js";
import { SectionTitle } from "../../../components/SectionTitle.js";
import { View } from "@react-pdf/renderer";
import { tw } from "../../../utils/tailwind.js";
import { LanguageCard } from "../../../components/LanguageCard.js";
import { Section } from "../../../components/Section.js";

export function PartLanguages({ t }: { t: CvTranslation }) {
  return (
    <Section>
      <SectionTitle>{t.languages.title}</SectionTitle>
      <View style={tw("py-4 gap-1")}>
        {t.languages.list.map(({ language, capacity }) => (
          <LanguageCard
            key={language}
            language={language}
            capacity={capacity}
          />
        ))}
      </View>
    </Section>
  )
}