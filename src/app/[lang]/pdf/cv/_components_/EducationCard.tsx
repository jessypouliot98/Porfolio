import { View, Text } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf/tailwind";

export type EducationCardProps = {
  school: string;
  certification: string;
  completedOn: string;
}

export function EducationCard({ school, certification, completedOn }: EducationCardProps) {
  return (
    <View style={tw("px-2 py-2 rounded bg-gray-100")}>
      <Text style={tw("text-xs leading-snug text-gray-500")}>{completedOn}</Text>
      <Text style={tw("text-base leading-snug text-black")}>{certification}</Text>
      <Text style={tw("text-sm font-medium leading-snug text-blue-500")}>{school}</Text>
    </View>
  )
}