import { CvTranslation } from "@/app/[lang]/pdf/cv/[variant]/_translations_/types";
import { SectionTitle } from "@/app/[lang]/pdf/cv/[variant]/_components_/SectionTitle";
import { View } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf/tailwind";
import { LanguageCard } from "@/app/[lang]/pdf/cv/[variant]/_components_/LanguageCard";
import { Section } from "@/app/[lang]/pdf/cv/[variant]/_components_/Section";
import React from "react";

export function PartLanguages({ t }: { t: CvTranslation }) {
  return (
    <Section>
      <SectionTitle>{t.languages.title}</SectionTitle>
      <View style={tw("py-4 gap-1")}>
        {t.languages.list.map(({ language, capacity }) => (
          <LanguageCard
            key={language}
            language={language}
            capacity={capacity}
          />
        ))}
      </View>
    </Section>
  )
}