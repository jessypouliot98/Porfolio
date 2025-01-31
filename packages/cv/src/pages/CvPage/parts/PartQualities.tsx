import { SectionTitle } from "../../../components/SectionTitle";
import { Text, View } from "@react-pdf/renderer";
import { tw } from "../../../utils/tailwind";
import { StrengthCard } from "../../../components/StrengthCard";
import { Section } from "../../../components/Section";
import { CvTranslation } from "../../../translations/types";

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