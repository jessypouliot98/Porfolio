import { View, Text } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf/tailwind";
import React from "react";

export type StrengthCardProps = {
  strength: string;
  Details: React.ReactNode;
}

export function StrengthCard({ strength, Details }: StrengthCardProps) {
  return (
    <View style={tw("px-2 py-2 bg-gray-100 rounded gap-1")}>
      <Text style={tw("text-sm font-medium text-blue-500")}>{strength}</Text>
      <View style={tw("text-xs leading-tight")}>
        {Details}
      </View>
    </View>
  )
}