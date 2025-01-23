import { View, Text } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf/tailwind";
import { BulletList } from "@/app/[lang]/pdf/cv/_components_/BulletList";

export type EducationCardProps = {
  school: string;
  certification: string;
  completedOn: string;
  content: BulletList.Content;
}

export function EducationCard({ school, certification, completedOn, content }: EducationCardProps) {
  return (
    <View style={tw("px-2 py-2 rounded bg-gray-100")}>
      <Text style={tw("text-sm leading-snug text-black")}>{certification}</Text>
      <Text style={tw("text-xs font-medium leading-snug text-blue-500")}>{school}</Text>
      <Text style={tw("text-xs leading-snug text-gray-500")}>{completedOn}</Text>
      <View style={tw("text-xs leading-snug mt-1")}>
        <BulletList content={content} />
      </View>
    </View>
  )
}