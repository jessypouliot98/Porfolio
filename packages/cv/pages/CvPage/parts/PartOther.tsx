import { CvTranslation } from "../../../translations/types";
import { SectionTitle } from "../../../components/SectionTitle";
import { View } from "@react-pdf/renderer";
import { tw } from "../../../utils/tailwind";
import { Section } from "../../../components/Section";
import React from "react";
import { BulletList } from "../../../components/BulletList";

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