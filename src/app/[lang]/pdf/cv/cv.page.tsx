import React from 'react';
import { Page, Document, View, Text } from '@react-pdf/renderer';
import { tw } from "@/utils/pdf/tailwind";
import { Section } from "@/app/[lang]/pdf/cv/_components_/Section";
import { SectionTitle } from "@/app/[lang]/pdf/cv/_components_/SectionTitle";
import { ExperienceCard } from "@/app/[lang]/pdf/cv/_components_/ExperienceCard";
import { EducationCard } from "@/app/[lang]/pdf/cv/_components_/EducationCard";
import { registerFonts } from "@/utils/pdf/registerFonts";
import { ContactInfo } from "@/app/[lang]/pdf/cv/_components_/ContactInfo";
import { LanguageCard } from "@/app/[lang]/pdf/cv/_components_/LanguageCard";
import { ListItem } from "@/app/[lang]/pdf/cv/_components_/ListItem";
import { StrengthCard } from "@/app/[lang]/pdf/cv/_components_/StrengthCard";
import en from "./_translations_/en.json";
import fr from "./_translations_/fr.json";

registerFonts();

export type Props = {
  language: string;
}

export default ({ language }: Props) => {
  const t: typeof en = language === "fr" ? fr : en;
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
          <View style={tw("flex flex-row flex-wrap gap-4")}>
            <ContactInfo
              method={t.contact.email.label}
              label="jessypouliot98@gmail.com"
              href="mailto:jessypouliot98@gmail.com"
            />
            <ContactInfo
              method={t.contact.phone.label}
              label="(514) 267-2784"
              href="tel:15142672784"
            />
            <ContactInfo
              method={t.contact.linkedin.label}
              label="/in/jessypouliot"
              href="https://linkedin.com/in/jessypouliot"
            />
            <ContactInfo
              method={t.contact.github.label}
              label="/jessypouliot98"
              href="https://github.com/jessypouliot98"
            />
            <ContactInfo
              method={t.contact.website.label}
              label="jessypouliot.ca"
              href="https://jessypouliot.ca"
            />
          </View>
        </View>

        <View style={tw("flex flex-row flex-1 gap-4")}>
          {/*Left*/}
          <View style={tw("flex-1")}>
            <Section>
              <SectionTitle>{t.experience.title}</SectionTitle>
              <View style={tw("py-4 gap-3")}>
                <ExperienceCard
                  job={t.experience.job.ecamai.title}
                  company={t.experience.job.ecamai.company}
                  from={t.experience.job.ecamai.from}
                  to={t.experience.job.ecamai.to}
                  Details={(
                    <View style={tw("gap-2")}>
                      <Text style={tw("text-xs")}>{t.experience.job.ecamai.details[0]}</Text>
                      <View style={tw("px-1 text-sm leading-tight gap-1")}>
                        <ListItem>
                          <Text>{t.experience.job.ecamai.details[1][0][0]}</Text>
                          <View style={tw("mt-1")}>
                            {(t.experience.job.ecamai.details[1][0][1] as string[]).map((text) => (
                              <ListItem key={text} bullet="-">
                                <Text>{text}</Text>
                              </ListItem>
                            ))}
                          </View>
                        </ListItem>
                        <ListItem>
                          <Text>{t.experience.job.ecamai.details[1][1]}</Text>
                        </ListItem>
                        <ListItem>
                          <Text>{t.experience.job.ecamai.details[1][2]}</Text>
                        </ListItem>
                      </View>
                    </View>
                  )}
                />
                <ExperienceCard
                  job={t.experience.job.renorun.title}
                  company={t.experience.job.renorun.company}
                  from={t.experience.job.renorun.from}
                  to={t.experience.job.renorun.to}
                  Details={(
                    <View style={tw("gap-2")}>
                      <Text style={tw("text-xs")}>{t.experience.job.renorun.details[0]}</Text>
                      <View style={tw("px-1 text-sm leading-tight gap-1")}>
                        <ListItem>
                          <Text>{t.experience.job.renorun.details[1][0][0]}</Text>
                          <Text style={tw("italic text-xs text-gray-500")}>{t.experience.job.renorun.details[1][0][1]}</Text>
                        </ListItem>
                        <ListItem>
                          <Text>{t.experience.job.renorun.details[1][1]}</Text>
                        </ListItem>
                      </View>
                    </View>
                  )}
                />
                <ExperienceCard
                  job={t.experience.job.activix.title}
                  company={t.experience.job.activix.company}
                  from={t.experience.job.activix.from}
                  to={t.experience.job.activix.to}
                  Details={(
                    <View style={tw("gap-2")}>
                      <Text style={tw("text-xs")}>{t.experience.job.activix.details[0]}</Text>
                      <View style={tw("px-1 text-sm leading-tight gap-1")}>
                        <ListItem>
                          <Text>{t.experience.job.activix.details[1][0]}</Text>
                        </ListItem>
                        <ListItem>
                          <Text>{t.experience.job.activix.details[1][1]}</Text>
                        </ListItem>
                      </View>
                    </View>
                  )}
                />
              </View>
            </Section>
          </View>
          {/*Right*/}
          <View style={tw("w-80")}>
            <Section>
              <SectionTitle>{t.qualities.title}</SectionTitle>
              <View style={tw("py-4 gap-3")}>
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
            <Section>
              <SectionTitle>{t.education.title}</SectionTitle>
              <View style={tw("py-4 gap-3")}>
                {t.education.list.map((education) => (
                  <EducationCard
                    key={education.certification}
                    school={education.school}
                    certification={education.certification}
                    completedOn={education.completedOn}
                  />
                ))}
              </View>
            </Section>
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
          </View>

        </View>

      </Page>
    </Document>
  )
}