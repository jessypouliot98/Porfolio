import * as icons from "./";
import { IconBaseProps } from "react-icons";

export type IconProps = IconBaseProps & {
  icon: string;
}

export function Icon({ icon, ...props }: IconProps) {
  const Comp = icon in icons ? icons[icon as keyof typeof icons] : icons.IconQuestionMark;
  return (
    <Comp
      data-icon={icon}
      {...props}
    />
  )
}