import { IconLogoLinkedin, IconLogoGmail, IconLogoGithub, IconQuestionMark } from "@repo/ui/src/components/icons";
import React, { useMemo } from "react";
import { SocialEntry } from "@repo/api/src/contentful/social/model";
import { clsx } from "clsx";

export type SocialLinksLinkProps = {
  social: SocialEntry;
}

export function SocialLinksLink({ social }: SocialLinksLinkProps) {
  const Icon = useMemo(() => {
    switch (social.fields.icon) {
      case "GrLinkedin":
      case "IconLogoLinkedin": {
        return IconLogoLinkedin;
      }
      case "GrMail":
      case "IconLogoGmail": {
        return IconLogoGmail;
      }
      case "GrGithub":
      case "IconLogoGithub": {
        return IconLogoGithub;
      }
      default: {
        return IconQuestionMark;
      }
    }
  }, [social]);
  return (
    <a
      style={{
        "--accent": social.fields.highlightColor !== ""
          ? `color-mix(in oklab, ${social.fields.highlightColor} 70%, transparent)`
          : undefined,
      } as object}
      className={clsx(
        "size-[2em] grid place-items-center transition-colors",
        "[--accent:theme(color.white/30)] bg-transparent hover:bg-(--accent)"
      )}
      href={social.fields.href}
      title={social.fields.title}
      data-icon={social.fields.icon}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon/>
    </a>
  )
}