import { tw } from "@/utils/pdf/tailwind";
import { Text, View } from "@react-pdf/renderer";
import React from "react";

export type LanguageCardProps = {
  language: string;
  capacity: string;
}

export function LanguageCard({ language, capacity }: LanguageCardProps) {
  return (
    <View style={tw("p-2 flex-row items-center justify-between rounded bg-gray-100")}>
      <Text style={tw("text-base leading-tight text-black")}>{language}</Text>
      <Text style={tw("text-sm font-medium text-blue-500")}>{capacity}</Text>
    </View>
  )
}