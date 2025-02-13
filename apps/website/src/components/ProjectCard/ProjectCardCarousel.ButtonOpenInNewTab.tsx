"use client";

import { assertDefined } from "@repo/util/src/assertDefined";
import { IconLinkExternal } from "@repo/ui/src/components/icons";
import React from "react";
import { useCarouselData } from "@repo/ui/src/components/Carousel/useCarouselData";
import { Asset } from "@repo/api/src/contentful";
import { clsx } from "clsx";

export type ProjectCardCarouselButtonOpenInNewTabProps = {
  className?: string;
}

export function ProjectCardCarouselButtonOpenInNewTab({ className }: ProjectCardCarouselButtonOpenInNewTabProps) {
  const carousel = useCarouselData<Asset<"WITHOUT_UNRESOLVABLE_LINKS">>();
  const media = carousel.data[carousel.currentIndex];
  assertDefined(media, "media must be defined");
  const file = media.fields.file;
  assertDefined(file, "file must be defined");

  let label = "Open media";
  if (media.fields.title) {
    label += ` (${media.fields.title})`
  }

  return (
    <a
      type="button"
      className={clsx(
        "block transition bg-black/30 hover:bg-black/40 backdrop-blur text-xl text-white p-2",
        className,
      )}
      aria-label={label}
      href={"https:" + file.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconLinkExternal/>
    </a>
  )
}