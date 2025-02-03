import { LinkEntry } from "@repo/api/src/contentful/link/model";
import { ButtonIcon } from "../../ButtonIcon/ButtonIcon";
import { Icon } from "../../icons/Icon";

export type ButtonLinkContentfulProps = {
  link: LinkEntry;
}

export function ButtonLinkContentful({ link }: ButtonLinkContentfulProps) {
  return (
    <ButtonIcon
      asChild
      leftIcon={<Icon icon={link.fields.icon} />}
    >
      <a
        href={link.fields.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {link.fields.label}
      </a>
    </ButtonIcon>
  )
}