import { CvTranslation } from "../../../translations/types";
import { SectionTitle } from "../../../components/SectionTitle";
import { View } from "@react-pdf/renderer";
import { tw } from "../../../utils/tailwind";
import { ExperienceCard } from "../../../components/ExperienceCard";
import { Section } from "../../../components/Section";
import React from "react";
import { BulletList } from "../../../components/BulletList";

export type PartExperienceProps = {
  t: CvTranslation;
}

export function PartExperience({ t }: PartExperienceProps) {
  return (
    <Section>
      <SectionTitle>{t.experience.title}</SectionTitle>
      <View style={tw("gap-2")}>
        {t.experience.job.map((job) => (
          <ExperienceCard
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