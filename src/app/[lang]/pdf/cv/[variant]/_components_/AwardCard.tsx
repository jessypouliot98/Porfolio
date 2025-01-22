import { View, Text } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf/tailwind";
import React from "react";

export type AwardCardProps = {
  name: string;
  Details: React.ReactNode;
}

export function AwardCard({ name, Details }: AwardCardProps) {
  return (
    <View style={tw("px-2 py-2 bg-gray-100 rounded gap-1")}>
      <Text style={tw("text-sm font-medium text-blue-500")}>{name}</Text>
      <View style={tw("text-xs leading-snug")}>
        {Details}
      </View>
    </View>
  )
}