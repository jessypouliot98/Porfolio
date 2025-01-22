import { CvTranslation } from "@/app/[lang]/pdf/cv/[variant]/_translations_/types";
import { tw } from "@/utils/pdf/tailwind";
import { ContactInfo } from "@/app/[lang]/pdf/cv/[variant]/_components_/ContactInfo";
import { View } from "@react-pdf/renderer";
import React from "react";

export type PartContactProps = {
  t: CvTranslation;
}

export function PartContact({ t }: PartContactProps) {
  return (
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
  )
}