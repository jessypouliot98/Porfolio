import React from 'react';
import { Page, Document, View, Text, Font } from '@react-pdf/renderer';
import { tw } from "@/utils/pdf/tailwind";
import { Section } from "@/app/pdf/cv/_components_/Section";
import { SectionTitle } from "@/app/pdf/cv/_components_/SectionTitle";
import { ExperienceCard } from "@/app/pdf/cv/_components_/ExperienceCard";
import { EducationCard } from "@/app/pdf/cv/_components_/EducationCard";
import { registerFonts } from "@/utils/pdf/registerFonts";
import { ContactInfo } from "@/app/pdf/cv/_components_/ContactInfo";
import { LanguageCard } from "@/app/pdf/cv/_components_/LanguageCard";

registerFonts();

export default () => {
  return (
    <Document>
      <Page
        size="A4"
        style={tw("font-roboto-sans p-4 text-base leading-tight")}
      >
        <View style={tw("pb-4 gap-4")}>
          <View style={tw("px-2")}>
            <Text style={tw("text-5xl font-bold leading-tight")}>Jessy Pouliot</Text>
            <Text style={tw("text-2xl font-medium leading-tight text-blue-500")}>Senior Software Engineer</Text>
          </View>
          <View style={tw("flex flex-row flex-wrap gap-4")}>
            <ContactInfo
              method="Email"
              label="jessypouliot98@gmail.com"
              href="mailto:jessypouliot98@gmail.com"
            />
            <ContactInfo
              method="Phone"
              label="+1 (514) 267-2784"
              href="tel:15142672784"
            />
            <ContactInfo
              method="LinkedIn"
              label="/in/jessypouliot"
              href="https://linkedin.com/in/jessypouliot"
            />
            <ContactInfo
              method="GitHub"
              label="/jessypouliot98"
              href="https://github.com/jessypouliot98"
            />
            <ContactInfo
              method="Website"
              label="Portfolio"
              href="https://jessypouliot.ca"
            />
          </View>
        </View>

        <View style={tw("flex flex-row flex-1 gap-4")}>
          {/*Left*/}
          <View style={tw("flex-1")}>
            <Section>
              <SectionTitle>Experience</SectionTitle>
              <View style={tw("py-4 gap-3")}>
                <ExperienceCard
                  job="Software engineer"
                  company="Ecam.ai (GardaWorld)"
                  from={new Date()}
                  to={new Date()}
                  Details={(
                    <Text>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam, aperiam aut cumque dignissimos dolor, enim exercitationem itaque iure laboriosam nemo nulla possimus provident quibusdam quo reiciendis sequi sint temporibus!
                    </Text>
                  )}
                />
                <ExperienceCard
                  job="Software engineer"
                  company="RenoRun"
                  from={new Date()}
                  to={new Date()}
                />
                <ExperienceCard
                  job="Software engineer"
                  company="Activix"
                  from={new Date()}
                  to={new Date()}
                />
              </View>
            </Section>
            <Section>
              <SectionTitle>Strengths</SectionTitle>
              <View style={tw("py-4 gap-1")}>
                <LanguageCard
                  language="French"
                  capacity="Native"
                />
                <LanguageCard
                  language="English"
                  capacity="Proficient"
                />
              </View>
            </Section>
          </View>
          {/*Right*/}
          <View style={tw("w-80")}>
            <Section>
              <SectionTitle>Education</SectionTitle>
              <View style={tw("py-4 gap-3")}>
                <EducationCard
                  school="Cégep de Saint-Jérôme"
                  certification="Techniques d'intégration multimédia"
                  completedOn={new Date()}
                />
              </View>
            </Section>
            <Section>
              <SectionTitle>Languages</SectionTitle>
              <View style={tw("py-4 gap-1")}>
                <LanguageCard
                  language="French"
                  capacity="Native"
                />
                <LanguageCard
                  language="English"
                  capacity="Proficient"
                />
              </View>
            </Section>
          </View>

        </View>

      </Page>
    </Document>
  )
}