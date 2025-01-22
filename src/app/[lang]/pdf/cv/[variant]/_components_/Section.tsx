import { View } from "@react-pdf/renderer";
import React from "react";
import { tw } from "@/utils/pdf/tailwind";

export function Section({ children }: React.PropsWithChildren) {
  return (
    <View style={tw("py-2")}>
      {children}
    </View>
  )
}