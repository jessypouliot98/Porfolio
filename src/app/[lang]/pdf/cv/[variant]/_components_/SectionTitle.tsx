import { Text, View } from "@react-pdf/renderer";
import React from "react";
import { tw } from "@/utils/pdf/tailwind";

export function SectionTitle({ children }: React.PropsWithChildren) {
  return (
    <View style={tw("border-b border-black px-2 mb-3")}>
      <Text style={tw("text-lg font-medium leading-snug uppercase text-black")}>{children}</Text>
    </View>
  )
}