import { View, Text } from "@react-pdf/renderer";
import { tw } from "../utils/tailwind.js";

export type ExperienceCardProps = {
  job: string;
  company: string;
  location: string;
  Details?: React.ReactNode;
  from: string;
  to: string;
}

export function ExperienceCard({ job, company, location, Details, from, to }: ExperienceCardProps) {
  return (
    <View style={tw("px-2 py-2 rounded bg-gray-100 gap-1")}>
      <View>
        <Text style={tw("text-base leading-snug text-black")}>{job}</Text>
        <View style={tw("flex-row items-center gap-2")}>
          <Text style={tw("text-xs font-medium leading-snug text-blue-500")}>{company}</Text>
          <Text style={tw("text-xs leading-snug text-black")}>-</Text>
          <Text style={tw("text-xs leading-snug text-black")}>{location}</Text>
        </View>
        <View style={tw("flex-row items-center gap-2")}>
          <Text style={tw("text-xs leading-snug text-gray-500")}>{from}</Text>
          <Text style={tw("text-xs leading-snug text-gray-500")}>-</Text>
          <Text style={tw("text-xs leading-snug text-gray-500")}>{to}</Text>
        </View>
      </View>
      <View style={tw("text-xs pr-2 leading-snug")}>
        {Details}
      </View>
    </View>
  )
}