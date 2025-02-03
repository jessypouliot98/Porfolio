import { View } from "@react-pdf/renderer";
import { tw } from "../utils/tailwind";

export function Section({ children }: React.PropsWithChildren) {
  return (
    <View style={tw("py-2")}>
      {children}
    </View>
  )
}