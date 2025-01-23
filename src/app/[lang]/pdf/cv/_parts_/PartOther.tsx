import { CvTranslation } from "@/app/[lang]/pdf/cv/_translations_/types";
import { SectionTitle } from "@/app/[lang]/pdf/cv/_components_/SectionTitle";
import { View } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf/tailwind";
import { Section } from "@/app/[lang]/pdf/cv/_components_/Section";
import React from "react";
import { BulletList } from "@/app/[lang]/pdf/cv/_components_/BulletList";

export function PartOther({ t }: { t: CvTranslation }) {
  return (
    <Section>
      <SectionTitle>{t.other.title}</SectionTitle>
      <View style={tw("px-2 py-2 bg-gray-100 rounded text-xs leading-snug")}>
        <BulletList content={t.other.content} />
      </View>
    </Section>
  )
}