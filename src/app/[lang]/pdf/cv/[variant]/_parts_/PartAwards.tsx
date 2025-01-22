import { CvTranslation } from "@/app/[lang]/pdf/cv/[variant]/_translations_/types";
import { SectionTitle } from "@/app/[lang]/pdf/cv/[variant]/_components_/SectionTitle";
import { View } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf/tailwind";
import { Section } from "@/app/[lang]/pdf/cv/[variant]/_components_/Section";
import React from "react";
import { AwardCard } from "@/app/[lang]/pdf/cv/[variant]/_components_/AwardCard";
import { BulletList } from "@/app/[lang]/pdf/cv/[variant]/_components_/BulletList";

export function PartAwards({ t }: { t: CvTranslation }) {
  return (
    <Section>
      <SectionTitle>{t.awards.title}</SectionTitle>
      <View style={tw("gap-3")}>
        {t.awards.list.map((award) => (
          <AwardCard
            key={award.name}
            name={award.name}
            Details={(
              <BulletList content={award.content} />
            )}
          />
        ))}
      </View>
    </Section>
  )
}