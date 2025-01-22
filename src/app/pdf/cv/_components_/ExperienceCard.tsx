import { View, Text } from "@react-pdf/renderer";
import React from "react";
import { tw } from "@/utils/pdf/tailwind";

export type ExperienceCardProps = {
  job: string;
  company: string;
  Details?: React.ReactNode;
  from: Date;
  to?: Date;
}

export function ExperienceCard({ job, company, Details, from, to }: ExperienceCardProps) {
  return (
    <View style={tw("px-2 py-1.5 rounded bg-gray-100 gap-1")}>
      <View>
        <Text style={tw("text-xs leading-snug text-gray-500")}>{from.toDateString()} - {to?.toDateString() ?? "current"}</Text>
        <Text style={tw("text-lg leading-snug text-black")}>{job}</Text>
        <Text style={tw("text-sm font-medium leading-snug text-blue-500")}>{company}</Text>
      </View>
      {Details}
    </View>
  )
}