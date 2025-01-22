import { View, Text, Styles } from "@react-pdf/renderer";
import { tw } from "@/utils/pdf/tailwind";
import React from "react";

export type ListItemProps = {
  bullet?: string;
  style?: Styles[string];
}

export function ListItem({ children, style, bullet = "·" }: React.PropsWithChildren<ListItemProps>) {
  return (
    <View style={[tw("flex-row gap-2"), style ?? {}]}>
      <View>
        <Text style={tw("font-bold")}>{bullet}</Text>
      </View>
      <View>
        {children}
      </View>
    </View>
  )
}