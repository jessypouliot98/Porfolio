import { Asset } from "contentful";
import { assertDefined } from "@repo/util/src/assertDefined";
import React from "react";
import { clsx } from "clsx";
import { VideoContent } from "./VideoContent";

export type MediaContentProps = {
  className?: string;
  classNames?: Partial<Record<"video" | "image", string>>;
  media: Asset<"WITHOUT_UNRESOLVABLE_LINKS", string>;
  focused?: boolean;
}

export function MediaContent({ className, classNames, media, focused }: MediaContentProps) {
  const file = media.fields.file;
  assertDefined(file, "media file not defined");

  if (file.contentType.startsWith("video/")) {
    return (
      <VideoContent
        className={clsx(className, classNames?.video)}
        media={media}
        focused={focused}
      />
    )
  }

  if (file.contentType.startsWith("image/")) {
    return (
      <img
        className={clsx(className, classNames?.image)}
        src={"https://" + file.url}
        alt={media.fields.description ?? file.fileName}
        loading="lazy"
      />
    )
  }

  throw new Error(`${file.fileName} of type ${file.contentType} is not supported`);
}