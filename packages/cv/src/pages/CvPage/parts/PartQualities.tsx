import { SectionTitle } from "../../../components/SectionTitle.js";
import { Text, View } from "@react-pdf/renderer";
import { tw } from "../../../utils/tailwind.js";
import { StrengthCard } from "../../../components/StrengthCard.js";
import { Section } from "../../../components/Section.js";
import { CvTranslation } from "../../../translations/types.js";

export function PartQualities({ t }: { t: CvTranslation }) {
  return (
    <Section>
      <SectionTitle>{t.qualities.title}</SectionTitle>
      <View style={tw("gap-2")}>
        {t.qualities.list.map(({ quality, details }) => (
          <StrengthCard
            key={quality}
            strength={quality}
            Details={(
              <Text>{details}</Text>
            )}
          />
        ))}
      </View>
    </Section>
  )
}