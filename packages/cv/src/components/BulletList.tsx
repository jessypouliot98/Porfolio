import { Text, View } from "@react-pdf/renderer";
import { tw } from "../utils/tailwind";
import { ListItem } from "./ListItem";

export type BulletListProps = {
  level?: number;
  content: BulletList.Content;
}

export function BulletList({ content, level = 0 }: BulletListProps) {
  const bullet = BulletList.getBullet(level);
  return (
    <View style={tw("gap-0.5")}>
      {content.map((item) => (
        <ListItem key={item.text} bullet={bullet}>
          <View style={tw("gap-0.5")}>
            {typeof item.text === "string" && (
              <Text>{item.text}</Text>
            )}
            {item.list && (
              <BulletList
                content={item.list}
                level={level + 1}
              />
            )}
          </View>
        </ListItem>
      ))}
    </View>
  )
}

export namespace BulletList {

  export type Item = {
    text?: string;
    list?: Item[]
  }

  export type Content = Item[];

  export const bulletOptions = ["·", "-"];

  export function getBullet(level: number) {
    return bulletOptions[level % bulletOptions.length];
  }

}