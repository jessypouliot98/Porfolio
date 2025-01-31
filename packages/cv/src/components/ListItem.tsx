import { View, Text, Styles } from "@react-pdf/renderer";
import { tw } from "../utils/tailwind";

export type ListItemProps = {
  bullet?: string;
  style?: Styles[string];
}

export function ListItem({ children, style, bullet = "·" }: React.PropsWithChildren<ListItemProps>) {
  return (
    <View style={[tw("flex-row gap-1"), style ?? {}]}>
      <View>
        <Text style={tw("font-bold")}>{bullet}</Text>
      </View>
      <View style={tw("flex-1")}>
        {children}
      </View>
    </View>
  )
}