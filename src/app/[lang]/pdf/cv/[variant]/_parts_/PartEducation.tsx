import { SectionTitle } from "@/app/[lang]/pdf/cv/[variant]/_components_/SectionTitle";
import { View } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf/tailwind";
import { EducationCard } from "@/app/[lang]/pdf/cv/[variant]/_components_/EducationCard";
import { Section } from "@/app/[lang]/pdf/cv/[variant]/_components_/Section";
import React from "react";
import { CvTranslation } from "@/app/[lang]/pdf/cv/[variant]/_translations_/types";

export function PartEducation({ t }: { t: CvTranslation }) {
  return (
    <Section>
      <SectionTitle>{t.education.title}</SectionTitle>
      <View style={tw("gap-3")}>
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