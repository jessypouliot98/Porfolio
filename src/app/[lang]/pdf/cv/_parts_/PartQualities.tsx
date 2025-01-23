import { SectionTitle } from "@/app/[lang]/pdf/cv/_components_/SectionTitle";
import { Text, View } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf/tailwind";
import { StrengthCard } from "@/app/[lang]/pdf/cv/_components_/StrengthCard";
import { Section } from "@/app/[lang]/pdf/cv/_components_/Section";
import React from "react";
import { CvTranslation } from "@/app/[lang]/pdf/cv/_translations_/types";

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