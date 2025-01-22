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
import { ListItem } from "@/app/pdf/cv/_components_/ListItem";
import { StrengthCard } from "@/app/pdf/cv/_components_/StrengthCard";

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
              label="(514) 267-2784"
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
              label="jessypouliot.ca"
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
                  job="Senior software engineer (full-stack)"
                  company="Ecam.ai (GardaWorld)"
                  from="December 2022"
                  to="current"
                  Details={(
                    <View style={tw("gap-2")}>
                      <Text style={tw("text-xs")}>next.js / node.js / react-native</Text>
                      <View style={tw("px-1 text-sm leading-tight gap-1")}>
                        <ListItem>
                          <Text>Building complex user interfaces such as:</Text>
                          <View style={tw("mt-1 w-11/12")}>
                            <ListItem bullet="-">
                              <Text>Configurable grid layouts for rendering multiple camera live streams, videos or anything else.</Text>
                            </ListItem>
                            <ListItem bullet="-">
                              <Text>Drag & drop user experience that allowed for the easiest and effortless user experience when configuring the above mentioned grid layouts.</Text>
                            </ListItem>
                            <ListItem bullet="-">
                              <Text>Infinitely scrollable timeline build to select the time for a stream of cameras.</Text>
                            </ListItem>
                          </View>
                        </ListItem>
                        <ListItem>
                          <Text>Writing performant SQL queries with permissions, keyset pagination (infinite paging) and more.</Text>
                        </ListItem>
                        <ListItem>
                          <Text>Using HTML, CSS and JS best practices for accessibility, performance and ease of use.</Text>
                        </ListItem>
                      </View>
                    </View>
                  )}
                />
                <ExperienceCard
                  job="Senior software engineer (front end)"
                  company="RenoRun"
                  // 27 sept 2021
                  from="September 2021"
                  // 24 nov 2022
                  to="November 2022"
                  Details={(
                    <View style={tw("gap-2")}>
                      <Text style={tw("text-xs")}>react-native / next.js</Text>
                      <View style={tw("pl-1 pr-4 text-sm leading-tight gap-1")}>
                        <ListItem>
                          <Text>Reduced our time to update copy from 2 weeks to a couple seconds by implementing a CMS combined with a JSON cache on a CDN for the fastest response time.</Text>
                          <Text style={tw("italic text-xs text-gray-500")}>(We won the week-long hackathon!)</Text>
                        </ListItem>
                        <ListItem>
                          <Text>Lead the mobile development by building a component library and being a key help resource for anything related to react-native</Text>
                        </ListItem>
                      </View>
                    </View>
                  )}
                />
                <ExperienceCard
                  job="Software engineer (full-stack)"
                  company="Activix"
                  // 25 may 2020
                  from="May 2020"
                  // 24 sept 2021
                  to="September 2021"
                  Details={(
                    <View style={tw("gap-2")}>
                      <Text style={tw("text-xs")}>react-native / laravel / vue.js</Text>
                      <View style={tw("pl-1 pr-2 text-sm leading-tight gap-1")}>
                        <ListItem>
                          <Text>Built a video integration feature for our email communication editor in both our website and mobile app to allow for a more personal communication method during COVID travel restrictions.</Text>
                        </ListItem>
                        <ListItem>
                          <Text>Joined the react-native team to learn the technology and quickly grew to become the mobile team lead after fixed many issues with the app's codebase at the time.</Text>
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
              <SectionTitle>Qualities</SectionTitle>
              <View style={tw("py-4 gap-3")}>
                <StrengthCard
                  strength="Creativity"
                  Details={(
                    <Text>Can easily come up with clever solutions to complex problems and can easily freestyle quality user interfaces.</Text>
                  )}
                />
                <StrengthCard
                  strength="Curiosity"
                  Details={(
                    <Text>I want to understand everything and learn every quirks of the tools I use in order to make the best decisions every time.</Text>
                  )}
                />
                <StrengthCard
                  strength="Perceverance"
                  Details={(
                    <Text>Even when things aren't working out, I always figure it out.</Text>
                  )}
                />
              </View>
            </Section>
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