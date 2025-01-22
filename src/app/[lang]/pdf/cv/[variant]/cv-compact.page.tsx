import React from 'react';
import { Page, Document, View, Text } from '@react-pdf/renderer';
import { tw } from "@/utils/pdf/tailwind";
import { registerFonts } from "@/utils/pdf/registerFonts";
import { PartContact } from "@/app/[lang]/pdf/cv/[variant]/_parts_/PartContact";
import { CvTranslation } from "@/app/[lang]/pdf/cv/[variant]/_translations_/types";
import { PartExperience } from "@/app/[lang]/pdf/cv/[variant]/_parts_/PartExperience";
import { PartQualities } from "@/app/[lang]/pdf/cv/[variant]/_parts_/PartQualities";
import { PartEducation } from "@/app/[lang]/pdf/cv/[variant]/_parts_/PartEducation";
import { PartLanguages } from "@/app/[lang]/pdf/cv/[variant]/_parts_/PartLanguages";

registerFonts();

export type Props = {
  t: CvTranslation;
}

export default ({ t }: Props) => {
  return (
    <Document>
      <Page
        size="LETTER"
        style={tw("font-roboto-sans p-4 text-base leading-tight")}
      >
        <View style={tw("pb-4 gap-4")}>
          <View style={tw("px-2")}>
            <Text style={tw("text-5xl font-bold leading-tight")}>{t.title}</Text>
            <Text style={tw("text-2xl font-medium leading-tight text-blue-500")}>{t.subtitle}</Text>
          </View>
          <PartContact t={t}/>
        </View>

        <View style={tw("flex flex-row flex-1 gap-4")}>
          {/*Left*/}
          <View style={tw("flex-1")}>
            <PartExperience t={t} compact />
          </View>
          {/*Right*/}
          <View style={tw("w-80")}>
            <PartQualities t={t} />
            <PartEducation t={t} />
            <PartLanguages t={t} />
          </View>

        </View>

      </Page>
    </Document>
  )
}