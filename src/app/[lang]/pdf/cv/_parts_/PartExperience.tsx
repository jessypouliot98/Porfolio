import { CvTranslation } from "@/app/[lang]/pdf/cv/_translations_/types";
import { SectionTitle } from "@/app/[lang]/pdf/cv/_components_/SectionTitle";
import { View } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf/tailwind";
import { ExperienceCard } from "@/app/[lang]/pdf/cv/_components_/ExperienceCard";
import { Section } from "@/app/[lang]/pdf/cv/_components_/Section";
import React from "react";
import { BulletList } from "@/app/[lang]/pdf/cv/_components_/BulletList";

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