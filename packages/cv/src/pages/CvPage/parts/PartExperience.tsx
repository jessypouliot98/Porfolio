import { CvTranslation } from "../../../translations/types.js";
import { SectionTitle } from "../../../components/SectionTitle.js";
import { View } from "@react-pdf/renderer";
import { tw } from "../../../utils/tailwind.js";
import { ExperienceCard } from "../../../components/ExperienceCard.js";
import { Section } from "../../../components/Section.js";
import { BulletList } from "../../../components/BulletList.js";

export type PartExperienceProps = {
  t: CvTranslation;
}

export function PartExperience({ t }: PartExperienceProps) {
  return (
    <Section>
      <SectionTitle>{t.experience.title}</SectionTitle>
      <View style={tw("gap-2")}>
        {t.experience.job.map((job, i) => (
          <ExperienceCard
            key={i}
            job={job.title}
            company={job.company}
            location={job.location}
            from={job.from}
            to={job.to}
            Details={(
              <BulletList
                content={job.content}
              />
            )}
          />
        ))}
      </View>
    </Section>
  )
}