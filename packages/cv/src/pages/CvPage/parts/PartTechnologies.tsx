import { CvTranslation } from "../../../translations/types.js";
import { SectionTitle } from "../../../components/SectionTitle.js";
import { Text, View } from "@react-pdf/renderer";
import { tw } from "../../../utils/tailwind.js";
import { Section } from "../../../components/Section.js";

export function PartTechnologies({ t }: { t: CvTranslation }) {
  return (
    <Section>
      <SectionTitle>{t.technologies.title}</SectionTitle>
      <View style={tw("flex-row flex-wrap gap-2")}>
        {t.technologies.list.map((technology) => (
          <View
            key={technology}
            style={tw("px-1 py-0.5 bg-gray-100 rounded")}
          >
            <Text style={tw("text-xs font-medium leading-tight")}>{technology}</Text>
          </View>
        ))}
      </View>
    </Section>
  )
}