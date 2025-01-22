import { View, Text, Link } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf/tailwind";

export type ContactInfoProps = {
  method: string;
  label: string;
  href: string;
}

export function ContactInfo({ method, label, href }: ContactInfoProps) {
  return (
    <View style={tw("px-2 py-2 rounded bg-gray-100")}>
      <Text style={tw("text-xs leading-tight text-blue-500")}>{method}</Text>
      <Link
        href={href}
        style={tw("text-sm leading-tight text-black")}
      >
        {label}
      </Link>
    </View>
  )
}