import { SectionTitle } from "../../../components/SectionTitle.js";
import { View } from "@react-pdf/renderer";
import { tw } from "../../../utils/tailwind.js";
import { EducationCard } from "../../../components/EducationCard.js";
import { Section } from "../../../components/Section.js";
import { CvTranslation } from "../../../translations/types.js";

export function PartEducation({ t }: { t: CvTranslation }) {
  return (
    <Section>
      <SectionTitle>{t.education.title}</SectionTitle>
      <View style={tw("gap-2")}>
        {t.education.list.map((education) => (
          <EducationCard
            key={education.certification}
            school={education.school}
            certification={education.certification}
            completedOn={education.completedOn}
            content={education.content}
          />
        ))}
      </View>
    </Section>
  )
}