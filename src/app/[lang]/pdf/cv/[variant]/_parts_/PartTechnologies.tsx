import { CvTranslation } from "@/app/[lang]/pdf/cv/[variant]/_translations_/types";
import { SectionTitle } from "@/app/[lang]/pdf/cv/[variant]/_components_/SectionTitle";
import { Text, View } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf/tailwind";
import { Section } from "@/app/[lang]/pdf/cv/[variant]/_components_/Section";
import React from "react";

export function PartTechnologies({ t }: { t: CvTranslation }) {
  return (
    <Section>
      <SectionTitle>{t.technologies.title}</SectionTitle>
      <View style={tw("flex-row flex-wrap gap-2")}>
        {t.technologies.list.map((technology) => (
          <View
            key={technology}
            style={tw("px-1 py-0.5 bg-gray-100 rounded")}
          >
            <Text style={tw("text-xs font-medium leading-tight")}>{technology}</Text>
          </View>
        ))}
      </View>
    </Section>
  )
}