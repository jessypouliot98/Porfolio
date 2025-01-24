import { CvTranslation } from "../../../translations/types";
import { SectionTitle } from "../../../components/SectionTitle";
import { View } from "@react-pdf/renderer";
import { tw } from "../../../utils/tailwind";
import { LanguageCard } from "../../../components/LanguageCard";
import { Section } from "../../../components/Section";

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