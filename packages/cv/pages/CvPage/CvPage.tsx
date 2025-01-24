import { Document, Page, Text, View } from "@react-pdf/renderer";
import { tw } from "../../utils/tailwind";
import { PartContact } from "./parts/PartContact";
import { PartExperience } from "./parts/PartExperience";
import { PartTechnologies } from "./parts/PartTechnologies";
import { PartEducation } from "./parts/PartEducation";
import { PartQualities } from "./parts/PartQualities";
import { PartOther } from "./parts/PartOther";
import { CvTranslation } from "../../translations/types";

export type CvPageProps = {
  t: CvTranslation;
}

export function CvPage({ t }: CvPageProps) {
  return (
    <Document>
      <Page
        size="LETTER"
        style={tw("font-roboto-sans p-3 text-base leading-tight")}
      >
        <View style={tw("pb-3 gap-3")}>
          <View style={tw("px-2")}>
            <Text style={tw("text-xl font-bold leading-tight")}>{t.title}</Text>
            <Text style={tw("text-2xl font-medium leading-tight text-blue-500")}>{t.subtitle}</Text>
          </View>
          <View style={tw("w-8/12 px-2")}>
            <Text style={tw("text-xs leading-normal")}>{t.presentation}</Text>
          </View>
          <PartContact t={t}/>
        </View>

        <View style={tw("flex flex-row flex-1 gap-3")}>
          {/*Left*/}
          <View style={tw("flex-1")}>
            <PartExperience t={t} />
            <PartTechnologies t={t} />
          </View>
          {/*Right*/}
          <View style={tw("w-4/12")}>
            <PartEducation t={t} />
            <PartQualities t={t} />
            <PartOther t={t} />
            {/*<PartLanguages t={t} />*/}
          </View>
        </View>

      </Page>
    </Document>
  );
}