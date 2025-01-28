import { View, Text, Link } from "@react-pdf/renderer";
import { tw } from "../utils/tailwind.js";

export type ContactInfoProps = {
  method: string;
  label: string;
  href: string;
}

export function ContactInfo({ method, label, href }: ContactInfoProps) {
  return (
    <View style={tw("p-1.5 rounded bg-gray-100 gap-0.5")}>
      <Text style={tw("text-xs leading-tight text-blue-500")}>{method}</Text>
      <Link
        href={href}
        style={tw("text-xs leading-tight text-black")}
      >
        {label}
      </Link>
    </View>
  )
}