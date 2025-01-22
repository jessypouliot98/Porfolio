import { CvTranslation } from "@/app/[lang]/pdf/cv/[variant]/_translations_/types";
import { SectionTitle } from "@/app/[lang]/pdf/cv/[variant]/_components_/SectionTitle";
import { Text, View } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf/tailwind";
import { ExperienceCard } from "@/app/[lang]/pdf/cv/[variant]/_components_/ExperienceCard";
import { ListItem } from "@/app/[lang]/pdf/cv/[variant]/_components_/ListItem";
import { Section } from "@/app/[lang]/pdf/cv/[variant]/_components_/Section";
import React from "react";
import { BulletList } from "@/app/[lang]/pdf/cv/[variant]/_components_/BulletList";

export type PartExperienceProps = {
  t: CvTranslation;
  compact?: boolean;
}

export function PartExperience({ t, compact = false }: PartExperienceProps) {
  return (
    <Section>
      <SectionTitle>{t.experience.title}</SectionTitle>
      <View style={tw("gap-3")}>
        <ExperienceCard
          job={t.experience.job.ecamai.title}
          company={t.experience.job.ecamai.company}
          location={t.experience.job.ecamai.location}
          from={t.experience.job.ecamai.from}
          to={t.experience.job.ecamai.to}
          Details={(
            <BulletList
              content={t.experience.job.ecamai.content}
            />
          )}
        />
        <ExperienceCard
          job={t.experience.job.renorun.title}
          company={t.experience.job.renorun.company}
          location={t.experience.job.renorun.location}
          from={t.experience.job.renorun.from}
          to={t.experience.job.renorun.to}
          Details={(
            <BulletList
              content={t.experience.job.renorun.content}
            />
          )}
        />
        <ExperienceCard
          job={t.experience.job.activix.title}
          company={t.experience.job.activix.company}
          location={t.experience.job.activix.location}
          from={t.experience.job.activix.from}
          to={t.experience.job.activix.to}
          Details={(
            <BulletList
              content={t.experience.job.activix.content}
            />
          )}
        />
      </View>
    </Section>
  )
}