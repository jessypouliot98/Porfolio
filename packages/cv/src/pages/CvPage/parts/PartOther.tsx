import { CvTranslation } from "../../../translations/types.js";
import { SectionTitle } from "../../../components/SectionTitle.js";
import { View } from "@react-pdf/renderer";
import { tw } from "../../../utils/tailwind.js";
import { Section } from "../../../components/Section.js";
import { BulletList } from "../../../components/BulletList.js";

export function PartOther({ t }: { t: CvTranslation }) {
  return (
    <Section>
      <SectionTitle>{t.other.title}</SectionTitle>
      <View style={tw("px-2 py-2 bg-gray-100 rounded text-xs leading-snug")}>
        <BulletList content={t.other.content} />
      </View>
    </Section>
  )
}